const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport with Google OAuth2
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) return done(new Error('No email returned from Google'));
        // Check if user exists
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        let user;
        if (rows.length > 0) {
          user = rows[0];
        } else {
          // Create new user
          const [result] = await pool.query(
            'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
            [profile.displayName || 'Google User', email, 'user']
          );
          user = { id: result.insertId, name: profile.displayName, email, role: 'user' };
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

}

// Ensure serialize/deserialize exist even if Google strategy isn't configured
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) done(null, rows[0]);
    else done(null, false);
  } catch (err) {
    done(err);
  }
});
// Auth routes

// Local email/password login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const user = rows[0];
    const hash = user.password_hash || user.password;
    if (!hash) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, hash);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // establish session
    req.login(user, (err) => {
      if (err) {
        console.error('Login error', err);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }
      const { password_hash, password, ...safeUser } = user;
      return res.json({ success: true, user: safeUser });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Local registration (creates user and optionally subscribes to Mailchimp)
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, subscribe } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    // Check existing
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(409).json({ success: false, message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name || null, email, hash, 'user']);
    const userId = result.insertId;

    // Optionally subscribe to Mailchimp and store subscriber in DB
    if (subscribe) {
      try {
        // Insert into local subscribers table if exists
        await pool.query('INSERT INTO newsletter_subscribers (user_id, email, name) VALUES (?, ?, ?)', [userId, email, name || null]);
      } catch (dbErr) {
        // ignore if table doesn't exist
      }

      // Call Mailchimp API if configured
      if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID && process.env.MAILCHIMP_SERVER_PREFIX) {
        try {
          const mcUrl = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;
          const body = {
            email_address: email,
            status: 'subscribed',
            merge_fields: { FNAME: name || '' }
          };
          const resp = await fetch(mcUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`
            },
            body: JSON.stringify(body)
          });
          // ignore Mailchimp errors for now
        } catch (mcErr) {
          console.error('Mailchimp subscribe error', mcErr);
        }
      }
    }

    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    // Auto-login after register
    req.login(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Registration succeeded but login failed' });
      return res.json({ success: true, user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Subscribe endpoint for newsletter component (saves locally and calls Mailchimp)
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    try {
      await pool.query('INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)', [email, name || null]);
    } catch (dbErr) {
      // ignore duplicate or missing table
    }

    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID && process.env.MAILCHIMP_SERVER_PREFIX) {
      try {
        const mcUrl = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;
        const body = {
          email_address: email,
          status: 'subscribed',
          merge_fields: { FNAME: name || '' }
        };
        const resp = await fetch(mcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`
          },
          body: JSON.stringify(body)
        });
        const data = await resp.json();
        if (resp.status >= 400) {
          // Mailchimp error, but still return success for UX
          console.error('Mailchimp error', data);
        }
      } catch (mcErr) {
        console.error('Mailchimp subscribe error', mcErr);
      }
    }

    return res.json({ success: true, message: 'Subscribed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure', session: true }),
  (req, res) => {
    // Successful authentication, redirect to frontend or send user info
    res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/dashboard');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
  });
});

app.get('/auth/failure', (req, res) => {
  res.status(401).json({ success: false, message: 'Authentication failed' });
});

// API routes
// Fetch case studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, slug, description, media_url, category, published_at FROM case_studies ORDER BY published_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/case-studies/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query('SELECT * FROM case_studies WHERE slug = ?', [slug]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Case study not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch services
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, description, base_price, category FROM services');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' });
    // Fetch packages for this service
    const [packages] = await pool.query('SELECT id, name, price, features FROM service_packages WHERE service_id = ?', [id]);
    res.json({ success: true, data: { ...rows[0], packages } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Booking creation
app.post('/api/bookings', async (req, res) => {
  try {
    const { user_id, service_id, package_id, date, notes } = req.body;
    if (!user_id || !service_id || !date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const status = 'pending';
    await pool.query(
      'INSERT INTO bookings (user_id, service_id, package_id, date, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, service_id, package_id || null, date, status, notes || null]
    );
    res.json({ success: true, message: 'Booking created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Courses
app.get('/api/courses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, slug, description, price, preview_url FROM courses');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/courses/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [courses] = await pool.query('SELECT * FROM courses WHERE slug = ?', [slug]);
    if (!courses.length) return res.status(404).json({ success: false, message: 'Course not found' });
    // fetch lessons
    const [lessons] = await pool.query('SELECT id, title, video_url, content, position FROM lessons WHERE course_id = ? ORDER BY position ASC', [courses[0].id]);
    res.json({ success: true, data: { ...courses[0], lessons } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, description, type, price, inventory FROM products');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, slug, content, category, tags, published_at FROM posts ORDER BY published_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query('SELECT * FROM posts WHERE slug = ?', [slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Releases (music)
app.get('/api/releases', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, release_date, cover_url, description FROM releases ORDER BY release_date DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/releases/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT * FROM releases WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Release not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Current logged-in user (for frontend dashboard). Returns user info if session exists.
app.get('/api/me', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // Remove sensitive fields
    const { password_hash, ...user } = req.user;
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

// Root
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Agency API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
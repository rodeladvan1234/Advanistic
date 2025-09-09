const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./config.pg');
require('dotenv').config();

// Admin: fetch all releases for admin panel
app.get('/admin/releases', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM releases ORDER BY release_date DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error in /admin/releases:', err.stack || err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Admin: fetch all blog posts for admin panel
app.get('/admin/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY published_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error in /admin/posts:', err.stack || err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// // Fetch all releases (for explore/public pages)
app.get('/api/releases', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM releases ORDER BY release_date DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error in /api/releases:', err.stack || err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});
// Fetch releases by category (strictly limited to vt, rodel, collabs

// --- Spotify API integration ---
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let spotifyToken = null;
let spotifyTokenExpires = 0;

async function getSpotifyToken() {
  if (spotifyToken && Date.now() < spotifyTokenExpires) return spotifyToken;
  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });
  const data = await resp.json();
  spotifyToken = data.access_token;
  spotifyTokenExpires = Date.now() + (data.expires_in - 60) * 1000;
  return spotifyToken;
}



// Diagnostic: print Google OAuth configuration (do not print secrets)
console.log('Google OAuth callback (GOOGLE_CALLBACK_URL)=', process.env.GOOGLE_CALLBACK_URL);
console.log('Google OAuth client id present?', !!process.env.GOOGLE_CLIENT_ID);
const path = require('path');
const fs = require('fs');



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

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// also provide a place inside the frontend public folder so images can be served
// by the Next.js frontend at http://localhost:3000/images/...
const imagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// --- Spotify API routes (must be after app and middleware setup) ---
app.get('/api/spotify/album/:id', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const resp = await fetch(`https://api.spotify.com/v1/albums/${req.params.id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Spotify API error', details: err.message });
  }
});

app.get('/api/spotify/track/:id', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const resp = await fetch(`https://api.spotify.com/v1/tracks/${req.params.id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Spotify API error', details: err.message });
  }
});

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
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        let user;
        if (rows.length > 0) {
          user = rows[0];
          user._created_by_google = false;
        } else {
          // Create new user
          const result = await pool.query(
            'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
            [profile.displayName || 'Google User', email, 'user']
          );
          user = result.rows[0];
          // mark newly created user so callback can redirect to register flow
          user._created_by_google = true;
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
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
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

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(409).json({ success: false, message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id', [name || null, email, hash, 'user']);
    const userId = result.rows[0].id;

    // Optionally subscribe to Mailchimp and store subscriber in DB
    if (subscribe) {
      try {
        // Insert into local subscribers table if exists
        await pool.query('INSERT INTO newsletter_subscribers (user_id, email, name) VALUES ($1, $2, $3)', [userId, email, name || null]);
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
          const auth = 'Basic ' + Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');
          const resp = await fetch(mcUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth
            },
            body: JSON.stringify(body)
          });
          const mcResp = await resp.json().catch(() => null);
          if (resp.status >= 400) {
            console.error('Mailchimp subscribe error', resp.status, mcResp);
          }
        } catch (mcErr) {
          console.error('Mailchimp subscribe error', mcErr);
        }
      }
    }

  const { rows } = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [userId]);
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

// ...existing code...
// Subscribe endpoint for newsletter component (saves locally and calls Mailchimp)
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    try {
      await pool.query('INSERT INTO newsletter_subscribers (email, name) VALUES ($1, $2)', [email, name || null]);
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
        const auth = 'Basic ' + Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');
        const resp = await fetch(mcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
          },
          body: JSON.stringify(body)
        });
        const data = await resp.json().catch(() => null);
        if (resp.status >= 400) {
          console.error('Mailchimp error', resp.status, data);
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
// Start Google OAuth flow. If credentials are missing, return a clear error.
app.get('/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Google OAuth not configured on server. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
    return res.status(400).send('Google OAuth not configured on server');
  }
  console.log('Initiating Google OAuth flow');
  return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// Custom callback to handle newly created Google users
app.get('/auth/google/callback', (req, res, next) => {
  console.log('Google callback received');
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Google callback hit but OAuth not configured');
    return res.status(400).send('Google OAuth not configured on server');
  }
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    if (err) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/auth/failure');
    if (!user) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/auth/failure');

    // If this user was just created by Google, check if email already exists in DB
    if (user._created_by_google) {
      // Double-check: if user with this email already exists, treat as login
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [user.email]);
        if (rows.length > 0) {
          // User exists, treat as login
          req.login(rows[0], (loginErr) => {
            if (loginErr) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/auth/failure');
            return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/dashboard');
          });
          return;
        }
      } catch (e) {
        // fallback to register if DB error
      }
      const params = new URLSearchParams({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar_url || '',
        google_new: '1'
      });
      return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/register?' + params.toString());
    }

    // Otherwise establish session and redirect to dashboard
    req.login(user, (loginErr) => {
      if (loginErr) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/auth/failure');
      return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/dashboard');
    });
  })(req, res, next);
});

// Allow Google-created users to set a password (complete their profile)
app.post('/auth/set-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
    const hash = await bcrypt.hash(password, 10);
  await pool.query('UPDATE users SET password_hash = $1 WHERE email = $2', [hash, email]);
    return res.json({ success: true, message: 'Password set' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

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
  const { rows } = await pool.query('SELECT id, title, slug, description, media_url, category, published_at FROM case_studies ORDER BY published_at DESC');
  res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/case-studies/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
  const { rows } = await pool.query('SELECT * FROM case_studies WHERE slug = $1', [slug]);
  if (rows.length === 0) return res.status(404).json({ success: false, message: 'Case study not found' });
  res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch services
app.get('/api/services', async (req, res) => {
  try {
  const { rows } = await pool.query('SELECT id, name, description, base_price, category FROM services');
  res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
  const id = parseInt(req.params.id, 10);
  const { rows } = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' });
  // Fetch packages for this service
  const packagesResult = await pool.query('SELECT id, name, price, features FROM service_packages WHERE service_id = $1', [id]);
  res.json({ success: true, data: { ...rows[0], packages: packagesResult.rows } });
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
      'INSERT INTO bookings (user_id, service_id, package_id, date, status, notes) VALUES ($1, $2, $3, $4, $5, $6)',
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
  const { rows } = await pool.query('SELECT id, title, slug, description, price, preview_url FROM courses');
  res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/courses/:slug', async (req, res) => {
  try {
  const { slug } = req.params;
  const coursesResult = await pool.query('SELECT * FROM courses WHERE slug = $1', [slug]);
  const courses = coursesResult.rows;
  if (!courses.length) return res.status(404).json({ success: false, message: 'Course not found' });
  // fetch lessons
  const lessonsResult = await pool.query('SELECT id, title, video_url, content, position FROM lessons WHERE course_id = $1 ORDER BY position ASC', [courses[0].id]);
  const lessons = lessonsResult.rows;
  res.json({ success: true, data: { ...courses[0], lessons } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  try {
  const { rows } = await pool.query('SELECT id, name, description, type, price, inventory FROM products');
  res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
  const id = parseInt(req.params.id, 10);
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  const rows = result.rows;
  if (!rows.length) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Blog posts
app.get('/api/posts', async (req, res) => {
  try {
  const { rows } = await pool.query('SELECT id, title, slug, content, category, tags, published_at FROM posts ORDER BY published_at DESC');
  res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
  const { slug } = req.params;
  const result = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug]);
  const rows = result.rows;
  if (!rows.length) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---- Admin management routes (simple, no auth for now) ----

// List subscribers
app.get('/admin/subscribers', async (req, res) => {
  try {
    // newsletter_subscribers uses `subscribed_at` in schema
  const { rows } = await pool.query('SELECT id, user_id, email, name, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC');
  res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// List users
app.get('/admin/users', async (req, res) => {
  try {
  const { rows } = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC');
  res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Services CRUD
app.post('/admin/services', async (req, res) => {
  try {
    const { name, description, base_price, category } = req.body;
    let thumbnail = req.body.thumbnail_url || null;
    // If thumbnail is base64, save to images dir and use /images/ path
    if (thumbnail && typeof thumbnail === 'string' && thumbnail.startsWith('data:image/')) {
      try {
        const matches = thumbnail.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          const ext = matches[1].split('/')[1] || 'png';
          const buffer = Buffer.from(matches[2], 'base64');
          const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
          const imagesDir = require('path').join(__dirname, '..', 'frontend', 'public', 'images');
          require('fs').writeFileSync(imagesDir + '/' + filename, buffer);
          thumbnail = '/images/' + filename;
        }
      } catch (e) {
        console.error('Failed to save thumbnail image', e);
      }
    }
    try {
  const result = await pool.query('INSERT INTO services (name, description, thumbnail_url, base_price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description || null, thumbnail, base_price || 0, category || null]);
  const rows = result.rows;
      return res.json({ success: true, data: rows[0] });
    } catch (errInner) {
      if (errInner && errInner.code === 'ER_BAD_FIELD_ERROR') {
        // Fallback for legacy/incorrect field error: always use correct schema
        const result = await pool.query('INSERT INTO services (name, description, thumbnail_url, base_price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description || null, thumbnail, base_price || 0, category || null]);
        const rows = result.rows;
        return res.json({ success: true, data: rows[0] });
      }
      throw errInner;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// upload endpoint for images
// Upload endpoint: supports multipart if multer installed, otherwise accepts { name, data: base64 }
app.post('/api/upload', async (req, res) => {
  // Try to use multer dynamically
  try {
    const multer = require('multer');
    const storage = multer.diskStorage({
      // store directly into frontend/public/images so the frontend can reference by /images/<name>
      destination: function (r, f, cb) { cb(null, imagesDir); },
      filename: function (r, f, cb) { const ext = path.extname(f.originalname); cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext); }
    });
    const up = multer({ storage }).single('file');
    up(req, res, function (err) {
      if (err) return res.status(500).json({ success: false, message: 'Upload failed' });
      if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
      // return a frontend-hosted URL (FRONTEND_URL env controls host)
      const frontendUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host').replace(/:\d+$/, ':3000')}`;
      const url = `${frontendUrl.replace(/\/$/, '')}/images/${req.file.filename}`;
      return res.json({ success: true, url });
    });
    return;
  } catch (e) {
    // multer not available, fall back to base64 JSON
  }

  try {
    const { name, data } = req.body || {};
    if (!data) return res.status(400).json({ success: false, message: 'No data' });
    // data is expected like: data:image/png;base64,AAAA
    const matches = data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ success: false, message: 'Invalid data format' });
  const ext = matches[1].split('/')[1] || 'png';
  const buffer = Buffer.from(matches[2], 'base64');
  const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  const frontendUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host').replace(/:\d+$/, ':3000')}`;
  const url = `${frontendUrl.replace(/\/$/, '')}/images/${filename}`;
    return res.json({ success: true, url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// delete service
app.delete('/admin/services/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM services WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Book service endpoint - creates booking record and returns SSLCommerz sandbox redirect
app.post('/api/book', async (req, res) => {
  try {
    const { user_id, service_id, package_id, date, amount } = req.body;
    if (!user_id || !service_id || !date || !amount) return res.status(400).json({ success: false, message: 'Missing fields' });
    // create booking with status 'pending'
  const result = await pool.query('INSERT INTO bookings (user_id, service_id, package_id, date, status, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [user_id, service_id, package_id || null, date, 'pending', `Amount: ${amount}`]);
  const bookingId = result.rows[0].id;

    // Prepare a fake SSLCommerz sandbox redirect URL (replace with real integration later)
    const sandboxUrl = `https://sandbox.sslcommerz.com/testbox/index.php?order_id=${bookingId}&amount=${amount}`;

    res.json({ success: true, bookingId, redirect: sandboxUrl, message: 'Proceed to payment (50% advance will be charged at payment page).' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/admin/services/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description, base_price, category } = req.body;
  await pool.query('UPDATE services SET name = $1, description = $2, base_price = $3, category = $4 WHERE id = $5', [name, description || null, base_price || 0, category || null, id]);
  const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
  res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/admin/services/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
  await pool.query('DELETE FROM services WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Products CRUD
app.post('/admin/products', async (req, res) => {
  try {
    const { name, description, price, inventory, type } = req.body;
  const result = await pool.query('INSERT INTO products (name, description, price, inventory, type) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, description || null, price || 0, inventory || 0, type || null]);
  const rows = (await pool.query('SELECT * FROM products WHERE id = $1', [result.rows[0].id])).rows;
  res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/admin/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description, price, inventory, type } = req.body;
  await pool.query('UPDATE products SET name = $1, description = $2, price = $3, inventory = $4, type = $5 WHERE id = $6', [name, description || null, price || 0, inventory || 0, type || null, id]);
  const rows = (await pool.query('SELECT * FROM products WHERE id = $1', [id])).rows;
  res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/admin/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Posts (blogs)
app.post('/admin/posts', async (req, res) => {
  try {
    const { title, slug, content, thumbnail_url, published_at } = req.body;
    try {
  const result = await pool.query('INSERT INTO posts (title, slug, content, thumbnail_url, published_at) VALUES ($1, $2, $3, $4, $5) RETURNING id', [title, slug, content || null, thumbnail_url || null, published_at || null]);
  const rows = (await pool.query('SELECT * FROM posts WHERE id = $1', [result.rows[0].id])).rows;
  return res.json({ success: true, data: rows[0] });
    } catch (errInner) {
      if (errInner && errInner.code === 'ER_BAD_FIELD_ERROR') {
  const result = await pool.query('INSERT INTO posts (title, slug, content, published_at) VALUES ($1, $2, $3, $4) RETURNING id', [title, slug, content || null, published_at || null]);
  const rows = (await pool.query('SELECT * FROM posts WHERE id = $1', [result.rows[0].id])).rows;
        if (thumbnail_url) {
          try {
            await pool.query('INSERT INTO assets (file_url, type, uploaded_by) VALUES ($1, $2, $3)', [thumbnail_url, 'image', null]);
            rows[0].thumbnail_url = thumbnail_url;
          } catch (assetErr) { console.error('Asset insert failed', assetErr); }
        }
        return res.json({ success: true, data: rows[0] });
      }
      throw errInner;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/admin/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, slug, content, thumbnail_url, published_at } = req.body;
    try {
    await pool.query('UPDATE posts SET title = $1, slug = $2, content = $3, thumbnail_url = $4, published_at = $5 WHERE id = $6', [title, slug, content || null, thumbnail_url || null, published_at || null, id]);
    } catch (errInner) {
      if (errInner && errInner.code === 'ER_BAD_FIELD_ERROR') {
  await pool.query('UPDATE posts SET title = $1, slug = $2, content = $3, published_at = $4 WHERE id = $5', [title, slug, content || null, published_at || null, id]);
      } else throw errInner;
    }
  const rows = (await pool.query('SELECT * FROM posts WHERE id = $1', [id])).rows;
    // If table didn't support thumbnail column but a thumbnail_url was provided, store in assets and attach
    if ((!rows[0].thumbnail_url || rows[0].thumbnail_url === null) && thumbnail_url) {
      try {
  await pool.query('INSERT INTO assets (file_url, type, uploaded_by) VALUES ($1, $2, $3)', [thumbnail_url, 'image', null]);
        rows[0].thumbnail_url = thumbnail_url;
      } catch (assetErr) { console.error('Asset insert failed', assetErr); }
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/admin/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Releases
app.post('/admin/releases', async (req, res) => {
  try {
    const { title, release_date, cover_url, description, links, category } = req.body; // links expected JSON string or array
    const linksStr = typeof links === 'string' ? links : JSON.stringify(links || []);
    try {
  const result = await pool.query('INSERT INTO releases (title, release_date, cover_url, description, links, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [title, release_date || null, cover_url || null, description || null, linksStr, category || null]);
  const rows = (await pool.query('SELECT * FROM releases WHERE id = $1', [result.rows[0].id])).rows;
  return res.json({ success: true, data: rows[0] });
    } catch (errInner) {
      if (errInner && errInner.code === 'ER_BAD_FIELD_ERROR') {
  const result = await pool.query('INSERT INTO releases (title, release_date, description, links, category) VALUES ($1, $2, $3, $4, $5) RETURNING id', [title, release_date || null, description || null, linksStr, category || null]);
  const rows = (await pool.query('SELECT * FROM releases WHERE id = $1', [result.rows[0].id])).rows;
        if (cover_url) {
          try {
            await pool.query('INSERT INTO assets (file_url, type, uploaded_by) VALUES ($1, $2, $3)', [cover_url, 'image', null]);
            rows[0].cover_url = cover_url;
          } catch (assetErr) { console.error('Asset insert failed', assetErr); }
        }
        return res.json({ success: true, data: rows[0] });
      }
      throw errInner;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/admin/releases/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, release_date, cover_url, description, links, category } = req.body;
    const linksStr = typeof links === 'string' ? links : JSON.stringify(links || []);
  await pool.query('UPDATE releases SET title = $1, release_date = $2, cover_url = $3, description = $4, links = $5, category = $6 WHERE id = $7', [title, release_date || null, cover_url || null, description || null, linksStr, category || null, id]);
  const rows = (await pool.query('SELECT * FROM releases WHERE id = $1', [id])).rows;
    // If DB doesn't support cover_url but a cover_url was provided, store in assets and attach
    if ((!rows[0].cover_url || rows[0].cover_url === null) && cover_url) {
      try {
  await pool.query('INSERT INTO assets (file_url, type, uploaded_by) VALUES ($1, $2, $3)', [cover_url, 'image', null]);
        rows[0].cover_url = cover_url;
      } catch (assetErr) { console.error('Asset insert failed', assetErr); }
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/admin/releases/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
  await pool.query('DELETE FROM releases WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Releases (music)

// Fetch releases by category (strictly limited to vt, rodel, collabs)
app.get('/api/releases/category/:category', async (req, res) => {
  try {
    const allowedCategories = ['vt', 'rodel', 'collabs'];
    const category = (req.params.category || '').toLowerCase();
    if (!allowedCategories.includes(category)) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const result = await pool.query(
      'SELECT * FROM releases WHERE LOWER(category) = $1 ORDER BY release_date DESC',
      [category]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error in /api/releases/category/:category:', err.stack || err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
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
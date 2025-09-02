# RodelAdvan Agency

This repository contains a full‑stack starter implementation for **RodelAdvan.com**, a hybrid portfolio/micro‑agency site with an integrated **Clique** social module.  The stack uses **Next.js** for the front‑end, **Express.js** for the API, and **MySQL** for data persistence.  Google OAuth2 is configured to allow sign‑in via Google accounts.

## Features

- **Portfolio & Brand pages** – view case studies, testimonials and service offerings.
- **Services & Booking** – browse services, select packages and submit booking requests.
- **Courses** – list digital courses with lesson previews and pricing.
- **Store** – support the brand via merchandise or digital downloads.
- **Blog** – publish articles with categories and tags.
- **Music Releases** – explore music releases with platform links.
- **Clique Social Module** – read about the upcoming campus social platform.
- **Admin/CMS endpoints** – API scaffolding for managing data (extend as needed).
- **Google Sign‑in** – users can authenticate via Google OAuth (requires credentials).

## Folder Structure

```
agency_clique_app/
├── backend/       # Express.js API server
│   ├── server.js  # Main Express application
│   ├── config.js  # MySQL connection pool
│   ├── package.json
│   └── .env.example  # Template for environment variables
├── frontend/      # Next.js application
│   ├── pages/     # Various pages (Home, About, Services, Courses, Store, Blog, Releases, Clique, Login)
│   ├── components/ # Reusable UI components (Navbar, Footer)
│   ├── styles/    # Global CSS
│   └── package.json
├── database/
│   └── schema.sql # Full MySQL schema (import into phpMyAdmin)
└── README.md      # This file
```

## Prerequisites

- **Node.js** (v18 or later is recommended)
- **npm** or **yarn**
- **XAMPP** (or any MySQL server) to host the database

## Database Setup (XAMPP)

1. Start the MySQL service from the XAMPP control panel.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Create a new database called `rodela_brand` (or any name you prefer).
4. Go to the **Import** tab, choose the file at `database/schema.sql` from this project, and import it to create all tables.
5. (Optional) Insert sample data into tables such as `case_studies`, `services`, `courses`, `products`, etc., using phpMyAdmin.

## Backend Setup (Express)

```bash
cd agency_clique_app/backend
cp .env.example .env
# Edit .env and fill in your MySQL credentials, Google OAuth credentials and session secret.
npm install
npm start
```

The API will start on `http://localhost:5000` by default.  It exposes endpoints such as:

- `GET /api/case-studies` – list case studies
- `GET /api/services` – list services
- `GET /api/services/:id` – service details + packages
- `POST /api/bookings` – create a booking
- `GET /api/courses` – list courses
- `GET /api/courses/:slug` – course details + lessons
- `GET /api/products` – list products (merch, digital)
- `GET /api/posts` – list blog posts
- `GET /api/releases` – list music releases
- `GET /api/me` – return the current authenticated user (requires Google sign‑in)

Google OAuth routes:

- `GET /auth/google` – redirect to Google for authentication
- `GET /auth/google/callback` – handle the callback and establish a session
- `GET /auth/logout` – destroy the session

Ensure that your Google Cloud project has the OAuth client ID and secret configured to match the URLs (e.g. `http://localhost:5000/auth/google/callback`).

## Frontend Setup (Next.js)

```bash
cd agency_clique_app/frontend
npm install
npm run dev
```

The Next.js site will run on `http://localhost:3000`.  Pages include:

- `/` – Home page with hero and latest case studies.
- `/about` – About and mission.
- `/services` – List of services.
- `/services/[id]` – Service detail with packages and a placeholder booking action.
- `/courses` – Course catalog.
- `/courses/[slug]` – Course detail with lessons.
- `/store` – Merch/digital product catalog.
- `/store/[id]` – Product detail.
- `/blog` – Blog listing.
- `/blog/[slug]` – Blog post detail.
- `/releases` – Music releases.
- `/releases/[id]` – Release detail with platform links.
- `/clique` – Overview of the Clique social concept.
- `/login` – Google OAuth sign‑in page (redirects to backend).
- `/dashboard` – Placeholder dashboard page displaying the logged‑in user (after sign‑in).

## Running with XAMPP

1. **Import the schema** into your MySQL instance via phpMyAdmin as described above.
2. **Configure `.env`** in `backend/` to match your MySQL host, user and password.  The database name should match the one you imported (`rodela_brand`).
3. **Start the backend** with `npm start`.  This runs the Express API on port **5000**.
4. **Start the frontend** with `npm run dev` in the `frontend/` directory.  This runs the Next.js app on port **3000**.
5. **Browse** to `http://localhost:3000` to explore the site.  Most pages fetch data from the API; if your tables are empty, you may see blank lists.  Use phpMyAdmin to populate example data.
6. **Google OAuth** requires you to create credentials in Google Cloud Console.  Once configured, fill `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your `.env` and restart the backend.  Visit `/login` on the frontend to test sign‑in.

## Extending the Project

This starter kit lays the groundwork for a comprehensive agency site with a campus social add‑on.  To turn it into a production‑ready application, you will need to:

- Build the admin dashboard to create/edit content and moderate bookings.
- Implement checkout flows for services, courses and products (integrate SSLCommerz or another payment gateway).
- Add proper authentication middleware to protect routes and restrict admin access.
- Flesh out the Clique social features with real‑time location and messaging (e.g. using WebSockets).
- Enhance styling with a design system or CSS framework such as Tailwind CSS.

Feel free to use this foundation as a learning resource or the starting point for your own version of RodelAdvan.com.
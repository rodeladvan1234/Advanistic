-- PostgreSQL schema for the Rodel Advan agency website and Clique social features.
-- Converted from MySQL schema.sql for compatibility with PostgreSQL.

-- Users (clients, students, fans, admins)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT,
    role VARCHAR(20) DEFAULT 'user',
    provider VARCHAR(50),
    provider_id VARCHAR(255),
    avatar_url VARCHAR(1024),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    media_url TEXT,
    category VARCHAR(50),
    published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials linked to case studies
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100),
    client_logo TEXT,
    text TEXT,
    case_study_id INT REFERENCES case_studies(id) ON DELETE SET NULL
);

-- Services & Packages
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    base_price NUMERIC(10,2),
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_packages (
    id SERIAL PRIMARY KEY,
    service_id INT REFERENCES services(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    features TEXT
);

-- Service Booking / Consultation
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    service_id INT REFERENCES services(id) ON DELETE SET NULL,
    package_id INT REFERENCES service_packages(id) ON DELETE SET NULL,
    date TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Courses and lessons
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    preview_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    video_url TEXT,
    content TEXT,
    position INT
);

-- Student Purchases / Enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    progress NUMERIC(5,2) DEFAULT 0
);

-- E‑commerce: Products and orders
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    inventory INT DEFAULT 0,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE SET NULL,
    quantity INT DEFAULT 1,
    price NUMERIC(10,2) NOT NULL
);

-- Coupons / Discounts
CREATE TABLE IF NOT EXISTS coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INT,
    expires_at TIMESTAMPTZ
);

-- Marketing / CRM leads
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    segment VARCHAR(50),
    source VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(200),
    source VARCHAR(100),
    subscribed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Music Releases
CREATE TABLE IF NOT EXISTS releases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    release_date DATE,
    cover_url TEXT,
    thumbnail_url TEXT,
    description TEXT,
    spotify_url TEXT,
    apple_url TEXT,
    youtube_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Pre‑save records for upcoming releases
CREATE TABLE IF NOT EXISTS presaves (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    release_id INT REFERENCES releases(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT,
    thumbnail_url TEXT,
    author_id INT REFERENCES users(id) ON DELETE SET NULL,
    category VARCHAR(50),
    tags TEXT,
    published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CMS: Uploaded assets
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    file_url TEXT NOT NULL,
    type VARCHAR(50),
    uploaded_by INT REFERENCES users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

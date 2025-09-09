-- SQL schema for the Rodel Advan agency website and Clique social features.
-- This file defines all tables necessary for user accounts, portfolio case
-- studies, services and packages, bookings, courses and lessons, store
-- products, orders, discounts, marketing lists, music releases, blog posts,
-- CMS assets and more. Run this file in phpMyAdmin or via the MySQL client
-- to create the database structures. You can import it in XAMPP by selecting
-- "Import" and uploading this file, or by running `mysql < schema.sql` from
-- the command line.

-- Users (clients, students, fans, admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT,
    role VARCHAR(20) DEFAULT 'user', -- admin, client, student, fan
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add OAuth/provider fields if missing (safe alters for existing DBs)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS provider VARCHAR(50) NULL,
  ADD COLUMN IF NOT EXISTS provider_id VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(1024) NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Portfolio Case Studies (CS projects, design, video work)
CREATE TABLE IF NOT EXISTS case_studies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    media_url TEXT,
    category VARCHAR(50), -- e.g., cs, design, video
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials linked to case studies
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100),
    client_logo TEXT,
    text TEXT,
    case_study_id INT,
    CONSTRAINT fk_testimonial_case_study
      FOREIGN KEY (case_study_id) REFERENCES case_studies(id)
      ON DELETE SET NULL
);

-- Services & Packages
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
    base_price DECIMAL(10,2),
    category VARCHAR(50), -- design, dev, consulting
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features TEXT,
    CONSTRAINT fk_package_service
      FOREIGN KEY (service_id) REFERENCES services(id)
      ON DELETE CASCADE
);

-- Service Booking / Consultation
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_id INT,
    package_id INT,
    date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, canceled
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_user
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_booking_service
      FOREIGN KEY (service_id) REFERENCES services(id)
      ON DELETE SET NULL,
    CONSTRAINT fk_booking_package
      FOREIGN KEY (package_id) REFERENCES service_packages(id)
      ON DELETE SET NULL
);

-- Courses and lessons
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    preview_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(200) NOT NULL,
    video_url TEXT,
    content TEXT,
    position INT,
    CONSTRAINT fk_lesson_course
      FOREIGN KEY (course_id) REFERENCES courses(id)
      ON DELETE CASCADE
);

-- Student Purchases / Enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress DECIMAL(5,2) DEFAULT 0, -- percentage
    CONSTRAINT fk_enrollment_user
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_course
      FOREIGN KEY (course_id) REFERENCES courses(id)
      ON DELETE CASCADE
);

-- E‑commerce: Products and orders
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL, -- merch, digital
    price DECIMAL(10,2) NOT NULL,
    inventory INT DEFAULT 0,
    download_url TEXT, -- for digital products
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, shipped, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_order_item_order
      FOREIGN KEY (order_id) REFERENCES orders(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_order_item_product
      FOREIGN KEY (product_id) REFERENCES products(id)
      ON DELETE SET NULL
);

-- Coupons / Discounts
CREATE TABLE IF NOT EXISTS coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INT,
    expires_at TIMESTAMP
);

-- Marketing / CRM leads (newsletter segmentation)
CREATE TABLE IF NOT EXISTS releases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  release_date DATE,
  cover_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  spotify_url TEXT,
  apple_url TEXT,
  youtube_url TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  email VARCHAR(150) NOT NULL,
  name VARCHAR(200) NULL,
  source VARCHAR(100) NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_newsletter_email (email),
  CONSTRAINT fk_newsletter_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Music Releases
CREATE TABLE IF NOT EXISTS releases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    release_date DATE,
  cover_url TEXT,
  thumbnail_url TEXT,
    description TEXT,
    spotify_url TEXT,
    apple_url TEXT,
    youtube_url TEXT,
    category VARCHAR(50), -- vt, rodel_releases, collabs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre‑save records for upcoming releases
CREATE TABLE IF NOT EXISTS presaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    release_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_presave_user
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_presave_release
      FOREIGN KEY (release_id) REFERENCES releases(id)
      ON DELETE CASCADE
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
  content TEXT,
  thumbnail_url TEXT,
    author_id INT,
    category VARCHAR(50),
    tags TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_author
      FOREIGN KEY (author_id) REFERENCES users(id)
      ON DELETE SET NULL
);

-- CMS: Uploaded assets (cover art, thumbnails, trailers)
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_url TEXT NOT NULL,
    type VARCHAR(50),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asset_uploader
      FOREIGN KEY (uploaded_by) REFERENCES users(id)
      ON DELETE SET NULL
);
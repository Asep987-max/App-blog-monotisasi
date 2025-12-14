-- Users Table (Admin & Authors)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE, -- For Google OAuth
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role ENUM('admin', 'author', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT, -- Stores HTML/Markdown
    cover_image_url VARCHAR(500),
    status ENUM('draft', 'published') DEFAULT 'draft',
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Ad Placements (Dynamic Monetization)
CREATE TABLE IF NOT EXISTS ad_placements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    placement_key VARCHAR(50) NOT NULL UNIQUE,
    -- e.g., 'home_header', 'article_sidebar', 'article_mid_content'
    label VARCHAR(100) NOT NULL, -- Friendly name for Admin UI
    ad_code TEXT, -- The actual <script> or HTML from AdSense/AdManager
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);

-- Seed Initial Categories
INSERT IGNORE INTO categories (name, slug) VALUES
('Politik', 'politik'),
('Eco', 'eco'),
('Sport', 'sport'),
('Ekonomi', 'ekonomi'),
('Tekno', 'tekno'),
('Lifestyle', 'lifestyle');

-- Seed Initial Ad Placements
INSERT IGNORE INTO ad_placements (placement_key, label, ad_code, is_active) VALUES
('home_header', 'Home Header', '<div class="bg-gray-200 p-4 text-center border border-dashed border-gray-400">Advertisement Space (728x90)</div>', 1),
('article_sidebar', 'Article Sidebar', '<div class="bg-gray-200 p-4 text-center border border-dashed border-gray-400 h-64">Advertisement Space (300x250)</div>', 1);

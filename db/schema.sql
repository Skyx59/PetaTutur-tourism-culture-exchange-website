SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS narratives;
DROP TABLE IF EXISTS itineraries;
DROP TABLE IF EXISTS reputation_reviews;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Superadmin', 'Turis', 'Penyedia Jasa') NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    specific_data JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    tags JSON DEFAULT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    media_path VARCHAR(255)
);

CREATE TABLE narratives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider_id INT NOT NULL,
    location_id INT,
    location_name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    narrative_type ENUM('Cerita/Narasi', 'Catatan Budaya', 'Audio') DEFAULT 'Cerita/Narasi',
    description TEXT NOT NULL,
    tags JSON DEFAULT NULL,
    media_type ENUM('text', 'audio', 'image', 'document') DEFAULT 'text',
    media_path VARCHAR(255),
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE itineraries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tourist_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    travel_date DATE,
    region VARCHAR(100),
    hours INT,
    route_data JSON NOT NULL,
    status ENUM('Draft', 'Completed') DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tourist_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reputation_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tourist_id INT NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    subject_type ENUM('Lokasi Budaya', 'Penyedia Jasa', 'Itinerary') DEFAULT 'Lokasi Budaya',
    rating TINYINT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tourist_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_reputation_rating CHECK (rating BETWEEN 1 AND 5)
);

-- Seed Default Superadmin
INSERT INTO users (name, email, password, role, status) 
VALUES ('Super Admin', 'admin@petatutur.com', 'admin123', 'Superadmin', 'approved');

-- Seed Sample Locations
INSERT INTO locations (region, name, description, category) VALUES
('Jawa Barat', 'Saung Angklung Udjo', 'Pusat pelestarian angklung dan budaya Sunda.', 'Seni Budaya'),
('Jawa Barat', 'Kampung Adat Cireundeu', 'Kampung yang dikenal dengan ketahanan pangan singkong.', 'Masyarakat Adat'),
('Jawa Barat', 'Dusun Bambu', 'Kawasan ekowisata berbasis budaya di kaki Gunung Burangrang.', 'Alam & Budaya'),
('Jawa Barat', 'Tangkuban Perahu', 'Gunung berapi aktif dengan kawah yang indah.', 'Alam'),
('Jawa Barat', 'Kawah Putih', 'Danau kawah vulkanik dengan air berwarna putih kehijauan.', 'Alam'),
('Jawa Barat', 'Gedung Sate', 'Ikon arsitektur Kota Bandung yang bersejarah.', 'Sejarah'),
('DI Yogyakarta', 'Taman Sari', 'Situs bekas kebun istana Keraton Yogyakarta.', 'Sejarah'),
('DI Yogyakarta', 'Desa Wisata Kasongan', 'Pusat kerajinan gerabah legendaris.', 'Kerajinan'),
('DI Yogyakarta', 'Prambanan', 'Kompleks candi Hindu terbesar di Indonesia.', 'Sejarah'),
('DI Yogyakarta', 'Keraton Yogyakarta', 'Istana resmi Kesultanan Ngayogyakarta Hadiningrat.', 'Sejarah'),
('DI Yogyakarta', 'Malioboro', 'Pusat perbelanjaan dan ikon budaya Yogyakarta.', 'Budaya'),
('DI Yogyakarta', 'Pantai Parangtritis', 'Pantai terkenal dengan legenda Nyai Roro Kidul.', 'Alam'),
('Bali', 'Pura Besakih', 'Pura terbesar dan tersuci di Bali.', 'Religi'),
('Bali', 'Desa Penglipuran', 'Salah satu desa terbersih di dunia dengan adat yang kental.', 'Masyarakat Adat'),
('Bali', 'Tirta Empul', 'Pura dengan pemandian suci peninggalan Dinasti Warmadewa.', 'Religi'),
('Bali', 'Uluwatu Temple', 'Pura di atas tebing dengan pemandangan laut yang menakjubkan.', 'Religi'),
('Bali', 'Tegallalang Rice Terrace', 'Sawah terasering yang ikonik di Ubud.', 'Alam'),
('Bali', 'Tanah Lot', 'Pura di atas batu karang besar di pinggir laut.', 'Religi'),
('DKI Jakarta', 'Monas', 'Monumen Nasional yang menjadi simbol kemerdekaan Indonesia.', 'Sejarah'),
('DKI Jakarta', 'Kota Tua', 'Kawasan bersejarah dengan bangunan kolonial Belanda.', 'Sejarah'),
('DKI Jakarta', 'Museum Fatahillah', 'Museum Sejarah Jakarta yang terletak di Kota Tua.', 'Sejarah'),
('DKI Jakarta', 'Taman Mini Indonesia Indah', 'Taman rangkuman kebudayaan bangsa Indonesia.', 'Budaya'),
('DKI Jakarta', 'Ancol Dreamland', 'Kawasan wisata terpadu di tepi laut Jakarta.', 'Rekreasi'),
('DKI Jakarta', 'Kepulauan Seribu', 'Gugusan pulau di Teluk Jakarta yang eksotis.', 'Alam');


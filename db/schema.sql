CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Superadmin', 'Konsumen', 'Produsen') NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    specific_data JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Superadmin
-- Password should be hashed in a real application
INSERT INTO users (name, email, password, role, status) 
VALUES ('Super Admin', 'admin@petatutur.com', 'admin123', 'Superadmin', 'approved')
ON DUPLICATE KEY UPDATE email=email;

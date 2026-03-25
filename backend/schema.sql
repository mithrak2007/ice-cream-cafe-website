CREATE DATABASE IF NOT EXISTS frost_and_bloom;
USE frost_and_bloom;

CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(60) NOT NULL,
    is_available TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    occasion VARCHAR(150) DEFAULT '',
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name, description, price, category, is_available) VALUES
('Rose Pistachio Silk', 'Fragrant rose milk ice cream with roasted pistachio crunch.', 149.00, 'Signature', 1),
('Sea Salt Caramel Swirl', 'Buttery caramel ribbons folded into smooth sea salt cream.', 159.00, 'Classic', 1),
('Mango Saffron Glow', 'Alphonso mango blended with saffron and a soft vanilla finish.', 145.00, 'Seasonal', 1),
('Dark Cocoa Hazelnut', 'Deep cocoa ice cream with toasted hazelnut praline.', 169.00, 'Premium', 1),
('Tender Coconut Mist', 'A cooling coconut scoop inspired by fresh beachside desserts.', 139.00, 'Fresh', 1),
('Berry Cheesecake Pop', 'Cheesecake cream, strawberry compote, and biscuit crumble.', 165.00, 'Favourite', 1);

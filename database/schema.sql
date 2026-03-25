DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS icecream_flavors;

CREATE TABLE icecream_flavors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO icecream_flavors (name, price, description, image_url) VALUES
('Berry Cloud Sundae', 189.00, 'A dreamy strawberry and blueberry scoop layered with whipped cream notes.', 'images/flavor-berry.svg'),
('Vanilla Bloom Cone', 149.00, 'Silky Madagascar vanilla with crisp waffle cone crunch.', 'images/flavor-vanilla.svg'),
('Mint Lagoon Swirl', 169.00, 'Fresh mint cream balanced with dark chocolate ripples.', 'images/flavor-mint.svg'),
('Caramel Sunburst', 199.00, 'Golden caramel ice cream finished with toasted almond praline.', 'images/flavor-caramel.svg'),
('Cotton Candy Kiss', 179.00, 'Playful pastel scoop with carnival sweetness and a creamy finish.', 'images/flavor-cotton.svg'),
('Blueberry Cheesecake Drift', 209.00, 'Rich cheesecake ice cream with blueberry ribbons and biscuit crumble.', 'images/flavor-cheesecake.svg');

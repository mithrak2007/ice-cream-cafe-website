const db = require("../db");

function validateFlavor(body) {
    const { name, price, description, image_url } = body;

    if (!name || !description || !image_url || price === undefined) {
        return "name, price, description, and image_url are required.";
    }

    if (Number.isNaN(Number(price))) {
        return "price must be a valid number.";
    }

    return null;
}

async function getAllFlavors(req, res) {
    try {
        const result = await db.query(
            "SELECT id, name, price, description, image_url FROM icecream_flavors ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch flavors.", error: error.message });
    }
}

async function getFlavorById(req, res) {
    try {
        const result = await db.query(
            "SELECT id, name, price, description, image_url FROM icecream_flavors WHERE id = $1",
            [req.params.id]
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: "Flavor not found." });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch flavor.", error: error.message });
    }
}

async function createFlavor(req, res) {
    const validationError = validateFlavor(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const { name, price, description, image_url } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO icecream_flavors (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, price, description, image_url]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create flavor.", error: error.message });
    }
}

async function updateFlavor(req, res) {
    const validationError = validateFlavor(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const { name, price, description, image_url } = req.body;

    try {
        const result = await db.query(
            "UPDATE icecream_flavors SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *",
            [name, price, description, image_url, req.params.id]
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: "Flavor not found." });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update flavor.", error: error.message });
    }
}

async function deleteFlavor(req, res) {
    try {
        const result = await db.query(
            "DELETE FROM icecream_flavors WHERE id = $1 RETURNING id",
            [req.params.id]
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: "Flavor not found." });
        }

        return res.json({ message: "Flavor deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete flavor.", error: error.message });
    }
}

module.exports = {
    getAllFlavors,
    getFlavorById,
    createFlavor,
    updateFlavor,
    deleteFlavor
};

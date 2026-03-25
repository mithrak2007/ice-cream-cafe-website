const db = require("../db");

async function submitContact(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "name, email, and message are required." });
    }

    try {
        await db.query(
            "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
            [name, email, message]
        );

        return res.status(201).json({ message: "Message submitted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Failed to submit message.", error: error.message });
    }
}

module.exports = {
    submitContact
};

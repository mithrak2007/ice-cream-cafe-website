const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

const flavorRoutes = require("./routes/flavorRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendPath));

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/flavors", flavorRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/:page(menu|about|contact|admin)", (req, res) => {
    res.sendFile(path.join(frontendPath, `${req.params.page}.html`));
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});

app.listen(port, () => {
    console.log(`Frosty Delights server is running on http://localhost:${port}`);
});

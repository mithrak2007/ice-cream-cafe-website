const express = require("express");
const controller = require("../controllers/contactController");

const router = express.Router();

router.post("/", controller.submitContact);

module.exports = router;

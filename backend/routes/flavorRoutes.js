const express = require("express");
const controller = require("../controllers/flavorsController");

const router = express.Router();

router.get("/", controller.getAllFlavors);
router.get("/:id", controller.getFlavorById);
router.post("/", controller.createFlavor);
router.put("/:id", controller.updateFlavor);
router.delete("/:id", controller.deleteFlavor);

module.exports = router;

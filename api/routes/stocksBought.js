const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const stocksBoughtController = require("../controllers/stocksBought");

//router.get("/", verifyToken, stocksBoughtController.index);
//router.get("/:buy_id", verifyToken, stocksBoughtController.show);
router.post("/", verifyToken, stocksBoughtController.create);
router.delete("/:buy_id", verifyToken, stocksBoughtController.destroy);
router.patch("/", verifyToken, stocksBoughtController.update);

module.exports = router;

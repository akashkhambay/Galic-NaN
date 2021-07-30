const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const sellsController = require("../controllers/sells");

//router.get("/", verifyToken, sellsController.index);
router.post("/",verifyToken, sellsController.create);
router.delete("/:buy_id",verifyToken, sellsController.destroy);
//router.patch("/",verifyToken, sellsController.update);

module.exports = router;

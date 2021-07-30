const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const userController = require("../controllers/users");

//router.get("/", verifyToken, userController.index);
router.get("/:id", verifyToken, userController.show);
//router.post("/", verifyToken, userController.create);
router.delete("/", verifyToken, userController.destroy);//future feature?

module.exports = router;

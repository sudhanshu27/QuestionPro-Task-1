const express = require("express");
const router = express.Router();

// user details route
const userController = require("../controllers/userController");
router.get("/:email", userController.getUserDetails);

module.exports = router;




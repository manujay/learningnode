const express = require("express");
const router = express.Router();

//Load User
const controller = require(".././controllers/userController");

// @route GET api/users/test
// @desc Tests some route
// @access Public
router.get("/test", controller.test);

// @route POST api/users/register
// @desc Create new User
// @access Public
router.post("/register", controller.create_user);

module.exports = router;

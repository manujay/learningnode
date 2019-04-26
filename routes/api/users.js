const express = require("express");
const router = express.Router();
const passport = require("passport");

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

// @route POST /api/users/login
// @desc Login User / Returning JWT Token
// @access Public
router.post("/login", controller.login_user);

// @route GET api/users/test
// @desc Tests some route
// @access Public
router.use(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

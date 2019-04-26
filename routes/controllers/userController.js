const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

exports.test = function(req, res) {
  res.json({ message: "Test successfull" });
};

exports.create_user = function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //Size
          r: "pg", //rating
          d: "mm" //default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => res.status(500).json({ message: err }));
};

exports.login_user = function(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.user = "User Not Found.";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrPrivateKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          }
        );

        return res;
      } else {
        errors.password = "Invalid Email Or Password";
        return res.status(400).json(errors);
      }
    });
  });
};

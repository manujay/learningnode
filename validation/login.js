const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be valid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email must be there";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password must be there";
  }

  if (!validator.is)
    return {
      errors,
      isValid: isEmpty(errors)
    };
};

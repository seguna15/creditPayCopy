const db = require("../model/db.json");
const otpVerifier = (req, res, next) => {
  if (req.body !== null) {
    req.otpDetails = db.find(
      (el) => el.email === req.body.email && el.otp === req.body.otp
    );
  }

  next();
};

module.exports = otpVerifier;

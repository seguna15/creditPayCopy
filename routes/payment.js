const express = require("express");
const paymentrouter = express.Router();
const {
  validateCardDetails,
  validateOTP,
} = require("../controllers/paymentController");
const cardVerifier = require('../middleware/cardVerifier');
const otpVerifier = require('../middleware/otpVerifier');

paymentrouter.post("/",cardVerifier,validateCardDetails);
paymentrouter.post("/validateOTP", otpVerifier, validateOTP);


module.exports = paymentrouter;


const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const db = require("../model/db.json");

const getAllCards = (req, res) => {
  res.json(db);
};

const validateCardDetails = (req, res) => {
  if (!req.cardDetails) {
    res.status(200).json({
      message: "Kindly check card insert card details",
      status: "401",
    });
  } else {
    
    let config = {
        service: 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
      form: process.env.EMAIL,
      to: req.cardDetails.email,
      subject: "Your OTP",
      text: req.cardDetails.otp,
      html: req.cardDetails.otp,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          message: "you should receive an email",
          status: "200",
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
   /*  res.status(200).json({
      message: "Request succcesful",
      status: "200",
    }); */
  }
};

//Validate email and OTP sent
const validateOTP = (req, res) => {
  if (!req.otpDetails) {
    res.status(200).json({
      message: "Invalid details card may be blocked.",
      status: "401",
    });
  } else {
    res.status(200).json({
      message: "Transaction successful",
      status: "200",
    });
  }
};

module.exports = {
  validateCardDetails,
  validateOTP,
};

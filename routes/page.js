const express = require('express');
const router = express.Router();
const {home, pay, success, register} = require('../controllers/pageController');

router.get("/", home );

router.get("/pay", pay);

router.get("/success", success);

module.exports = router;
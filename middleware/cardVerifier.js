const db = require("../model/db.json");
const cardVerifier =  (req, res, next) => {
    if (req.body !== null) {
        req.cardDetails = db.find(
        (el) =>
            el.email === req.body.email &&
            el.cardType === req.body.cardType &&
            el.cardNumber === req.body.cardNumber &&
            el.cardPin === req.body.cardPin &&
            el.expiryDate === req.body.expiryDate &&
            el.cvv === req.body.cvv
        ); 
        
        
    }

    next();
  };

module.exports = cardVerifier;

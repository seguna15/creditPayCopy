const path = require("path");

const  home = (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
};

const pay =  (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pay.html"));
};
 
const success = (req,res) => {
    res.sendFile(path.join(__dirname, '../public/success.html'));
};



module.exports = {
    home,
    pay,
    success,
};
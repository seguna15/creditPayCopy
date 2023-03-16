require('dotenv').config();
const express = require('express');
const app = express();

const router = require("./routes/page");
const paymentrouter = require("./routes/payment");

const port = 7000;

app.use(express.static('./public'));
app.use(express.json());
app.use('/', router);
app.use('/payment', paymentrouter);

app.listen(port, function() {
  console.log(`Server is running it http://localhost:${port}`);
});
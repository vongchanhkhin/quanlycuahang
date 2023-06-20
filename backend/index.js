const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const port = process.env.PORT || 8000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
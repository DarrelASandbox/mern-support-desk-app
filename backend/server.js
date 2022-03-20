const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk!' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));

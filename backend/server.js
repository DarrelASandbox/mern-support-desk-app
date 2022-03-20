const express = require('express');
const connectDB = require('./config/db');
const { errorMiddleware } = require('./middleware/errorMiddleware');

require('dotenv').config();
require('colors');

connectDB();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk!' });
});

app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

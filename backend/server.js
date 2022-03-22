const path = require('path');
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

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk!' });
  });
}

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`support-desk-app listening on port ${port}`)
);

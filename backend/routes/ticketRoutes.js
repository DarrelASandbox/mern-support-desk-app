const express = require('express');
const router = express.Router();
const { getTickets, createTicket } = require('../controllers/ticketController');
const { authMiddleware } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(authMiddleware, getTickets)
  .post(authMiddleware, createTicket);

module.exports = router;

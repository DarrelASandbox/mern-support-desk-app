const express = require('express');
const router = express.Router();
const {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');
const { authMiddleware } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(authMiddleware, getTickets)
  .post(authMiddleware, createTicket);

router
  .route('/:id')
  .get(authMiddleware, getTicket)
  .delete(authMiddleware, deleteTicket)
  .patch(authMiddleware, updateTicket);

module.exports = router;

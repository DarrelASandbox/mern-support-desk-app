const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

// Re-route into note router.
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

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

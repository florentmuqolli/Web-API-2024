const express = require('express');
const { createMessage, getMessages, markAsDone, deleteMessage } = require('../controllers/ContactController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cookieParser = require('cookie-parser');

router.post('/', createMessage);
router.get('/', getMessages);
router.put('/:id',authMiddleware, markAsDone);
router.delete('/:id',authMiddleware, deleteMessage)
router.use(cookieParser())

module.exports = router;

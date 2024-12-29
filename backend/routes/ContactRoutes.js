const express = require('express');
const { createMessage, getMessages, markAsDone, deleteMessage } = require('../controllers/ContactController');

const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.put('/:id', markAsDone);
router.delete('/:id', deleteMessage)

module.exports = router;

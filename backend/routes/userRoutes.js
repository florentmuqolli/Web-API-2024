const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/usersController');
const { registerUser , loginUser  } = require('../controllers/auth'); 
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', createUser); 

router.get('/:id', authMiddleware, getUser); 

router.put('/:id', authMiddleware, updateUser); 

router.delete('/:id', authMiddleware, deleteUser); 

router.post('/register', registerUser ); 
router.post('/login', loginUser ); 

module.exports = router;
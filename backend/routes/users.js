const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { registerUser , loginUser  } = require('../controllers/auth'); 
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', usersController.createUser ); 
router.get('/:id', authMiddleware, usersController.getUser ); 
router.put('/:id', authMiddleware, usersController.updateUser ); 
router.delete('/:id', authMiddleware, usersController.deleteUser ); 

router.post('/register', registerUser ); 
router.post('/login', loginUser ); 

module.exports = router;
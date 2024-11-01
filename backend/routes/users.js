const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { registerUser , loginUser  } = require('../controllers/auth'); // Importoni funksionet e regjistrimit dhe autentifikimit
const authMiddleware = require('../middleware/authMiddleware'); // Importoni middleware-in për autentifikim

// Rrugët për menaxhimin e përdoruesve
router.post('/', usersController.createUser ); // Krijimi i përdoruesit
router.get('/:id', authMiddleware, usersController.getUser ); // Marrja e informacionit të përdoruesit (mbrojtur)
router.put('/:id', authMiddleware, usersController.updateUser ); // Përditësimi i informacionit të përdoruesit (mbrojtur)
router.delete('/:id', authMiddleware, usersController.deleteUser ); // Fshirja e përdoruesit (mbrojtur)

// Rrugët për regjistrimin dhe autentifikimin e përdoruesve
router.post('/register', registerUser ); // Rruga për regjistrimin e përdoruesit
router.post('/login', loginUser ); // Rruga për autentifikimin e përdoruesit

module.exports = router;
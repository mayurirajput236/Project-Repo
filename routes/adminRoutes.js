// routes/adminRoutes.js
const express = require('express');
const { login ,createUser,updateUser,deleteUser,fetchAllUsers} = require('../controller/adminController.js');

const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware.js');
router.post('/login', login);
router.post('/create-user', authenticateToken, createUser); 
router.put('/update-user/:id', authenticateToken, updateUser); 
router.delete('/delete-user/:id', authenticateToken, deleteUser); 
router.get('/fetch-users', authenticateToken, fetchAllUsers); 
module.exports = router;



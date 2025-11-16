// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  deleteUserAccount,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); 
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);
router.delete('/delete-me', protect, deleteUserAccount);

module.exports = router;
const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router();

// Register
router.post('/', authController.register)

// Login
router.post('/', authController.login)

module.exports = router;

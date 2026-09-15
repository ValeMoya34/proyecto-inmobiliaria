const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ruta para registrarse: POST /api/auth/registro
router.post('/registro', authController.registrarUsuario);

// ruta para iniciar sesion: POST /api/auth/login
router.post('/login', authController.loginUsuario);

module.exports = router;
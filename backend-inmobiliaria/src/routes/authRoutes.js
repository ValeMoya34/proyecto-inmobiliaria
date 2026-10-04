const express = require('express');
const router = express.Router();
const {registrar, login} = require('../controllers/authController');

// ruta para registrarse: POST /api/auth/registro
router.post('/registro', registrar);

// ruta para iniciar sesion: POST /api/auth/login
router.post('/login', login);

module.exports = router;
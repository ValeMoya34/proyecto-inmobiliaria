const express = require('express');
const router = express.Router();
const {registrar, login, solicitarRecuperacion, resetearPassword} = require('../controllers/authController');

// ruta para registrarse: POST /api/auth/registro
router.post('/registro', registrar);

// ruta para iniciar sesion: POST /api/auth/login
router.post('/login', login);

//Rutas para recuperacion de password
router.post('/recuperar-password', solicitarRecuperacion);

router.post('/resetear-password', resetearPassword);

module.exports = router;
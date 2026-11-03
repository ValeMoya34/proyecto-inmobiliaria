const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolMiddleware');

router.get('/', verificarToken, verificarRol(['administrativa','dueño']), userController.listarRoles);

module.exports = router;
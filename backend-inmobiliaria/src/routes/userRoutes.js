const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolMiddleware');


// GET: Obtener usuarios,  con filtros opcionales por rol, estado y búsqueda (Hu07) 
router.get('/', verificarToken, verificarRol(['dueño', 'administrativa']), userController.listarUsuarios);

// PUT: Cambiar el rol de un usuario (HU06)
router.put('/:id/rol', verificarToken, verificarRol(['dueño','administrativa']), userController.cambiarRol);

//GET: Ver mi perfil (todos los roles)
router.get('/:id', verificarToken, userController.obtenerPerfil);

// PUT: Actualizar datos del perfil (HU08 - todos los roles)
router.put('/:id', verificarToken, userController.actualizarPerfil);


/* 
No la incluiria porque ya resolvimos la HU05 y en las nuevas no hablamos de 
cambio contraseña.

PUT /api/usuarios/:id/password
router.put('/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Encriptamos la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Usuario.findByIdAndUpdate(req.params.id, { password: hashedPassword });

    res.json({ mensaje: 'Contraseña restablecida con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
});*/

// PUT: Baja lógica de un usuario (HU10)
router.put('/:id/desactivar', verificarToken, verificarRol(['dueño', 'administrativa']), userController.desactivarUsuario);

module.exports = router;
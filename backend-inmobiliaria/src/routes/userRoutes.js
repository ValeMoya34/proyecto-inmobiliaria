const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// GET: Obtener todos los usuarios activos (con su rol populado)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find({ activo: true }).populate('rol_id', 'nombre');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// PUT: Cambiar el rol de un usuario (HU06)
router.put('/:id/rol', async (req, res) => {
  try {
    const { rol_id } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { rol_id },
      { new: true }
    );
    res.json({ mensaje: 'Rol actualizado con éxito', usuarioActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
});

// PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body;
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, email },
      { new: true } // Devuelve el documento actualizado
    );

    res.json({ 
      mensaje: 'Usuario actualizado con éxito', 
      usuarioActualizado 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});
import bcrypt from 'bcrypt';

// PUT /api/usuarios/:id/password
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
});

// PUT: Baja lógica de un usuario (HU10)
router.put('/:id/desactivar', async (req, res) => {
  try {
    const usuarioDesactivado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    res.json({ mensaje: 'Usuario desactivado correctamente', usuarioDesactivado });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar el usuario' });
  }
});

module.exports = router;
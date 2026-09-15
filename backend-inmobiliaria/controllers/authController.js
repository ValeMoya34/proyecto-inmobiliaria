const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. REGISTRO DE USUARIOS
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, rolNombre } = req.body;

    // verifica si el email ya está registrado
    let usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado.' });
    }

    // aca busca el rol deseado o se asigna 'Cliente' por defecto
    const nombreBuscado = rolNombre || 'Cliente';
    let rol = await Rol.findOne({ nombre: nombreBuscado });
    if (!rol) {
      // si todavia no existen roles en la base de datos, se crea automáticamente
      rol = await Rol.create({ nombre: nombreBuscado, descripcion: `Rol de ${nombreBuscado}` });
    }

    // encriptar contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password: passwordEncriptada,
      telefono,
      rol_id: rol._id
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente.',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al registrar el usuario.' });
  }
};

// 2. INICIO DE SESIÓN 
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // aca busca al usuario por email incluyendo los datos del rol
    const usuario = await Usuario.findOne({ email }).populate('rol_id', 'nombre');
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
    }

    // se comapra la contraseña q se ingresa con la contraseña encriptada
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
    }

    // se genera token JWT q vence en 24 horas
    const payload = {
      usuario: {
        id: usuario._id,
        rol: usuario.rol_id.nombre
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto_temporal', {
      expiresIn: '24h'
    });

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol_id.nombre
      }
    });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al iniciar sesión.' });
  }
};
const {registrarUsuario, loginUsuario, solicitarRecuperacion, resetearPassword} = require('../services/authService');

// 1. REGISTRO DE USUARIOS --> pasan el body al sevice
exports.registrar = async (req, res, next) => {

  try {
    const nuevoUsuario = await registrarUsuario(req.body);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente.',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol_id.nombre //nos trae el nombre del rol asignado
      }
    });
  } catch (error) {
    next(error); //agarra cualquier error y express lo manda al errorHandler que hicimos
  }
};

// 2. INICIO DE SESIÓN 
exports.login = async (req, res, next) => {
  try {
    const { token, usuario } = await loginUsuario(req.body);
    
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
    next(error);
  }
};


//3.Solicitar recuperacion
exports.solicitarRecuperacion = async (req, res, next) => {
  try {
    await solicitarRecuperacion(req.body);
    res.status(200).json({
      mensaje: 'Si el email está registrado, vas a recibir un enlace de recuperación.'
    });
  } catch (error) {
    next(error);
  }
};

exports.resetearPassword = async (req, res, next) => {
  try {
    await resetearPassword(req.body);
    res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    next(error);
  }
};
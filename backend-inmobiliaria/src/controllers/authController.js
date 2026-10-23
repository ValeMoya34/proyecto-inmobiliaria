const {registrarUsuario, loginUsuario, solicitarRecuperacion, resetearPassword} = require('../services/authService');

// 1. REGISTRO DE USUARIOS --> pasan el body al sevice
exports.registrar = async (req, res, next) => {

  try {
    const nuevoUsuario = await registrarUsuario(req.body);

    /*verifica si el email ya está registrado --> todo esto lo delegue al service
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

    await nuevoUsuario.save();*/

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
    next(error); //agarra cualquier error y express lo manda al errorHandler que hice
  }
};

// 2. INICIO DE SESIÓN 
exports.login = async (req, res, next) => {
  try {
    const { token, usuario } = await loginUsuario(req.body);

    /*A esto tambien lo pase todo al service: aca busca al usuario por email incluyendo los datos del rol
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
    });*/

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
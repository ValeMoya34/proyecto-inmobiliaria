const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const {Rol} = require('../models/Catalogos');
const AppError = require('../utils/AppError');
const config = require('../config/config');

// 1. REGISTRO DE USUARIOS
const registrarUsuario = async (datos) => {
    
    //tomo los datos de lo que manda el cliente
    const { nombre, apellido, telefono, email, password, acepta_terminos} = datos;

    //Verifica si acepta los terminos el usuario cliente de la inmo para guardarlo.
    if(!acepta_terminos){
        throw new AppError('Debe aceptar los términos y condiciones', 400);
    }

    if (password.length < 8) {
        throw new AppError('La contraseña debe tener al memos 8 caracteres', 400);
    }

    //Busca el docuemento con nombre: "cliente"
    const rolCliente = await Rol.findOne({nombre: 'cliente'});
    //Este if es una validación de que la base de datos esté bien configurada. Solo se dispara si en algún momento borraron el rol "cliente" de la colección roles
    if(!rolCliente){
        throw new AppError('No se encontró el rol "cliente" en la base de datos', 500);
    }

    //verifica si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        throw new AppError('El correo electrónico ya está registrado.', 409);
    }
    /* aca busca el rol deseado o se asigna 'Cliente' por defecto
    const nombreBuscado = rolNombre || 'Cliente';
    let rol = await Rol.findOne({ nombre: nombreBuscado });
    if (!rol) {
      // si todavia no existen roles en la base de datos, se crea automáticamente
      rol = await Rol.create({ nombre: nombreBuscado, descripcion: `Rol de ${nombreBuscado}` });
    }*/

    // encriptar contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // crear el nuevo usuario
    try{
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            telefono,
            email,
            password: passwordEncriptada,
            acepta_terminos,
            rol_id: rolCliente._id
        });
        //Para que en la prueba al crear el usuario nos traiga el nombre del rol no el id para ver que esta bien
        await nuevoUsuario.populate('rol_id', 'nombre');

        return nuevoUsuario;

    }catch(error){
        if(error.code === 11000){
            throw new AppError('Ese email ya está registrado', 409);
        }
        throw error;
    }
};

// 2. INICIO DE SESIÓN 
const loginUsuario = async (datos) => {

    const { email, password } = datos;

    if (!email || !password) {
        throw new AppError('Debe ingresar email y contraseña', 400);
    }

    // aca busca al usuario por email incluyendo los datos del rol
    const usuario = await Usuario.findOne({ email }).populate('rol_id', 'nombre');
    if (!usuario) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // se compara la contraseña q se ingresa con la contraseña encriptada
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      throw new AppError('Credenciales inválidas', 401);
    }

    //Esto lo puse como un control para el desarrollador
    if (!config.jwtSecret) {
        throw new AppError('Falta configurar el JWT_SECRET en el servidor', 500);
    }

    // se genera token JWT q vence en 24 horas
    const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol_id.nombre || 'cliente'},
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn || '24h'}
    );

    return {token, usuario};
};

module.exports = {registrarUsuario, loginUsuario};
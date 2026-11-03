const mongoose = require ('mongoose');
const Usuario = require('../models/Usuario');
const {Rol} = require('../models/Catalogos');
const AppError = require('../utils/AppError');

// 1. Obtener todos los usuarios activos Hu07 (con su rol populado)
const listarUsuarios = async(filtros = {}) =>{

    const query = {};

    //Le puse filtro por rol y estado
    const {rol, busqueda, estado} = filtros;

    //Filtro por Rol
    if(rol){
        const rolEncontrado = await Rol.findOne({nombre: rol});
        if(!rolEncontrado){
            return []; //Si no lo encuentra devuelve vacio
        }
        query.rol_id = rolEncontrado._id;
    }

    //Filtro por el estado del usuario
    if(estado === 'activo') query.activo = true;
    if(estado === 'inactivo') query.activo = false;

    //
    if(busqueda){
        //Realiza la busqueda sin distinguir mayusc y permite carac
        //teres especiales
        const texto = busqueda.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(texto, 'i');
        //Conicda con el nombre apellido o email
        query.$or = [{nombre: regex}, {apellido: regex}, {email: regex}];
    }

    return Usuario.find(query)
        .populate('rol_id', 'nombre')
        //Saca esos datos sensibles de la busqueda
        .select('-password -tokenRecuperacion -tokenRecuperacionExpira');
};

// 2. PUT: Cambiar el rol de un usuario, solo administrativa y dueño (HU06)
const cambiarRol = async (idUsuario, rolId, idAdmin) => {

    //Valido que seleccione un rol
    if (!rolId) {
        throw new AppError('Debés seleccionar un rol', 400);
    }

    //Valida que exista el idUsuario y idRol
    if (!mongoose.isValidObjectId(idUsuario) || !mongoose.isValidObjectId(rolId)) {
        throw new AppError('El identificador no es válido', 400);
    }

    //El admin no puede cambiarse el rol a sí mismo
    if (idUsuario.toString() === idAdmin.toString()) {
        throw new AppError('No podés cambiar tu propio rol', 400);
    }

    const rol = await Rol.findById(rolId);
    if (!rol) {
        throw new AppError('El rol seleccionado no existe', 404);
    }

    //Actualiza el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        idUsuario,
        { rol_id: rol._id },
        { new: true }
    )
        .populate('rol_id', 'nombre') //Devuelve solo esto
        .select('-password -tokenRecuperacion -tokenRecuperacionExpira'); //No devuelve esta info

    if (!usuarioActualizado) {
        throw new AppError('Usuario no encontrado', 404);
    }

    return usuarioActualizado;
};

//3. GET: ver mi perfil (HU08)
const obtenerPerfil = async(idUsuario) =>{
    //Busca el usuario por id
    const usuario = await Usuario.findById(idUsuario)
        //Muestra 
        .populate('rol_id', 'nombre')
        .select('-password -tokenRecuperacion -tokenRecuperacionExpira');

    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404);
    }

    return usuario;
};

//4. PUT: modificar datos de perfil (no email), todos los usuarios HU08
const actualizarPerfil = async(idUsuario, datos) =>{

    //Solo tomamos estos campos
    const camposPermitidos = ['nombre', 'apellido', 'telefono', 'direccion'];
    const cambios = {};

    //si el campo a cambiar no es undefined lo cambia por el dato pasado en la consulta
    camposPermitidos.forEach((campo)=>{
        if (datos[campo] !== undefined) {
            cambios[campo] = datos[campo];
        }
    });

    //Si cambios esta vacio lanza error
    if(Object.keys(cambios).length === 0){
        throw new AppError('No hay datos para actualizar', 400);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        idUsuario,
        cambios,
        {new: true, runValidators: true}
    )
        .populate('rol_id', 'nombre')
        .select('-password -tokenRecuperacion -tokenRecuperacionExpira');

    if (!usuarioActualizado) {
        throw new AppError('Usuario no encontrado', 404);
    }

    return usuarioActualizado;
};

//5. Baja lógica (HU10)
const desactivarUsuario = async(idUsuario, idAdmin) =>{

    //Valida que el usuario pertenezca a la BD
    if(!mongoose.isValidObjectId(idUsuario)){
        throw new AppError('Id de usuario no válido', 400);
    }

    //El admin no puede desactivar su cuenta
    if(idUsuario.toString() === idAdmin.toString()){
        throw new AppError('No podes desactivar tu cuenta', 400);
    }

    //Busca el usuario
    const usuario = await Usuario.findById(idUsuario);
    //Error si no lo encuentra
    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404);
    }
    if(!usuario.activo){
        throw new AppError('La cuenta ya esta desactivada', 400);
    }

    //Baja lógica: no borra el usuario le cambia el estado
    const usuarioDesactivado = await Usuario.findByIdAndUpdate(
        idUsuario,
        {activo: false},
        {new: true}
    )
        .populate('rol_id', 'nombre')
        .select('-password -tokenRecuperacion -tokenRecuperacionExpira');

        return usuarioDesactivado;
};

//GET: para ver los roles útil para el front
const listarRoles = async() =>{
    return Rol.find().sort({nombre: 1});
};

module.exports = {listarUsuarios, cambiarRol, obtenerPerfil, actualizarPerfil, desactivarUsuario, listarRoles};

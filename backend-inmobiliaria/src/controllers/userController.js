const userService = require('../services/userService');



exports.listarUsuarios = async(req, res, next) => {

    try{
        const usuarios = await userService.listarUsuarios(req.query);
        res.json(usuarios);

    }catch(error){
        next(error);
    }
};

exports.cambiarRol = async (req, res, next) => {
    
    try {
        const usuario = await userService.cambiarRol(
            req.params.id,
            req.body.rol_id,
            req.usuario.id
        );
        res.json({mensaje: 'Rol actualizado correctamente', usuario});

    } catch (error) {
        next(error);
    }
};

exports.obtenerPerfil = async(req, res, next) =>{

    try {
        const usuario = await userService.obtenerPerfil(req.usuario.id);
        res.json(usuario);

    } catch (error) {
        next(error);
    }
};

exports.actualizarPerfil = async(req, res, next) =>{

    try {
        const usuario = await userService.actualizarPerfil(req.usuario.id, req.body);
        res.json({mensaje: 'Usuario actulizado con éxito', usuario})

    } catch (error) {
        next(error);
    }
};

exports.desactivarUsuario = async (req, res, next) => {
    try {
        const usuario = await userService.desactivarUsuario(req.params.id, req.usuario.id);
        res.json({ mensaje: 'Cuenta desactivada correctamente', usuario });
    } catch (error) {
        next(error);
    }
};

exports.listarRoles = async(req, res, next) => {
    try {
        const roles = await userService.listarRoles();
        res.json(roles);
    } catch (error) {
        next(error);
    }
};

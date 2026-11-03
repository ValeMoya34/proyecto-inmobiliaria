const AppError = require('../utils/AppError');


//Lo ponemos antes de la ruta para designar a los usuarios que tiene permitido el acceso
const verificarRol = (rolesPermitidos) =>{

    return (req, res, next) =>{

        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return next (new AppError("No tenés permisos para acceder a esta sección", 403));
        }
        next();
    }
};

module.exports = verificarRol;
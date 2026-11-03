const authService = require('../services/authService');
const AppError = require('../utils/AppError');

//Con esto usamos el token que se crea en authService para saber quien accede
//a cada ruta
const verificarToken = async(req, res, next) =>{

    try {

        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            throw new AppError('Debe iniciar sesión', 401);
        }

        const token = header.split(' ')[1];
        const usuario = await authService.verificarSesion(token);

        req.usuario = {
            id: usuario._id,
            rol: usuario.rol_id.nombre
        };

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = verificarToken;
/*Nos va a servir para atrapar y dar los mensajes de error
A cualquier error que le pasemos next(error) desde el controller
termina aca para no responder el error manual en cada endpoint*/
const errorHandler = (err, req, res, next) =>{
    if (err.name === 'ValidationError') {
        const mensajes = Object.values(err.errors).map((e)=>e.message);
        return res.status(400).json({error: mensajes.join(', ')});
    }
    const statusCode = err.statusCode || 500;
    const mensaje = err.esOperacional
    ? err.message
    : 'Error interno del servidor';

    console.error(err);

    res.status(statusCode).json({
        status: 'error',
        error: mensaje
    });
}
module.exports = errorHandler;
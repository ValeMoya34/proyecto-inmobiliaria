/*ruta de comprobación (Healthcheck) */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).json({ status: 'OK', mensaje: 'Servidor de Inmobiliaria Signorelli activo' });
});

module.exports = router;
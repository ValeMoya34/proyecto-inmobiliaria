const express = require('express');
const cors = require('cors');

const checkRoutes = require('./routes/healthCheck');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());// Habilita la recepción de JSON en los request bodies

/* ruta de comprobación (Healthcheck) -> le cree su propio archivo en routes, para solo hacer el llamado aca
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK', mensaje: 'Servidor de Inmobiliaria Signorelli activo' });
});*/
app.use('/api/health', checkRoutes);
// rutas principales
app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;
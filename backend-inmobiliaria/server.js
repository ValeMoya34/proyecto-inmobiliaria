const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// cargar variables de entorno desde .env
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Habilita la recepción de JSON en los request bodies

// conexión a la base
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inmobiliaria_signorelli';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err.message));

// rutas principales
app.use('/api/auth', require('./routes/authRoutes'));

// ruta de comprobación (Healthcheck)
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK', mensaje: 'Servidor de Inmobiliaria Signorelli activo' });
});

// levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
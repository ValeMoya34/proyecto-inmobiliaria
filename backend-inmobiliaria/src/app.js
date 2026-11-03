const express = require('express');
const cors = require('cors');

const checkRoutes = require('./routes/healthCheck');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- Lo movemos acá arriba junto con los demás requires
const rolRoutes = require('./routes/rolRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


app.use(cors());
app.use(express.json());// Habilita la recepción de JSON en los request bodies

//ruta de comprobación (Healthcheck) 
app.use('/api/health', checkRoutes);
// rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
// nos trae los roles en BD
app.use('/api/roles', rolRoutes);

app.use(errorHandler);

module.exports = app;
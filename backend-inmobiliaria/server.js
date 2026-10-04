//Solo inicializa la conexion de la Base de Datos, y levanta el servidor.
require('dotenv').config(); // cargar variables de entorno desde .env
const app = require('./src/app');
const conectarDB = require('./src/config/db');

conectarDB();

// levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


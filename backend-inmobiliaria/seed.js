// seed.js
// Carga los roles iniciales en la base de datos.
// Se corre UNA vez para dejar la colección "roles" lista.
// Uso: node seed.js

require('dotenv').config();
const conectarDB = require('./src/config/db');
const { Rol } = require('./src/models/Catalogos');

const seed = async () => {
  await conectarDB();

  // Limpia por si el script se corre más de una vez
  await Rol.deleteMany({});

  await Rol.insertMany([
    { nombre: 'cliente' },
    { nombre: 'comercial' },
    { nombre: 'administrativa' },
    { nombre: 'tecnica' },
    { nombre: 'dueño' }
  ]);

  console.log('Roles cargados con éxito ✅');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Error al cargar los roles:', error);
  process.exit(1);
});
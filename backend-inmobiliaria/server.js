const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor Inmobiliaria Activo');
});

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
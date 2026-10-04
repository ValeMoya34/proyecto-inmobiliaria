const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

const Rol = mongoose.model('Rol', catalogoSchema, 'roles');
/*Aca abajo a medida que avancemos iriamos agregando tipo_propiedad,
operaciones, estados_propiedad etc. Todos comparten el mismo atrubuto
el _id que lo pone mongo y el nombre*/
module.exports = {Rol};
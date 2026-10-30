const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true } // Ej: 'Administrador', 'Cliente'
});

module.exports = mongoose.model('roles', rolSchema);
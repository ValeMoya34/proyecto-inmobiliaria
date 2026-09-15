const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    enum: ['Cliente', 'Administrador'],
    default: 'Cliente'
  },
  descripcion: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rol', RolSchema);
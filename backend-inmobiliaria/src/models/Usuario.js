const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El formato del correo no es válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  telefono: {
    type: String
  },
  acepta_terminos:{
    type: String,
    required: [true, 'Debe aceptar los terminos y condiciones']
  },
  rol_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
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
  direccion: {
    type: String // Útil para la gestión de datos de perfil (HU08 / HU09)
  },
  acepta_terminos:{
    type: String,
    required: [true, 'Debe aceptar los terminos y condiciones']
  },
  rol_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
    required: true
  },
  // NUEVO PARA EL SPRINT 2 (HU10: Baja lógica)
  activo: {
    type: Boolean,
    default: true
  },
  // Para resolver la HU05 que hablaba de enviar un token para recuperar la contraseña
  tokenRecuperacion: {
    type: String
  },
  tokenRecuperacionExpira: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
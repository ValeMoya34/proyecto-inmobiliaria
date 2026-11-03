const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio'],
    match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,}$/, 'El nombre solo puede tener letras (mínimo 2)']
  },
  apellido: {
    type: String,
    trim: true,
    required: [true, 'El apellido es obligatorio'],
    match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,}$/, 'El apellido solo puede tener letras (mínimo 2)']
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
    type: String,
    trim:true,
    match: [/^[0-9]{8,15}$/, 'El teléfono debe tener solo números, entre 5 y 15 dígitos']
  },
  direccion: {
    type: String, // Útil para la gestión de datos de perfil (HU08 / HU09)
    trim: true,
    maxlength: [100, 'La dirección no puede superar los 100 caracteres']
  },
  acepta_terminos:{
    type: Boolean,
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
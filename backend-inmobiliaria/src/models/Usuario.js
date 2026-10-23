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
  },
<<<<<<< HEAD
=======
  //Para resolver la HU05 que hablaba de enviar un token para recuperar la contraseña
  //me quedo colgado eso. Va ser ficticio y poco seguro porque lo muestra en la consola pero no en front
>>>>>>> 0880e2f45415e43a47ec01d867fe41ef3d303301
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
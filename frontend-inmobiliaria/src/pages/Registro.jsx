import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { colores } from '../styles/colores';
import { estiloInput, estiloLabel } from '../styles/formulario';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    confirmarPassword: '',
    acepta_terminos: false
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, acepta_terminos: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios, excepto el teléfono');
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(formData.email)) {
      setError('El formato del email no es válido');
      return;
    }

    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.acepta_terminos) {
      setError('Debés aceptar los términos y condiciones');
      return;
    }

    try {
      const { confirmarPassword, ...datosParaEnviar } = formData;
      const res = await api.post('/auth/registro', datosParaEnviar);
      setMensaje(res.data.mensaje);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar el usuario');
    }
  };

  const errorEsDeEmail = error.toLowerCase().includes('email') || error.toLowerCase().includes('correo');

  return (
    <div style={{ background: colores.fondoPagina, minHeight: 'calc(100vh - 65px)', padding: '40px 20px' }}>
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4px', color: colores.texto }}>Crear cuenta</h2>
        <p style={{ textAlign: 'center', fontStyle: 'italic', color: colores.textoMuted, fontSize: '13px', marginBottom: '20px' }}>
          "Registrate para agendar visitas y guardar tus propiedades favoritas"
        </p>

        {error && (
          <div style={{
            background: colores.errorBg,
            color: colores.errorTexto,
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        {mensaje && (
          <div style={{
            background: colores.exitoBg,
            color: colores.exitoTexto,
            border: `1px solid ${colores.exitoBorde}`,
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={estiloLabel}>Nombre: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="text" name="nombre" onChange={handleChange} style={estiloInput()} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Apellido: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="text" name="apellido" onChange={handleChange} style={estiloInput()} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Email: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="email" name="email" onChange={handleChange} style={estiloInput(errorEsDeEmail)} />
          {errorEsDeEmail && (
            <p style={{ color: colores.errorTexto, fontSize: '12px', margin: '2px 0 0' }}>{error}</p>
          )}

          <label style={{ ...estiloLabel, marginTop: '14px' }}>
            Teléfono <span style={{ color: colores.textoMuted, fontWeight: 400 }}>(opcional)</span>
          </label>
          <input type="tel" name="telefono" onChange={handleChange} style={estiloInput()} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Contraseña: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="password" name="password" onChange={handleChange} style={estiloInput()} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Confirmar contraseña: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="password" name="confirmarPassword" onChange={handleChange} style={estiloInput()} />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0', fontSize: '13px', color: colores.texto }}>
            <input
              type="checkbox"
              name="acepta_terminos"
              checked={formData.acepta_terminos}
              onChange={handleCheckboxChange}
            />
            Acepto los <span style={{ color: colores.azulLink }}>términos y condiciones</span>{' '}
            <span style={{ color: colores.errorTexto }}>*</span>
          </label>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: colores.dorado,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            Crear cuenta
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '16px', color: colores.texto }}>
            ¿Ya tenés cuenta?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: colores.azulLink, cursor: 'pointer' }}
            >
              Iniciar sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
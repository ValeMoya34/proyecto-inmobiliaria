import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { colores } from '../styles/colores';
import { estiloInput, estiloLabel } from '../styles/formulario';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Debés ingresar email y contraseña');
      return;
    }

    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.usuario, res.data.token);
      setExito(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales inválidas');
    }
  };

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
        <h2 style={{ textAlign: 'center', marginBottom: '4px', color: colores.texto }}>Iniciar sesión</h2>
        <p style={{ textAlign: 'center', color: colores.textoMuted, fontSize: '13px', marginBottom: '20px' }}>
          Accedé a tu cuenta para agendar visitas y ver tus datos
        </p>

        {exito && (
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
            ¡Inicio de sesión exitoso! Redirigiendo...
          </div>
        )}
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

        <form onSubmit={handleSubmit}>
          <label style={estiloLabel}>Email: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="email" name="email" onChange={handleChange} style={estiloInput()} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Contraseña: <span style={{ color: colores.errorTexto }}>*</span></label>
          <input type="password" name="password" onChange={handleChange} style={estiloInput()} />

          <p style={{ textAlign: 'right', fontSize: '13px', margin: '8px 0 20px' }}>
            <span onClick={() => navigate('/recuperar-password')} style={{ color: colores.azulLink, cursor: 'pointer' }}>¿Olvidaste tu contraseña?</span>
          </p>

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
            Iniciar sesión
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '16px', color: colores.texto }}>
            ¿No tenés cuenta?{' '}
            <span
              onClick={() => navigate('/registro')}
              style={{ color: colores.azulLink, cursor: 'pointer' }}
            >
              Registrate
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
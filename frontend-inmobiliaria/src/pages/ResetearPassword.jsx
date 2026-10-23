import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { colores } from '../styles/colores';
import { estiloInput, estiloLabel } from '../styles/formulario';

const ResetearPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nuevaPassword || !confirmarPassword) {
      setError('Completá los dos campos');
      return;
    }

    if (nuevaPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('/auth/resetear-password', { token, nuevaPassword });
      setExito(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'El enlace es inválido o expiró');
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
        <h2 style={{ textAlign: 'center', marginBottom: '4px', color: colores.texto }}>Nueva contraseña</h2>
        <p style={{ textAlign: 'center', color: colores.textoMuted, fontSize: '13px', marginBottom: '20px' }}>
          Elegí una nueva contraseña para tu cuenta
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
            Contraseña actualizada, redirigiendo al login...
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

        {!exito && (
          <form onSubmit={handleSubmit}>
            <label style={estiloLabel}>Nueva contraseña: <span style={{ color: colores.errorTexto }}>*</span></label>
            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              style={estiloInput()}
            />

            <label style={{ ...estiloLabel, marginTop: '14px' }}>Confirmar contraseña: <span style={{ color: colores.errorTexto }}>*</span></label>
            <input
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              style={{ ...estiloInput(), marginBottom: '20px' }}
            />

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
              Guardar contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetearPassword;
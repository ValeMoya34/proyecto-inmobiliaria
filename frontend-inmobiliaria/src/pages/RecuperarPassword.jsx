import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { colores } from '../styles/colores';
import { estiloInput, estiloLabel } from '../styles/formulario';

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const enviarSolicitud = async () => {
    try {
      await api.post('/auth/recuperar-password', { email });
      setEnviado(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Ocurrió un error, intentá de nuevo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Ingresá tu email');
      return;
    }

    await enviarSolicitud();
  };

  return (
    <div style={{ background: colores.fondoPagina, minHeight: 'calc(100vh - 65px)', padding: '40px 20px' }}>
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        {enviado ? (
          <>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: `2px solid ${colores.exitoBorde}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke={colores.exitoTexto} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p style={{ color: colores.texto, fontSize: '14px', marginBottom: '20px' }}>
              Te enviamos un enlace a <strong>{email}</strong> con las instrucciones para restablecer tu contraseña. El enlace vence en 30 minutos.
            </p>

            <button
              onClick={enviarSolicitud}
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
              Reenviar enlace
            </button>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '4px', color: colores.texto }}>Recuperar contraseña</h2>
            <p style={{ color: colores.textoMuted, fontSize: '13px', marginBottom: '20px' }}>
              Ingresá tu email registrado y te enviaremos un enlace para restablecerla
            </p>

            {error && (
              <div style={{
                background: colores.errorBg,
                color: colores.errorTexto,
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <label style={estiloLabel}>Email: <span style={{ color: colores.errorTexto }}>*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Enviar enlace
              </button>
            </form>
          </>
        )}

        <p style={{ fontSize: '13px', marginTop: '16px', color: colores.texto }}>
          <span onClick={() => navigate('/login')} style={{ color: colores.azulLink, cursor: 'pointer' }}>
            Volver a iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default RecuperarPassword;
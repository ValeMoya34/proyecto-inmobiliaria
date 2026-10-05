import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/LogoInmo.png';

const colores = {
  dorado: '#C9972F',
  texto: '#4A4A3F',
  textoMuted: '#8A8A80',
  fondo: '#fff',
  borde: '#E8E3CE'
};

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);

  const estiloLinkNav = {
    color: colores.texto,
    textDecoration: 'none',
    fontSize: '14px',
    marginRight: '28px'
  };

  const estiloLinkPendiente = {
    ...estiloLinkNav,
    color: colores.textoMuted,
    cursor: 'default'
  };

  return (
    <nav style={{
      padding: '12px 32px',
      backgroundColor: colores.fondo,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colores.borde}`
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="Inmobiliaria Signorelli" style={{ height: '60px' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={estiloLinkNav}>Inicio</Link>
        {/* Pendientes: todavía no tenemos la pantalla armada */}
        <span style={estiloLinkPendiente}>Propiedades</span>
        <span style={estiloLinkPendiente}>Nosotros</span>
        <span style={estiloLinkPendiente}>Contacto</span>

        {usuario ? (
          <>
            <span style={{ marginRight: '15px', color: colores.texto, fontSize: '14px' }}>
              Hola, <strong>{usuario.nombre}</strong> ({usuario.rol})
            </span>
            <button
              onClick={logout}
              style={{ padding: '6px 14px', cursor: 'pointer', border: `1px solid ${colores.dorado}`, borderRadius: '6px', background: 'transparent', color: colores.dorado }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ ...estiloLinkNav, color: colores.dorado }}>Login</Link>
            <Link to="/registro" style={{ ...estiloLinkNav, marginRight: 0, color: colores.dorado }}>Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
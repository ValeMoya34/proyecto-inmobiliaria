import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Registro from './pages/Registro';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: '15px 20px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      <h3 style={{ margin: 0, color: '#333' }}>Inmobiliaria Signorelli</h3>
      <div>
        {usuario ? (
          <>
            <span style={{ marginRight: '15px', color: '#333' }}>Hola, <strong>{usuario.nombre}</strong> ({usuario.rol})</span>
            <button onClick={logout} style={{ padding: '6px 12px', cursor: 'pointer' }}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
            <Link to="/registro" style={{ textDecoration: 'none', color: '#007bff' }}>Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Bienvenido a Inmobiliaria Signorelli</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RecuperarPassword from './pages/RecuperarPassword';
import ResetearPassword from './pages/ResetearPassword';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>Bienvenido a Inmobiliaria Signorelli</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
          <Route path="/resetear-password/:token" element={<ResetearPassword/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: ''
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      const res = await api.post('/auth/registro', formData);
      setMensaje(res.data.mensaje);
      setTimeout(() => navigate('/login'), 1500); // Redirigir al login tras registrarse
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar el usuario');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />       
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
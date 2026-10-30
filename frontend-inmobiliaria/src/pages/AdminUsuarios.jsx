import React, { useEffect, useState } from 'react';
import { 
  obtenerUsuarios, 
  desactivarUsuario, 
  actualizarRol, 
  crearUsuario, 
  actualizarUsuario,
  restablecerPassword 
} from '../services/userServices';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol_id: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar los usuarios', error);
    }
  };

  // HU10: Baja lógica
  const handleDesactivar = async (id) => {
    if (window.confirm('¿Estás seguro de dar de baja este usuario?')) {
      try {
        await desactivarUsuario(id);
        cargarUsuarios();
      } catch (error) {
        console.error('Error al desactivar usuario', error);
      }
    }
  };

  // HU06: Cambio de rol
  const handleCambioRol = async (idUsuario, nuevoRolId) => {
    try {
      await actualizarRol(idUsuario, nuevoRolId);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al actualizar el rol', error);
      alert('No se pudo actualizar el rol');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HU08: Preparar formulario para editar
  const iniciarEdicion = (user) => {
    setUsuarioEditandoId(user._id);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: '',
      rol_id: user.rol_id?._id || user.rol_id
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setUsuarioEditandoId(null);
    setFormData({ nombre: '', apellido: '', email: '', password: '', rol_id: '' });
  };

  // HU07 (Crear) y HU08 (Editar)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (usuarioEditandoId) {
        await actualizarUsuario(usuarioEditandoId, {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email
        });
        alert('¡Usuario actualizado con éxito!');
      } else {
        await crearUsuario(formData);
        alert('¡Usuario creado con éxito!');
      }
      
      cerrarFormulario();
      cargarUsuarios();
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      alert('Hubo un error al procesar la operación.');
    }
  };

  // HU09: Restablecer contraseña
  const handleRestablecerPassword = async (id, nombreUsuario) => {
    const nuevaPassword = prompt(`Ingresá la nueva contraseña para ${nombreUsuario}:`);
    
    if (!nuevaPassword) return;

    if (nuevaPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await restablecerPassword(id, nuevaPassword);
      alert('¡Contraseña restablecida con éxito!');
    } catch (error) {
      console.error('Error al restablecer contraseña', error);
      alert('Hubo un error al cambiar la contraseña.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Panel de Administración - Gestión de Usuarios</h2>
        <button 
          className="btn btn-success"
          onClick={() => {
            if (mostrarFormulario) {
              cerrarFormulario();
            } else {
              setUsuarioEditandoId(null);
              setFormData({ nombre: '', apellido: '', email: '', password: '', rol_id: '' });
              setMostrarFormulario(true);
            }
          }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Usuario'}
        </button>
      </div>

      {/* FORMULARIO UNIFICADO (HU07 y HU08) */}
      {mostrarFormulario && (
        <div className="card p-4 mb-4 bg-light shadow-sm">
          <h4>{usuarioEditandoId ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h4>
          <form onSubmit={handleSubmitForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Apellido</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="apellido" 
                  value={formData.apellido} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              {!usuarioEditandoId && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              )}
            </div>

            {!usuarioEditandoId && (
              <div className="mb-3">
                <label className="form-label">Rol Inicial</label>
                <select 
                  className="form-select" 
                  name="rol_id" 
                  value={formData.rol_id} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">Seleccione un rol...</option>
                  <option value="ID_ROL_ADMIN">Administrador</option>
                  <option value="ID_ROL_EMPLEADO">Empleado</option>
                  <option value="ID_ROL_CLIENTE">Cliente</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              {usuarioEditandoId ? 'Guardar Cambios' : 'Guardar Usuario'}
            </button>
          </form>
        </div>
      )}
      
      {/* TABLA DE USUARIOS */}
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre y Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((user) => (
                <tr key={user._id}>
                  <td>{user.nombre} {user.apellido}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* HU06: Selector de Rol */}
                    <select 
                      className="form-select form-select-sm"
                      value={user.rol_id?._id || user.rol_id} 
                      onChange={(e) => handleCambioRol(user._id, e.target.value)}
                    >
                      <option value="ID_ROL_ADMIN">Administrador</option>
                      <option value="ID_ROL_EMPLEADO">Empleado</option>
                      <option value="ID_ROL_CLIENTE">Cliente</option>
                    </select>
                  </td>
                  <td>
                    {/* HU08: Botón Editar */}
                    <button 
                      className="btn btn-warning btn-sm me-1 mb-1"
                      onClick={() => iniciarEdicion(user)}
                    >
                      Editar
                    </button>

                    {/* HU09: Botón Clave */}
                    <button 
                      className="btn btn-info btn-sm me-1 mb-1 text-white"
                      onClick={() => handleRestablecerPassword(user._id, user.nombre)}
                    >
                      Clave
                    </button>

                    {/* HU10: Botón Dar de baja */}
                    <button 
                      className="btn btn-danger btn-sm mb-1"
                      onClick={() => handleDesactivar(user._id)}
                    >
                      Baja
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No hay usuarios activos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
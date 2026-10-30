import api from '../api/axios'; // Uso la instancia centralizada que ya tiene la baseURL y el token

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

// Cambiar rol de un usuario (HU06)
export const actualizarRol = async (id, rol_id) => {
  const response = await api.put(`/usuarios/${id}/rol`, { rol_id });
  return response.data;
};

//HU07
export const crearUsuario = async (datosUsuario) => {
  const response = await api.post('/usuarios', datosUsuario);
  return response.data;
};

// HU08
export const actualizarUsuario = async (id, datosActualizados) => {
  const response = await api.put(`/usuarios/${id}`, datosActualizados);
  return response.data;
};

// HU09
export const restablecerPassword = async (id, nuevaPassword) => {
  const response = await api.put(`/usuarios/${id}/password`, { password: nuevaPassword });
  return response.data;
};
// Baja lógica de un usuario (HU10)
export const desactivarUsuario = async (id) => {
  const response = await api.put(`/usuarios/${id}/desactivar`);
  return response.data;
};
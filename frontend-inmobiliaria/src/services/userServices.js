import api from '../api/axios'; // Uso la instancia centralizada que ya tiene la baseURL y el token

// HU06: Obtener todos los usuarios
export const obtenerUsuarios = async (filtros = {}) => {
  const response = await api.get('/usuarios', {params: filtros});
  return response.data;
};

//HU06: listar roles para el dropdown
export const obtenerRoles = async() =>{
  const response = await api.get('/roles');
  return response.data;
}

//HU06: Cambiar rol de un usuario (HU06)
export const actualizarRol = async (id, rol_id) => {
  const response = await api.put(`/usuarios/${id}/rol`, { rol_id });
  return response.data;
};

/*HU07: ya definimos registro
export const crearUsuario = async (datosUsuario) => {
  const response = await api.post('/usuarios', datosUsuario);
  return response.data;
};*/

// HU08: ver mi perfil
export const obtenerPerfil = async() =>{
  const response = await api.get('/usuarios/perfil');
  return response.data;
}

// HU08 y HU09: actualizar mi perfil
export const actualizarPerfil = async (datosActualizados) => {
  const response = await api.put('usuarios/perfil', datosActualizados);
  return response.data;
};

/*HU09
export const restablecerPassword = async (id, nuevaPassword) => {
  const response = await api.put(`/usuarios/${id}/password`, { password: nuevaPassword });
  return response.data;
};*/

// Baja lógica de un usuario (HU10)
export const desactivarUsuario = async (id) => {
  const response = await api.put(`/usuarios/${id}/desactivar`);
  return response.data;
};
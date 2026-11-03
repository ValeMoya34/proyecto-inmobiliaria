import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// interceptor q adjunta el token en cada petición si existe
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

//Si el back responde 401 con una sesion abierta, el token vencio o dejo de ser valido
api.interceptors.response.use(
  (response) => response,
  (error) =>{
    const huboSesion = localStorage.getItem('token');

    if (error.response?.status === 401 && huboSesion) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login?expirada=1';
    }
    return Promise.reject(error);
  }
);

export default api;
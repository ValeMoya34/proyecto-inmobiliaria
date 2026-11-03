import { Children, useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

//HU07: proteger la ruta para que no cualquiera pueda entrar
const RutaProtegida = ({children, roles}) =>{

    const { usuario, cargando } = useContext(AuthContext);

    //Lee el localStorage no muestra nada
    if (cargando) return null;

    //1° Sin sesión: al login
    if (!usuario) {
        return <Navigate to="/" replace />;
    }

     //2° Con sesión pero sin el rol permitido: acceso denegado
    if (roles && !roles.includes(usuario.rol)) {
        return <Navigate to="/acceso-denegado" replace />;
    }

    return children;
};

export default RutaProtegida;
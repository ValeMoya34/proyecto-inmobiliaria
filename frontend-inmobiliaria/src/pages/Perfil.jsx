import { useContext, useEffect, useState } from "react";
import { obtenerPerfil, actualizarPerfil } from "../services/userServices";
import { AuthContext } from "../context/AuthContext";
import { colores } from "../styles/colores";
import { estiloInput, estiloLabel } from "../styles/formulario";

const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,}$/;
const REGEX_TELEFONO = /^[0-9]{8,15}$/;

const MensajeError = ({texto}) =>
    texto ? <p style={{color: colores.errorTexto, fontSize: '12px', margin: '4px 0 0'}}>{texto}</p> : null;

const Perfil = () =>{
    const { actualizarSesion } = useContext(AuthContext);
    const [formData, setFormData] = useState({nombre: '', apellido: '', telefono: '', direccion: ''});
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [erroresCampo, setErroresCampo] = useState({});
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() =>{
        const cargarPerfil = async() =>{
            try {
                const perfil = await obtenerPerfil();
                setFormData({
                    nombre: perfil.nombre || '',
                    apellido: perfil.apellido || '',
                    telefono: perfil.telefono || '',
                    direccion: perfil.direccion || ''
                });
                setEmail(perfil.email);
                setRol(perfil.rol_id?.nombre);

            } catch (err) {
                setError(err.response?.data?.error || 'No se pudo cargar tu perfil');
            }
        };
        cargarPerfil();
    }, []);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
        //Al corregir un campo, se le saca el error
        setErroresCampo({...erroresCampo, [e.target.name]: ''});
    };
    
    //Hu09: validacion de campos obligatorios y formatos
    const validar = () =>{
        const errores = {};

        if (!formData.nombre.trim()) {
            errores.nombre = 'El nombre es obligatorio';
        }else if(!REGEX_NOMBRE.test(formData.nombre.trim())){
            errores.nombre = 'Solo se permiten letras';
        }

        if (!formData.apellido.trim()) {
            errores.apellido = 'El apellido es obligatorio';
        }else if(!REGEX_NOMBRE.test(formData.apellido.trim())){
            errores.apellido = 'Solo se permiten letras';
        }

        if (formData.telefono && !REGEX_TELEFONO.test(formData.telefono)) {
            errores.telefono = 'Ingrese solo números, entre 8 y 15 dígitos';
        }

        if (formData.direccion.length > 100) {
            errores.direccion = 'La dirección no puede superar los 100 caracteres';
        }

        return errores;
    };

    //HU08: guardar los cambios
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        setMensaje('');

        const errores = validar();
        setErroresCampo(errores);
        if (Object.keys(errores).length > 0) return;

        try {
            const respuesta = await actualizarPerfil(formData);
            //Actualiza el nombre en la navBar
            actualizarSesion({nombre: respuesta.usuario.nombre, apellido: respuesta.usuario.apellido});
            setMensaje('Tu perfil se actualizó correctamente');

        } catch (err) {
            setError(err.response?.data?.error || 'No se pudo actualizar el perfil');
        }
    };

    const iniciales = `${formData.nombre[0] || ''}${formData.apellido[0] || ''}`.toUpperCase();

    return (
    <div style={{ background: colores.fondoPagina, minHeight: 'calc(100vh - 65px)', padding: '40px 20px' }}>
      <div style={{
        maxWidth: '460px', margin: '0 auto', background: '#fff', borderRadius: '12px',
        padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%', background: colores.fondoPagina,
            border: `2px solid ${colores.dorado}`, color: colores.dorado, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px'
          }}>
            {iniciales}
          </div>
          <div>
            <h2 style={{ color: colores.texto, margin: 0 }}>{formData.nombre} {formData.apellido}</h2>
            <span style={{
              fontSize: '12px', color: '#fff', background: colores.dorado,
              padding: '2px 12px', borderRadius: '4px'
            }}>
              {rol}
            </span>
          </div>
        </div>

        {mensaje && (
          <div style={{
            background: colores.exitoBg, color: colores.exitoTexto, border: `1px solid ${colores.exitoBorde}`,
            padding: '10px 14px', borderRadius: '6px', fontSize: '13px', margin: '12px 0', textAlign: 'center'
          }}>
            {mensaje}
          </div>
        )}

        {error && (
          <div style={{
            background: colores.errorBg, color: colores.errorTexto, padding: '10px 14px',
            borderRadius: '6px', fontSize: '13px', margin: '12px 0', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={estiloLabel}>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                style={estiloInput(!!erroresCampo.nombre)} />
              <MensajeError texto={erroresCampo.nombre} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={estiloLabel}>Apellido:</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange}
                style={estiloInput(!!erroresCampo.apellido)} />
              <MensajeError texto={erroresCampo.apellido} />
            </div>
          </div>

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange}
            style={estiloInput(!!erroresCampo.telefono)} />
          <MensajeError texto={erroresCampo.telefono} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange}
            style={estiloInput(!!erroresCampo.direccion)} />
          <MensajeError texto={erroresCampo.direccion} />

          <label style={{ ...estiloLabel, marginTop: '14px' }}>Email:</label>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px', borderRadius: '6px', border: `1px solid ${colores.borde}`,
            background: '#f7f7f5', color: colores.textoMuted, fontSize: '14px'
          }}>
            <span>{email}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <MensajeError texto="El email no se puede modificar" />

          <button type="submit" style={{
            width: '100%', padding: '12px', marginTop: '20px', backgroundColor: colores.dorado,
            color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'pointer'
          }}>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
import { useState } from "react";
import { colores } from "../styles/colores";
import { estiloInput, estiloLabel } from "../styles/formulario";

//Aca separe para cambiar Rol asi no queda todo junto
const ModalCambiarRol = ({usuario, roles, onCancelar, onGuardar}) =>{
    
    const[rolId, setRolId] = useState('');
    const[error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');

        //Criterio 2 HU06: no se guarda el canbio sin el rol
        if (!rolId) {
            setError('Debés seleccionar un rol');
            return;
        }

        try {
            await onGuardar(rolId);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al actualizar el rol');
        }
  };

  return(
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000
    }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '380px' }}>
        <h3 style={{ color: colores.texto, marginBottom: '12px' }}>Modificar rol</h3>

        <label style={estiloLabel}>Usuario</label>
        <p style={{ margin: '0 0 8px', color: colores.textoMuted }}>
          {usuario.nombre} {usuario.apellido} · {usuario.email}
        </p>

        <label style={estiloLabel}>Rol actual</label>
        <p style={{ margin: '0 0 8px', color: colores.textoMuted }}>{usuario.rol_id?.nombre}</p>

        <form onSubmit={handleSubmit}>
          <label style={estiloLabel}>
            Nuevo rol <span style={{ color: colores.errorTexto }}>*</span>
          </label>
          <select
            value={rolId}
            onChange={(e) => { setRolId(e.target.value); setError(''); }}
            style={estiloInput(!!error)}
          >
            <option value="">Seleccioná un rol</option>
            {roles.map((r) => (
              <option key={r._id} value={r._id}>{r.nombre}</option>
            ))}
          </select>

          {error && (
            <p style={{ color: colores.errorTexto, fontSize: '12px', margin: '4px 0 0' }}>{error}</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
            <button type="button" onClick={onCancelar}>Cancelar</button>
            <button type="submit" style={{
              background: colores.dorado, color: '#fff', border: 'none',
              borderRadius: '6px', padding: '8px 16px', cursor: 'pointer'
            }}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )   
};

export default ModalCambiarRol;

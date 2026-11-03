import { useContext, useEffect, useState } from "react";
import {
  obtenerUsuarios,
  obtenerRoles,
  actualizarRol,
  desactivarUsuario,
} from "../services/userServices";
import { AuthContext } from "../context/AuthContext";
import { colores } from "../styles/colores";
import { estiloInput } from "../styles/formulario";
import ModalCambiarRol from "../components/ModalCambiarRol";
import ModalConfirmacion from "../components/ModalConfirmacion";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filtros, setFiltros] = useState({ busqueda: "", rol: "", estado: "" });
  const [error, setError] = useState("");
  const { usuario: usuarioLogueado } = useContext(AuthContext);
  const [usuarioEditandoRol, setUsuarioEditandoRol] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [usuarioADesactivar, setUsuarioADesactivar] = useState(null);

  const handleFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleGuardarRol = async (rolId) => {
    await actualizarRol(usuarioEditandoRol._id, rolId);
    setUsuarioEditandoRol(null);
    setMensaje("Rol actualizado correctamente");
    setTimeout(() => setMensaje(""), 3000);
    cargarUsuarios();
  };

  const handleDesactivar = async () => {
    await desactivarUsuario(usuarioADesactivar._id);
    setUsuarioADesactivar(null);
    setMensaje("Cuenta desactivada correctamente");
    setTimeout(() => setMensaje(""), 3000);
    cargarUsuarios();
  };

  const cargarUsuarios = async () => {
    try {
      setError("");
      //No mando los flitros de búsqueda vacios
      const filtrosAplicados = Object.fromEntries(
        Object.entries(filtros).filter(([, valor]) => valor !== ""),
      );

      const data = await obtenerUsuarios(filtrosAplicados);
      setUsuarios(data);
    } catch (err) {
      setError(
        err.response?.data?.error || "No se pudieron cargar los usuarios",
      );
    }
  };

  //Los roles se cargan una vez, al abrir la página
  useEffect(() => {
    obtenerRoles()
      .then(setRoles)
      .catch(() => setError("No se pudieron cargar los roles"));
  }, []);

  //Los usuarios se vuelven a cargar cada vez que cambiamos los filtros de busqueda
  useEffect(() => {
    cargarUsuarios();
  }, [filtros]);

  return (
    <div
      style={{
        background: colores.fondoPagina,
        minHeight: "calc(100vh - 65px)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: colores.texto, marginBottom: "16px" }}>
          Administración de usuarios
        </h2>

        {error && (
          <div
            style={{
              background: colores.errorBg,
              color: colores.errorTexto,
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {mensaje && (
          <div
            style={{
              background: colores.exitoBg,
              color: colores.exitoTexto,
              border: `1px solid ${colores.exitoBorde}`,
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {mensaje}
          </div>
        )}

        {/* FILTROS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <input
            type="text"
            name="busqueda"
            placeholder="Buscar por nombre o email"
            value={filtros.busqueda}
            onChange={handleFiltro}
            style={{
              ...estiloInput(),
              flex: 1,
              minWidth: "200px",
              marginBottom: 0,
            }}
          />
          <select
            name="rol"
            value={filtros.rol}
            onChange={handleFiltro}
            style={{ ...estiloInput(), width: "170px", marginBottom: 0 }}
          >
            <option value="">Todos los roles</option>
            {roles.map((r) => (
              <option key={r._id} value={r.nombre}>
                {r.nombre}
              </option>
            ))}
          </select>
          <select
            name="estado"
            value={filtros.estado}
            onChange={handleFiltro}
            style={{ ...estiloInput(), width: "150px", marginBottom: 0 }}
          >
            <option value="">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        {/* TABLA */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", color: colores.textoMuted }}>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: `1px solid ${colores.borde}`,
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: `1px solid ${colores.borde}`,
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: `1px solid ${colores.borde}`,
                  }}
                >
                  Rol
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: `1px solid ${colores.borde}`,
                  }}
                >
                  Estado
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: `1px solid ${colores.borde}`,
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: colores.textoMuted,
                    }}
                  >
                    No hay usuarios que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => {
                  const esMiCuenta = u._id === usuarioLogueado?.id;
                  return (
                    <tr
                      key={u._id}
                      style={{
                        color: u.activo ? colores.texto : colores.textoMuted,
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 8px",
                          borderBottom: `1px solid ${colores.borde}`,
                        }}
                      >
                        {u.nombre} {u.apellido}
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          borderBottom: `1px solid ${colores.borde}`,
                        }}
                      >
                        {u.email}
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          borderBottom: `1px solid ${colores.borde}`,
                        }}
                      >
                        {u.rol_id?.nombre}
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          borderBottom: `1px solid ${colores.borde}`,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            padding: "2px 10px",
                            borderRadius: "999px",
                            background: u.activo ? colores.exitoBg : "#eee",
                            color: u.activo
                              ? colores.exitoTexto
                              : colores.textoMuted,
                          }}
                        >
                          {u.activo ? "activo" : "inactivo"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          borderBottom: `1px solid ${colores.borde}`,
                          textAlign: "right",
                        }}
                      >
                        {!u.activo ? (
                          <span style={{ fontSize: "12px" }}>
                            Cuenta desactivada
                          </span>
                        ) : (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: "8px",
                                width: '160px',
                                marginLeft: 'auto'
                              }}
                            >
                              <button
                                disabled={esMiCuenta}
                                onClick={() => setUsuarioEditandoRol(u)}
                                style={{
                                  width: '100%',
                                  padding: "6px 14px",
                                  backgroundColor: colores.dorado,
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  fontSize: "14px",
                                  cursor: esMiCuenta
                                    ? "not-allowed"
                                    : "pointer",
                                  opacity: esMiCuenta ? 0.5 : 1,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Editar rol
                              </button>
                              <button
                                disabled={esMiCuenta}
                                onClick={() => setUsuarioADesactivar(u)}
                                style={{
                                  width: '100%',
                                  padding: "6px 14px",
                                  backgroundColor: "#e64c4c",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  fontSize: "14px",
                                  cursor: esMiCuenta
                                    ? "not-allowed"
                                    : "pointer",
                                  opacity: esMiCuenta ? 0.5 : 1,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Desactivar cuenta
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {usuarioEditandoRol && (
        <ModalCambiarRol
          usuario={usuarioEditandoRol}
          roles={roles}
          onCancelar={() => setUsuarioEditandoRol(null)}
          onGuardar={handleGuardarRol}
        />
      )}

      {usuarioADesactivar && (
        <ModalConfirmacion
          titulo={`¿Desactivar la cuenta de ${usuarioADesactivar.nombre} ${usuarioADesactivar.apellido}?`}
          mensaje="No podrá iniciar sesión. Sus datos se conservan en el sistema."
          textoConfirmar="Desactivar cuenta"
          onCancelar={() => setUsuarioADesactivar(null)}
          onConfirmar={handleDesactivar}
        />
      )}
    </div>
  );
};
export default AdminUsuarios;

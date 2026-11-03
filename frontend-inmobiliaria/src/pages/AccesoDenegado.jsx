import { useNavigate } from "react-router-dom";
import { colores } from "../styles/colores";

const AccesoDenegado = () => {
  const navigate = useNavigate();

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
          maxWidth: "420px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: colores.texto, marginBottom: "8px" }}>
          Acceso denegado
        </h2>
        <p
          style={{
            color: colores.textoMuted,
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          No tenés permisos para acceder a esta sección
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: colores.dorado,
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default AccesoDenegado;
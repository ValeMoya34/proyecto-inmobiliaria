import { useState } from "react";
import { colores } from "../styles/colores";

//Nos va a servir mas adelante tambien por ej para cancelar un turno
const ModalConfirmacion = ({
  titulo,
  mensaje,
  textoConfirmar,
  onCancelar,
  onConfirmar,
}) => {
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  const handleConfirmar = async () => {
    setError("");
    setProcesando(true);
    try {
      await onConfirmar();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo completar la acción");
      setProcesando(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "100%",
          maxWidth: "380px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: colores.texto, marginBottom: "8px" }}>{titulo}</h3>
        <p
          style={{
            color: colores.textoMuted,
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {mensaje}
        </p>

        {error && (
          <p
            style={{
              color: colores.errorTexto,
              fontSize: "12px",
              marginBottom: "12px",
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <button type="button" onClick={onCancelar} disabled={procesando}>
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={procesando}
            style={{
              background: colores.errorTexto,
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;

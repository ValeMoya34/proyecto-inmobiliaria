import { colores } from "./colores";

export const estiloInput = (conError = false) => ({
    display:'block',
    width: '100%',
    marginBottom: '4px',
    padding: '10px 12px',
    borderRadius: '6px',
    border: `1px solid ${conError ? colores.errorBorde : colores.bordeInput}`,
    fontSize: '14px',
    boxSizing: 'border-box'
});

export const estiloLabel = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: colores.texto,
    marginBottom: '6px'
}
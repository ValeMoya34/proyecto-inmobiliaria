import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarPassword from "./pages/RecuperarPassword";
import ResetearPassword from "./pages/ResetearPassword";
import AdminUsuarios from "./pages/AdminUsuarios";
import AccesoDenegado from "./pages/AccesoDenegado";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  color: "#333",
                }}
              >
                Bienvenido a Inmobiliaria Signorelli
              </h1>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route
            path="/resetear-password/:token"
            element={<ResetearPassword />}
          />
          <Route
            path="/admin/usuarios"
            element={
              <RutaProtegida roles={["administrativa", "dueño"]}>
                <AdminUsuarios />
              </RutaProtegida>
            }
          />
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          <Route path="/acceso-denegado" element={<AccesoDenegado />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

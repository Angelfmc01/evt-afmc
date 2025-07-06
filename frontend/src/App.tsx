import Login from "./pages/Login";
import ProductosPage from "./pages/Productos";
import HistorialPage from "./pages/Historial";
import Navbar from "./components/navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/authContext";
import ProtectedRoute from "./routes/ProtectedRoute";


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<ProtectedRoute roles={[1,2]}><Navbar/><ProductosPage /></ProtectedRoute>} />
          <Route path="/historial" element={ <ProtectedRoute roles={[1]}><Navbar/><HistorialPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

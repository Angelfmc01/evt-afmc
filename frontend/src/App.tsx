import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Historial from "./pages/Historial";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/historial" element={<Historial />} />
         <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

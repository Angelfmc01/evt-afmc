import { useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext as Context, type AuthContextType } from "./authConextHook";

interface DecodedToken {
  exp: number;
  iat: number;
  idUsuario: number;
  correo: string;
  rol: number;
  nombre: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [user, setUser] = useState<{
    nombre: string;
    rol: number;
    correo: string;
    idUsuario: number
  } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
 

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          setUser({
            nombre: decoded.nombre,
            rol: decoded.rol,
            correo: decoded.correo,
            idUsuario: decoded.idUsuario
          });
          const timeout = (decoded.exp - currentTime) * 1000;
          setTimeout(logout, timeout);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Error al decodificar token", err);
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      sessionStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser({
        nombre: decoded.nombre,
        rol: decoded.rol,
        correo: decoded.correo,
        idUsuario: decoded.idUsuario
      });
      const timeout = (decoded.exp - Date.now() / 1000) * 1000;
      setTimeout(logout, timeout);
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Asegúrate que el valor del contexto coincide con AuthContextType
  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
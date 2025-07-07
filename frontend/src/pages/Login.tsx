import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/authConextHook";
import FormLogin from "../components/formLogin";
import { loginUser } from "../services/usersAPI";
import { useEffect, useState } from "react";

interface LoginData {
  correo: string;
  contrasena: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")
  const { isAuthenticated, login } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/productos");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: LoginData) => {
    try {
      const result = await loginUser(data);
      if (result?.success && result.token) {
        sessionStorage.setItem("token", result.token)
        login(result.token); 
      } else {
        setErrorMessage(result?.message || "Error al iniciar sesion")
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <FormLogin onLogin={handleLogin} error={errorMessage} />
      </div>
    </div>
  );
};

{
  /*   {showAlert && (
          <div className="fixed bottom-4 right-4 w-full max-w-xs">
            <AlertDialog message={alertMessage} type={alertType} />
          </div>
        )} */
}

export default Login;

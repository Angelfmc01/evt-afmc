import { useEffect, useState } from "react";

interface LoginFormProps {
  onLogin: (data: { correo: string; contrasena: string }) => void;
  error?: string;
}

function FormLogin({ onLogin, error }: LoginFormProps) {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const [correoError, setCorreoError] = useState<string>("");
  const [contrasenaError, setContrasenaError] = useState<string>("");
  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!correo) {
      setCorreoError("Ingrese un correo");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setCorreoError("Correo no válido");
      valid = false;
    } else {
      setCorreoError("");
    }

    if (!contrasena) {
      setContrasenaError("Ingrese la contraseña");
      valid = false;
    } else {
      setContrasenaError("");
    }

    if (valid) onLogin({ correo, contrasena });
  };

  const handleCorreoChange = (value: string) => {
  setCorreo(value);
  setCorreoError("");  
};
const handleContrasenaChange = (value: string) => {
  setContrasena(value);
  setContrasenaError("");
};

  useEffect(() => {
    if (error === "Contraseña incorrecta") {
      setContrasenaError(error);
      console.log(error)
    }
    if (error === "Usuario no encontrado") {
      setCorreoError(error);
      console.log(error)
    }
  }, [error]);

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <div>
        <label className="block mb-1 text-gray-700 text-sm font-medium">
          Correo
        </label>
        <input
          onChange={(e) => handleCorreoChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="ejm@ept.com"
        />
        <div className="w-6 h-6 flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2">
      
        </div>
        <div className="min-h-[20px]">
          {correoError && (
            <span className="text-red-500 font-semibold text-sm ml-2 flex mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.75a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4zm0 6a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              {correoError}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-gray-700 text-sm font-medium">
          Contraseña
        </label>
        <input
          onChange={(e) => handleContrasenaChange(e.target.value)}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
        />
        <div className="min-h-[20px]">
          {contrasenaError && (
            <span className="text-red-500 font-semibold text-sm ml-2 flex mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.75a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4zm0 6a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              {contrasenaError}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}

export default FormLogin;

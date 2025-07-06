import { useState } from "react";


interface LoginFormProps{
  onLogin:(data: {correo: string; contrasena: string}) => void
}


function FormLogin({onLogin}: LoginFormProps) {
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setCorreo("")
    setContrasena("")

    if(!correo){
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      
      return;
    }
    if (!contrasena) {
      
      return;
    }

    onLogin({ contrasena, correo });
  }

  return (
      <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-700 text-sm font-medium">
              Correo
            </label>
            <input
              onChange={(e)=> setCorreo(e.target.value)}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ejm@ept.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 text-sm font-medium">
              Contraseña
            </label>
            <input
             onChange={(e)=> setContrasena(e.target.value)}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>
  )
}


export default FormLogin
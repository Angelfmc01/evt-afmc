const formLogin = () => {
  return (
      <form className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm font-medium">
              Correo
            </label>
            <input
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

export default formLogin

import FormLogin from "../components/formLogin.tsx";


const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <FormLogin/>      
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

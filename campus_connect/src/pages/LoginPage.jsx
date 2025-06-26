

const LoginPage = () => {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-500 text-white p-10 w-1/2">
          <h2 className="text-3xl font-bold mb-4"><span className="text-white font-extrabold">CampusConnect</span></h2>
          <p className="text-lg text-center">let's Connect Again,<br /> & Grow together</p>
         
          <p className="mt-10 text-sm">experiencing issues? kindly write to<br /> 
            <a href="mailto:support@oncomz.com" className="underline">abhishekgorde777@gmail.com</a>
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-2 text-gray-800">Login</h2>
          <p className="mb-6 text-sm text-gray-500">we’ll get you back to the app in just a minute.</p>

          <input
            type="email"
            placeholder="email"
            
           
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="password"
            className="border border-gray-300 rounded px-4 py-2 mb-1focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center mb-6">
          </div>
         <p>Don't have account?  <a href="/signup" className="text-blue-400">click here</a></p>
          <button
            
            className="bg-blue-600 txl  bg-indigo-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

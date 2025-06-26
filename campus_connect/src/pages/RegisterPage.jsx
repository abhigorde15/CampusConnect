const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100">
      <div className="flex  rounded-xl bg-white shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center  text-white p-10 w-1/2 bg-blue-500">
          <h2 className="text-3xl font-bold mb-4"><span className="text-white font-extrabold">CampusConnect</span></h2>
          <p className="text-lg text-center">Start your journey,<br /> and grow with peers</p>
          <p className="mt-10 text-sm">experiencing issues? kindly write to<br />
            <a href="mailto:abhishekgorde777@gmail.com" className="underline">abhishekgorde777@gmail.com</a>
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
          <p className="mb-6 text-sm text-gray-500">Create your account to join the community.</p>

          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
         <p>Already have Account? <a className="text-blue-500" href="/auth">click here</a></p>
          <button
            className="bg-blue-600 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

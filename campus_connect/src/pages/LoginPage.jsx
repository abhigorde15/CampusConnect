import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { loginUser } from "../services/AuthService"; // adjust path if needed

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const user = { email, password };

    try {
      const token = await loginUser(user);
      localStorage.setItem("token", token); // optionally store JWT
      toast.success("Login successful");
      setTimeout(() => navigate("/"), 1000); // redirect after login
    } catch (err) {
      toast.error(err.response?.data || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-500 text-white p-10 w-1/2">
          <h2 className="text-3xl font-bold mb-4">CampusConnect</h2>
          <p className="text-lg text-center">Let's connect again,<br /> & grow together</p>
          <p className="mt-10 text-sm">
            Experiencing issues?<br />
            <a href="mailto:abhishekgorde777@gmail.com" className="underline">abhishekgorde777@gmail.com</a>
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-2 text-gray-800">Login</h2>
          <p className="mb-6 text-sm text-gray-500">We’ll get you back in just a minute.</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>

          <p className="text-sm mt-4">
            Don’t have an account? <a href="/signup" className="text-blue-500">Click here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

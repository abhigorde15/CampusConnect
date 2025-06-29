import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../services/AuthService';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !branch || !year) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const user = { name, email, password, branch, year };

    try {
      await registerUser(user);
      toast.success("Registered successfully Verify Email");
      setTimeout(() => navigate("/verify"), 1500);
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex rounded-xl bg-white shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-center justify-center text-white p-10 w-1/2 bg-blue-500">
          <h2 className="text-3xl font-bold mb-4">CampusConnect</h2>
          <p className="text-lg text-center">Start your journey,<br /> and grow with peers</p>
          <p className="mt-10 text-sm">Issues? write to<br />
            <a href="mailto:abhishekgorde777@gmail.com" className="underline">abhishekgorde777@gmail.com</a>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
          <p className="mb-6 text-sm text-gray-500">Create your account to join the community.</p>

          <input type="text" name="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        
          <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPasword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          <input type="text" name="branch" placeholder="Branch (e.g. IT)" value={branch} onChange={(e) => setBranch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          <input type="text" name="year" placeholder="Year (e.g. SE, TE)" value={year} onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>

          <p className="text-sm mt-4">
            Already have an account? <a className="text-blue-500" href="/auth">Click here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

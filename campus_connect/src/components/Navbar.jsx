import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">CampusConnect</div>

        {/* Desktop nav */}
        <ul className="hidden sm:flex space-x-6 text-gray-700 font-medium">
          <a href="/"><li className="hover:text-blue-600 cursor-pointer">Home</li></a>
          <a href="/notes"><li className="hover:text-blue-600 cursor-pointer">Notes</li></a>
          <a href="/chat_groups"><li className="hover:text-blue-600 cursor-pointer">Chat Groups</li></a>
          <a href="/marketplace"><li className="hover:text-blue-600 cursor-pointer">Marketplace</li></a>
          <a href="/events"><li className="hover:text-blue-600 cursor-pointer">Events</li></a>
        </ul>

        {/* Desktop auth buttons */}
        <div>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 text-white px-4 py-1 rounded mr-3 hover:bg-blue-700 transition hidden sm:inline"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded font-medium border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition hidden sm:inline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth")}
                className="bg-blue-600 text-white px-4 py-1 rounded mr-3 hover:bg-blue-700 transition hidden sm:inline"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-1 rounded font-medium border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition hidden sm:inline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger icon (mobile only) */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(true)} className="text-3xl text-gray-700">
            &#9776;
          </button>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </nav>

      {/* Sidebar overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-xl font-bold text-blue-600">Menu</div>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-700">
            &times;
          </button>
        </div>

        <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
          <a href="/"><li className="hover:text-blue-600">Home</li></a>
          <a href="/notes"><li className="hover:text-blue-600">Notes</li></a>
          <a href="/chat_groups"><li className="hover:text-blue-600">Chat Groups</li></a>
          <a href="/marketplace"><li className="hover:text-blue-600">Marketplace</li></a>
          <a href="/events"><li className="hover:text-blue-600">Events</li></a>

          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-600 text-red-600 py-2 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/auth");
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

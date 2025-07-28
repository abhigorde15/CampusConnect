import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50 ">
        <div className="text-2xl font-bold text-blue-600">CampusConnect</div>

        {/* Desktop nav */}
        <ul className="hidden sm:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Notes</li>
          <li className="hover:text-blue-600 cursor-pointer">Chat Groups</li>
          <li className="hover:text-blue-600 cursor-pointer">Marketplace</li>
          <li className="hover:text-blue-600 cursor-pointer">Events</li>
        </ul>

        {/* Desktop login */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition hidden sm:inline">
          Login
        </button>

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
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-xl font-bold text-blue-600">Menu</div>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-700">
            &times;
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Notes</li>
          <li className="hover:text-blue-600 cursor-pointer">Chat Groups</li>
          <li className="hover:text-blue-600 cursor-pointer">Marketplace</li>
          <li className="hover:text-blue-600 cursor-pointer">Events</li>
          <li>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </li>
        </ul>
      </div>

      
    </>
  );
};
export default Navbar;
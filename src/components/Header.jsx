import React, { useState } from "react";

const Header = ({ isAdmin, onAdminLogin, onAdminLogout, onHomeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex w-full justify-between items-center">
          <button
            className="text-2xl font-bold text-green-700 bg-transparent border-none outline-none cursor-pointer hover:underline p-0 m-0"
            style={{ fontFamily: 'inherit' }}
            onClick={onHomeClick}
          >
            Reaper Resins
          </button>
          <button
            className="sm:hidden text-3xl text-green-700 focus:outline-none ml-2"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(m => !m)}
          >
            &#9776;
          </button>
        </div>
        <nav
          className={`$ 
            {menuOpen ? 'flex' : 'hidden'}
            flex-col sm:flex sm:flex-row sm:items-center w-full sm:w-auto mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-6
          `}
        >
          <a href="#products" className="block text-lg text-gray-700 hover:text-green-700 transition px-3 py-3 rounded-lg sm:px-0 sm:py-0">Products</a>
          <a href="#reviews" className="block text-lg text-gray-700 hover:text-green-700 transition px-3 py-3 rounded-lg sm:px-0 sm:py-0">Reviews</a>
          <a href="#contact" className="block text-lg text-gray-700 hover:text-green-700 transition px-3 py-3 rounded-lg sm:px-0 sm:py-0">Contact</a>
          {isAdmin ? (
            <button onClick={onAdminLogout} className="w-full sm:w-auto mt-2 sm:mt-0 bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition">Logout</button>
          ) : (
            <button onClick={onAdminLogin} className="w-full sm:w-auto mt-2 sm:mt-0 bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition">Admin Login</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

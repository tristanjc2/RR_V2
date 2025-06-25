import React from "react";

const Header = ({ isAdmin, onAdminLogin, onAdminLogout, onHomeClick }) => (
  <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <button
        className="text-2xl font-bold text-green-700 bg-transparent border-none outline-none cursor-pointer hover:underline p-0 m-0"
        style={{ fontFamily: 'inherit' }}
        onClick={onHomeClick}
      >
        Reaper Resins
      </button>
      <nav className="space-x-6 flex items-center">
        <a href="#products" className="text-gray-700 hover:text-green-700 transition">Products</a>
        <a href="#reviews" className="text-gray-700 hover:text-green-700 transition">Reviews</a>
        <a href="#contact" className="text-gray-700 hover:text-green-700 transition">Contact</a>
        {isAdmin ? (
          <button onClick={onAdminLogout} className="ml-6 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition">Logout</button>
        ) : (
          <button onClick={onAdminLogin} className="ml-6 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition">Admin Login</button>
        )}
      </nav>
    </div>
  </header>
);

export default Header;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = ({ isAdmin, user, onLogin, onLogout, onHomeClick }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userPhoto = user && user.photoURL;
  const userName = user && (user.displayName || user.email);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function handleClick(e) {
      // Hamburger menu
      const navMenu = document.getElementById('main-nav-menu');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      if (
        menuOpen &&
        !(navMenu?.contains(e.target)) &&
        !(hamburgerBtn?.contains(e.target))
      ) {
        setMenuOpen(false);
      }
      // Profile dropdown
      const profileDropdown = document.getElementById('profile-dropdown');
      const profileBtn = document.getElementById('profile-btn');
      if (
        dropdownOpen &&
        !(profileDropdown?.contains(e.target)) &&
        !(profileBtn?.contains(e.target))
      ) {
        setDropdownOpen(false);
      }
    }
    if (menuOpen || dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen, dropdownOpen]);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4 w-full">
        {/* Header row: Logo left, profile badge and hamburger right on mobile; nav/profile on desktop */}
        <div className="w-full flex flex-row items-center justify-between">
          {/* Logo (always left) */}
          <div className="flex items-center">
            <button
              className="text-2xl font-bold text-green-700 bg-transparent border-none outline-none cursor-pointer hover:underline p-0 m-0 text-center md:text-left"
              style={{ fontFamily: 'inherit' }}
              onClick={() => navigate('/')}
            >
              Reaper Resins
            </button>
          </div>

          {/* Desktop Nav + Profile (center/right) */}
          <div className="hidden md:flex flex-1 items-center justify-between">
            <nav className="flex flex-row gap-6 mx-auto">
              <button onClick={() => navigate('/products')} className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left">Products</button>
              <button onClick={() => navigate('/reviews')} className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left">Reviews</button>
              <button
  onClick={() => {
    if (window.location.pathname === "/") {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }}
  className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left"
>
  Contact
</button>
            </nav>
            {/* Animated Profile Badge (desktop) */}
            <div className="flex items-center gap-2 ml-auto relative">
              {user ? (
                <motion.button
                  id="profile-btn"
                  className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded-full hover:bg-green-50 transition relative"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-label="User menu"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <motion.img
                    src={userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'U')}`}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-green-700 shadow-sm"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: dropdownOpen ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-green-900 font-medium text-base max-w-[120px] truncate">{userName}</span>
                  <span className="text-xs text-gray-500 ml-1">▼</span>
                </motion.button>
              ) : (
                <button onClick={onLogin} className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition">Login</button>
              )}
              {/* Profile dropdown (desktop & mobile) */}
              {user && dropdownOpen && (
                <motion.div
                  id="profile-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-56 bg-white rounded-lg shadow-lg py-2 z-50 border"
                  style={{ minWidth: 220, top: '50px', right: '30px', position: 'absolute' }}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none"
                    onClick={() => setDropdownOpen(false)}
                    aria-label="Close dropdown"
                  >
                    &times;
                  </button>
                  <div className="px-4 py-2 text-gray-800 font-semibold border-b truncate">{userName}</div>
                  <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile'); }}>Profile</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/settings'); }}>Profile Settings</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/reviews'); }}>Reviews Left</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/liked'); }}>Products Liked</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-green-100 text-red-600 font-semibold border-t" onClick={() => { setDropdownOpen(false); onLogout(); }}>Logout</button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile: logo, profile badge/login (hidden at <=375px), and hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <motion.button
                id="profile-btn"
                className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded-full hover:bg-green-50 transition relative max-[375px]:hidden"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="User menu"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08 }}
              >
                <motion.img
                  src={userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'U')}`}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-green-700 shadow-sm"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: dropdownOpen ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            ) : (
              <button onClick={onLogin} className="bg-green-700 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-800 transition max-[375px]:hidden">Login</button>
            )}
            <button
              id="hamburger-btn"
              className="text-3xl text-green-700 focus:outline-none ml-2 max-[375px]:flex"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen(m => !m)}
            >
              {menuOpen ? <span>&times;</span> : <span>&#9776;</span>}
            </button>
            {user && dropdownOpen && (
              <motion.div
                id="profile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="fixed top-[50px] w-[45vw] left-1/2 -translate-x-1/2 bg-white rounded-b-lg shadow-lg py-2 z-[999] border md:hidden"
                style={{ minWidth: 220 }}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none"
                  onClick={() => setDropdownOpen(false)}
                  aria-label="Close dropdown"
                >
                  &times;
                </button>
                <div className="px-4 py-2 text-gray-800 font-semibold border-b truncate">{userName}</div>
                <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile'); }}>Profile</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/settings'); }}>Profile Settings</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/reviews'); }}>Reviews Left</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700" onClick={() => { setDropdownOpen(false); setMenuOpen(false); navigate('/profile/liked'); }}>Products Liked</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-green-100 text-red-600 font-semibold border-t" onClick={() => { setDropdownOpen(false); onLogout(); }}>Logout</button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu (dropdown) */}
          {menuOpen && (
            <nav className="md:hidden flex flex-col gap-2 bg-white rounded shadow p-4 fixed left-0 right-0 top-[64px] z-40">
              <button onClick={() => { setMenuOpen(false); navigate('/products'); }} className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left">Products</button>
              <button onClick={() => { setMenuOpen(false); navigate('/reviews'); }} className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left">Reviews</button>
              <button onClick={() => { setMenuOpen(false); navigate('/contact'); }} className="block text-lg text-gray-700 hover:text-green-700 transition px-2 py-2 rounded-lg text-left">Contact</button>
              {user ? (
                <div>
                  <button
                    id="profile-btn-mobile"
                    className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded-full hover:bg-green-50 transition"
                    onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                    aria-label="Go to profile"
                  >
                    <img
                      src={userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'U')}`}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full border-2 border-green-700 shadow-sm"
                    />
                    <span className="text-green-900 font-medium text-base max-w-[120px] truncate">{userName}</span>
                  </button>
                </div>
              ) : (
                <button onClick={onLogin} className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition">Login</button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

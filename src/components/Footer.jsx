import React from "react";

const Footer = () => (
  <footer className="bg-green-700 text-white py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
        <p>© {new Date().getFullYear()} Reaper Resins. All rights reserved.</p>
        <p className="text-sm mt-2 md:mt-0">Cannabis products are for adults only. Please consume responsibly.</p>
      </div>
      <div className="hidden md:flex flex-1 justify-center items-center">
        <svg viewBox="0 0 400 80" width="220" height="44" className="h-10 w-auto" style={{ maxWidth: '90vw' }} xmlns="http://www.w3.org/2000/svg" aria-label="TCmedia logo">
          <polyline points="40,10 10,40 40,70" fill="none" stroke="#00FF00" stroke-width="6"/>
          <polyline points="360,10 390,40 360,70" fill="none" stroke="#00FF00" stroke-width="6"/>
          <text x="50%" y="67%" text-anchor="middle" fill="none" stroke="#00FF00" stroke-width="2.5" font-size="48" font-family="Arial Black,Arial,sans-serif">TCmedia</text>
        </svg>
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-auto">
        {/* Telegram */}
        <a href="https://t.me/+TzgGpmtVBHY0MGY5" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <g>
              <path className="transition-all duration-300 group-hover:stroke-[#29A8E9] group-hover:scale-110" strokeLinecap="round" strokeLinejoin="round" d="M21.752 6.584a1.5 1.5 0 0 1-.986 1.877l-15 5a1.5 1.5 0 0 1-1.013-2.83l15-5a1.5 1.5 0 0 1 1.999 1.953z" />
              <path className="transition-all duration-300 group-hover:stroke-[#29A8E9] group-hover:translate-x-1" strokeLinecap="round" strokeLinejoin="round" d="M21.752 6.584l-8.752 8.752m0 0l-3.376-3.376m3.376 3.376l-1.5 4.5" />
            </g>
          </svg>
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/reaperresins/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-pink-500 group-hover:scale-110"/>
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-yellow-400 group-hover:scale-110"/>
            <circle cx="17" cy="7" r="1" fill="currentColor" className="transition-all duration-300 group-hover:fill-purple-500 group-hover:scale-125"/>
          </svg>
        </a>
        {/* SMS */}
        <a href="sms:+12077379594" aria-label="Text Message" className="hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <rect x="5" y="7" width="14" height="10" rx="2" fill="#25D366"/>
            <rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/>
            <rect x="7" y="13" width="6" height="2" rx="1" fill="#fff"/>
          </svg>
        </a>
        {/* Phone */}
        <a href="tel:+12077379594" aria-label="Phone" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-blue-500 group-hover:scale-110"/>
            <path d="M20.354 10.646a.5.5 0 0 1-.708-.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 .708-.708L14 13.293l1.646-1.647a.5.5 0 0 1 .708 0z" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-blue-500 group-hover:scale-110"/>
          </svg>
        </a>
      </div>
      {/* Center TCmedia on mobile below left text */}
      <div className="flex md:hidden w-full justify-center my-2">
        <svg viewBox="0 0 400 80" width="180" height="36" className="h-8 w-auto" style={{ maxWidth: '90vw' }} xmlns="http://www.w3.org/2000/svg" aria-label="TCmedia logo">
          <polyline points="40,10 10,40 40,70" fill="none" stroke="#00FF00" stroke-width="6"/>
          <polyline points="360,10 390,40 360,70" fill="none" stroke="#00FF00" stroke-width="6"/>
          <text x="50%" y="67%" text-anchor="middle" fill="none" stroke="#00FF00" stroke-width="2.5" font-size="40" font-family="Arial Black,Arial,sans-serif">TCmedia</text>
        </svg>
      </div>
    </div>
  </footer>
);

export default Footer;

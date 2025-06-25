import React from "react";

const Footer = () => (
  <footer className="bg-green-700 text-white py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
        <p>© {new Date().getFullYear()} Reaper Resins. All rights reserved.</p>
        <p className="text-sm mt-2 md:mt-0">Cannabis products are for adults only. Please consume responsibly.</p>
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-auto">
        {/* Telegram */}
        <a href="https://t.me/+TzgGpmtVBHY0MGY5" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <path d="M21 4L3.9 10.53c-.7.26-.7.67-.13.83l4.3 1.34 1.65 5.02c.22.67.42.83.87.67l2.1-1.54 4.37 3.23c.8.45 1.37.22 1.57-.74l2.84-13.12c.28-1.18-.45-1.7-1.45-1.18z" fill="#34AADF"/>
            <path d="M9.03 17.05c.13 0 .24-.05.34-.13l2.1-1.54-2.43-2.22-.01.01-.53 2.47c-.07.34.07.5.32.5z" fill="#C8DAEA"/>
            <path d="M10.74 15.38l4.18 3.09c.48.34.82.16.93-.45l2.84-13.12c.17-.76-.28-1.09-.92-.85l-13.2 5.36c-.7.26-.7.67-.13.83l4.3 1.34 1.65 5.02c.22.67.42.83.87.67l2.1-1.54z" fill="#A9C9DD"/>
          </svg>
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/officialreaperb/profilecard/?igsh=MXh6OW9jYzUyeG1lMg%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <rect x="6.5" y="6.5" width="11" height="11" rx="4" fill="#E1306C"/>
            <circle cx="12" cy="12" r="3.5" fill="#fff"/>
            <circle cx="16.5" cy="7.5" r="1" fill="#fff"/>
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
        <a href="tel:+12077379594" aria-label="Phone" className="hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <path d="M17 15.5c-1.38 0-2.74-.28-4.07-.84-1.33-.57-2.57-1.36-3.7-2.37-1.12-1-2.1-2.1-2.93-3.29C5.04 8.51 5 7.92 5.54 7.54l1.45-1.02c.43-.3 1.02-.18 1.3.25l1.13 1.7c.24.36.15.85-.2 1.1l-.7.54c.7.97 1.5 1.86 2.39 2.67.8.74 1.68 1.41 2.62 1.99l.37-.64a.82.82 0 01.98-.37l1.67.65c.48.19.66.77.36 1.19l-1.01 1.45c-.4.57-1.07.7-1.67.55z" fill="#25D366"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

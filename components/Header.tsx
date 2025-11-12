import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="block">
          <img src="/public/assets/logo.svg" alt="Fearp Logo" className="h-10" />
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `text-lg text-gray-600 hover:text-brand-dark-pink transition-colors duration-300 ${isActive ? 'font-bold text-brand-dark-pink' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
             <li>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => 
                  `text-lg text-gray-600 hover:text-brand-dark-pink transition-colors duration-300 ${isActive ? 'font-bold text-brand-dark-pink' : ''}`
                }
              >
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-lg text-gray-600 hover:text-brand-dark-pink transition-colors duration-300 ${isActive ? 'font-bold text-brand-dark-pink' : ''}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `text-lg text-gray-600 hover:text-brand-dark-pink transition-colors duration-300 ${isActive ? 'font-bold text-brand-dark-pink' : ''}`
                }
              >
                Contact
              </NavLink>
            </li>
            {/* --- Dropdown Menu for More Pages --- */}
            <li className="relative group">
              <button className="text-lg text-gray-600 hover:text-brand-dark-pink transition-colors duration-300 flex items-center">
                More
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-48 z-50 right-0">
                <NavLink to="/privacy-policy" className={({isActive}) => `block px-4 py-2 text-gray-600 hover:bg-brand-pink hover:text-brand-dark-pink ${isActive ? 'text-brand-dark-pink font-semibold' : ''}`}>Privacy Policy</NavLink>
                <NavLink to="/terms-and-conditions" className={({isActive}) => `block px-4 py-2 text-gray-600 hover:bg-brand-pink hover:text-brand-dark-pink ${isActive ? 'text-brand-dark-pink font-semibold' : ''}`}>Terms & Conditions</NavLink>
                <NavLink to="/faq" className={({isActive}) => `block px-4 py-2 text-gray-600 hover:bg-brand-pink hover:text-brand-dark-pink ${isActive ? 'text-brand-dark-pink font-semibold' : ''}`}>FAQ</NavLink>
                <NavLink to="/sitemap" className={({isActive}) => `block px-4 py-2 text-gray-600 hover:bg-brand-pink hover:text-brand-dark-pink ${isActive ? 'text-brand-dark-pink font-semibold' : ''}`}>Sitemap</NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
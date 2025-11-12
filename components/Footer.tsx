
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-pink border-t border-pink-200 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-brand-text">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
          <Link to="/about" className="text-gray-600 hover:text-brand-dark-pink transition-colors">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Contact Us</Link>
          <Link to="/privacy-policy" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Terms & Conditions</Link>
          <Link to="/disclaimer" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Disclaimer</Link>
          <Link to="/affiliate-disclosure" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Affiliate Disclosure</Link>
          <Link to="/sitemap" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Sitemap</Link>
          <Link to="/faq" className="text-gray-600 hover:text-brand-dark-pink transition-colors">FAQ</Link>
          <Link to="/cookie-policy" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Cookie Policy</Link>
          <Link to="/newsletter" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Newsletter</Link>
          <Link to="/collaborate" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Work With Us</Link>
          <Link to="/admin212" className="text-gray-600 hover:text-brand-dark-pink transition-colors">Admin</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Fearp. All Rights Reserved.</p>
        <p className="text-sm mt-1">Your daily dose of inspiration.</p>
      </div>
    </footer>
  );
};

export default Footer;
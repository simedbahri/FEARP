
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'fearp_cookie_consent';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentGiven) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      // If localStorage is unavailable (e.g., private browsing),
      // we can show the banner for the session.
      setIsVisible(true); 
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 border-t border-pink-200 dark:border-gray-700 z-50 shadow-2xl animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-brand-text dark:text-gray-300 text-center sm:text-left">
          We use cookies to enhance your experience and for advertising purposes. By continuing to visit this site you agree to our use of cookies. Read our{' '}
          <Link to="/cookie-policy" className="font-bold text-brand-dark-pink dark:text-pink-400 hover:underline">
            Cookie Policy
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-brand-dark-pink text-white font-bold py-2 px-6 rounded-md hover:bg-pink-500 transition-colors duration-300 flex-shrink-0"
        >
          Accept
        </button>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
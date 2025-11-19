import React, { useState, useEffect } from 'react';
import AdPlaceholder from './AdPlaceholder';

/**
 * Sticky Bottom Ad Component for Mobile
 * Optimized for arbitrage - shows sticky ad on mobile devices
 * Automatically hides on desktop and when user scrolls up
 */
const StickyAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show ad when user scrolls down, hide when scrolling up
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Only show on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-2 py-2">
        <AdPlaceholder type="sticky-bottom" />
      </div>
    </div>
  );
};

export default StickyAd;


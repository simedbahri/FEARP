/**
 * AdSense Configuration for Arbitrage Optimization
 * 
 * Replace YOUR_ADSENSE_PUBLISHER_ID with your actual AdSense Publisher ID
 * You can find this in your AdSense account under Account > Account information
 * 
 * Format: ca-pub-XXXXXXXXXXXXXXXX (the X's are your ID)
 */

export const AD_CONFIG = {
  // Your AdSense Publisher ID (without ca-pub- prefix)
  PUBLISHER_ID: process.env.REACT_APP_ADSENSE_PUBLISHER_ID || 'YOUR_ADSENSE_PUBLISHER_ID',
  
  // Enable/disable ads (useful for development)
  ENABLED: process.env.NODE_ENV === 'production',
  
  // Ad slot IDs (create these in AdSense dashboard)
  SLOTS: {
    // Homepage ads
    HOMEPAGE_LEADERBOARD: '1234567890', // 728x90 or responsive
    HOMEPAGE_SIDEBAR: '1234567891', // 300x600 or responsive
    HOMEPAGE_IN_FEED: '1234567892', // In-feed ads
    
    // Article page ads
    ARTICLE_TOP: '1234567893', // Above content
    ARTICLE_MIDDLE: '1234567894', // In-content
    ARTICLE_BOTTOM: '1234567895', // Below content
    ARTICLE_SIDEBAR: '1234567896', // Sidebar sticky
    
    // Mobile ads
    MOBILE_BANNER: '1234567897', // 320x50
    MOBILE_INTERSTITIAL: '1234567898', // Full screen (use carefully)
    
    // Sticky ads
    STICKY_BOTTOM: '1234567899', // Sticky bottom banner
  },
  
  // Ad refresh settings (for arbitrage optimization)
  REFRESH: {
    ENABLED: true,
    INTERVAL: 30000, // 30 seconds (AdSense allows 30s minimum)
    MAX_REFRESHES: 3, // Maximum refreshes per page view
  },
  
  // Ad density settings (stay within AdSense limits)
  DENSITY: {
    MAX_ADS_PER_PAGE: 3, // Maximum ads per page (AdSense limit)
    MIN_CONTENT_BETWEEN_ADS: 200, // Minimum pixels between ads
  },
};

/**
 * Get ad slot by type
 */
export const getAdSlot = (type: keyof typeof AD_CONFIG.SLOTS): string => {
  return AD_CONFIG.SLOTS[type] || AD_CONFIG.SLOTS.HOMEPAGE_LEADERBOARD;
};


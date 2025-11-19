import React from 'react';
import AdSense from './AdSense';
import { AD_CONFIG, getAdSlot } from './AdConfig';

type AdType = 'leaderboard' | 'sidebar' | 'in-feed' | 'in-article-top' | 'in-article-middle' | 'in-article-bottom' | 'footer' | 'mobile-banner' | 'sticky-bottom';

interface AdPlaceholderProps {
  type: AdType;
  className?: string;
}

const adStyles: Record<AdType, { className: string; text: string; adSlot: keyof typeof AD_CONFIG.SLOTS }> = {
  leaderboard: {
    className: 'h-24 w-full', // 728x90 or responsive
    text: 'Ad: Leaderboard (728x90)',
    adSlot: 'HOMEPAGE_LEADERBOARD',
  },
  sidebar: {
    className: 'h-64 md:h-96 lg:h-[600px] w-full', // 300x600 or responsive
    text: 'Ad: Sidebar (300x600)',
    adSlot: 'HOMEPAGE_SIDEBAR',
  },
  'in-feed': {
    className: 'aspect-[4/3] w-full', // Match article card aspect ratio
    text: 'Ad: In-Feed',
    adSlot: 'HOMEPAGE_IN_FEED',
  },
  'in-article-top': {
    className: 'h-48 my-8 w-full',
    text: 'Ad: In-Article (Top)',
    adSlot: 'ARTICLE_TOP',
  },
  'in-article-middle': {
    className: 'h-48 my-8 w-full',
    text: 'Ad: In-Article (Middle)',
    adSlot: 'ARTICLE_MIDDLE',
  },
  'in-article-bottom': {
    className: 'h-48 my-8 w-full',
    text: 'Ad: In-Article (Bottom)',
    adSlot: 'ARTICLE_BOTTOM',
  },
  footer: {
    className: 'h-24 my-8 w-full',
    text: 'Ad: Footer (728x90)',
    adSlot: 'HOMEPAGE_LEADERBOARD',
  },
  'mobile-banner': {
    className: 'h-16 md:hidden w-full', // 320x50 mobile banner
    text: 'Ad: Mobile Banner (320x50)',
    adSlot: 'MOBILE_BANNER',
  },
  'sticky-bottom': {
    className: 'fixed bottom-0 left-0 right-0 h-20 z-50 md:hidden', // Sticky mobile ad
    text: 'Ad: Sticky Bottom',
    adSlot: 'STICKY_BOTTOM',
  },
};

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '' }) => {
  const { className: defaultClassName, text, adSlot } = adStyles[type];
  const adSlotId = getAdSlot(adSlot);

  // If ads are disabled or no publisher ID, show placeholder
  if (!AD_CONFIG.ENABLED || AD_CONFIG.PUBLISHER_ID === 'YOUR_ADSENSE_PUBLISHER_ID') {
    return (
      <div
        className={`flex items-center justify-center w-full bg-pink-50/50 dark:bg-gray-800/50 border-2 border-dashed border-pink-200 dark:border-gray-700 rounded-lg ${defaultClassName} ${className}`}
        aria-label="Advertisement placeholder"
      >
        <span className="text-sm text-pink-400 dark:text-pink-500 font-semibold">{text}</span>
      </div>
    );
  }

  return (
    <div className={`${defaultClassName} ${className}`}>
      <AdSense
        adSlot={adSlotId}
        adFormat="auto"
        fullWidthResponsive={true}
        className="w-full"
      />
    </div>
  );
};

export default AdPlaceholder;
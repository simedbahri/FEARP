
import React from 'react';

type AdType = 'leaderboard' | 'sidebar' | 'in-feed' | 'in-article-top' | 'in-article-middle' | 'in-article-bottom' | 'footer';

interface AdPlaceholderProps {
  type: AdType;
}

const adStyles: Record<AdType, { className: string; text: string }> = {
  leaderboard: {
    className: 'h-24', // 728x90 aspect ratio is tall, 90px is standard
    text: 'Ad: Leaderboard (728x90)',
  },
  sidebar: {
    className: 'h-64 md:h-96 lg:h-[600px]', // 300x600 is tall
    text: 'Ad: Sidebar (300x600)',
  },
  'in-feed': {
    className: 'aspect-[4/3]', // Match article card aspect ratio
    text: 'Ad: In-Feed',
  },
  'in-article-top': {
    className: 'h-48 my-8',
    text: 'Ad: In-Article (Top)',
  },
  'in-article-middle': {
    className: 'h-48 my-8',
    text: 'Ad: In-Article (Middle)',
  },
  'in-article-bottom': {
    className: 'h-48 my-8',
    text: 'Ad: In-Article (Bottom)',
  },
  footer: {
    className: 'h-24 my-8',
    text: 'Ad: Footer (728x90)',
  },
};


const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const { className, text } = adStyles[type];

  return (
    <div
      className={`flex items-center justify-center w-full bg-pink-50/50 border-2 border-dashed border-pink-200 rounded-lg ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-sm text-pink-400 font-semibold">{text}</span>
    </div>
  );
};

export default AdPlaceholder;
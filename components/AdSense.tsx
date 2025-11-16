import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

/**
 * AdSense Component for Google AdSense Integration
 * 
 * Usage:
 * <AdSense 
 *   adSlot="1234567890" 
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 * 
 * For arbitrage optimization:
 * - Use multiple ad units per page
 * - Place ads above the fold
 * - Use responsive ad formats
 * - Enable auto ads in AdSense dashboard
 */
const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  style,
  className = '',
  fullWidthResponsive = true,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    // Only load ads if we have a valid ad slot and publisher ID
    if (!adSlot || adSlot === 'YOUR_ADSENSE_ID' || adLoaded.current) {
      return;
    }

    try {
      // Initialize Google AdSense (only once)
      if (typeof window !== 'undefined' && (window as any).adsbygoogle === undefined) {
        const publisherId = process.env.REACT_APP_ADSENSE_PUBLISHER_ID || 'YOUR_ADSENSE_PUBLISHER_ID';
        if (publisherId !== 'YOUR_ADSENSE_PUBLISHER_ID') {
          const script = document.createElement('script');
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`;
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }
      }

      // Push ad to adsbygoogle array after a short delay to ensure script is loaded
      const timer = setTimeout(() => {
        if ((window as any).adsbygoogle && adRef.current) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          adLoaded.current = true;
        }
      }, 100);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot]);

  const publisherId = process.env.REACT_APP_ADSENSE_PUBLISHER_ID || 'YOUR_ADSENSE_PUBLISHER_ID';

  // If no ad slot or publisher ID provided, show placeholder
  if (!adSlot || adSlot === 'YOUR_ADSENSE_ID' || publisherId === 'YOUR_ADSENSE_PUBLISHER_ID') {
    return (
      <div
        className={`flex items-center justify-center w-full bg-pink-50/50 dark:bg-gray-800/50 border-2 border-dashed border-pink-200 dark:border-gray-700 rounded-lg ${className}`}
        style={style}
        aria-label="Advertisement placeholder"
      >
        <span className="text-sm text-pink-400 dark:text-pink-500 font-semibold">
          Ad: Configure AdSense
        </span>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(fullWidthResponsive ? { width: '100%' } : {}),
        }}
        data-ad-client={`ca-pub-${publisherId}`}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSense;


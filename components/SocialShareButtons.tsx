
import React from 'react';

interface SocialShareButtonsProps {
  article: { id: string, title: string, content: string };
  className?: string;
}

const getFirstImage = (htmlContent: string, articleId: string): string => {
  if (!htmlContent) return `https://picsum.photos/seed/${articleId}/1200/630`;
  const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
  const img = doc.querySelector('img');
  return img ? img.src : `https://picsum.photos/seed/${articleId}/1200/630`;
};

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ article, className }) => {
  // Construct the canonical URL for sharing
  const articleUrl = `${window.location.origin}${window.location.pathname.split('#')[0]}#/article/${article.id}/1`;
  
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title);
  
  const imageUrl = getFirstImage(article.content, article.id);
  const encodedImageUrl = encodeURIComponent(imageUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedTitle}`,
  };

  const iconBaseStyle = "w-5 h-5 text-gray-400 hover:text-brand-dark-pink transition-colors duration-300";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <svg className={iconBaseStyle} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/>
        </svg>
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
        <svg className={iconBaseStyle} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.635 4.214 3.799 4.658-.564.153-1.156.195-1.749.123.593 1.846 2.309 3.199 4.34 3.235-1.625 1.274-3.674 2.029-5.901 2.029-.38 0-.755-.022-1.124-.066 2.094 1.349 4.587 2.138 7.24 2.138 8.687 0 13.44-7.215 13.44-13.44 0-.204-.005-.407-.014-.61a9.619 9.619 0 002.355-2.44z"/>
        </svg>
      </a>
      <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
        <svg className={iconBaseStyle} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.79 0-1.672.231-2.451.267-.978 1.657-6.98 1.657-6.98s-.42-.84-.42-2.074c0-1.947 1.127-3.402 2.533-3.402 1.199 0 1.777.897 1.777 1.974 0 1.201-.767 2.999-1.161 4.662-.326 1.392.697 2.533 2.097 2.533 2.511 0 4.41-2.652 4.41-6.521 0-3.443-2.488-5.83-5.973-5.83-4.026 0-6.391 3.012-6.391 6.014 0 1.146.433 2.384.965 3.068a.36.36 0 01.08.345c-.092.375-.293 1.199-.334 1.363-.052.215-.201.265-.42.161-1.42-.42-2.316-1.843-2.316-3.443 0-2.734 2.021-5.18 5.617-5.18 2.972 0 5.253 2.164 5.253 5.011 0 2.962-1.884 5.42-4.512 5.42-1.002 0-1.942-.516-2.276-1.127l-.606 2.269c-.302 1.133-1.148 2.541-1.732 3.321C10.155 23.834 11.059 24 12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
        </svg>
      </a>
    </div>
  );
}

export default SocialShareButtons;
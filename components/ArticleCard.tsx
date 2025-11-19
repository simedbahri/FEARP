import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import SocialShareButtons from './SocialShareButtons';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const excerpt = article.content.split('[PAGE_BREAK]')[0].replace(/<[^>]+>/g, '').substring(0, 100) + '...';

  const getFirstImage = (htmlContent: string): string | null => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };
  
  const featuredImage = getFirstImage(article.content) || `https://picsum.photos/seed/${article.id}/800/600`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-black/20 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group flex flex-col">
      <Link to={`/article/${article.id}/1`} className="block">
        <img 
          className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300" 
          src={featuredImage} 
          alt={article.title} 
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/article/${article.id}/1`}>
          <h2 className="text-2xl font-bold font-serif text-brand-text dark:text-gray-100 mb-2 group-hover:text-brand-dark-pink dark:group-hover:text-pink-400 transition-colors duration-300">{article.title}</h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 my-4 flex-grow">{excerpt}</p>
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <Link to={`/article/${article.id}/1`} className="text-brand-dark-pink dark:text-pink-400 font-semibold hover:underline text-sm">Read More &rarr;</Link>
          <SocialShareButtons article={article} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

import React from 'react';
import { useArticles } from '../contexts/ArticleContext';
import ArticleCard from '../components/ArticleCard';
import AdPlaceholder from '../components/AdPlaceholder';

const HomePage: React.FC = () => {
  const { articles, loading } = useArticles();

  const articlesWithAds = articles.reduce((acc, article, index) => {
    acc.push(<ArticleCard key={article.id} article={article} />);
    // Insert an in-feed ad after every 4th article
    if ((index + 1) % 4 === 0) {
      acc.push(<AdPlaceholder key={`ad-${index}`} type="in-feed" />);
    }
    return acc;
  }, [] as React.ReactNode[]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md">
          <p className="text-xl text-gray-500 dark:text-gray-400">Loading articles...</p>
        </div>
      );
    }
    if (articles.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articlesWithAds}
        </div>
      );
    }
    return (
      <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md">
        <p className="text-xl text-gray-500 dark:text-gray-400">No articles have been published yet.</p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">Check back soon for amazing content!</p>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section className="text-center bg-brand-pink dark:bg-gray-800/50 p-10 rounded-xl shadow-md">
        <h1 className="text-5xl font-bold font-serif text-brand-dark-pink dark:text-pink-400 mb-4">Welcome to Fearp</h1>
        <p className="text-xl text-brand-text dark:text-gray-300 max-w-2xl mx-auto">
          Your daily dose of inspiration, trends, and tutorials. Let's get creative!
        </p>
      </section>

      <AdPlaceholder type="leaderboard" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-bold font-serif mb-8 text-brand-text dark:text-gray-100">Latest Articles</h2>
          {renderContent()}
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <h3 className="text-2xl font-bold font-serif text-brand-text dark:text-gray-100">Sponsored</h3>
            <AdPlaceholder type="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
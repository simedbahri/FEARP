
import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';

const SitemapPage: React.FC = () => {
  const { articles } = useArticles();

  React.useEffect(() => {
    document.title = 'Sitemap | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Sitemap</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <h2>Main Pages</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        <h2>Blog Articles</h2>
        {articles.length > 0 ? (
          <ul>
            {articles.map(article => (
              <li key={article.id}>
                <Link to={`/article/${article.id}/1`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles published yet.</p>
        )}

        <h2>Legal & Information</h2>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          <li><Link to="/disclaimer">Disclaimer</Link></li>
          <li><Link to="/affiliate-disclosure">Affiliate Disclosure</Link></li>
          <li><Link to="/cookie-policy">Cookie Policy</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/collaborate">Collaborations</Link></li>
          <li><Link to="/newsletter">Newsletter</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SitemapPage;
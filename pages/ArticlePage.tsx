
import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import SocialShareButtons from '../components/SocialShareButtons';
import AdPlaceholder from '../components/AdPlaceholder';

// --- Ad Injection Logic ---
const injectInArticleAd = (htmlContent: string): string => {
  const adPlaceholderHtml = '<div id="mid-article-ad-marker"></div>';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Target top-level block elements for insertion
  const paragraphs = tempDiv.querySelectorAll('p, ul, ol, blockquote, h2, h3, h4');
  
  // Insert after the 4th paragraph, but only if there are enough paragraphs
  const insertionPoint = 4;
  if (paragraphs.length > insertionPoint) {
    paragraphs[insertionPoint].insertAdjacentHTML('afterend', adPlaceholderHtml);
  }
  
  return tempDiv.innerHTML;
};

const ArticlePage: React.FC = () => {
  const { id, page } = useParams<{ id: string; page?: string }>();
  const { articles, getArticleById } = useArticles();
  const navigate = useNavigate();
  
  const article = id ? getArticleById(id) : undefined;
  const currentPage = parseInt(page || '1', 10);

  const contentPages = article ? article.content.split('[PAGE_BREAK]') : [];
  const totalPages = contentPages.length;
  const currentPageContent = contentPages[currentPage - 1];

  const processedContent = useMemo(() => {
    if (!currentPageContent) return '';
    
    // Inject mid-article ad placeholder
    const contentWithAd = injectInArticleAd(currentPageContent);
    // Add lazy loading to all images
    const lazyLoadedContent = contentWithAd.replace(/<img /g, '<img loading="lazy" ');

    // Replace marker with actual React component placeholder
    return lazyLoadedContent.split('<div id="mid-article-ad-marker"></div>');

  }, [currentPageContent]);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const defaultTitle = 'Fearp - Your Daily Source of Inspiration';
    const defaultDescription = "Discover your daily dose of inspiration with Fearp. Explore the latest trends, easy-to-follow tutorials, and creative lifestyle tips. Your go-to blog for creativity.";

    const metaDescriptionTag = document.querySelector('meta[name="description"]');

    if (article) {
      document.title = `${article.title} | Fearp`;
      const excerpt = article.content.replace(/<[^>]+>/g, '').substring(0, 157).trim() + '...';
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', excerpt);
      }
    }

    return () => {
      document.title = defaultTitle;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', defaultDescription);
      }
    };
  }, [id, currentPage, article]);

  useEffect(() => {
    if (article && (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages)) {
      navigate(`/article/${id}/1`, { replace: true });
    }
  }, [id, currentPage, totalPages, article, navigate]);


  if (!article || !currentPageContent) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Article not found</h2>
        <Link to="/" className="text-brand-dark-pink hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const relatedPosts = articles.filter(p => p.id !== article.id).slice(0, 3);
    
  const getFirstImage = (htmlContent: string): string | null => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2">
        <article className="bg-white p-6 sm:p-8 lg:p-12 rounded-xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-text mb-4">{article.title}</h1>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-y border-gray-100 py-3 gap-4">
            <p className="text-gray-500 text-sm">
              Published on {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <SocialShareButtons article={article} />
          </div>

          <AdPlaceholder type="in-article-top" />

          <div className="prose prose-lg max-w-none text-brand-text font-serif">
            <div dangerouslySetInnerHTML={{ __html: processedContent[0].trim() }} />
            {processedContent.length > 1 && (
              <>
                <AdPlaceholder type="in-article-middle" />
                <div dangerouslySetInnerHTML={{ __html: processedContent[1].trim() }} />
              </>
            )}
          </div>
          
          <AdPlaceholder type="in-article-bottom" />
        </article>
      </div>

      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="font-bold font-serif text-gray-700 text-2xl border-b pb-3 mb-6">Sponsored</h3>
            <AdPlaceholder type="sidebar" />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md">
              {currentPage > 1 ? (
                <Link to={`/article/${id}/${currentPage - 1}`} className="text-brand-dark-pink font-bold hover:underline">
                  &larr; Prev
                </Link>
              ) : <div />}
              <span className="text-gray-600 text-sm">Page {currentPage}/{totalPages}</span>
              {currentPage < totalPages ? (
                <Link to={`/article/${id}/${currentPage + 1}`} className="text-brand-dark-pink font-bold hover:underline">
                  Next &rarr;
                </Link>
              ) : <div />}
            </div>
          )}

          {/* Next/Prev Article Navigation (only on last page) */}
          {currentPage === totalPages && (prevArticle || nextArticle) && (
              <div className="space-y-4">
                {prevArticle && (
                  <Link to={`/article/${prevArticle.id}/1`} className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-left">
                    <p className="text-sm text-gray-500">&larr; Previous Article</p>
                    <h4 className="font-bold text-brand-text mt-1 line-clamp-2">{prevArticle.title}</h4>
                  </Link>
                )}
                {nextArticle && (
                  <Link to={`/article/${nextArticle.id}/1`} className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-right">
                    <p className="text-sm text-gray-500">Next Article &rarr;</p>
                    <h4 className="font-bold text-brand-text mt-1 line-clamp-2">{nextArticle.title}</h4>
                  </Link>
                )}
              </div>
          )}

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold font-serif text-gray-700 text-2xl border-b pb-3 mb-6">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map(post => {
                  const relatedPostImage = getFirstImage(post.content) || `https://picsum.photos/seed/${post.id}/200/200`;
                  return (
                    <Link key={post.id} to={`/article/${post.id}/1`} className="flex items-center gap-4 group">
                      <img src={relatedPostImage} alt={post.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" loading="lazy" />
                      <h4 className="font-semibold font-serif text-brand-text group-hover:text-brand-dark-pink transition-colors">{post.title}</h4>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ArticlePage;
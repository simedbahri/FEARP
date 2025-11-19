import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  article?: {
    title: string;
    description: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    image?: string;
  };
}

/**
 * SEO Head Component
 * Manages meta tags, canonical URLs, and structured data for better indexing
 */
const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  canonical,
  noindex = false,
  article 
}) => {
  const location = useLocation();
  const siteUrl = 'https://fearp.com';
  const defaultTitle = 'Fearp - Your Daily Source of Inspiration';
  const defaultDescription = 'Discover your daily dose of inspiration with Fearp. Explore the latest trends, easy-to-follow tutorials, and creative lifestyle tips. Your go-to blog for creativity.';
  
  const pageTitle = title ? `${title} | Fearp` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = canonical || `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDescription);

    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update or create robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      // Ensure pages are indexable (remove noindex if exists)
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: article ? 'article' : 'website' },
      { property: 'og:site_name', content: 'Fearp' },
    ];

    if (article?.image) {
      ogTags.push({ property: 'og:image', content: article.image });
    }

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
    ];

    if (article?.image) {
      twitterTags.push({ name: 'twitter:image', content: article.image });
    }

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });

    // Add structured data (JSON-LD) for articles
    if (article) {
      let structuredData = document.querySelector('script[type="application/ld+json"]');
      if (!structuredData) {
        structuredData = document.createElement('script');
        structuredData.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredData);
      }

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        url: canonicalUrl,
        datePublished: article.publishedTime || new Date().toISOString(),
        dateModified: article.modifiedTime || article.publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: article.author || 'Fearp',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Fearp',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/assets/logo.svg`,
          },
        },
        ...(article.image && {
          image: {
            '@type': 'ImageObject',
            url: article.image,
          },
        }),
      };

      structuredData.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // Don't remove meta tags on unmount as they're needed for SEO
      // Just reset title
      document.title = defaultTitle;
    };
  }, [pageTitle, pageDescription, canonicalUrl, noindex, article]);

  return null; // This component doesn't render anything
};

export default SEOHead;


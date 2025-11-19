
import React from 'react';
import { Link } from 'react-router-dom';

const AffiliateDisclosurePage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Affiliate Disclosure | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Affiliate Disclosure</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p>
          At Fearp, we believe in transparency with our audience. In the spirit of that transparency, please be aware that some of the links on our website are "affiliate links." This means that if you click on the link and purchase an item, Fearp may receive a small commission at no extra cost to you.
        </p>
        <p>
          We only recommend products and services that we have personally used or thoroughly researched and believe will add value to our readers. The opinions expressed here are our own. The inclusion of an affiliate link does not influence our content, topics, or posts.
        </p>
        <p>
          This compensation helps us to maintain and operate our blog, allowing us to continue creating high-quality, free content for you to enjoy. We genuinely appreciate your support when you use our links to make a purchase.
        </p>
        <p>
          Fearp is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As part of this program, we may post customized links, provided by Amazon, to track the referrals to their website.
        </p>
        <p>
          If you have any questions regarding our affiliate relationships, please do not hesitate to <Link to="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  );
};

export default AffiliateDisclosurePage;
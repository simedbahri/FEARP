
import React from 'react';
import { Link } from 'react-router-dom';

const DisclaimerPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Disclaimer | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Disclaimer</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <p>
          The information provided by Fearp ("we," "us," or "our") on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>

        <h2>Professional Disclaimer</h2>
        <p>
          The site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice. The use or reliance of any information contained on this site is solely at your own risk.
        </p>
        
        <h2>Affiliates Disclaimer</h2>
        <p>
          This site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to [List your affiliate programs here, e.g., Amazon Associates, etc.].
        </p>
        
        <h2>External Links Disclaimer</h2>
        <p>
          The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Disclaimer, you can <Link to="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
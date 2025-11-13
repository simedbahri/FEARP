
import React from 'react';
import { Link } from 'react-router-dom';

const CollaborationsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Collaborations | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Work With Us</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p>
          Thank you for your interest in collaborating with Fearp! We are always excited to partner with brands, creators, and artists who align with our mission of inspiring creativity and confidence.
        </p>
        <p>
          We offer a variety of collaboration opportunities, including:
        </p>
        <ul>
          <li>Sponsored Blog Posts & Social Media Campaigns</li>
          <li>Product Reviews & Giveaways</li>
          <li>Brand Ambassadorships</li>
          <li>Guest Articles & Creator Features</li>
        </ul>
        <p>
          If you have an idea for a partnership or would like to request our media kit, please get in touch with our partnerships team. We're passionate about creating authentic, engaging content that resonates with our audience and highlights brands we believe in.
        </p>
        <p>
          Please send all collaboration inquiries to <a href="mailto:partners@fearp.com" className="text-brand-dark-pink font-bold hover:underline">partners@fearp.com</a> or use our <Link to="/contact">Contact Page</Link>.
        </p>
        <p>
          We look forward to the possibility of creating something amazing together!
        </p>
      </div>
    </div>
  );
};

export default CollaborationsPage;
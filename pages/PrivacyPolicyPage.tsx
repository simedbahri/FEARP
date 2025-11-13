
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <p>
          Fearp ("us", "we", or "our") operates the Fearp website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2>Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>

        <h3>Log Data</h3>
        <p>
          Like many site operators, we collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
        </p>
        
        <h3>Cookies</h3>
        <p>
          Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
        
        <h2>Google AdSense & DoubleClick DART Cookie</h2>
        <p>
          We may use third-party advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>
        <p>
          Google, as a third-party vendor, uses cookies to serve ads on our Service. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our Service and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
        </p>

        <h2>Links to Other Sites</h2>
        <p>
          Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us via our <Link to="/contact">Contact Page</Link>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
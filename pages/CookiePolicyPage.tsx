
import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Cookie Policy | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Cookie Policy</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        <p>
          This Cookie Policy explains what cookies are and how we use them on Fearp ("Site"). You should read this policy to understand what cookies are, how we use them, the types of cookies we use, the information we collect using cookies, how that information is used, and how to control your cookie preferences. For further information on how we use, store, and keep your personal data secure, see our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide a better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
        </p>

        <h2>How Do We Use Cookies?</h2>
        <p>
          As with most online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
        </p>
        <p>
          The third-party cookies used on our website are mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.
        </p>

        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Essential Cookies:</strong> These are necessary for the site to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or logging in.</li>
          <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
          <li><strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners (like Google AdSense). They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
        </ul>

        <h2>How Can I Control My Cookie Preferences?</h2>
        <p>
          Different browsers provide different methods to block and delete cookies used by websites. You can change the settings of your browser to block or delete cookies. To find out more about how to manage and delete cookies, we recommend visiting reliable sources such as wikipedia.org or www.allaboutcookies.org.
        </p>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
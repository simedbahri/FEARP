
import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms & Conditions | Fearp';
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Terms and Conditions</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
        <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <p>
          Welcome to Fearp! These terms and conditions outline the rules and regulations for the use of Fearp's Website.
        </p>

        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Fearp if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2>Cookies</h2>
        <p>
          We employ the use of cookies. By accessing Fearp, you agreed to use cookies in agreement with the Fearp's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit.
        </p>

        <h2>License</h2>
        <p>
          Unless otherwise stated, Fearp and/or its licensors own the intellectual property rights for all material on Fearp. All intellectual property rights are reserved. You may access this from Fearp for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from Fearp</li>
          <li>Sell, rent or sub-license material from Fearp</li>
          <li>Reproduce, duplicate or copy material from Fearp</li>
          <li>Redistribute content from Fearp</li>
        </ul>

        <h2>User Comments</h2>
        <p>
          This Agreement shall begin on the date hereof. Parts of this website offer an opportunity for users to post and exchange opinions and information. Fearp does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Fearp, its agents and/or affiliates.
        </p>
        
        <h2>Governing Law</h2>
        <p>
          Any claim relating to Fearp's website shall be governed by the laws of the website owner's home jurisdiction without regard to its conflict of law provisions.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right to revise these terms and conditions at any time. By using this Website you are expected to review these terms on a regular basis.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please <Link to="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
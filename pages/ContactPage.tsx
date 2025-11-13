
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    document.title = 'Contact Us | Fearp';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle form submission to a backend or service.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6">Thank You!</h1>
        <p className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif">
          Your message has been sent. We'll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text dark:text-gray-100 mb-6 text-center">Contact Us</h1>
      <div className="prose prose-lg max-w-none text-brand-text dark:text-gray-300 font-serif text-center mb-8">
        <p>
          We love hearing from our readers! Whether you have a question, a suggestion, or a collaboration proposal, please fill out the form below to get in touch.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-dark-pink focus:border-brand-dark-pink bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-dark-pink focus:border-brand-dark-pink bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-dark-pink focus:border-brand-dark-pink bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-brand-dark-pink hover:bg-pink-500 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
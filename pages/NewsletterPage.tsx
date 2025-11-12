
import React from 'react';

const NewsletterPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Newsletter | Fearp';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing! We've sent a confirmation to your email.");
    // In a real app, this would handle form submission to a service.
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-serif text-brand-text mb-4">Join Our Community!</h1>
        <p className="text-xl text-brand-text max-w-2xl mx-auto mb-8">
          Subscribe to the Fearp newsletter to get the latest trends, tutorials, and exclusive offers delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your best email address"
            required
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-dark-pink"
          />
          <button
            type="submit"
            className="bg-brand-dark-pink text-white font-bold py-3 px-6 rounded-md hover:bg-pink-500 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPage;
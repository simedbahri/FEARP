
import React from 'react';

const FaqPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'FAQ | Fearp';
  }, []);

  const faqs = [
    {
      question: "How often do you post new articles?",
      answer: "We strive to publish new content 2-3 times a week, including tutorials, trend reports, and product reviews. Be sure to subscribe to our newsletter to get notified of new posts!"
    },
    {
      question: "Can I submit my own work to be featured?",
      answer: "Absolutely! We love seeing our readers' creations. Please reach out to us through our Contact page with a link to your work or social media profile, and we'll take a look."
    },
    {
      question: "Are your product reviews sponsored?",
      answer: "Our reviews are based on our honest opinions. While we sometimes receive products for consideration, this does not influence our review. If a post is sponsored, it will be clearly disclosed at the beginning of the article."
    },
    {
      question: "I'm a beginner. Where should I start?",
      answer: "Welcome! We recommend starting with our 'Beginner's Guide' category, where you'll find simple tutorials and tips on essential tools and techniques to get you started."
    }
  ];

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-2xl font-semibold font-serif text-brand-dark-pink">{faq.question}</h2>
            <p className="mt-2 text-brand-text font-serif">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
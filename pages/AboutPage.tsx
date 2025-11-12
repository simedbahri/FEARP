
import React from 'react';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'About Us | Fearp';
  }, []);

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold font-serif text-brand-text mb-6 text-center">About Fearp</h1>
      <div className="prose prose-lg max-w-none text-brand-text font-serif">
        <p>
          Welcome to <strong>Fearp</strong>, your ultimate destination for inspiration and creativity! We are a passionate team of creators, writers, and enthusiasts dedicated to bringing you the latest trends, step-by-step tutorials, and honest product reviews.
        </p>
        <p>
          Our mission is to inspire creativity and confidence. We believe that everyone has a creative spark, and our goal is to provide a platform to express it. Whether you're a seasoned professional looking for new ideas or a beginner just starting your creative journey, Fearp is here to guide and support you.
        </p>
        <p>
          At Fearp, we cover a wide range of topics, including:
        </p>
        <ul>
          <li>The latest trends from around the web.</li>
          <li>Easy-to-follow tutorials for all skill levels.</li>
          <li>Tips and tricks for a creative and inspired life.</li>
          <li>In-depth reviews of products and services.</li>
          <li>Interviews with industry experts and talented creators.</li>
        </ul>
        <p>
          We are committed to creating a vibrant and inclusive community where everyone feels welcome. Join us on this exciting journey, and let's create something beautiful together. Thank you for being a part of the Fearp family!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
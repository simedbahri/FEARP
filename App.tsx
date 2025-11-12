
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './contexts/ArticleContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Header from './components/Header';
import Footer from './components/Footer';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import AffiliateDisclosurePage from './pages/AffiliateDisclosurePage';
import SitemapPage from './pages/SitemapPage';
import FaqPage from './pages/FaqPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import NewsletterPage from './pages/NewsletterPage';
import CollaborationsPage from './pages/CollaborationsPage';
import CookieConsent from './components/CookieConsent';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ArticleProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/articles" element={<HomePage />} />
                <Route path="/article/:id/:page?" element={<ArticlePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/newsletter" element={<NewsletterPage />} />
                <Route path="/collaborate" element={<CollaborationsPage />} />
              </Routes>
            </main>
            <div className="container mx-auto px-4">
              <AdPlaceholder type="footer" />
            </div>
            <Footer />
            <CookieConsent />
          </div>
        </HashRouter>
      </ArticleProvider>
    </AuthProvider>
  );
};

export default App;
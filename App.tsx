
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './contexts/ArticleContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
import AdminPage from './pages/AdminPage';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ArticleProvider>
          <BrowserRouter>
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
                  <Route path="/admin212" element={<AdminPage />} />
                </Routes>
              </main>
              <div className="container mx-auto px-4">
                <AdPlaceholder type="footer" />
              </div>
              <Footer />
              <CookieConsent />
              <ScrollToTopButton />
            </div>
          </BrowserRouter>
        </ArticleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
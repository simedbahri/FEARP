import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminPage from '../pages/AdminPage';
import { AuthProvider } from '../contexts/AuthContext';
import { ArticleProvider } from '../contexts/ArticleContext';
import '../styles.css';
import { isFirebaseConfigured } from '../firebase/config';
import { ConfigurationError } from '../components/ConfigurationError';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {isFirebaseConfigured ? (
      <AuthProvider>
        <ArticleProvider>
          <div className="p-4 sm:p-8">
            <AdminPage />
          </div>
        </ArticleProvider>
      </AuthProvider>
    ) : (
      <ConfigurationError />
    )}
  </React.StrictMode>
);

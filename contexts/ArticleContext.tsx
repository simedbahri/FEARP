import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Article } from '../types';

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'date'>) => Promise<void>;
  updateArticle: (id: string, article: Omit<Article, 'id' | 'date'>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  getArticleById: (id: string) => Article | undefined;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

// --- IndexedDB Configuration ---
const DB_NAME = 'FearpDB';
const DB_VERSION = 1;
const STORE_NAME = 'articles';

// Keep a single DB connection promise to avoid re-opening the database unnecessarily.
let dbPromise: Promise<IDBDatabase>;

const openDB = (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        return reject('IndexedDB is not supported by this browser.');
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
};

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const refreshArticles = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        // Sort by date descending and update state
        const sortedArticles = request.result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setArticles(sortedArticles || []);
      };
      request.onerror = () => {
        console.error('Error fetching articles:', request.error);
        setArticles([]);
      };
    } catch (error) {
      console.error('Could not refresh articles from DB', error);
      setArticles([]);
    }
  };

  useEffect(() => {
    // On initial load, fetch all articles from the database.
    // The blog will start empty if no articles have been added.
    refreshArticles();
  }, []);

  /**
   * A robust, reusable helper to perform IndexedDB transactions.
   * It wraps the transaction in a promise that only resolves on `oncomplete`.
   * This guarantees the operation is fully finished before proceeding.
   */
  const performTransaction = async (
    mode: IDBTransactionMode,
    action: (store: IDBObjectStore) => void
  ): Promise<void> => {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, mode);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
        
        const store = transaction.objectStore(STORE_NAME);
        action(store);
      });
    } catch (error) {
      console.error('IndexedDB transaction failed:', error);
      throw error;
    }
  };


  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    const newArticle: Article = {
      ...articleData,
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
    };
    
    await performTransaction('readwrite', (store) => {
      store.put(newArticle);
    });

    // After DB write, refresh the state from the DB to ensure UI is in sync.
    await refreshArticles();
  };

  const updateArticle = async (id: string, updatedArticleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    const articleToUpdate = articles.find(a => a.id === id);
    if (!articleToUpdate) throw new Error('Article not found for update.');
    
    const updatedArticle: Article = { ...articleToUpdate, ...updatedArticleData };
    
    await performTransaction('readwrite', (store) => {
      store.put(updatedArticle);
    });

    // After DB write, refresh the state from the DB.
    await refreshArticles();
  };
  
  const deleteArticle = async (id: string): Promise<void> => {
    await performTransaction('readwrite', (store) => {
      store.delete(id);
    });
    
    // After DB write, refresh the state from the DB.
    await refreshArticles();
  };
    
  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, getArticleById }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Article } from '../types';
import { db } from '../firebase/config';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'date'>) => Promise<void>;
  updateArticle: (id: string, article: Omit<Article, 'id' | 'date'>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  getArticleById: (id: string) => Article | undefined;
  loading: boolean;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const articlesCollectionRef = collection(db, "articles");

  useEffect(() => {
    setLoading(true);
    const q = query(articlesCollectionRef, orderBy("date", "desc"));
    
    // Set up the real-time listener. This is more efficient and reliable than manual fetching.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedArticles = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        // onSnapshot ensures we get the resolved server timestamp, making this check robust.
        // A fallback is still good practice for any edge cases.
        const date = docData.date ? docData.date.toDate().toISOString() : new Date().toISOString();
        return {
          ...docData,
          id: doc.id,
          date: date,
        } as Article;
      });
      setArticles(fetchedArticles);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to articles collection:", error);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once.
  
  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    try {
      // Add the document. The onSnapshot listener will automatically handle the UI update.
      await addDoc(articlesCollectionRef, {
        ...articleData,
        date: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding article to Firestore:", error);
      throw error;
    }
  };

  const updateArticle = async (id: string, updatedArticleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    try {
      const articleDoc = doc(db, "articles", id);
      // Update the document. The onSnapshot listener will automatically handle the UI update.
      await updateDoc(articleDoc, updatedArticleData);
    } catch (error) {
      console.error("Error updating article in Firestore:", error);
      throw error;
    }
  };
  
  const deleteArticle = async (id: string): Promise<void> => {
    try {
      const articleDoc = doc(db, "articles", id);
      // Delete the document. The onSnapshot listener will automatically handle the UI update.
      await deleteDoc(articleDoc);
    } catch(error) {
      console.error("Error deleting article from Firestore:", error);
      throw error;
    }
  };
    
  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, getArticleById, loading }}>
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
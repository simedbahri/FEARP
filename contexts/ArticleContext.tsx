
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Article } from '../types';
import { db } from '../firebase/config';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, serverTimestamp, onSnapshot } from 'firebase/firestore';

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
    // REMOVED: orderBy("date", "desc"). This avoids the need for a manual Firestore index,
    // which can cause misleading "permission-denied" errors if not configured correctly.
    const q = query(articlesCollectionRef);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedArticles = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const date = docData.date ? docData.date.toDate().toISOString() : new Date().toISOString();
        return {
          ...docData,
          id: doc.id,
          date: date,
        } as Article;
      });
      
      // Perform sorting on the client-side to ensure newest articles are first.
      fetchedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setArticles(fetchedArticles);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error:", error);
      // Provide a more helpful error message for the developer.
      if (error.code === 'permission-denied') {
          console.error(
            'Firestore Security Rules are denying access. ' +
            'Please check your rules in the Firebase Console. ' +
            'Ensure that the `articles` collection is readable by the public.'
          );
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    try {
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
      await updateDoc(articleDoc, updatedArticleData);
    } catch (error) {
      console.error("Error updating article in Firestore:", error);
      throw error;
    }
  };
  
  const deleteArticle = async (id: string): Promise<void> => {
    try {
      const articleDoc = doc(db, "articles", id);
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

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Article } from '../types';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';

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

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const q = query(articlesCollectionRef, orderBy("date", "desc"));
      const data = await getDocs(q);
      const fetchedArticles = data.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
          date: docData.date?.toDate().toISOString(),
        } as Article
      });
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles from Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  
  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    try {
      await addDoc(articlesCollectionRef, {
        ...articleData,
        date: serverTimestamp(),
      });
      await fetchArticles(); // Refresh after adding
    } catch (error) {
      console.error("Error adding article to Firestore:", error);
      throw error;
    }
  };

  const updateArticle = async (id: string, updatedArticleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    try {
      const articleDoc = doc(db, "articles", id);
      await updateDoc(articleDoc, updatedArticleData);
      await fetchArticles(); // Refresh after updating
    } catch (error) {
      console.error("Error updating article in Firestore:", error);
      throw error;
    }
  };
  
  const deleteArticle = async (id: string): Promise<void> => {
    try {
      const articleDoc = doc(db, "articles", id);
      await deleteDoc(articleDoc);
      await fetchArticles(); // Refresh after deleting
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
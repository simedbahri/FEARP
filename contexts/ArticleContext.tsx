
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
      console.log(`[ArticleContext] Received ${querySnapshot.docs.length} articles from Firestore`);
      
      const fetchedArticles = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const date = docData.date ? docData.date.toDate().toISOString() : new Date().toISOString();
        
        // Validate required fields
        if (!docData.title || !docData.content) {
          console.warn(`[ArticleContext] Article ${doc.id} is missing required fields:`, docData);
        }
        
        return {
          ...docData,
          id: doc.id,
          date: date,
        } as Article;
      });
      
      // Perform sorting on the client-side to ensure newest articles are first.
      fetchedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      console.log(`[ArticleContext] Setting ${fetchedArticles.length} articles in state`);
      setArticles(fetchedArticles);
      setLoading(false);
    }, (error) => {
      console.error("[ArticleContext] Firebase Error:", error);
      console.error("[ArticleContext] Error Code:", error.code);
      console.error("[ArticleContext] Error Message:", error.message);
      
      // Provide a more helpful error message for the developer.
      if (error.code === 'permission-denied') {
          console.error(
            '❌ CRITICAL: Firestore Security Rules are denying access!\n\n' +
            'This is why your articles disappear after refresh.\n\n' +
            'SOLUTION: Go to Firebase Console → Firestore Database → Rules tab\n' +
            'And set these rules:\n\n' +
            'rules_version = \'2\';\n' +
            'service cloud.firestore {\n' +
            '  match /databases/{database}/documents {\n' +
            '    match /articles/{document=**} {\n' +
            '      allow read: if true;  // Allow public to read\n' +
            '      allow write: if request.auth != null;  // Only authenticated users can write\n' +
            '    }\n' +
            '  }\n' +
            '}\n\n' +
            'Then click "Publish" to save the rules.'
          );
          // Show alert to user as well
          alert(
            '⚠️ PERMISSION ERROR\n\n' +
            'Articles cannot be loaded due to Firestore security rules.\n\n' +
            'Please check the browser console for detailed instructions on how to fix this.\n\n' +
            'This is why articles disappear after refresh!'
          );
      } else if (error.code === 'unavailable') {
        console.error('[ArticleContext] Firestore is unavailable. Check your internet connection.');
      } else {
        console.error('[ArticleContext] Unknown error:', error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    // Validate article data before saving
    if (!articleData.title || !articleData.title.trim()) {
      throw new Error('Article title is required');
    }
    if (!articleData.content || !articleData.content.trim()) {
      throw new Error('Article content is required');
    }
    
    try {
      console.log('[ArticleContext] Adding new article:', { title: articleData.title });
      const docRef = await addDoc(articlesCollectionRef, {
        title: articleData.title.trim(),
        content: articleData.content.trim(),
        imageUrl: articleData.imageUrl || null,
        date: serverTimestamp(),
      });
      console.log('[ArticleContext] Article added successfully with ID:', docRef.id);
      
      // Note: The article will appear automatically via onSnapshot listener
      // No need to manually update state
    } catch (error: any) {
      console.error("[ArticleContext] Error adding article to Firestore:", error);
      console.error("[ArticleContext] Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'permission-denied') {
        throw new Error(
          'Permission denied: Your Firestore security rules do not allow writing articles. ' +
          'Please check the browser console for instructions on how to fix this.'
        );
      }
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

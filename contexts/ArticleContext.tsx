
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
  
  // Create ref once and reuse it - fixes infinite listener recreation
  const articlesCollectionRef = React.useMemo(() => collection(db, "articles"), []);

  useEffect(() => {
    setLoading(true);
    console.log('[ArticleContext] Setting up onSnapshot listener...');
    
    let unsubscribe: (() => void) | null = null;
    let retryCount = 0;
    const maxRetries = 3;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const setupListener = () => {
      try {
        const q = query(articlesCollectionRef);
        
        // Set timeout to detect stuck connections (15 seconds)
        timeoutId = setTimeout(() => {
          console.warn('[ArticleContext] ⏱️ Firebase not responding after 15s - may be offline');
        }, 15000);
        
        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            if (timeoutId) clearTimeout(timeoutId);
            
            console.log(`[ArticleContext] ✅ SUCCESS: Received ${querySnapshot.docs.length} articles`);
            
            const fetchedArticles = querySnapshot.docs.map((doc) => {
              const docData = doc.data();
              const date = docData.date ? docData.date.toDate().toISOString() : new Date().toISOString();
              
              if (!docData.title || !docData.content) {
                console.warn(`[ArticleContext] Article ${doc.id} missing required fields`);
              }
              
              return {
                ...docData,
                id: doc.id,
                date: date,
              } as Article;
            });
            
            fetchedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            console.log(`[ArticleContext] Updating state with ${fetchedArticles.length} articles`);
            setArticles(fetchedArticles);
            setLoading(false);
            retryCount = 0; // Reset on success
          },
          (error: any) => {
            if (timeoutId) clearTimeout(timeoutId);
            console.error("[ArticleContext] Error:", error.code, "-", error.message);
            
            if (error.code === 'permission-denied') {
              console.error(
                '❌ PERMISSION DENIED:\n' +
                'Go to Firebase Console → Firestore → Rules and set:\n\n' +
                'rules_version = \'2\';\n' +
                'service cloud.firestore {\n' +
                '  match /databases/{database}/documents {\n' +
                '    match /articles/{document=**} {\n' +
                '      allow read: if true;\n' +
                '      allow write: if request.auth != null;\n' +
                '    }\n' +
                '  }\n' +
                '}\n\n' +
                'Then click Publish and reload.'
              );
              setLoading(false);
            } else if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
              console.warn(`[ArticleContext] Network timeout - retrying... (${retryCount}/${maxRetries})`);
              if (retryCount < maxRetries) {
                retryCount++;
                const delay = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s exponential backoff
                console.log(`[ArticleContext] Retry in ${delay}ms`);
                setTimeout(setupListener, delay);
              } else {
                console.error('[ArticleContext] Max retries reached. Using offline cache.');
                setLoading(false);
              }
            } else {
              console.error('[ArticleContext] Unknown error:', error);
              setLoading(false);
            }
          }
        );
      } catch (err) {
        if (timeoutId) clearTimeout(timeoutId);
        console.error('[ArticleContext] Setup error:', err);
        setLoading(false);
      }
    };
    
    setupListener();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (unsubscribe) {
        console.log('[ArticleContext] Cleaning up listener');
        unsubscribe();
      }
    };
  }, []); // Empty dependency array - listener set up once on mount
  
  const addArticle = async (articleData: Omit<Article, 'id' | 'date'>): Promise<void> => {
    // Validate article data before saving
    if (!articleData.title || !articleData.title.trim()) {
      throw new Error('Article title is required');
    }
    if (!articleData.content || !articleData.content.trim()) {
      throw new Error('Article content is required');
    }
    
    // Check content size - Firestore has 1MB document size limit
    const contentSize = new Blob([articleData.content]).size;
    const titleSize = new Blob([articleData.title]).size;
    const totalSize = contentSize + titleSize;
    const maxSize = 900000; // Leave 100KB buffer for metadata
    
    if (totalSize > maxSize) {
      const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
      const maxMB = (maxSize / 1024 / 1024).toFixed(2);
      throw new Error(
        `Article is too large (${sizeMB}MB). Maximum size is ${maxMB}MB.\n\n` +
        'Tips to reduce size:\n' +
        '- Remove or compress images\n' +
        '- Split into multiple articles\n' +
        '- Remove unnecessary formatting'
      );
    }
    
    try {
      console.log('[ArticleContext] ➕ Adding new article:', { 
        title: articleData.title,
        size: (totalSize / 1024).toFixed(2) + 'KB'
      });
      const docRef = await addDoc(articlesCollectionRef, {
        title: articleData.title.trim(),
        content: articleData.content.trim(),
        imageUrl: articleData.imageUrl || null,
        date: serverTimestamp(),
      });
      console.log('[ArticleContext] ✅ Article added successfully with ID:', docRef.id);
      console.log('[ArticleContext] Waiting for onSnapshot listener to update articles list...');
      
      // Note: The article will appear automatically via onSnapshot listener
      // No need to manually update state
    } catch (error: any) {
      console.error("[ArticleContext] ❌ Error adding article to Firestore:", error);
      console.error("[ArticleContext] Error Code:", error.code);
      console.error("[ArticleContext] Error Message:", error.message);
      
      // Handle document too large error
      if (error.message?.includes('longer than') || error.code === 'invalid-argument') {
        throw new Error(
          `❌ Document too large!\n\n` +
          `Your article exceeds Firestore's 1MB limit.\n\n` +
          `Current size: ${(totalSize / 1024 / 1024).toFixed(2)}MB\n\n` +
          `Solutions:\n` +
          `1. Remove embedded images\n` +
          `2. Split into multiple shorter articles\n` +
          `3. Remove unnecessary formatting/HTML`
        );
      }
      
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
    // Validate size before updating
    const contentSize = new Blob([updatedArticleData.content]).size;
    const titleSize = new Blob([updatedArticleData.title]).size;
    const totalSize = contentSize + titleSize;
    const maxSize = 900000;
    
    if (totalSize > maxSize) {
      throw new Error(
        `Article is too large (${(totalSize / 1024 / 1024).toFixed(2)}MB). ` +
        `Maximum is ${(maxSize / 1024 / 1024).toFixed(2)}MB. ` +
        `Please reduce content size.`
      );
    }
    
    try {
      const articleDoc = doc(db, "articles", id);
      await updateDoc(articleDoc, updatedArticleData);
      console.log('[ArticleContext] ✅ Article updated successfully');
    } catch (error: any) {
      console.error("Error updating article in Firestore:", error);
      
      if (error.message?.includes('longer than') || error.code === 'invalid-argument') {
        throw new Error(`Document too large! Please reduce content size.`);
      }
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

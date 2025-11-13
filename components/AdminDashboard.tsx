import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useArticles } from '../contexts/ArticleContext';
import { Article } from '../types';

const ArticleForm: React.FC<{
  onSubmit: (data: Omit<Article, 'id'|'date'|'imageUrl'>) => Promise<void>;
  articleToEdit: Article | null;
  clearEdit: () => void;
}> = ({ onSubmit, articleToEdit, clearEdit }) => {
  const [title, setTitle] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  const checkContentEmpty = () => {
    if (contentRef.current) {
      const hasText = contentRef.current.innerText.trim() !== '';
      const hasImages = contentRef.current.getElementsByTagName('img').length > 0;
      setIsContentEmpty(!hasText && !hasImages);
    }
  };
  
  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      if (contentRef.current) {
        contentRef.current.innerHTML = articleToEdit.content;
      }
    } else {
      setTitle('');
      if (contentRef.current) {
        contentRef.current.innerHTML = '';
      }
    }
    checkContentEmpty();
  }, [articleToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current?.innerHTML || '';
    if (!title.trim() || !content.trim()) {
      alert('Title and Content cannot be empty.');
      return;
    }
    try {
      await onSubmit({ title, content });
      // If we are adding a NEW article, clear the form on success
      if (!articleToEdit) {
        setTitle('');
        if (contentRef.current) {
          contentRef.current.innerHTML = '';
        }
        checkContentEmpty();
      }
    } catch (error) {
      // The error is handled and alerted by the parent component.
      // No further action needed here.
    }
  };
  
  const handleInsertPageBreak = () => {
    const editor = contentRef.current;
    if (editor) {
        editor.focus();
        // Use execCommand for simplicity to insert HTML
        document.execCommand('insertHTML', false, '<p>[PAGE_BREAK]</p>');
        checkContentEmpty();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-8">
        <h3 className="text-2xl font-bold font-serif text-brand-text">{articleToEdit ? 'Edit Article' : 'Add New Article'}</h3>
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-dark-pink focus:border-brand-dark-pink"/>
        </div>
        <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <button type="button" onClick={handleInsertPageBreak} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors">
                Insert Page Break
              </button>
            </div>
            {/* FIX: The 'placeholder' attribute is not valid for a div. This was replaced with a custom placeholder implementation using state to provide a robust user experience for the content-editable editor. */}
            <div className="relative">
              <div 
                ref={contentRef} 
                id="content" 
                contentEditable={true}
                onInput={checkContentEmpty}
                onBlur={checkContentEmpty}
                className="block w-full h-60 overflow-y-auto border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-dark-pink focus:border-brand-dark-pink"
              ></div>
              {isContentEmpty && (
                <div className="absolute top-2 left-3 text-gray-400 pointer-events-none">
                  Paste your article content here, including images.
                </div>
              )}
            </div>
        </div>
        <div className="flex justify-end space-x-2">
            {articleToEdit && <button type="button" onClick={clearEdit} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>}
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark-pink hover:bg-pink-500">{articleToEdit ? 'Save Changes' : 'Add Article'}</button>
        </div>
    </form>
  );
}

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { articles, addArticle, updateArticle, deleteArticle, loading } = useArticles();
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: Omit<Article, 'id'|'date'|'imageUrl'>) => {
    try {
      if (articleToEdit) {
        await updateArticle(articleToEdit.id, data);
      } else {
        await addArticle(data);
      }
      setArticleToEdit(null); // Clear edit mode on success
    } catch (error) {
      console.error('Failed to submit article:', error);
      alert('Error: Could not save the article. Please check the console for more details and try again.');
      throw error; // Re-throw to inform the form component that the submission failed.
    }
  };

  const handleEditClick = (article: Article) => {
    setArticleToEdit(article);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDeleteClick = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(articleId);
        // If the successfully deleted article was the one being edited, clear the form.
        if (articleToEdit && articleToEdit.id === articleId) {
          setArticleToEdit(null);
        }
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('Error: Could not delete the article. Please try again.');
      }
    }
  };

  const renderArticleList = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading articles...</p>;
    }
    if (articles.length === 0) {
      return <p className="text-center text-gray-500">No articles found.</p>;
    }
    return articles.map(article => (
      <div key={article.id} className="flex justify-between items-center p-4 border rounded-md transition-shadow hover:shadow-md">
          <div>
              <p className="font-bold text-lg">{article.title}</p>
              <p className="text-sm text-gray-500">Published: {new Date(article.date).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-2">
              <button onClick={() => handleEditClick(article)} className="px-3 py-1 bg-brand-gold text-white rounded-md text-sm hover:bg-amber-500 transition-colors duration-300">Edit</button>
              <button onClick={() => handleDeleteClick(article.id)} className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors duration-300">Delete</button>
          </div>
      </div>
    ));
  };

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold font-serif text-brand-text">Admin Dashboard</h2>
            <button onClick={logout} className="bg-brand-gold text-white font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition-colors duration-300">Logout</button>
        </div>

        <div ref={formRef}>
          <ArticleForm onSubmit={handleFormSubmit} articleToEdit={articleToEdit} clearEdit={() => setArticleToEdit(null)} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold font-serif text-brand-text mb-4">Manage Articles</h3>
            <div className="space-y-4">
                {renderArticleList()}
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
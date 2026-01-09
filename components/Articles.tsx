import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, X, Tag, BookOpen, PenSquare, Calendar } from 'lucide-react';
import { Article } from '../types';
import { useArticles } from './ArticleContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Articles: React.FC = () => {
  const { articles } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleRead = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  const handleWriteClick = () => {
    if (user) {
      navigate('/dashboard/articles');
    } else {
      navigate('/login');
    }
  };

  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <section id="insights" className="py-24 relative bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Knowledge Base</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">Latest Insights</h3>
          </div>
          <button 
            onClick={handleWriteClick}
            className="px-6 py-3 bg-brand-primary text-white rounded-full font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95"
          >
            <PenSquare className="w-4 h-4" />
            Write Article
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-6 group relative cursor-pointer flex flex-col h-full spotlight-card hover:-translate-y-2 transition-transform duration-300"
              onClick={() => handleRead(article)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                {article.title}
              </h4>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{article.author}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{article.date}</span>
                  </div>
                </div>
                <div className="text-brand-primary opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            key="article-modal"
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden relative z-10 shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-primary" />
                  Reading Mode
                </h3>
                <button 
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.author}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                    {selectedArticle.title}
                  </h2>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {(selectedArticle.content || '').split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Articles;
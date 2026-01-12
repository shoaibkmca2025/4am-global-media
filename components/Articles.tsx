
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, X, Tag, BookOpen, PenSquare, Calendar, Search, Sparkles, Globe, ExternalLink, Loader2 } from 'lucide-react';
import { Article } from '../types';
import { useArticles } from './ArticleContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const Articles: React.FC = () => {
  const { articles } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // AI Research State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResult, setAiResult] = useState<{ text: string; sources: any[] } | null>(null);

  const handleRead = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  const handleWriteClick = () => {
    if (user) {
      navigate('/dashboard/publishing');
    } else {
      navigate('/login');
    }
  };

  const handleAiResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a detailed up-to-date professional insight about: ${searchQuery}. Focus on current trends and industry impact.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "No insights found for this query.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title,
          uri: chunk.web.uri
        }));

      setAiResult({ text, sources });
    } catch (error) {
      console.error("AI Research error:", error);
      setAiResult({ text: "System error during transmission. Please verify your uplink and try again.", sources: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <section id="insights" className="py-32 relative bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Knowledge Base</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white tracking-tighter uppercase mb-6">Latest <br/> Insights.</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Access elite industry intelligence and dynamic market research synchronized via the 4AM signal.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button 
              onClick={handleWriteClick}
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
            >
              <PenSquare className="w-4 h-4" />
              Publish Insight
            </button>
          </div>
        </div>

        {/* AI Trends Search Bar */}
        <div className="mb-20">
          <form onSubmit={handleAiResearch} className="relative group">
            <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative glass rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-4 border border-white/50 dark:border-white/10 shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask for real-time market trends or industry intel..." 
                  className="w-full bg-transparent border-none py-4 pl-14 pr-6 text-slate-900 dark:text-white focus:outline-none focus:ring-0 placeholder:text-slate-400 font-medium text-lg"
                />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="px-10 py-4 bg-brand-primary text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isSearching ? "Synthesizing..." : "Synthesize Intel"}
              </button>
            </div>
          </form>

          {/* AI Search Results Display */}
          <AnimatePresence>
            {aiResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 glass rounded-[3rem] overflow-hidden border border-brand-primary/20 shadow-2xl relative"
              >
                <div className="p-8 md:p-12 space-y-8">
                  <div className="flex items-center justify-between border-b border-brand-primary/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-bold uppercase tracking-tight">AI Synthesis Result</h4>
                        <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Grounding: Google Search Active</p>
                      </div>
                    </div>
                    <button onClick={() => setAiResult(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                      {aiResult.text}
                    </p>
                  </div>

                  {aiResult.sources.length > 0 && (
                    <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                      <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Verified Sources & Intelligence Nodes
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {aiResult.sources.map((source, i) => (
                          <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl hover:border-brand-primary/40 transition-all group/source"
                          >
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover/source:text-brand-primary truncate mr-4">
                              {source.title || "External Source Node"}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/source:text-brand-primary shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Static Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-[2.5rem] p-8 group relative cursor-pointer flex flex-col h-full border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 hover:border-brand-primary/30"
              onClick={() => handleRead(article)}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-mono font-bold bg-brand-primary/10 text-brand-primary border border-brand-primary/20 uppercase tracking-widest">
                  {article.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1 uppercase">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h4 className="text-2xl font-display font-bold mb-4 text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2 uppercase tracking-tight">
                {article.title}
              </h4>

              <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 line-clamp-3 flex-grow leading-relaxed font-medium">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                    <User className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{article.author}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{article.date}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0">
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
            className="fixed inset-0 z-[150] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="w-full max-w-4xl bg-white dark:bg-[#050505] border border-white/20 rounded-[3rem] overflow-hidden relative z-[160] shadow-3xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-8 md:p-10 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold uppercase tracking-tight">Intelligence Feed</h3>
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Source: Internal_Nexus</p>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-4 rounded-[1rem] bg-slate-50 dark:bg-white/5 hover:bg-brand-primary hover:text-white transition-all text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-10 md:p-16 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-12">
                  <div className="flex flex-wrap gap-6 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.category}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.author}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        {selectedArticle.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white leading-[0.95] tracking-tighter uppercase">
                    {selectedArticle.title}
                  </h2>

                  <div className="h-[1px] w-20 bg-brand-primary" />

                  <div className="prose prose-xl dark:prose-invert max-w-none">
                    {(selectedArticle.content || '').split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
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

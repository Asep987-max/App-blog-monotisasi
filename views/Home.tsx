import React, { useState, useEffect } from 'react';
import { MOCK_ARTICLES } from '../data';
import NewsCard from '../components/features/NewsCard';
import AdBanner from '../components/ads/AdBanner';
import { AdVariant } from '../types';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const [displayedArticles, setDisplayedArticles] = useState(MOCK_ARTICLES.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const heroArticle = MOCK_ARTICLES[0];
  const listArticles = MOCK_ARTICLES.slice(1);

  // Mock infinite scroll
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // Just duplicating data for demo purposes
      setDisplayedArticles(prev => [...prev, ...MOCK_ARTICLES]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      
      {/* Leaderboard Ad */}
      <AdBanner variant={AdVariant.LEADERBOARD} className="hidden md:flex" />
      <AdBanner variant={AdVariant.MOBILE_BANNER} className="md:hidden" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Column: Content (8 cols) */}
        <div className="lg:col-span-8">
          
          {/* Hero Section */}
          <section className="mb-8">
            <NewsCard article={heroArticle} featured />
          </section>

          {/* Article List with In-Feed Ads */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold border-l-4 border-brand-500 pl-3 mb-4">Berita Terbaru</h2>
            
            {listArticles.map((article, index) => (
              <React.Fragment key={`${article.id}-${index}`}>
                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="w-full md:w-1/3 aspect-video md:aspect-auto">
                    <img src={article.imageUrl} className="w-full h-full object-cover rounded-md" alt={article.title} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                     <div>
                       <span className="text-brand-500 text-xs font-bold uppercase mb-1 block">{article.category}</span>
                       <h3 className="text-xl font-serif font-bold leading-snug mb-2 hover:text-brand-600 cursor-pointer">
                         {article.title}
                       </h3>
                       <p className="text-slate-600 text-sm line-clamp-2">{article.excerpt}</p>
                     </div>
                     <div className="mt-3 text-xs text-slate-400">
                       {new Date(article.publishedAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                     </div>
                  </div>
                </div>

                {/* Inject Ad every 3 items */}
                {(index + 1) % 3 === 0 && (
                   <AdBanner variant={AdVariant.IN_FEED} />
                )}
              </React.Fragment>
            ))}

             {/* Infinite Scroll Mock Button */}
             <div className="text-center pt-6 pb-12">
               <Button onClick={loadMore} disabled={loading} variant="outline" className="w-full md:w-auto">
                 {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
               </Button>
             </div>
          </section>
        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <aside className="lg:col-span-4 hidden lg:block space-y-8">
            
            {/* Popular Widget */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center">
                 <span className="w-2 h-6 bg-brand-500 mr-2 rounded-sm"></span>
                 Terpopuler
               </h3>
               <ul className="space-y-4">
                 {[...MOCK_ARTICLES].sort((a,b) => b.views - a.views).slice(0, 5).map((article, idx) => (
                   <li key={idx} className="flex gap-3 items-start group cursor-pointer">
                      <span className="text-3xl font-bold text-slate-200 font-serif leading-none group-hover:text-brand-200 transition-colors">0{idx + 1}</span>
                      <div>
                        <h4 className="text-sm font-medium leading-snug group-hover:text-brand-500 transition-colors">{article.title}</h4>
                        <span className="text-[10px] text-slate-400 mt-1 block">{article.views.toLocaleString()} views</span>
                      </div>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Sticky Ad */}
            <div className="sticky top-20">
               <AdBanner variant={AdVariant.RECTANGLE} className="mx-auto" />
               <div className="text-center mt-2 text-xs text-slate-400">Advertisement</div>
            </div>

        </aside>

      </div>
      
      {/* Mobile Sticky Bottom Ad Anchor */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-1 z-50 md:hidden flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
         <div className="w-[320px] h-[50px] bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 border border-dashed border-slate-300">
           Sticky Anchor Ad (320x50)
         </div>
         <button className="absolute top-0 right-2 -mt-4 bg-slate-200 rounded-full p-1 shadow">
           <span className="sr-only">Close</span>
           <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
         </button>
      </div>

    </div>
  );
};

export default Home;
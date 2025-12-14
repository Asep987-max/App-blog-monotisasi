import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { MOCK_ARTICLES } from '../../data';
import toast from 'react-hot-toast';

const NewsTicker: React.FC = () => {
  const [breakingNews, setBreakingNews] = useState(MOCK_ARTICLES.filter(a => a.isBreaking));

  // Simulate Supabase Realtime update
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to simulate a breaking news event every 30 seconds
      if (Math.random() > 0.8) {
        const newEvent = {
          id: `new-${Date.now()}`,
          slug: 'breaking-live-event',
          title: `BREAKING: Peristiwa Penting Terjadi Pukul ${new Date().toLocaleTimeString('id-ID')}`,
          category: "Nasional",
          author: "Redaksi",
          publishedAt: new Date().toISOString(),
          imageUrl: "",
          excerpt: "",
          content: "",
          views: 0,
          isBreaking: true
        };
        
        setBreakingNews(prev => [newEvent, ...prev]);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    🔴 Breaking News
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {newEvent.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-brand-600 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Close
              </button>
            </div>
          </div>
        ), { duration: 4000 });
      }
    }, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-900 text-white text-sm py-2 overflow-hidden relative border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="bg-alert-500 text-white text-xs font-bold px-2 py-1 rounded mr-4 animate-pulse whitespace-nowrap z-10">
          LIVE
        </div>
        <div className="overflow-hidden flex-1 relative h-6">
           {/* Simple CSS Marquee */}
           <div className="absolute whitespace-nowrap animate-[ticker_30s_linear_infinite] hover:pause">
             {breakingNews.map((news, idx) => (
               <span key={idx} className="mr-12 font-medium">
                 <span className="text-slate-400 mr-2">•</span>
                 {news.title}
               </span>
             ))}
              {/* Duplicate for infinite loop illusion */}
              {breakingNews.map((news, idx) => (
               <span key={`dup-${idx}`} className="mr-12 font-medium">
                 <span className="text-slate-400 mr-2">•</span>
                 {news.title}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
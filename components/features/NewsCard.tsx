import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { Article } from '../../types';
import Badge from '../ui/Badge';

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, featured = false }) => {
  if (featured) {
    return (
      <div className="group relative rounded-lg overflow-hidden shadow-md bg-white border border-slate-100">
         <div className="aspect-w-16 aspect-h-9 w-full h-80 md:h-[400px] overflow-hidden relative">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-2xl">
              <div className="flex space-x-2 mb-3">
                 <Badge variant="alert">{article.category}</Badge>
              </div>
              <Link to={`/berita/${article.slug}`}>
                <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-3 hover:underline decoration-brand-500 underline-offset-4">
                  {article.title}
                </h2>
              </Link>
              <p className="text-slate-200 line-clamp-2 mb-4 hidden md:block">
                {article.excerpt}
              </p>
              <div className="flex items-center text-xs md:text-sm text-slate-300 space-x-4">
                <span className="font-semibold text-white">{article.author}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                <span className="flex items-center"><Eye className="w-3 h-3 mr-1"/> {article.views.toLocaleString()}</span>
              </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-100 overflow-hidden flex flex-row md:flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-1/3 md:w-full h-32 md:h-48 overflow-hidden relative shrink-0">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
             <Badge variant="default" className="text-[10px]">{article.category}</Badge>
          </div>
          <Link to={`/berita/${article.slug}`}>
            <h3 className="text-base md:text-lg font-serif font-bold text-slate-900 leading-snug mb-2 hover:text-brand-500 line-clamp-2 md:line-clamp-3">
              {article.title}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
           <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
           {/* Mobile view count hidden for space */}
           <span className="hidden md:flex items-center"><Eye className="w-3 h-3 mr-1"/> {article.views}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
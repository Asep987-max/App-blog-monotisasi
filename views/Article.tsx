import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../data';
import Badge from '../components/ui/Badge';
import { Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import AdBanner from '../components/ads/AdBanner';
import { AdVariant } from '../types';
import Button from '../components/ui/Button';

const Article: React.FC = () => {
  const { slug } = useParams();
  
  // Find article based on slug (Mock logic)
  const article = MOCK_ARTICLES.find(a => a.slug === slug) || MOCK_ARTICLES[0];
  const relatedArticles = MOCK_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-brand-500">Home</Link> <span className="mx-2">/</span>
        <span className="text-brand-500 font-medium">{article.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-8 bg-white p-0 md:p-8 rounded-xl md:shadow-sm md:border border-slate-100">
           
           <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
             {article.title}
           </h1>

           <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{article.author}</div>
                  <div className="text-xs text-slate-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
             </div>
             <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="rounded-full !p-2"><Facebook className="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" className="rounded-full !p-2"><Twitter className="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" className="rounded-full !p-2"><Linkedin className="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" className="rounded-full !p-2"><Share2 className="w-4 h-4" /></Button>
             </div>
           </div>

           <img 
             src={article.imageUrl} 
             alt={article.title} 
             className="w-full rounded-lg mb-8 shadow-sm"
           />

           {/* Content with In-Article Ads */}
           <div className="prose prose-lg prose-slate max-w-none font-serif text-slate-800 leading-loose">
             <p className="lead text-xl md:text-2xl text-slate-600 mb-6 font-sans border-l-4 border-brand-500 pl-4 italic">
               "{article.excerpt}"
             </p>
             
             {/* Simulating paragraphs */}
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
             
             {/* Programmatic Ad Slot 1 */}
             <div className="my-8 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-xs text-center text-slate-400 mb-2 uppercase tracking-wider">Iklan</p>
                <AdBanner variant={AdVariant.IN_FEED} />
             </div>

             <p>
               Lebih lanjut, pengamat menilai bahwa situasi ini akan terus berkembang seiring berjalannya waktu. Masyarakat diminta untuk tetap waspada dan memantau informasi dari sumber terpercaya.
               Keterbukaan informasi publik menjadi kunci utama dalam menjaga stabilitas sosial di tengah dinamika yang terjadi saat ini.
             </p>

             <p>
               Sebagai penutup, pemerintah berjanji akan segera menindaklanjuti laporan-laporan yang masuk dan memastikan bahwa bantuan tersalurkan dengan tepat sasaran kepada mereka yang membutuhkan.
             </p>
           </div>

           {/* Tags */}
           <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
             <Badge>Nasional</Badge>
             <Badge>Berita Utama</Badge>
             <Badge>Viral</Badge>
           </div>

           {/* Related News */}
           <div className="mt-12">
             <h3 className="text-2xl font-bold mb-6">Berita Terkait</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {relatedArticles.map(rel => (
                 <div key={rel.id} className="group">
                    <div className="aspect-video rounded-md overflow-hidden mb-3">
                      <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <Link to={`/berita/${rel.slug}`} className="font-bold text-slate-900 group-hover:text-brand-500 line-clamp-3">
                      {rel.title}
                    </Link>
                 </div>
               ))}
             </div>
           </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
             <h4 className="font-bold text-slate-900 mb-4">Baca Juga</h4>
             <ul className="space-y-4">
               {MOCK_ARTICLES.slice(0, 4).map(item => (
                 <li key={item.id} className="border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                    <Link to={`/berita/${item.slug}`} className="text-sm font-medium hover:text-brand-500">
                      {item.title}
                    </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div className="sticky top-24">
             <AdBanner variant={AdVariant.RECTANGLE} className="mx-auto" />
           </div>
        </aside>

      </div>
    </div>
  );
};

export default Article;
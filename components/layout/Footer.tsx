import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-slate-400 py-10 mt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
           <span className="font-serif text-2xl font-bold text-white tracking-tighter block mb-4">
              Veritas<span className="text-brand-500">Cepat</span>
            </span>
            <p className="text-sm leading-relaxed">
              Platform berita terkini yang menyajikan informasi akurat, cepat, dan terpercaya. Mengedepankan jurnalisme berkualitas untuk masyarakat Indonesia.
            </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Kategori</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><a href="#" className="hover:text-brand-500">Politik</a></li>
            <li><a href="#" className="hover:text-brand-500">Ekonomi</a></li>
            <li><a href="#" className="hover:text-brand-500">Olahraga</a></li>
            <li><a href="#" className="hover:text-brand-500">Teknologi</a></li>
            <li><a href="#" className="hover:text-brand-500">Gaya Hidup</a></li>
            <li><a href="#" className="hover:text-brand-500">Otomotif</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Hubungi Kami</h3>
          <p className="text-sm mb-2">Redaksi: redaksi@veritascepat.com</p>
          <p className="text-sm mb-2">Iklan: ads@veritascepat.com</p>
          <div className="flex space-x-4 mt-4">
            {/* Social Placeholders */}
            <div className="w-8 h-8 bg-slate-700 rounded hover:bg-brand-500 cursor-pointer"></div>
            <div className="w-8 h-8 bg-slate-700 rounded hover:bg-brand-500 cursor-pointer"></div>
            <div className="w-8 h-8 bg-slate-700 rounded hover:bg-brand-500 cursor-pointer"></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
        &copy; {new Date().getFullYear()} Veritas Cepat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
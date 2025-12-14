import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell } from 'lucide-react';
import { CATEGORIES } from '../../data';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-brand-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tighter">
              Veritas<span className="text-brand-500">Cepat</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link 
                  key={cat} 
                  to={`/?category=${cat}`} 
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 border-l border-slate-700 pl-6">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Cari berita..." 
                  className="bg-slate-800 text-sm text-white pl-10 pr-4 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 w-48 placeholder-slate-500"
                />
              </div>
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-1">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat}
                to={`/?category=${cat}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
             <Link 
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-500 hover:text-brand-400 hover:bg-slate-700 mt-4 border-t border-slate-700 pt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
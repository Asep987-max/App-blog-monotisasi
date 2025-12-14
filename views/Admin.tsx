import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { CATEGORIES } from '../data';
import toast from 'react-hot-toast';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Create Post State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [content, setContent] = useState('');
  const [isLive, setIsLive] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@veritas.com' && password === 'admin') {
      setIsLoggedIn(true);
      toast.success("Login Berhasil!");
    } else {
      toast.error("Email atau password salah (Hint: admin@veritas.com / admin)");
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Publishing article...',
        success: 'Artikel berhasil diterbitkan ke Live Server!',
        error: 'Gagal menerbitkan.',
      }
    );
    // Reset form
    setTitle('');
    setContent('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
             <p className="text-slate-500 text-sm">Masuk untuk mengelola berita Veritas Cepat</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@veritas.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
              />
            </div>
            <Button type="submit" className="w-full">Masuk Dashboard</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <Button variant="ghost" onClick={() => setIsLoggedIn(false)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Nav */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm border border-slate-100 h-fit">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-4 py-2 bg-brand-50 text-brand-700 font-medium rounded-md">
                Tulis Berita Baru
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                List Berita
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                Manajemen Iklan
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                Settings
              </button>
            </li>
          </ul>
        </div>

        {/* Editor Area */}
        <div className="col-span-1 lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 pb-2 border-b border-slate-100">Buat Berita Baru</h2>
          
          <form onSubmit={handlePublish} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Berita</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Masukkan judul menarik..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select 
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug (Auto)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-md text-slate-500"
                  value={title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}
                  readOnly
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Upload Gambar Utama</label>
               <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                 <p className="text-slate-500 text-sm">Drag & drop gambar atau klik untuk upload</p>
                 <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Isi Berita</label>
              <textarea 
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[200px]"
                placeholder="Tulis konten berita di sini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex items-center space-x-2 bg-yellow-50 p-4 rounded-md border border-yellow-200">
               <input 
                type="checkbox" 
                id="isLive" 
                checked={isLive} 
                onChange={(e) => setIsLive(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500" 
              />
               <label htmlFor="isLive" className="text-sm text-yellow-800 font-medium cursor-pointer">
                 Kirim notifikasi Breaking News (Realtime Push)
               </label>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" variant="ghost" className="mr-4">Simpan Draft</Button>
              <Button type="submit">Publish Artikel</Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
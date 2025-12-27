
import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Product } from '../types';
import { PRODUCTS, BRAND } from '../constants';

interface HeaderProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  cartCount: number;
  compareCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount, compareCount, wishlistCount }) => {
  const [cartAnimating, setCartAnimating] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (cartCount === 0) return;
    setCartAnimating(true);
    const timer = setTimeout(() => setCartAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [cartCount]);

  useEffect(() => {
    if (wishlistCount === 0) return;
    setWishlistAnimating(true);
    const timer = setTimeout(() => setWishlistAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [wishlistCount]);

  const isActive = (v: ViewMode) => currentView === v;

  const handleResultClick = (product: Product) => {
    setSearchQuery('');
    setShowSearch(false);
  };

  const navLinks = [
    { label: 'Home', view: ViewMode.Home, icon: 'fa-house' },
    { label: 'Store', view: ViewMode.Shop, icon: 'fa-store' },
    { label: 'Compare', view: ViewMode.Compare, count: compareCount, icon: 'fa-columns' },
    { label: 'Support', view: ViewMode.HelpCentre, icon: 'fa-circle-question' }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass h-16 border-b border-slate-200/60 py-0 shadow-lg shadow-slate-900/5' : 'bg-transparent h-20 py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
              aria-label="Open Menu"
            >
              <i className="fas fa-bars-staggered text-xl"></i>
            </button>

            <div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => setView(ViewMode.Home)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all shadow-lg shadow-blue-500/20">
                <i className={`fas ${BRAND.logoIcon} text-xl`}></i>
              </div>
              <span className={`text-2xl font-black tracking-tighter transition-colors text-slate-900 block`}>
                {BRAND.firstPart}<span className="text-blue-600"> {BRAND.secondPart}</span>
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <button 
                key={link.label}
                onClick={() => setView(link.view)}
                className={`relative font-black text-xs uppercase tracking-widest transition-all py-2 group ${isActive(link.view) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {link.label}
                {link.count !== undefined && link.count > 0 && (
                  <span className="ml-2 bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[9px] font-black border border-slate-200">
                    {link.count}
                  </span>
                )}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive(link.view) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={searchRef} className="relative hidden md:block">
              <div className="flex items-center bg-slate-100/80 rounded-2xl px-4 py-2 border border-slate-200/50 group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <i className="fas fa-search text-slate-400 text-xs group-focus-within:text-blue-500"></i>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick Search..." 
                  className="bg-transparent border-none focus:ring-0 text-xs font-bold ml-3 w-28 lg:w-44 outline-none placeholder:text-slate-400"
                />
              </div>

              {showSearch && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 glass border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 border-b border-slate-100 flex justify-between items-center px-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggestions</span>
                    <span className="text-[10px] text-blue-600 font-bold">{searchResults.length} Results</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handleResultClick(p)}
                        className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                      >
                        <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] font-bold text-blue-600">£{p.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => { setView(ViewMode.Shop); setShowSearch(false); }}
                    className="w-full p-3 text-xs font-black text-slate-400 hover:text-blue-600 bg-slate-50/50 transition-colors uppercase tracking-widest"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
            
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setView(ViewMode.OrderHistory)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive(ViewMode.OrderHistory) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
                title="My Account"
              >
                <i className="far fa-user-circle text-xl"></i>
              </button>

              <button 
                onClick={() => setView(ViewMode.Wishlist)}
                className={`relative w-10 h-10 flex items-center justify-center transition-all ${wishlistAnimating ? 'animate-pop' : ''} ${isActive(ViewMode.Wishlist) ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-600 hover:bg-rose-50'}`}
                title="Wishlist"
              >
                <i className={`${wishlistCount > 0 && !isActive(ViewMode.Wishlist) ? 'fas text-rose-500' : 'far'} fa-heart text-xl`}></i>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setView(ViewMode.Cart)}
                className={`relative w-10 h-10 flex items-center justify-center transition-all ${cartAnimating ? 'animate-pop' : ''} ${isActive(ViewMode.Cart) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-blue-50'}`}
                title="Basket"
              >
                <i className="fas fa-shopping-basket text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[100] lg:hidden pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className={`absolute left-0 top-0 bottom-0 w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <i className={`fas ${BRAND.logoIcon}`}></i>
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">{BRAND.firstPart}<span className="text-blue-600"> {BRAND.secondPart}</span></span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => setView(link.view)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive(link.view) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <i className={`fas ${link.icon} w-5 text-center`}></i>
                  {link.label}
                  {link.count !== undefined && link.count > 0 && (
                    <span className={`ml-auto px-2 py-0.5 rounded-lg text-[10px] font-black border ${isActive(link.view) ? 'bg-white/20 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                      {link.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Account & Settings</p>
              <button
                onClick={() => setView(ViewMode.OrderHistory)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive(ViewMode.OrderHistory) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="far fa-user-circle w-5 text-center"></i>
                My Orders
              </button>
              <button
                onClick={() => setView(ViewMode.Wishlist)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive(ViewMode.Wishlist) ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="far fa-heart w-5 text-center"></i>
                Saved Items
                {wishlistCount > 0 && <span className="ml-auto bg-rose-100 text-rose-600 px-2 py-0.5 rounded-lg text-[10px] font-black">{wishlistCount}</span>}
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Line</p>
                <p className="text-sm font-black text-slate-900">{BRAND.supportPhone}</p>
              </div>
            </div>
            <p className="mt-6 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">© {new Date().getFullYear()} {BRAND.name} UK Ltd</p>
          </div>
        </div>
      </div>
    </>
  );
};


import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ChatBot } from './components/ChatBot';
import { Cart } from './components/Cart';
import { PaymentGateway } from './components/PaymentGateway';
import { OrderSuccess } from './components/OrderSuccess';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductDetail } from './components/ProductDetail';
import { Comparison } from './components/Comparison';
import { QuickViewModal } from './components/QuickViewModal';
import { RecentlyViewed } from './components/RecentlyViewed';
import { CategorySection } from './components/CategorySection';
import { WarrantyPolicy } from './components/WarrantyPolicy';
import { HelpCentre } from './components/HelpCentre';
import { DeliveryInfo } from './components/DeliveryInfo';
import { ReturnsInfo } from './components/ReturnsInfo';
import { ComparisonBar } from './components/ComparisonBar';
import { OrderHistory } from './components/OrderHistory';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { CookiesPolicy } from './components/CookiesPolicy';
import { PRODUCTS, BRAND } from './constants';
import { Product, CartItem, ViewMode, Order } from './types';

const RECENTLY_VIEWED_KEY = 'hiveimage_recently_viewed';
const WISHLIST_KEY = 'hiveimage_wishlist';
const ORDERS_KEY = 'hiveimage_orders';

// Automated WhatsApp details
const WHATSAPP_NUMBER = "447469535612";
const WHATSAPP_MESSAGE = encodeURIComponent(`Hello ${BRAND.name}! I'm interested in your premium electronics and appliances. Could you please provide more information?`);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// SEO Component for Structured Data Injection
const ProductStructuredData: React.FC<{ products: Product[] }> = ({ products }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "image": product.image,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": BRAND.name
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "GBP",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      }))
    };
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [products]);
  return null;
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px]">
        <i className="fas fa-check"></i>
      </div>
      <span className="text-sm font-bold tracking-tight">{message}</span>
    </div>
  );
};

const WhatsAppButton: React.FC = () => (
  <a 
    href={WHATSAPP_URL} 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-[2rem] shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group"
    title="Contact us on WhatsApp"
  >
    <div className="absolute inset-0 bg-[#25D366] rounded-[2rem] animate-ping opacity-20 group-hover:hidden"></div>
    <i className="fab fa-whatsapp text-3xl transition-transform group-hover:rotate-12"></i>
  </a>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [directBuyItem, setDirectBuyItem] = useState<CartItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  useEffect(() => {
    const storedRV = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (storedRV) {
      try {
        const ids = JSON.parse(storedRV) as string[];
        const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => !!p);
        setRecentlyViewed(products);
      } catch (e) { console.error(e); }
    }

    const storedWishlist = localStorage.getItem(WISHLIST_KEY);
    if (storedWishlist) {
      try {
        const ids = JSON.parse(storedWishlist) as string[];
        const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => !!p);
        setWishlist(products);
      } catch (e) { console.error(e); }
    }

    const storedOrders = localStorage.getItem(ORDERS_KEY);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) { console.error(e); }
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  const trackProductView = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 5);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated.map(p => p.id)));
      return updated;
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      let updated;
      if (exists) {
        updated = prev.filter(p => p.id !== product.id);
        showToast("Removed from Wishlist");
      } else {
        updated = [...prev, product];
        showToast("Added to Wishlist");
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated.map(p => p.id)));
      return updated;
    });
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${product.name} to Basket`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    setDirectBuyItem({ ...product, quantity });
    changeView(ViewMode.Checkout);
  };

  const changeView = (newView: ViewMode) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast("Max 3 products for comparison");
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  const viewProductDetails = (product: Product) => {
    trackProductView(product);
    setSelectedProduct(product);
    changeView(ViewMode.ProductDetail);
  };

  const handleQuickView = (product: Product) => {
    trackProductView(product);
    setQuickViewProduct(product);
  };

  const selectCategory = (cat: string) => {
    setIsProductsLoading(true);
    setActiveCategory(cat);
    changeView(ViewMode.Shop);
    setTimeout(() => setIsProductsLoading(false), 800);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from Basket");
  };

  const handleCheckoutSuccess = (finalTotal: number) => {
    const itemsToOrder = directBuyItem ? [directBuyItem] : [...cart];
    const newOrder: Order = {
      id: `HI-${Math.floor(Math.random() * 900000 + 100000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: itemsToOrder,
      total: finalTotal,
      status: 'Processing'
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    
    if (directBuyItem) {
      setDirectBuyItem(null);
    } else {
      setCart([]);
    }
    changeView(ViewMode.Success);
  };

  const handleCancelCheckout = () => {
    if (directBuyItem) {
      setDirectBuyItem(null);
      changeView(ViewMode.Shop);
    } else {
      changeView(ViewMode.Cart);
    }
  };

  const clearFilters = () => {
    setIsProductsLoading(true);
    setActiveCategory('All');
    setPriceRange([0, 2000]);
    setMinRating(0);
    setTimeout(() => setIsProductsLoading(false), 600);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const productCounts = PRODUCTS.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesRating = p.rating >= minRating;
    return matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <ProductStructuredData products={PRODUCTS} />
      <Header 
        currentView={view} 
        setView={changeView} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        compareCount={compareList.length}
        wishlistCount={wishlist.length}
      />

      <main className="flex-1 view-transition" key={view} id="main-content">
        {view === ViewMode.Home && (
          <>
            <Hero setView={changeView} />
            <CategorySection 
              categories={categories} 
              onSelectCategory={selectCategory} 
              productCounts={productCounts}
            />
            <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-100" aria-labelledby="featured-innovations-title">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 id="featured-innovations-title" className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">Featured Innovations</h2>
                  <p className="text-slate-500 font-medium">Precision engineering for your premium lifestyle.</p>
                </div>
                <button 
                  onClick={() => changeView(ViewMode.Shop)}
                  className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                  aria-label={`View our complete ${BRAND.name} product collection`}
                >
                  View All Collection <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.filter(p => p.featured).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onBuyNow={handleBuyNow}
                    onViewDetails={viewProductDetails}
                    onToggleCompare={toggleCompare}
                    onQuickView={handleQuickView}
                    onToggleWishlist={toggleWishlist}
                    isComparing={compareList.some(p => p.id === product.id)}
                    isInWishlist={wishlist.some(p => p.id === product.id)}
                  />
                ))}
              </div>
            </section>
            <RecentlyViewed 
              products={recentlyViewed}
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
              onViewDetails={viewProductDetails}
              onToggleCompare={toggleCompare}
              onQuickView={handleQuickView}
              onToggleWishlist={toggleWishlist}
              compareList={compareList}
              wishlist={wishlist}
            />
          </>
        )}

        {view === ViewMode.Shop && (
          <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="shop-collection-title">
            <h1 id="shop-collection-title" className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Shop Our Collection</h1>
            <div className="flex flex-col lg:flex-row gap-10">
              <aside className="lg:w-1/4">
                <FilterSidebar 
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={selectCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  onClear={clearFilters}
                />
              </aside>
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <p className="text-slate-500 font-medium italic">
                    Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> results in <span className="text-blue-600 font-bold underline decoration-blue-200 decoration-2 underline-offset-4">{activeCategory}</span>
                  </p>
                </div>
                {isProductsLoading ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                     {[...Array(6)].map((_, i) => (
                       <ProductCard key={i} loading onAddToCart={addToCart} onBuyNow={handleBuyNow} onViewDetails={viewProductDetails} onToggleCompare={toggleCompare} onQuickView={handleQuickView} onToggleWishlist={toggleWishlist} />
                     ))}
                   </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onViewDetails={viewProductDetails}
                        onToggleCompare={toggleCompare}
                        onQuickView={handleQuickView}
                        onToggleWishlist={toggleWishlist}
                        isComparing={compareList.some(p => p.id === product.id)}
                        isInWishlist={wishlist.some(p => p.id === product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[2rem] p-16 text-center border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-search text-2xl" aria-hidden="true"></i>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No results matching your filters</h3>
                    <p className="text-slate-500 mb-8">Try adjusting your price range or category.</p>
                    <button onClick={clearFilters} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {view === ViewMode.Wishlist && (
          <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="wishlist-title">
            <h1 id="wishlist-title" className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Your Saved Items</h1>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlist.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onBuyNow={handleBuyNow}
                    onViewDetails={viewProductDetails}
                    onToggleCompare={toggleCompare}
                    onQuickView={handleQuickView}
                    onToggleWishlist={toggleWishlist}
                    isComparing={compareList.some(p => p.id === product.id)}
                    isInWishlist={true}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-24 text-center border border-slate-100 shadow-sm">
                <i className="far fa-heart text-5xl text-slate-200 mb-8" aria-hidden="true"></i>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h3>
                <p className="text-slate-500 mb-10">Add products you love to save them for later.</p>
                <button onClick={() => changeView(ViewMode.Shop)} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </section>
        )}

        {view === ViewMode.Warranty && <WarrantyPolicy setView={changeView} />}
        {view === ViewMode.HelpCentre && <HelpCentre setView={changeView} />}
        {view === ViewMode.Delivery && <DeliveryInfo setView={changeView} />}
        {view === ViewMode.Returns && <ReturnsInfo setView={changeView} />}
        {view === ViewMode.OrderHistory && <OrderHistory orders={orders} setView={changeView} />}
        {view === ViewMode.Privacy && <PrivacyPolicy setView={changeView} />}
        {view === ViewMode.Terms && <TermsConditions setView={changeView} />}
        {view === ViewMode.Cookies && <CookiesPolicy setView={changeView} />}
        
        {view === ViewMode.ProductDetail && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onAddToCart={addToCart}
            onBuyNow={handleBuyNow}
            onCompare={toggleCompare}
            isComparing={compareList.some(p => p.id === selectedProduct.id)}
            setView={changeView}
          />
        )}
        {view === ViewMode.Compare && (
          <Comparison 
            products={compareList}
            onRemove={removeFromCompare}
            onAddToCart={addToCart}
            setView={changeView}
          />
        )}
        {view === ViewMode.Cart && (
          <Cart 
            items={cart} 
            updateQuantity={updateQuantity} 
            removeItem={removeFromCart} 
            setView={changeView} 
          />
        )}
        {view === ViewMode.Checkout && (
          <PaymentGateway 
            subtotal={directBuyItem ? (directBuyItem.price * directBuyItem.quantity) : subtotal}
            onSuccess={handleCheckoutSuccess}
            onCancel={handleCancelCheckout}
          />
        )}
        {view === ViewMode.Success && (
          <OrderSuccess setView={changeView} />
        )}
      </main>

      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-slate-800" aria-label="Main Footer">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => changeView(ViewMode.Home)} role="link" aria-label={`${BRAND.name} Home`}>
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-6">
                  <i className={`fas ${BRAND.logoIcon} text-2xl`} aria-hidden="true"></i>
                </div>
                <span className="text-3xl font-black tracking-tighter">{BRAND.name}</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Empowering your digital life with the United Kingdom's most curated selection of flagship electronics and smart home innovations from {BRAND.name}.
              </p>
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: 'whatsapp', color: 'hover:bg-[#25D366]', link: WHATSAPP_URL, label: 'WhatsApp' },
                  { icon: 'facebook-f', color: 'hover:bg-[#1877F2]', link: '#', label: 'Facebook' },
                  { icon: 'instagram', color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]', link: '#', label: 'Instagram' },
                  { icon: 'linkedin-in', color: 'hover:bg-[#0077B5]', link: '#', label: 'LinkedIn' },
                  { icon: 'youtube', color: 'hover:bg-[#FF0000]', link: '#', label: 'YouTube' },
                  { icon: 'tiktok', color: 'hover:bg-[#000000]', link: '#', label: 'TikTok' }
                ].map(social => (
                  <a key={social.icon} href={social.link} target={social.icon === 'whatsapp' ? "_blank" : "_self"} rel={social.icon === 'whatsapp' ? "noopener noreferrer" : ""} className={`w-11 h-11 bg-slate-800/50 rounded-xl flex items-center justify-center transition-all transform hover:-translate-y-2 hover:scale-110 hover:rotate-6 shadow-lg ${social.color}`} aria-label={`Follow ${BRAND.name} on ${social.label}`}>
                    <i className={`fab fa-${social.icon} text-sm`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
            
            <nav aria-label="E-Commerce links">
              <h4 className="font-bold text-xl mb-8 tracking-tight">E-Commerce</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                {['Shop All', 'Smartphones', 'Laptops', 'Smart Home', 'Kitchen'].map(item => (
                  <li key={item}>
                    <button onClick={() => selectCategory(item === 'Shop All' ? 'All' : item)} className="hover:text-blue-400 transition-colors flex items-center gap-2 group text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600/0 group-hover:bg-blue-600 transition-all"></span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support links">
              <h4 className="font-bold text-xl mb-8 tracking-tight">UK Services</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                {[
                  { label: 'Help Centre', view: ViewMode.HelpCentre },
                  { label: 'Returns Portal', view: ViewMode.Returns },
                  { label: 'Delivery Guide', view: ViewMode.Delivery },
                  { label: 'Warranty Policy', view: ViewMode.Warranty },
                  { label: 'Order History', view: ViewMode.OrderHistory }
                ].map(link => (
                  <li key={link.label}>
                    <button onClick={() => changeView(link.view)} className="hover:text-blue-400 transition-colors flex items-center gap-2 group text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600/0 group-hover:bg-blue-600 transition-all"></span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="font-bold text-xl mb-8 tracking-tight">Global Support</h4>
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">UK Support</p>
                  <p className="text-lg font-bold">{BRAND.supportPhone}</p>
                </div>
                <div className="flex items-start gap-4 text-slate-400">
                  <i className="fas fa-location-dot text-blue-500 mt-1" aria-hidden="true"></i>
                  <span className="text-sm">{BRAND.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div className="flex flex-col md:items-start items-center">
              <p>© {new Date().getFullYear()} {BRAND.name} UK Limited. Registered Company #12345678.</p>
              <p className="text-xs mt-1">
                Website created by <a href="https://mushieditz.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">Mushi Editz</a>
              </p>
            </div>
            <nav className="flex gap-8 font-bold" aria-label="Legal links">
              <button onClick={() => changeView(ViewMode.Privacy)} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => changeView(ViewMode.Terms)} className="hover:text-white transition-colors">Terms</button>
              <button onClick={() => changeView(ViewMode.Cookies)} className="hover:text-white transition-colors">Cookies</button>
            </nav>
          </div>
        </div>
      </footer>

      <ComparisonBar 
        products={compareList} 
        onRemove={removeFromCompare} 
        onCompare={() => changeView(ViewMode.Compare)}
        onClear={() => setCompareList([])}
      />
      
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        onAddToCart={addToCart} 
        onBuyNow={handleBuyNow}
      />
      <ChatBot />
      <WhatsAppButton />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;

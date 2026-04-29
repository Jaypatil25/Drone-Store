import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore(s => s.getCount());
  const wishlistCount = useWishlistStore(s => s.getCount());
  const { isAuthenticated, user, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/drones', label: 'Drones' },
    { to: '/compare', label: 'Compare' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
          scrolled ? 'glass-strong px-4 py-2' : 'glass-strong px-6 py-3'
        } rounded-full max-w-[780px] w-[calc(100%-2rem)]`}
        style={{ boxShadow: '0 8px 40px rgba(0,102,255,0.12)' }}
      >
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <span className="font-display font-bold text-xl">
              <span className="text-primary">Droni</span>
              <span className="text-foreground">X</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
            >
              <Search size={18} />
            </button>

            <Link to="/wishlist" className="p-2 rounded-full hover:bg-foreground/5 transition-colors relative">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            <Link to="/cart" className="p-2 rounded-full hover:bg-foreground/5 transition-colors relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 glass-card rounded-xl p-2 min-w-[160px]">
                      <p className="px-3 py-1.5 text-sm font-medium">{user?.name}</p>
                      <Link to="/orders" className="block px-3 py-1.5 text-sm rounded-lg hover:bg-foreground/5" onClick={() => setUserMenuOpen(false)}>Orders</Link>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-sm rounded-lg hover:bg-foreground/5 text-destructive">Logout</button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/auth/login" className="p-2 rounded-full hover:bg-foreground/5 transition-colors">
                  <User size={18} />
                </Link>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-full hover:bg-foreground/5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] glass-strong md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="font-display text-3xl font-bold hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

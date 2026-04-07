import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import GlassCard from '@/components/GlassCard';
import RatingStars from '@/components/RatingStars';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(s => s.addItem);

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="text-6xl mb-6">💚</div>
          <h1 className="font-display font-bold text-3xl">Your wishlist is empty</h1>
          <p className="text-muted-foreground mt-2">Save drones you love and come back later.</p>
          <Link to="/drones" className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
            Browse Drones <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display font-bold text-4xl mb-8">Wishlist ({items.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {items.map(drone => (
              <motion.div key={drone.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                <GlassCard className="overflow-hidden">
                  <Link to={`/drones/${drone.id}`}>
                    <img src={drone.images[0]} alt={drone.name} className="w-full aspect-[4/3] object-cover" />
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{drone.brand}</p>
                    <h3 className="font-display font-semibold mt-1">{drone.name}</h3>
                    <RatingStars rating={drone.rating} size={12} />
                    <p className="font-mono font-bold text-lg mt-2">${drone.price.toLocaleString()}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { addToCart(drone); toast.success('Added to cart!'); }}
                        className="flex-1 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                      <button
                        onClick={() => { removeItem(drone.id); toast('Removed from wishlist'); }}
                        className="p-2 rounded-full glass text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

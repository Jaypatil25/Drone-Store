import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';
import RatingStars from './RatingStars';
import GlassCard from './GlassCard';
import { motion } from 'framer-motion';

const DroneCard = ({ drone, index = 0 }) => {
  const addItem = useCartStore(s => s.addItem);
  const { addItem: addWish, removeItem: removeWish, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(drone.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(drone);
    toast.success(`${drone.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeWish(drone.id);
      toast('Removed from wishlist');
    } else {
      addWish(drone);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/drones/${drone.id}`}>
        <GlassCard className="group overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-muted/30">
            <img
              src={drone.images[0]}
              alt={drone.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 flex gap-1.5">
              {drone.isNew && (
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">NEW</span>
              )}
              {drone.discount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold">-{drone.discount}%</span>
              )}
            </div>
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleWishlist}
                className="p-2 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Heart size={16} className={wishlisted ? 'fill-accent text-accent' : ''} />
              </button>
              <Link
                to={`/drones/${drone.id}`}
                onClick={e => e.stopPropagation()}
                className="p-2 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Eye size={16} />
              </Link>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{drone.brand}</p>
            <h3 className="font-display font-semibold text-base mt-1 group-hover:text-primary transition-colors line-clamp-1">{drone.name}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <RatingStars rating={drone.rating} size={12} />
              <span className="text-xs text-muted-foreground">({drone.reviewCount})</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">{drone.shortDescription}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold">${drone.price.toLocaleString()}</span>
                {drone.originalPrice > drone.price && (
                  <span className="text-xs text-muted-foreground line-through">${drone.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};

export default DroneCard;

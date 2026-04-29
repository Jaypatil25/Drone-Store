import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Check, GitCompare } from 'lucide-react';
import { drones } from '@/data/drones';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import GlassCard from '@/components/GlassCard';
import RatingStars from '@/components/RatingStars';
import DroneCard from '@/components/DroneCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const DroneDetail = () => {
  const { id } = useParams();
  const drone = drones.find(d => d.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const addToCart = useCartStore(s => s.addItem);
  const { addItem: addWish, removeItem: removeWish, isInWishlist } = useWishlistStore();
  const { addItem: addCompare, isInCompare } = useCompareStore();

  if (!drone) {
    return (
      <div className="pt-28 pb-16 text-center">
        <h1 className="font-display text-4xl font-bold">Drone not found</h1>
        <Link to="/drones" className="text-primary mt-4 inline-block">← Back to drones</Link>
      </div>
    );
  }

  const related = drones.filter(d => d.category === drone.category && d.id !== drone.id).slice(0, 4);
  const wishlisted = isInWishlist(drone.id);
  const compared = isInCompare(drone.id);

  const specs = [
    { label: 'Flight Time', value: drone.flightTime },
    { label: 'Max Speed', value: drone.maxSpeed },
    { label: 'Range', value: drone.maxRange },
    { label: 'Camera', value: drone.camera },
    { label: 'Weight', value: drone.weight },
    { label: 'Wind Resistance', value: drone.windResistance },
    { label: 'Max Altitude', value: drone.maxAltitude },
  ];

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/drones" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} /> Back to drones
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="p-4 overflow-hidden" hover={false}>
              <div className="aspect-square rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={drone.images[selectedImage]}
                  alt={drone.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {drone.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider">{drone.brand}</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl mt-3">{drone.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <RatingStars rating={drone.rating} />
              <span className="text-sm text-muted-foreground">({drone.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="font-mono text-3xl font-bold text-primary">${drone.price.toLocaleString()}</span>
              {drone.originalPrice > drone.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${drone.originalPrice.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-sm font-bold">-{drone.discount}%</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground mt-4">{drone.description}</p>

            
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full hover:bg-foreground/5 flex items-center justify-center font-bold">−</button>
                <span className="w-8 text-center font-mono">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full hover:bg-foreground/5 flex items-center justify-center font-bold">+</button>
              </div>
            </div>

            
            <div className="space-y-3 mt-6">
              <button
                onClick={() => { addToCart(drone, quantity); toast.success(`${drone.name} added to cart!`); }}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <Link
                to="/cart"
                onClick={() => addToCart(drone, quantity)}
                className="w-full py-3 rounded-full glass font-semibold hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
              >
                Buy Now
              </Link>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (wishlisted) { removeWish(drone.id); toast('Removed from wishlist'); }
                    else { addWish(drone); toast.success('Added to wishlist!'); }
                  }}
                  className={`flex-1 py-2.5 rounded-full glass font-medium text-sm flex items-center justify-center gap-2 ${wishlisted ? 'text-accent' : ''}`}
                >
                  <Heart size={16} className={wishlisted ? 'fill-current' : ''} /> {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button
                  onClick={() => {
                    if (!compared) {
                      const ok = addCompare(drone);
                      if (ok) toast.success('Added to compare!');
                      else toast.error('Compare list full (max 3)');
                    }
                  }}
                  className={`flex-1 py-2.5 rounded-full glass font-medium text-sm flex items-center justify-center gap-2 ${compared ? 'text-primary' : ''}`}
                >
                  <GitCompare size={16} /> {compared ? 'Comparing' : 'Compare'}
                </button>
              </div>
            </div>

            
            <div className="flex items-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground"><Truck size={14} className="text-secondary" /> Free delivery</div>
              <div className="flex items-center gap-1 text-muted-foreground"><Shield size={14} className="text-secondary" /> 2yr warranty</div>
              <div className="flex items-center gap-1 text-muted-foreground"><RotateCcw size={14} className="text-secondary" /> Easy returns</div>
            </div>

            {drone.inStock ? (
              <p className="flex items-center gap-1 text-sm text-secondary mt-3"><Check size={14} /> In stock ({drone.stockCount} left)</p>
            ) : (
              <p className="text-sm text-destructive mt-3">Out of stock</p>
            )}
          </motion.div>
        </div>

        
        <div className="mt-16">
          <div className="flex gap-1 glass rounded-full p-1 w-fit mx-auto">
            {['specs', 'features', 'box', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'
                }`}
              >
                {tab === 'box' ? 'In The Box' : tab}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            {activeTab === 'specs' && (
              <GlassCard className="p-6" hover={false}>
                <div className="space-y-3">
                  {specs.map(s => (
                    <div key={s.label} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
            {activeTab === 'features' && (
              <GlassCard className="p-6" hover={false}>
                <ul className="space-y-2">
                  {drone.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={16} className="text-secondary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
            {activeTab === 'box' && (
              <GlassCard className="p-6" hover={false}>
                <ul className="space-y-2">
                  {['Drone × 1', 'Remote Controller × 1', 'Intelligent Flight Battery × 1', 'Charging Hub × 1', 'USB-C Cable × 1', 'Spare Propellers × 2 pairs', 'Quick Start Guide'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={16} className="text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
            {activeTab === 'reviews' && (
              <GlassCard className="p-6" hover={false}>
                <p className="text-center text-muted-foreground">Reviews coming soon! Be the first to review this drone.</p>
              </GlassCard>
            )}
          </div>
        </div>

        
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-2xl mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((d, i) => <DroneCard key={d.id} drone={d} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroneDetail;

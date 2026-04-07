import { Link } from 'react-router-dom';
import { X, Plus, ShoppingCart } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { useCartStore } from '@/store/cartStore';
import { drones } from '@/data/drones';
import GlassCard from '@/components/GlassCard';
import RatingStars from '@/components/RatingStars';
import { toast } from 'sonner';
import { useState } from 'react';

const Compare = () => {
  const { items, removeItem, addItem, clearAll } = useCompareStore();
  const addToCart = useCartStore(s => s.addItem);
  const [showPicker, setShowPicker] = useState(false);

  const specs = ['price', 'flightTime', 'maxSpeed', 'maxRange', 'camera', 'weight', 'windResistance', 'maxAltitude', 'rating'];
  const specLabels = { price: 'Price', flightTime: 'Flight Time', maxSpeed: 'Max Speed', maxRange: 'Range', camera: 'Camera', weight: 'Weight', windResistance: 'Wind Resistance', maxAltitude: 'Max Altitude', rating: 'Rating' };

  const getBestValue = (spec) => {
    if (items.length < 2) return -1;
    if (spec === 'price' || spec === 'weight') {
      const vals = items.map(d => parseFloat(String(d[spec]).replace(/[^\d.]/g, '')));
      return vals.indexOf(Math.min(...vals));
    }
    if (spec === 'rating') {
      const vals = items.map(d => d.rating);
      return vals.indexOf(Math.max(...vals));
    }
    return -1;
  };

  const availableDrones = drones.filter(d => !items.find(i => i.id === d.id));

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-4xl">Compare Drones</h1>
          {items.length > 0 && (
            <button onClick={clearAll} className="text-sm text-destructive hover:underline">Clear All</button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[0, 1, 2].map(slot => {
            const drone = items[slot];
            if (drone) {
              return (
                <GlassCard key={slot} className="p-4 relative">
                  <button onClick={() => removeItem(drone.id)} className="absolute top-3 right-3 p-1 rounded-full glass hover:bg-destructive/10 text-destructive">
                    <X size={14} />
                  </button>
                  <Link to={`/drones/${drone.id}`}>
                    <img src={drone.images[0]} alt={drone.name} className="w-full aspect-square object-cover rounded-xl mb-3" />
                  </Link>
                  <p className="text-xs text-muted-foreground uppercase">{drone.brand}</p>
                  <h3 className="font-display font-semibold">{drone.name}</h3>
                  <p className="font-mono font-bold text-lg text-primary mt-1">${drone.price.toLocaleString()}</p>
                  <button
                    onClick={() => { addToCart(drone); toast.success('Added to cart!'); }}
                    className="w-full mt-3 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </GlassCard>
              );
            }
            return (
              <button
                key={slot}
                onClick={() => setShowPicker(true)}
                className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center py-20 hover:border-primary/30 transition-colors"
              >
                <Plus size={32} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground mt-2">Add Drone</span>
              </button>
            );
          })}
        </div>

        {/* Spec table */}
        {items.length >= 2 && (
          <GlassCard className="overflow-x-auto" hover={false}>
            <table className="w-full">
              <tbody>
                {specs.map(spec => {
                  const best = getBestValue(spec);
                  return (
                    <tr key={spec} className="border-b border-border/20 last:border-0">
                      <td className="py-3 px-4 font-medium text-sm text-muted-foreground w-40">{specLabels[spec]}</td>
                      {items.map((d, i) => (
                        <td key={d.id} className={`py-3 px-4 text-sm ${i === best ? 'text-secondary font-bold' : ''}`}>
                          {spec === 'price' ? `$${d.price.toLocaleString()}` : spec === 'rating' ? <RatingStars rating={d.rating} size={12} /> : d[spec]}
                        </td>
                      ))}
                      {items.length < 3 && <td />}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </GlassCard>
        )}

        {/* Picker modal */}
        {showPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/20" onClick={() => setShowPicker(false)} />
            <div className="relative bg-background rounded-2xl shadow-xl p-6 max-w-lg w-full max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg">Select a drone</h3>
                <button onClick={() => setShowPicker(false)}><X size={20} /></button>
              </div>
              <div className="space-y-2">
                {availableDrones.map(d => (
                  <button
                    key={d.id}
                    onClick={() => { addItem(d); setShowPicker(false); toast.success(`${d.name} added to compare`); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
                  >
                    <img src={d.images[0]} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">${d.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;

import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import GlassCard from '@/components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const [discount, setDiscount] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 19.99;
  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  const applyDiscount = () => {
    if (discount.toUpperCase() === 'DRONIX10') {
      setDiscountApplied(true);
      toast.success('10% discount applied!');
    } else {
      toast.error('Invalid discount code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-display font-bold text-3xl">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">Looks like you haven't added any drones yet.</p>
          <Link
            to="/drones"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold"
          >
            Shop Drones <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display font-bold text-4xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-4 flex gap-4" hover={false}>
                    <Link to={`/drones/${item.id}`} className="shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/drones/${item.id}`} className="font-display font-semibold hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full hover:bg-foreground/5 flex items-center justify-center">
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full hover:bg-foreground/5 flex items-center justify-center">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-mono font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { removeItem(item.id); toast('Item removed'); }}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <GlassCard className="p-6 sticky top-28" hover={false}>
              <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-secondary' : ''}>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 my-4">
                <input
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 px-3 py-2 rounded-xl glass text-sm outline-none"
                />
                <button onClick={applyDiscount} className="px-4 py-2 rounded-xl bg-foreground/5 text-sm font-medium hover:bg-foreground/10">
                  Apply
                </button>
              </div>

              <div className="border-t border-border/30 pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              <Link to="/drones" className="block text-center text-sm text-primary mt-3 hover:underline">
                Continue Shopping
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

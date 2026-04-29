import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import GlassCard from '@/components/GlassCard';
import { CreditCard, Building, Smartphone, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user } = useAuthStore();
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [flipped, setFlipped] = useState(false);

  const formatCardNumber = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length > 2) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  const handlePay = () => {
    if (method === 'card' && (!card.number || !card.name || !card.expiry || !card.cvv)) {
      toast.error('Please fill in all card details');
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const shipping = JSON.parse(localStorage.getItem('dronix-shipping') || '{}');
      await addOrder({ items, total: getTotal(), shipping, paymentMethod: method }, user?.id);
      await clearCart(user?.id);
      navigate('/payment/success');
    }, 2000);
  };

  const subtotal = getTotal();

  const methods = [
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'bank', label: 'Bank', icon: Building },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'paypal', label: 'PayPal', icon: Wallet },
  ];

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Shipping', 'Payment', 'Confirm'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= 1 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'
              }`}>
                {i < 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i <= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</span>
              {i < 2 && <div className="w-12 h-px bg-border" />}
            </div>
          ))}
        </div>

        <GlassCard className="p-8" hover={false}>
          <h2 className="font-display font-bold text-2xl mb-6">Payment Method</h2>

          <div className="flex gap-2 mb-8">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  method === m.id ? 'bg-primary text-primary-foreground' : 'glass hover:bg-foreground/5'
                }`}
              >
                <m.icon size={16} /> {m.label}
              </button>
            ))}
          </div>

          {method === 'card' && (
            <>
              
              <div className="mb-8 perspective-1000">
                <div className={`w-full max-w-sm mx-auto aspect-[1.6/1] rounded-2xl p-6 text-primary-foreground relative transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
                  style={{ background: 'linear-gradient(135deg, hsl(220, 100%, 50%), hsl(220, 80%, 35%))' }}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-8 rounded bg-primary-foreground/20" />
                    <CreditCard size={24} className="opacity-60" />
                  </div>
                  <p className="font-mono text-lg tracking-widest mt-6">{card.number || '•••• •••• •••• ••••'}</p>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-[10px] opacity-60 uppercase">Card Holder</p>
                      <p className="text-sm font-medium">{card.name || 'YOUR NAME'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-60 uppercase">Expires</p>
                      <p className="text-sm font-mono">{card.expiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Card Number</label>
                  <input
                    value={card.number}
                    onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary font-mono"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cardholder Name</label>
                  <input
                    value={card.name}
                    onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })}
                    placeholder="JOHN DOE"
                    className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Expiry</label>
                    <input
                      value={card.expiry}
                      onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary font-mono"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">CVV</label>
                    <input
                      type="password"
                      value={card.cvv}
                      onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                      onFocus={() => setFlipped(true)}
                      onBlur={() => setFlipped(false)}
                      placeholder="•••"
                      className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary font-mono"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {method !== 'card' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{method === 'bank' ? 'Bank transfer' : method === 'upi' ? 'UPI' : 'PayPal'} payment — click Pay Now to simulate.</p>
            </div>
          )}

          <div className="border-t border-border/30 pt-4 mt-6">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span className="font-mono">${(subtotal + subtotal * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              'Pay Now'
            )}
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default Payment;

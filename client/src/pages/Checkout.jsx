import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import GlassCard from '@/components/GlassCard';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();
  const [shipping, setShipping] = useState('standard');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', address2: '', city: '', state: '', zip: '', country: 'US'
  });

  const shippingCosts = { standard: 0, express: 9.99, next: 19.99 };
  const subtotal = getTotal();
  const shippingCost = shippingCosts[shipping];
  const total = subtotal + shippingCost + subtotal * 0.08;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast.error('Please fill in all required fields');
      return;
    }
    localStorage.setItem('dronix-shipping', JSON.stringify({ ...form, method: shipping, cost: shippingCost }));
    navigate('/payment');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Shipping', 'Payment', 'Confirm'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</span>
              {i < 2 && <div className="w-12 h-px bg-border" />}
            </div>
          ))}
        </div>

        <GlassCard className="p-8" hover={false}>
          <h2 className="font-display font-bold text-2xl mb-6">Shipping Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Address *</label>
              <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Address Line 2</label>
              <input value={form.address2} onChange={e => setForm({ ...form, address2: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">City *</label>
                <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">State</label>
                <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">ZIP *</label>
                <input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="w-full px-4 py-2.5 rounded-xl glass outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-display font-semibold mb-3">Delivery Method</h3>
              <div className="space-y-2">
                {[
                  { id: 'standard', label: 'Standard (Free)', desc: '5-7 business days', cost: 0 },
                  { id: 'express', label: 'Express ($9.99)', desc: '2-3 business days', cost: 9.99 },
                  { id: 'next', label: 'Next Day ($19.99)', desc: 'Next business day', cost: 19.99 },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    shipping === opt.id ? 'glass border-2 border-primary/30' : 'glass'
                  }`}>
                    <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-primary" />
                    <div className="flex-1">
                      <span className="font-medium text-sm">{opt.label}</span>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border/30 pt-4 mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors mt-4">
              Continue to Payment
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Checkout;

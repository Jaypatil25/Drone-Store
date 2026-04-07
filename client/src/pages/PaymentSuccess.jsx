import { Link } from 'react-router-dom';
import { Check, Package, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { useOrderStore } from '@/store/orderStore';

const PaymentSuccess = () => {
  const { orders } = useOrderStore();
  const lastOrder = orders[0];

  const deliveryDate = new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <GlassCard className="p-8 text-center" hover={false}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-secondary" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="font-display font-bold text-3xl">Order Confirmed! 🎉</h1>
            <p className="text-muted-foreground mt-2">Thank you for your purchase</p>

            {lastOrder && (
              <div className="mt-6 glass rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-medium">{lastOrder.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-mono font-bold">${lastOrder.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">{deliveryDate}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-8">
              <Link to="/orders" className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Package size={18} /> View Orders
              </Link>
              <Link to="/drones" className="w-full py-3 rounded-full glass font-semibold hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
                Continue Shopping <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
};

export default PaymentSuccess;

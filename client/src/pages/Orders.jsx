import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import GlassCard from '@/components/GlassCard';
import { Package, ArrowRight } from 'lucide-react';

const Orders = () => {
  const { orders, fetchOrders } = useOrderStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) fetchOrders(user.id);
  }, [user?.id]);

  if (orders.length === 0) {
    return (
      <div className="pt-28 pb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="text-6xl mb-6">📦</div>
          <h1 className="font-display font-bold text-3xl">No orders yet</h1>
          <p className="text-muted-foreground mt-2">Start shopping to see your orders here.</p>
          <Link to="/drones" className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
            Shop Drones <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display font-bold text-4xl mb-8">Order History</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <GlassCard key={order.id} className="p-6" hover={false}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono font-bold text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.createdAt || order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold capitalize">{order.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {order.items?.map(item => {
                  const product = item.product || item;
                  return (
                    <div key={item.id} className="flex items-center gap-2 glass rounded-lg p-2">
                      <img src={product.images?.[0] || product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <p className="text-xs font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{order.items?.length} item(s)</span>
                <span className="font-mono font-bold">${(order.totalAmount || order.total)?.toLocaleString()}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

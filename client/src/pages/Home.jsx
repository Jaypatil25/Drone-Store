import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Shield, Wrench, Globe, Mail, Users, Package, Star, Zap } from 'lucide-react';
import { drones, reviews } from '@/data/drones';
import DroneCard from '@/components/DroneCard';
import GlassCard from '@/components/GlassCard';
import CountdownTimer from '@/components/CountdownTimer';
import RatingStars from '@/components/RatingStars';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Home = () => {
  const featured = drones.filter(d => d.isFeatured).slice(0, 6);
  const bestsellers = drones.filter(d => d.isBestseller).slice(0, 8);
  const dealEnd = new Date(Date.now() + 3 * 86400000 + 7 * 3600000).toISOString();

  return (
    <div className="relative">
      
      <section className="min-h-screen flex items-center pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight">
                The Future<br />of <span className="text-gradient">Flight</span><br />is Now
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Premium DJI drones. Next-day delivery. Pilot-grade specs. Join 50,000+ pilots who trust DroniX.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/drones"
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Shop Drones <ArrowRight size={18} />
                </Link>
                <button className="px-8 py-3 rounded-full glass font-semibold hover:bg-foreground/5 transition-colors">
                  Watch Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="animate-float relative">
                <img
                  src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600"
                  alt="DJI Mavic drone floating"
                  className="w-full max-w-md rounded-3xl shadow-2xl"
                />
                <div className="absolute -inset-4 rounded-3xl bg-primary/5 -z-10 blur-xl" />
              </div>
            </motion.div>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { icon: Users, label: 'Happy Pilots', value: '50,000+' },
              { icon: Package, label: 'Drones', value: '200+' },
              { icon: Star, label: 'Rating', value: '4.9' },
              { icon: Zap, label: 'Delivery', value: 'Next Day' },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-4 text-center" hover={false}>
                <stat.icon size={22} className="text-primary mx-auto mb-2" />
                <div className="font-display font-bold text-2xl text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-6 glass overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {['DJI', 'Autel Robotics', 'Parrot', 'Skydio', 'Holy Stone', 'Potensic', 'Ryze', 'Hubsan', 'FIMI', 'Walkera',
            'DJI', 'Autel Robotics', 'Parrot', 'Skydio', 'Holy Stone', 'Potensic', 'Ryze', 'Hubsan', 'FIMI', 'Walkera'
          ].map((brand, i) => (
            <span key={i} className="text-muted-foreground/40 font-display font-bold text-xl tracking-wider">{brand}</span>
          ))}
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl">
              <span className="text-gradient">Most Wanted</span>
            </h2>
            <p className="text-muted-foreground mt-2">The drones everyone's talking about</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((drone, i) => (
              <DroneCard key={drone.id} drone={drone} index={i} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-12">Top Picks This Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((drone, i) => (
              <DroneCard key={drone.id} drone={drone} index={i} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-12">Why DroniX?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Rocket, title: 'Same Day Dispatch', desc: 'Order before 2pm for same-day shipping' },
              { icon: Shield, title: '2 Year Warranty', desc: 'Full coverage on all products' },
              { icon: Wrench, title: 'Free Setup Support', desc: 'Get flying with expert help' },
              { icon: Globe, title: 'Ships Worldwide', desc: 'Free shipping on orders over $500' },
            ].map((item, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlassCard className="p-8 md:p-12" hover={false}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl">Compare Before You Buy</h2>
                <p className="text-muted-foreground mt-3">Put up to 3 drones side-by-side and find your perfect match.</p>
                <Link
                  to="/compare"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Comparing <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex gap-4 justify-center">
                {drones.slice(0, 2).map(d => (
                  <div key={d.id} className="glass-card rounded-xl p-4 w-40">
                    <img src={d.images[0]} alt={d.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                    <p className="text-sm font-semibold line-clamp-1">{d.name}</p>
                    <p className="text-xs font-mono text-primary">${d.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlassCard className="p-8 md:p-12 border-2 border-primary/20" hover={false}>
            <div className="text-center">
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold">🔥 FLASH SALE</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-4">Up to 40% off DJI Series</h2>
              <p className="text-muted-foreground mt-2">Limited time offer. Don't miss out.</p>
              <div className="flex justify-center mt-6">
                <CountdownTimer targetDate={dealEnd} />
              </div>
              <Link
                to="/drones"
                className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Shop the Sale <ArrowRight size={18} />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-center mb-12">From the Pilot Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <GlassCard key={rev.id} className="p-6">
                <div className="text-3xl text-primary/20 font-serif mb-2">"</div>
                <p className="text-sm text-muted-foreground">{rev.text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {rev.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{rev.name}</p>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={rev.rating} size={10} />
                      <span className="text-xs text-muted-foreground">• {rev.drone}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlassCard className="p-8 md:p-12 text-center" hover={false}>
            <Mail className="mx-auto text-primary mb-4" size={40} />
            <h2 className="font-display font-bold text-3xl">Join the DroniX Crew</h2>
            <p className="text-muted-foreground mt-2 mb-6">Get exclusive deals and new drone drops straight to your inbox.</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full glass border-none outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => toast.success('Welcome to the crew! 🚁')}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">10,000+ pilots already subscribed</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Home;

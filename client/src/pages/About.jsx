import GlassCard from '@/components/GlassCard';
import { Plane, Users, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display font-extrabold text-5xl md:text-6xl">
            About <span className="text-gradient">DroniX</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We're on a mission to make premium drone technology accessible to every pilot — from first-timers to professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Plane, title: 'Our Mission', desc: 'To democratize aerial technology. We curate only the best drones from trusted brands, ensuring every pilot gets a premium experience at fair prices.' },
            { icon: Users, title: 'Our Community', desc: '50,000+ pilots trust DroniX for their aerial needs. From hobbyists to Hollywood filmmakers, our community spans the globe.' },
            { icon: Target, title: 'Our Promise', desc: 'Every drone we sell comes with a 2-year warranty, free setup support, and next-day delivery. No compromises.' },
            { icon: Heart, title: 'Our Values', desc: 'Innovation, quality, and customer obsession drive everything we do. We don\'t just sell drones — we enable dreams of flight.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="p-8 md:p-12 text-center" hover={false}>
          <h2 className="font-display font-bold text-3xl">Built by Pilots, for Pilots</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            DroniX was founded in 2024 by a team of drone enthusiasts who were tired of confusing product specs, hidden fees, and poor customer support.
            We built the store we always wanted — beautiful, honest, and obsessively focused on the flying experience.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            {[
              { value: '2024', label: 'Founded' },
              { value: '50K+', label: 'Pilots' },
              { value: '15+', label: 'Brands' },
              { value: '4.9★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default About;

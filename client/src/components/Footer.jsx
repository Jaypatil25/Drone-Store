import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass mt-20 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-3">
              <span className="text-primary">Droni</span>X
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium drones for every pilot. Next-day delivery, 2-year warranty.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'YouTube'].map(s => (
                <span key={s} className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/drones" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Drones</Link>
              <Link to="/drones?category=Camera" className="text-sm text-muted-foreground hover:text-primary transition-colors">Camera Drones</Link>
              <Link to="/drones?category=FPV" className="text-sm text-muted-foreground hover:text-primary transition-colors">FPV Drones</Link>
              <Link to="/drones?category=Mini" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mini Drones</Link>
              <Link to="/drones?category=Beginner" className="text-sm text-muted-foreground hover:text-primary transition-colors">Beginner Kits</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <span className="text-sm text-muted-foreground">Contact</span>
              <span className="text-sm text-muted-foreground">Shipping</span>
              <span className="text-sm text-muted-foreground">Returns</span>
              <span className="text-sm text-muted-foreground">FAQ</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get updates on new drones and deals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-full text-sm glass border-none outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2025 DroniX. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">Privacy</span>
            <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">Terms</span>
            <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

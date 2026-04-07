import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-6"
        >
          🚁
        </motion.div>
        <h1 className="font-display font-extrabold text-6xl md:text-8xl text-gradient">404</h1>
        <p className="font-display font-bold text-xl mt-4">Lost in the Sky</p>
        <p className="text-muted-foreground mt-2">The page you're looking for has flown away.</p>
        <Link
          to="/"
          className="mt-8 inline-flex px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import { Star } from 'lucide-react';

const RatingStars = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  );
};

export default RatingStars;

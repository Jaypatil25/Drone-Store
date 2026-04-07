const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;

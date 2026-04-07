const OrbBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-drift opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, hsl(220, 100%, 50%), transparent 70%)',
          top: '-10%',
          right: '-5%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-drift opacity-[0.10]"
        style={{
          background: 'radial-gradient(circle, hsl(159, 100%, 48%), transparent 70%)',
          bottom: '10%',
          left: '-10%',
          animationDelay: '-5s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-drift opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, hsl(330, 100%, 62%), transparent 70%)',
          top: '40%',
          left: '50%',
          animationDelay: '-10s',
        }}
      />
    </div>
  );
};

export default OrbBackground;

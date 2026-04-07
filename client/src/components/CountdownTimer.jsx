import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const blocks = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins', value: time.mins },
    { label: 'Secs', value: time.secs },
  ];

  return (
    <div className="flex gap-3">
      {blocks.map(b => (
        <div key={b.label} className="glass-card rounded-xl p-3 text-center min-w-[60px]">
          <div className="font-mono text-2xl font-bold text-primary">{String(b.value).padStart(2, '0')}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{b.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

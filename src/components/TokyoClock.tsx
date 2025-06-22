
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TokyoClock = () => {
  const [tokyoTime, setTokyoTime] = useState('');
  const [tokyoDate, setTokyoDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for Tokyo timezone
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      
      // Format date for Tokyo timezone
      const dateString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      
      setTokyoTime(timeString);
      setTokyoDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="feature-card">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-neon-blue" />
          <span className="text-sm font-rajdhani text-muted-grey">TOKYO TIME</span>
        </div>
        <div className="font-rajdhani text-3xl font-bold text-white neon-glow mb-1">
          {tokyoTime}
        </div>
        <div className="text-xs text-muted-grey">
          {tokyoDate}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokyoClock;

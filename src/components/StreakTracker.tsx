
import React from 'react';
import { Calendar, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StreakTracker = () => {
  // Placeholder data - this would come from user state
  const currentStreak = 7;
  const longestStreak = 15;

  return (
    <Card className="feature-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-vapor-orange" />
            <span className="font-rajdhani font-semibold text-white">Streak</span>
          </div>
          <Badge className="bg-vapor-orange/20 text-vapor-orange border-vapor-orange/30">
            <Calendar className="w-3 h-3 mr-1" />
            {currentStreak} days
          </Badge>
        </div>
        <div className="mt-2 text-xs text-muted-grey">
          Longest: {longestStreak} days
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;

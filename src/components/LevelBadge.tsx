
import React from 'react';
import { Award, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const LevelBadge = () => {
  // Placeholder data - this would come from user state
  const currentLevel = 4;
  const currentXP = 2750;
  const xpToNextLevel = 5000;
  const levelTitle = "JR Line Conductor";
  const levelEmoji = "🚆";
  
  const progressPercentage = (currentXP / xpToNextLevel) * 100;

  return (
    <Card className="feature-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neon-gradient neon-glow flex items-center justify-center text-3xl">
            {levelEmoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 font-rajdhani">
                <Award className="w-3 h-3 mr-1" />
                Level {currentLevel}
              </Badge>
              <h2 className="font-rajdhani text-xl font-bold text-white">
                {levelTitle}
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-grey">XP Progress</span>
                <span className="text-off-white font-medium">
                  {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="level-progress h-3"
              />
              <div className="flex items-center gap-1 text-xs text-vapor-orange">
                <Zap className="w-3 h-3" />
                <span>{(xpToNextLevel - currentXP).toLocaleString()} XP to next level</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelBadge;

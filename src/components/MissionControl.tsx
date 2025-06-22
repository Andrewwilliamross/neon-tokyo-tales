
import React from 'react';
import { Clock, Zap, Target, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LevelBadge from './LevelBadge';
import TokyoClock from './TokyoClock';
import StreakTracker from './StreakTracker';

const MissionControl = () => {
  // Placeholder data
  const promptOfTheDay = {
    title: "Neon Hunter",
    description: "Capture 3 unique neon signs in different districts of Tokyo. Document the story behind each sign.",
    xpReward: 150,
    timeLeft: "18:45:30"
  };

  const recentActivities = [
    {
      id: 1,
      title: "Morning Ramen Discovery",
      location: "Shibuya",
      timeAgo: "2 hours ago",
      xpEarned: 85
    },
    {
      id: 2,
      title: "Temple Visit Documentation",
      location: "Asakusa",
      timeAgo: "1 day ago",
      xpEarned: 120
    },
    {
      id: 3,
      title: "Street Art Photography",
      location: "Harajuku",
      timeAgo: "2 days ago",
      xpEarned: 95
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Row - Level Badge, Streak Tracker, and Tokyo Clock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <LevelBadge />
          </div>
          <div className="space-y-4">
            <StreakTracker />
            <TokyoClock />
          </div>
        </div>

        {/* Main Action Button */}
        <div className="text-center">
          <Button 
            className="run-button bg-neon-gradient hover:opacity-90 text-white font-rajdhani text-xl px-8 py-6 h-auto neon-glow"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-2" />
            Draft New Entry
          </Button>
        </div>

        {/* Missions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Prompt of the Day */}
          <Card className="feature-card mission-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vaporwave-teal font-rajdhani">
                <Target className="w-6 h-6" />
                Prompt of the Day
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-rajdhani text-2xl font-bold text-white mb-2 neon-glow">
                  {promptOfTheDay.title}
                </h3>
                <p className="text-off-white mb-4">
                  {promptOfTheDay.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="xp-badge">
                    <Zap className="w-4 h-4 mr-1" />
                    +{promptOfTheDay.xpReward} XP
                  </Badge>
                  <div className="flex items-center gap-2 text-vapor-orange">
                    <Clock className="w-4 h-4" />
                    <span className="font-rajdhani font-medium">{promptOfTheDay.timeLeft}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-vaporwave-teal hover:bg-vaporwave-teal/80 text-cyber-dark font-rajdhani font-semibold">
                Complete Prompt
              </Button>
            </CardContent>
          </Card>

          {/* Side Quests Placeholder */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neon-blue font-rajdhani">
                <Target className="w-6 h-6" />
                Side Quests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-muted-grey">AI-generated missions coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="feature-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neon-pink font-rajdhani">
              <TrendingUp className="w-6 h-6" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id}
                  className="feature-card p-4 hover:border-neon-pink/50 transition-all duration-300 cursor-pointer tokyo-shimmer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-rajdhani font-semibold text-white">{activity.title}</h4>
                      <p className="text-sm text-muted-grey">{activity.location} • {activity.timeAgo}</p>
                    </div>
                    <Badge className="xp-badge">
                      +{activity.xpEarned} XP
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MissionControl;

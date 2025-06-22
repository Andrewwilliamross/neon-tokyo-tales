
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Zap, 
  Star, 
  Camera, 
  Target,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';

const Index = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [userLevel] = useState(7);
  const [currentXP] = useState(2340);
  const [xpToNextLevel] = useState(2500);
  const [streak] = useState(12);

  useEffect(() => {
    const updateTime = () => {
      const tokyo = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(tokyo);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (currentXP / xpToNextLevel) * 100;

  const dailyPrompt = {
    title: "Street Food Safari",
    description: "Discover and document 3 unique street food vendors in Shibuya. Rate each dish and capture the vendor's story.",
    xpReward: 150,
    difficulty: "Medium"
  };

  const sideQuests = [
    {
      id: 1,
      title: "Neon Hunter",
      description: "Capture 5 different neon signs at night",
      xpReward: 75,
      progress: 3,
      total: 5
    },
    {
      id: 2,
      title: "Temple Seeker",
      description: "Visit and document 2 traditional temples",
      xpReward: 100,
      progress: 0,
      total: 2
    },
    {
      id: 3,
      title: "Local Connect",
      description: "Have a conversation with a local resident",
      xpReward: 125,
      progress: 0,
      total: 1
    }
  ];

  const recentEntries = [
    {
      id: 1,
      title: "Sunrise at Sensoji Temple",
      location: "Asakusa, Tokyo",
      image: "photo-1470813740244-df37b8c1edcb",
      xpEarned: 85,
      tags: ["Temple", "Morning", "Peaceful"]
    },
    {
      id: 2,
      title: "Robot Restaurant Experience",
      location: "Shinjuku, Tokyo",
      image: "photo-1605810230434-7631ac76ec81",
      xpEarned: 120,
      tags: ["Entertainment", "Robots", "Crazy"]
    },
    {
      id: 3,
      title: "Tsukiji Fish Market",
      location: "Tsukiji, Tokyo",
      image: "photo-1618160702438-9b02ab6515c9",
      xpEarned: 95,
      tags: ["Food", "Market", "Fresh"]
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="cyber-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-vaporwave-gradient neon-glow flex items-center justify-center">
                <span className="text-2xl font-rajdhani font-bold text-white">CY</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-rajdhani font-bold text-neon-pink">
                  Cyber Yamazaki
                </h1>
                <p className="text-muted-foreground">Tokyo Digital Nomad</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                    Level {userLevel}
                  </Badge>
                  <Badge className="bg-vaporwave-teal/20 text-vaporwave-teal border-vaporwave-teal/30">
                    <Calendar className="w-3 h-3 mr-1" />
                    {streak} day streak
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-neon-blue">
                <Clock className="w-5 h-5" />
                <span className="font-rajdhani text-xl">{currentTime}</span>
                <span className="text-sm text-muted-foreground">JST</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">XP Progress</div>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercentage} className="w-32 level-progress" />
                  <span className="text-sm font-medium">{currentXP}/{xpToNextLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-gradient hover:opacity-90 text-white font-rajdhani text-lg px-8 py-6 h-auto neon-glow animate-float"
          >
            <Camera className="w-6 h-6 mr-2" />
            Create New Entry
          </Button>
        </div>

        {/* Daily Mission & Side Quests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Daily Mission */}
          <Card className="mission-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vaporwave-teal">
                <Target className="w-5 h-5" />
                Daily Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-rajdhani text-xl font-semibold text-foreground mb-2">
                  {dailyPrompt.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {dailyPrompt.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="xp-badge">
                    <Zap className="w-3 h-3 mr-1" />
                    +{dailyPrompt.xpReward} XP
                  </Badge>
                  <Badge variant="outline" className="border-vaporwave-teal/30 text-vaporwave-teal">
                    {dailyPrompt.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Quests */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neon-blue">
                <Star className="w-5 h-5" />
                Side Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sideQuests.map((quest) => (
                <div key={quest.id} className="p-3 rounded border border-border hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{quest.title}</h4>
                    <Badge className="xp-badge text-xs">+{quest.xpReward}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(quest.progress / quest.total) * 100} 
                      className="flex-1 h-2 level-progress" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neon-pink">
              <TrendingUp className="w-5 h-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="entry-card p-4">
                  <div className="aspect-video bg-cyber-dark-blue rounded mb-3 overflow-hidden tokyo-shimmer">
                    <img 
                      src={`https://images.unsplash.com/${entry.image}?w=400&h=300&fit=crop`}
                      alt={entry.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-rajdhani font-semibold text-foreground mb-1">{entry.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {entry.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-border text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Badge className="xp-badge text-xs">
                      +{entry.xpEarned} XP
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cyber-card text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 mx-auto mb-2 text-neon-pink" />
              <div className="text-2xl font-rajdhani font-bold text-foreground">47</div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-card text-center">
            <CardContent className="pt-6">
              <Camera className="w-8 h-8 mx-auto mb-2 text-vaporwave-teal" />
              <div className="text-2xl font-rajdhani font-bold text-foreground">203</div>
              <div className="text-sm text-muted-foreground">Photos</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-card text-center">
            <CardContent className="pt-6">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-neon-blue" />
              <div className="text-2xl font-rajdhani font-bold text-foreground">23</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-card text-center">
            <CardContent className="pt-6">
              <Zap className="w-8 h-8 mx-auto mb-2 text-neon-green" />
              <div className="text-2xl font-rajdhani font-bold text-foreground">{currentXP}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

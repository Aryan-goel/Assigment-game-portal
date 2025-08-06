import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGameContext } from '@/contexts/GameContext';
import { GameCard } from '@/components/ui/game-card';
import { GameButton } from '@/components/ui/game-button';
import { toast } from '@/hooks/use-toast';
import { Gamepad2, Clock, Trophy, LogOut, User, History, Zap, Brain, Gift, Star, Target, Heart, Shield, Sword } from 'lucide-react';

const games = [
  {
    slug: 'tap-counter',
    name: 'Tap Counter',
    description: 'Tap as many times as you can in 10 seconds!',
    icon: Zap,
    tag: 'Quick Play',
    color: 'from-primary to-primary-glow',
  },
  {
    slug: 'memory-clicker',
    name: 'Memory Clicker',
    description: 'Remember and repeat the sequence!',
    icon: Brain,
    tag: 'Memory',
    color: 'from-secondary to-purple-400',
  },
  {
    slug: 'lucky-box',
    name: 'Lucky Box',
    description: 'Pick a box and discover your prize!',
    icon: Gift,
    tag: 'Luck',
    color: 'from-accent to-green-400',
  },
];

const Games = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getGameStats } = useGameContext();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const stats = getGameStats();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gaming icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top row */}
        <div className="absolute top-[8%] left-[12%] text-white/20">
          <Zap className="w-8 h-8" />
        </div>
        <div className="absolute top-[8%] left-[35%] text-white/15">
          <Brain className="w-6 h-6" />
        </div>
        <div className="absolute top-[8%] left-[58%] text-white/25">
          <Gift className="w-8 h-8" />
        </div>
        <div className="absolute top-[8%] left-[82%] text-white/20">
          <Trophy className="w-6 h-6" />
        </div>
        
        {/* Second row */}
        <div className="absolute top-[22%] left-[8%] text-white/15">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-[22%] left-[28%] text-white/20">
          <Target className="w-8 h-8" />
        </div>
        <div className="absolute top-[22%] left-[48%] text-white/15">
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute top-[22%] left-[68%] text-white/25">
          <Shield className="w-8 h-8" />
        </div>
        <div className="absolute top-[22%] left-[88%] text-white/20">
          <Sword className="w-6 h-6" />
        </div>
        
        {/* Third row */}
        <div className="absolute top-[36%] left-[15%] text-white/20">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <div className="absolute top-[36%] left-[38%] text-white/15">
          <Zap className="w-6 h-6" />
        </div>
        <div className="absolute top-[36%] left-[62%] text-white/25">
          <Brain className="w-8 h-8" />
        </div>
        <div className="absolute top-[36%] left-[85%] text-white/20">
          <Gift className="w-6 h-6" />
        </div>
        
        {/* Fourth row */}
        <div className="absolute top-[50%] left-[5%] text-white/15">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="absolute top-[50%] left-[25%] text-white/20">
          <Star className="w-8 h-8" />
        </div>
        <div className="absolute top-[50%] left-[45%] text-white/15">
          <Target className="w-6 h-6" />
        </div>
        <div className="absolute top-[50%] left-[65%] text-white/25">
          <Heart className="w-8 h-8" />
        </div>
        <div className="absolute top-[50%] left-[85%] text-white/20">
          <Shield className="w-6 h-6" />
        </div>
        
        {/* Fifth row */}
        <div className="absolute top-[64%] left-[12%] text-white/20">
          <Sword className="w-8 h-8" />
        </div>
        <div className="absolute top-[64%] left-[35%] text-white/15">
          <Gamepad2 className="w-6 h-6" />
        </div>
        <div className="absolute top-[64%] left-[58%] text-white/25">
          <Zap className="w-8 h-8" />
        </div>
        <div className="absolute top-[64%] left-[82%] text-white/20">
          <Brain className="w-6 h-6" />
        </div>
        
        {/* Sixth row */}
        <div className="absolute top-[78%] left-[8%] text-white/15">
          <Gift className="w-6 h-6" />
        </div>
        <div className="absolute top-[78%] left-[28%] text-white/20">
          <Trophy className="w-8 h-8" />
        </div>
        <div className="absolute top-[78%] left-[48%] text-white/15">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-[78%] left-[68%] text-white/25">
          <Target className="w-8 h-8" />
        </div>
        <div className="absolute top-[78%] left-[88%] text-white/20">
          <Heart className="w-6 h-6" />
        </div>
        
        {/* Bottom row */}
        <div className="absolute top-[92%] left-[15%] text-white/20">
          <Shield className="w-8 h-8" />
        </div>
        <div className="absolute top-[92%] left-[38%] text-white/15">
          <Sword className="w-6 h-6" />
        </div>
        <div className="absolute top-[92%] left-[62%] text-white/25">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <div className="absolute top-[92%] left-[85%] text-white/20">
          <Zap className="w-6 h-6" />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Gamepad2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Game Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome, {user?.username}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GameButton
                variant="ghost"
                size="sm"
                onClick={() => navigate('/history')}
                className="hidden sm:flex"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </GameButton>
              <GameButton
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </GameButton>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <GameCard className="p-4 text-center">
            <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.totalGames}</div>
            <div className="text-sm text-muted-foreground">Games Played</div>
          </GameCard>
          <GameCard className="p-4 text-center">
            <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.bestScore}</div>
            <div className="text-sm text-muted-foreground">Best Score</div>
          </GameCard>
          <GameCard className="p-4 text-center col-span-2 sm:col-span-1">
            <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.recentGames.length}</div>
            <div className="text-sm text-muted-foreground">Recent Games</div>
          </GameCard>
        </div>

        {/* Orientation Notice */}
        {orientation === 'landscape' && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-warning text-sm text-center">
              📱 Some games work better in portrait mode. Feel free to rotate your device!
            </p>
          </div>
        )}

        {/* Games Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Available Games</h2>
            <GameButton
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              className="sm:hidden"
            >
              <History className="w-4 h-4" />
            </GameButton>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <GameCard key={game.slug} className="group cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center shadow-game group-hover:shadow-glow transition-all duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg">{game.name}</h3>
                        <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          {game.tag}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {game.description}
                    </p>
                    
                    <GameButton
                      variant="game"
                      size="lg"
                      className="w-full"
                      onClick={() => navigate(`/games/${game.slug}`)}
                    >
                      Play Now
                    </GameButton>
                  </div>
                </GameCard>
              );
            })}
          </div>
        </div>

        {/* Recent Games */}
        {stats.recentGames.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {stats.recentGames.slice(0, 3).map((game) => (
                <GameCard key={game.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{game.gameName}</h4>
                      <p className="text-sm text-muted-foreground">{game.result}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{game.score}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(game.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </GameCard>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Games;
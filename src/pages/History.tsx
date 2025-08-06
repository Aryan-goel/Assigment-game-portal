import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGameContext } from '@/contexts/GameContext';
import { GameCard } from '@/components/ui/game-card';
import { GameButton } from '@/components/ui/game-button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, History as HistoryIcon, Trophy, Calendar, Filter, Trash2, Gamepad2 } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { gameHistory, getGameStats, clearHistory } = useGameContext();
  const [filter, setFilter] = useState<string>('all');

  const filteredHistory = filter === 'all' 
    ? gameHistory 
    : gameHistory.filter(game => game.gameSlug === filter);

  const stats = getGameStats();

  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: "History Cleared",
      description: "All game history has been deleted.",
    });
  };

  const getGameIcon = (gameSlug: string) => {
    switch (gameSlug) {
      case 'tap-counter': return '⚡';
      case 'memory-clicker': return '🧠';
      case 'lucky-box': return '🎁';
      default: return '🎮';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <GameButton
              variant="ghost"
              size="icon"
              onClick={() => navigate('/games')}
            >
              <ArrowLeft className="w-5 h-5" />
            </GameButton>
            <div className="flex items-center gap-2">
              <HistoryIcon className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Game History</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <GameCard className="p-4 text-center">
            <Gamepad2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.totalGames}</div>
            <div className="text-sm text-muted-foreground">Total Games</div>
          </GameCard>
          <GameCard className="p-4 text-center">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.bestScore}</div>
            <div className="text-sm text-muted-foreground">Best Score</div>
          </GameCard>
          <GameCard className="p-4 text-center col-span-2 sm:col-span-1">
            <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {gameHistory.length > 0 ? formatDate(gameHistory[0].timestamp).split(',')[0] : 'N/A'}
            </div>
            <div className="text-sm text-muted-foreground">Last Played</div>
          </GameCard>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Games', count: gameHistory.length },
              { key: 'tap-counter', label: 'Tap Counter', count: gameHistory.filter(g => g.gameSlug === 'tap-counter').length },
              { key: 'memory-clicker', label: 'Memory', count: gameHistory.filter(g => g.gameSlug === 'memory-clicker').length },
              { key: 'lucky-box', label: 'Lucky Box', count: gameHistory.filter(g => g.gameSlug === 'lucky-box').length },
            ].map((filterOption) => (
              <GameButton
                key={filterOption.key}
                variant={filter === filterOption.key ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterOption.key)}
                className="whitespace-nowrap"
              >
                {filterOption.label} ({filterOption.count})
              </GameButton>
            ))}
          </div>
        </div>

        {/* Game History List */}
        {filteredHistory.length === 0 ? (
          <GameCard className="p-8 text-center">
            <div className="space-y-4">
              <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Games Played Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {filter === 'all' 
                    ? "Start playing games to see your history here!" 
                    : `No games played for ${filter.replace('-', ' ')} yet.`
                  }
                </p>
                <GameButton
                  variant="primary"
                  onClick={() => navigate('/games')}
                >
                  Play Your First Game
                </GameButton>
              </div>
            </div>
          </GameCard>
        ) : (
          <div className="space-y-4">
            {/* Clear History Button */}
            {gameHistory.length > 0 && (
              <div className="flex justify-end mb-4">
                <GameButton
                  variant="destructive"
                  size="sm"
                  onClick={handleClearHistory}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </GameButton>
              </div>
            )}

            {filteredHistory.map((game) => (
              <GameCard key={game.id} className="p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center text-2xl">
                      {getGameIcon(game.gameSlug)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{game.gameName}</h4>
                      <p className="text-sm text-muted-foreground">{game.result}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(game.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{game.score}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </GameCard>
            ))}

            {/* Load More Button (if needed in future) */}
            {filteredHistory.length > 20 && (
              <div className="text-center pt-4">
                <GameButton variant="outline">
                  Load More Games
                </GameButton>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
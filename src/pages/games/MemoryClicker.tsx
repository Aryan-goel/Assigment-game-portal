import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '@/contexts/GameContext';
import { GameCard } from '@/components/ui/game-card';
import { GameButton } from '@/components/ui/game-button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Brain, Star, Trophy, Zap } from 'lucide-react';

const icons = [
  { id: 1, icon: '🎯', color: 'from-red-500 to-red-600' },
  { id: 2, icon: '🌟', color: 'from-yellow-500 to-yellow-600' },
  { id: 3, icon: '💎', color: 'from-blue-500 to-blue-600' },
  { id: 4, icon: '🔥', color: 'from-orange-500 to-orange-600' },
  { id: 5, icon: '⚡', color: 'from-purple-500 to-purple-600' },
  { id: 6, icon: '🎨', color: 'from-green-500 to-green-600' },
];

const MemoryClicker = () => {
  const navigate = useNavigate();
  const { saveGameResult } = useGameContext();
  const [gameState, setGameState] = useState<'waiting' | 'showing' | 'playing' | 'finished'>('waiting');
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showingIndex, setShowingIndex] = useState(-1);

  const startGame = () => {
    setGameState('showing');
    setSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setScore(0);
    generateNewSequence(1);
  };

  const generateNewSequence = (level: number) => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 6) + 1);
    }
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = async (seq: number[]) => {
    setShowingIndex(-1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (let i = 0; i < seq.length; i++) {
      setShowingIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowingIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setGameState('playing');
  };

  const handleIconClick = (iconId: number) => {
    if (gameState !== 'playing') return;

    const newPlayerSequence = [...playerSequence, iconId];
    setPlayerSequence(newPlayerSequence);

    // Check if the current input is correct
    const currentIndex = newPlayerSequence.length - 1;
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong! Game over
      setGameState('finished');
      saveGameResult({
        gameSlug: 'memory-clicker',
        gameName: 'Memory Clicker',
        score,
        result: `Level ${currentLevel} reached`,
      });
      toast({
        title: "Game Over!",
        description: `You reached level ${currentLevel}`,
        variant: "destructive",
      });
      return;
    }

    // Check if sequence is complete
    if (newPlayerSequence.length === sequence.length) {
      // Level complete!
      const newScore = score + (currentLevel * 10);
      setScore(newScore);
      setCurrentLevel(prev => prev + 1);
      setPlayerSequence([]);
      
      toast({
        title: "Level Complete!",
        description: `Moving to level ${currentLevel + 1}`,
      });
      
      setTimeout(() => {
        setGameState('showing');
        generateNewSequence(currentLevel + 1);
      }, 1000);
    }
  };

  const getIcon = (id: number) => icons.find(icon => icon.id === id);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <GameButton
            variant="ghost"
            size="icon"
            onClick={() => navigate('/games')}
          >
            <ArrowLeft className="w-5 h-5" />
          </GameButton>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold text-foreground">Memory Clicker</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GameCard className="p-4 text-center">
            <Star className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{currentLevel}</div>
            <div className="text-sm text-muted-foreground">Level</div>
          </GameCard>
          <GameCard className="p-4 text-center">
            <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </GameCard>
        </div>

        {/* Game Content */}
        <div className="space-y-6">
          {gameState === 'waiting' && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <Brain className="w-16 h-16 text-secondary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Test Your Memory</h2>
                <p className="text-muted-foreground">
                  Watch the sequence, then repeat it by clicking the icons in the same order!
                </p>
              </div>
              <GameButton
                variant="secondary"
                size="xl"
                onClick={startGame}
                className="w-full animate-pulse-glow"
              >
                Start Game
              </GameButton>
            </GameCard>
          )}

          {(gameState === 'showing' || gameState === 'playing') && (
            <GameCard className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {gameState === 'showing' ? 'Watch the sequence...' : 'Repeat the sequence!'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sequence length: {sequence.length}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {icons.map((iconData, index) => {
                  const isShowing = gameState === 'showing' && showingIndex >= 0 && sequence[showingIndex] === iconData.id;
                  const isClickable = gameState === 'playing';
                  
                  return (
                    <div
                      key={iconData.id}
                      className={`
                        aspect-square rounded-xl bg-gradient-to-br ${iconData.color} 
                        flex items-center justify-center text-3xl cursor-pointer
                        transition-all duration-200 shadow-game
                        ${isShowing ? 'scale-110 shadow-glow animate-pulse-glow' : ''}
                        ${isClickable ? 'hover:scale-105 active:scale-95' : ''}
                        ${!isClickable ? 'cursor-not-allowed opacity-70' : ''}
                      `}
                      onClick={() => handleIconClick(iconData.id)}
                    >
                      {iconData.icon}
                    </div>
                  );
                })}
              </div>

              {gameState === 'playing' && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Progress: {playerSequence.length} / {sequence.length}
                  </p>
                  <div className="w-full bg-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(playerSequence.length / sequence.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </GameCard>
          )}

          {gameState === 'finished' && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <div className="text-6xl">🧠</div>
                <h2 className="text-2xl font-bold text-foreground">Great Memory!</h2>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-secondary">{score}</div>
                  <p className="text-muted-foreground">Final Score</p>
                  <p className="text-lg font-medium text-accent">Level {currentLevel} reached!</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <GameButton
                  variant="secondary"
                  size="lg"
                  onClick={startGame}
                  className="w-full"
                >
                  Play Again
                </GameButton>
                <GameButton
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/games')}
                  className="w-full"
                >
                  Back to Games
                </GameButton>
              </div>
            </GameCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryClicker;
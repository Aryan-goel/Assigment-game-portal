import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '@/contexts/GameContext';
import { GameCard } from '@/components/ui/game-card';
import { GameButton } from '@/components/ui/game-button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Zap, Timer, Target } from 'lucide-react';

const TapCounter = () => {
  const navigate = useNavigate();
  const { saveGameResult } = useGameContext();
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [tapAnimation, setTapAnimation] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setTaps(0);
    setTimeLeft(10);
  };

  const handleTap = useCallback(() => {
    if (gameState === 'playing') {
      setTaps(prev => prev + 1);
      setTapAnimation(true);
      setTimeout(() => setTapAnimation(false), 150);
    }
  }, [gameState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
      
      const result = `${taps} taps in 10 seconds`;
      saveGameResult({
        gameSlug: 'tap-counter',
        gameName: 'Tap Counter',
        score: taps,
        result,
      });

      toast({
        title: "Game Complete!",
        description: result,
      });
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, saveGameResult]);

  const getPerformanceMessage = () => {
    if (taps >= 50) return "🔥 Lightning Fast!";
    if (taps >= 35) return "⚡ Super Quick!";
    if (taps >= 25) return "👍 Good Job!";
    if (taps >= 15) return "👌 Not Bad!";
    return "🐌 Keep Practicing!";
  };

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
            <Zap className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Tap Counter</h1>
          </div>
        </div>

        {/* Game Area */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <GameCard className="p-4 text-center">
              <Target className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{taps}</div>
              <div className="text-sm text-muted-foreground">Taps</div>
            </GameCard>
            <GameCard className="p-4 text-center">
              <Timer className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{timeLeft}</div>
              <div className="text-sm text-muted-foreground">Seconds</div>
            </GameCard>
          </div>

          {/* Game Content */}
          {gameState === 'waiting' && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <Zap className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Ready to Tap?</h2>
                <p className="text-muted-foreground">
                  Tap the button as many times as you can in 10 seconds!
                </p>
              </div>
              <GameButton
                variant="primary"
                size="xl"
                onClick={startGame}
                className="w-full animate-pulse-glow"
              >
                Start Game
              </GameButton>
            </GameCard>
          )}

          {gameState === 'playing' && (
            <GameCard className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Tap Fast!</h2>
                <div className="text-6xl font-bold text-primary">{taps}</div>
              </div>
              
              <div 
                className={`w-full h-32 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center cursor-pointer select-none transition-transform duration-150 ${
                  tapAnimation ? 'animate-tap-effect' : 'hover:scale-105'
                } active:scale-95`}
                onClick={handleTap}
                onTouchStart={handleTap}
              >
                <Zap className="w-12 h-12 text-primary-foreground" />
              </div>
              
              <p className="text-muted-foreground">Tap the button above!</p>
            </GameCard>
          )}

          {gameState === 'finished' && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <div className="text-6xl">🎉</div>
                <h2 className="text-2xl font-bold text-foreground">Game Over!</h2>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">{taps}</div>
                  <p className="text-muted-foreground">taps in 10 seconds</p>
                  <p className="text-lg font-medium text-accent">{getPerformanceMessage()}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <GameButton
                  variant="primary"
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

export default TapCounter;
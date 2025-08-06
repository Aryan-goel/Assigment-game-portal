import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '@/contexts/GameContext';
import { GameCard } from '@/components/ui/game-card';
import { GameButton } from '@/components/ui/game-button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Gift, Star, Trophy } from 'lucide-react';

const prizes = [
  { emoji: '💎', name: 'Diamond', points: 100, rarity: 'Legendary' },
  { emoji: '👑', name: 'Crown', points: 80, rarity: 'Epic' },
  { emoji: '🏆', name: 'Trophy', points: 60, rarity: 'Rare' },
  { emoji: '💰', name: 'Gold Coins', points: 40, rarity: 'Uncommon' },
  { emoji: '🎁', name: 'Gift Box', points: 30, rarity: 'Common' },
  { emoji: '⭐', name: 'Star', points: 20, rarity: 'Common' },
  { emoji: '🍀', name: 'Lucky Clover', points: 15, rarity: 'Common' },
  { emoji: '🎈', name: 'Balloon', points: 10, rarity: 'Common' },
];

const LuckyBox = () => {
  const navigate = useNavigate();
  const { saveGameResult } = useGameContext();
  const [gameState, setGameState] = useState<'waiting' | 'selecting' | 'revealing' | 'finished'>('waiting');
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [revealedPrize, setRevealedPrize] = useState<typeof prizes[0] | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [animatingBoxes, setAnimatingBoxes] = useState<boolean[]>([false, false, false]);

  const startGame = () => {
    setGameState('selecting');
    setSelectedBox(null);
    setRevealedPrize(null);
    setAnimatingBoxes([false, false, false]);
  };

  const selectBox = async (boxIndex: number) => {
    if (gameState !== 'selecting') return;
    
    setSelectedBox(boxIndex);
    setGameState('revealing');
    
    // Animate all boxes
    setAnimatingBoxes([true, true, true]);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Stop animation and reveal prize
    setAnimatingBoxes([false, false, false]);
    
    // Determine prize based on probability
    const randomValue = Math.random();
    let selectedPrize;
    
    if (randomValue < 0.05) {
      selectedPrize = prizes[0]; // Diamond - 5%
    } else if (randomValue < 0.15) {
      selectedPrize = prizes[1]; // Crown - 10%
    } else if (randomValue < 0.3) {
      selectedPrize = prizes[2]; // Trophy - 15%
    } else if (randomValue < 0.5) {
      selectedPrize = prizes[3]; // Gold Coins - 20%
    } else if (randomValue < 0.7) {
      selectedPrize = prizes[4]; // Gift Box - 20%
    } else if (randomValue < 0.85) {
      selectedPrize = prizes[5]; // Star - 15%
    } else if (randomValue < 0.95) {
      selectedPrize = prizes[6]; // Lucky Clover - 10%
    } else {
      selectedPrize = prizes[7]; // Balloon - 5%
    }
    
    setRevealedPrize(selectedPrize);
    setTotalScore(prev => prev + selectedPrize.points);
    setGamesPlayed(prev => prev + 1);
    setGameState('finished');
    
    const result = `Found ${selectedPrize.name} (${selectedPrize.rarity})`;
    saveGameResult({
      gameSlug: 'lucky-box',
      gameName: 'Lucky Box',
      score: selectedPrize.points,
      result,
    });

    toast({
      title: "Prize Revealed!",
      description: `You found a ${selectedPrize.name}! +${selectedPrize.points} points`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400';
      case 'Epic': return 'text-purple-400';
      case 'Rare': return 'text-blue-400';
      case 'Uncommon': return 'text-green-400';
      default: return 'text-gray-400';
    }
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
            <Gift className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold text-foreground">Lucky Box</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GameCard className="p-4 text-center">
            <Star className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{gamesPlayed}</div>
            <div className="text-sm text-muted-foreground">Boxes Opened</div>
          </GameCard>
          <GameCard className="p-4 text-center">
            <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{totalScore}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </GameCard>
        </div>

        {/* Game Content */}
        <div className="space-y-6">
          {gameState === 'waiting' && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <Gift className="w-16 h-16 text-accent mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Try Your Luck!</h2>
                <p className="text-muted-foreground">
                  Choose one of three mystery boxes. Each contains a different prize!
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>🎁 Common prizes: 10-30 points</p>
                  <p>🏆 Rare prizes: 40-60 points</p>
                  <p>💎 Legendary prizes: 80-100 points</p>
                </div>
              </div>
              <GameButton
                variant="accent"
                size="xl"
                onClick={startGame}
                className="w-full animate-pulse-glow"
              >
                Start Game
              </GameButton>
            </GameCard>
          )}

          {(gameState === 'selecting' || gameState === 'revealing') && (
            <GameCard className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {gameState === 'selecting' ? 'Choose your box!' : 'Opening...'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {gameState === 'selecting' ? 'Tap on one of the boxes below' : 'Finding your prize...'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((boxIndex) => {
                  const isSelected = selectedBox === boxIndex;
                  const isAnimating = animatingBoxes[boxIndex];
                  
                  return (
                    <div
                      key={boxIndex}
                      className={`
                        aspect-square rounded-xl bg-gradient-accent
                        flex items-center justify-center text-4xl cursor-pointer
                        transition-all duration-300 shadow-game
                        ${isSelected ? 'ring-4 ring-accent-glow' : ''}
                        ${isAnimating ? 'animate-bounce' : ''}
                        ${gameState === 'selecting' ? 'hover:scale-105 active:scale-95' : 'cursor-not-allowed'}
                      `}
                      onClick={() => selectBox(boxIndex)}
                    >
                      🎁
                    </div>
                  );
                })}
              </div>
              
              {gameState === 'revealing' && (
                <div className="text-center">
                  <div className="animate-pulse text-accent">
                    <Gift className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Revealing your prize...</p>
                  </div>
                </div>
              )}
            </GameCard>
          )}

          {gameState === 'finished' && revealedPrize && (
            <GameCard className="p-8 text-center space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <div className="text-8xl animate-game-win">{revealedPrize.emoji}</div>
                <h2 className="text-2xl font-bold text-foreground">You found a {revealedPrize.name}!</h2>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">+{revealedPrize.points}</div>
                  <p className="text-muted-foreground">Points</p>
                  <p className={`text-lg font-medium ${getRarityColor(revealedPrize.rarity)}`}>
                    {revealedPrize.rarity} Prize
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <GameButton
                  variant="accent"
                  size="lg"
                  onClick={startGame}
                  className="w-full"
                >
                  Try Another Box
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

export default LuckyBox;
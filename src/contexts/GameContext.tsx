import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface GameResult {
  id: string;
  gameSlug: string;
  gameName: string;
  score: number;
  result: string;
  timestamp: number;
  userId: string;
}

interface GameContextType {
  gameHistory: GameResult[];
  saveGameResult: (result: Omit<GameResult, 'id' | 'timestamp' | 'userId'>) => void;
  getGameStats: (gameSlug?: string) => {
    totalGames: number;
    bestScore: number;
    recentGames: GameResult[];
  };
  clearHistory: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

  useEffect(() => {
    if (user) {
      // Load game history for current user
      const allHistory = JSON.parse(localStorage.getItem('gamePortalHistory') || '[]');
      const userHistory = allHistory.filter((game: GameResult) => game.userId === user.id);
      setGameHistory(userHistory);
    } else {
      setGameHistory([]);
    }
  }, [user]);

  const saveGameResult = (result: Omit<GameResult, 'id' | 'timestamp' | 'userId'>) => {
    if (!user) return;

    const newResult: GameResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: Date.now(),
      userId: user.id,
    };

    // Update local state
    const updatedHistory = [newResult, ...gameHistory];
    setGameHistory(updatedHistory);

    // Save to localStorage
    const allHistory = JSON.parse(localStorage.getItem('gamePortalHistory') || '[]');
    const otherUsersHistory = allHistory.filter((game: GameResult) => game.userId !== user.id);
    const newAllHistory = [...otherUsersHistory, ...updatedHistory];
    localStorage.setItem('gamePortalHistory', JSON.stringify(newAllHistory));
  };

  const getGameStats = (gameSlug?: string) => {
    const filteredHistory = gameSlug 
      ? gameHistory.filter(game => game.gameSlug === gameSlug)
      : gameHistory;

    return {
      totalGames: filteredHistory.length,
      bestScore: filteredHistory.length > 0 
        ? Math.max(...filteredHistory.map(game => game.score))
        : 0,
      recentGames: filteredHistory.slice(0, 5),
    };
  };

  const clearHistory = () => {
    if (!user) return;
    
    setGameHistory([]);
    const allHistory = JSON.parse(localStorage.getItem('gamePortalHistory') || '[]');
    const otherUsersHistory = allHistory.filter((game: GameResult) => game.userId !== user.id);
    localStorage.setItem('gamePortalHistory', JSON.stringify(otherUsersHistory));
  };

  return (
    <GameContext.Provider value={{ 
      gameHistory, 
      saveGameResult, 
      getGameStats, 
      clearHistory 
    }}>
      {children}
    </GameContext.Provider>
  );
};
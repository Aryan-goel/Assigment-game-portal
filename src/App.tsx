import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import History from "./pages/History";
import TapCounter from "./pages/games/TapCounter";
import MemoryClicker from "./pages/games/MemoryClicker";
import LuckyBox from "./pages/games/LuckyBox";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <GameProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to games if authenticated, login if not */}
              <Route path="/" element={<Navigate to="/games" replace />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/games" element={
                <ProtectedRoute>
                  <Games />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              
              {/* Game Routes */}
              <Route path="/games/tap-counter" element={
                <ProtectedRoute>
                  <TapCounter />
                </ProtectedRoute>
              } />
              <Route path="/games/memory-clicker" element={
                <ProtectedRoute>
                  <MemoryClicker />
                </ProtectedRoute>
              } />
              <Route path="/games/lucky-box" element={
                <ProtectedRoute>
                  <LuckyBox />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

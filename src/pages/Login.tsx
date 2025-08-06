import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GameButton } from '@/components/ui/game-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GameCard } from '@/components/ui/game-card';
import { toast } from '@/hooks/use-toast';
import { Gamepad2, Mail, Lock, Zap, Brain, Gift, Trophy, Star, Target, Heart, Shield, Sword } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/games');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
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
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow">
            <Gamepad2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Game Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to start playing
          </p>
        </div>

        <GameCard className="p-6 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            <GameButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </GameButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:text-primary-glow transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </GameCard>
      </div>
    </div>
  );
};

export default Login;
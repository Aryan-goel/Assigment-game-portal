import * as React from "react";
import { cn } from "@/lib/utils";

export interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl bg-gradient-card border border-border/20 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-glow hover:scale-105 overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);
GameCard.displayName = "GameCard";

export { GameCard };
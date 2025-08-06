import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-lg hover:scale-105",
        secondary: "bg-gradient-secondary text-secondary-foreground shadow-game hover:shadow-lg hover:scale-105",
        accent: "bg-gradient-accent text-accent-foreground shadow-accent-glow hover:shadow-lg hover:scale-105",
        game: "bg-gradient-game text-primary-foreground shadow-game hover:shadow-glow hover:scale-105",
        outline: "border-2 border-primary bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:border-primary-glow",
        ghost: "bg-background/20 backdrop-blur-sm text-foreground hover:bg-background/40",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(gameButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GameButton.displayName = "GameButton";

export { GameButton, gameButtonVariants };
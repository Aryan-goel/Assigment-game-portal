# 🎮 Game Portal

A modern, responsive gaming portal built with React and TypeScript, featuring three engaging mini-games with user authentication, game history tracking, and a beautiful gaming-themed UI.


## ✨ Features

### 🎯 Mini-Games
- **Tap Counter** - Test your reflexes by tapping as fast as possible in 10 seconds
- **Memory Clicker** - Challenge your memory by repeating increasingly complex sequences
- **Lucky Box** - Try your luck and discover prizes with different rarity levels

### 🔐 User Management
- Secure user registration and authentication
- Persistent user sessions with localStorage
- Protected routes for authenticated users
- User-specific game history and statistics

### 📊 Game Analytics
- Comprehensive game history tracking
- Personal best scores and achievements
- Game statistics and performance metrics
- Filterable history by game type

### 🎨 Modern UI/UX
- Gaming-themed design with gradients and glows
- Responsive design optimized for mobile and desktop
- Smooth animations and transitions
- Dark theme with gaming aesthetics
- Custom gaming icons and visual elements

### 🚀 Performance
- Built with Vite for lightning-fast development
- React 18 with modern hooks and context
- TypeScript for type safety and better development experience
- Optimized bundle size and loading times

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling with validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **Custom Gaming Theme** - Tailored design system

### State Management
- **React Context API** - Global state management
- **React Query** - Server state management (ready for backend integration)

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎮 Games Overview

### ⚡ Tap Counter
- **Objective**: Tap as many times as possible in 10 seconds
- **Features**: Real-time counter, performance feedback, tap animations
- **Scoring**: Based on total taps completed

### 🧠 Memory Clicker
- **Objective**: Remember and repeat sequences of increasing length
- **Features**: Visual sequence display, progressive difficulty, level system
- **Scoring**: Points based on levels completed

### 🎁 Lucky Box
- **Objective**: Choose boxes to discover prizes with different rarity levels
- **Features**: Multiple prize tiers, probability-based rewards, visual feedback
- **Scoring**: Points based on prize rarity and value

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd game-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to start playing!

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Usage

### First Time Setup
1. Visit the login page
2. Create a new account or use existing credentials
3. Access the games dashboard
4. Choose your first game to play!

### Playing Games
- **Tap Counter**: Click the button rapidly when the game starts
- **Memory Clicker**: Watch the sequence, then repeat it by clicking the icons
- **Lucky Box**: Select one of three boxes to reveal your prize

### Viewing History
- Navigate to the History page to see your game records
- Filter by game type to focus on specific games
- View your best scores and recent activity

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Purple (#8B5CF6) - Secondary elements and accents
- **Accent**: Neon Green (#16A34A) - Success states and special elements
- **Background**: Dark gaming theme with subtle gradients

### Typography
- Modern, clean fonts optimized for gaming interfaces
- Clear hierarchy with different font weights and sizes
- High contrast for excellent readability

### Components
- Custom gaming-themed buttons with hover effects
- Card-based layouts with backdrop blur
- Responsive grid systems for different screen sizes
- Smooth animations and micro-interactions

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── GameContext.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages
│   ├── games/          # Individual game components
│   ├── Games.tsx       # Main games dashboard
│   ├── History.tsx     # Game history page
│   ├── Login.tsx       # Authentication page
│   └── Register.tsx    # User registration
└── main.tsx           # Application entry point
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **Any static hosting**: The built files are ready for any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Lucide** for the beautiful icons
- **Tailwind CSS** for the utility-first styling approach
- **Vite** for the incredible build tooling

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub or contact the development team.

---

**Made by Aryan**

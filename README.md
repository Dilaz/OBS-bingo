# OBS Bingo 🎮

A modern, beautifully designed Bingo game for OBS (Open Broadcaster Software) support enthusiasts! Built with Vue 3, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 **Interactive 5x5 Bingo Grid** - Click cells to mark common OBS support issues
- 🏆 **Win Tracking** - Persistent win counter across sessions
- 🌙 **Dark Mode** - Beautiful dark theme with easy toggle
- 💾 **Local Storage** - Game state persists between sessions
- 🎨 **Smooth Animations** - Delightful transitions and celebrations
- 📱 **Responsive Design** - Works great on all screen sizes
- ✅ **Win Detection** - Automatic detection of rows, columns, and diagonals
- 🎉 **Celebration Effects** - Animated win celebrations

## 🚀 Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript with strict mode
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Custom components inspired by shadcn-vue
- **State Management**: VueUse composables
- **Testing**: Vitest with comprehensive test coverage
- **Code Quality**: ESLint + Prettier with strict configuration

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Lint code
npm run lint

# Format code
npm run format
```

## 🎮 How to Play

1. Click any cell to mark it as checked
2. Try to get 5 in a row - horizontally, vertically, or diagonally
3. When you win, celebrate and start a new game!
4. Track your wins over time
5. Toggle between light and dark modes for comfort

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── ui/             # Reusable UI components (Button, Card)
│   ├── BingoBoard.vue  # Main bingo board
│   └── BingoCell.vue   # Individual bingo cell
├── composables/        # Vue composables
│   ├── useBingo.ts     # Bingo game logic
│   └── useDarkMode.ts  # Dark mode management
├── lib/                # Utility functions
│   └── utils.ts        # Shared utilities
├── assets/             # Static assets
│   └── index.css       # Global styles
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## 🧪 Testing

The project includes comprehensive unit tests for all composables and core functionality:

```bash
# Run tests
npm run test

# Run tests with UI (recommended for development)
npm run test:ui

# Run tests with coverage
npm run test -- --coverage
```

## 🎨 Customization

### Adding New Bingo Phrases

Edit `words.json` in the root directory:

```json
[
  "Your custom phrase here",
  "Another funny OBS issue",
  ...
]
```

### Theming

Customize colors in `tailwind.config.js` and `src/assets/index.css`. The project uses CSS custom properties for easy theming.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

See LICENSE file for details.

## 🎯 Developer Experience Features

- **Type Safety**: Full TypeScript coverage with strict mode
- **Hot Module Replacement**: Instant feedback during development
- **Automatic Code Formatting**: Prettier integration
- **Linting**: ESLint with Vue and TypeScript rules
- **Component Testing**: Vitest for unit and integration tests
- **Path Aliases**: Use `@/` for clean imports
- **Modern Build**: Vite for lightning-fast builds
- **Composable Architecture**: Reusable logic with Vue composables

## 🌟 Highlights

- Built with modern best practices
- Fully typed with TypeScript
- Comprehensive test coverage
- Beautiful dark theme by default
- Smooth animations throughout
- Accessible UI components
- Responsive design
- Persistent state management
- Clean, maintainable code structure

Enjoy playing OBS Bingo! 🎉

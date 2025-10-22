# Dynamix Quiz Master

A polished Expo Router application that lets players launch category- and difficulty-based quizzes directly on web, iOS, or Android. The UI mirrors the provided Figma concepts, including the neon landing page, interactive quiz flow with progress indicators, and celebratory results screen.

## Features
- Category & difficulty filters that tailor the ten-question quiz to the exact topic/level selected.
- Randomized question and answer order every playthrough for better replayability.
- Animated start screen, progress bar, and green/red feedback states to guide the player.
- Detailed score breakdown with accuracy meter and “Try Again” action.
- Expo Router navigation with the entire quiz contained on a single stack screen.

## Prerequisites
- Node.js 18 or newer
- npm 9+ (bundled with recent Node versions)
- Expo CLI (optional, `npx` handles it automatically)

## Getting Started

```bash
# install dependencies
npm install

# start the Expo development server
npm run start
```

Expo DevTools will open in your terminal/browser. From there you can launch the app on:

- Web: press `w` or run `npm run web`
- iOS simulator: press `i` (requires macOS + Xcode)
- Android emulator/device: press `a`

When the QR code appears, you can also scan it with the Expo Go app to preview on a physical device.

## Project Structure
- `app/(tabs)/index.tsx` – landing, quiz, and results screens with all logic and styling.
- `app/(tabs)/_layout.tsx` – single-screen stack configuration (bottom tabs removed).
- `components/`, `constants/`, `assets/` – default Expo template resources and configuration.

## Customization Tips
- Update the question bank inside `app/(tabs)/index.tsx` to add new categories or connect an API.
- Adjust gradients, typography, or icons via the styles at the bottom of the same file.
- Add more screens by expanding the Expo Router stack if you need onboarding, leaderboards, etc.

## Scripts
- `npm run start` – start Expo (default)
- `npm run web` – open the web build directly
- `npm run ios` – run on iOS simulator/device
- `npm run android` – run on Android emulator/device

Happy quizzing! 🎉

# Spline 3D + Spotlight + Card Integration Guide

## Component Dependencies

### NPM Packages
```bash
npm install @splinetool/runtime @splinetool/react-spline framer-motion clsx tailwind-merge
```

### File Structure
```
components/
  ui/
    spline-scene.jsx   # Lazy-loaded Spline 3D scene wrapper
    spotlight.jsx      # Cursor-tracking radial spotlight
    card.jsx           # Shadcn Card primitive
lib/
  utils.js             # cn() helper (clsx + tailwind-merge)
```

## Key Components

### SplineScene
- Lazy-loads `@splinetool/react-spline` with `Suspense`
- Robot scene URL: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
- Use `dynamic()` from Next.js with `ssr: false` when importing in pages

### Spotlight
- Uses `framer-motion` springs for smooth cursor tracking
- Automatically finds parent element and sets `position: relative`
- Props: `className`, `size` (default 200), `fill` (color), `springOptions`

### Card
- Standard shadcn Card with `cn()` class merging
- Exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

## Usage Example
```jsx
import dynamic from "next/dynamic";
import { Card } from "../components/ui/card";
import { Spotlight } from "../components/ui/spotlight";

const SplineScene = dynamic(
  () => import("../components/ui/spline-scene").then(mod => ({ default: mod.SplineScene })),
  { ssr: false }
);

// In JSX:
<Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
  <SplineScene
    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
    className="w-full h-full"
  />
</Card>
```

## RAXX Color Palette
- Background: `#060b07`, `#09110c`, `#0d1712`
- Matte cards: `#0c160e` / `#122018` with border `#162a1c`
- Terracotta CTA: `#b8523b` (hover `#c95a41`)
- Emerald accent: `#34d399`
- Warm peach: `#f0ad73`
- Mint text: `#d4e8db`, `#a4c7af`, `#8cb899`

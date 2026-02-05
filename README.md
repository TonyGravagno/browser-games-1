# Browser Game Skeleton (TypeScript + React + Canvas)

This repository contains a minimal, readable browser game skeleton built with TypeScript, React, and the HTML canvas. React only hosts the `<canvas>` element; the game loop, state, input, update, and render logic all live in plain TypeScript modules.

## What this includes

- A requestAnimationFrame-driven frame loop
- A single canvas element
- Mutable game state with a minimal player entity
- Pure update and render steps
- Keyboard input intent tracking
- Explicit bootstrap wiring

## Project structure

```
src/
  main.tsx              // React entry point
  Game.tsx              // React component hosting the canvas
  game/
    bootstrap.ts        // Initialization logic
    frameLoop.ts        // requestAnimationFrame orchestration
    state.ts            // Game state types and initial state
    update.ts           // Simulation step
    render.ts           // Canvas rendering
    input.ts            // Input capture and intent
```

## How it works

- `bootstrapGame()` wires everything together: it initializes state, sets up input handlers, sizes the canvas, and starts the frame loop.
- `startFrameLoop()` owns timing and triggers update/render each frame.
- `updateGame()` mutates state based on input and delta time.
- `renderGame()` draws the current state without mutating it.

The current demo renders a small square that moves with the arrow keys or WASD.

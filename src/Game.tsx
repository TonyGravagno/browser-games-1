import React, { useEffect, useRef } from "react";

import { bootstrapGame } from "./game/bootstrap";

/**
 * React host component for the canvas element.
 * React is intentionally kept out of the game loop.
 */
export function Game(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    // Bootstrap owns the game loop; React is only the host.
    const runtime = bootstrapGame(canvas);

    return () => runtime.dispose();
  }, []);

  return (
    <div className="game-root">
      <canvas ref={canvasRef} />
    </div>
  );
}

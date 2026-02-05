import { startFrameLoop } from "./frameLoop";
import { createInputState } from "./input";
import { renderGame } from "./render";
import { createInitialState } from "./state";
import { updateGame } from "./update";

const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 180;

export interface GameRuntime {
  /**
   * Stops the frame loop and removes all listeners.
   * Safe to call multiple times.
   */
  dispose(): void;
}

const getCanvasSize = (canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || canvas.clientWidth || DEFAULT_WIDTH;
  const height = rect.height || canvas.clientHeight || DEFAULT_HEIGHT;

  return { width, height };
};

const resizeCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const { width, height } = getCanvasSize(canvas);
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  // Keep drawing coordinates in CSS pixels.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { width, height, dpr };
};

/**
 * Initializes the game:
 * - Creates initial state
 * - Sets up input handlers
 * - Starts the frame loop
 */
export function bootstrapGame(canvas: HTMLCanvasElement): GameRuntime {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D rendering context not available.");
  }

  const viewport = resizeCanvas(canvas, ctx);
  const state = createInitialState(viewport);
  const inputHandle = createInputState();

  const applyResize = () => {
    const nextViewport = resizeCanvas(canvas, ctx);

    state.viewport.width = nextViewport.width;
    state.viewport.height = nextViewport.height;
    state.viewport.dpr = nextViewport.dpr;
  };

  window.addEventListener("resize", applyResize);

  const loopHandle = startFrameLoop(
    (dt) => updateGame(state, inputHandle.input, dt),
    () => renderGame(ctx, state)
  );

  let disposed = false;

  return {
    dispose: () => {
      if (disposed) {
        return;
      }

      disposed = true;
      loopHandle.stop();
      window.removeEventListener("resize", applyResize);
      inputHandle.dispose();
    },
  };
}

import { startFrameLoop } from "./frameLoop";
import { createInputState } from "./input";
import { renderGame } from "./render";
import { createInitialState } from "./state";
import { updateGame } from "./update";

const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 180;

const getCanvasSize = (canvas: HTMLCanvasElement) => {
  const width = canvas.clientWidth || DEFAULT_WIDTH;
  const height = canvas.clientHeight || DEFAULT_HEIGHT;

  return { width, height };
};

const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const { width, height } = getCanvasSize(canvas);
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);

  return { width: canvas.width, height: canvas.height, pixelRatio };
};

/**
 * Initializes the game:
 * - Creates initial state
 * - Sets up input handlers
 * - Starts the frame loop
 */
export function bootstrapGame(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D rendering context not available.");
  }

  const state = createInitialState();
  const input = createInputState();

  const applyResize = () => {
    const { pixelRatio } = resizeCanvas(canvas);

    // Keep drawing coordinates in CSS pixels.
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  applyResize();
  window.addEventListener("resize", applyResize);

  startFrameLoop(
    (dt) => updateGame(state, input, dt),
    () => renderGame(ctx, state)
  );
}

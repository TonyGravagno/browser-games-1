import type { GameState } from "./state";

/**
 * Renders the current game state to the canvas.
 * Must not mutate game state.
 */
export function renderGame(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  const { width, height } = state.viewport;

  ctx.clearRect(0, 0, width, height);

  // Background.
  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, width, height);

  // Player.
  ctx.fillStyle = "#5eead4";
  ctx.fillRect(state.player.x - 10, state.player.y - 10, 20, 20);
}

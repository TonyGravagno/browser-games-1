import type { GameState } from "./state";
import type { InputState } from "./input";

const PLAYER_SPEED = 120;

/**
 * Advances the simulation by one frame.
 * Mutates game state based on elapsed time and input intent.
 */
export function updateGame(
  state: GameState,
  input: InputState,
  dt: number
): void {
  state.time += dt;

  const directionX = Number(input.right) - Number(input.left);
  const directionY = Number(input.down) - Number(input.up);

  state.player.vx = directionX * PLAYER_SPEED;
  state.player.vy = directionY * PLAYER_SPEED;

  // Integrate velocity into position.
  state.player.x += state.player.vx * dt;
  state.player.y += state.player.vy * dt;
}

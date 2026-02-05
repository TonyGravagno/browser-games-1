/**
 * Represents the player entity.
 */
export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Represents the mutable state of the game world.
 * This object is the single source of truth for simulation.
 */
export interface GameState {
  player: PlayerState;
  time: number;
}

/**
 * Creates the initial game state.
 */
export function createInitialState(): GameState {
  return {
    player: {
      x: 160,
      y: 90,
      vx: 0,
      vy: 0,
    },
    time: 0,
  };
}

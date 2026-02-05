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
 * Logical viewport configuration for rendering and layout.
 */
export interface Viewport {
  /** Logical (CSS) pixel width. */
  width: number;
  /** Logical (CSS) pixel height. */
  height: number;
  /** Device pixel ratio. */
  dpr: number;
}

/**
 * Represents the mutable state of the game world.
 * This object is the single source of truth for simulation.
 */
export interface GameState {
  player: PlayerState;
  time: number;
  viewport: Viewport;
}

/**
 * Creates the initial game state.
 */
export function createInitialState(viewport: Viewport): GameState {
  return {
    player: {
      x: viewport.width / 2,
      y: viewport.height / 2,
      vx: 0,
      vy: 0,
    },
    time: 0,
    viewport,
  };
}

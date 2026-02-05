export interface FrameLoopHandle {
  stop(): void;
}

/**
 * Starts the requestAnimationFrame loop.
 * Owns timing and frame orchestration.
 */
export function startFrameLoop(
  update: (dt: number) => void,
  render: () => void,
  opts?: {
    /** Maximum allowed dt in seconds (default: 0.05). */
    maxDtSeconds?: number;
  }
): FrameLoopHandle {
  const maxDtSeconds = opts?.maxDtSeconds ?? 0.05;
  let running = true;
  let rafId: number | null = null;
  let lastTime = performance.now();

  const frame = (time: number) => {
    if (!running) {
      return;
    }

    const deltaMs = time - lastTime;
    const dt = Math.min(deltaMs / 1000, maxDtSeconds);

    lastTime = time;

    update(dt);
    render();

    rafId = requestAnimationFrame(frame);
  };

  rafId = requestAnimationFrame(frame);

  return {
    stop: () => {
      if (!running) {
        return;
      }

      running = false;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
  };
}

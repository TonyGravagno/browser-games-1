/**
 * Starts the requestAnimationFrame loop.
 * Owns timing and frame orchestration.
 */
export function startFrameLoop(
  update: (dt: number) => void,
  render: () => void
): void {
  let lastTime = performance.now();

  const frame = (time: number) => {
    const deltaMs = time - lastTime;
    const dt = deltaMs / 1000;

    lastTime = time;

    update(dt);
    render();

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

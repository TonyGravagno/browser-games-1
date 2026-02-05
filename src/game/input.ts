/**
 * Represents player input intent captured from browser events.
 * These values are written by input handlers and read during update.
 */
export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

const KEY_TO_INTENT: Record<string, keyof InputState> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
};

/**
 * Sets up browser input listeners and returns an InputState object
 * that is updated in response to events.
 */
export function createInputState(): InputState {
  const input: InputState = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  const handleKey = (event: KeyboardEvent, isPressed: boolean) => {
    const intent = KEY_TO_INTENT[event.key];

    if (intent) {
      input[intent] = isPressed;
    }
  };

  window.addEventListener("keydown", (event) => handleKey(event, true));
  window.addEventListener("keyup", (event) => handleKey(event, false));

  return input;
}

import { getCurrentInstance, onBeforeUnmount } from "vue";

export interface TimerController {
  readonly timer: number;
  start: (callback: () => void, delay: number) => void;
  clear: () => void;
}

export function useInterval(): TimerController {
  let timer = 0;

  const clear = () => {
    if (!timer) {
      return;
    }

    window.clearInterval(timer);
    timer = 0;
  };

  const start = (callback: () => void, delay: number) => {
    clear();
    timer = window.setInterval(callback, delay);
  };

  if (getCurrentInstance()) {
    onBeforeUnmount(clear);
  }

  return {
    get timer() {
      return timer;
    },
    start,
    clear,
  };
}

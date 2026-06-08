import { getCurrentInstance, onBeforeUnmount } from "vue";

import type { TimerController } from "./useInterval";

export function useTimeout(): TimerController {
  let timer = 0;

  const clear = () => {
    if (!timer) {
      return;
    }

    window.clearTimeout(timer);
    timer = 0;
  };

  const start = (callback: () => void, delay: number) => {
    clear();
    timer = window.setTimeout(() => {
      timer = 0;
      callback();
    }, delay);
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

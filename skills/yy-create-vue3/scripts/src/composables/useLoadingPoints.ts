import { ref, type Ref } from "vue";

import { useInterval } from "./useInterval";

export interface UseLoadingPointsOptions {
  interval?: number;
  max?: number;
  immediate?: boolean;
}

export interface LoadingPointsController {
  pointStr: Ref<string>;
  start: () => void;
  stop: () => void;
}

export function useLoadingPoints(options: UseLoadingPointsOptions = {}): LoadingPointsController {
  const interval = options.interval ?? 500;
  const max = options.max ?? 3;
  const pointStr = ref("");
  const intervalController = useInterval();

  const tick = () => {
    const nextLength = pointStr.value.length >= max ? 1 : pointStr.value.length + 1;
    pointStr.value = ".".repeat(nextLength);
  };

  const start = () => {
    if (options.immediate ?? true) {
      tick();
    }

    intervalController.start(tick, interval);
  };

  const stop = () => {
    intervalController.clear();
    pointStr.value = "";
  };

  return {
    pointStr,
    start,
    stop,
  };
}

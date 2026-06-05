import { watch, type Ref, type WatchHandle } from "vue";

export function waitUntilPositive(
  boolRef: Ref<boolean>,
  callback?: (watchHandler: WatchHandle) => void | Promise<void>,
): Promise<void> {
  return new Promise<void>((resolve) => {
    const handleWatchTriggered = async (
      newVal: boolean,
      oldVal: boolean | undefined,
      watchHandler: WatchHandle,
    ) => {
      if (newVal && !oldVal) {
        if (!callback) {
          watchHandler();
          resolve();
          return;
        }

        let stopped = false;
        const stopWatching = () => {
          if (stopped) {
            return;
          }

          stopped = true;
          watchHandler();
          resolve();
        };

        const controlledWatchHandler = Object.assign(stopWatching, {
          pause: watchHandler.pause.bind(watchHandler),
          resume: watchHandler.resume.bind(watchHandler),
          stop: stopWatching,
        }) as WatchHandle;

        await callback(controlledWatchHandler);
        return;
      }
    };

    const watchHandler = watch(boolRef, async (newVal, oldVal) => {
      await handleWatchTriggered(newVal, oldVal, watchHandler);
    });

    void handleWatchTriggered(boolRef.value, undefined, watchHandler);
  });
}

export function waitUntilNegative(
  boolRef: Ref<boolean>,
  callback?: (watchHandler: WatchHandle) => void | Promise<void>,
): Promise<void> {
  return new Promise<void>((resolve) => {
    const handleWatchTriggered = async (
      newVal: boolean,
      oldVal: boolean | undefined,
      watchHandler: WatchHandle,
    ) => {
      if (!newVal && oldVal) {
        if (!callback) {
          watchHandler();
          resolve();
          return;
        }

        let stopped = false;
        const stopWatching = () => {
          if (stopped) {
            return;
          }

          stopped = true;
          watchHandler();
          resolve();
        };

        const controlledWatchHandler = Object.assign(stopWatching, {
          pause: watchHandler.pause.bind(watchHandler),
          resume: watchHandler.resume.bind(watchHandler),
          stop: stopWatching,
        }) as WatchHandle;

        await callback(controlledWatchHandler);
        return;
      }
    };

    const watchHandler = watch(boolRef, async (newVal, oldVal) => {
      await handleWatchTriggered(newVal, oldVal, watchHandler);
    });

    void handleWatchTriggered(boolRef.value, undefined, watchHandler);
  });
}

export function watchBooleanChanged(
  boolRef: Ref<boolean>,
  callbacks: {
    onPositive?: (watchHandler: WatchHandle) => void | Promise<void>;
    onNegative?: (watchHandler: WatchHandle) => void | Promise<void>;
  },
): void {
  const handleWatchTriggered = async (
    newVal: boolean,
    oldVal: boolean | undefined,
    watchHandler: WatchHandle,
  ) => {
    if (newVal && !oldVal && callbacks.onPositive) {
      await callbacks.onPositive(watchHandler);
    }
    if (!newVal && oldVal && callbacks.onNegative) {
      await callbacks.onNegative(watchHandler);
    }
  };

  const watchHandler = watch(boolRef, async (newVal, oldVal) => {
    await handleWatchTriggered(newVal, oldVal, watchHandler);
  });

  void handleWatchTriggered(boolRef.value, undefined, watchHandler);
}

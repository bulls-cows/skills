import { nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import { waitUntilPositive } from "@src/scripts/watchUtils";

describe("watchUtils", () => {
  it("auto stops after becoming positive when callback is omitted", async () => {
    const state = ref(false);
    const done = waitUntilPositive(state);

    state.value = true;
    await done;

    const probe = vi.fn();
    const stopProbe = waitUntilPositive(state, (watchHandler) => {
      probe();
      watchHandler();
    });

    await stopProbe;
    expect(probe).toHaveBeenCalledTimes(1);

    state.value = false;
    await nextTick();
    state.value = true;
    await nextTick();

    expect(probe).toHaveBeenCalledTimes(1);
  });

  it("lets callback decide when to stop watching", async () => {
    const state = ref(false);
    const callback = vi.fn<(watchHandler: () => void) => void>();
    const done = waitUntilPositive(state, (watchHandler) => {
      callback(watchHandler);
    });
    let resolved = false;

    void done.then(() => {
      resolved = true;
    });

    state.value = true;
    await nextTick();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(resolved).toBe(false);

    state.value = false;
    await nextTick();
    state.value = true;
    await nextTick();

    expect(callback).toHaveBeenCalledTimes(2);

    const stopWatching = callback.mock.calls[1]?.[0];
    expect(stopWatching).toBeTypeOf("function");
    stopWatching?.();

    await done;
    expect(resolved).toBe(true);
  });
});

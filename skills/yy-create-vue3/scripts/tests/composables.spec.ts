import { describe, expect, it, vi } from "vitest";

import { useInterval } from "@src/composables/useInterval";
import { useLoadingPoints } from "@src/composables/useLoadingPoints";
import { useTimeout } from "@src/composables/useTimeout";

describe("timer composables", () => {
  it("starts and clears interval timer", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const interval = useInterval();

    interval.start(callback, 100);
    expect(interval.timer).not.toBe(0);

    vi.advanceTimersByTime(250);
    expect(callback).toHaveBeenCalledTimes(2);

    interval.clear();
    vi.advanceTimersByTime(250);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(interval.timer).toBe(0);

    vi.useRealTimers();
  });

  it("starts and clears timeout timer", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const timeout = useTimeout();

    timeout.start(callback, 100);
    timeout.clear();
    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();
    expect(timeout.timer).toBe(0);

    timeout.start(callback, 100);
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(timeout.timer).toBe(0);

    vi.useRealTimers();
  });

  it("cycles loading points and clears state", () => {
    vi.useFakeTimers();
    const loadingPoints = useLoadingPoints({ interval: 100, max: 3 });

    loadingPoints.start();
    expect(loadingPoints.pointStr.value).toBe(".");

    vi.advanceTimersByTime(100);
    expect(loadingPoints.pointStr.value).toBe("..");

    vi.advanceTimersByTime(100);
    expect(loadingPoints.pointStr.value).toBe("...");

    vi.advanceTimersByTime(100);
    expect(loadingPoints.pointStr.value).toBe(".");

    loadingPoints.stop();
    expect(loadingPoints.pointStr.value).toBe("");

    vi.useRealTimers();
  });
});

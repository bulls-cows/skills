import { subscribe } from "@src/scripts/subscribeUtils";

type SubscribeHandler<T> = (payload: RequestResponsePayload<T>) => void;

export const subscribeWindowStateChanged = (
  handler: SubscribeHandler<WindowFrameState>,
): (() => void) => {
  return subscribe<WindowFrameState>("window.state.changed", handler);
};

export const subscribeKeepAlive = (handler: SubscribeHandler<void>): (() => void) => {
  return subscribe<void>("diagnostics.keepAliveUpdated", handler);
};

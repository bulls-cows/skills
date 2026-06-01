import { sleep } from "@src/scripts/timeUtils";

const DEFAULT_MIN_MOCK_RESPONSE_MS = 800;
const DEFAULT_MOCK_TIMEOUT_MS = 10_000;
const JSONP_CALLBACK_PREFIX = "__vue3MockJsonpCallback__";

interface FetchMockDataOptions {
  payload?: unknown;
  minResponseMs?: number;
}

type JsonpCallback = (payload: unknown) => void;
type MockCallbackHost = Window &
  typeof globalThis & {
    [key: string]: JsonpCallback | undefined;
  };

const getMockCallbackName: () => string = (() => {
  let callbackId = 0;
  return () => {
    callbackId += 1;
    return `${JSONP_CALLBACK_PREFIX}${Date.now()}_${callbackId}`;
  };
})();

const serializeMockPayload = (topic: string, payload: unknown): string => {
  try {
    return JSON.stringify(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知序列化错误";
    throw new Error(`序列化 Mock 参数失败: topic=${topic}, reason=${message}`);
  }
};

const buildMockUrl = (
  topic: string,
  callbackName: string,
  options?: FetchMockDataOptions,
): string => {
  const params = new URLSearchParams({
    callback: callbackName,
    topic,
    _ts: Date.now().toString(),
  });

  if (options?.payload !== undefined) {
    params.set("payload", serializeMockPayload(topic, options.payload));
  }

  return `/mock/${encodeURIComponent(topic)}.js?${params.toString()}`;
};

const waitForConfiguredMockDelay = async (
  startedAt: number,
  minResponseMs: number,
): Promise<void> => {
  if (minResponseMs <= 0) {
    return;
  }

  const usedTime = Date.now() - startedAt;
  if (usedTime < minResponseMs) {
    await sleep(minResponseMs - usedTime);
  }
};

export const fetchMockData = async <TResult = unknown>(
  topic: string,
  options?: FetchMockDataOptions,
): Promise<TResult> => {
  const startTime = Date.now();
  const minResponseMs = options?.minResponseMs ?? DEFAULT_MIN_MOCK_RESPONSE_MS;
  const callbackName = getMockCallbackName();
  const mockUrl = buildMockUrl(topic, callbackName, options);
  const callbackHost = window as MockCallbackHost;
  const scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src = mockUrl;

  let timeoutId: number | undefined;
  let settled = false;

  const cleanup = (): void => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }
    delete callbackHost[callbackName];
    scriptElement.remove();
  };

  const settle = async <TValue>(factory: () => TValue): Promise<TValue> => {
    if (settled) {
      throw new Error(`Mock JSONP 回调重复触发: topic=${topic}, path=${mockUrl}`);
    }
    settled = true;
    cleanup();
    await waitForConfiguredMockDelay(startTime, minResponseMs);
    return factory();
  };

  try {
    return await new Promise<TResult>((resolve, reject) => {
      callbackHost[callbackName] = (payload: unknown) => {
        void settle(() => payload as TResult)
          .then(resolve)
          .catch(reject);
      };

      scriptElement.onerror = () => {
        void settle(() => {
          throw new Error(`读取 Mock 数据失败: topic=${topic}, path=${mockUrl}`);
        })
          .then(resolve)
          .catch(reject);
      };

      timeoutId = window.setTimeout(() => {
        void settle(() => {
          throw new Error(`读取 Mock 数据超时: topic=${topic}, path=${mockUrl}`);
        })
          .then(resolve)
          .catch(reject);
      }, DEFAULT_MOCK_TIMEOUT_MS);

      document.head.appendChild(scriptElement);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知 JSONP 执行错误";
    throw new Error(`解析 Mock 数据失败: topic=${topic}, path=${mockUrl}, reason=${message}`);
  }
};

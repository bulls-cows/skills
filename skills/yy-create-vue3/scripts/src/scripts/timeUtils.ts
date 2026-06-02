/**
 * 暂停指定毫秒数
 * @param ms - 等待的毫秒数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 在浏览器空闲时执行回调；若环境不支持 requestIdleCallback，则退化为定时器异步执行。
 * @param callback - 空闲时执行的回调
 * @returns 调度任务的句柄，可用于取消
 */
export function scheduleIdleCallback(callback: IdleCallbackLike): number {
  if (typeof globalThis.requestIdleCallback === "function") {
    return globalThis.requestIdleCallback(callback);
  }

  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 0,
    });
  }, 1);
}

/**
 * 取消通过 scheduleIdleCallback 注册的空闲任务。
 * @param handle - 任务句柄
 */
export function cancelScheduledIdleCallback(handle: number): void {
  if (typeof globalThis.cancelIdleCallback === "function") {
    globalThis.cancelIdleCallback(handle);
    return;
  }

  clearTimeout(handle);
}

/**
 * 格式化日期为年-月-日格式
 * @param date - 日期对象
 * @returns 格式化后的日期字符串 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * 格式化时间为时:分:秒.毫秒格式
 * @param date - 日期对象
 * @returns 格式化后的时间字符串 HH:mm:ss.SSS
 */
export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * 格式化日期和时间为年-月-日 时:分:秒格式
 * @param date - 日期对象
 * @returns 格式化后的日期时间字符串 YYYY-MM-DD HH:mm:ss
 */
export function formatDateAndTime(date: Date): string {
  const datePart = formatDate(date);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${datePart} ${hours}:${minutes}:${seconds}`;
}

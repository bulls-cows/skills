import inspect from "object-inspect";

export const safeStringify = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return inspect(value, { depth: 6 });
};

// 将对象键值对拼接为逗号分隔的 key=value 文本。
export const stringifyObjectEntries = (value: Record<string, unknown>): string => {
  return Object.entries(value)
    .map(([key, entryValue]) => `${key}=${safeStringify(entryValue)}`)
    .join(", ");
};

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateRandomString = (minLength: number, maxLength: number): string => {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
};

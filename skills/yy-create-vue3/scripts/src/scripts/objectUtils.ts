export const simplifyObject = (value: unknown, seen: WeakSet<object> = new WeakSet()): unknown => {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }
  if (Array.isArray(value)) {
    return value.map((item) => simplifyObject(item, seen));
  }
  if (typeof value === "object") {
    if (seen.has(value)) {
      return "[Circular]";
    }
    seen.add(value);
    const simplifiedEntries = Object.entries(value).map(([key, item]) => [
      key,
      simplifyObject(item, seen),
    ]);
    seen.delete(value);
    return Object.fromEntries(simplifiedEntries);
  }
  return String(value);
};

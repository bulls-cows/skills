export function toKeyValueString(data: Record<string, unknown>): string {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(", ");
}

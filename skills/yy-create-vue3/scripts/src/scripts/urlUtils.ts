export const getPathFromUrlHash = (hash: string): string => {
  if (!hash.includes("?")) {
    return hash;
  }
  return hash.split("?")[0] || "";
};

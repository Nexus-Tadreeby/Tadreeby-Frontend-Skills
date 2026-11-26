export const responseCache = new Map();
export const pendingRequests = new Map();
export const DEFAULT_CACHE_TTL = 2 * 60 * 1000;

export const getCacheKey = (endpoint, token) =>
  `${token || "anonymous"}:${endpoint}`;

export const clearApiCache = () => {
  responseCache.clear();
  pendingRequests.clear();
};

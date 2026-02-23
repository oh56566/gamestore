const STORAGE_KEY = "recentViewedGameIds";
const MAX_ITEMS = 10;

function safeParseIds(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v) => (typeof v === "number" ? v : Number(v)))
      .filter((v) => Number.isFinite(v))
      .map((v) => Math.trunc(v))
      .filter((v) => v > 0);
  } catch {
    return [];
  }
}

export function getRecentViewedGameIds(): number[] {
  return safeParseIds(localStorage.getItem(STORAGE_KEY));
}

export function addRecentViewedGameId(gameId: number): void {
  if (!Number.isFinite(gameId) || gameId <= 0) return;

  const current = getRecentViewedGameIds();
  const next = [gameId, ...current.filter((id) => id !== gameId)].slice(
    0,
    MAX_ITEMS
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearRecentViewedGames(): void {
  localStorage.removeItem(STORAGE_KEY);
}

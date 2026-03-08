import type { TarotCard } from "@/data/tarotCards";

export interface HistoryEntry {
  cardId: number;
  date: string; // YYYY-MM-DD
}

const STORAGE_KEY = "devtarot-history";

export function saveToHistory(card: TarotCard): void {
  const history = getHistory();
  const today = new Date().toISOString().split("T")[0];

  // Remove existing entry for today
  const filtered = history.filter((e) => e.date !== today);
  filtered.unshift({ cardId: card.id, date: today });

  // Keep only last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoff = sevenDaysAgo.toISOString().split("T")[0];
  const trimmed = filtered.filter((e) => e.date >= cutoff).slice(0, 7);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

import tarotCards from "@/data/tarotCards";
import type { HistoryEntry } from "@/lib/history";

const moodLabels: Record<string, string> = {
  great: "🔥 대길",
  good: "✨ 길",
  neutral: "☁️ 평",
  caution: "⚠️ 소흉",
  danger: "💀 흉",
};

interface Props {
  history: HistoryEntry[];
}

export default function CardHistory({ history }: Props) {
  if (!history.length) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((today.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
    return `${diff}일 전`;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 relative z-10">
      <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4 text-center">
        ✦ 최근 기록 ✦
      </h3>
      <div className="space-y-2">
        {history.map((entry, i) => {
          const card = tarotCards.find((c) => c.id === entry.cardId);
          if (!card) return null;
          return (
            <div
              key={entry.date}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="text-2xl">{card.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {card.nameKo}
                  <span className="font-mono text-xs text-muted-foreground ml-2">{card.name}</span>
                </p>
                <p className="font-mono text-xs text-muted-foreground truncate">{card.fortune.slice(0, 40)}…</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs">{moodLabels[card.mood]}</span>
                <p className="font-mono text-[10px] text-muted-foreground">{formatDate(entry.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import type { TarotCard as TarotCardType } from "@/data/tarotCards";
import cardImages from "@/data/cardImages";

const moodColors: Record<TarotCardType["mood"], string> = {
  great: "text-accent",
  good: "text-primary",
  neutral: "text-muted-foreground",
  caution: "text-primary",
  danger: "text-destructive",
};

const moodLabels: Record<TarotCardType["mood"], string> = {
  great: "🔥 대길",
  good: "✨ 길",
  neutral: "☁️ 평",
  caution: "⚠️ 소흉",
  danger: "💀 흉",
};

interface Props {
  card: TarotCardType;
}

export default function TarotCardFront({ card }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Card Illustration */}
      <div className="h-[170px] overflow-hidden relative">
        <img
          src={cardImages[card.id]}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
      </div>

      <div className="flex flex-col flex-1 px-6 pb-5 -mt-4 relative">
        {/* Header */}
        <div className="text-center mb-2">
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            {card.id} — {card.name}
          </p>
          <h2 className="text-2xl font-bold text-foreground text-glow-gold">
            {card.nameKo}
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-primary/30" />
          <span className={`text-xs font-bold ${moodColors[card.mood]}`}>
            {moodLabels[card.mood]}
          </span>
          <div className="flex-1 h-px bg-primary/30" />
        </div>

        {/* Fortune */}
        <p className="text-foreground/90 text-sm leading-relaxed flex-1 mt-1 whitespace-pre-line">
          {card.fortune}
        </p>

        {/* Advice */}
        <div className="mt-2 p-2 rounded-lg bg-secondary/50 border border-border">
          <p className="font-mono text-xs text-accent text-glow-neon whitespace-pre-line">
            {'>'} {card.advice}
          </p>
        </div>

        {/* Lucky Stack */}
        <div className="mt-2 text-center">
          <span className="font-mono text-[10px] text-muted-foreground">
            럭키 스택:{" "}
            <span className="text-primary font-bold">{card.luckyStack}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

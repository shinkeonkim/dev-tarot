import { useState } from "react";
import cardBack from "@/assets/card-back.png";
import type { TarotCard } from "@/data/tarotCards";
import { playSelectSound } from "@/lib/sounds";

interface Props {
  cards: TarotCard[];
  onSelect: (card: TarotCard) => void;
}

export default function CardPicker({ cards, onSelect }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    playSelectSound();
    setSelectedIndex(index);
    setTimeout(() => onSelect(cards[index]), 400);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-sm text-muted-foreground tracking-wider animate-pulse">
        ✦ 세 장 중 하나를 선택하세요 ✦
      </p>
      <div className="flex gap-3 sm:gap-5 items-end">
        {cards.map((_, i) => {
          const isHovered = hoveredIndex === i;
          const isSelected = selectedIndex === i;
          const isOther = selectedIndex !== null && selectedIndex !== i;

          return (
            <div
              key={i}
              className={`
                perspective-1000 cursor-pointer transition-all duration-500 ease-out
                ${isSelected ? "scale-110 -translate-y-4" : ""}
                ${isOther ? "opacity-30 scale-90 translate-y-2" : ""}
                ${isHovered && selectedIndex === null ? "-translate-y-3 scale-105" : ""}
              `}
              onMouseEnter={() => {
                if (selectedIndex === null) setHoveredIndex(i);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelect(i)}
            >
              <div
                className={`
                  w-[90px] h-[135px] sm:w-[110px] sm:h-[165px]
                  rounded-xl overflow-hidden border transition-all duration-300
                  ${isSelected ? "border-primary card-shadow" : "border-primary/20 hover:border-primary/50"}
                  ${isHovered && selectedIndex === null ? "card-shadow" : ""}
                `}
              >
                <img
                  src={cardBack}
                  alt={`Card ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-mono text-[10px] text-center text-muted-foreground mt-2">
                {isSelected ? "✦" : i + 1}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

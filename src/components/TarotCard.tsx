import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import type { TarotCard as TarotCardType } from "@/data/tarotCards";
import cardBack from "@/assets/card-back.png";
import ParticleEffect from "./ParticleEffect";
import TarotCardFront from "./TarotCardFront";


interface Props {
  card: TarotCardType | null;
  isFlipped: boolean;
  onFlip: () => void;
}

export interface TarotCardHandle {
  getCardFrontElement: () => HTMLDivElement | null;
}

const TarotCard = forwardRef<TarotCardHandle, Props>(({ card, isFlipped, onFlip }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const captureCardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getCardFrontElement: () => captureCardRef.current,
  }));

  const handleClick = () => {
    if (isFlipped || isAnimating) return;
    setIsAnimating(true);
    onFlip();
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <>
      <div className="perspective-1000 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] cursor-pointer mx-auto relative" onClick={handleClick}>
        <ParticleEffect active={isFlipped} />
        <div
          className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
        >
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden card-shadow border border-primary/30 hover:border-primary/60 transition-colors">
            <img src={cardBack} alt="Card back" className="w-full h-full object-cover" />
            {!isFlipped && (
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <span className="font-mono text-sm text-primary/80 animate-pulse tracking-widest uppercase">
                  탭하여 뽑기
                </span>
              </div>
            )}
          </div>

          {/* Front (for flip UI) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden card-shadow border border-primary/40 bg-card">
            {card && <TarotCardFront card={card} />}
          </div>
        </div>
      </div>

      {/* Static front (for image capture only) */}
      {card && (
        <div
          ref={captureCardRef}
          className="fixed -left-[10000px] top-0 w-[320px] h-[480px] rounded-2xl overflow-hidden card-shadow border border-primary/40 bg-card pointer-events-none"
          aria-hidden="true"
        >
          <TarotCardFront card={card} />
        </div>
      )}
    </>
  );
});

TarotCard.displayName = "TarotCard";
export default TarotCard;

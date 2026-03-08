import { useState, useCallback, useEffect, useRef } from "react";
import TarotCard, { type TarotCardHandle } from "@/components/TarotCard";
import CardPicker from "@/components/CardPicker";
import CardHistory from "@/components/CardHistory";
import { captureCardImage, downloadBlob } from "@/lib/imageCapture";
import { drawRandomCards, type TarotCard as TarotCardType } from "@/data/tarotCards";
import { saveToHistory, getHistory, type HistoryEntry } from "@/lib/history";
import { playFlipSound, playResetSound } from "@/lib/sounds";
import { Copy, Check, Download, Loader2 } from "lucide-react";

function CopyButton({ getCardElement }: { getCardElement: () => HTMLDivElement | null }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCopy = async () => {
    setLoading(true);
    try {
      const el = getCardElement();
      if (!el) return;
      const blob = await captureCardImage(el);
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: download
      try {
        const el = getCardElement();
        if (!el) return;
        const blob = await captureCardImage(el);
        downloadBlob(blob);
      } catch { /* ignore */ }
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={handleCopy} disabled={loading}
      className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-accent transition-colors border border-border hover:border-accent/50 px-5 py-2 rounded-lg disabled:opacity-50">
      {loading ? <Loader2 size={14} className="animate-spin" /> : copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "복사됨!" : "이미지 복사"}
    </button>
  );
}

function DownloadButton({ getCardElement }: { getCardElement: () => HTMLDivElement | null }) {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const el = getCardElement();
      if (!el) return;
      const blob = await captureCardImage(el);
      downloadBlob(blob);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };
  return (
    <button onClick={handleDownload} disabled={loading}
      className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground/30 px-5 py-2 rounded-lg disabled:opacity-50">
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      저장
    </button>
  );
}

type Phase = "pick" | "reveal" | "done";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("pick");
  const [candidates, setCandidates] = useState<TarotCardType[]>(() => drawRandomCards(3));
  const [card, setCard] = useState<TarotCardType | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const cardRef = useRef<TarotCardHandle>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handlePickCard = useCallback((picked: TarotCardType) => {
    setCard(picked);
    setPhase("reveal");
  }, []);

  const handleFlip = useCallback(() => {
    if (isFlipped) return;
    playFlipSound();
    setIsFlipped(true);
    if (card) {
      saveToHistory(card);
      setHistory(getHistory());
    }
    setTimeout(() => setPhase("done"), 800);
  }, [isFlipped, card]);

  const handleReset = () => {
    playResetSound();
    setIsFlipped(false);
    setCard(null);
    setCandidates(drawRandomCards(3));
    setPhase("pick");
  };

  const getCardElement = useCallback(() => {
    return cardRef.current?.getCardFrontElement() ?? null;
  }, []);

  return (
    <div className="min-h-screen bg-background stars-bg flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-glow-gold tracking-tight">
          DevTarot
        </h1>
        <p className="font-mono text-sm text-muted-foreground mt-2 tracking-wider">
          // 오늘의 코딩 운세를 뽑아보세요
        </p>
      </div>

      {/* Card Picker */}
      {phase === "pick" && (
        <div className="relative z-10">
          <CardPicker cards={candidates} onSelect={handlePickCard} />
        </div>
      )}

      {/* Card Reveal */}
      {(phase === "reveal" || phase === "done") && (
        <div className="relative z-10">
          <TarotCard ref={cardRef} card={card} isFlipped={isFlipped} onFlip={handleFlip} />
        </div>
      )}

      {/* Actions */}
      {phase === "done" && card && (
        <div className="flex flex-col items-center gap-3 mt-6 relative z-10">
          <div className="flex flex-wrap justify-center gap-2">
            <CopyButton getCardElement={getCardElement} />
            <DownloadButton getCardElement={getCardElement} />
          </div>
          <button
            onClick={handleReset}
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors tracking-wider border border-border hover:border-primary/50 px-6 py-2 rounded-lg"
          >
            ↻ 다시 뽑기
          </button>
        </div>
      )}

      {/* History */}
      <CardHistory history={history} />

      {/* Footer */}
      <p className="mt-10 font-mono text-xs text-muted-foreground/50 relative z-10">
        매일 새로운 운세가 기다립니다 ✦
      </p>
    </div>
  );
};

export default Index;

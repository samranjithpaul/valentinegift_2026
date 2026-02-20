import { useState } from "react";

interface PromiseItem {
  id: number;
  text: string;
  color: string;
  rotate: number;
  offsetX: number;
}

const PROMISES: PromiseItem[] = [
  { id: 1, text: "to always tell you when I'm scared", color: "hsl(52, 88%, 80%)", rotate: -2, offsetX: 0 },
  { id: 2, text: "to show up, even when it's hard", color: "hsl(190, 55%, 82%)", rotate: 1.5, offsetX: 10 },
  { id: 3, text: "to choose you in the quiet moments too", color: "hsl(340, 65%, 88%)", rotate: -1, offsetX: -5 },
  { id: 4, text: "to listen before I speak", color: "hsl(280, 38%, 86%)", rotate: 3, offsetX: 14 },
  { id: 5, text: "to keep growing, even when it's uncomfortable", color: "hsl(20, 75%, 88%)", rotate: -2.5, offsetX: 3 },
  { id: 6, text: "to never stop writing love letters", color: "hsl(52, 88%, 80%)", rotate: 1, offsetX: -10 },
];

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const StickyNote = ({ promise, onClick }: { promise: PromiseItem; onClick: () => void }) => (
  <div
    className="sticky-note cursor-pointer transition-transform duration-200 relative"
    onClick={onClick}
    style={{
      background: promise.color,
      transform: `rotate(${promise.rotate}deg)`,
      marginLeft: `${promise.offsetX}px`,
      minWidth: "160px",
      maxWidth: "210px",
      flex: "1 1 155px",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = `rotate(${promise.rotate * 0.4}deg) scale(1.06) translateY(-3px)`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = `rotate(${promise.rotate}deg)`;
    }}
  >
    {/* Tape */}
    <div
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 opacity-65 rounded-sm"
      style={{ background: "hsl(48, 65%, 62%)" }}
    />
    <div className="font-hand leading-snug pt-2" style={{ fontSize: "17px", color: "hsl(20 25% 12%)" }}>
      {promise.text}
    </div>
    <div className="mt-3 text-right opacity-50" style={{ fontSize: "11px", color: "hsl(20 25% 12%)" }}>tap ♡</div>
  </div>
);

const PagePromises = ({ sessionPromises = [], onPromisesChange }: { sessionPromises?: string[]; onPromisesChange?: () => void }) => {
  const [activePromise, setActivePromise] = useState<PromiseItem | null>(null);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const spawnConfetti = (x: number, y: number) => {
    const particles: ConfettiParticle[] = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 40,
      emoji: ["💕", "✨", "🌸", "💫", "♡", "★"][Math.floor(Math.random() * 6)],
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 1600);
  };

  const handleAnswer = (ans: "yes" | "no", e: React.MouseEvent) => {
    setAnswer(ans);
    if (ans === "yes" && activePromise) {
      // Push to sessionStorage single source of truth
      const current: string[] = JSON.parse(sessionStorage.getItem("promises") || "[]");
      if (!current.includes(activePromise.text)) {
        current.push(activePromise.text);
        sessionStorage.setItem("promises", JSON.stringify(current));
        onPromisesChange?.();
      }
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Confetti overlay */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((p) => (
            <div
              key={p.id}
              className="absolute text-xl"
              style={{
                left: p.x,
                top: p.y,
                animation: "confetti-fall 1.3s ease-out forwards",
                animationDelay: `${Math.random() * 0.25}s`,
              }}
            >
              {p.emoji}
            </div>
          ))}
        </div>
      )}

      <div className="panel" style={{ transform: "rotate(0.4deg)" }}>
        <div className="panel-title">🌸 i promise to…</div>
        <p className="font-hand mt-2" style={{ fontSize: "17px", color: "hsl(var(--rose))" }}>
          tap any note. hold me to it.
        </p>
        {sessionPromises.length > 0 && (
          <div className="mt-3 border-t pt-3" style={{ borderColor: "hsl(var(--panel-border))" }}>
            <div className="font-pixel mb-1.5" style={{ fontSize: "6px", color: "hsl(var(--pixel-green))" }}>
              {sessionPromises.length} promise{sessionPromises.length > 1 ? "s" : ""} you chose ✓
            </div>
            {sessionPromises.map((p, i) => (
              <div
                key={i}
                className="font-hand leading-snug"
                style={{ fontSize: "13px", color: "hsl(var(--blush-deep))" }}
              >
                ♡ {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky notes */}
      <div className="flex flex-wrap gap-4 items-start" style={{ marginLeft: "4px" }}>
        {PROMISES.map((p) => (
          <StickyNote key={p.id} promise={p} onClick={() => { setActivePromise(p); setAnswer(null); }} />
        ))}
      </div>

      {/* Promise modal */}
      {activePromise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "hsl(240 30% 5% / 0.82)", backdropFilter: "blur(5px)" }}
          onClick={() => { setActivePromise(null); setAnswer(null); }}
        >
          <div
            className="sticky-note animate-wobble-in"
            style={{
              background: activePromise.color,
              maxWidth: "340px",
              width: "100%",
              padding: "30px 24px 24px",
              cursor: "default",
              boxShadow: "var(--shadow-polaroid)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tape */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-6 opacity-65 rounded-sm"
              style={{ background: "hsl(48, 65%, 62%)" }}
            />

            <div
              className="font-serif italic leading-snug mb-5 text-center"
              style={{ fontSize: "20px", color: "hsl(20 25% 10%)" }}
            >
              "I promise {activePromise.text}"
            </div>

            {answer === null ? (
              <div>
                <p
                  className="text-center mb-4"
                  style={{ fontSize: "13px", color: "hsl(20 25% 35%)" }}
                >
                  do you keep this forever?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={(e) => handleAnswer("yes", e)}
                    className="px-6 py-2.5 rounded border transition-all hover:scale-105 font-mono"
                    style={{
                      fontSize: "13px",
                      background: "hsl(340 65% 50%)",
                      borderColor: "hsl(340 65% 38%)",
                      color: "white",
                      boxShadow: "0 4px 14px hsl(340 65% 40% / 0.5)",
                    }}
                  >
                    yes ♡
                  </button>
                  <button
                    onClick={(e) => handleAnswer("no", e)}
                    className="px-5 py-2.5 rounded border transition-all hover:scale-105 font-mono"
                    style={{
                      fontSize: "13px",
                      background: "transparent",
                      borderColor: "hsl(20 20% 60%)",
                      color: "hsl(20 25% 35%)",
                    }}
                  >
                    not sure
                  </button>
                </div>
              </div>
            ) : answer === "yes" ? (
              <div className="text-center animate-fade-in-up">
                <div className="text-4xl animate-heart-bloom">✨</div>
                <p className="font-hand mt-3" style={{ fontSize: "22px", color: "hsl(340 70% 40%)" }}>
                  I'll hold you to it. ♡
                </p>
              </div>
            ) : (
              <div className="text-center animate-fade-in-up">
                <p className="font-serif italic" style={{ fontSize: "14px", color: "hsl(20 20% 40%)" }}>
                  I appreciate your honesty…
                </p>
                <p className="font-hand mt-2" style={{ fontSize: "20px", color: "hsl(340 70% 40%)" }}>
                  I still choose you.
                </p>
              </div>
            )}

            <button
              onClick={() => { setActivePromise(null); setAnswer(null); }}
              className="mt-5 w-full text-center transition-colors"
              style={{ fontSize: "11px", color: "hsl(20 20% 45%)" }}
            >
              close ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-right text-muted-foreground px-2" style={{ fontSize: "10px" }}>
        these aren't promises made lightly. ♡
      </div>
    </div>
  );
};

export default PagePromises;

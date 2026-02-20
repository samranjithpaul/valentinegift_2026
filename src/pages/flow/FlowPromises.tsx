import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PromiseItem {
  id: number;
  text: string;
  color: string;
  rotate: number;
  offsetX: number;
}

const PROMISES: PromiseItem[] = [
  { id: 1, text: "to always tell you when I'm scared", color: "hsl(52, 88%, 82%)", rotate: -2, offsetX: 0 },
  { id: 2, text: "to show up, even when it's hard", color: "hsl(190, 55%, 84%)", rotate: 1.5, offsetX: 10 },
  { id: 3, text: "to choose you in the quiet moments too", color: "hsl(340, 55%, 88%)", rotate: -1, offsetX: -5 },
  { id: 4, text: "to listen before I speak", color: "hsl(280, 35%, 86%)", rotate: 3, offsetX: 14 },
  { id: 5, text: "to keep growing, even when it's uncomfortable", color: "hsl(20, 70%, 87%)", rotate: -2.5, offsetX: 3 },
  { id: 6, text: "to never insult you in front of others", color: "hsl(52, 88%, 82%)", rotate: 1, offsetX: -10 },
];


interface ConfettiParticle { id: number; x: number; y: number; emoji: string; angle: number; dist: number; }

const StickyNote = ({
  promise,
  selected,
  onClick,
  index,
}: {
  promise: PromiseItem;
  selected: boolean;
  onClick: () => void;
  index: number;
}) => (
  <div
    className="cursor-pointer relative"
    onClick={onClick}
    style={{
      background: promise.color,
      padding: "18px 16px 16px",
      boxShadow: selected
        ? "3px 5px 20px hsl(340 50% 30% / 0.35), 0 0 0 2.5px hsl(340 70% 45%)"
        : "3px 5px 18px hsl(20 30% 30% / 0.18)",
      fontFamily: "'Caveat', cursive",
      position: "relative",
      minHeight: "110px",
      minWidth: "150px",
      maxWidth: "200px",
      flex: "1 1 148px",
      transform: `rotate(${promise.rotate}deg) ${selected ? "scale(1.06)" : ""}`,
      marginLeft: `${promise.offsetX}px`,
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      animation: `promises-note-appear 0.5s ease-out ${index * 0.08}s both`,
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform = `rotate(${promise.rotate * 0.3}deg) scale(1.08) translateY(-4px)`;
      el.style.animation = `promises-note-wiggle 0.4s ease-in-out`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform = `rotate(${promise.rotate}deg) ${selected ? "scale(1.06)" : ""}`;
      el.style.animation = "none";
    }}
  >
    {/* Tape */}
    <div
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 rounded-sm"
      style={{ background: "hsl(48, 65%, 62%)", opacity: 0.7 }}
    />
    <div className="leading-snug pt-2" style={{ fontSize: "16px", color: "hsl(20 25% 12%)" }}>
      {promise.text}
    </div>
    <div className="mt-3 text-right opacity-50" style={{ fontSize: "11px", color: "hsl(20 25% 12%)" }}>
      {selected ? "✓ chosen" : "tap ♡"}
    </div>
  </div>
);

const FlowPromises = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activePromise, setActivePromise] = useState<PromiseItem | null>(null);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const spawnHeartConfetti = (x: number, y: number) => {
    const particles: ConfettiParticle[] = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      emoji: ["💕", "♡", "💗", "💖", "✨", "🌸"][Math.floor(Math.random() * 6)],
      angle: (i / 24) * 360 + Math.random() * 15,
      dist: Math.random() * 80 + 40,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 1800);
  };

  const handleTap = (promise: PromiseItem) => {
    setActivePromise(promise);
    setAnswer(null);
  };

  const handleAnswer = (ans: "yes" | "no", e: React.MouseEvent) => {
    setAnswer(ans);
    if (ans === "yes") {
      const newSet = new Set(selected);
      newSet.add(activePromise!.id);
      setSelected(newSet);
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      spawnHeartConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const handleContinue = () => {
    const chosenTexts = PROMISES.filter((p) => selected.has(p.id)).map((p) => p.text);
    sessionStorage.setItem("promises", JSON.stringify(chosenTexts));
    navigate("/flow/bemine");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative px-4 py-8 overflow-hidden"
      style={{
        background: "linear-gradient(170deg, hsl(345 30% 90%) 0%, hsl(350 25% 87%) 50%, hsl(340 20% 84%) 100%)",
      }}
    >
      {/* Paper texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Heart confetti burst */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.dist;
            const ty = Math.sin(rad) * p.dist;
            return (
              <div
                key={p.id}
                className="absolute text-lg"
                style={{
                  left: p.x,
                  top: p.y,
                  ["--heart-tx" as string]: `${tx}px`,
                  ["--heart-ty" as string]: `${ty}px`,
                  animation: "promises-heart-burst 1.4s ease-out forwards",
                }}
              >
                {p.emoji}
              </div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div
          style={{
            background: "hsl(350 30% 97%)",
            border: "1.5px solid hsl(345 25% 80%)",
            borderRadius: "4px",
            boxShadow: "0 6px 24px hsl(340 30% 30% / 0.12)",
            padding: "14px 18px",
            transform: "rotate(0.3deg)",
            animation: "fade-in-up 0.5s ease-out both",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              textTransform: "uppercase",
              color: "hsl(340 55% 45%)",
              padding: "5px 10px",
              background: "hsl(340 40% 92%)",
              borderBottom: "1px solid hsl(345 25% 80%)",
              margin: "-14px -18px 12px",
              borderRadius: "3px 3px 0 0",
            }}
          >
            🌸 i promise to…
          </div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "hsl(340 55% 45%)", marginTop: "4px" }}>
            tap any note. hold me to it.
          </p>
          {selected.size > 0 && (
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "hsl(150 50% 38%)", marginTop: "6px" }}>
              {selected.size} promise{selected.size > 1 ? "s" : ""} chosen ✓
            </p>
          )}
        </div>

        {/* Sticky notes */}
        <div className="flex flex-wrap gap-4 items-start" style={{ marginLeft: "4px" }}>
          {PROMISES.map((p, i) => (
            <StickyNote
              key={p.id}
              promise={p}
              selected={selected.has(p.id)}
              onClick={() => handleTap(p)}
              index={i}
            />
          ))}
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "15px",
            padding: "16px",
            borderRadius: "4px",
            border: "none",
            background: "hsl(340 60% 48%)",
            color: "white",
            boxShadow: "0 4px 20px hsl(340 60% 45% / 0.35)",
            cursor: "pointer",
            transition: "transform 0.2s",
            animation: "fade-in-up 0.6s ease-out 0.5s both",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {selected.size > 0
            ? `continue with ${selected.size} promise${selected.size > 1 ? "s" : ""} →`
            : "continue →"}
        </button>

        <div className="text-center" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "5px", color: "hsl(340 20% 60%)" }}>
          step 3 of 4 ✦ promises
        </div>
      </div>

      {/* Promise modal */}
      {activePromise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "hsl(340 25% 8% / 0.8)", backdropFilter: "blur(6px)" }}
          onClick={() => { setActivePromise(null); setAnswer(null); }}
        >
          <div
            className="relative"
            style={{
              background: activePromise.color,
              maxWidth: "320px",
              width: "100%",
              padding: "30px 24px 24px",
              cursor: "default",
              boxShadow: "4px 8px 30px hsl(20 30% 20% / 0.35)",
              animation: "promises-modal-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 opacity-65 rounded-sm"
              style={{ background: "hsl(48, 65%, 62%)" }}
            />
            <div
              className="leading-snug mb-5 text-center"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "18px", color: "hsl(20 25% 10%)" }}
            >
              "I promise {activePromise.text}"
            </div>

            {answer === null ? (
              <div>
                <p className="text-center mb-4" style={{ fontSize: "13px", color: "hsl(20 25% 35%)" }}>
                  do you keep this forever?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={(e) => handleAnswer("yes", e)}
                    className="px-6 py-2.5 rounded border transition-all font-mono"
                    style={{
                      fontSize: "13px",
                      background: "hsl(340 65% 50%)",
                      borderColor: "hsl(340 65% 38%)",
                      color: "white",
                      boxShadow: "0 4px 14px hsl(340 65% 40% / 0.5)",
                      cursor: "pointer",
                      transition: "transform 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    yes ♡
                  </button>
                  <button
                    onClick={(e) => handleAnswer("no", e)}
                    className="px-5 py-2.5 rounded border transition-all font-mono"
                    style={{
                      fontSize: "13px",
                      background: "transparent",
                      borderColor: "hsl(20 20% 60%)",
                      color: "hsl(20 25% 35%)",
                      cursor: "pointer",
                    }}
                  >
                    not sure
                  </button>
                </div>
              </div>
            ) : answer === "yes" ? (
              <div className="text-center" style={{ animation: "fade-in-up 0.4s ease-out forwards" }}>
                <div className="text-3xl" style={{ animation: "heart-bloom 0.5s ease-out forwards" }}>✨</div>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: "hsl(340 70% 40%)", marginTop: "12px" }}>
                  I'll hold you to it. ♡
                </p>
              </div>
            ) : (
              <div className="text-center" style={{ animation: "fade-in-up 0.4s ease-out forwards" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "14px", color: "hsl(20 20% 40%)" }}>
                  I appreciate your honesty…
                </p>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "hsl(340 70% 40%)", marginTop: "8px" }}>
                  I still choose you.
                </p>
              </div>
            )}

            <button
              onClick={() => { setActivePromise(null); setAnswer(null); }}
              className="mt-5 w-full text-center"
              style={{ fontSize: "11px", color: "hsl(20 20% 45%)", cursor: "pointer", background: "none", border: "none" }}
            >
              close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowPromises;

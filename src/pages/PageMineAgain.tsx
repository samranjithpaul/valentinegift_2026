import { useState, useEffect } from "react";

interface LightParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

type Theme = "midnight" | "scrapbook";

const PageMineAgain = ({ beMineStatus = "", theme = "scrapbook" }: { beMineStatus?: string; theme?: Theme }) => {
  // If beMineStatus is already "yes" from sessionStorage, lock interaction
  const alreadyYes = beMineStatus === "yes";
  const [answer, setAnswer] = useState<"none" | "yes" | "no">(alreadyYes ? "yes" : "none");
  const [noShifts, setNoShifts] = useState(0);
  const [particles, setParticles] = useState<LightParticle[]>([]);
  const [showText, setShowText] = useState(alreadyYes);
  const [showSignature, setShowSignature] = useState(alreadyYes);
  const [signatureProgress, setSignatureProgress] = useState(alreadyYes ? 100 : 0);

  const handleYes = () => {
    setAnswer("yes");
    sessionStorage.setItem("beMineStatus", "yes");
    const newParticles: LightParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 1.2,
      duration: Math.random() * 2.5 + 2,
      drift: (Math.random() - 0.5) * 80,
    }));
    setParticles(newParticles);
    setTimeout(() => setShowText(true), 1200);
    setTimeout(() => setShowSignature(true), 2600);
  };

  const handleNo = () => {
    setNoShifts((prev) => prev + 1);
  };

  useEffect(() => {
    if (showSignature && !alreadyYes) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1.5;
        setSignatureProgress(Math.min(progress, 100));
        if (progress >= 100) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showSignature, alreadyYes]);

  const noStyle =
    noShifts > 0
      ? {
          transform: `translate(${(noShifts % 2 === 0 ? 1 : -1) * 22}px, ${noShifts * 4}px) rotate(${noShifts * 1.5}deg)`,
          transition: "transform 0.3s ease-out",
          opacity: Math.max(0.3, 1 - noShifts * 0.18),
        }
      : {};

  const isScrapbook = theme === "scrapbook";

  return (
    <div
      className="flex flex-col gap-6 relative min-h-[70vh]"
      style={{
        transition: "all 1.2s ease",
        filter: answer === "yes" && !isScrapbook ? "brightness(0.85)" : "none",
      }}
    >
      {/* Light particles on YES */}
      {answer === "yes" && !alreadyYes && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                bottom: "15%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: isScrapbook
                  ? "radial-gradient(circle, hsl(350 85% 85%), hsl(350 75% 68%))"
                  : "radial-gradient(circle, hsl(340 80% 80%), hsl(340 70% 65%))",
                boxShadow: isScrapbook
                  ? `0 0 ${p.size * 2}px hsl(350 80% 65% / 0.5)`
                  : `0 0 ${p.size * 2}px hsl(340 80% 70% / 0.6)`,
                animation: `light-particle ${p.duration}s ease-out ${p.delay}s forwards`,
                ["--drift" as string]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div
        className="panel"
        style={{
          transform: "rotate(-0.5deg)",
          transition: "all 1.2s ease",
          background: answer === "yes"
            ? isScrapbook
              ? "hsl(350 50% 96%)"
              : "hsl(340 40% 16%)"
            : undefined,
        }}
      >
        <div className="panel-title">🌙 will you be mine again?</div>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
          no pressure. just honesty.
        </p>
        {alreadyYes && (
          <div
            className="mt-2 font-pixel animate-gentle-pulse"
            style={{ fontSize: "7px", color: "hsl(var(--pixel-green))" }}
          >
            ✓ you said yes ♡
            
          </div>
        )}
      </div>

      {/* MAIN CARD */}
      <div
        className="panel text-center"
        style={{
          padding: "52px 40px",
          transform: "rotate(0.6deg)",
          marginLeft: "4px",
          marginRight: "8px",
          transition: "all 1s ease",
          background: answer === "yes"
            ? isScrapbook
              ? "hsl(350 45% 97%)"
              : "hsl(340 35% 14%)"
            : undefined,
          boxShadow: answer === "yes" ? "var(--glow-rose), var(--shadow-panel)" : undefined,
        }}
      >
        {answer === "none" && (
          <div className="animate-fade-in-up">
            <div
              className="font-serif italic leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 5vw, 38px)", color: "hsl(var(--foreground))" }}
            >
              will you be mine again?
            </div>
            <div
              className="font-hand mb-10 max-w-xs mx-auto"
              style={{ fontSize: "17px", color: "hsl(var(--muted-foreground))" }}
            >
              not because I need you to.<br />
              because I want to choose this.
            </div>

            <div className="flex gap-5 justify-center items-center flex-wrap">
              <button
                onClick={handleYes}
                className="btn-yes px-10 py-4 rounded transition-all active:scale-95"
                style={{ fontSize: "16px", borderRadius: "6px" }}
              >
                yes, always ♡
              </button>
              <button
                onClick={handleNo}
                className="px-7 py-4 rounded border transition-all"
                style={{
                  fontSize: "14px",
                  background: "transparent",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--muted-foreground))",
                  borderRadius: "6px",
                  ...noStyle,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {noShifts === 0 ? "not yet" : noShifts === 1 ? "hmm…" : "wait…"}
              </button>
            </div>
          </div>
        )}

        {answer === "yes" && (
          <div className="animate-fade-in-up flex flex-col items-center gap-4">
            <div className="text-7xl animate-heart-bloom" style={{ filter: "drop-shadow(var(--glow-rose))" }}>
              💕
            </div>

            {showText && (
              <div
                className="animate-fade-in-up font-serif italic leading-snug"
                style={{ fontSize: "clamp(20px, 4vw, 28px)", color: "hsl(var(--rose))" }}
              >
                I choose you too.
              </div>
            )}

            {showText && (
              <div
                className="animate-fade-in-up font-hand"
                style={{ fontSize: "17px", color: "hsl(var(--muted-foreground))", animationDelay: "0.3s" }}
              >
                I won't waste it.
              </div>
            )}

            {showSignature && (
              <div
                className="font-hand"
                style={{
                  fontSize: "28px",
                  color: "hsl(var(--blush-deep))",
                  overflow: "hidden",
                  maxWidth: `${signatureProgress}%`,
                  whiteSpace: "nowrap",
                  transition: "max-width 0.025s linear",
                  marginTop: "8px",
                }}
              >
                — always yours ♡
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quote panel */}
      <div
        className="diary-panel relative"
        style={{ transform: "rotate(-0.6deg)", marginRight: "4px" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(340 50% 70%) 27px, hsl(340 50% 70%) 28px)",
            backgroundPositionY: "10px",
          }}
        />
        <div className="pl-10 font-mono leading-relaxed" style={{ fontSize: "13px", color: "hsl(var(--ink))" }}>
          <p className="italic mb-3">
            "choosing you isn't something I do once.<br />
            it's something I decide every day."
          </p>
          <div className="text-right font-hand" style={{ fontSize: "16px", color: "hsl(var(--rose))" }}>
            — belated valentine, 2026
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center text-muted-foreground" style={{ fontSize: "10px" }}>
        tap the footer 5 times for a secret ♡
      </div>
    </div>
  );
};

export default PageMineAgain;

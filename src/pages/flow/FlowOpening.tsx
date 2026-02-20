import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Typewriter with glowing cursor ─── */
const TypewriterText = ({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onDone?.();
      return;
    }
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 60);
    return () => clearTimeout(t);
  }, [started, displayed, text, onDone]);

  return (
    <span className={`transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}>
      {displayed}
      {!done && started && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            marginLeft: "3px",
            background: "hsl(340 80% 65%)",
            boxShadow: "0 0 8px hsl(340 80% 65% / 0.8)",
            animation: "opening-cursor-blink 0.8s step-end infinite",
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </span>
  );
};

/* ─── Dust particles unique to opening ─── */
const DustParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 6,
        drift: (Math.random() - 0.5) * 40,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "hsl(40 30% 80% / 0.35)",
            animation: `opening-dust ${p.duration}s ease-in-out ${p.delay}s infinite`,
            ["--dust-drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Parallax starfield unique to opening ─── */
const PixelStarfield = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        layer: Math.floor(Math.random() * 3), // 0=far, 1=mid, 2=near
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.layer === 2 ? "hsl(200 60% 90%)" : s.layer === 1 ? "hsl(220 40% 80%)" : "hsl(240 20% 65%)",
            opacity: s.layer === 2 ? 0.9 : s.layer === 1 ? 0.5 : 0.25,
            animation: `opening-star-pulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
            transform: `scale(${s.layer === 2 ? 1 : s.layer === 1 ? 0.7 : 0.4})`,
          }}
        />
      ))}
    </div>
  );
};

const FlowOpening = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #08080f 0%, #0d0d1a 40%, #121220 100%)",
      }}
    >
      {/* CRT grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px 150px",
          mixBlendMode: "overlay",
        }}
      />
      {/* CRT scanlines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 49,
          opacity: 0.03,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      <PixelStarfield />
      <DustParticles />

      <div className="relative z-10 text-center max-w-md px-6">
        <div
          className="leading-relaxed"
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "clamp(22px, 5vw, 32px)",
            color: "hsl(340 75% 70%)",
            textShadow: "0 0 18px hsl(340 80% 60% / 0.4), 0 0 40px hsl(340 80% 60% / 0.15)",
          }}
        >
          <div className="mb-4">
            <TypewriterText text="who's there?" delay={800} onDone={() => setPhase(1)} />
          </div>
          {phase >= 1 && (
            <div
              className="mb-4"
              style={{
                fontSize: "clamp(15px, 3.5vw, 20px)",
                color: "hsl(270 40% 70%)",
                textShadow: "0 0 12px hsl(270 50% 60% / 0.3)",
              }}
            >
              <TypewriterText text="…knock knock." delay={600} onDone={() => setPhase(2)} />
            </div>
          )}
          {phase >= 2 && (
            <div
              style={{
                fontSize: "clamp(13px, 3vw, 16px)",
                color: "hsl(220 25% 55%)",
                textShadow: "none",
              }}
            >
              <TypewriterText text="enter if you know the word." delay={700} onDone={() => setShowButton(true)} />
            </div>
          )}
        </div>

        {showButton && (
          <button
            onClick={() => navigate("/flow/password")}
            className="mt-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "15px",
              padding: "14px 44px",
              borderRadius: "4px",
              border: "none",
              background: "hsl(340 70% 55%)",
              color: "white",
              boxShadow: "0 4px 24px hsl(340 70% 55% / 0.5), 0 0 50px hsl(340 70% 55% / 0.2)",
              animation: "opening-btn-glow 3s ease-in-out infinite, fade-in-up 0.65s ease-out forwards",
              cursor: "pointer",
            }}
          >
            enter ♡
          </button>
        )}

        <div
          className="mt-10"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "6px",
            color: "hsl(240 20% 35%)",
            animation: "opening-cursor-blink 1.5s step-end infinite",
          }}
        >
          ■ ■ ■
        </div>
      </div>
    </div>
  );
};

export default FlowOpening;

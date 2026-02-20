import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface PixelHeart { id: number; x: number; size: number; delay: number; duration: number; }

const FlowBemine = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<"none" | "yes" | "no">("none");
  const [noShifts, setNoShifts] = useState(0);
  const [noDrift, setNoDrift] = useState({ x: 0, y: 0 });
  const [pixelHearts, setPixelHearts] = useState<PixelHeart[]>([]);
  const [showText, setShowText] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [signatureProgress, setSignatureProgress] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleYes = () => {
    setAnswer("yes");
    sessionStorage.setItem("beMineStatus", "yes");
    // Pixel heart burst
    const hearts: PixelHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      delay: Math.random() * 1,
      duration: Math.random() * 2 + 2,
    }));
    setPixelHearts(hearts);
    setTimeout(() => setShowText(true), 1200);
    setTimeout(() => setShowSignature(true), 2600);
    setTimeout(() => setShowContinue(true), 4000);
  };

  const handleNo = () => {
    const shift = noShifts + 1;
    setNoShifts(shift);
    sessionStorage.setItem("beMineStatus", "no");
    // Random drift
    setNoDrift({
      x: (Math.random() - 0.5) * 60,
      y: Math.random() * 20 + 5,
    });
  };

  const handleContinueToMain = () => {
    setFadeOut(true);
    setTimeout(() => navigate("/"), 600);
  };

  useEffect(() => {
    if (showSignature) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1.5;
        setSignatureProgress(Math.min(progress, 100));
        if (progress >= 100) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showSignature]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-10 overflow-hidden"
      style={{
        background: answer === "yes"
          ? "radial-gradient(ellipse at 50% 40%, hsl(340 35% 22%) 0%, hsl(340 25% 12%) 60%, hsl(340 20% 8%) 100%)"
          : "radial-gradient(ellipse at 50% 40%, hsl(340 40% 88%) 0%, hsl(345 35% 82%) 50%, hsl(350 30% 76%) 100%)",
        transition: "background 1.5s ease",
        opacity: fadeOut ? 0 : 1,
        transitionProperty: "background, opacity",
        transitionDuration: "1.5s, 0.6s",
      }}
    >
      {/* Radial glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: answer === "yes"
            ? "radial-gradient(circle, hsl(340 70% 50% / 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(340 60% 70% / 0.2) 0%, transparent 70%)",
          transition: "background 1.5s ease",
        }}
      />

      {/* Pixel hearts on YES */}
      {pixelHearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {pixelHearts.map((h) => (
            <div
              key={h.id}
              className="absolute"
              style={{
                left: `${h.x}%`,
                bottom: "10%",
                fontSize: `${h.size}px`,
                animation: `bemine-heart-rise ${h.duration}s ease-out ${h.delay}s forwards`,
                opacity: 0,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-5 max-w-sm mx-auto w-full">
        {/* Header */}
        <div
          style={{
            background: answer === "yes" ? "hsl(340 30% 18% / 0.9)" : "hsl(350 30% 97%)",
            border: `1.5px solid ${answer === "yes" ? "hsl(340 30% 30%)" : "hsl(345 25% 80%)"}`,
            borderRadius: "4px",
            boxShadow: answer === "yes"
              ? "0 0 30px hsl(340 60% 50% / 0.2), 0 6px 24px hsl(0 0% 0% / 0.3)"
              : "0 6px 24px hsl(340 30% 30% / 0.1)",
            padding: "14px 18px",
            transform: "rotate(-0.5deg)",
            transition: "all 1.2s ease",
            animation: "fade-in-up 0.5s ease-out both",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              textTransform: "uppercase",
              color: answer === "yes" ? "hsl(340 60% 70%)" : "hsl(340 55% 45%)",
              padding: "5px 10px",
              background: answer === "yes" ? "hsl(340 40% 22%)" : "hsl(340 40% 92%)",
              borderBottom: `1px solid ${answer === "yes" ? "hsl(340 30% 30%)" : "hsl(345 25% 80%)"}`,
              margin: "-14px -18px 12px",
              borderRadius: "3px 3px 0 0",
              transition: "all 1.2s ease",
            }}
          >
            🌙 be mine again?
          </div>
          <p style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "12px",
            color: answer === "yes" ? "hsl(340 20% 55%)" : "hsl(340 15% 50%)",
            transition: "color 1.2s ease",
          }}>
            no pressure. just honesty.
          </p>
        </div>

        {/* Main card — glowing border */}
        <div
          className="text-center"
          style={{
            background: answer === "yes" ? "hsl(340 28% 14% / 0.95)" : "hsl(350 30% 97%)",
            border: `1.5px solid ${answer === "yes" ? "hsl(340 50% 40%)" : "hsl(345 25% 80%)"}`,
            borderRadius: "4px",
            padding: "52px 36px",
            transform: "rotate(0.5deg)",
            transition: "all 1.2s ease",
            boxShadow: answer === "yes"
              ? "0 0 40px hsl(340 60% 50% / 0.25), 0 0 80px hsl(340 60% 50% / 0.1), 0 8px 32px hsl(0 0% 0% / 0.4)"
              : "0 6px 24px hsl(340 30% 30% / 0.1)",
            animation: "bemine-card-appear 0.7s ease-out both",
          }}
        >
          {answer === "none" && (
            <div style={{ animation: "fade-in-up 0.5s ease-out both" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(26px, 5vw, 38px)",
                  color: "hsl(340 40% 25%)",
                  lineHeight: 1.2,
                  marginBottom: "12px",
                }}
              >
                will you be mine again?
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "17px",
                  color: "hsl(340 20% 45%)",
                  marginBottom: "40px",
                  maxWidth: "280px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                not because I need you to.<br />
                because I want to choose this.
              </div>

              <div className="flex gap-5 justify-center items-center flex-wrap">
                {/* YES — pulse glow */}
                <button
                  onClick={handleYes}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "16px",
                    padding: "14px 40px",
                    borderRadius: "6px",
                    border: "none",
                    background: "hsl(340 65% 50%)",
                    color: "white",
                    boxShadow: "0 4px 24px hsl(340 65% 50% / 0.5), 0 0 40px hsl(340 65% 50% / 0.2)",
                    cursor: "pointer",
                    animation: "bemine-yes-pulse 3s ease-in-out infinite",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                    e.currentTarget.style.boxShadow = "0 6px 32px hsl(340 65% 50% / 0.65), 0 0 60px hsl(340 65% 50% / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 24px hsl(340 65% 50% / 0.5), 0 0 40px hsl(340 65% 50% / 0.2)";
                  }}
                >
                  yes, always ♡
                </button>

                {/* NO — random drift */}
                <button
                  onClick={handleNo}
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "14px",
                    padding: "14px 28px",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "1.5px solid hsl(340 20% 70%)",
                    color: "hsl(340 15% 45%)",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    transform: noShifts > 0 ? `translate(${noDrift.x}px, ${noDrift.y}px) rotate(${noShifts * 2}deg)` : "none",
                    opacity: Math.max(0.25, 1 - noShifts * 0.2),
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                  }}
                >
                  {noShifts === 0 ? "not yet" : noShifts === 1 ? "hmm…" : noShifts === 2 ? "wait…" : "…"}
                </button>
              </div>
            </div>
          )}

          {answer === "yes" && (
            <div className="flex flex-col items-center gap-4" style={{ animation: "fade-in-up 0.6s ease-out forwards" }}>
              <div style={{ fontSize: "70px", animation: "heart-bloom 0.55s ease-out forwards", filter: "drop-shadow(0 0 20px hsl(340 70% 60% / 0.5))" }}>
                💕
              </div>
              {showText && (
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 4vw, 30px)",
                    color: "hsl(340 65% 70%)",
                    textShadow: "0 0 16px hsl(340 60% 60% / 0.3)",
                    animation: "fade-in-up 0.5s ease-out forwards",
                  }}
                >
                  I choose you too.
                </div>
              )}
              {showText && (
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "17px",
                    color: "hsl(340 25% 55%)",
                    animation: "fade-in-up 0.5s ease-out 0.3s both",
                  }}
                >
                  I won't waste it.
                </div>
              )}
              {showSignature && (
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "28px",
                    color: "hsl(340 55% 65%)",
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

        {/* Still choose you text */}
        {answer === "none" && noShifts > 0 && (
          <div
            className="text-center"
            style={{
              background: "hsl(350 30% 97%)",
              border: "1.5px solid hsl(345 25% 80%)",
              borderRadius: "4px",
              padding: "16px",
              boxShadow: "0 4px 16px hsl(340 30% 30% / 0.08)",
              transform: "rotate(-0.4deg)",
              animation: "fade-in-up 0.4s ease-out forwards",
            }}
          >
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "hsl(340 20% 50%)" }}>
              that's okay.<br />
              <span style={{ color: "hsl(340 55% 45%)" }}>I still choose you.</span>
            </div>
            <button
              onClick={() => {
                sessionStorage.setItem("beMineStatus", "no");
                navigate("/");
              }}
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "11px",
                color: "hsl(340 15% 50%)",
                textDecoration: "underline",
                marginTop: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              continue to the letter anyway →
            </button>
          </div>
        )}

        {/* Continue after YES */}
        {showContinue && (
          <button
            onClick={handleContinueToMain}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "15px",
              padding: "16px",
              borderRadius: "6px",
              border: "none",
              background: "hsl(340 55% 50%)",
              color: "white",
              boxShadow: "0 4px 20px hsl(340 55% 50% / 0.4)",
              cursor: "pointer",
              animation: "fade-in-up 0.5s ease-out forwards",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            enter our little corner ♡
          </button>
        )}

        <div className="text-center" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "5px", color: answer === "yes" ? "hsl(340 20% 35%)" : "hsl(340 15% 55%)", transition: "color 1.2s ease" }}>
          step 4 of 4 ✦ be mine
        </div>
      </div>
    </div>
  );
};

export default FlowBemine;

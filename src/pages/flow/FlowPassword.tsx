import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_PASSWORD = "sarang2026";


const FlowPassword = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [heartFlash, setHeartFlash] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 4,
      })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.toLowerCase().trim() === CORRECT_PASSWORD) {
      setSuccess(true);
      setHeartFlash(true);
      setTimeout(() => navigate("/flow/personalize"), 1200);
    } else {
      setError(true);
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #0f0f1e 50%, #14142a 100%)",
      }}
    >
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 49,
          opacity: 0.025,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
        }}
      />

      {/* Stars */}
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
              background: "hsl(210 50% 85%)",
              animation: `opening-star-pulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Heart flash on success */}
      {heartFlash && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 60 }}
        >
          <div
            style={{
              fontSize: "80px",
              animation: "password-heart-flash 1s ease-out forwards",
              filter: "drop-shadow(0 0 30px hsl(340 80% 60% / 0.8))",
            }}
          >
            💕
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-sm">
        <div
          style={{
            background: "hsl(240 30% 10% / 0.85)",
            border: "1.5px solid hsl(240 20% 22%)",
            borderRadius: "4px",
            boxShadow: "0 8px 40px hsl(0 0% 0% / 0.6), 0 0 1px hsl(340 50% 40% / 0.3)",
            padding: "24px 28px",
            animation: shake ? "password-shake 0.4s ease" : "fade-in-up 0.65s ease-out forwards",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Lined paper overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.04,
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, hsl(340 50% 70%) 27px, hsl(340 50% 70%) 28px)",
              backgroundPositionY: "10px",
            }}
          />
          {/* Red margin line */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "38px", top: 0, bottom: 0, width: "1px", background: "hsl(340 60% 50% / 0.15)" }}
          />

          <div style={{ paddingLeft: "28px", position: "relative" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "22px",
                color: "hsl(340 70% 65%)",
                marginBottom: "20px",
                textShadow: "0 0 12px hsl(340 70% 60% / 0.3)",
              }}
            >
              ✦ password required
            </div>

            <p
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "13px",
                color: "hsl(40 25% 80%)",
                marginBottom: "24px",
                lineHeight: 1.7,
              }}
            >
              this is a private letter.<br />
              you'll know the word if it's meant for you.
            </p>

            {success ? (
              <div
                className="text-center"
                style={{
                  fontSize: "28px",
                  color: "hsl(340 70% 65%)",
                  textShadow: "0 0 20px hsl(340 70% 60% / 0.5)",
                  animation: "fade-in-up 0.5s ease-out forwards",
                }}
              >
                ♡ welcome.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  ref={inputRef}
                  type="password"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(false); }}
                  placeholder="enter the word…"
                  autoFocus
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "14px",
                    border: `1.5px solid ${error ? "hsl(340 70% 55%)" : "hsl(240 20% 25%)"}`,
                    borderRadius: "4px",
                    padding: "12px 16px",
                    background: "hsl(240 25% 8% / 0.6)",
                    color: "hsl(40 25% 88%)",
                    outline: "none",
                    width: "100%",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    boxShadow: error ? "0 0 12px hsl(340 70% 50% / 0.3)" : "none",
                  }}
                  onFocus={(e) => {
                    if (!error) e.currentTarget.style.borderColor = "hsl(340 50% 45%)";
                  }}
                  onBlur={(e) => {
                    if (!error) e.currentTarget.style.borderColor = "hsl(240 20% 25%)";
                  }}
                />

                {error && (
                  <div
                    className="text-center"
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: "12px",
                      color: "hsl(340 70% 60%)",
                      animation: "fade-in-up 0.3s ease-out forwards",
                    }}
                  >
                    hmm… that's not it. try again.
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "13px",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "none",
                    background: "hsl(340 70% 50%)",
                    color: "white",
                    boxShadow: "0 4px 20px hsl(340 70% 50% / 0.4)",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 28px hsl(340 70% 50% / 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px hsl(340 70% 50% / 0.4)";
                  }}
                >
                  enter ♡
                </button>
              </form>
            )}
          </div>
        </div>

        <div
          className="text-center mt-6"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "5px",
            color: "hsl(240 15% 30%)",
            animation: "opening-cursor-blink 1.5s step-end infinite",
          }}
        >
          PRIVATE ✦ DO NOT ENTER
        </div>
      </div>
    </div>
  );
};

export default FlowPassword;

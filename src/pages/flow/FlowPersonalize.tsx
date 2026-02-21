import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_DATE = "2022-07-26";

const FlowPersonalize = () => {
  const navigate = useNavigate();
  const [yourName, setYourName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dateWarn, setDateWarn] = useState(false);
  const [nameWarn, setNameWarn] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  // Staggered slide-in
  useState(() => {
    setTimeout(() => setHeaderVisible(true), 200);
    setTimeout(() => setFormVisible(true), 500);
  });

  const handleContinue = () => {
    let hasError = false;

    if (!yourName.trim()) {
      setNameWarn(true);
      hasError = true;
    } else {
      setNameWarn(false);
    }

    if (!startDate) {
      setDateWarn(true);
      hasError = true;
    } else {
      const selected = new Date(startDate);
      if (selected > new Date()) {
        setDateWarn(true);
        hasError = true;
      } else if (startDate !== CORRECT_DATE) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setShowReveal(true);
          return;
        }
        setDateWarn(true);
        hasError = true;
      } else {
        setDateWarn(false);
      }
    }

    if (hasError) return;

    sessionStorage.setItem("yourName", yourName.trim());
    sessionStorage.setItem("startDate", startDate);
    navigate("/flow/moments");
  };

  const handleRevealContinue = () => {
    setShowReveal(false);
    setStartDate(CORRECT_DATE);
    setDateWarn(false);
    sessionStorage.setItem("yourName", yourName.trim());
    sessionStorage.setItem("startDate", CORRECT_DATE);
    navigate("/flow/moments");
  };

  const panelStyle: React.CSSProperties = {
    background: "hsl(38 55% 96%)",
    border: "1.5px solid hsl(30 30% 78%)",
    borderRadius: "3px",
    boxShadow: "3px 5px 18px hsl(30 25% 40% / 0.18), -1px -1px 4px hsl(0 0% 0% / 0.04)",
    padding: "16px 18px",
  };

  const inputStyle = (warn: boolean): React.CSSProperties => ({
    fontFamily: "'Courier Prime', monospace",
    fontSize: "14px",
    border: `1.5px solid ${warn ? "hsl(350 70% 55%)" : "hsl(30 25% 75%)"}`,
    borderRadius: "3px",
    padding: "12px 16px",
    background: "hsl(38 40% 98%)",
    color: "hsl(20 25% 15%)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.2s",
    boxShadow: warn ? "0 0 8px hsl(350 60% 50% / 0.2)" : "inset 0 1px 3px hsl(30 20% 60% / 0.1)",
  });

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-10 overflow-hidden"
      style={{
        background: "linear-gradient(170deg, hsl(35 40% 90%) 0%, hsl(38 45% 88%) 40%, hsl(32 35% 85%) 100%)",
      }}
    >
      {/* Paper grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(hsl(30 20% 70%) 1px, transparent 1px), linear-gradient(90deg, hsl(30 20% 70%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-5">
        {/* Header — sticky note slide-in */}
        <div
          style={{
            ...panelStyle,
            transform: headerVisible ? "translateX(0) rotate(-0.5deg)" : "translateX(-120%) rotate(-3deg)",
            opacity: headerVisible ? 1 : 0,
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(350 65% 45%)",
              padding: "5px 10px",
              background: "hsl(350 60% 90%)",
              borderBottom: "1px solid hsl(30 25% 78%)",
              margin: "-16px -18px 14px",
              borderRadius: "2px 2px 0 0",
            }}
          >
            ✏ personalize
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "19px",
              color: "hsl(350 60% 42%)",
              marginTop: "4px",
            }}
          >
            before we begin…
          </div>
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "12px",
              color: "hsl(20 15% 50%)",
              marginTop: "6px",
            }}
          >
            let's make this yours.
          </p>
        </div>

        {/* Form — slide-in from right */}
        <div
          style={{
            ...panelStyle,
            transform: formVisible ? "translateX(0) rotate(0.3deg)" : "translateX(120%) rotate(3deg)",
            opacity: formVisible ? 1 : 0,
            transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
          }}
        >
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  color: "hsl(350 65% 45%)",
                }}
              >
                your name
              </label>
              <input
                value={yourName}
                onChange={(e) => { setYourName(e.target.value); setNameWarn(false); }}
                placeholder="what do they call you?"
                style={inputStyle(nameWarn)}
                onFocus={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 2px 12px hsl(350 50% 50% / 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = nameWarn ? "0 0 8px hsl(350 60% 50% / 0.2)" : "inset 0 1px 3px hsl(30 20% 60% / 0.1)";
                }}
              />
              {nameWarn && (
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "11px",
                    color: "hsl(350 70% 45%)",
                    animation: "personalize-note-pop 0.3s ease-out forwards",
                  }}
                >
                  tell me your name ♡
                </span>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  color: "hsl(350 65% 45%)",
                }}
              >
                when did it start?
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setDateWarn(false); }}
                style={inputStyle(dateWarn)}
                onFocus={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 2px 12px hsl(350 50% 50% / 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = dateWarn ? "0 0 8px hsl(350 60% 50% / 0.2)" : "inset 0 1px 3px hsl(30 20% 60% / 0.1)";
                }}
              />
              {dateWarn && (
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "11px",
                    color: "hsl(350 70% 45%)",
                    animation: "personalize-note-pop 0.3s ease-out forwards",
                  }}
                >
                  are you sure? try again.
                </span>
              )}
            </div>

            <button
              onClick={handleContinue}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "14px",
                padding: "12px",
                borderRadius: "3px",
                border: "none",
                background: "hsl(350 65% 48%)",
                color: "white",
                boxShadow: "0 3px 14px hsl(350 60% 45% / 0.35)",
                cursor: "pointer",
                marginTop: "6px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              continue ♡
            </button>
          </div>
        </div>

        <div
          className="text-center"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "5px",
            color: "hsl(20 15% 55%)",
          }}
        >
          step 1 of 4 ✦ personalize
        </div>
      </div>

      {/* Win98-style reveal modal */}
      {showReveal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-6"
          style={{
            zIndex: 60,
            background: "hsl(20 20% 15% / 0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "hsl(38 50% 95%)",
              border: "2px solid hsl(30 25% 70%)",
              borderTop: "24px solid hsl(220 50% 45%)",
              borderRadius: "3px",
              boxShadow: "4px 4px 0px hsl(20 20% 30% / 0.3), 0 8px 30px hsl(0 0% 0% / 0.3)",
              maxWidth: "340px",
              width: "100%",
              padding: "24px 20px",
              animation: "personalize-dialog-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Fake title bar text */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "8px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "5px",
                color: "white",
              }}
            >
              love.exe ♡
            </div>
            <div style={{ fontSize: "32px", marginBottom: "14px" }}>💕</div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "18px",
                color: "hsl(350 60% 42%)",
                lineHeight: 1.5,
              }}
            >
              it started on 26.07.2022 ♡
            </div>
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "16px",
                color: "hsl(20 15% 50%)",
                marginTop: "8px",
                marginBottom: "20px",
              }}
            >
              don't forget our beginning.
            </div>
            <button
              onClick={handleRevealContinue}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "13px",
                padding: "10px 28px",
                borderRadius: "2px",
                border: "1px solid hsl(30 25% 70%)",
                background: "hsl(38 40% 92%)",
                color: "hsl(20 25% 15%)",
                boxShadow: "2px 2px 0px hsl(20 15% 50% / 0.2)",
                cursor: "pointer",
              }}
            >
              I remember now ♡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowPersonalize;

import { useState, useEffect, useRef } from "react";
import { differenceInDays } from "date-fns";

const LINES = [
"hey my star…",
"I know I'm late.",
"But I never stopped choosing you."];


const TypewriterLine = ({
  text,
  onDone,
  delay = 0




}: {text: string;onDone?: () => void;delay?: number;}) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onDone?.();
      return;
      
    }
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 52);
    return () => clearTimeout(t);
  }, [started, displayed, text, onDone]);

  return (
    <span className={`block transition-opacity duration-300 ${started ? "opacity-100" : "opacity-0"}`}>
      {displayed}
      {!done && started &&
      <span className="animate-blink border-r-2 border-current ml-0.5">&nbsp;</span>
      }
    </span>);

};

interface PageValentineProps {
  yourName: string;
  herName: string;
  startDate: string;
  onNameChange: (yourName: string, herName: string, startDate: string) => void;
}

const PageValentine = ({ yourName, herName, startDate, onNameChange }: PageValentineProps) => {
  const [introPhase, setIntroPhase] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [localYour, setLocalYour] = useState(yourName || "");
  const [localHer, setLocalHer] = useState(herName || "");
  const [localDate, setLocalDate] = useState(startDate || "2024-02-14");
  const [futureDateWarn, setFutureDateWarn] = useState(false);
  const [dayCount, setDayCount] = useState(0);
  const [showCrackedHeart, setShowCrackedHeart] = useState(false);
  const [glitchHeader, setGlitchHeader] = useState(false);

  useEffect(() => {
    if (startDate) {
      const days = differenceInDays(new Date(), new Date(startDate));
      if (days < 0) return;
      setDayCount(0);
      let i = 0;
      const step = Math.max(1, Math.floor(days / 60));
      const interval = setInterval(() => {
        i = Math.min(i + step, days);
        setDayCount(i);
        if (i >= days) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [startDate]);

  useEffect(() => {
    const t = setTimeout(() => setShowCrackedHeart(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Glitch on load
  useEffect(() => {
    const t = setTimeout(() => {
      setGlitchHeader(true);
      setTimeout(() => setGlitchHeader(false), 600);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleApply = () => {
    const selected = new Date(localDate);
    if (selected > new Date()) {
      setFutureDateWarn(true);
      return;
    }
    setFutureDateWarn(false);
    onNameChange(localYour, localHer, localDate);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Intro typewriter — larger, bolder */}
      <div
        className="diary-panel relative overflow-hidden"
        style={{ minHeight: "140px", transform: "rotate(-0.3deg)" }}>

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(340 50% 70%) 27px, hsl(340 50% 70%) 28px)",
            backgroundPositionY: "10px"
          }} />

        <div
          className={`font-mono leading-relaxed pl-12 ${glitchHeader ? "animate-glitch" : ""}`}
          style={{ fontSize: "17px", color: "hsl(var(--rose))" }}>

          <span className="text-muted-foreground absolute left-3 top-[24px] font-pixel" style={{ fontSize: "6px" }}>01</span>
          <span className="text-muted-foreground absolute left-3 top-[52px] font-pixel" style={{ fontSize: "6px" }}>02</span>
          <span className="text-muted-foreground absolute left-3 top-[80px] font-pixel" style={{ fontSize: "6px" }}>03</span>

          <TypewriterLine text={LINES[0]} delay={600} onDone={() => setIntroPhase(1)} />
          {introPhase >= 1 &&
          <TypewriterLine text={LINES[1]} delay={400} onDone={() => setIntroPhase(2)} />
          }
          {introPhase >= 2 &&
          <TypewriterLine text={LINES[2]} delay={500} onDone={() => setShowMain(true)} />
          }
        </div>

        {/* Floating stickers */}
        <div className="absolute top-3 right-4 text-2xl animate-float pointer-events-none" style={{ animationDelay: "0s" }}>💕</div>
        <div className="absolute bottom-4 right-8 animate-float2 pointer-events-none" style={{ animationDelay: "0.5s", fontSize: "18px" }}>✨</div>
        <div className="absolute top-1/2 right-2 animate-float pointer-events-none" style={{ animationDelay: "1s", fontSize: "16px" }}>🎀</div>
      </div>

      {/* Heart + days counter — large and dramatic */}
      <div
        className={`panel text-center transition-all duration-700 ${showMain ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transform: showMain ? "rotate(0.4deg)" : undefined }}>

        <div className="panel-title">💝 love counter</div>
        <div className="py-6 flex flex-col items-center gap-3">
          <div
            className={`text-6xl transition-all duration-1000 ${showCrackedHeart ? "animate-gentle-pulse" : ""}`}
            style={{ filter: `drop-shadow(var(--glow-rose))` }}>

            {showCrackedHeart ? "❤️" : "🕐"}

          </div>
          <div
            className="font-serif italic"
            style={{ fontSize: "15px", color: "hsl(var(--rose))" }}>

            {herName ? `${yourName || "you"} → ${herName}` : "you → your love"}
          </div>
          <div
            className="font-pixel mt-1 transition-all duration-300"
            style={{
              fontSize: "18px",
              color: "hsl(var(--blush-deep))",
              animation: showMain ? "count-up 0.5s ease-out forwards" : "none"
            }}>

            {dayCount} days
          </div>
          <div
            className="font-serif italic"
            style={{ fontSize: "14px", color: "hsl(var(--muted-foreground))" }}>

            of loving you.
          </div>
          <div className="font-hand" style={{ fontSize: "22px", color: "hsl(var(--rose))" }}>
            and I would choose you again. ♡
          </div>
        </div>
      </div>

{/* Our Story Display Board */}
<div
  className={`panel transition-all duration-700 delay-300 ${showMain ? "opacity-100" : "opacity-0"}`}
  style={{ transform: "rotate(-0.5deg)" }}
>
  <div className="panel-title">✦ our story ✦</div>

  <div className="mt-4 flex flex-col gap-4">

    {/* Names */}
    <div className="text-center">
      <div className="font-hand text-3xl" style={{ color: "hsl(var(--rose))" }}>
        {yourName || "your name"} ♡ {herName || "their name"}
      </div>
    </div>

    {/* Date */}
    <div className="text-center">
      <div
        className="font-mono tracking-widest"
        style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))" }}
      >
        since
      </div>
      <div
        className="font-serif italic mt-1"
        style={{ fontSize: "16px", color: "hsl(var(--blush-deep))" }}
      >
        {localDate}
      </div>
    </div>

  </div>
</div>

      {/* Valentine note — diary panel */}
      <div
        className={`diary-panel transition-all duration-700 delay-500 ${showMain ? "opacity-100" : "opacity-0"}`}
        style={{ transform: "rotate(0.8deg)" }}>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(340 50% 70%) 27px, hsl(340 50% 70%) 28px)",
            backgroundPositionY: "10px"
          }} />

        <div className="pl-10 font-mono leading-relaxed" style={{ fontSize: "13px", color: "hsl(var(--ink))" }}>
          <p className="mb-3">
            <em>dear {yourName || "my star"},</em>

          </p>
          <p className="mb-3">
            this isn't a grand gesture.<br />
            it's not a perfect poem.<br />
            it's just me, showing up — again.
          </p>
          <p className="mb-3">
            belated, yes.<br />
            but never gone.
          </p>
          <p className="text-right font-hand mt-4" style={{ fontSize: "22px", color: "hsl(var(--rose))" }}>
            — {herName || "you know who"} ♡
          </p>
        </div>
      </div>

      {/* Footer mini badges */}
      <div className="flex flex-wrap gap-2">
        <span className="pixel-badge" style={{ color: "hsl(var(--blush-deep))", fontSize: "6px" }}>
          BELATED<br />VAL 2026
        </span>
        <span className="pixel-badge" style={{ color: "hsl(var(--pixel-green))", fontSize: "6px" }}>
          MADE<br />WITH<br />♡
        </span>
      </div>
    </div>);

};

export default PageValentine;
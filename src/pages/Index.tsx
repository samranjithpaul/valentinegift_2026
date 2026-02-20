import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import StarField from "@/components/StarField";
import PageValentine from "@/pages/PageValentine";
import PageMoments from "@/pages/PageMoments";
import PagePromises from "@/pages/PagePromises";
import PageMineAgain from "@/pages/PageMineAgain";

type Page = "valentine" | "moments" | "promises" | "mine";
type Theme = "midnight" | "scrapbook";

const SecretLoveLetter = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    style={{ background: "hsl(240 40% 5% / 0.92)", backdropFilter: "blur(8px)" }}
    onClick={onClose}
  >
    <div
      className="diary-panel animate-wobble-in max-w-md w-full"
      style={{ transform: "rotate(-1deg)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, hsl(340 50% 70%) 27px, hsl(340 50% 70%) 28px)",
          backgroundPositionY: "10px",
        }}
      />
      <div className="pl-10 font-mono text-[13px] leading-relaxed" style={{ color: "hsl(var(--rose))" }}>
        <div className="font-serif italic text-[18px] mb-4" style={{ color: "hsl(var(--blush-deep))" }}>
          ✦ secret love letter ✦
        </div>
        <p className="mb-3 text-foreground">
          if you found this, it means you were curious enough<br />
          to tap five times.
        </p>
        <p className="mb-3 text-foreground">
          that's kind of how I feel about you.<br />
          always looking a little deeper.
        </p>
        <p className="mb-4 text-foreground">
          you don't have to be extraordinary<br />
          to be my whole world,saranghae ♡
        
        </p>
        <div className="text-right font-hand text-[22px]" style={{ color: "hsl(var(--rose))" }}>
          — still yours ♡
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-5 w-full text-[11px] text-muted-foreground text-center hover:text-foreground transition-colors"
      >
        close this secret ✕
      </button>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<Page>("valentine");
  const [theme, setTheme] = useState<Theme>("scrapbook");
  const [clapCount, setClapCount] = useState(0);
  const [footerTaps, setFooterTaps] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // Read session data
  const yourName = sessionStorage.getItem("yourName") || "";
  const beMineStatus = sessionStorage.getItem("beMineStatus") || "";

  // Always read promises from sessionStorage (single source of truth)
  const [promisesVersion, setPromisesVersion] = useState(0);
  const promises: string[] = JSON.parse(sessionStorage.getItem("promises") || "[]");

  // Callback to force re-read promises from sessionStorage
  const refreshPromises = () => setPromisesVersion((v) => v + 1);

  // Guard: if no session data, redirect to opening flow
  useEffect(() => {
    if (!sessionStorage.getItem("yourName")) {
      navigate("/flow/opening");
    }
  }, [navigate]);

  useEffect(() => {
    if (theme === "scrapbook") {
      document.documentElement.classList.add("scrapbook");
      document.documentElement.classList.remove("midnight-diary");
    } else {
      document.documentElement.classList.remove("scrapbook");
      document.documentElement.classList.add("midnight-diary");
    }
  }, [theme]);

  const handleFooterTap = () => {
    const next = footerTaps + 1;
    setFooterTaps(next);
    if (next >= 5) {
      setShowSecret(true);
      setFooterTaps(0);
    }
  };

  const pageComponents = {
    valentine: (
      <PageValentine
        yourName={yourName}
        herName="sam"
        startDate="2022-07-26"
        onNameChange={() => {}}
      />
    ),
    moments: <PageMoments />,
    promises: <PagePromises sessionPromises={promises} onPromisesChange={refreshPromises} />,
    mine: <PageMineAgain beMineStatus={beMineStatus} theme={theme} />,
  };

  const isMidnight = theme === "midnight";

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: isMidnight
          ? "hsl(var(--background))"
          : "hsl(var(--background))",
      }}
    >
      {/* Starfield always on for midnight theme */}
      {isMidnight && <StarField />}

      {/* Secret love letter overlay */}
      {showSecret && <SecretLoveLetter onClose={() => setShowSecret(false)} />}

      {/* ─── DESKTOP LAYOUT ─── */}
      <div
        className="hidden md:flex relative z-10 min-h-screen"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        {/* Left sidebar */}
        <LeftSidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "midnight" ? "scrapbook" : "midnight"))}
          promiseCount={promises.length}
          beMineStatus={beMineStatus}
        />

        {/* Main content */}
        <main className="flex-1 py-4 px-4 lg:px-6 min-w-0">
          <div
            key={currentPage}
            className="animate-fade-in-up"
          >
            {pageComponents[currentPage]}
          </div>

          {/* Footer */}
          <footer
            className="mt-8 pb-4 text-center"
            onClick={handleFooterTap}
            style={{ cursor: "default" }}
          >
            <div className="text-[9px] text-muted-foreground font-pixel leading-loose">
              <div>made with love in 2026 ♡</div>
              <div>last updated: feb 2026</div>
              <div className="mt-2">
                <span className="animate-blink inline-block" style={{ color: "hsl(var(--rose))" }}>
                  ■
                </span>{" "}
                tap 5× for a secret
              </div>
              <div className="mt-2 flex justify-center gap-3 flex-wrap">
                <span className="pixel-badge" style={{ fontSize: "5px", color: "hsl(var(--blush-deep))" }}>
                  BELATED<br />VAL 2026
                </span>
                <span className="pixel-badge" style={{ fontSize: "5px", color: "hsl(var(--pixel-green))" }}>
                  MADE<br />WITH ♡
                </span>
                <span className="pixel-badge" style={{ fontSize: "5px", color: "hsl(var(--gold))" }}>
                  88×31
                </span>
              </div>
            </div>
          </footer>
        </main>

        {/* Right sidebar */}
        <RightSidebar
          clapCount={clapCount}
          onClap={() => setClapCount((c) => c + 1)}
        />
      </div>

      {/* ─── MOBILE LAYOUT ─── */}
      <div className="md:hidden relative z-10 min-h-screen flex flex-col">
        {/* Mobile top bar */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--panel-border))",
            boxShadow: "0 2px 12px hsl(0 0% 0% / 0.3)",
          }}
        >
          <div className="font-serif italic text-[15px]" style={{ color: "hsl(var(--rose))" }}>
            belated valentine
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLeftOpen((v) => !v)}
              className="text-[11px] px-3 py-1.5 rounded border font-pixel transition-all"
              style={{
                borderColor: "hsl(var(--panel-border))",
                color: "hsl(var(--blush-deep))",
                background: leftOpen ? "hsl(var(--blush) / 0.3)" : "transparent",
              }}
            >
              {leftOpen ? "✕" : "☰ nav"}
            </button>
            <button
              onClick={() => setRightOpen((v) => !v)}
              className="text-[11px] px-3 py-1.5 rounded border font-pixel transition-all"
              style={{
                borderColor: "hsl(var(--panel-border))",
                color: "hsl(var(--blush-deep))",
                background: rightOpen ? "hsl(var(--blush) / 0.3)" : "transparent",
              }}
            >
              {rightOpen ? "✕" : "✦ widgets"}
            </button>
          </div>
        </div>

        {/* Mobile collapsible left sidebar */}
        {leftOpen && (
          <div className="border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
            <LeftSidebar
              currentPage={currentPage}
              onPageChange={(p) => { setCurrentPage(p); setLeftOpen(false); }}
              theme={theme}
              onToggleTheme={() => setTheme((t) => (t === "midnight" ? "scrapbook" : "midnight"))}
              promiseCount={promises.length}
              beMineStatus={beMineStatus}
              isMobileExpanded
            />
          </div>
        )}

        {/* Mobile collapsible right sidebar */}
        {rightOpen && (
          <div className="border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
            <RightSidebar
              clapCount={clapCount}
              onClap={() => setClapCount((c) => c + 1)}
              isMobileExpanded
            />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 py-4 px-3 sm:px-4">
          <div key={currentPage} className="animate-fade-in-up">
            {pageComponents[currentPage]}
          </div>

          {/* Footer */}
          <footer
            className="mt-6 pb-4 text-center"
            onClick={handleFooterTap}
            style={{ cursor: "default" }}
          >
            <div className="text-[9px] text-muted-foreground font-pixel leading-loose">
              <div>made with love in 2026 ♡</div>
              <div className="mt-1">
                <span className="animate-blink inline-block" style={{ color: "hsl(var(--rose))" }}>■</span>
                {" "}tap 5× for a secret
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;

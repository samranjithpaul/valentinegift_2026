import { useState, useEffect } from "react";

type Page = "valentine" | "moments" | "promises" | "mine";
type Theme = "midnight" | "scrapbook";

interface LeftSidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  theme: Theme;
  onToggleTheme: () => void;
  isMobileExpanded?: boolean;
  promiseCount?: number;
  beMineStatus?: string;
}

const navItems: {id: Page;label: string;icon: string;}[] = [
{ id: "valentine", label: "belated love", icon: "💌" },
{ id: "moments", label: "our moments", icon: "📸" },
{ id: "promises", label: "i promise to", icon: "🌸" },
{ id: "mine", label: "be mine again", icon: "🌙" }];


const LeftSidebar = ({ currentPage, onPageChange, theme, onToggleTheme, isMobileExpanded, promiseCount = 0, beMineStatus = "" }: LeftSidebarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return (
    <aside
      className={`shrink-0 flex flex-col gap-3 py-4 ${isMobileExpanded ? "w-full px-3 pb-4" : "w-[200px] xl:w-[220px] pl-2 pr-2"}`}
      style={{ minHeight: isMobileExpanded ? "auto" : "100vh" }}>

      {/* Site title */}
      <div className="panel text-center" style={{ transform: "rotate(-0.5deg)" }}>
        <div className="font-pixel mb-2" style={{ fontSize: "6px", color: "hsl(var(--blush-deep))" }}>✦ since feb 2026 ✦</div>
        <div
          className="font-serif italic leading-tight"
          style={{ fontSize: "15px", color: "hsl(var(--rose))" }}>

          love arrives<br />late, but<br />never fades.
        </div>
      </div>

      {/* Navigation */}
      <div className="panel" style={{ transform: "rotate(0.3deg)" }}>
        <div className="panel-title">✦ navigate ✦</div>
        <nav className={`flex gap-2 mt-1 ${isMobileExpanded ? "flex-row flex-wrap" : "flex-col"}`}>
          {navItems.map((item) =>
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`text-left px-3 py-2 rounded border transition-all font-mono flex items-center justify-between ${
            currentPage === item.id ?
            "border-primary font-bold" :
            "border-transparent hover:border-border hover:bg-muted"}`
            }
            style={{
              fontSize: "11px",
              color: currentPage === item.id ? "hsl(var(--blush-deep))" : "hsl(var(--muted-foreground))",
              background: currentPage === item.id ? "hsl(var(--blush) / 0.2)" : undefined
            }}>
              <span>{item.icon} {item.label}</span>
              {/* Badge: promise count on promises tab */}
              {item.id === "promises" && promiseCount > 0 && (
                <span
                  className="font-pixel ml-1"
                  style={{ fontSize: "5px", color: "hsl(var(--pixel-green))", background: "hsl(var(--pixel-green) / 0.15)", padding: "1px 3px", borderRadius: "2px" }}
                >
                  {promiseCount}
                </span>
              )}
              {/* Badge: ✓ on be mine tab if yes */}
              {item.id === "mine" && beMineStatus === "yes" && (
                <span
                  className="font-pixel ml-1"
                  style={{ fontSize: "5px", color: "hsl(var(--pixel-green))", background: "hsl(var(--pixel-green) / 0.15)", padding: "1px 3px", borderRadius: "2px" }}
                >
                  ✓
                </span>
              )}
            </button>
          )}
        </nav>
      </div>

      {/* Status */}
      <div className="panel" style={{ transform: "rotate(-0.8deg)" }}>
        <div className="panel-title">♡ status</div>
        <div className="leading-relaxed" style={{ fontSize: "11px" }}>
          <span className="animate-blink inline-block w-2 h-2 rounded-full bg-green-400 mr-1.5" />
          <span style={{ color: "hsl(var(--pixel-green))" }}>online</span>
          <div
            className="mt-2 font-hand"
            style={{ fontSize: "16px", color: "hsl(var(--rose))" }}>

            currently thinking<br />about you ♡
          </div>
          <div className="mt-1 text-muted-foreground" style={{ fontSize: "10px" }}>
            mood: still yours
          </div>
        </div>
      </div>

      {/* Mini clock */}
      <div className="panel text-center" style={{ transform: "rotate(0.5deg)" }}>
        <div className="panel-title bg-lime-400">⏱ local time</div>
        <div className="font-pixel mt-2" style={{ fontSize: "9px", color: "hsl(var(--blush-deep))" }}>
          {timeStr}
        </div>
        <div className="text-muted-foreground mt-1" style={{ fontSize: "10px" }}>
          feb 2026
        </div>
      </div>

      {/* Theme toggle */}
      <div className="panel" style={{ transform: "rotate(-0.3deg)" }}>
        <div className="panel-title">✨ theme</div>
        <button
          onClick={onToggleTheme}
          className="w-full px-3 py-2 rounded border border-border hover:border-primary transition-all font-mono mt-1"
          style={{ fontSize: "11px" }}>

          {theme === "midnight" ? "📋 digital scrapbook" : "🌙 midnight diary"}
        </button>
      </div>

      {/* Pixel badges */}
      {!isMobileExpanded &&
      <div className="flex flex-wrap gap-1.5 px-1">
          <div className="pixel-badge text-blush border-current" style={{ fontSize: "5px", transform: "rotate(-1deg)" }}>
            MADE<br />WITH<br />LOVE
          </div>
          <div className="pixel-badge" style={{ fontSize: "5px", color: "hsl(var(--pixel-green))", transform: "rotate(1deg)" }}>
            BEST<br />VIEWED<br />ON♡
          </div>
          <div className="pixel-badge" style={{ fontSize: "5px", color: "hsl(var(--gold))", transform: "rotate(-0.5deg)" }}>
            88×31<br />BADGE
          </div>
        </div>
      }

      {/* Blinking pixels */}
      <div className="px-1 flex gap-2">
        <span className="animate-blink" style={{ color: "hsl(var(--rose))", fontSize: "10px" }}>■</span>
        <span className="animate-blink" style={{ animationDelay: "0.3s", color: "hsl(var(--blush-deep))", fontSize: "10px" }}>■</span>
        <span className="animate-blink" style={{ animationDelay: "0.6s", color: "hsl(var(--coral))", fontSize: "10px" }}>■</span>
      </div>

      <div className="text-muted-foreground px-1 leading-loose" style={{ fontSize: "9px" }}>
        last updated:<br />feb 2026 ♡
      </div>
    </aside>);

};

export default LeftSidebar;
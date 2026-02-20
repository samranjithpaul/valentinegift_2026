import { useState, useRef, useEffect } from "react";

const SONG_SRC = "/song.mp3";

interface RightSidebarProps {
  clapCount: number;
  onClap: () => void;
  isMobileExpanded?: boolean;
}

const RightSidebar = ({ clapCount, onClap, isMobileExpanded }: RightSidebarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audio.loop = true;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };


  const fakeMessages = [
  { user: "starry.anon", msg: "this is so beautiful 🥺" },
  { user: "anonymous", msg: "i wish someone did this for me" },
  { user: "h34rt.exe", msg: "crying at 2am because of this" },
  { user: "pinkMoon99", msg: "so beautiful 💕" },
  { user: "midnite_user", msg: "this hits different at night" }];


  return (
    <aside
      className={`shrink-0 flex gap-4 py-5 ${
      isMobileExpanded ?
      "w-full px-3 pb-4 flex-row flex-wrap" :
      "w-[180px] xl:w-[200px] pr-2 pl-2 flex-col"}`
      }
      style={{ minHeight: isMobileExpanded ? "auto" : "100vh" }}>

      {/* Online counter */}
      <div
        className={`panel text-center ${isMobileExpanded ? "flex-1 min-w-[130px]" : ""}`}
        style={{ transform: "rotate(0.8deg)" }}>

        <div className="panel-title">📡 visitors</div>
        <div className="font-pixel mt-2" style={{ fontSize: "9px", color: "hsl(var(--pixel-green))" }}>
          002847
        </div>
        <div className="text-muted-foreground mt-1" style={{ fontSize: "10px" }}>
          <span className="animate-blink inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1" />
          online now: 1 (you)
        </div>
      </div>

      {/* Clap for love */}
      <div
        className={`panel text-center ${isMobileExpanded ? "flex-1 min-w-[130px]" : ""}`}
        style={{ transform: "rotate(-0.6deg)" }}>

        <div className="panel-title">👏 clap for love</div>
        <button
          onClick={onClap}
          className="mt-2 text-3xl animate-gentle-pulse hover:scale-125 transition-transform block mx-auto"
          aria-label="Clap for love">

          👏
        </button>
        <div className="font-pixel mt-2" style={{ fontSize: "9px", color: "hsl(var(--blush-deep))" }}>
          {clapCount} claps
        </div>
      </div>

      {/* Music player */}
      <div
        className={`panel ${isMobileExpanded ? "flex-1 min-w-[160px]" : ""}`}
        style={{ transform: "rotate(0.4deg)" }}>

        <div className="panel-title">🎵 now playing</div>
        <div className="leading-relaxed mt-1" style={{ fontSize: "10px" }}>
          <div className="font-hand" style={{ fontSize: "15px", color: "hsl(var(--rose))" }}>
          Star vs. the Forces of Evil

          </div>
          <div className="text-muted-foreground" style={{ fontSize: "9px" }}>theme song</div>
          <button
            onClick={togglePlay}
            className="mt-2 flex items-center gap-1 px-3 py-1.5 border border-border rounded hover:border-primary transition-all w-full justify-center font-mono"
            style={{ fontSize: "10px" }}>

            {isPlaying ? "⏸ pause" : "▶ play"}
          </button>
          {isPlaying &&
          <div className="mt-2 flex gap-0.5 items-end justify-center" style={{ height: "14px" }}>
              {[8, 13, 6, 11, 9].map((h, i) =>
            <span
              key={i}
              className="inline-block w-1 rounded-t"
              style={{
                height: `${h}px`,
                background: "hsl(var(--rose))",
                animation: `bounce 0.5s ease-in-out ${i * 0.1}s infinite`
              }} />

            )}
            </div>
          }
        </div>
      </div>

      {/* Fake chat */}
      <div
        className={`panel ${isMobileExpanded ? "flex-1 min-w-[200px]" : ""}`}
        style={{ transform: "rotate(-0.5deg)" }}>

        <div className="panel-title">💬 guestbook</div>
        <div
          className={`flex flex-col gap-2 mt-1 overflow-y-auto ${isMobileExpanded ? "" : "max-h-[140px]"}`}>

          {fakeMessages.map((m, i) =>
          <div
            key={i}
            className="leading-tight border-b pb-1.5"
            style={{ fontSize: "10px", borderColor: "hsl(var(--panel-border))" }}>

              <span style={{ color: "hsl(var(--blush-deep))" }} className="font-bold">
                {m.user}:
              </span>{" "}
              <span className="text-muted-foreground">{m.msg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stamps */}
      {!isMobileExpanded &&
      <div className="panel" style={{ transform: "rotate(0.7deg)" }}>
          <div className="panel-title">📮 stamps</div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {["💌", "🌹", "✨", "🦋", "🌙", "💫"].map((emoji, i) =>
          <div
            key={i}
            className="text-xl border p-1.5 rounded"
            style={{
              transform: `rotate(${(i % 3 - 1) * 3}deg)`,
              background: "hsl(var(--parchment))",
              borderColor: "hsl(var(--panel-border))"
            }}>

                {emoji}
              </div>
          )}
          </div>
        </div>
      }

      <div
        className="text-muted-foreground px-1 leading-loose"
        style={{ fontSize: "9px" }}>

        made with love<br />in 2026 ♡<br />
        <span className="font-pixel" style={{ fontSize: "5px" }}>best viewed on<br />love & patience</span>
      </div>
    </aside>);

};

export default RightSidebar;
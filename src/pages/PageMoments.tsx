import { useState, useEffect } from "react";
import { getMoments, type Photo } from "@/lib/moments";

const Polaroid = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => (
  <div
    className="polaroid cursor-pointer transition-all duration-200 inline-block w-[125px] sm:w-[140px] md:w-[160px] lg:w-[175px] xl:w-[185px]"
    onClick={onClick}
    style={{
      transform: `rotate(${photo.rotate}deg) scale(${photo.scale})`,
      marginLeft: `${photo.offsetX}px`,
      marginTop: `${photo.offsetY}px`,
      boxShadow: "var(--shadow-polaroid)",
      zIndex: Math.abs(photo.rotate) > 2 ? 2 : 1,
      position: "relative",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = `rotate(${photo.rotate * 0.5}deg) scale(${photo.scale * 1.08}) translateY(-4px)`;
      (e.currentTarget as HTMLElement).style.zIndex = "10";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = `rotate(${photo.rotate}deg) scale(${photo.scale})`;
      (e.currentTarget as HTMLElement).style.zIndex = String(Math.abs(photo.rotate) > 2 ? 2 : 1);
    }}
  >
    <div
      className="flex items-center justify-center overflow-hidden min-h-[95px] sm:min-h-[105px] md:min-h-[125px] lg:min-h-[135px] xl:min-h-[145px]"
      style={{
        width: "100%",
        background: "hsl(var(--muted))",
        fontSize: "3.5rem",
      }}
    >
      {photo.image ? (
        <img
          src={photo.image}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      ) : (
        photo.emoji ?? "📷"
      )}
    </div>
    <div
      className="font-hand leading-tight pt-2 pb-1 text-center truncate px-1"
      style={{ fontSize: "14px", color: "hsl(var(--ink))" }}
    >
      {photo.caption.split("\n")[0] || photo.caption}
    </div>
    {photo.note && (
      <div className="font-hand italic mt-0.5 text-center" style={{ fontSize: "11px", color: "hsl(var(--rose))" }}>
        ✦
      </div>
    )}
  </div>
);

const PageMoments = () => {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(getMoments);

  useEffect(() => {
    setPhotos(getMoments());
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
      {/* Header */}
      <div className="panel w-full max-w-4xl" style={{ transform: "rotate(-0.5deg)" }}>
        <div className="panel-title">📸 our moments — scrapbook chaos</div>
        <p className="font-hand mt-2" style={{ fontSize: "18px", color: "hsl(var(--rose))" }}>
          not in order. memories never are.
        </p>
      </div>

      {/* Scrapbook chaos grid — messy rows, centered */}
      <div className="relative w-full flex flex-col items-center" style={{ paddingBottom: "12px" }}>
        {/* Decorative side elements to fill space on laptop */}
        <div className="hidden lg:block absolute left-0 top-1/4 text-2xl opacity-20 pointer-events-none" style={{ transform: "rotate(-15deg)" }}>✨</div>
        <div className="hidden lg:block absolute left-4 top-1/3 text-xl opacity-15 pointer-events-none" style={{ transform: "rotate(10deg)" }}>💕</div>
        <div className="hidden lg:block absolute right-0 top-1/3 text-2xl opacity-20 pointer-events-none" style={{ transform: "rotate(12deg)" }}>🌸</div>
        <div className="hidden lg:block absolute right-6 top-1/2 text-xl opacity-15 pointer-events-none" style={{ transform: "rotate(-8deg)" }}>✨</div>
        {/* Row 1 — offset left */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start justify-center px-2 md:px-4" style={{ marginLeft: "-6px" }}>
          {photos.slice(0, 4).map((photo, i) => (
            <Polaroid key={i} photo={photo} onClick={() => setSelected(photo)} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3 px-3">
          <span className="text-xl sm:text-2xl animate-float2" style={{ animationDelay: "0.3s" }}>✨</span>
          <span className="font-hand" style={{ fontSize: "14px", color: "hsl(var(--blush-deep))" }}>
            tap to remember
          </span>
          <span className="text-xl sm:text-2xl animate-float" style={{ animationDelay: "0.8s" }}>💕</span>
        </div>
        {/* Row 2 — offset right, chaotic */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start justify-center px-2 md:px-4" style={{ marginLeft: "18px" }}>
          {photos.slice(4, 8).map((photo, i) => (
            <Polaroid key={i + 4} photo={photo} onClick={() => setSelected(photo)} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3 px-3">
          <span className="text-xl sm:text-2xl animate-float2" style={{ animationDelay: "0.5s" }}>🌸</span>
          <span className="font-hand" style={{ fontSize: "14px", color: "hsl(var(--blush-deep))" }}>
            not in order
          </span>
          <span className="text-xl sm:text-2xl animate-float" style={{ animationDelay: "0.6s" }}>✨</span>
        </div>
        {/* Row 3 — offset left */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start justify-center px-2 md:px-4" style={{ marginLeft: "-4px" }}>
          {photos.slice(8, 12).map((photo, i) => (
            <Polaroid key={i + 8} photo={photo} onClick={() => setSelected(photo)} />
          ))}
        </div>
        {photos.length > 12 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start justify-center mt-2 px-2 md:px-4" style={{ marginLeft: "12px" }}>
            {photos.slice(12).map((photo, i) => (
              <Polaroid key={i + 12} photo={photo} onClick={() => setSelected(photo)} />
            ))}
          </div>
        )}
      </div>

      {/* Feature quote panel */}
      <div
        className="panel text-center w-full max-w-xl mx-auto"
        style={{ transform: "rotate(0.6deg)" }}
      >
        <div className="font-hand italic" style={{ fontSize: "20px", color: "hsl(var(--rose))" }}>
          "I didn't know this would become my favorite day."
        </div>
        <div className="text-muted-foreground mt-2" style={{ fontSize: "10px" }}>— from the rainy day polaroid</div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(240 30% 5% / 0.88)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="polaroid animate-wobble-in"
            style={{
              transform: "rotate(-1.5deg)",
              maxWidth: "320px",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ height: "220px", background: "hsl(var(--muted))", fontSize: "5rem" }}
            >
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                selected.emoji ?? "📷"
              )}
            </div>
            <div
              className="font-hand leading-tight pt-4 pb-2 text-center whitespace-pre-line"
              style={{ fontSize: "20px", color: "hsl(var(--ink))" }}
            >
              {selected.caption}
            </div>
            {selected.note && (
              <div
                className="font-serif italic text-center mt-2 border-t pt-3"
                style={{ fontSize: "14px", color: "hsl(var(--rose))", borderColor: "hsl(var(--panel-border))" }}
              >
                "{selected.note}"
              </div>
            )}
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full text-muted-foreground hover:text-foreground transition-colors text-center"
              style={{ fontSize: "11px" }}
            >
              tap to close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageMoments;

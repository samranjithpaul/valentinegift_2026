import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getMoments, type Photo } from "@/lib/moments";

/* ─── Floating petals unique to Moments ─── */
const FloatingPetals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 10,
        sway: (Math.random() - 0.5) * 60,
        rotation: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            fontSize: `${p.size}px`,
            animation: `moments-petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--petal-sway" as string]: `${p.sway}px`,
            ["--petal-rot" as string]: `${p.rotation}deg`,
            opacity: 0.5,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

const Polaroid = ({ photo, onClick, index }: { photo: Photo; onClick: () => void; index: number }) => (
  <div
    className="cursor-pointer inline-block w-[115px] sm:w-[130px] md:w-[145px]"
    onClick={onClick}
    style={{
      background: "hsl(270 20% 97%)",
      border: "1.5px solid hsl(270 20% 82%)",
      padding: "8px 8px 28px",
      boxShadow: "4px 8px 24px hsl(270 30% 30% / 0.2), 0 0 15px hsl(270 40% 70% / 0.08)",
      fontFamily: "'Caveat', cursive",
      position: "relative",
      transform: `rotate(${photo.rotate}deg) scale(${photo.scale})`,
      marginLeft: `${photo.offsetX}px`,
      marginTop: `${photo.offsetY}px`,
      zIndex: Math.abs(photo.rotate) > 2 ? 2 : 1,
      animation: `moments-photo-slide 0.6s ease-out ${index * 0.12}s both`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform = `rotate(${photo.rotate * 0.3}deg) scale(${photo.scale * 1.1}) translateY(-6px)`;
      el.style.boxShadow = "6px 12px 30px hsl(270 30% 30% / 0.3), 0 0 25px hsl(270 50% 70% / 0.15)";
      el.style.zIndex = "10";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform = `rotate(${photo.rotate}deg) scale(${photo.scale})`;
      el.style.boxShadow = "4px 8px 24px hsl(270 30% 30% / 0.2), 0 0 15px hsl(270 40% 70% / 0.08)";
      el.style.zIndex = String(Math.abs(photo.rotate) > 2 ? 2 : 1);
    }}
  >
    <div
      className="flex items-center justify-center overflow-hidden min-h-[85px] sm:min-h-[95px] md:min-h-[108px]"
      style={{ background: "hsl(270 25% 93%)", fontSize: "2.5rem" }}
    >
      {photo.image ? (
        <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover" />
      ) : (
        photo.emoji ?? "📷"
      )}
    </div>
    <div className="leading-tight pt-2 pb-1 text-center truncate px-1" style={{ fontSize: "13px", color: "hsl(270 20% 25%)" }}>
      {photo.caption.split("\n")[0] || photo.caption}
    </div>
    {photo.note && (
      <div className="italic mt-0.5 text-center" style={{ fontSize: "10px", color: "hsl(280 45% 55%)" }}>✦</div>
    )}
  </div>
);

const FlowMoments = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(getMoments);

  return (
    <div
      className="min-h-screen flex flex-col relative px-3 py-5 sm:px-4 sm:py-6 md:px-5 md:py-7 overflow-hidden"
      style={{
        background: "linear-gradient(170deg, hsl(270 30% 92%) 0%, hsl(265 25% 88%) 40%, hsl(275 20% 85%) 100%)",
      }}
    >
      {/* Soft grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <FloatingPetals />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div
          style={{
            background: "hsl(270 25% 97%)",
            border: "1.5px solid hsl(270 20% 82%)",
            borderRadius: "4px",
            boxShadow: "0 6px 24px hsl(270 25% 30% / 0.15)",
            padding: "14px 18px",
            transform: "rotate(-0.4deg)",
            animation: "moments-photo-slide 0.5s ease-out both",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(280 50% 50%)",
              padding: "5px 10px",
              background: "hsl(270 40% 92%)",
              borderBottom: "1px solid hsl(270 20% 82%)",
              margin: "-14px -18px 12px",
              borderRadius: "3px 3px 0 0",
            }}
          >
            📸 our moments
          </div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "19px", color: "hsl(280 45% 50%)", marginTop: "4px" }}>
            not in order. memories never are.
          </p>
        </div>

        {/* Photos - messy scrapbook layout, centered */}
        <div className="relative pb-4 w-full flex flex-col items-center">
          {/* Row 1 — offset left */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-center" style={{ marginLeft: "-8px" }}>
            {photos.slice(0, 4).map((photo, i) => (
              <Polaroid key={i} photo={photo} onClick={() => setSelected(photo)} index={i} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3 px-2">
            <span className="text-lg sm:text-xl" style={{ animation: "moments-icon-bob 3s ease-in-out infinite" }}>✨</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", color: "hsl(280 40% 50%)" }}>
              tap to remember
            </span>
            <span className="text-lg sm:text-xl" style={{ animation: "moments-icon-bob 3s ease-in-out 0.5s infinite" }}>💕</span>
          </div>
          {/* Row 2 — offset right, chaotic */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-center" style={{ marginLeft: "18px" }}>
            {photos.slice(4, 8).map((photo, i) => (
              <Polaroid key={i + 4} photo={photo} onClick={() => setSelected(photo)} index={i + 4} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3 px-2">
            <span className="text-lg sm:text-xl" style={{ animation: "moments-icon-bob 3s ease-in-out 0.3s infinite" }}>🌸</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", color: "hsl(280 40% 50%)" }}>
              not in order
            </span>
            <span className="text-lg sm:text-xl" style={{ animation: "moments-icon-bob 3s ease-in-out 0.8s infinite" }}>✨</span>
          </div>
          {/* Row 3 — offset left again */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-center" style={{ marginLeft: "-4px" }}>
            {photos.slice(8, 12).map((photo, i) => (
              <Polaroid key={i + 8} photo={photo} onClick={() => setSelected(photo)} index={i + 8} />
            ))}
          </div>
          {photos.length > 12 && (
            <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-center mt-2" style={{ marginLeft: "12px" }}>
              {photos.slice(12).map((photo, i) => (
                <Polaroid key={i + 12} photo={photo} onClick={() => setSelected(photo)} index={i + 12} />
              ))}
            </div>
          )}
        </div>

        {/* Quote */}
        <div
          className="text-center"
          style={{
            background: "hsl(270 25% 97%)",
            border: "1.5px solid hsl(270 20% 82%)",
            borderRadius: "4px",
            padding: "16px",
            boxShadow: "0 4px 16px hsl(270 25% 30% / 0.1)",
            transform: "rotate(0.5deg)",
            animation: "moments-photo-slide 0.6s ease-out 0.7s both",
          }}
        >
          <div style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", fontSize: "18px", color: "hsl(280 45% 50%)" }}>
            "I didn't know this would become my favorite day."
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => navigate("/flow/promises")}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "15px",
            padding: "16px",
            borderRadius: "4px",
            border: "none",
            background: "hsl(280 50% 55%)",
            color: "white",
            boxShadow: "0 4px 20px hsl(280 50% 50% / 0.35)",
            cursor: "pointer",
            animation: "moments-photo-slide 0.6s ease-out 0.9s both",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          continue to promises →
        </button>

        <div className="text-center" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "5px", color: "hsl(270 20% 60%)" }}>
          step 2 of 4 ✦ moments
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(270 30% 10% / 0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "hsl(270 20% 97%)",
              border: "1.5px solid hsl(270 20% 82%)",
              padding: "10px 10px 36px",
              boxShadow: "0 12px 40px hsl(270 30% 20% / 0.4), 0 0 30px hsl(280 50% 70% / 0.1)",
              fontFamily: "'Caveat', cursive",
              transform: "rotate(-1.5deg)",
              maxWidth: "300px",
              width: "100%",
              animation: "moments-modal-zoom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ height: "200px", background: "hsl(270 25% 93%)", fontSize: "4.5rem" }}
            >
              {selected.image ? (
                <img src={selected.image} alt={selected.caption} className="w-full h-full object-cover" />
              ) : (
                selected.emoji ?? "📷"
              )}
            </div>
            <div className="pt-4 pb-2 text-center whitespace-pre-line" style={{ fontSize: "18px", color: "hsl(270 20% 20%)" }}>
              {selected.caption}
            </div>
            {selected.note && (
              <div
                className="italic text-center mt-2 border-t pt-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "13px",
                  color: "hsl(280 45% 50%)",
                  borderColor: "hsl(270 20% 82%)",
                }}
              >
                "{selected.note}"
              </div>
            )}
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full text-center"
              style={{ fontSize: "11px", color: "hsl(270 20% 55%)" }}
            >
              tap to close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowMoments;

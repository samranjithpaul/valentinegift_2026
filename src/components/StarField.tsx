import { useEffect, useRef } from "react";

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dense star field — multiple layers
    const layers = [
      { count: 100, maxSize: 1.5, opacity: [0.2, 0.7], speed: [2, 5] },
      { count: 50,  maxSize: 2.5, opacity: [0.4, 1.0], speed: [1.5, 4] },
      { count: 20,  maxSize: 3.5, opacity: [0.6, 1.0], speed: [1, 3] },
    ];

    layers.forEach(({ count, maxSize, opacity, speed }) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * maxSize + 0.5;
        const op = opacity[0] + Math.random() * (opacity[1] - opacity[0]);
        const dur = speed[0] + Math.random() * (speed[1] - speed[0]);
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-duration: ${dur}s;
          animation-delay: ${Math.random() * 5}s;
          opacity: ${op};
          background: ${Math.random() > 0.9 ? "hsl(330 80% 90%)" : "white"};
        `;
        container.appendChild(star);
      }
    });

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarField;

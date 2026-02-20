export interface Photo {
  emoji?: string;
  image?: string;
  caption: string;
  note?: string;
  rotate: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const STORAGE_KEY = "moments";

const DEFAULT_PHOTOS: Photo[] = [
  { image: "/image1.jpeg", caption: "you laughed too loud, I held you tighter.\nthe world felt smaller when you were in my arms.", rotate: -3, scale: 1.05, offsetX: 0, offsetY: 0 },

  { image: "/image2.jpeg", caption: "you didn’t have to say anything.\nI knelt beside you and stayed until you felt safe again.", rotate: 2, scale: 1.08, offsetX: 10, offsetY: 14 },

  { image: "/image3.jpeg", caption: "the door was closed, the lights were low.\nwe hid from everyone else and found each other instead.", rotate: -1.5, scale: 0.97, offsetX: -5, offsetY: 6 },

  { image: "/image4.jpeg", caption: "they might have known, but they said nothing.\nI kissed you anyway — softly, like it was ours alone.", rotate: 4, scale: 1.1, offsetX: 12, offsetY: -10 },

  { image: "/image5.jpeg", caption: "the house was quiet, the door locked.\nwe fell asleep pretending the world couldn’t reach us.", rotate: -2, scale: 1, offsetX: -4, offsetY: 4 },

  { image: "/image6.jpeg", caption: "we whispered so no one would hear.\nbut our closeness said everything.", rotate: 1.5, scale: 1.03, offsetX: 8, offsetY: -5 },

  { image: "/image7.jpeg", caption: "we made a heart with our hands,\nlike we were promising something bigger than us.", rotate: -2, scale: 1.04, offsetX: 0, offsetY: 0 },

  { image: "/image8.jpeg", caption: "we didn’t know what to say.\nso we just stayed there, close enough to feel it.", rotate: 3, scale: 1.06, offsetX: 8, offsetY: 12 },

  { image: "/image9.jpeg", caption: "we turned away like strangers,\nbut our hearts were still facing each other.", rotate: -4, scale: 1.08, offsetX: -6, offsetY: 5 },

  { image: "/image10.jpeg", caption: "you rode ahead, I held you tighter.\nI trusted you with the road and my heart.", rotate: 2, scale: 1.05, offsetX: 10, offsetY: -8 },

  { image: "/image11.jpeg", caption: "you left your marks on me.\nI wore them like proof you were mine.", rotate: -1.5, scale: 1.02, offsetX: -4, offsetY: 6 },

  { image: "/image12.jpeg", caption: "the door was closed.\nthe rest of the world didn’t matter.", rotate: 1.8, scale: 1.03, offsetX: 6, offsetY: -4 },
];



export function getMoments(): Photo[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Photo[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasImages = parsed.some((p) => p.image);
        if (hasImages) return parsed;
        setMoments(DEFAULT_PHOTOS);
        return DEFAULT_PHOTOS;
      }
    }
    setMoments(DEFAULT_PHOTOS);
  } catch {
    // ignore
  }
  return DEFAULT_PHOTOS;
}

export function setMoments(photos: Photo[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function resetToDefaultImages(): Photo[] {
  setMoments(DEFAULT_PHOTOS);
  return DEFAULT_PHOTOS;
}

export function addMoment(photo: Omit<Photo, "rotate" | "scale" | "offsetX" | "offsetY">): Photo[] {
  const current = getMoments();
  const rotations = [-3, 2, -1.5, 4, -2, 1.5, -2, 3, -4, 2, -1.5, 1.8];
  const i = current.length % rotations.length;
  const newPhoto: Photo = {
    ...photo,
    rotate: rotations[i] ?? 0,
    scale: 1.02 + (i % 3) * 0.02,
    offsetX: (i % 3 - 1) * 6,
    offsetY: (i % 2) * 4,
  };
  const updated = [...current, newPhoto];
  setMoments(updated);
  return updated;
}

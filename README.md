# Belated Valentine Chronicles

A heartfelt digital Valentine's Day experience with two themes: Midnight Diary and Digital Scrapbook.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

```sh
npm install
npm run dev
```

---

## How to Add New Images

1. **Put your images in the `public` folder** (e.g. `public/image1.jpeg`, `public/image2.jpeg`).

2. **Edit `src/lib/moments.ts`** — Add or update entries in the `DEFAULT_PHOTOS` array:

```ts
{
  image: "/image13.jpeg",   // path from public folder
  caption: "our new moment",
  rotate: -2,
  scale: 1.02,
  offsetX: 0,
  offsetY: 0,
}
```

3. The app shows `image1.jpeg` through `image12.jpeg` by default. Add more objects to the array for extra photos.

---

## How to Add Music

1. **Put your audio file in the `public` folder** (e.g. `public/song.mp3`).

2. **Edit `src/components/RightSidebar.tsx`** — Change the `SONG_SRC` constant:

```ts
const SONG_SRC = "/song.mp3";   // or "/your-song.mp3"
```

3. The music player in the right sidebar will play it when you click "▶ play".

Supported formats: MP3, WAV, OGG.

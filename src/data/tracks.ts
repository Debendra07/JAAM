import type { JaamTrack } from "../types/track";

/*
 * Audio files are hosted separately from the GitHub Pages frontend.
 *
 * Set this in your .env file:
 *
 * VITE_AUDIO_BASE_URL=https://your-real-audio-host.example.com
 *
 * The fallback below is intentionally kept as a placeholder.
 */
const AUDIO_BASE_URL =
  import.meta.env.VITE_AUDIO_BASE_URL ||
  "https://your-audio-host.example.com";

/*
 * Prevent accidental double slashes when the
 * environment variable ends with "/".
 */
const audioUrl = (path: string): string => {
  const base = AUDIO_BASE_URL.replace(/\/+$/, "");

  const cleanPath = path.replace(/^\/+/, "");

  return `${base}/${cleanPath}`;
};

export const jaamTracks: JaamTrack[] = [
  /* =========================================
     WHISKEY NIGHTS
     ========================================= */

  {
    id: "whiskey-01",
    title: "Tum Itna Jo Muskura Rahe Ho",
    artist: "Jesjit Singh",
    audio: audioUrl("Tum Itna Jo Muskura Rahe Ho (PenduJatt.Com.Se).mp3"),
    artwork: "backgrounds/whiskey/whiskey-night-01.jpg",
    playlistId: "whiskey-nights",
    themeId: "whiskey",
  },

  {
    id: "whiskey-02",
    title: "Chingari Koi Bhadke",
    artist: "Kishore Kumar",
    audio: audioUrl("Chingari_Koi_Bhadke_(mp3.pm).mp3"),
    artwork: "backgrounds/whiskey/whiskey-night-01.jpg",
    playlistId: "whiskey-nights",
    themeId: "whiskey",
  },

  {
    id: "whiskey-03",
    title: "Midnight Memories",
    artist: "JAAM Sessions",
    audio: audioUrl("whiskey/track-03.mp3"),
    artwork: "backgrounds/whiskey/whiskey-night-01.jpg",
    playlistId: "whiskey-nights",
    themeId: "whiskey",
  },

  /* =========================================
     WINE COLLECTION
     ========================================= */

  {
    id: "wine-01",
    title: "Velvet Evening",
    artist: "JAAM Sessions",
    audio: audioUrl("wine/track-01.mp3"),
    artwork: "backgrounds/wine/wine-collection-01.jpg",
    playlistId: "wine-collection",
    themeId: "wine",
  },

  {
    id: "wine-02",
    title: "Ranjish",
    artist: "JAAM Sessions",
    audio: audioUrl("wine/track-02.mp3"),
    artwork: "backgrounds/wine/wine-collection-02.jpg",
    playlistId: "wine-collection",
    themeId: "wine",
  },

  {
    id: "wine-03",
    title: "Aap Ki Aankhon Mein",
    artist: "JAAM Sessions",
    audio: audioUrl("wine/track-03.mp3"),
    artwork: "backgrounds/wine/wine-collection-03.jpg",
    playlistId: "wine-collection",
    themeId: "wine",
  },

  /* =========================================
     COCKTAIL LOUNGE
     ========================================= */

  {
    id: "cocktail-01",
    title: "Neon Raat",
    artist: "JAAM Sessions",
    audio: audioUrl("cocktail/track-01.mp3"),
    artwork: "backgrounds/cocktail/cocktail-lounge-01.jpg",
    playlistId: "cocktail-lounge",
    themeId: "cocktail",
  },

  {
    id: "cocktail-02",
    title: "Midnight City",
    artist: "JAAM Sessions",
    audio: audioUrl("cocktail/track-02.mp3"),
    artwork: "backgrounds/cocktail/cocktail-lounge-02.jpg",
    playlistId: "cocktail-lounge",
    themeId: "cocktail",
  },

  /* =========================================
     BEER HALL
     ========================================= */

  {
    id: "beer-01",
    title: "Mehfil Tonight",
    artist: "JAAM Sessions",
    audio: audioUrl("beer/track-01.mp3"),
    artwork: "backgrounds/beer/beer-hall-01.jpg",
    playlistId: "beer-hall",
    themeId: "beer",
  },

  {
    id: "beer-02",
    title: "Long Night",
    artist: "JAAM Sessions",
    audio: audioUrl("beer/track-02.mp3"),
    artwork: "backgrounds/beer/beer-hall-02.jpg",
    playlistId: "beer-hall",
    themeId: "beer",
  },

  /* =========================================
     VODKA FREEZE
     ========================================= */

  {
    id: "vodka-01",
    title: "Frozen Hearts",
    artist: "JAAM Sessions",
    audio: audioUrl("vodka/track-01.mp3"),
    artwork: "backgrounds/vodka/vodka-freeze-01.jpg",
    playlistId: "vodka-freeze",
    themeId: "vodka",
  },

  /* =========================================
     CHAMPAGNE LIFE
     ========================================= */

  {
    id: "champagne-01",
    title: "Golden Night",
    artist: "JAAM Sessions",
    audio: audioUrl("champagne/track-01.mp3"),
    artwork: "backgrounds/champagne/champagne-life-01.jpg",
    playlistId: "champagne-life",
    themeId: "champagne",
  },

  /* =========================================
     AFTER HOURS
     ========================================= */

  {
    id: "after-hours-01",
    title: "Aakhri Jaam",
    artist: "JAAM Sessions",
    audio: audioUrl("after-hours/track-01.mp3"),
    artwork: "backgrounds/after-hours/after-hours-01.jpg",
    playlistId: "after-hours",
    themeId: "after-hours",
  },

  {
    id: "after-hours-02",
    title: "2AM Memories",
    artist: "JAAM Sessions",
    audio: audioUrl("after-hours/track-02.mp3"),
    artwork: "backgrounds/after-hours/after-hours-02.jpg",
    playlistId: "after-hours",
    themeId: "after-hours",
  },
];
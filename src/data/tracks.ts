import type { JaamTrack } from "../types/track";

const AUDIO_BASE_URL =
  "https://your-audio-host.example.com";

export const jaamTracks: JaamTrack[] = [
  {
    id: "whiskey-01",
    title: "Track Name",
    artist: "Artist Name",
    audio: `${AUDIO_BASE_URL}/whiskey/track-01.mp3`,
    artwork: "/artwork/whiskey/whiskey-night-01.jpg",
    playlistId: "whiskey-nights",
    themeId: "whiskey",
  },

  {
    id: "whiskey-02",
    title: "Another Track",
    artist: "Artist Name",
    audio: `${AUDIO_BASE_URL}/whiskey/track-02.mp3`,
    artwork: "/artwork/whiskey/whiskey-02.jpg",
    playlistId: "whiskey-nights",
    themeId: "whiskey",
  },
];
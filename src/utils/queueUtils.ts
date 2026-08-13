import type { JaamTrack } from "../types/track";
import type { RepeatMode } from "../types/queue";

export function getPlaylistTracks(
  tracks: JaamTrack[],
  playlistId: string,
): JaamTrack[] {
  return tracks.filter((track) => track.playlistId === playlistId);
}

export function getNextIndex(
  currentIndex: number,
  length: number,
  repeatMode: RepeatMode,
): number | null {
  if (length === 0) return null;
  if (repeatMode === "one") return currentIndex;

  const nextIndex = currentIndex + 1;

  if (nextIndex < length) return nextIndex;
  if (repeatMode === "all") return 0;

  return null;
}

export function getPreviousIndex(
  currentIndex: number,
  length: number,
): number | null {
  if (length === 0) return null;
  if (currentIndex > 0) return currentIndex - 1;

  return length - 1;
}

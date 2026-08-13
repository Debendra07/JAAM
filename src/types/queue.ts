import type { JaamTrack } from "./track";

export type RepeatMode = "off" | "all" | "one";

export interface QueueState {
  playlistId: string | null;
  tracks: JaamTrack[];
  currentIndex: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
}

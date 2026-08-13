import { useCallback, useMemo, useState } from "react";
import type { JaamTrack } from "../types/track";
import type { QueueState, RepeatMode } from "../types/queue";
import {
  getNextIndex,
  getPlaylistTracks,
  getPreviousIndex,
} from "../utils/queueUtils";

interface UseQueueResult {
  queue: QueueState;
  currentTrack: JaamTrack | null;
  hasNext: boolean;
  hasPrevious: boolean;
  setPlaylist: (playlistId: string, startTrackId?: string) => void;
  selectTrack: (trackId: string) => void;
  next: () => void;
  previous: () => void;
  reset: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  toggleShuffle: () => void;
}

export function useQueue(allTracks: JaamTrack[]): UseQueueResult {
  const [queue, setQueue] = useState<QueueState>({
    playlistId: null,
    tracks: [],
    currentIndex: 0,
    repeatMode: "off",
    shuffle: false,
  });

  const currentTrack = queue.tracks[queue.currentIndex] ?? null;

  const hasNext =
    queue.tracks.length > 0 &&
    (queue.repeatMode !== "off" ||
      queue.currentIndex < queue.tracks.length - 1);

  const hasPrevious = queue.tracks.length > 0;

  const setPlaylist = useCallback(
    (playlistId: string, startTrackId?: string) => {
      const tracks = getPlaylistTracks(allTracks, playlistId);
      if (tracks.length === 0) return;

      const requestedIndex = startTrackId
        ? tracks.findIndex((track) => track.id === startTrackId)
        : -1;

      setQueue((previous) => ({
        ...previous,
        playlistId,
        tracks,
        currentIndex: requestedIndex >= 0 ? requestedIndex : 0,
      }));
    },
    [allTracks],
  );

  const selectTrack = useCallback((trackId: string) => {
    setQueue((previous) => {
      const index = previous.tracks.findIndex((track) => track.id === trackId);
      if (index < 0) return previous;
      return { ...previous, currentIndex: index };
    });
  }, []);

  const next = useCallback(() => {
    setQueue((previous) => {
      const index = getNextIndex(
        previous.currentIndex,
        previous.tracks.length,
        previous.repeatMode,
      );

      if (index === null) return previous;
      return { ...previous, currentIndex: index };
    });
  }, []);

  const previous = useCallback(() => {
    setQueue((previous) => {
      const index = getPreviousIndex(
        previous.currentIndex,
        previous.tracks.length,
      );

      if (index === null) return previous;
      return { ...previous, currentIndex: index };
    });
  }, []);

  const reset = useCallback(() => {
    setQueue({
      playlistId: null,
      tracks: [],
      currentIndex: 0,
      repeatMode: "off",
      shuffle: false,
    });
  }, []);

  const setRepeatMode = useCallback((mode: RepeatMode) => {
    setQueue((previous) => ({ ...previous, repeatMode: mode }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setQueue((previous) => ({ ...previous, shuffle: !previous.shuffle }));
  }, []);

  return useMemo(
    () => ({
      queue,
      currentTrack,
      hasNext,
      hasPrevious,
      setPlaylist,
      selectTrack,
      next,
      previous,
      reset,
      setRepeatMode,
      toggleShuffle,
    }),
    [
      queue,
      currentTrack,
      hasNext,
      hasPrevious,
      setPlaylist,
      selectTrack,
      next,
      previous,
      reset,
      setRepeatMode,
      toggleShuffle,
    ],
  );
}

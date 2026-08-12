import { useCallback, useEffect, useRef, useState } from "react";

import type { JaamTrack } from "../types/track";

export function useAudioPlayer(
  tracks: JaamTrack[],
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[currentIndex];

  /*
   * Create audio element
   */

  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  /*
   * Load current track
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    audio.src = currentTrack.audio;

    audio.load();

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  /*
   * Audio events
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentIndex((previous) =>
        previous + 1 < tracks.length
          ? previous + 1
          : 0,
      );
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );
    };
  }, [tracks.length]);

  /*
   * Play / Pause
   */

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();

      setIsPlaying(false);

      return;
    }

    try {
      await audio.play();

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  /*
   * Previous
   */

  const previous = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? tracks.length - 1
        : previousIndex - 1,
    );
  }, [tracks.length]);

  /*
   * Next
   */

  const next = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex + 1 >= tracks.length
        ? 0
        : previousIndex + 1,
    );
  }, [tracks.length]);

  /*
   * Seek
   */

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = time;

    setCurrentTime(time);
  }, []);

  return {
    currentTrack,

    currentIndex,

    isPlaying,

    currentTime,

    duration,

    togglePlay,

    previous,

    next,

    seek,
  };
}
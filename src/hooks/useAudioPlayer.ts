import { useCallback, useEffect, useRef, useState } from "react";
import type { JaamTrack } from "../types/track";

interface UseAudioPlayerOptions {
  track: JaamTrack | null;
  autoPlay: boolean;
  onEnded: () => void;
}

export function useAudioPlayer({
  track,
  autoPlay,
  onEnded,
}: UseAudioPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const endedRef = useRef(onEnded);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    endedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("This audio track could not be loaded.");
    };
    const handleEnded = () => endedRef.current();

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    setError(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setIsLoading(true);

    audio.src = track.audio;
    audio.load();
  }, [track?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track || !autoPlay) return;

    if (!audio.paused) return;

    const start = () => {
      void audio.play().catch(() => {
        setIsPlaying(false);
        setError("The browser blocked audio playback.");
      });
    };

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
      return;
    }

    audio.addEventListener("canplay", start, { once: true });
    return () => audio.removeEventListener("canplay", start);
  }, [track?.id, autoPlay]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    try {
      setError(null);
      await audio.play();
    } catch {
      setIsPlaying(false);
      setError("The browser blocked audio playback.");
    }
  }, [track]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await play();
    } else {
      pause();
    }
  }, [play, pause]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const max = Number.isFinite(audio.duration) ? audio.duration : time;
    const value = Math.max(0, Math.min(time, max));
    audio.currentTime = value;
    setCurrentTime(value);
  }, []);

  return {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    error,
    play,
    pause,
    togglePlay,
    seek,
  };
}

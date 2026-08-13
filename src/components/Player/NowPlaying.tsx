import React from "react";
import "./now-playing.css";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

type NowPlayingProps = {
  title: string;
  artist: string;

  currentTime: number;
  duration: number;

  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;

  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (value: number) => void;

  canNext: boolean;
};

export default function NowPlaying({
  title,
  artist,
  currentTime,
  duration,
  isPlaying,
  isLoading,
  error,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  canNext,
}: NowPlayingProps) {
  const progress =
    duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0;

  return (
    <section className="now-playing" aria-label="Now playing">
      <div className="now-playing__label">NOW PLAYING</div>

      <h1 className="now-playing__title">
        {title || "No track selected"}
      </h1>

      <p className="now-playing__artist">
        {artist || "JAAM Sessions"}
      </p>

      <div
        className={`now-playing__wave ${
          isPlaying ? "now-playing__wave--active" : ""
        }`}
        aria-hidden="true"
      >
        {[
          20, 42, 68, 35, 58, 82, 45, 30, 72,
          52, 88, 40, 64, 30, 76, 48, 70, 36,
          60, 82, 44, 66, 32, 55,
        ].map((height, index) => (
          <i
            key={index}
            style={{
              height: `${height}%`,
              animationDelay: `${index * 45}ms`,
            }}
          />
        ))}
      </div>

      <div className="now-playing__controls">
        <button
          type="button"
          className="now-playing__button"
          onClick={onPrevious}
          aria-label="Previous track"
        >
          <span aria-hidden="true">⏮</span>
        </button>

        <button
          type="button"
          className="now-playing__button now-playing__button--main"
          onClick={onPlayPause}
          disabled={isLoading}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span aria-hidden="true">
            {isLoading ? "…" : isPlaying ? "Ⅱ" : "▶"}
          </span>
        </button>

        <button
          type="button"
          className="now-playing__button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next track"
        >
          <span aria-hidden="true">⏭</span>
        </button>
      </div>

      <div className="now-playing__progress">
        <span className="now-playing__time">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => onSeek(Number(event.target.value))}
          style={
            {
              "--progress": `${progress}%`,
            } as React.CSSProperties
          }
          aria-label="Track progress"
        />

        <span className="now-playing__time">
          {formatTime(duration)}
        </span>
      </div>

      {error && (
        <p className="now-playing__error">
          {error}
        </p>
      )}
    </section>
  );
}
import "./now-playing.css";
import { formatTime } from "../../utils/time";

interface NowPlayingProps {
  title: string;
  artist: string;

  currentTime: number;
  duration: number;

  isPlaying: boolean;

  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
}

function NowPlaying({
  title,
  artist,
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
}: NowPlayingProps) {
  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  return (
    <section className="now-playing">

      <p className="now-playing__label">
        NOW PLAYING
      </p>

      <h2 className="now-playing__title">
        {title}
      </h2>

      <p className="now-playing__artist">
        {artist}
      </p>

      <div
        className="now-playing__waveform"
        aria-hidden="true"
      >
        {Array.from({ length: 20 }).map(
          (_, index) => (
            <span key={index} />
          ),
        )}
      </div>

      <div className="player-controls">

        <button
          className="player-control player-control--secondary"
          type="button"
          aria-label="Previous song"
          onClick={onPrevious}
        >
          <span className="player-icon player-icon--previous">
            <i />
          </span>
        </button>

        <button
          className="player-control player-control--primary"
          type="button"
          aria-label={
            isPlaying ? "Pause" : "Play"
          }
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <span className="player-icon player-icon--pause">
              <i />
              <i />
            </span>
          ) : (
            <span className="player-icon player-icon--play" />
          )}
        </button>

        <button
          className="player-control player-control--secondary"
          type="button"
          aria-label="Next song"
          onClick={onNext}
        >
          <span className="player-icon player-icon--next">
            <i />
          </span>
        </button>

      </div>

      <div className="progress-container">

        <span className="progress-time">
          {formatTime(currentTime)}
        </span>

        <input
          className="progress-input"
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(event) =>
            onSeek(Number(event.target.value))
          }
          aria-label="Song progress"
          style={{
            "--progress":
              `${progress}%`,
          } as React.CSSProperties}
        />

        <span className="progress-time">
          {formatTime(duration)}
        </span>

      </div>

    </section>
  );
}

export default NowPlaying;
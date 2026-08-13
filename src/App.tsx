import { useEffect, useMemo, useState } from "react";

import AtmosphereEngine from "./components/Atmosphere/AtmosphereEngine";
import CinematicBackground from "./components/Background/CinematicBackground";
import JaamBrand from "./components/Brand/JaamBrand";
import PlaylistCard from "./components/Playlist/PlaylistCard";
import NowPlaying from "./components/Player/NowPlaying";

import { jaamPlaylists } from "./data/playlists";
import { jaamThemes } from "./data/themes";
import { jaamTracks } from "./data/tracks";

import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useQueue } from "./hooks/useQueue";
import { useSceneTransition } from "./hooks/useSceneTransition";
import { createJaamScene } from "./utils/createJaamScene";

import "./styles/global.css";

function App() {
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const {
    queue,
    currentTrack,
    hasNext,
    setPlaylist,
    next,
    previous,
  } = useQueue(jaamTracks);

  useEffect(() => {
    if (queue.playlistId) return;

    const firstPlaylist = jaamPlaylists[0];
    if (firstPlaylist) setPlaylist(firstPlaylist.id);
  }, [queue.playlistId, setPlaylist]);

  const handleEnded = () => {
    setShouldAutoPlay(true);
    next();
  };

  const {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    error,
    togglePlay,
    seek,
  } = useAudioPlayer({
    track: currentTrack,
    autoPlay: shouldAutoPlay,
    onEnded: handleEnded,
  });

  const handleNext = () => {
    setShouldAutoPlay(isPlaying);
    next();
  };

  const handlePrevious = () => {
    setShouldAutoPlay(isPlaying);
    previous();
  };

  const handlePlayPause = async () => {
    if (!isPlaying) setShouldAutoPlay(true);
    await togglePlay();
  };

  const handlePlaylistChange = (playlistId: string) => {
    setShouldAutoPlay(false);
    setPlaylist(playlistId);
  };

  const initialScene = useMemo(() => {
    const firstTrack = jaamTracks[0];
    if (!firstTrack) {
      throw new Error("JAAM requires at least one track.");
    }
    return createJaamScene(firstTrack, jaamThemes);
  }, []);

  const {
    currentScene,
    previousScene,
    phase,
    transitionTo,
  } = useSceneTransition(initialScene);

  useEffect(() => {
    if (!currentTrack) return;
    transitionTo(createJaamScene(currentTrack, jaamThemes));
  }, [currentTrack?.id, transitionTo]);

  const theme = currentScene.theme;

  const themeStyle = {
    "--jaam-primary": theme.colors.primary,
    "--jaam-secondary": theme.colors.secondary,
    "--jaam-accent": theme.colors.accent,
    "--jaam-background": theme.colors.background,
    "--jaam-text": theme.colors.text,
    "--jaam-glow": theme.atmosphere.glow,
  } as React.CSSProperties;

  const backgroundImage = currentScene.theme.background.image;

  return (
    <main className="app jaam" style={themeStyle}>
      <CinematicBackground
        image={backgroundImage}
        glow={theme.atmosphere.glow}
        overlay={theme.atmosphere.overlay}
        position={theme.background.position}
        brightness={theme.background.brightness}
        saturation={theme.background.saturation}
      />

      <div
        className={`jaam-scene-transition jaam-scene-transition--${phase}`}
        aria-hidden="true"
      >
        {previousScene && (
          <span data-scene="previous" />
        )}
      </div>

      <AtmosphereEngine
        color={theme.colors.primary}
        glow={theme.atmosphere.glow}
        particleColor={theme.atmosphere.particle}
        intensity={theme.atmosphere.intensity}
        particleCount={theme.atmosphere.particleCount}
        haze={theme.atmosphere.haze}
        motionSpeed={theme.atmosphere.motionSpeed}
      />

      <div className="jaam-layout">
        <header className="jaam-layout__brand">
          <JaamBrand />
        </header>

        <aside className="jaam-layout__playlists">
          <div className="playlist-list">
            {jaamPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                active={playlist.id === queue.playlistId}
                onClick={() => handlePlaylistChange(playlist.id)}
              />
            ))}
          </div>
        </aside>

        <section className="jaam-layout__player">
          {currentTrack && (
            <NowPlaying
              title={currentTrack.title}
              artist={currentTrack.artist}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              isLoading={isLoading}
              error={error}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSeek={seek}
              canNext={hasNext}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;

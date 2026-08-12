import CinematicBackground from "./components/Background/CinematicBackground";
import JaamBrand from "./components/Brand/JaamBrand";
import PlaylistCard from "./components/Playlist/PlaylistCard";
import NowPlaying from "./components/Player/NowPlaying";

import { jaamPlaylists } from "./data/playlists";
import { jaamThemes } from "./data/themes";
import { jaamTracks } from "./data/tracks";

import { useAudioPlayer } from "./hooks/useAudioPlayer";

function App() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    previous,
    next,
    seek,
  } = useAudioPlayer(jaamTracks);

  const currentTheme =
    jaamThemes.find(
      (theme) =>
        theme.id === currentTrack?.themeId,
    ) ?? jaamThemes[0];

  return (
    <main className="app">

      <CinematicBackground
        image={currentTheme.background.image}
        glow={currentTheme.atmosphere.glow}
        overlay={currentTheme.atmosphere.overlay}
        position={currentTheme.background.position}
        brightness={currentTheme.background.brightness}
        saturation={currentTheme.background.saturation}
      />

      <div className="jaam-layout">

        <div className="jaam-layout__brand">
          <JaamBrand />
        </div>

        <aside className="jaam-layout__playlists">
          <div className="playlist-list">
            {jaamPlaylists.map(
              (playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  active={
                    playlist.themeId ===
                    currentTheme.id
                  }
                />
              ),
            )}
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
              onPlayPause={togglePlay}
              onPrevious={previous}
              onNext={next}
              onSeek={seek}
            />
          )}

        </section>

      </div>
    </main>
  );
}

export default App;
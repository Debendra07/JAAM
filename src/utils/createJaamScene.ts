import type { JaamScene } from "../types/scene";
import type { JaamTheme } from "../types/theme";
import type { JaamTrack } from "../types/track";

export function createJaamScene(
  track: JaamTrack,
  themes: JaamTheme[],
): JaamScene {
  const theme =
    themes.find((item) => item.id === track.themeId) ??
    themes[0];

  if (!theme) {
    throw new Error(`No JAAM theme found for track "${track.id}".`);
  }

  return { track, theme };
}

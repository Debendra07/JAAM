import type { JaamTheme } from "./theme";
import type { JaamTrack } from "./track";

export interface JaamScene {
  track: JaamTrack;
  theme: JaamTheme;
}

export type SceneTransitionPhase = "idle" | "exiting" | "entering";

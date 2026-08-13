import type { JaamScene, SceneTransitionPhase } from "../../types/scene";
import { assetPath } from "../../utils/assetPath";
import "./scene-transition.css";

interface SceneTransitionProps {
  currentScene: JaamScene;
  previousScene: JaamScene | null;
  phase: SceneTransitionPhase;
}

export default function SceneTransition({
  currentScene,
  previousScene,
  phase,
}: SceneTransitionProps) {
  const theme = currentScene.theme;

  return (
    <div
      className={`scene-transition scene-transition--${phase}`}
      style={
        {
          "--scene-background": theme.colors.background,
          "--scene-glow": theme.atmosphere.glow,
          "--scene-position": theme.background.position,
          "--scene-brightness": theme.background.brightness,
          "--scene-saturation": theme.background.saturation,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {previousScene && (
        <div
          className="scene-layer scene-layer--previous"
          style={
            {
              "--scene-previous-position": previousScene.theme.background.position,
              "--scene-previous-brightness": previousScene.theme.background.brightness,
              "--scene-previous-saturation": previousScene.theme.background.saturation,
            } as React.CSSProperties
          }
        >
          <img
            src={assetPath(previousScene.theme.background.image)}
            alt=""
          />
        </div>
      )}

      <div className="scene-layer scene-layer--current">
        <img src={assetPath(theme.background.image)} alt="" />
      </div>

      <div className="scene-layer__color" />
      <div className="scene-layer__flash" />
      <div className="scene-layer__vignette" />
    </div>
  );
}

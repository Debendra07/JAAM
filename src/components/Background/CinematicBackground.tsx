import "./cinematic-background.css";

interface CinematicBackgroundProps {
  image: string;
  glow?: string;
  overlay?: string;
  position?: string;
  brightness?: number;
  saturation?: number;
}

function CinematicBackground({
  image,
  glow = "rgba(245, 184, 75, 0.2)",
  overlay = "rgba(0, 0, 0, 0.5)",
  position = "center",
  brightness = 0.62,
  saturation = 0.9,
}: CinematicBackgroundProps) {
  return (
    <div
      className="cinematic-background"
      style={
        {
          "--jaam-glow": glow,
          "--jaam-overlay": overlay,
          "--jaam-position": position,
          "--jaam-brightness": brightness,
          "--jaam-saturation": saturation,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="cinematic-background__base" />

      <div className="cinematic-background__image">
        <img src={image} alt="" />
      </div>

      <div className="cinematic-background__overlay" />

      <div className="cinematic-background__glow" />

      <div className="cinematic-background__vignette" />
    </div>
  );
}

export default CinematicBackground;
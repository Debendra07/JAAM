import { useEffect, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState(image);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (image === currentImage) return;

    setPreviousImage(currentImage);
    setCurrentImage(image);
    setTransitioning(true);

    const timer = window.setTimeout(() => {
      setPreviousImage(null);
      setTransitioning(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [image, currentImage]);

  const style = {
    "--jaam-glow": glow,
    "--jaam-overlay": overlay,
    "--jaam-position": position,
    "--jaam-brightness": brightness,
    "--jaam-saturation": saturation,
  } as React.CSSProperties;

  return (
    <div className="cinematic-background" style={style} aria-hidden="true">
      <div className="cinematic-background__base" />

      {previousImage && (
        <div className="cinematic-background__image cinematic-background__image--previous">
          <img src={previousImage} alt="" />
        </div>
      )}

      <div
        className={`cinematic-background__image ${
          transitioning ? "cinematic-background__image--enter" : ""
        }`}
      >
        <img src={currentImage} alt="" />
      </div>

      <div className="cinematic-background__overlay" />
      <div className="cinematic-background__glow" />
      <div className="cinematic-background__vignette" />
    </div>
  );
}

export default CinematicBackground;

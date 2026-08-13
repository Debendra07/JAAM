import { useEffect, useState } from "react";
import { assetPath } from "../../utils/assetPath";
import "./track-artwork.css";

interface TrackArtworkProps {
  src: string;
  title: string;
  artist: string;
}

export default function TrackArtwork({ src, title, artist }: TrackArtworkProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (src === currentSrc) return;

    setChanging(true);

    const timer = window.setTimeout(() => {
      setCurrentSrc(src);
      setChanging(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [src, currentSrc]);

  return (
    <div className={`artwork ${changing ? "artwork--changing" : ""}`}>
      <img
        src={assetPath(currentSrc)}
        alt={`${title} by ${artist}`}
      />
    </div>
  );
}

import type { JaamPlaylist } from "../../types/playlist";
import { assetPath } from "../../utils/assetPath";

import "./playlist-card.css";

interface PlaylistCardProps {
  playlist: JaamPlaylist;
  active: boolean;
  onClick: () => void;
}

export default function PlaylistCard({
  playlist,
  active,
  onClick,
}: PlaylistCardProps) {
  return (
    <button
      type="button"
      className={`playlist-card${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="playlist-card__artwork">
        <img
          src={assetPath(playlist.artwork)}
          alt=""
          draggable={false}
        />
      </span>

      <span className="playlist-card__copy">
        <b>{playlist.name}</b>
        <small>{playlist.subtitle}</small>
      </span>
    </button>
  );
}

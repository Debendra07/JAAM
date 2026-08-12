import type { JaamPlaylist } from "../../types/playlist";

import "./playlist-card.css";

interface PlaylistCardProps {
  playlist: JaamPlaylist;
  active?: boolean;
  onClick?: () => void;
}

function PlaylistCard({
  playlist,
  active = false,
  onClick,
}: PlaylistCardProps) {
  return (
    <button
      className={`playlist-card ${
        active ? "playlist-card--active" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="playlist-card__icon">
        {playlist.icon}
      </span>

      <span className="playlist-card__content">
        <span className="playlist-card__name">
          {playlist.name}
        </span>

        <span className="playlist-card__description">
          {playlist.description}
        </span>
      </span>
    </button>
  );
}

export default PlaylistCard;
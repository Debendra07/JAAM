/**
 * JAAM Playlist
 *
 * Defines the metadata required to represent
 * an alcohol-themed music playlist.
 */
export interface JaamPlaylist {
  /**
   * Unique playlist identifier.
   *
   * Example:
   * "whiskey-nights"
   */
  id: string;

  /**
   * Display name shown in the JAAM UI.
   *
   * Example:
   * "Whiskey Nights"
   */
  name: string;

  /**
   * Short description shown below the playlist name.
   */
  subtitle: string;

  /**
   * Theme identifier used by the scene system.
   *
   * This connects the playlist to its
   * cinematic visual identity.
   */
  themeId: string;

  /**
   * Playlist artwork path.
   *
   * Example:
   * "artwork/whiskey.svg"
   */
  artwork: string;
}
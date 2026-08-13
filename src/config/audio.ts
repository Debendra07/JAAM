const AUDIO_BASE_URL =
  import.meta.env.VITE_AUDIO_BASE_URL?.replace(/\/+$/, "");

export function audioUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");

  if (!AUDIO_BASE_URL) {
    throw new Error(
      "VITE_AUDIO_BASE_URL is not configured."
    );
  }

  return `${AUDIO_BASE_URL}/${cleanPath}`;
}
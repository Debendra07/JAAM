import type { JaamTheme } from "../types/theme";

export const jaamThemes: JaamTheme[] = [
  {
    id: "whiskey",
    name: "Whiskey Nights",

    colors: {
      primary: "#f5b84b",
      secondary: "#8c4f1f",
      accent: "#ffcf70",
      background: "#050302",
      text: "#f5f3ee",
    },

    atmosphere: {
      glow: "rgba(245, 184, 75, 0.25)",
      overlay: "rgba(10, 4, 1, 0.48)",
      particle: "#f5b84b",
    },

    background: {
      image: `${import.meta.env.BASE_URL}backgrounds/whiskey/whiskey-night-01.jpg`,
      position: "center",
      brightness: 0.62,
      saturation: 0.9,
    },
  },

  {
    id: "beer",
    name: "Beer Hall",

    colors: {
      primary: "#f2a93b",
      secondary: "#9c641d",
      accent: "#ffd477",
      background: "#080502",
      text: "#f5f3ee",
    },

    atmosphere: {
      glow: "rgba(242, 169, 59, 0.22)",
      overlay: "rgba(8, 5, 2, 0.5)",
      particle: "#ffd477",
    },

    background: {
      image: "/backgrounds/beer/beer-hall-01.jpg",
      position: "center",
      brightness: 0.58,
      saturation: 0.95,
    },
  },

  {
    id: "wine",
    name: "Wine Collection",

    colors: {
      primary: "#b8475d",
      secondary: "#571525",
      accent: "#e88b9c",
      background: "#090204",
      text: "#f5f3ee",
    },

    atmosphere: {
      glow: "rgba(184, 71, 93, 0.22)",
      overlay: "rgba(8, 1, 4, 0.52)",
      particle: "#e88b9c",
    },

    background: {
      image: "/backgrounds/wine/wine-collection-01.jpg",
      position: "center",
      brightness: 0.56,
      saturation: 0.92,
    },
  },

  {
    id: "cocktail",
    name: "Cocktail Lounge",

    colors: {
      primary: "#7b8cff",
      secondary: "#442c9b",
      accent: "#9de7ff",
      background: "#030308",
      text: "#f5f3ee",
    },

    atmosphere: {
      glow: "rgba(123, 140, 255, 0.24)",
      overlay: "rgba(2, 3, 12, 0.52)",
      particle: "#9de7ff",
    },

    background: {
      image: "/backgrounds/cocktail/cocktail-lounge-01.jpg",
      position: "center",
      brightness: 0.58,
      saturation: 1.05,
    },
  },
];
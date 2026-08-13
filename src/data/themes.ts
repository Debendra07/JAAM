import type { JaamTheme } from "../types/theme";

function makeTheme(
  id: string,
  name: string,
  primary: string,
  secondary: string,
  accent: string,
  background: string,
  backgroundImage: string,
  atmosphere: {
    intensity: number;
    particleCount: number;
    haze: number;
    motionSpeed: number;
  },
): JaamTheme {
  return {
    id,
    name,

    colors: {
      primary,
      secondary,
      accent,
      background,
      text: "#f5f3ee",
    },

    atmosphere: {
      glow: `${primary}44`,
      overlay: "rgba(4, 2, 4, 0.5)",
      particle: accent,
      ...atmosphere,
    },

    background: {
      image: backgroundImage,
      position: "center",
      brightness: 0.72,
      saturation: 1,
    },
  };
}

export const jaamThemes: JaamTheme[] = [
  makeTheme(
    "whiskey",
    "Whiskey Nights",
    "#f5b84b",
    "#8c4f1f",
    "#ffcf70",
    "#050302",
    "backgrounds/whiskey/whiskey-night-01.jpg",
    {
      intensity: 1,
      particleCount: 34,
      haze: 0.16,
      motionSpeed: 1,
    },
  ),

  makeTheme(
    "wine",
    "Wine Collection",
    "#b8475d",
    "#571525",
    "#e88b9c",
    "#090204",
    "backgrounds/wine/wine-01.jpg",
    {
      intensity: 0.85,
      particleCount: 26,
      haze: 0.2,
      motionSpeed: 0.75,
    },
  ),

  makeTheme(
    "cocktail",
    "Cocktail Lounge",
    "#7b8cff",
    "#442c9b",
    "#9de7ff",
    "#030308",
    "backgrounds/cocktail/cocktail-01.jpg",
    {
      intensity: 1.05,
      particleCount: 40,
      haze: 0.12,
      motionSpeed: 1.25,
    },
  ),

  makeTheme(
    "beer",
    "Beer Hall",
    "#f2a93b",
    "#9c641d",
    "#ffd477",
    "#080502",
    "backgrounds/beer/beer-01.jpg",
    {
      intensity: 0.95,
      particleCount: 30,
      haze: 0.17,
      motionSpeed: 0.95,
    },
  ),

  makeTheme(
    "vodka",
    "Vodka Freeze",
    "#9de7ff",
    "#416b91",
    "#d8f7ff",
    "#02070a",
    "backgrounds/vodka/vodka-01.jpg",
    {
      intensity: 0.9,
      particleCount: 28,
      haze: 0.14,
      motionSpeed: 0.85,
    },
  ),

  makeTheme(
    "champagne",
    "Champagne Life",
    "#e7c978",
    "#9d8040",
    "#fff0b0",
    "#080704",
    "backgrounds/champagne/champagne-01.jpg",
    {
      intensity: 0.95,
      particleCount: 36,
      haze: 0.12,
      motionSpeed: 1.05,
    },
  ),

  makeTheme(
    "after-hours",
    "After Hours",
    "#a98cff",
    "#4b327e",
    "#d2c4ff",
    "#040207",
    "backgrounds/after-hours/after-hours-01.jpg",
    {
      intensity: 0.7,
      particleCount: 18,
      haze: 0.22,
      motionSpeed: 0.55,
    },
  ),
];
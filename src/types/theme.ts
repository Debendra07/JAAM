export interface JaamAtmosphere {
  glow: string;
  overlay: string;
  particle: string;
  intensity: number;
  particleCount: number;
  haze: number;
  motionSpeed: number;
}

export interface JaamTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  atmosphere: JaamAtmosphere;
  background: {
    image: string;
    position: string;
    brightness: number;
    saturation: number;
  };
}

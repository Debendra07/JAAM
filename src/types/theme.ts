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

  atmosphere: {
    glow: string;
    overlay: string;
    particle: string;
  };

  background: {
    image: string;
    position: string;
    brightness: number;
    saturation: number;
  };
}
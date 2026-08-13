import AmbientGlow from "./AmbientGlow";
import AmbientHaze from "./AmbientHaze";
import AmbientParticles from "./AmbientParticles";
import "./atmosphere.css";
import "./ambient-haze.css";
import "./ambient-particles.css";

interface AtmosphereEngineProps {
  color: string;
  glow: string;
  particleColor: string;
  intensity?: number;
  particleCount?: number;
  haze?: number;
  motionSpeed?: number;
}

function AtmosphereEngine({
  color,
  glow,
  particleColor,
  intensity = 1,
  particleCount = 30,
  haze = 0.16,
  motionSpeed = 1,
}: AtmosphereEngineProps) {
  return (
    <div
      className="atmosphere-engine"
      style={
        {
          "--atmosphere-color": color,
          "--atmosphere-glow": glow,
          "--atmosphere-particle": particleColor,
          "--atmosphere-intensity": intensity,
          "--atmosphere-haze": haze,
          "--atmosphere-speed": motionSpeed,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <AmbientGlow />
      <AmbientHaze />
      <AmbientParticles count={particleCount} speed={motionSpeed} />
    </div>
  );
}

export default AtmosphereEngine;

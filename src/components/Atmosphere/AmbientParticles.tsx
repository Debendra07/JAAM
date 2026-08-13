import { useMemo } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface AmbientParticlesProps {
  count?: number;
  speed?: number;
}

function AmbientParticles({ count = 30, speed = 1 }: AmbientParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const safeSpeed = Math.max(speed, 0.1);

    return Array.from({ length: count }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: (Math.random() * 12 + 14) / safeSpeed,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.45 + 0.15,
    }));
  }, [count, speed]);

  return (
    <div className="ambient-particles">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="ambient-particle"
          style={
            {
              "--particle-left": `${particle.left}%`,
              "--particle-top": `${particle.top}%`,
              "--particle-size": `${particle.size}px`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-delay": `${particle.delay}s`,
              "--particle-opacity": particle.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default AmbientParticles;

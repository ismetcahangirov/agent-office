import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { useLoudness } from '../Episode';
import { KaxoSpec } from '../theme';

// KAXO as a code-driven puppet (RULES §5.0): pose sprites from content/assets/kaxo-rig,
// a springy entrance, idle breathing and a small bounce that follows the voice.
const WAIST = new Set(['surprised', 'laugh', 'think', 'point']);

export const Kaxo: React.FC<{ spec: NonNullable<KaxoSpec>; small?: boolean; from: number; enter?: boolean }> = ({ spec, small, from, enter: animate = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loud = useLoudness(from);
  const waist = WAIST.has(spec.pose);
  // waist-up poses fill more of the frame; full-body poses stand on the floor
  // over a full-screen graphic KAXO steps into the bottom-right corner so he never covers the text
  const height = (small ? (waist ? 0.42 : 0.5) : waist ? 0.92 : 0.86) * (spec.scale || 1) * 1080;
  const x = (small ? 0.9 : spec.x ?? 0.78) * 1920;
  const enter = animate ? spring({ frame, fps, config: { damping: 12, mass: 0.6 } }) : 1;
  const t = frame + from; // breathing continues smoothly across shots
  const breathe = Math.sin(t / 18) * 0.008;
  const talk = loud * 0.025;
  const tilt = Math.sin(t / 23) * 1.2 + loud * 2;
  return (
    <div style={{ position: 'absolute', left: x, bottom: waist ? -20 : 30, transform: 'translateX(-50%)', height }}>
      <Img
        src={staticFile(`kaxo-rig/${spec.pose}.png`)}
        style={{
          height: '100%',
          transformOrigin: '50% 100%',
          transform: `translateY(${(1 - enter) * 400}px) scaleX(${spec.flip ? -1 : 1}) scaleY(${1 + breathe + talk}) rotate(${tilt}deg)`,
          filter: 'drop-shadow(0 14px 18px rgba(43,33,24,.25))',
        }}
      />
    </div>
  );
};

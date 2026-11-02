import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { EPISODE_SCENES } from './episode';
import { STORY_SCENES } from './stories';
import { EUROPE_SCENES } from './europe';
import { GLASS_SCENES } from './glass';

// Background scenes drawn in code (RULES §5.0). Generic ones live here; topic scenes in episode.tsx (Japan),
// stories.tsx (Japan story vignettes) and europe.tsx (potato episode, incl. the European "document"), glass.tsx (glass episode).
const dots = `radial-gradient(circle, rgba(43,33,24,.07) 3px, transparent 4px) 0 0/56px 56px`;

export const Studio: React.FC = () => (
  <AbsoluteFill style={{ background: `${dots}, ${C.cream}` }}>
    <div style={{ position: 'absolute', left: -100, right: -100, top: 640, height: 520, background: C.mustard, transform: 'skewY(-3deg)' }} />
  </AbsoluteFill>
);

// A Japanese document (scene "paper"): a hanging scroll on a wooden desk; vertical brush lines are written in one by one,
// then a red seal lands. Never an empty frame (owner review, 2026-10-31).
export const Paper: React.FC = () => {
  const f = useCurrentFrame();
  const cols = 9;
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 30%, #6b4a33 0%, #3b2a1e 80%)' }}>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
        <rect x={0} y={860} width={1920} height={220} fill="#8c6a48" stroke={C.ink} strokeWidth={6} />
        <rect x={430} y={90} width={1060} height={780} rx={10} fill="#f4e6c4" stroke={C.ink} strokeWidth={6} />
        <rect x={400} y={70} width={1120} height={36} rx={18} fill="#7a5230" stroke={C.ink} strokeWidth={6} />
        <rect x={400} y={856} width={1120} height={36} rx={18} fill="#7a5230" stroke={C.ink} strokeWidth={6} />
        {Array.from({ length: cols }).map((_, i) => {
          const x = 1380 - i * 105;
          const draw = interpolate(f, [i * 5, i * 5 + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const len = 380 + ((i * 137) % 260);
          return (
            <g key={i}>
              {Array.from({ length: 9 }).map((__, j) => {
                const y = 160 + j * 70;
                if (y > 160 + len * draw) return null;
                const w = 18 + ((i * 7 + j * 13) % 22);
                return <path key={j} d={`M ${x - w} ${y} q ${w} -14 ${w * 2} 4 M ${x} ${y - 10} l ${((i + j) % 3) - 1} 34`} stroke={C.ink} strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.85} />;
              })}
            </g>
          );
        })}
        <g transform={`translate(560 760) scale(${interpolate(f, [50, 58, 62], [2, 0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`} opacity={f > 50 ? 1 : 0}>
          <rect x={-55} y={-55} width={110} height={110} rx={10} fill="none" stroke={C.tomato} strokeWidth={12} />
          <path d="M -25 -25 h 50 M 0 -30 v 60 M -25 25 h 50" stroke={C.tomato} strokeWidth={12} strokeLinecap="round" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Public-domain archive image, shown whole on a paper mat (the camera move gives it life); small scans are scaled up.
export const Archive: React.FC<{ src: string }> = ({ src }) => (
  <AbsoluteFill style={{ background: `${dots}, ${C.ink}`, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: '#f4e6c4', padding: 26, borderRadius: 12, boxShadow: '0 30px 60px rgba(0,0,0,.45)', transform: 'rotate(-1.2deg)' }}>
      <Img src={staticFile(src)} style={{ height: 860, maxWidth: 1500, objectFit: 'contain', display: 'block' }} />
    </div>
  </AbsoluteFill>
);

export const Scene: React.FC<{ name: string; image?: string }> = ({ name, image }) => {
  if (image) return <Archive src={image} />;
  if (name === 'paper') return <Paper />;
  const S = EPISODE_SCENES[name] || STORY_SCENES[name] || EUROPE_SCENES[name] || GLASS_SCENES[name];
  return S ? <S /> : <Studio />;
};

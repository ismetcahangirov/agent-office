import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../theme';
import japan from './japan.json';

// Japan from Natural Earth 1:50m (public domain), projected by tools in work/geo -> japan.json.
const NAMES: Record<string, string> = { tokyo: 'Tokyo (Edo)', nagasaki: 'Nagasaki', hikone: 'Hikone', kobe: 'Kobe', nara: 'Nara', kyoto: 'Kyoto', yokohama: 'Yokohama' };

export const JapanMap: React.FC<{ focus: string; label?: string }> = ({ focus, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = spring({ frame, fps, config: { damping: 20 } });
  const pin = spring({ frame: frame - 12, fps, config: { damping: 9 } });
  const p = (japan.places as Record<string, number[]>)[focus];
  const pulse = 1 + Math.sin(frame / 6) * 0.08;
  return (
    <AbsoluteFill style={{ background: C.sky }}>
      <svg viewBox={`-60 -40 ${japan.w + 120} ${japan.h + 80}`} style={{ position: 'absolute', left: 300, top: 20, height: 1040, width: 1040 * (japan.w + 120) / (japan.h + 80) }}>
        {/* soft waves */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${-60 + ((frame * 0.6 + i * 170) % 1100)} ${80 + i * 170} q 20 -14 40 0 t 40 0`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={0.5} />
        ))}
        <g style={{ opacity: draw }}>
          {japan.paths.map((d, i) => (
            <path key={i} d={d} fill={C.olive} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          ))}
        </g>
        {p && (
          <g transform={`translate(${p[0]} ${p[1]}) scale(${pin * pulse})`}>
            <circle r={46} fill={C.tomato} opacity={0.25} />
            <circle r={20} fill={C.tomato} stroke={C.ink} strokeWidth={5} />
          </g>
        )}
      </svg>
      {p && (
        <div style={{ position: 'absolute', left: 1180, top: 420, transform: `scale(${pin})`, transformOrigin: 'left center', background: C.ink, color: C.cream,
          padding: '24px 46px', borderRadius: 24, borderLeft: `20px solid ${C.tomato}`, fontSize: 84, lineHeight: 1 }}>
          {label || NAMES[focus] || focus}
          {label && NAMES[focus] && <div style={{ fontSize: 40, color: C.mustard, marginTop: 10, fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>{NAMES[focus]}</div>}
        </div>
      )}
    </AbsoluteFill>
  );
};

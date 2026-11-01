import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../theme';
import { Potato } from '../scenes/euro-parts';
import europe from './europe.json';

// Europe / Old World maps from Natural Earth 1:50m (public domain), projected by europe_geo.py -> europe.json.
// Each view is already 1920x1080 in pixels.
type View = { w: number; h: number; land: string; old?: string; prussia?: string; route?: number[][]; places: Record<string, number[]> };
const VIEWS = europe as unknown as Record<string, View>;
export const EURO_FOCUS = new Set(Object.keys(VIEWS));

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const MapText: React.FC<{ x: number; y: number; size?: number; anchor?: 'start' | 'middle' | 'end'; children: React.ReactNode; o?: number; italic?: boolean; color?: string }> = ({ x, y, size = 52, anchor = 'middle', children, o = 1, italic, color = C.cream }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={color} stroke={C.ink} strokeWidth={size / 5} strokeLinejoin="round" paintOrder="stroke"
    fontFamily="Lilita, sans-serif" fontStyle={italic ? 'italic' : undefined} opacity={o} letterSpacing={2}>{children}</text>
);

const Pin: React.FC<{ x: number; y: number; v: number }> = ({ x, y, v }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 6) * 0.08;
  return (
    <g transform={`translate(${x} ${y}) scale(${v * pulse})`}>
      <circle r={44} fill={C.tomato} opacity={0.25} />
      <circle r={19} fill={C.tomato} stroke={C.ink} strokeWidth={5} />
    </g>
  );
};

// point at fraction t along a polyline
const along = (pts: number[][], t: number) => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  let d = t * total;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = Math.min(1, d / seg[i]);
      return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k, dx: pts[i + 1][0] - pts[i][0] };
    }
    d -= seg[i];
  }
  return { x: pts[0][0], y: pts[0][1], dx: 1 };
};

export const EuroMap: React.FC<{ focus: string; label?: string }> = ({ focus, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = VIEWS[focus];
  const draw = spring({ frame, fps, config: { damping: 20 } });
  const hi = interpolate(frame, [8, 26], [0, 1], clamp);
  const pin = spring({ frame: frame - 14, fps, config: { damping: 9 } });
  const tag = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  const P = v.places;
  return (
    <AbsoluteFill style={{ background: C.sky }}>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <clipPath id="euroLand"><path d={v.land + (v.old || '')} /></clipPath>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${((frame * 0.7 + i * 290) % 2200) - 140} ${60 + ((i * 157) % 980)} q 22 -14 44 0 t 44 0`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={0.5} />
        ))}
        <g opacity={draw}>
          <path d={v.land} fill={focus === 'old-world' ? '#e3d6bd' : '#efe2c4'} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
          {v.old && <path d={v.old} fill="#efe2c4" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />}
          {v.old && <path d={v.old} fill={C.olive} opacity={hi} />}
          {v.old && <path d={v.old} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />}
        </g>
        {v.prussia && (
          <g clipPath="url(#euroLand)">
            <path d={v.prussia} fill={C.olive} opacity={hi * 0.9} stroke={C.ink} strokeWidth={5} strokeDasharray="14 10" />
          </g>
        )}
        {focus === 'pomerania' && (
          <g>
            <MapText x={P.prussia[0]} y={P.prussia[1] + 40} size={64} o={hi}>PRUSSIA</MapText>
            <MapText x={P.baltic[0]} y={P.baltic[1]} size={46} italic o={draw} color="#ffffff">Baltic Sea</MapText>
            <Pin x={P.kolberg[0]} y={P.kolberg[1]} v={pin} />
            <MapText x={P.kolberg[0] + 40} y={P.kolberg[1] - 30} size={50} anchor="start" o={pin}>Kolberg</MapText>
          </g>
        )}
        {focus === 'canary-antwerp' && v.route && (() => {
          const t = interpolate(frame, [14, 80], [0, 1], { ...clamp, easing: (x) => x * (2 - x) });
          const d = 'M' + v.route.map((p) => `${p[0]},${p[1]}`).join('L');
          const s = along(v.route, t);
          const bob = Math.sin(frame / 5) * 4;
          return (
            <g>
              <defs>
                <mask id="routeMask"><path d={d} stroke="#ffffff" strokeWidth={30} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} /></mask>
              </defs>
              <path d={d} stroke={C.tomato} strokeWidth={10} strokeDasharray="22 16" strokeLinecap="round" fill="none" mask="url(#routeMask)" />
              <MapText x={P.atlantic[0]} y={P.atlantic[1]} size={52} italic o={draw} color="#ffffff">Atlantic Ocean</MapText>
              <Pin x={P.canary[0]} y={P.canary[1]} v={pin} />
              <MapText x={P.canary[0] - 50} y={P.canary[1] + 16} size={50} anchor="end" o={pin}>Canary Islands</MapText>
              <Pin x={P.antwerp[0]} y={P.antwerp[1]} v={interpolate(t, [0.9, 1], [0, 1], clamp)} />
              <MapText x={P.antwerp[0] + 46} y={P.antwerp[1] - 24} size={50} anchor="start" o={interpolate(t, [0.85, 1], [0, 1], clamp)}>Antwerp</MapText>
              <g transform={`translate(${s.x} ${s.y - 30 + bob}) scale(${s.dx < 0 ? -1 : 1} 1)`}>
                <path d="M -46 0 L 46 0 L 32 26 L -32 26 Z" fill="#8a5a32" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
                <line x1={0} y1={0} x2={0} y2={-66} stroke={C.ink} strokeWidth={5} />
                <path d="M 4 -62 Q 40 -36 4 -8 Z" fill="#f5ead2" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
                <path d="M -4 -54 Q -30 -34 -4 -12 Z" fill="#f5ead2" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
              </g>
            </g>
          );
        })()}
        {focus === 'old-world' && (() => {
          const t = interpolate(frame, [30, 80], [0, 1], clamp);
          const a = P.andes, e = P.europe;
          const ctrl = [(a[0] + e[0]) / 2 - 60, Math.min(a[1], e[1]) - 260];
          const d = `M ${a[0]} ${a[1]} Q ${ctrl[0]} ${ctrl[1]} ${e[0]} ${e[1]}`;
          const q = (k: number) => [(1 - k) ** 2 * a[0] + 2 * (1 - k) * k * ctrl[0] + k * k * e[0], (1 - k) ** 2 * a[1] + 2 * (1 - k) * k * ctrl[1] + k * k * e[1]];
          const [px, py] = q(t);
          return (
            <g>
              {(['europe', 'asia', 'africa'] as const).map((k, i) => (
                <MapText key={k} x={P[k][0]} y={P[k][1] + (k === 'europe' ? -10 : 0)} size={k === 'europe' ? 50 : 64}
                  o={interpolate(frame, [14 + i * 6, 22 + i * 6], [0, 1], clamp)}>{k.toUpperCase()}</MapText>
              ))}
              <defs>
                <mask id="arcMask"><path d={d} stroke="#ffffff" strokeWidth={30} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} /></mask>
              </defs>
              <path d={d} stroke={C.tomato} strokeWidth={8} strokeDasharray="18 14" strokeLinecap="round" fill="none" mask="url(#arcMask)" />
              <Potato x={px} y={py} s={1.1} />
              <Potato x={a[0]} y={a[1]} s={0.9} r={20} />
            </g>
          );
        })()}
      </svg>
      {label && (
        <div style={{ position: 'absolute', left: 80, top: 70, transform: `translateX(${(1 - tag) * -700}px)`, background: C.ink, color: C.cream,
          padding: '22px 44px', borderRadius: 24, borderLeft: `20px solid ${C.tomato}`, fontSize: 72, lineHeight: 1 }}>
          {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

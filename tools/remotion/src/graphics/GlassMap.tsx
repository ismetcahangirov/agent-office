import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../theme';
import glass from './glass.json';

// Maps for the glass episode from Natural Earth 1:50m (public domain), projected by glass_geo.py -> glass.json.
// near-east: Egypt, the eastern Mediterranean coast, Anatolia, Mesopotamia; med-route: eastern Mediterranean -> Rome -> Venice.
// graphic.pins picks the places (keys of PLACES in glass_geo.py), graphic.route the animated line(s).
type View = { w: number; h: number; land: string; places: Record<string, number[]>; routes: Record<string, number[][]> };
const VIEWS = glass as unknown as Record<string, View>;
export const GLASS_FOCUS = new Set(Object.keys(VIEWS));

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const NAMES: Record<string, string> = {
  mesopotamia: 'Mesopotamia', nineveh: 'Nineveh', egypt: 'Egypt', cairo: 'Cairo', 'desert-glass': 'Libyan Desert',
  catalhoyuk: 'Çatalhöyük', amarna: 'Amarna', ashkelon: 'Ashkelon', qantir: 'Qantir', uluburun: 'Uluburun',
  jerusalem: 'Jerusalem', sidon: 'Sidon', rome: 'Rome', venice: 'Venice', greece: 'Greece',
};
// label side, so names do not run into the sea or each other
const LEFT = new Set(['egypt', 'desert-glass', 'cairo', 'qantir', 'amarna', 'ashkelon', 'jerusalem', 'sidon', 'rome', 'uluburun']);
const BELOW = new Set(['uluburun']);
const AREAS = new Set(['mesopotamia', 'egypt', 'desert-glass']); // regions: big text, no pin
const DEFAULT_PINS: Record<string, string[]> = { 'near-east': ['mesopotamia', 'egypt'], 'med-route': ['sidon', 'rome', 'venice'] };
const DEFAULT_ROUTE: Record<string, string[]> = { 'near-east': [], 'med-route': ['west', 'north'] };

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

const along = (pts: number[][], t: number) => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let d = t * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = Math.min(1, d / seg[i]);
      return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k, dx: pts[i + 1][0] - pts[i][0] };
    }
    d -= seg[i];
  }
  return { x: pts[0][0], y: pts[0][1], dx: 1 };
};

// a small boat carrying blue glass ingots
const Boat: React.FC<{ x: number; y: number; flip: boolean }> = ({ x, y, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
    <path d="M -50 0 L 50 0 L 34 28 L -34 28 Z" fill="#8a5a32" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    {[-26, -6, 14].map((bx) => <rect key={bx} x={bx} y={-14} width={18} height={14} rx={4} fill="#2f6fd6" stroke={C.ink} strokeWidth={3} />)}
    <line x1={0} y1={0} x2={0} y2={-70} stroke={C.ink} strokeWidth={5} />
    <path d="M 4 -66 Q 42 -40 4 -14 Z" fill="#f5ead2" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

export const GlassMap: React.FC<{ focus: string; label?: string; pins?: string[]; route?: string[] }> = ({ focus, label, pins, route }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = VIEWS[focus];
  const draw = spring({ frame, fps, config: { damping: 20 } });
  const tag = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  const P = v.places;
  const ps = pins || DEFAULT_PINS[focus];
  const rs = route || DEFAULT_ROUTE[focus];
  const t = interpolate(frame, [16, 90], [0, 1], { ...clamp, easing: (x) => x * (2 - x) });
  return (
    <AbsoluteFill style={{ background: C.sky }}>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${((frame * 0.7 + i * 290) % 2200) - 140} ${60 + ((i * 157) % 980)} q 22 -14 44 0 t 44 0`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={0.5} />
        ))}
        <path d={v.land} fill="#efe2c4" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" opacity={draw} />
        {focus === 'near-east' && <MapText x={360} y={470} size={46} italic o={draw} color="#ffffff">Mediterranean Sea</MapText>}
        {focus === 'med-route' && <MapText x={760} y={860} size={46} italic o={draw} color="#ffffff">Mediterranean Sea</MapText>}
        {rs.map((k, ri) => {
          const pts = v.routes[k];
          if (!pts) return null;
          // several routes run one after another
          const tt = interpolate(t * rs.length - ri, [0, 1], [0, 1], clamp);
          const d = 'M' + pts.map((p) => `${p[0]},${p[1]}`).join('L');
          const s = along(pts, tt);
          return (
            <g key={k}>
              <defs>
                <mask id={`gm-${k}`}><path d={d} stroke="#ffffff" strokeWidth={30} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - tt} /></mask>
              </defs>
              <path d={d} stroke={C.tomato} strokeWidth={10} strokeDasharray="22 16" strokeLinecap="round" fill="none" mask={`url(#gm-${k})`} />
              {k === 'ship' && <Boat x={s.x} y={s.y - 30 + Math.sin(frame / 5) * 4} flip={s.dx < 0} />}
            </g>
          );
        })}
        {ps.map((k, i) => {
          const p = P[k];
          if (!p) return null;
          const pv = spring({ frame: frame - 14 - i * 10, fps, config: { damping: 9 } });
          if (AREAS.has(k)) return <MapText key={k} x={p[0]} y={p[1]} size={70} o={pv}>{NAMES[k].toUpperCase()}</MapText>;
          const left = LEFT.has(k);
          const below = BELOW.has(k);
          return (
            <g key={k}>
              <Pin x={p[0]} y={p[1]} v={pv} />
              <MapText x={below ? p[0] : p[0] + (left ? -46 : 46)} y={below ? p[1] + 88 : p[1] - 24} size={52} anchor={below ? 'middle' : left ? 'end' : 'start'} o={pv}>{NAMES[k]}</MapText>
            </g>
          );
        })}
      </svg>
      {label && (
        <div style={{ position: 'absolute', ...(focus === 'med-route' ? { right: 80 } : { left: 80 }), top: 70, transform: `translateX(${(1 - tag) * -700}px)`, background: C.ink, color: C.cream,
          padding: '22px 44px', borderRadius: 24, borderLeft: `20px solid ${C.tomato}`, fontSize: 72, lineHeight: 1 }}>
          {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

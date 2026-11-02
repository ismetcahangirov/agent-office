import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../theme';
import { Potato } from '../scenes/euro-parts';

// Answer Puzzle (RULES §3.4): a real jigsaw on a wooden table. Every reason is one piece of a picture
// (graphic.icon: "potato", default "dish"); the newest piece (index step-1) drops in with a bounce,
// earlier pieces are already in place, empty slots show a dashed outline and "?" over the faint silhouette.
// The board stays left of x 1400: KAXO stands small in the bottom-right corner.
const INK = C.ink;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const CX = 840; // board centre x (left of KAXO)
const PW = 1020, PH = 540; // design size of the pictures

// ---------- pictures (drawn in a 1020 x 540 box; bg fills the box, subject also makes the empty-board silhouette) ----------
type Pic = { bg: React.ReactNode; subject: React.ReactNode };

const POTATO = 'M -38 4 Q -40 -22 -10 -24 Q 20 -30 36 -12 Q 46 8 26 20 Q 0 30 -22 22 Q -38 18 -38 4 Z';
const potatoPic = (): Pic => {
  const k = 6.3;
  return {
    bg: (
      <g>
        <rect width={PW} height={PH} fill="#ffd98a" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i / 18) * Math.PI * 2, b = a + Math.PI / 18;
          return i % 2 ? null : <path key={i} d={`M 510 300 L ${510 + Math.cos(a) * 900} ${300 + Math.sin(a) * 900} L ${510 + Math.cos(b) * 900} ${300 + Math.sin(b) * 900} Z`} fill="#ffc95c" />;
        })}
        {/* potato plant leaves behind */}
        {[[120, 250, -30], [190, 200, -8], [900, 240, 30], [830, 190, 10], [100, 330, -60], [925, 320, 62]].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse rx={62} ry={34} fill={i % 2 ? '#5f9a3e' : '#73ad4a'} stroke={INK} strokeWidth={6} />
            <path d="M -50 0 H 50" stroke={INK} strokeWidth={4} opacity={0.4} />
          </g>
        ))}
        {[[215, 270], [800, 262]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-15} rx={11} ry={17} transform={`rotate(${a})`} fill="#f6f0fb" stroke={INK} strokeWidth={4} />)}
            <circle r={8} fill={C.mustard} stroke={INK} strokeWidth={3} />
          </g>
        ))}
        {/* soil */}
        <path d="M 0 430 Q 120 400 260 425 T 520 420 T 780 428 T 1020 415 V 540 H 0 Z" fill="#8a6a48" stroke={INK} strokeWidth={6} />
        <path d="M 0 480 Q 260 462 520 478 T 1020 470" stroke="#6b4a2e" strokeWidth={8} fill="none" />
        {[[90, 500], [330, 470], [700, 505], [940, 470], [520, 520]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={9} ry={6} fill="#b39d7e" stroke={INK} strokeWidth={3} />)}
        <Potato x={110} y={455} s={1.5} r={-14} />
        <Potato x={925} y={448} s={1.35} r={18} c="#a87a42" />
      </g>
    ),
    subject: (
      <g transform="translate(510 318)">
        <ellipse cx={0} cy={k * 24} rx={k * 40} ry={k * 6} fill="rgba(43,33,24,.3)" />
        <defs><clipPath id="pz-potato"><path d={POTATO} transform={`scale(${k})`} /></clipPath></defs>
        <path d={POTATO} transform={`scale(${k})`} fill="#c8955a" />
        <g clipPath="url(#pz-potato)">
          <ellipse cx={k * 16} cy={k * 22} rx={k * 46} ry={k * 18} fill="#a87a42" />
          <ellipse cx={-k * 14} cy={-k * 16} rx={k * 20} ry={k * 7} fill="#e2b679" />
        </g>
        <path d={POTATO} transform={`scale(${k})`} fill="none" stroke={INK} strokeWidth={10} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {[[-20, -6, 1], [8, 6, 1.1], [24, -12, 0.9], [-4, -15, 0.8], [-27, 10, 0.9], [28, 8, 0.8], [-8, 14, 0.7]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x * k} ${y * k}) scale(${s})`}>
            <ellipse rx={13} ry={8} fill="#7a5530" />
            <path d="M -14 -2 Q 0 -12 14 -2" stroke="#e8c58f" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        ))}
        <path d={`M ${-k * 28} ${-k * 12} q ${k * 7} ${-k * 8} ${k * 18} ${-k * 9}`} stroke="#f3dcaa" strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
    ),
  };
};

// Generic dish: a covered plate on a checked tablecloth (works for any food question).
const dishPic = (): Pic => ({
  bg: (
    <g>
      <rect width={PW} height={PH} fill="#fff1dc" />
      {Array.from({ length: 12 }).map((_, i) => <rect key={`v${i}`} x={i * 90} y={0} width={45} height={PH} fill={C.tomato} opacity={0.32} />)}
      {Array.from({ length: 7 }).map((_, i) => <rect key={`h${i}`} x={0} y={i * 90} width={PW} height={45} fill={C.tomato} opacity={0.32} />)}
      {/* fork and knife */}
      <g transform="translate(120 290)">
        <rect x={-10} y={-40} width={20} height={230} rx={10} fill="#c9ced6" stroke={INK} strokeWidth={6} />
        <path d="M -34 -170 V -80 Q -34 -40 0 -40 Q 34 -40 34 -80 V -170" fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
        <path d="M -34 -170 V -80 Q -34 -40 0 -40 Q 34 -40 34 -80 V -170 M 0 -170 V -50" fill="none" stroke="#c9ced6" strokeWidth={10} strokeLinecap="round" />
      </g>
      <g transform="translate(900 290)">
        <rect x={-10} y={-20} width={22} height={210} rx={10} fill="#7a5230" stroke={INK} strokeWidth={6} />
        <path d="M -10 -20 V -190 Q 40 -150 32 -20 Z" fill="#c9ced6" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  ),
  subject: (
    <g transform="translate(510 336) scale(0.84)">
      <ellipse cx={14} cy={30} rx={300} ry={170} fill="rgba(43,33,24,.3)" />
      <ellipse cx={0} cy={14} rx={300} ry={170} fill="#ffffff" stroke={INK} strokeWidth={8} />
      <ellipse cx={0} cy={22} rx={220} ry={118} fill="#f1ebe0" stroke="#d9cdb8" strokeWidth={5} />
      <path d="M -230 60 Q -230 -200 0 -205 Q 230 -200 230 60 Z" fill="#d6dbe2" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -160 20 Q -170 -130 -40 -170" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M -150 -40 Q -144 -100 -110 -130" stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
      <rect x={-250} y={52} width={500} height={32} rx={16} fill="#b8bec8" stroke={INK} strokeWidth={7} />
      <rect x={-22} y={-236} width={44} height={36} rx={10} fill="#b8bec8" stroke={INK} strokeWidth={7} />
      <circle cx={0} cy={-244} r={26} fill="#d6dbe2" stroke={INK} strokeWidth={7} />
    </g>
  ),
});

const PICS: Record<string, () => Pic> = { potato: potatoPic, dish: dishPic };

// ---------- jigsaw geometry ----------
// One tab as cubic segments in (u along the edge from its middle, v outward), both in units of the knob size S.
const TAB: [number, number][][] = [
  [[-0.07, 0.02], [-0.05, 0.05], [-0.09, 0.09]],
  [[-0.16, 0.15], [-0.15, 0.28], [0, 0.28]],
  [[0.15, 0.28], [0.16, 0.15], [0.09, 0.09]],
  [[0.05, 0.05], [0.07, 0.02], [0.1, 0]],
];
const edge = (x0: number, y0: number, x1: number, y1: number, sign: number, S: number) => {
  if (!sign) return `L ${x1} ${y1}`;
  const L = Math.hypot(x1 - x0, y1 - y0);
  const dx = (x1 - x0) / L, dy = (y1 - y0) / L, nx = dy, ny = -dx; // clockwise path: (dy, -dx) points outward
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  const p = (u: number, v: number) => `${(mx + dx * u * S + nx * v * S * sign).toFixed(1)} ${(my + dy * u * S + ny * v * S * sign).toFixed(1)}`;
  return `L ${p(-0.1, 0)} ${TAB.map((seg) => `C ${seg.map(([u, v]) => p(u, v)).join(' ')}`).join(' ')} L ${x1} ${y1}`;
};
const piecePath = (x: number, y: number, w: number, h: number, [t, r, b, l]: number[], S: number) =>
  `M ${x} ${y} ${edge(x, y, x + w, y, t, S)} ${edge(x + w, y, x + w, y + h, r, S)} ${edge(x + w, y + h, x, y + h, b, S)} ${edge(x, y + h, x, y, l, S)} Z`;

// ---------- backdrop: a warm wooden table under a lamp, a mug and a pencil ----------
const Table: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i}>
        <rect x={-40} y={i * 140 - 20} width={2000} height={140} fill={['#a8703f', '#9b6536', '#b07a46', '#a26a3a'][i % 4]} stroke="#5e3a1d" strokeWidth={5} />
        {Array.from({ length: 3 }).map((__, j) => {
          const y = i * 140 + 20 + j * 38;
          return <path key={j} d={`M -40 ${y} Q 400 ${y + ((i + j) % 3) * 10 - 10} 900 ${y + 6} T 1960 ${y - 4}`} stroke="#7d4f28" strokeWidth={4} fill="none" opacity={0.45} />;
        })}
        <ellipse cx={(i * 613) % 1800 + 60} cy={i * 140 + 50} rx={26} ry={10} fill="none" stroke="#6b4220" strokeWidth={5} opacity={0.5} />
      </g>
    ))}
    <defs>
      <radialGradient id="pz-lamp" cx="0.44" cy="0.45" r="0.7">
        <stop offset="0" stopColor="#ffe9b8" stopOpacity={0.45 + Math.sin(f / 40) * 0.03} />
        <stop offset="0.55" stopColor="#ffe9b8" stopOpacity={0.08} />
        <stop offset="1" stopColor="#1e120a" stopOpacity={0.55} />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#pz-lamp)" />
    {/* mug of tea, top left */}
    <g transform="translate(150 170)">
      <ellipse cx={14} cy={18} rx={96} ry={96} fill="rgba(30,18,10,.35)" />
      <rect x={70} y={-22} width={70} height={44} rx={22} fill="#f4ecdc" stroke={INK} strokeWidth={7} />
      <circle r={92} fill={C.tomato} stroke={INK} strokeWidth={8} />
      <circle r={70} fill="#f4ecdc" stroke={INK} strokeWidth={6} />
      <circle r={56} fill="#7a4a26" />
      <path d={`M -26 -14 q ${12 + Math.sin(f / 18) * 4} -14 30 -4`} stroke="#c58a55" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
    {/* pencil, bottom left */}
    <g transform="translate(150 745) rotate(-76)">
      <rect x={0} y={-14} width={230} height={28} fill={C.mustard} stroke={INK} strokeWidth={6} />
      <rect x={-34} y={-14} width={34} height={28} fill="#f2a0a0" stroke={INK} strokeWidth={6} />
      <path d="M 230 -14 L 280 0 L 230 14 Z" fill="#f1d3a2" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 266 -4 L 280 0 L 266 4 Z" fill={INK} />
    </g>
  </g>
);

export const Puzzle: React.FC<{ labels: string[]; step: number; title?: string; ans?: string; icon?: string }> = ({ labels, step, title, ans, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(1, labels.length);
  const rows = n <= 3 ? 1 : 2, cols = Math.ceil(n / rows);
  const cw = Math.min(340, 1100 / cols), ch = rows === 1 ? 300 : 270;
  const BW = cols * cw, BH = rows * ch, S = Math.min(cw, ch);
  const bx = CX - BW / 2, by = 190 + (540 - BH) / 2;
  const pic = (PICS[icon || 'dish'] || PICS.dish)();
  const fit = Math.max(BW / PW, BH / PH);
  const picG = (node: React.ReactNode) => <g transform={`translate(${(BW - PW * fit) / 2} ${(BH - PH * fit) / 2}) scale(${fit})`}>{node}</g>;

  const done = step >= n;
  const cfg = { damping: 7, mass: 0.9, stiffness: 95 };
  const DELAY = 8;
  const drop = step > 0 ? spring({ frame: frame - DELAY, fps, config: cfg }) : 1;
  let land = 40;
  for (let k = 0; k < 90; k++) if (spring({ frame: k, fps, config: cfg }) >= 0.98) { land = DELAY + k; break; }
  const head = spring({ frame, fps, config: { damping: 12 } });
  const ansV = spring({ frame: frame - land - 14, fps, config: { damping: 12 } });
  const complete = done ? interpolate(frame, [land + 4, land + 16], [0, 1], clamp) : 0;
  const zoom = interpolate(frame, [0, 150], [1, 1.035], clamp);

  // shared edges: tab direction per inner edge, fixed so neighbours always fit
  const exists = (r: number, c: number) => r * cols + c < n;
  const vS = (r: number, c: number) => ((r * 7 + c * 3) % 2 ? 1 : -1);
  const hS = (c: number) => (c % 2 ? -1 : 1);
  const pieces = labels.map((label, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const sides = [
      r > 0 ? -hS(c) : 0,
      c < cols - 1 && exists(r, c + 1) ? vS(r, c) : 0,
      r < rows - 1 && exists(r + 1, c) ? hS(c) : 0,
      c > 0 ? -vS(r, c - 1) : 0,
    ];
    return { i, label, x: c * cw, y: r * ch, d: piecePath(c * cw, r * ch, cw, ch, sides, S) };
  });

  const longest = Math.max(...labels.map((l) => l.length), 1);
  const fs = Math.round(Math.min(56, (cw - 76) / (longest * 0.58)));
  const labelView = (p: (typeof pieces)[number], isNew: boolean) => {
    const w = p.label.length * fs * 0.58 + 50, h = fs + 30;
    const lx = p.x + cw / 2, ly = p.y + (rows > 1 && p.y === 0 ? ch * 0.25 : ch * 0.79);
    return (
      <g transform={`translate(${lx} ${ly}) scale(${done ? 1 - complete * 0.12 : 1})`}>
        <rect x={-w / 2 + 4} y={-h / 2 + 6} width={w} height={h} rx={18} fill="rgba(43,33,24,.35)" />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={isNew ? C.tomato : INK} stroke={isNew ? INK : C.cream} strokeWidth={isNew ? 6 : 4} />
        <text y={fs * 0.36} textAnchor="middle" fontSize={fs} fontFamily="Lilita, sans-serif" letterSpacing={2} fill={isNew ? C.white : C.cream}>{p.label}</text>
      </g>
    );
  };
  const moveOf = (p: (typeof pieces)[number], isNew: boolean) => {
    const t = isNew ? drop : 1;
    const lift = isNew ? Math.max(0, 1 - t) : 0;
    const ox = p.x + cw / 2, oy = p.y + ch / 2;
    return { lift, tf: `translate(${(1 - t) * 260} ${(1 - t) * -760}) rotate(${(1 - t) * 22} ${ox} ${oy}) translate(${ox} ${oy}) scale(${1 + lift * 0.18}) translate(${-ox} ${-oy})` };
  };
  const pieceView = (p: (typeof pieces)[number], isNew: boolean) => {
    const { lift, tf } = moveOf(p, isNew);
    const seam = 1 - complete * 0.6;
    return (
      <g key={p.i} transform={tf}>
        <path d={p.d} fill="rgba(20,12,6,.45)" transform={`translate(${6 + lift * 40} ${10 + lift * 60})`} opacity={1 - complete * 0.7} />
        <clipPath id={`pz-clip-${p.i}`}><path d={p.d} /></clipPath>
        <g clipPath={`url(#pz-clip-${p.i})`}>
          {picG(pic.bg)}
          {picG(pic.subject)}
          <path d={p.d} fill="none" stroke="#ffffff" strokeOpacity={0.45 * seam} strokeWidth={10} transform="translate(3 3)" />
        </g>
        <path d={p.d} fill="none" stroke={INK} strokeWidth={6} strokeLinejoin="round" strokeOpacity={seam} />
      </g>
    );
  };

  // landing burst for the new piece
  const newP = step > 0 && step <= n ? pieces[step - 1] : undefined;
  const burst = interpolate(frame, [land - 3, land + 12], [0, 1], clamp);
  const sheen = done ? interpolate(frame, [land + 8, land + 34], [-0.3, 1.3], clamp) : -1;

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(960 540) scale(${zoom}) translate(-960 -540)`}>
          <Table f={frame} />
          <g transform={`translate(${bx} ${by})`}>
            {/* tray */}
            <rect x={-30} y={-30} width={BW + 60} height={BH + 60} rx={26} fill="rgba(30,18,10,.45)" transform="translate(14 22)" />
            <rect x={-30} y={-30} width={BW + 60} height={BH + 60} rx={26} fill="#4a6b8a" stroke={INK} strokeWidth={8} />
            <rect x={-8} y={-8} width={BW + 16} height={BH + 16} rx={10} fill="#2f4a62" stroke={INK} strokeWidth={5} />
            <defs>
              <filter id="pz-sil"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 0.96  0 0 0 0 0.88  0 0 0 1 0" /></filter>
            </defs>
            <g opacity={0.2} filter="url(#pz-sil)">{picG(pic.subject)}</g>
            {pieces.filter((p) => p.i >= step || (p.i === step - 1 && drop < 0.9)).map((p) => (
              <g key={`e${p.i}`}>
                <path d={p.d} fill="rgba(255,255,255,.04)" stroke={C.cream} strokeOpacity={0.55} strokeWidth={5} strokeDasharray="18 12" strokeLinejoin="round" />
                <text x={p.x + cw / 2} y={p.y + ch / 2 + 40 + Math.sin((frame + p.i * 11) / 14) * 6} textAnchor="middle" fontSize={120}
                  fontFamily="Lilita, sans-serif" fill={C.cream} opacity={0.42}>?</text>
              </g>
            ))}
            {pieces.filter((p) => p.i < step - 1).map((p) => pieceView(p, false))}
            {newP && burst > 0 && burst < 1 && Array.from({ length: 12 }).map((_, k) => {
              const a = (k / 12) * Math.PI * 2 + 0.2;
              const cx = newP.x + cw / 2, cy = newP.y + ch / 2;
              const r0 = 1.02 + burst * 0.3, r1 = r0 + 0.22 * (1 - burst);
              const ex = Math.cos(a) * cw * 0.62, ey = Math.sin(a) * ch * 0.66;
              return <path key={k} d={`M ${cx + ex * r0} ${cy + ey * r0} L ${cx + ex * r1} ${cy + ey * r1}`} stroke={C.mustard} strokeWidth={11} strokeLinecap="round" opacity={1 - burst} />;
            })}
            {newP && frame >= DELAY && pieceView(newP, true)}
            {pieces.filter((p) => p.i < step - 1).map((p) => <g key={`l${p.i}`}>{labelView(p, false)}</g>)}
            {newP && frame >= DELAY && <g transform={moveOf(newP, true).tf}>{labelView(newP, true)}</g>}
            {sheen > -0.3 && sheen < 1.3 && (
              <g>
                <clipPath id="pz-board"><rect width={BW} height={BH} /></clipPath>
                <rect clipPath="url(#pz-board)" x={sheen * (BW + 400) - 300} y={-100} width={120} height={BH + 200} fill="#ffffff" opacity={0.35} transform={`skewX(-20)`} />
              </g>
            )}
          </g>
        </g>
      </svg>
      {/* title */}
      <div style={{ position: 'absolute', top: 48, left: CX, transform: `translateX(-50%) translateY(${(1 - head) * -120}px)`, display: 'flex', alignItems: 'center', gap: 22,
        background: INK, color: C.cream, padding: '14px 26px 14px 40px', borderRadius: 26, boxShadow: '0 10px 0 rgba(30,18,10,.45)', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 64 }}>{title || (done ? 'The full picture' : step === 0 ? 'The answer puzzle' : 'The answer so far')}</span>
        <span style={{ fontSize: 46, background: done ? C.olive : C.mustard, color: done ? C.white : INK, padding: '2px 22px', borderRadius: 30, border: `5px solid ${C.cream}` }}>
          {Math.min(step, n)}/{n}
        </span>
      </div>
      {done && ans && (
        <div style={{ position: 'absolute', top: by + BH + 66, left: CX, width: 1180, transform: `translateX(-50%) translateY(${(1 - ansV) * 60}px) scale(${0.9 + ansV * 0.1})`,
          opacity: Math.min(1, ansV * 1.5), background: C.cream, border: `8px solid ${INK}`, borderLeft: `26px solid ${C.tomato}`, borderRadius: 28,
          padding: '20px 40px 22px', boxShadow: '0 12px 0 rgba(30,18,10,.5)', fontSize: ans.length > 70 ? 54 : 60, lineHeight: 1.08, textAlign: 'center' }}>
          {ans}
        </div>
      )}
    </AbsoluteFill>
  );
};

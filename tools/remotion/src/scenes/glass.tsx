import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { INK, SW, Clouds, Waves } from './parts';
import { Person, SKIN, Smoke, Birds } from './euro-parts';

// Scenes for the glass episode (RULES §5.0): flat fills, thick ink outline, every frame shows something happening.
// KAXO usually stands on the right (x ~0.78), so the subject of each scene sits centre-left.
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>{children}</svg>
  </AbsoluteFill>
);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// ---------- shared small things ----------

// A clear glass cup: pale fill, white shine, ink outline. tint for Roman greenish glass.
const Cup: React.FC<{ x: number; y: number; s?: number; tint?: string; water?: boolean; shape?: 'beaker' | 'goblet' | 'bottle' }> = ({ x, y, s = 1, tint = '#dff3fb', water, shape = 'beaker' }) => {
  const d = shape === 'goblet'
    ? 'M -60 -170 Q -66 -80 -14 -50 Q -4 -44 -4 -30 V 0 Q -4 8 -40 12 H 40 Q 4 8 4 0 V -30 Q 4 -44 14 -50 Q 66 -80 60 -170 Z'
    : shape === 'bottle'
      ? 'M -14 -170 V -120 Q -54 -100 -54 -50 V 0 H 54 V -50 Q 54 -100 14 -120 V -170 Z'
      : 'M -52 -150 L -40 0 H 40 L 52 -150 Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={d} fill={tint} fillOpacity={0.7} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {water && <path d="M -48 -96 L -40 0 H 40 L 48 -96 Z" fill="#7fc8ea" fillOpacity={0.55} />}
      <path d={shape === 'goblet' ? 'M -40 -150 Q -44 -100 -20 -70' : shape === 'bottle' ? 'M -36 -80 V -20' : 'M -34 -130 L -26 -20'} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.9} />
    </g>
  );
};

// little star glints that pop on and off (shine on glass)
const Glints: React.FC<{ pts: [number, number][]; size?: number }> = ({ pts, size = 26 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {pts.map(([x, y], i) => {
        const k = Math.max(0, Math.sin((f + i * 17) / 9));
        return <path key={i} d={`M ${x} ${y - size * k} L ${x + 5 * k} ${y - 5 * k} L ${x + size * k} ${y} L ${x + 5 * k} ${y + 5 * k} L ${x} ${y + size * k} L ${x - 5 * k} ${y + 5 * k} L ${x - size * k} ${y} L ${x - 5 * k} ${y - 5 * k} Z`} fill="#ffffff" opacity={k} />;
      })}
    </g>
  );
};

const Flame: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 2.5) * 8, b = Math.sin(f / 3.3 + 1) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-50} r={120} fill="#ffb347" opacity={0.2} />
      <path d={`M -60 0 Q -70 -60 -34 ${-100 + a} Q -26 -54 0 ${-140 + b} Q 26 -64 38 ${-104 - a} Q 74 -46 60 0 Z`} fill={C.tomato} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -34 0 Q -40 -36 -14 ${-66 + b} Q 0 -36 18 ${-78 - a} Q 40 -36 34 0 Z`} fill={C.mustard} />
    </g>
  );
};

// glowing furnace mouth (an arch with a flickering orange core)
const Furnace: React.FC<{ x: number; y: number; w?: number; h?: number; body?: string }> = ({ x, y, w = 420, h = 380, body = '#a8573a' }) => {
  const f = useCurrentFrame();
  const glow = 0.75 + Math.sin(f / 4) * 0.1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 ${h} V ${h * 0.35} Q ${w / 2} ${-h * 0.25} ${w} ${h * 0.35} V ${h} Z`} fill={body} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M ${20} ${h * 0.45 + i * 40} H ${w - 20}`} stroke={INK} strokeWidth={3} opacity={0.25} />)}
      <path d={`M ${w * 0.3} ${h * 0.92} V ${h * 0.62} Q ${w / 2} ${h * 0.42} ${w * 0.7} ${h * 0.62} V ${h * 0.92} Z`} fill="#3a1c10" stroke={INK} strokeWidth={SW} />
      <ellipse cx={w / 2} cy={h * 0.78} rx={w * 0.17} ry={h * 0.12} fill="#ff8a2a" opacity={glow} />
      <ellipse cx={w / 2} cy={h * 0.8} rx={w * 0.09} ry={h * 0.06} fill="#ffe08a" opacity={glow} />
      <circle cx={w / 2} cy={h * 0.75} r={w * 0.45} fill="#ff9a3c" opacity={0.12 * glow} />
    </g>
  );
};

const Floor: React.FC<{ y: number; c: string; line?: string }> = ({ y, c, line = 'rgba(43,33,24,.18)' }) => (
  <g>
    <rect x={0} y={y} width={1920} height={1080 - y} fill={c} stroke={INK} strokeWidth={SW} />
    {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={i * 260 - 100} y1={1080} x2={i * 240 + 40} y2={y} stroke={line} strokeWidth={4} />)}
  </g>
);

// mud-brick wall texture
const Bricks: React.FC<{ x: number; y: number; w: number; h: number; c: string }> = ({ x, y, w, h, c }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={c} stroke={INK} strokeWidth={SW} />
    {Array.from({ length: Math.floor(h / 60) }).map((_, r) => (
      <g key={r}>
        <line x1={x} y1={y + r * 60} x2={x + w} y2={y + r * 60} stroke={INK} strokeWidth={3} opacity={0.18} />
        {Array.from({ length: Math.ceil(w / 140) }).map((__, i) => <line key={i} x1={x + i * 140 + (r % 2) * 70} y1={y + r * 60} x2={x + i * 140 + (r % 2) * 70} y2={y + r * 60 + 60} stroke={INK} strokeWidth={3} opacity={0.18} />)}
      </g>
    ))}
  </g>
);

// a round glass ingot / bead
const Ingot: React.FC<{ x: number; y: number; r?: number; c: string }> = ({ x, y, r = 40, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={r} ry={r * 0.45} fill={c} stroke={INK} strokeWidth={5} />
    <ellipse cx={-r * 0.35} cy={-r * 0.12} rx={r * 0.3} ry={r * 0.1} fill="#ffffff" opacity={0.6} />
  </g>
);

const Bead: React.FC<{ x: number; y: number; r?: number; c?: string }> = ({ x, y, r = 22, c = '#2f8fd6' }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={c} stroke={INK} strokeWidth={5} />
    <circle r={r * 0.32} fill="#1d2a36" />
    <circle cx={-r * 0.4} cy={-r * 0.4} r={r * 0.22} fill="#ffffff" opacity={0.7} />
  </g>
);

// cuneiform-like wedge marks (not real signs)
const Wedges: React.FC<{ x: number; y: number; rows: number; cols: number; t?: number }> = ({ x, y, rows, cols, t = 1 }) => (
  <g>
    {Array.from({ length: rows }).map((_, r) => Array.from({ length: cols }).map((__, c) => {
      const i = r * cols + c;
      if (i / (rows * cols) > t) return null;
      const k = (r * 7 + c * 13) % 4;
      const px = x + c * 34, py = y + r * 46;
      return k === 0 ? <path key={i} d={`M ${px} ${py} l 18 0 l -9 10 z M ${px + 9} ${py + 6} v 22`} stroke={INK} strokeWidth={4} fill={INK} />
        : k === 1 ? <path key={i} d={`M ${px} ${py + 14} l 0 -12 l 10 6 z M ${px + 6} ${py + 8} h 20`} stroke={INK} strokeWidth={4} fill={INK} />
          : k === 2 ? <path key={i} d={`M ${px} ${py} l 14 14 M ${px} ${py} l 6 0 l -6 6 z`} stroke={INK} strokeWidth={4} fill={INK} />
            : <path key={i} d={`M ${px + 4} ${py} l 12 0 l -6 9 z M ${px + 10} ${py + 5} v 18 M ${px + 18} ${py + 2} l 8 0 l -4 6 z`} stroke={INK} strokeWidth={3} fill={INK} />;
    }))}
  </g>
);

// ---------- 1. modern-kitchen: the glass right in front of you ----------
const ModernKitchen = () => {
  const f = useCurrentFrame();
  const ripple = Math.sin(f / 6) * 3;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#f3e3c3" />
      {/* big window with a city outside */}
      <rect x={140} y={90} width={1000} height={560} fill="#9fd8f4" stroke={INK} strokeWidth={SW + 2} />
      <g>
        <Clouds y={170} />
        {[[200, 330, 140, '#7fb6d6'], [360, 250, 180, '#6aa5c8'], [570, 300, 150, '#8cc2de'], [740, 220, 170, '#6aa5c8'], [930, 320, 160, '#7fb6d6']].map(([x, y, w, c], i) => (
          <g key={i}>
            <rect x={x as number} y={y as number} width={w as number} height={650 - (y as number)} fill={c as string} stroke={INK} strokeWidth={4} />
            {Array.from({ length: 6 }).map((_, r) => <rect key={r} x={(x as number) + 18} y={(y as number) + 24 + r * 60} width={(w as number) - 36} height={30} fill="#d8f1fb" opacity={0.6} />)}
          </g>
        ))}
      </g>
      <path d="M 640 90 V 650 M 140 360 H 1140" stroke="#ffffff" strokeWidth={22} />
      <rect x={140} y={90} width={1000} height={560} fill="none" stroke={INK} strokeWidth={SW + 2} />
      <path d={`M 260 120 L 380 120 L 200 620 L 160 620 Z`} fill="#ffffff" opacity={0.25} />
      {/* counter */}
      <rect x={0} y={700} width={1920} height={60} fill="#e9e1d3" stroke={INK} strokeWidth={SW} />
      <rect x={0} y={760} width={1920} height={320} fill="#6b7a3a" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={40 + i * 480} y={800} width={420} height={240} rx={10} fill="none" stroke={INK} strokeWidth={4} opacity={0.4} />)}
      {/* phone with glowing screen */}
      <g transform="translate(300 700) rotate(-8) scale(1.8)">
        <rect x={-70} y={-24} width={150} height={24} rx={10} fill={INK} />
        <rect x={-62} y={-20} width={134} height={14} rx={6} fill="#7fd0ff" opacity={0.8 + Math.sin(f / 8) * 0.2} />
      </g>
      {/* glass of water */}
      <Cup x={560} y={702} s={1.9} water />
      <path d={`M 480 ${520 + ripple} q 40 -8 80 0 t 80 0`} stroke="#ffffff" strokeWidth={5} fill="none" />
      {/* a plate with a little heap of sand */}
      <ellipse cx={860} cy={698} rx={150} ry={26} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M 760 690 Q 860 600 960 690 Z" fill="#e8c98c" stroke={INK} strokeWidth={5} />
      {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={790 + ((i * 37) % 140)} cy={660 + ((i * 23) % 28)} r={4} fill="#c9a463" />)}
      <Glints pts={[[520, 600], [610, 640], [340, 120], [900, 200]]} />
    </Svg>
  );
};

// ---------- 2. sand-closeup: why sand is cloudy and glass is clear ----------
const SandCloseup = () => {
  const f = useCurrentFrame();
  const t = (f % 60) / 60;
  const grains: [number, number, number][] = [[180, 300, 90], [330, 250, 80], [300, 420, 100], [470, 360, 85], [180, 520, 95], [420, 560, 90], [600, 470, 80], [560, 280, 70], [250, 690, 85], [470, 750, 95], [660, 640, 80], [140, 820, 70], [620, 840, 75]];
  // a ray that bounces between grains
  const zig = [[0, 160], [230, 310], [140, 460], [380, 470], [300, 640], [560, 600], [480, 860], [700, 980]];
  const zd = 'M' + zig.map((p) => p.join(',')).join('L');
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#2c3e57" />
      <circle cx={420} cy={540} r={520} fill="#3c5274" />
      {grains.map(([x, y, r], i) => (
        <path key={i} d={`M ${x - r} ${y} L ${x - r * 0.5} ${y - r * 0.8} L ${x + r * 0.6} ${y - r * 0.7} L ${x + r} ${y + r * 0.1} L ${x + r * 0.4} ${y + r * 0.8} L ${x - r * 0.6} ${y + r * 0.7} Z`}
          fill={['#e8c98c', '#d9b273', '#f0d9a6'][i % 3]} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      ))}
      <path d={zd} stroke="#fff3a0" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="0.12 0.06" strokeDashoffset={-t * 0.36} />
      {/* the same stuff melted into one smooth block: the ray goes straight through */}
      <rect x={880} y={330} width={420} height={420} rx={30} fill="#cdeefa" fillOpacity={0.75} stroke={INK} strokeWidth={SW} />
      <path d="M 920 380 L 960 700" stroke="#ffffff" strokeWidth={18} strokeLinecap="round" opacity={0.8} />
      <path d="M 760 540 H 1420" stroke="#fff3a0" strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="0.12 0.06" strokeDashoffset={-t * 0.36} />
      <path d="M 1410 515 l 30 25 l -30 25" stroke="#fff3a0" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// ---------- 3. cairo-museum: the young king's jewellery in a display case ----------
const CairoMuseum = () => {
  const f = useCurrentFrame();
  const shine = 0.5 + Math.sin(f / 10) * 0.25;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#3a2f2a" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={60 + i * 480} y={0} width={70} height={760} fill="#4a3c34" stroke={INK} strokeWidth={4} />)}
      <path d="M 560 0 L 280 1080 L 1340 1080 L 1060 0 Z" fill="#fff3c4" opacity={0.08} />
      <Floor y={760} c="#5a463a" />
      {/* plinth and glass case */}
      <rect x={480} y={640} width={660} height={300} fill="#2a2320" stroke={INK} strokeWidth={SW} />
      <rect x={500} y={230} width={620} height={420} fill="#bfe6f5" fillOpacity={0.25} stroke={INK} strokeWidth={SW} />
      <path d="M 530 260 L 600 260 L 520 620" stroke="#ffffff" strokeWidth={10} opacity={0.35} fill="none" />
      {/* pectoral: wings, inlays, the yellow-green scarab in the middle */}
      <g transform="translate(810 440)">
        <path d="M -250 -10 Q -150 -110 -40 -60 L -40 40 Q -150 70 -250 -10 Z" fill="#e8b83a" stroke={INK} strokeWidth={6} />
        <path d="M 250 -10 Q 150 -110 40 -60 L 40 40 Q 150 70 250 -10 Z" fill="#e8b83a" stroke={INK} strokeWidth={6} />
        {[-1, 1].map((sd) => [0, 1, 2, 3].map((k) => (
          <path key={`${sd}${k}`} d={`M ${sd * (60 + k * 45)} ${-50 + k * 8} q ${sd * 20} 30 0 70`} stroke={k % 2 ? C.tomato : '#2f6fd6'} strokeWidth={14} fill="none" strokeLinecap="round" />
        )))}
        <rect x={-110} y={60} width={220} height={36} rx={8} fill="#e8b83a" stroke={INK} strokeWidth={6} />
        {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={-96 + i * 28} y={68} width={18} height={20} rx={4} fill={['#2f6fd6', C.tomato, '#3aa57a'][i % 3]} />)}
        <ellipse cx={0} cy={-6} rx={58} ry={74} fill="#d6d36a" stroke={INK} strokeWidth={7} />
        <path d="M 0 -78 V 66 M -50 -20 Q 0 -6 50 -20" stroke={INK} strokeWidth={5} fill="none" />
        <ellipse cx={-20} cy={-36} rx={14} ry={22} fill="#ffffff" opacity={shine} />
        <circle cx={0} cy={-100} r={26} fill={C.tomato} stroke={INK} strokeWidth={6} />
      </g>
      <rect x={640} y={680} width={340} height={70} rx={8} fill="#f4e6c4" stroke={INK} strokeWidth={5} />
      {[0, 1].map((i) => <rect key={i} x={670} y={700 + i * 24} width={280 - i * 90} height={10} rx={5} fill={INK} opacity={0.5} />)}
      {/* visitors' silhouettes */}
      <Person x={1250} y={1000} s={1.25} dress="modern" coat="#3d5a80" hair="dark" skin={SKIN[2]} face="open" lArm={10} rArm={10} />
    </Svg>
  );
};

// ---------- 4. desert-glass: yellow glass lying in the sand, a streak in the sky ----------
// "desert-glass" shows the space rock coming in (only where the narration talks about the impact);
// "desert-glass-calm" is the same desert without it, so the rock does not fall again in every shot.
const DesertGlass: React.FC<{ meteor?: boolean }> = ({ meteor = true }) => {
  const f = useCurrentFrame();
  const m = interpolate(f, [0, 40], [0, 1], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#ffcf7a" />
      <circle cx={1500} cy={220} r={120} fill="#fff1b8" stroke={INK} strokeWidth={SW} />
      {/* the space rock's trail, long ago */}
      <g opacity={meteor ? 1 - interpolate(f, [60, 110], [0, 0.6], clamp) : 0}>
        <path d={`M ${-100 + m * 0} ${40} L ${-100 + m * 700} ${40 + m * 330}`} stroke="#ffffff" strokeWidth={30} strokeLinecap="round" opacity={0.7} />
        <circle cx={-100 + m * 700} cy={40 + m * 330} r={28} fill={C.tomato} stroke={INK} strokeWidth={5} />
      </g>
      <path d="M 0 620 Q 300 520 640 600 T 1300 580 T 1920 560 V 1080 H 0 Z" fill="#f0b45c" stroke={INK} strokeWidth={SW} />
      <path d="M 0 760 Q 400 680 900 760 T 1920 720 V 1080 H 0 Z" fill="#e6a24a" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${200 + i * 500} ${840 + i * 30} q 80 -24 160 0`} stroke="#c98a3a" strokeWidth={6} fill="none" />)}
      {/* chunks of yellow-green desert glass */}
      {[[420, 820, 1.2], [660, 880, 0.8], [880, 800, 1], [250, 920, 0.7], [1100, 900, 0.9]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M -70 20 L -50 -40 L 10 -60 L 70 -20 L 60 30 L -10 46 Z" fill="#e3e36a" fillOpacity={0.85} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -40 -20 L 0 -42" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" />
        </g>
      ))}
      <Glints pts={[[420, 770], [880, 750], [660, 845], [1100, 860]]} size={30} />
    </Svg>
  );
};

// ---------- 5. neolithic-house: mud-brick room, a polished black obsidian mirror ----------
const NeolithicHouse = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Bricks x={0} y={0} w={1920} h={760} c="#c79a6a" />
      {/* roof hole with a ladder (houses were entered from the roof) */}
      <rect x={1260} y={0} width={240} height={140} fill="#9fd8f4" stroke={INK} strokeWidth={SW} />
      <path d="M 1290 0 L 1360 760 M 1470 0 L 1520 760" stroke="#7a5230" strokeWidth={18} />
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={1296 + i * 7.5} y1={60 + i * 80} x2={1476 + i * 5.5} y2={60 + i * 80} stroke="#7a5230" strokeWidth={14} />)}
      <path d="M 1260 140 L 1060 760 H 1700 L 1500 140 Z" fill="#fff6d0" opacity={0.18} />
      {/* wall painting: simple red geometric band */}
      <rect x={120} y={120} width={700} height={70} fill="#f1dfc0" stroke={INK} strokeWidth={4} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M ${140 + i * 68} 180 l 30 -50 l 30 50 z`} fill={C.tomato} stroke={INK} strokeWidth={3} />)}
      <Floor y={760} c="#a8805a" />
      {/* a woman holds the mirror and sees herself */}
      <Person x={560} y={1040} s={1.7} dress="robe" coat="#b07a48" hair="dark" skin={SKIN[2]} face="smile" rArm={115} lArm={20}
        hold={(
          <g transform="translate(0 -30)">
            <circle r={62} fill="#1d1d24" stroke={INK} strokeWidth={6} />
            <ellipse cx={-18} cy={-20} rx={22} ry={12} fill="#ffffff" opacity={0.55 + Math.sin(f / 8) * 0.2} />
            <circle cx={10} cy={12} r={18} fill="#5a4a46" opacity={0.6} />
          </g>
        )} />
      {/* a basket and pots on the floor */}
      <ellipse cx={980} cy={900} rx={90} ry={30} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      <path d="M 900 900 Q 900 800 980 790 Q 1060 800 1060 900" fill="#b8865a" stroke={INK} strokeWidth={SW} />
    </Svg>
  );
};

// ---------- 6. potter-kiln: a Mesopotamian potter, a glowing kiln, blue glazed beads ----------
const PotterKiln = () => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f / 6) * 0.08;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#f6c27a" />
      <circle cx={1650} cy={170} r={90} fill="#fff1b8" stroke={INK} strokeWidth={SW} />
      <Bricks x={0} y={300} w={1920} h={460} c="#d9a46c" />
      <Floor y={760} c="#c08a55" />
      {/* domed kiln */}
      <path d="M 120 900 V 560 Q 330 300 540 560 V 900 Z" fill="#b5653f" stroke={INK} strokeWidth={SW} />
      <path d="M 250 900 V 720 Q 330 620 410 720 V 900 Z" fill="#3a1c10" stroke={INK} strokeWidth={SW} />
      <Flame x={330} y={890} s={0.85} />
      <Smoke x={330} y={330} s={1} />
      {/* the potter with a shiny blue bead */}
      <Person x={760} y={1040} s={1.6} dress="robe" coat="#e8dcc0" hair="dark" beard skin={SKIN[3]} face="open" rArm={120} lArm={30}
        hold={<g transform={`translate(0 -16) scale(${pulse})`}><Bead x={0} y={0} r={30} /></g>} />
      {/* mat with glazed beads and a blue pot */}
      <rect x={920} y={880} width={460} height={70} rx={12} fill="#c9a36b" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 9 }).map((_, i) => <Bead key={i} x={960 + i * 46} y={900} r={16} c={['#2f8fd6', '#3aa5a0', '#2a6fb8'][i % 3]} />)}
      <path d="M 1040 880 Q 1000 780 1060 760 H 1140 Q 1200 780 1160 880 Z" fill="#3aa5a0" stroke={INK} strokeWidth={SW} />
      <path d="M 1060 790 Q 1060 840 1074 868" stroke="#ffffff" strokeWidth={10} opacity={0.6} fill="none" strokeLinecap="round" />
    </Svg>
  );
};

// ---------- 7. palace-letter: a messenger brings thirty pieces of glass to the king ----------
const PalaceLetter = () => {
  const f = useCurrentFrame();
  const bow = Math.sin(f / 20) * 3;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#efd9a8" />
      {[120, 520, 1300, 1700].map((x) => (
        <g key={x}>
          <rect x={x - 50} y={120} width={100} height={680} fill="#e6c98e" stroke={INK} strokeWidth={SW} />
          <path d={`M ${x - 80} 120 Q ${x} 20 ${x + 80} 120 Z`} fill="#3aa57a" stroke={INK} strokeWidth={SW} />
          {[0, 1, 2].map((k) => <rect key={k} x={x - 50} y={300 + k * 140} width={100} height={20} fill={k % 2 ? C.tomato : '#2f6fd6'} />)}
        </g>
      ))}
      <rect x={0} y={0} width={1920} height={110} fill="#2f6fd6" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 24 }).map((_, i) => <path key={i} d={`M ${i * 80 + 20} 30 l 20 40 l 20 -40`} stroke={C.mustard} strokeWidth={8} fill="none" />)}
      <Floor y={800} c="#d6b47a" />
      {/* the king on a throne */}
      <rect x={960} y={470} width={340} height={400} rx={14} fill="#e8b83a" stroke={INK} strokeWidth={SW} />
      <Person x={1130} y={880} s={1.6} dress="robe" coat="#f4efe2" hair="dark" skin={SKIN[3]} face="smile" sit hat="kerchief" hatColor="#2f6fd6" lArm={30} rArm={60} />
      {/* the messenger kneels with a box of glass pieces */}
      <g transform={`translate(0 ${bow})`}>
        <Person x={640} y={1000} s={1.5} dress="robe" coat="#e8dcc0" hair="dark" beard skin={SKIN[2]} face="open" rArm={95} lArm={95} />
        <g transform="translate(730 800) scale(1.3)">
          <rect x={-90} y={-40} width={180} height={60} rx={8} fill="#8a5a32" stroke={INK} strokeWidth={5} />
          {Array.from({ length: 6 }).map((_, i) => <Ingot key={i} x={-70 + i * 28} y={-46 - (i % 2) * 8} r={16} c={['#2f6fd6', '#3aa5a0', C.tomato][i % 3]} />)}
        </g>
      </g>
      {/* a clay letter on a low table */}
      <rect x={280} y={820} width={220} height={40} fill="#8a5a32" stroke={INK} strokeWidth={5} />
      <rect x={320} y={740} width={140} height={86} rx={16} fill="#c9a072" stroke={INK} strokeWidth={5} />
      <Wedges x={336} y={758} rows={2} cols={4} />
    </Svg>
  );
};

// ---------- 8. qantir-workshop: Egyptian glass factory, crucibles of red glass ----------
const QantirWorkshop = () => {
  const f = useCurrentFrame();
  const glow = 0.8 + Math.sin(f / 5) * 0.15;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#f2cf8e" />
      <Bricks x={0} y={0} w={1920} h={760} c="#d8a868" />
      <Floor y={760} c="#b98a55" />
      <Furnace x={180} y={360} w={460} h={440} />
      <Smoke x={410} y={360} s={1.1} />
      {/* row of crucibles with glowing red glass */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${760 + i * 150} 860)`}>
          <path d="M -50 -90 L -36 0 H 36 L 50 -90 Z" fill="#a88a6a" stroke={INK} strokeWidth={5} />
          <ellipse cx={0} cy={-90} rx={50} ry={14} fill={C.tomato} stroke={INK} strokeWidth={5} opacity={glow} />
        </g>
      ))}
      {/* finished round ingots stacked */}
      {[[860, 970], [940, 970], [1020, 970], [900, 940], [980, 940], [940, 910]].map(([x, y], i) => <Ingot key={i} x={x} y={y} r={44} c="#c43a2a" />)}
      <Person x={1300} y={1040} s={1.5} dress="shirt" legs="#f1ece2" hair="dark" skin={SKIN[3]} face="smile" rArm={60} wave="r" lArm={20}
        hold={<path d="M 0 0 L 160 -160" stroke="#7a5230" strokeWidth={12} strokeLinecap="round" />} />
    </Svg>
  );
};

// ---------- 9. trade-ship: a Bronze Age ship carrying blue glass ingots ----------
const TradeShip = () => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 12) * 8;
  const x = interpolate(f, [0, 200], [0, 120]);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#9fd8f4" />
      <Clouds y={150} />
      <Birds y={220} n={3} />
      <path d="M 1400 560 Q 1600 460 1920 500 V 620 H 1400 Z" fill="#b8a77a" stroke={INK} strokeWidth={SW} />
      <g transform={`translate(${380 + x} ${bob})`}>
        <path d="M 0 560 Q 40 660 200 670 H 700 Q 860 660 900 560 Z" fill="#8a5a32" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M 0 560 Q -40 500 -30 460" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M 900 560 Q 950 500 930 450" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
        <line x1={450} y1={560} x2={450} y2={170} stroke={INK} strokeWidth={14} />
        <path d="M 260 200 H 640 Q 660 360 620 470 H 280 Q 240 360 260 200 Z" fill="#f4e6c4" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => <line key={i} x1={268 + i * 4} y1={260 + i * 60} x2={632 - i * 4} y2={260 + i * 60} stroke={C.tomato} strokeWidth={8} opacity={0.7} />)}
        {/* stacked blue ingots */}
        {Array.from({ length: 8 }).map((_, i) => <Ingot key={i} x={140 + (i % 4) * 70 + (i > 3 ? 35 : 0)} y={548 - (i > 3 ? 24 : 0)} r={36} c={i % 3 ? '#2f6fd6' : '#3aa5a0'} />)}
        <Person x={720} y={560} s={0.8} dress="robe" coat="#e8dcc0" hair="dark" skin={SKIN[3]} face="smile" lArm={40} rArm={40} />
      </g>
      <Waves y={680} />
    </Svg>
  );
};

// ---------- 10. tablet-library: an Assyrian library, a clay tablet with glass instructions ----------
const TabletLibrary = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [5, 90], [0, 1], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#6b4a33" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={60} y={100 + r * 210} width={1800} height={180} fill="#4a3324" stroke={INK} strokeWidth={4} />
          {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={80 + i * 80} y={130 + r * 210} width={60} height={130} rx={10} fill={['#c9a072', '#b8905f', '#d4ac7e'][(i + r) % 3]} stroke={INK} strokeWidth={4} />)}
          <rect x={50} y={270 + r * 210} width={1820} height={18} fill="#8a5a32" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={760} width={1920} height={320} fill="#5a3b26" stroke={INK} strokeWidth={SW} />
      {/* the big tablet, wedges pressed in one by one */}
      <g transform="translate(600 560) rotate(-3)">
        <rect x={-260} y={-330} width={520} height={660} rx={50} fill="#d4ac7e" stroke={INK} strokeWidth={SW + 2} />
        <rect x={-240} y={-310} width={480} height={620} rx={40} fill="none" stroke="#b8905f" strokeWidth={6} />
        <Wedges x={-200} y={-270} rows={12} cols={12} t={t} />
      </g>
      {/* an oil lamp */}
      <g transform="translate(1100 820)">
        <path d="M -70 0 Q -60 -40 0 -40 Q 60 -40 90 -20 L 60 0 Z" fill="#b5653f" stroke={INK} strokeWidth={5} />
        <Flame x={80} y={-24} s={0.35} />
      </g>
    </Svg>
  );
};

// ---------- 11. pliny-beach: the legend — sailors, a pot propped on blocks of soda, something shiny flows ----------
const PlinyBeach = () => {
  const f = useCurrentFrame();
  const flow = interpolate(f, [30, 120], [0, 1], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#2d3a63" />
      {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={(i * 263) % 1920} cy={(i * 97) % 380} r={3 + (i % 3)} fill="#ffffff" opacity={0.4 + 0.6 * Math.abs(Math.sin((f + i * 9) / 20))} />)}
      <circle cx={1650} cy={150} r={70} fill="#f4efd6" stroke={INK} strokeWidth={SW} />
      <path d="M 0 520 Q 400 490 800 520 T 1920 500 V 640 H 0 Z" fill="#3c5c8a" stroke={INK} strokeWidth={SW} />
      {/* the ship */}
      <g transform="translate(1400 470)">
        <path d="M -200 0 Q -160 70 0 76 Q 160 70 200 0 Z" fill="#6b4428" stroke={INK} strokeWidth={SW} />
        <line x1={0} y1={0} x2={0} y2={-230} stroke={INK} strokeWidth={10} />
        <path d="M -120 -200 H 120 V -40 H -120 Z" fill="#d8ccb0" stroke={INK} strokeWidth={5} />
      </g>
      <path d="M 0 620 Q 500 580 1000 630 T 1920 610 V 1080 H 0 Z" fill="#c9a96e" stroke={INK} strokeWidth={SW} />
      {/* white soda blocks hold up the pot over the fire */}
      <g transform="translate(560 820)">
        {[-120, 80].map((x) => <rect key={x} x={x} y={-60} width={70} height={70} rx={6} fill="#f4f1ea" stroke={INK} strokeWidth={5} />)}
        <Flame x={0} y={10} s={0.9} />
        <path d="M -150 -70 Q -150 -190 0 -190 Q 150 -190 150 -70 Z" fill="#4a4a52" stroke={INK} strokeWidth={SW} />
        <ellipse cx={0} cy={-190} rx={150} ry={22} fill="#5f6068" stroke={INK} strokeWidth={5} />
        {/* the shiny stream running into the sand */}
        <path d={`M 40 20 Q 160 60 ${40 + flow * 360} ${40 + flow * 70}`} stroke="#bfefff" strokeWidth={22} fill="none" strokeLinecap="round" opacity={flow > 0 ? 0.95 : 0} />
      </g>
      <Glints pts={[[740, 870], [900, 905]]} />
      {/* sailors around the fire */}
      <Person x={260} y={960} s={1.1} dress="robe" coat="#7a3b2e" hair="dark" beard skin={SKIN[2]} face="open" rArm={60} lArm={20} />
      <Person x={980} y={980} s={1.1} dress="robe" coat="#3d5a80" hair="brown" skin={SKIN[1]} face="open" lArm={70} rArm={10} flip />
    </Svg>
  );
};

// ---------- 12. pliny-study: a Roman writer at his desk ----------
const PlinyStudy = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#e9c9a0" />
      <rect x={0} y={0} width={1920} height={140} fill="#9b3b2a" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={i * 170 + 40} y={150} width={90} height={600} fill="none" stroke="#c99a63" strokeWidth={6} />)}
      {/* scroll shelves */}
      <rect x={1220} y={220} width={560} height={520} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2].map((r) => Array.from({ length: 8 }).map((_, i) => (
        <g key={`${r}${i}`}>
          <circle cx={1270 + i * 66} cy={300 + r * 160} r={26} fill="#f4e6c4" stroke={INK} strokeWidth={4} />
          <circle cx={1270 + i * 66} cy={300 + r * 160} r={8} fill="#c9a36b" />
        </g>
      )))}
      <Floor y={780} c="#b07a48" />
      {/* writer with an open scroll */}
      <Person x={640} y={830} s={1.6} dress="robe" coat="#f4efe2" hair="grey" skin={SKIN[1]} face="doubt" sit rArm={110} wave="r" lArm={40} />
      <rect x={300} y={690} width={720} height={60} rx={10} fill="#8a5a32" stroke={INK} strokeWidth={SW} />
      <g transform="translate(660 670)">
        <rect x={-180} y={-40} width={360} height={60} fill="#f4e6c4" stroke={INK} strokeWidth={5} />
        <circle cx={-180} cy={-10} r={30} fill="#e6d3a8" stroke={INK} strokeWidth={5} />
        <circle cx={180} cy={-10} r={30} fill="#e6d3a8" stroke={INK} strokeWidth={5} />
        {[0, 1].map((k) => <rect key={k} x={-150} y={-28 + k * 22} width={interpolate(f, [10 + k * 20, 40 + k * 20], [0, 280 - k * 80], clamp)} height={8} rx={4} fill={INK} opacity={0.6} />)}
      </g>
      <g transform="translate(1050 680)">
        <path d="M -60 0 Q -50 -36 0 -36 Q 50 -36 76 -18 L 50 0 Z" fill="#b5653f" stroke={INK} strokeWidth={5} />
        <Flame x={66} y={-22} s={0.3} />
      </g>
    </Svg>
  );
};

// ---------- 13. melt-lab: sand alone vs sand + soda, and a big thermometer ----------
const MeltLab = () => {
  const f = useCurrentFrame();
  const melt = interpolate(f, [30, 90], [0, 1], clamp);
  const thermo = interpolate(f, [0, 60], [0.2, 0.95], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#2f3b4f" />
      <circle cx={700} cy={500} r={560} fill="#3a4a63" />
      <Floor y={820} c="#4a3c34" />
      {/* left: sand alone stays grainy */}
      <g transform="translate(360 760)">
        <Flame x={0} y={70} s={0.9} />
        <path d="M -130 -120 L -100 40 H 100 L 130 -120 Z" fill="#8e8e96" stroke={INK} strokeWidth={SW} />
        <path d="M -118 -80 Q 0 -150 118 -80 L 110 -40 H -110 Z" fill="#e8c98c" stroke={INK} strokeWidth={5} />
        {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={-90 + ((i * 41) % 180)} cy={-90 + ((i * 17) % 40)} r={6} fill="#c9a463" />)}
      </g>
      {/* right: sand + soda melts into a glowing liquid */}
      <g transform="translate(900 760)">
        <Flame x={0} y={70} s={0.9} />
        <path d="M -130 -120 L -100 40 H 100 L 130 -120 Z" fill="#8e8e96" stroke={INK} strokeWidth={SW} />
        <path d={`M -118 ${-80 + melt * 30} Q 0 ${-150 + melt * 110} 118 ${-80 + melt * 30} L 110 -40 H -110 Z`} fill={melt > 0.5 ? '#ff9a3c' : '#e8c98c'} stroke={INK} strokeWidth={5} />
        <ellipse cx={0} cy={-50} rx={90} ry={14} fill="#ffe08a" opacity={melt} />
        {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-80 + i * 30} y={-110} width={18} height={18} fill="#f4f1ea" stroke={INK} strokeWidth={3} opacity={1 - melt} />)}
      </g>
      {/* thermometer */}
      <g transform="translate(1260 160)">
        <rect x={-34} y={0} width={68} height={600} rx={34} fill="#f4f1ea" stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={640} r={70} fill={C.tomato} stroke={INK} strokeWidth={SW} />
        <rect x={-16} y={600 - thermo * 580} width={32} height={thermo * 580 + 40} rx={16} fill={C.tomato} />
        {[0.15, 0.35, 0.55, 0.75, 0.95].map((k) => <line key={k} x1={34} y1={600 - k * 580} x2={64} y2={600 - k * 580} stroke={INK} strokeWidth={6} />)}
      </g>
    </Svg>
  );
};

// ---------- 14. glassblower: a long pipe, a growing glowing bubble ----------
const Glassblower = () => {
  const f = useCurrentFrame();
  const r = 26 + ((f % 120) / 120) * 70;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#e9c58e" />
      <Bricks x={0} y={0} w={1920} h={780} c="#c98a5a" />
      <Floor y={780} c="#8c6a48" />
      <Furnace x={60} y={330} w={420} h={470} />
      <Smoke x={270} y={330} s={1.2} />
      {/* the glassblower: pipe from mouth to the bubble */}
      <Person x={1020} y={980} s={1.3} dress="robe" coat="#e8dcc0" hair="dark" beard skin={SKIN[2]} face="closed" lArm={100} rArm={95} />
      <line x1={990} y1={640} x2={560} y2={700} stroke="#6b6b72" strokeWidth={14} strokeLinecap="round" />
      <circle cx={560 - r * 0.9} cy={704} r={r} fill="#ff9a3c" stroke={INK} strokeWidth={6} />
      <circle cx={560 - r * 0.9} cy={704} r={r * 0.6} fill="#ffd27a" opacity={0.8} />
      <circle cx={560 - r * 1.25} cy={704 - r * 0.35} r={r * 0.18} fill="#ffffff" opacity={0.8} />
      {/* finished vessels on a bench */}
      <rect x={1240} y={820} width={520} height={40} fill="#7a5230" stroke={INK} strokeWidth={5} />
      <Cup x={1320} y={820} s={0.7} tint="#d8efe0" shape="bottle" />
      <Cup x={1460} y={820} s={0.7} tint="#d8efe0" />
      <Cup x={1600} y={820} s={0.7} tint="#d8efe0" shape="bottle" />
    </Svg>
  );
};

// ---------- 15. rome-shop: a shelf of glass cups and one copper coin ----------
const RomeShop = () => {
  const f = useCurrentFrame();
  const coin = interpolate(f, [10, 40], [-120, 0], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#f2d9b0" />
      <path d="M 0 0 H 1920 V 110 Q 1680 170 1440 110 Q 1200 170 960 110 Q 720 170 480 110 Q 240 170 0 110 Z" fill={C.tomato} stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 240 + 120} y={0} width={120} height={140} fill="#ffffff" opacity={0.35} />)}
      <rect x={100} y={200} width={1200} height={520} fill="#9b6a3e" stroke={INK} strokeWidth={SW} />
      {[0, 1].map((r) => (
        <g key={r}>
          <rect x={90} y={440 + r * 260} width={1220} height={24} fill="#7a5230" stroke={INK} strokeWidth={5} />
          {Array.from({ length: 7 }).map((_, i) => <Cup key={i} x={190 + i * 165} y={440 + r * 260} s={0.75} tint={i % 3 ? '#d8efe0' : '#dff3fb'} shape={i % 3 === 1 ? 'bottle' : 'beaker'} />)}
        </g>
      ))}
      {/* counter */}
      <rect x={0} y={760} width={1920} height={320} fill="#c9a072" stroke={INK} strokeWidth={SW} />
      <rect x={0} y={760} width={1920} height={40} fill="#e6c38f" stroke={INK} strokeWidth={5} />
      <Cup x={640} y={790} s={1.1} tint="#d8efe0" />
      {/* the copper coin drops onto the counter */}
      <g transform={`translate(860 ${770 + coin})`}>
        <ellipse rx={50} ry={20} fill="#c06a35" stroke={INK} strokeWidth={6} />
        <ellipse rx={30} ry={11} fill="none" stroke="#8a4a22" strokeWidth={4} />
      </g>
      <Glints pts={[[640, 680], [355, 360], [850, 620]]} />
    </Svg>
  );
};

// ---------- 16. roman-window: small, thick, greenish panes ----------
const RomanWindow = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 30) * 0.04;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#b5523b" />
      <rect x={0} y={640} width={1920} height={120} fill="#2b2118" opacity={0.85} />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={60 + i * 320} y={120} width={240} height={460} fill="none" stroke="#f2b33d" strokeWidth={8} />)}
      {/* the window: 3x2 small greenish panes in a wooden frame */}
      <rect x={420} y={180} width={600} height={420} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      {[0, 1].map((r) => [0, 1, 2].map((c) => (
        <g key={`${r}${c}`}>
          <rect x={450 + c * 190} y={210 + r * 190} width={160} height={170} fill="#a7d4b4" fillOpacity={0.85} stroke={INK} strokeWidth={5} />
          <path d={`M ${470 + c * 190} ${230 + r * 190} l 40 50`} stroke="#ffffff" strokeWidth={8} opacity={0.6} strokeLinecap="round" />
          <circle cx={530 + c * 190} cy={300 + r * 190} r={24} fill="#c7e6cf" opacity={0.6} />
        </g>
      )))}
      {/* sunlight through the panes */}
      <path d={`M 420 600 L ${300 - sway * 1000} 1080 H ${1250 + sway * 1000} L 1020 600 Z`} fill="#e9f7c8" opacity={0.25} />
      <Floor y={760} c="#d8c3a0" />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={360 + (i % 3) * 230} y={830 + Math.floor(i / 3) * 110} width={170} height={80} fill="#c7e6cf" opacity={0.35} />)}
      <Person x={1250} y={1040} s={1.5} dress="robe" coat="#f4efe2" hair="brown" skin={SKIN[1]} face="smile" lArm={60} rArm={10} wave="l" />
    </Svg>
  );
};

// ---------- 17. murano-island: furnaces on an island in the lagoon ----------
const MuranoIsland = () => (
  <Svg>
    <rect width={1920} height={1080} fill="#f6d7a8" />
    <Clouds y={120} />
    {/* Venice far behind */}
    <g opacity={0.55}>
      {[1350, 1450, 1560, 1680, 1780].map((x, i) => <rect key={x} x={x} y={430 - (i % 2) * 40} width={80} height={140} fill="#c98a5a" stroke={INK} strokeWidth={3} />)}
      <rect x={1610} y={250} width={40} height={320} fill="#b5523b" stroke={INK} strokeWidth={3} />
      <path d="M 1600 250 L 1630 190 L 1660 250 Z" fill="#6b7a3a" stroke={INK} strokeWidth={3} />
    </g>
    <rect x={0} y={560} width={1920} height={520} fill="#5cb3c9" />
    {/* the island */}
    <path d="M 80 700 Q 200 600 700 610 Q 1150 600 1250 700 Z" fill="#b8a77a" stroke={INK} strokeWidth={SW} />
    {[[140, 380, 220, '#d07a4a'], [380, 330, 200, '#e6a24a'], [600, 360, 240, '#c9583b'], [860, 400, 220, '#d9a46c']].map(([x, y, w, c], i) => (
      <g key={i}>
        <rect x={x as number} y={y as number} width={w as number} height={640 - (y as number)} fill={c as string} stroke={INK} strokeWidth={SW} />
        <path d={`M ${(x as number) - 14} ${y} H ${(x as number) + (w as number) + 14} L ${(x as number) + (w as number) / 2} ${(y as number) - 60} Z`} fill="#8a3b2a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        {[0, 1].map((k) => <rect key={k} x={(x as number) + 30 + k * ((w as number) - 100)} y={(y as number) + 70} width={40} height={70} rx={20} fill="#ffcf6a" stroke={INK} strokeWidth={4} />)}
        {i % 2 === 0 && (
          <g>
            <rect x={(x as number) + (w as number) - 60} y={(y as number) - 140} width={40} height={110} fill="#7a3b2e" stroke={INK} strokeWidth={5} />
            <Smoke x={(x as number) + (w as number) - 40} y={(y as number) - 140} s={1} />
          </g>
        )}
      </g>
    ))}
    <Waves y={760} color="#5cb3c9" dark="#3f97b0" />
    {/* a boat with crates */}
    <g transform="translate(1200 820)">
      <path d="M -200 0 Q -160 50 0 54 Q 160 50 230 -20 Z" fill="#2b2118" stroke={INK} strokeWidth={SW} />
      <rect x={-80} y={-60} width={70} height={56} fill="#c9a072" stroke={INK} strokeWidth={4} />
      <rect x={0} y={-50} width={60} height={46} fill="#c9a072" stroke={INK} strokeWidth={4} />
    </g>
  </Svg>
);

// ---------- 18. barovier-workshop: a perfectly clear goblet held up to the light ----------
const BarovierWorkshop = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#d9a46c" />
      <Bricks x={0} y={0} w={1920} h={780} c="#c98a5a" />
      {/* tall arched window, bright */}
      <path d="M 300 760 V 260 Q 500 60 700 260 V 760 Z" fill="#fff6d0" stroke={INK} strokeWidth={SW + 2} />
      <path d="M 500 120 V 760 M 300 450 H 700" stroke="#7a5230" strokeWidth={14} />
      <path d="M 300 760 L 150 1080 H 1100 L 700 760 Z" fill="#fff6d0" opacity={0.25} />
      <Floor y={780} c="#8c6a48" />
      <Person x={940} y={1070} s={1.8} dress="coat" coat="#7a3b2e" hair="brown" beard skin={SKIN[1]} face="open" rArm={140} lArm={20} hat="cap" hatColor="#2b2118"
        hold={<g transform="translate(0 20) scale(1.1)"><Cup x={0} y={0} shape="goblet" tint="#f4fbfe" /></g>} />
      <Glints pts={[[1010, 330], [960, 270], [1040, 400]]} size={36} />
      <circle cx={1000} cy={330} r={60 + Math.sin(f / 8) * 10} fill="#ffffff" opacity={0.15} />
    </Svg>
  );
};

// ---------- 19. float-factory: a glowing ribbon of glass floating on molten tin ----------
const FloatFactory = () => {
  const f = useCurrentFrame();
  const off = (f * 6) % 160;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#5a6470" />
      {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M ${i * 300 - 50} 0 L ${i * 300 + 100} 260`} stroke="#3e4650" strokeWidth={30} />)}
      <rect x={0} y={240} width={1920} height={40} fill="#3e4650" stroke={INK} strokeWidth={5} />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={80 + i * 320} y={60} width={200} height={140} fill="#bcd6e6" stroke={INK} strokeWidth={5} />)}
      <Floor y={720} c="#4a525c" />
      {/* the tin bath (silver) with the glowing glass ribbon on top, moving right */}
      <path d="M 0 640 H 1920 V 820 H 0 Z" fill="#9aa3ad" stroke={INK} strokeWidth={SW} />
      <path d="M 0 650 H 1920 V 700 H 0 Z" fill="#c9d1d9" />
      <rect x={-20} y={600} width={1960} height={70} fill="url(#ribbon)" stroke={INK} strokeWidth={5} />
      <defs>
        <linearGradient id="ribbon" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ff8a2a" />
          <stop offset="0.45" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#dff3fb" />
        </linearGradient>
      </defs>
      {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={i * 160 + off - 160} y1={612} x2={i * 160 + off - 100} y2={612} stroke="#ffffff" strokeWidth={6} opacity={0.6} strokeLinecap="round" />)}
      {/* rollers at the end */}
      {[1500, 1640, 1780].map((x) => <circle key={x} cx={x} cy={690} r={30} fill="#6b6b72" stroke={INK} strokeWidth={5} />)}
      <Smoke x={300} y={580} s={0.9} color="#d9dde2" />
      <Person x={900} y={1050} s={1.5} dress="modern" coat="#3d5a80" legs="#3d5a80" hair="brown" skin={SKIN[0]} face="smile" lArm={40} rArm={20} hat="cap" hatColor="#f2b33d" />
    </Svg>
  );
};

// ---------- 21. bead-necklace: rare glass beads, a treasure on a cushion ----------
const BeadNecklace = () => {
  const f = useCurrentFrame();
  const n = 15;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#5a2f3a" />
      <circle cx={760} cy={520} r={620} fill="#6e3a47" />
      <path d="M 760 140 L 420 1080 H 1100 Z" fill="#fff3c4" opacity={0.08} />
      {/* velvet cushion */}
      <path d="M 300 760 Q 300 640 420 630 H 1100 Q 1220 640 1220 760 Q 1220 880 1100 890 H 420 Q 300 880 300 760 Z" fill="#7a2b3a" stroke={INK} strokeWidth={SW} />
      {[[300, 630], [1220, 630], [300, 890], [1220, 890]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={20} fill={C.mustard} stroke={INK} strokeWidth={5} />)}
      {/* a string of blue and gold beads lying in a U on the cushion */}
      <path d="M 450 680 Q 760 1010 1070 680" stroke="#c9a36b" strokeWidth={8} fill="none" />
      {Array.from({ length: n }).map((_, i) => {
        const t = i / (n - 1);
        const x = (1 - t) ** 2 * 450 + 2 * (1 - t) * t * 760 + t * t * 1070;
        const y = (1 - t) ** 2 * 680 + 2 * (1 - t) * t * 1010 + t * t * 680;
        const pulse = 1 + Math.max(0, Math.sin((f - i * 4) / 10)) * 0.08;
        return <g key={i} transform={`translate(${x} ${y}) scale(${pulse})`}><Bead x={0} y={0} r={i % 4 === 0 ? 44 : 34} c={i % 4 === 0 ? '#e8b83a' : i % 2 ? '#2f6fd6' : '#3aa5a0'} /></g>;
      })}
      <Glints pts={[[560, 760], [760, 830], [960, 760]]} size={30} />
    </Svg>
  );
};

// ---------- 20. modern-city: glass towers flashing in the sun ----------
const ModernCity = () => {
  const f = useCurrentFrame();
  const sweep = ((f * 8) % 2600) - 400;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#9fd8f4" />
      <Clouds y={130} />
      <circle cx={1650} cy={170} r={90} fill="#fff1b8" stroke={INK} strokeWidth={SW} />
      <defs><clipPath id="towers"><path d="M 80 1080 V 300 H 380 V 1080 Z M 440 1080 V 160 H 720 V 1080 Z M 780 1080 V 380 H 1060 V 1080 Z M 1120 1080 V 240 H 1420 V 1080 Z M 1480 1080 V 420 H 1820 V 1080 Z" /></clipPath></defs>
      {[[80, 300, 300, '#6aa5c8'], [440, 160, 280, '#7fb6d6'], [780, 380, 280, '#5f9cc4'], [1120, 240, 300, '#7fb6d6'], [1480, 420, 340, '#6aa5c8']].map(([x, y, w, c], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={1080 - (y as number)} fill={c as string} stroke={INK} strokeWidth={SW} />
          {Array.from({ length: 12 }).map((_, r) => <line key={r} x1={x as number} y1={(y as number) + 60 + r * 70} x2={(x as number) + (w as number)} y2={(y as number) + 60 + r * 70} stroke={INK} strokeWidth={3} opacity={0.35} />)}
          {[1, 2, 3].map((k) => <line key={k} x1={(x as number) + ((w as number) / 4) * k} y1={y as number} x2={(x as number) + ((w as number) / 4) * k} y2={1080} stroke={INK} strokeWidth={3} opacity={0.35} />)}
        </g>
      ))}
      <g clipPath="url(#towers)">
        <path d={`M ${sweep} 0 L ${sweep + 160} 0 L ${sweep - 240} 1080 L ${sweep - 400} 1080 Z`} fill="#ffffff" opacity={0.45} />
      </g>
      <Birds y={260} n={4} />
    </Svg>
  );
};

export const GLASS_SCENES: Record<string, React.FC> = {
  'modern-kitchen': ModernKitchen,
  'sand-closeup': SandCloseup,
  'cairo-museum': CairoMuseum,
  'desert-glass': () => <DesertGlass />,
  'desert-glass-calm': () => <DesertGlass meteor={false} />,
  'bead-necklace': BeadNecklace,
  'neolithic-house': NeolithicHouse,
  'potter-kiln': PotterKiln,
  'palace-letter': PalaceLetter,
  'qantir-workshop': QantirWorkshop,
  'trade-ship': TradeShip,
  'tablet-library': TabletLibrary,
  'pliny-beach': PlinyBeach,
  'pliny-study': PlinyStudy,
  'melt-lab': MeltLab,
  glassblower: Glassblower,
  'rome-shop': RomeShop,
  'roman-window': RomanWindow,
  'murano-island': MuranoIsland,
  'barovier-workshop': BarovierWorkshop,
  'float-factory': FloatFactory,
  'modern-city': ModernCity,
};

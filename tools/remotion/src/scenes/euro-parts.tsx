import { useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { INK, SW } from './parts';

// Building blocks for European / Andean history scenes (potato episode): flat fills, thick ink outline.
// People stand with their feet at (x, y); scale 1 is about 340 px tall.

export const SKIN = ['#f1c9a5', '#e2ae84', '#c98d62', '#a86f4a', '#8a5a3a'];

type Hat = 'tricorn' | 'bonnet' | 'cap' | 'chullo' | 'montera' | 'square' | 'kerchief' | 'none';
type Hair = 'brown' | 'dark' | 'blond' | 'grey' | 'wig' | 'red';
type Dress = 'coat' | 'robe' | 'dress' | 'poncho' | 'pollera' | 'uniform' | 'modern' | 'shirt';

export type PersonSpec = {
  x: number; y: number; s?: number; flip?: boolean; phase?: number;
  dress?: Dress; coat?: string; vest?: string; legs?: string; skirt?: string; apron?: string | false;
  hat?: Hat; hatColor?: string; hair?: Hair; beard?: boolean; skin?: string;
  face?: 'smile' | 'flat' | 'doubt' | 'closed' | 'open';
  lArm?: number; rArm?: number; // degrees from hanging down; positive = outward / up
  wave?: 'l' | 'r'; // the arm swings gently (talking, gesturing)
  hold?: React.ReactNode; // drawn at the right hand
  holdL?: React.ReactNode; // drawn at the left hand
  sit?: boolean; // only the upper body is drawn (behind a table)
};

const HAIR: Record<Hair, string> = { brown: '#6b4428', dark: '#2f2620', blond: '#d9b25f', grey: '#b9b4ab', wig: '#f1ece2', red: '#a8502a' };

const HatView: React.FC<{ hat: Hat; color?: string }> = ({ hat, color }) => {
  switch (hat) {
    case 'tricorn':
      return (
        <g>
          <ellipse cx={0} cy={-318} rx={34} ry={22} fill={color || '#2b2522'} stroke={INK} strokeWidth={5} />
          <path d="M -70 -296 Q -62 -336 -38 -342 Q -18 -318 0 -324 Q 18 -318 38 -342 Q 62 -336 70 -296 Q 0 -310 -70 -296 Z" fill={color || '#2b2522'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -62 -302 Q 0 -314 62 -302" stroke="#e8dcc0" strokeWidth={4} fill="none" opacity={0.8} />
        </g>
      );
    case 'bonnet':
      return (
        <g>
          <path d="M -46 -270 Q -56 -336 0 -338 Q 56 -336 46 -270 Q 34 -312 0 -314 Q -34 -312 -46 -270 Z" fill={color || '#ffffff'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -50 -300 q 8 -10 16 -2 q 8 -14 18 -6 q 10 -12 20 -4 q 10 -12 18 0 q 8 -8 14 4" stroke={INK} strokeWidth={3} fill="none" opacity={0.6} />
        </g>
      );
    case 'kerchief':
      return <path d="M -44 -276 Q -48 -334 0 -334 Q 48 -334 44 -276 Q 30 -306 0 -306 Q -30 -306 -44 -276 Z M 30 -290 l 26 30 l -10 6 Z" fill={color || C.tomato} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
    case 'cap':
      return <path d="M -42 -290 Q -40 -340 4 -338 Q 46 -334 44 -296 Q 20 -306 -42 -290 Z" fill={color || '#5b6b7a'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
    case 'chullo':
      return (
        <g>
          <path d="M -44 -284 Q -44 -342 0 -342 Q 44 -342 44 -284 L 44 -250 L 30 -252 L 30 -286 L -30 -286 L -30 -252 L -44 -250 Z" fill={color || C.tomato} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -40 -300 l 10 -10 l 10 10 l 10 -10 l 10 10 l 10 -10 l 10 10 l 10 -10 l 10 10" stroke={C.mustard} strokeWidth={5} fill="none" />
          <circle cx={0} cy={-348} r={9} fill={C.mustard} stroke={INK} strokeWidth={4} />
        </g>
      );
    case 'montera':
      return (
        <g>
          <ellipse cx={0} cy={-312} rx={74} ry={16} fill={color || '#c0392b'} stroke={INK} strokeWidth={5} />
          <rect x={-34} y={-336} width={68} height={24} rx={6} fill={color || '#c0392b'} stroke={INK} strokeWidth={5} />
          <path d="M -70 -312 Q 0 -298 70 -312" stroke={C.mustard} strokeWidth={5} fill="none" />
        </g>
      );
    case 'square':
      return (
        <g>
          <path d="M -40 -300 L -44 -338 L 44 -338 L 40 -300 Z" fill={color || '#1f1b19'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -14 -338 v 30 M 14 -338 v 30" stroke="#4a403a" strokeWidth={4} />
          <circle cx={0} cy={-344} r={8} fill={color || '#1f1b19'} stroke={INK} strokeWidth={4} />
        </g>
      );
    default:
      return null;
  }
};

const HairView: React.FC<{ hair: Hair; hat: Hat; dress: Dress }> = ({ hair, hat, dress }) => {
  const c = HAIR[hair];
  if (hair === 'wig') {
    return (
      <g>
        <path d="M -42 -282 Q -46 -330 0 -330 Q 46 -330 42 -282 Q 30 -312 0 -310 Q -30 -312 -42 -282 Z" fill={c} stroke={INK} strokeWidth={4} />
        {[-1, 1].map((sx) => (
          <g key={sx}>
            <ellipse cx={sx * 46} cy={-276} rx={13} ry={10} fill={c} stroke={INK} strokeWidth={4} />
            <ellipse cx={sx * 46} cy={-256} rx={13} ry={10} fill={c} stroke={INK} strokeWidth={4} />
          </g>
        ))}
      </g>
    );
  }
  if (hat === 'bonnet' || hat === 'chullo') return null;
  return (
    <g>
      <path d="M -42 -276 Q -44 -322 0 -322 Q 44 -322 42 -276 Q 26 -300 0 -298 Q -26 -300 -42 -276 Z" fill={c} stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Face: React.FC<{ face: NonNullable<PersonSpec['face']>; beard?: boolean; hair: Hair; blink: boolean }> = ({ face, beard, hair, blink }) => (
  <g>
    {beard && <path d="M -34 -268 Q -28 -232 0 -228 Q 28 -232 34 -268 Q 16 -252 0 -254 Q -16 -252 -34 -268 Z" fill={HAIR[hair === 'wig' ? 'grey' : hair]} stroke={INK} strokeWidth={4} />}
    {face === 'closed' || blink ? (
      <path d="M -20 -282 q 7 5 14 0 M 6 -282 q 7 5 14 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
    ) : (
      <g>
        <circle cx={-13} cy={-283} r={5} fill={INK} />
        <circle cx={13} cy={-283} r={5} fill={INK} />
      </g>
    )}
    {face === 'doubt' && <path d="M -24 -298 l 16 -4 M 8 -300 l 16 4" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
    <ellipse cx={-24} cy={-266} rx={7} ry={4} fill="#e8846a" opacity={0.45} />
    <ellipse cx={24} cy={-266} rx={7} ry={4} fill="#e8846a" opacity={0.45} />
    {face === 'smile' && <path d="M -12 -260 q 12 10 24 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
    {face === 'flat' && <path d="M -10 -258 h 20" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
    {face === 'doubt' && <path d="M -12 -258 q 6 -5 12 0 t 12 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
    {face === 'closed' && <path d="M -10 -258 q 10 6 20 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
    {face === 'open' && <ellipse cx={0} cy={-258} rx={8} ry={7} fill="#7a2e22" stroke={INK} strokeWidth={3} />}
  </g>
);

export const Person: React.FC<PersonSpec> = (p) => {
  const f = useCurrentFrame();
  const {
    x, y, s = 1, flip, phase = 0, dress = 'coat', coat = '#3d5a80', vest = '#e8dcc0', legs = '#f1ece2', skirt = '#7a3b2e',
    apron, hat = 'none', hatColor, hair = 'brown', beard, skin = SKIN[1], face = 'smile', hold, holdL, sit,
  } = p;
  const t = f + phase;
  const bob = Math.sin(t / 14) * 2.5;
  const swing = Math.sin(t / 9) * 10;
  const lA = (p.lArm ?? 8) + (p.wave === 'l' ? swing : 0);
  const rA = (p.rArm ?? 8) + (p.wave === 'r' ? swing : 0);
  const blink = (t % 110) > 104;
  const long = dress === 'robe' || dress === 'dress' || dress === 'pollera';
  const sleeve = dress === 'dress' || dress === 'pollera' ? skirt : dress === 'shirt' ? '#f1ece2' : coat;
  const cuff = dress === 'uniform' ? C.tomato : dress === 'robe' ? '#1f1b19' : dress === 'modern' ? sleeve : '#f1ece2';
  const arm = (side: -1 | 1, a: number, item?: React.ReactNode) => {
    const sx = side * 44, sy = -226, L = 92;
    const rad = (a * Math.PI) / 180;
    const hx = sx + side * Math.sin(rad) * L, hy = sy + Math.cos(rad) * L;
    return (
      <g>
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={INK} strokeWidth={30} strokeLinecap="round" />
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={sleeve} strokeWidth={20} strokeLinecap="round" />
        <circle cx={sx + (hx - sx) * 0.84} cy={sy + (hy - sy) * 0.84} r={11} fill={cuff} stroke={INK} strokeWidth={4} />
        <circle cx={hx} cy={hy} r={12} fill={skin} stroke={INK} strokeWidth={4} />
        {item && <g transform={`translate(${hx} ${hy})`}>{item}</g>}
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${flip ? -s : s} ${s})`}>
      {!sit && !long && (
        <g>
          <rect x={-34} y={-124} width={24} height={112} rx={8} fill={dress === 'modern' ? '#3d5a80' : dress === 'poncho' ? '#3b2f2a' : legs} stroke={INK} strokeWidth={5} />
          <rect x={10} y={-124} width={24} height={112} rx={8} fill={dress === 'modern' ? '#3d5a80' : dress === 'poncho' ? '#3b2f2a' : legs} stroke={INK} strokeWidth={5} />
          {dress === 'uniform' && <path d="M -36 -70 h 28 v 58 h -28 Z M 8 -70 h 28 v 58 h -28 Z" fill="#2b2522" stroke={INK} strokeWidth={4} />}
          <ellipse cx={-24} cy={-8} rx={22} ry={10} fill={dress === 'modern' ? '#ffffff' : '#2b2522'} stroke={INK} strokeWidth={4} />
          <ellipse cx={24} cy={-8} rx={22} ry={10} fill={dress === 'modern' ? '#ffffff' : '#2b2522'} stroke={INK} strokeWidth={4} />
          {dress !== 'modern' && dress !== 'poncho' && <rect x={-40} y={-156} width={80} height={46} rx={14} fill={dress === 'uniform' ? '#f1ece2' : '#5b4a3a'} stroke={INK} strokeWidth={5} />}
        </g>
      )}
      {/* body */}
      {dress === 'coat' || dress === 'uniform' ? (
        <g>
          <path d={`M -48 -236 Q -56 -170 -66 ${sit ? -150 : -112} L 66 ${sit ? -150 : -112} Q 56 -170 48 -236 Q 0 -250 -48 -236 Z`} fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <rect x={-18} y={-236} width={36} height={98} fill={dress === 'uniform' ? '#f1ece2' : vest} stroke={INK} strokeWidth={4} />
          {dress === 'uniform' && <path d="M -18 -236 L -34 -150 L -48 -150 L -30 -236 Z M 18 -236 L 34 -150 L 48 -150 L 30 -236 Z" fill={C.tomato} stroke={INK} strokeWidth={4} />}
          {[-216, -194, -172, -150].map((by) => <circle key={by} cx={0} cy={by} r={3.5} fill={dress === 'uniform' ? C.mustard : INK} />)}
          <path d="M -12 -240 L 0 -222 L 12 -240 Z" fill="#ffffff" stroke={INK} strokeWidth={3} />
        </g>
      ) : dress === 'robe' ? (
        <g>
          <path d={`M -50 -236 Q -66 -120 -76 ${sit ? -150 : -10} L 76 ${sit ? -150 : -10} Q 66 -120 50 -236 Q 0 -252 -50 -236 Z`} fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M -9 -238 h 8 v 30 h -8 Z M 1 -238 h 8 v 30 h -8 Z" fill="#ffffff" stroke={INK} strokeWidth={3} />
          {!sit && <ellipse cx={0} cy={-6} rx={50} ry={9} fill="#2b2522" />}
        </g>
      ) : dress === 'dress' || dress === 'pollera' ? (
        <g>
          {!sit && <path d="M -42 -160 Q -78 -60 -86 -10 L 86 -10 Q 78 -60 42 -160 Z" fill={skirt} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />}
          {!sit && dress === 'pollera' && <path d="M -70 -70 Q 0 -60 70 -70 M -80 -36 Q 0 -26 80 -36" stroke={C.mustard} strokeWidth={8} fill="none" />}
          <path d="M -40 -238 Q -46 -190 -42 -150 L 42 -150 Q 46 -190 40 -238 Q 0 -250 -40 -238 Z" fill={dress === 'pollera' ? '#f1ece2' : vest} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          {apron !== false && !sit && <path d="M -36 -158 L 36 -158 L 46 -40 L -46 -40 Z" fill={apron || '#f5ead2'} stroke={INK} strokeWidth={4} strokeLinejoin="round" />}
          <path d="M -50 -236 Q 0 -200 50 -236 L 30 -190 Q 0 -176 -30 -190 Z" fill={dress === 'pollera' ? C.tomato : '#ffffff'} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          {dress === 'pollera' && <path d="M -40 -214 h 80" stroke={C.mustard} strokeWidth={5} />}
        </g>
      ) : dress === 'poncho' ? (
        <g>
          <path d="M -40 -238 L -84 -120 L 84 -120 L 40 -238 Q 0 -250 -40 -238 Z" fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          {[-150, -136].map((yy) => <path key={yy} d={`M ${-70 + (-150 - yy) * -0.3} ${yy} H ${70 - (-150 - yy) * -0.3}`} stroke={C.mustard} strokeWidth={6} />)}
          <path d="M -60 -184 H 60" stroke="#f1ece2" strokeWidth={6} />
        </g>
      ) : dress === 'modern' ? (
        <g>
          <path d="M -46 -236 Q -52 -180 -48 -120 L 48 -120 Q 52 -180 46 -236 Q 0 -250 -46 -236 Z" fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M 0 -236 V -122" stroke={INK} strokeWidth={4} />
          <path d="M -14 -240 L 0 -224 L 14 -240" fill="none" stroke={INK} strokeWidth={4} />
        </g>
      ) : (
        <g>
          <path d="M -44 -236 Q -50 -190 -46 -146 L 46 -146 Q 50 -190 44 -236 Q 0 -250 -44 -236 Z" fill="#f1ece2" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <rect x={-30} y={-236} width={60} height={92} fill={vest} stroke={INK} strokeWidth={4} />
        </g>
      )}
      {arm(-1, lA, holdL)}
      {/* head */}
      {long && hair !== 'wig' && hat !== 'bonnet' && <path d="M -46 -290 Q -62 -220 -44 -196 L 44 -196 Q 62 -220 46 -290 Z" fill={HAIR[hair]} stroke={INK} strokeWidth={4} />}
      <rect x={-12} y={-252} width={24} height={20} fill={skin} stroke={INK} strokeWidth={4} />
      <circle cx={0} cy={-278} r={40} fill={skin} stroke={INK} strokeWidth={5} />
      <HairView hair={hair} hat={hat} dress={dress} />
      <Face face={face} beard={beard} hair={hair} blink={blink} />
      <HatView hat={hat} color={hatColor} />
      {arm(1, rA, hold)}
    </g>
  );
};

export const Potato: React.FC<{ x: number; y: number; s?: number; r?: number; c?: string }> = ({ x, y, s = 1, r = 0, c = '#b98a4f' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M -38 4 Q -40 -22 -10 -24 Q 20 -30 36 -12 Q 46 8 26 20 Q 0 30 -22 22 Q -38 18 -38 4 Z" fill={c} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-14} cy={-8} r={2.6} fill="#7a5530" />
    <circle cx={12} cy={4} r={2.6} fill="#7a5530" />
    <circle cx={24} cy={-10} r={2.2} fill="#7a5530" />
    <path d="M -24 -14 q 6 -6 14 -6" stroke="#e8c58f" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

// A heap of potatoes centred at (x, y) (the bottom of the heap).
export const PotatoHeap: React.FC<{ x: number; y: number; w?: number; rows?: number; s?: number }> = ({ x, y, w = 300, rows = 4, s = 1 }) => {
  const items: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const rw = w * (1 - r / (rows + 0.6));
    const n = Math.max(1, Math.round(rw / (60 * s)));
    for (let i = 0; i < n; i++) {
      const px = x - rw / 2 + (i + 0.5) * (rw / n) + ((r * 13 + i * 7) % 9) - 4;
      const py = y - 18 * s - r * 34 * s;
      items.push(<Potato key={`${r}-${i}`} x={px} y={py} s={s * (0.9 + ((i * 17 + r * 5) % 5) / 25)} r={((i * 47 + r * 31) % 60) - 30} c={(i + r) % 3 ? '#b98a4f' : '#a87a42'} />);
    }
  }
  return <g>{items}</g>;
};

// Potato plant: compound leaves that sway, white-purple flowers on top.
export const PotatoPlant: React.FC<{ x: number; y: number; s?: number; phase?: number; flowers?: boolean }> = ({ x, y, s = 1, phase = 0, flowers = true }) => {
  const f = useCurrentFrame();
  const sway = Math.sin((f + phase) / 22) * 4;
  const leaves = [[-46, -40, -50], [46, -40, 50], [-30, -80, -30], [30, -84, 30], [0, -110, 0], [-60, -10, -70], [60, -12, 70]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sway})`}>
      <path d="M 0 0 V -100 M 0 -40 L -40 -40 M 0 -40 L 40 -40 M 0 -78 L -28 -80 M 0 -80 L 28 -84" stroke="#3f6b2a" strokeWidth={6} />
      {leaves.map(([lx, ly, r], i) => (
        <ellipse key={i} cx={lx} cy={ly} rx={30} ry={17} transform={`rotate(${r} ${lx} ${ly})`} fill={i % 2 ? '#5f9a3e' : '#73ad4a'} stroke={INK} strokeWidth={4} />
      ))}
      {flowers && [[-16, -128], [14, -132], [0, -146]].map(([fx, fy], i) => (
        <g key={i} transform={`translate(${fx} ${fy})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-8} rx={6} ry={9} transform={`rotate(${a})`} fill={i === 1 ? '#c9b3e6' : '#f6f0fb'} stroke={INK} strokeWidth={2.5} />)}
          <circle r={4} fill={C.mustard} stroke={INK} strokeWidth={2} />
        </g>
      ))}
    </g>
  );
};

export const Smoke: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#e9e4dc' }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 1, 2, 3].map((i) => {
        const t = ((f + i * 22) % 88) / 88;
        return <circle key={i} cx={Math.sin(t * 5 + i) * 14 + t * 40} cy={-t * 190} r={14 + t * 30} fill={color} stroke={INK} strokeWidth={3} opacity={(1 - t) * 0.85} />;
      })}
    </g>
  );
};

export const Birds: React.FC<{ y?: number; n?: number; speed?: number; color?: string; dir?: 1 | -1 }> = ({ y = 160, n = 3, speed = 2.2, color = INK, dir = 1 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = dir > 0 ? ((f * speed + i * 140 + 200) % 2300) - 200 : 2100 - ((f * speed + i * 140 + 200) % 2300);
        const flap = Math.sin((f + i * 7) / 3) * 10;
        return <path key={i} d={`M -18 ${-flap} Q -9 -6 0 0 Q 9 -6 18 ${-flap}`} transform={`translate(${x} ${y + i * 26 + Math.sin((f + i * 30) / 20) * 8})`} stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );
};

export const Pennant: React.FC<{ x: number; y: number; color?: string; len?: number }> = ({ x, y, color = C.tomato, len = 90 }) => {
  const f = useCurrentFrame();
  const w = Math.sin(f / 6) * 8;
  return <path d={`M ${x} ${y} Q ${x + len * 0.5} ${y + 8 + w} ${x + len} ${y + 16 - w} L ${x} ${y + 36} Z`} fill={color} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
};

export const Tree: React.FC<{ x: number; y: number; s?: number; c?: string; phase?: number; round?: boolean }> = ({ x, y, s = 1, c = '#5f9a3e', phase = 0, round }) => {
  const f = useCurrentFrame();
  const sway = Math.sin((f + phase) / 30) * 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-16} y={-120} width={32} height={120} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      <g transform={`rotate(${sway} 0 -120)`}>
        {round ? (
          <circle cx={0} cy={-200} r={92} fill={c} stroke={INK} strokeWidth={SW} />
        ) : (
          <path d="M -100 -150 Q -130 -230 -60 -260 Q -40 -330 20 -310 Q 90 -320 100 -250 Q 140 -190 90 -140 Q 0 -110 -100 -150 Z" fill={c} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        )}
        <path d="M -50 -220 q 20 -16 40 -6 M 20 -260 q 16 -10 30 0" stroke={INK} strokeWidth={4} fill="none" opacity={0.35} />
      </g>
    </g>
  );
};

export const Barrel: React.FC<{ x: number; y: number; s?: number; r?: number; side?: boolean }> = ({ x, y, s = 1, r = 0, side }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {side ? (
      <g>
        <ellipse cx={0} cy={0} rx={46} ry={46} fill="#9a6a3c" stroke={INK} strokeWidth={SW} />
        <circle r={30} fill="none" stroke={INK} strokeWidth={4} />
        <path d="M -30 0 H 30 M 0 -30 V 30" stroke={INK} strokeWidth={3} opacity={0.5} />
      </g>
    ) : (
      <g>
        <path d="M -44 -100 Q -58 -50 -44 0 L 44 0 Q 58 -50 44 -100 Z" fill="#9a6a3c" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M -50 -76 H 50 M -52 -24 H 52" stroke="#5a5a5a" strokeWidth={7} />
        <path d="M -16 -98 Q -20 -50 -16 -2 M 16 -98 Q 20 -50 16 -2" stroke={INK} strokeWidth={3} opacity={0.4} fill="none" />
      </g>
    )}
  </g>
);

export const Sack: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 0 Q -64 -60 -34 -96 L -20 -112 L 20 -112 L 34 -96 Q 64 -60 50 0 Z" fill="#d9c08f" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M -24 -104 Q 0 -94 24 -104" stroke={INK} strokeWidth={5} fill="none" />
  </g>
);

export const Candle: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  const fl = 1 + Math.sin(f / 2.3) * 0.08 + Math.sin(f / 5.1) * 0.06;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-96} r={60 * fl} fill="#ffd27a" opacity={0.22} />
      <ellipse cx={0} cy={0} rx={34} ry={10} fill="#b08d57" stroke={INK} strokeWidth={4} />
      <rect x={-12} y={-70} width={24} height={70} fill="#f6efd8" stroke={INK} strokeWidth={4} />
      <path d={`M 0 ${-72 - 30 * fl} Q 12 -84 0 -72 Q -12 -84 0 ${-72 - 30 * fl} Z`} fill={C.mustard} stroke={INK} strokeWidth={3} />
    </g>
  );
};

export const Lantern: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  const g = 1 + Math.sin(f / 4) * 0.08;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={40} r={90 * g} fill="#ffd27a" opacity={0.25} />
      <circle cx={0} cy={40} r={50 * g} fill="#ffe2a0" opacity={0.35} />
      <path d="M 0 0 V 10" stroke={INK} strokeWidth={4} />
      <rect x={-18} y={10} width={36} height={56} rx={6} fill="#ffe08a" stroke={INK} strokeWidth={4} />
      <path d="M -22 10 H 22 M -22 66 H 22 M 0 10 V 66" stroke={INK} strokeWidth={4} />
    </g>
  );
};

export const Fence: React.FC<{ x0: number; x1: number; y: number; h?: number; c?: string; gap?: number }> = ({ x0, x1, y, h = 80, c = '#b08a5a', gap = 44 }) => {
  const n = Math.floor((x1 - x0) / gap);
  return (
    <g>
      <rect x={x0} y={y - h * 0.75} width={x1 - x0} height={12} fill={c} stroke={INK} strokeWidth={4} />
      <rect x={x0} y={y - h * 0.35} width={x1 - x0} height={12} fill={c} stroke={INK} strokeWidth={4} />
      {Array.from({ length: n + 1 }).map((_, i) => (
        <path key={i} d={`M ${x0 + i * gap - 8} ${y} V ${y - h + 8} L ${x0 + i * gap} ${y - h} L ${x0 + i * gap + 8} ${y - h + 8} V ${y} Z`} fill={c} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      ))}
    </g>
  );
};

// Brick town house with a stepped (Baltic) or curved gable; windows have white frames.
export const GableHouse: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string; gable?: 'step' | 'curve' | 'point'; smoke?: boolean; door?: string }> = ({ x, y, w = 240, h = 300, c = '#b5523b', gable = 'step', smoke, door = '#5b3b26' }) => {
  const top = y - h;
  const gh = w * 0.55;
  let g = '';
  if (gable === 'step') {
    const st = 4, sw = w / (2 * st + 1), sh = gh / (st + 1);
    g = `M 0 ${top}`;
    for (let i = 0; i < st; i++) g += ` V ${top - sh * (i + 1)} H ${sw * (i + 1)}`;
    g += ` V ${top - gh} H ${w - sw * st}`;
    for (let i = st - 1; i >= 0; i--) g += ` V ${top - sh * (i + 1)} H ${w - sw * i}`;
    g += ` V ${top} Z`;
  } else if (gable === 'curve') {
    g = `M 0 ${top} Q ${w * 0.08} ${top - gh * 0.5} ${w * 0.3} ${top - gh * 0.6} Q ${w * 0.3} ${top - gh} ${w * 0.5} ${top - gh} Q ${w * 0.7} ${top - gh} ${w * 0.7} ${top - gh * 0.6} Q ${w * 0.92} ${top - gh * 0.5} ${w} ${top} Z`;
  } else {
    g = `M -10 ${top} L ${w / 2} ${top - gh} L ${w + 10} ${top} Z`;
  }
  const rows = Math.max(1, Math.floor((h - 120) / 90));
  return (
    <g transform={`translate(${x} 0)`}>
      {smoke && <Smoke x={w * 0.75} y={top - gh * 0.7} s={0.8} />}
      {smoke && <rect x={w * 0.68} y={top - gh * 0.85} width={30} height={60} fill="#7a3b2e" stroke={INK} strokeWidth={5} />}
      <path d={g} fill={c} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <rect x={0} y={top} width={w} height={h} fill={c} stroke={INK} strokeWidth={SW} />
      <rect x={w / 2 - 22} y={top - gh * 0.55} width={44} height={50} rx={22} fill="#f5ead2" stroke={INK} strokeWidth={5} />
      {Array.from({ length: rows }).map((_, r) => [0, 1, 2].map((cIdx) => (
        <g key={`${r}-${cIdx}`}>
          <rect x={w * (0.12 + cIdx * 0.29)} y={top + 30 + r * 90} width={w * 0.18} height={58} fill="#cfe6f0" stroke={INK} strokeWidth={5} />
          <path d={`M ${w * (0.21 + cIdx * 0.29)} ${top + 30 + r * 90} v 58 M ${w * (0.12 + cIdx * 0.29)} ${top + 59 + r * 90} h ${w * 0.18}`} stroke="#ffffff" strokeWidth={4} />
        </g>
      )))}
      <path d={`M ${w * 0.38} ${y} V ${y - 84} Q ${w * 0.5} ${y - 110} ${w * 0.62} ${y - 84} V ${y} Z`} fill={door} stroke={INK} strokeWidth={SW} />
      {[0.25, 0.5, 0.75].map((k) => <path key={k} d={`M 6 ${top + h * k} H ${w - 6}`} stroke={INK} strokeWidth={2} opacity={0.18} />)}
    </g>
  );
};

export const Dog: React.FC<{ x: number; y: number; s?: number; head?: number; tail?: number; eyes?: 'open' | 'closed'; nose?: number }> = ({ x, y, s = 1, head = 0, tail = 0, eyes = 'open', nose = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -150 -150 q -50 ${-30 - tail} -40 ${-80 - tail}`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M -150 -150 q -50 ${-30 - tail} -40 ${-80 - tail}`} stroke="#c98a4b" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-130, -80, 40, 90].map((lx) => <rect key={lx} x={lx} y={-90} width={30} height={90} rx={12} fill="#c98a4b" stroke={INK} strokeWidth={SW} />)}
    <rect x={-170} y={-200} width={300} height={130} rx={60} fill="#c98a4b" stroke={INK} strokeWidth={SW} />
    <path d="M -60 -196 q 40 30 90 0" stroke="#f1dcc0" strokeWidth={18} fill="none" opacity={0.8} />
    <g transform={`translate(110 -170) rotate(${head})`}>
      <ellipse cx={60} cy={-30} rx={74} ry={62} fill="#c98a4b" stroke={INK} strokeWidth={SW} />
      <ellipse cx={130 + nose} cy={-10} rx={52} ry={34} fill="#e9c08f" stroke={INK} strokeWidth={SW} />
      <ellipse cx={172 + nose} cy={-20} rx={16} ry={12} fill={INK} />
      <path d="M 20 -80 Q -10 -40 10 20 Q 40 0 50 -60 Z" fill="#8a5a32" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {eyes === 'open' ? <circle cx={90} cy={-50} r={9} fill={INK} /> : <path d="M 78 -50 q 12 8 24 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />}
      <path d="M 140 18 q 14 6 26 -4" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  </g>
);

export const Chicken: React.FC<{ x: number; y: number; s?: number; phase?: number; flip?: boolean }> = ({ x, y, s = 1, phase = 0, flip }) => {
  const f = useCurrentFrame();
  const peck = Math.max(0, Math.sin((f + phase) / 7)) * 22;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M -10 0 v -24 M 10 0 v -24" stroke="#d98a2b" strokeWidth={5} />
      <ellipse cx={0} cy={-50} rx={40} ry={30} fill="#ffffff" stroke={INK} strokeWidth={5} />
      <path d="M -36 -60 l -20 -16 l 6 22 Z" fill="#ffffff" stroke={INK} strokeWidth={4} />
      <g transform={`rotate(${peck} 24 -60)`}>
        <circle cx={34} cy={-80} r={17} fill="#ffffff" stroke={INK} strokeWidth={5} />
        <path d="M 30 -98 q 4 -10 8 0 q 4 -10 8 2" fill={C.tomato} stroke={INK} strokeWidth={3} />
        <path d="M 50 -82 l 12 4 l -12 4 Z" fill={C.mustard} stroke={INK} strokeWidth={3} />
        <circle cx={38} cy={-84} r={3} fill={INK} />
      </g>
    </g>
  );
};

// European cow (brown with white patches); tail swish and a grazing head bob.
export const Cow: React.FC<{ x: number; y: number; s?: number; flip?: boolean; phase?: number; graze?: boolean; color?: string }> = ({ x, y, s = 1, flip, phase = 0, graze, color = '#b0703e' }) => {
  const f = useCurrentFrame();
  const tail = Math.sin((f + phase) / 8) * 10;
  const hd = graze ? 30 + Math.sin((f + phase) / 12) * 6 : Math.sin((f + phase) / 20) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d={`M 150 -110 q 30 ${10 + tail} 20 60`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      {[-100, -40, 60, 120].map((lx) => <rect key={lx} x={lx} y={-60} width={26} height={60} rx={8} fill={color} stroke={INK} strokeWidth={SW} />)}
      <rect x={-130} y={-170} width={280} height={130} rx={50} fill={color} stroke={INK} strokeWidth={SW} />
      <path d="M -40 -168 q 40 30 10 70 q -40 10 -60 -30 Z M 70 -150 q 30 -10 50 20 q -20 30 -50 10 Z" fill="#f5ead2" />
      <g transform={`rotate(${-hd} -120 -130)`}>
        <ellipse cx={-170} cy={-140} rx={58} ry={50} fill={color} stroke={INK} strokeWidth={SW} />
        <ellipse cx={-206} cy={-116} rx={32} ry={22} fill="#e2a48f" stroke={INK} strokeWidth={5} />
        <path d="M -196 -180 q -10 -20 -26 -18 M -150 -182 q 6 -22 24 -20" stroke="#f0e2c4" strokeWidth={9} fill="none" strokeLinecap="round" />
        <circle cx={-178} cy={-150} r={6} fill={INK} />
      </g>
    </g>
  );
};

export const Wheel: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 60, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill="#8a5a32" stroke={INK} strokeWidth={SW} />
    <circle r={r - 14} fill="#c99a63" stroke={INK} strokeWidth={4} />
    {[0, 45, 90, 135].map((a) => <line key={a} x1={-(r - 14)} y1={0} x2={r - 14} y2={0} stroke={INK} strokeWidth={6} transform={`rotate(${a})`} />)}
    <circle r={10} fill={INK} />
  </g>
);

// Flat cobblestones: a soft pattern of rounded stones on the ground band.
export const Cobbles: React.FC<{ y: number; c?: string; dark?: string }> = ({ y, c = '#cdb89a', dark = '#b39d7e' }) => (
  <g>
    <rect x={0} y={y} width={1920} height={1080 - y} fill={c} stroke={INK} strokeWidth={SW} />
    {Array.from({ length: 70 }).map((_, i) => {
      const row = Math.floor(i / 10);
      const yy = y + 30 + row * ((1080 - y) / 7);
      const xx = (i % 10) * 200 + (row % 2) * 100 + 30;
      return <rect key={i} x={xx} y={yy} width={90 + row * 6} height={22 + row * 4} rx={12} fill={dark} opacity={0.6} />;
    })}
  </g>
);

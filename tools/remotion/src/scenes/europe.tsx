import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { Clouds, Hill, INK, Sky, Steam, SW } from './parts';
import {
  Barrel, Birds, Candle, Chicken, Cobbles, Cow, Dog, Fence, GableHouse, Lantern, Pennant, Person, Potato, PotatoHeap,
  PotatoPlant, Sack, SKIN, Smoke, Tree, Wheel,
} from './euro-parts';

// Potato episode (Europe 1530s-1780s and the Andes): flat SVG scenes in the channel style.
// The subject sits in the middle (x 680-1240) so KAXO can stand left (x 0.2) or right (x 0.8) without hiding it.
// Every scene moves: clouds, smoke, birds, flags, flames, people breathing and gesturing.
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>{children}</svg>
  </AbsoluteFill>
);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// ---------- shared small things ----------

const Bunting: React.FC<{ y: number; x0?: number; x1?: number }> = ({ y, x0 = -20, x1 = 1940 }) => {
  const f = useCurrentFrame();
  const n = 22;
  const sag = 50;
  const pt = (t: number) => [x0 + (x1 - x0) * t, y + Math.sin(Math.PI * t) * sag];
  return (
    <g>
      <path d={`M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}`} stroke={INK} strokeWidth={3} fill="none" />
      {Array.from({ length: n }).map((_, i) => {
        const [x, yy] = pt((i + 0.5) / n);
        const sw = Math.sin((f + i * 9) / 10) * 6;
        return <path key={i} d={`M ${x - 22} ${yy} L ${x + 22} ${yy} L ${x + sw} ${yy + 44} Z`} fill={[C.tomato, C.mustard, '#f5ead2', C.olive][i % 4]} stroke={INK} strokeWidth={3} strokeLinejoin="round" />;
      })}
    </g>
  );
};

const Butterfly: React.FC<{ x: number; y: number; c?: string; phase?: number }> = ({ x, y, c = '#f6f0fb', phase = 0 }) => {
  const f = useCurrentFrame() + phase;
  const fl = Math.abs(Math.sin(f / 2.2));
  const px = x + Math.sin(f / 23) * 90, py = y + Math.sin(f / 13) * 40;
  return (
    <g transform={`translate(${px} ${py})`}>
      <ellipse cx={-10} cy={0} rx={12 * fl + 2} ry={10} fill={c} stroke={INK} strokeWidth={3} />
      <ellipse cx={10} cy={0} rx={12 * fl + 2} ry={10} fill={c} stroke={INK} strokeWidth={3} />
      <line x1={0} y1={-8} x2={0} y2={8} stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Fireflies: React.FC<{ n?: number; y0?: number; y1?: number }> = ({ n = 18, y0 = 560, y1 = 1000 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = (i * 211) % 1920 + Math.sin((f + i * 40) / 30) * 40;
        const y = y0 + ((i * 97) % (y1 - y0)) + Math.sin((f + i * 17) / 20) * 20;
        const o = 0.35 + 0.65 * Math.abs(Math.sin((f + i * 13) / 18));
        return <circle key={i} cx={x} cy={y} r={6} fill="#fff3a0" opacity={o} />;
      })}
    </g>
  );
};

const Stars: React.FC<{ n?: number; maxY?: number }> = ({ n = 40, maxY = 380 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <circle key={i} cx={(i * 337) % 1920} cy={20 + ((i * 151) % maxY)} r={2 + (i % 3)} fill="#fff8dc" opacity={0.4 + 0.6 * Math.abs(Math.sin((f + i * 21) / 25))} />
      ))}
    </g>
  );
};

const Motes: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={x + ((i * 73 + f * 0.4) % w)} cy={y + ((i * 131 + f * (0.3 + (i % 3) * 0.15)) % h)} r={3 + (i % 3)} fill="#fff6d0" opacity={0.6} />
      ))}
    </g>
  );
};

const Fire: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 2.5) * 8, b = Math.sin(f / 3.3 + 1) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-50} r={130} fill="#ffb347" opacity={0.18} />
      <path d={`M -70 0 Q -80 -60 -40 ${-110 + a} Q -30 -60 0 ${-150 + b} Q 30 -70 44 ${-112 - a} Q 84 -50 70 0 Z`} fill={C.tomato} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -40 0 Q -46 -40 -16 ${-74 + b} Q 0 -40 20 ${-86 - a} Q 46 -40 40 0 Z`} fill={C.mustard} />
      <path d="M -90 4 L 90 -10 M -86 -10 L 84 6" stroke="#6b4428" strokeWidth={18} strokeLinecap="round" />
    </g>
  );
};

const Paper: React.FC<{ x?: number; y?: number; r?: number; w?: number; h?: number }> = ({ x = 0, y = 0, r = -8, w = 56, h = 72 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} fill="#f6ecd2" stroke={INK} strokeWidth={4} />
    {[0.2, 0.38, 0.56, 0.74].map((k) => <path key={k} d={`M ${-w / 2 + 8} ${-h + h * k} h ${w - 16}`} stroke={INK} strokeWidth={2.5} opacity={0.5} />)}
  </g>
);

const Bouquet: React.FC = () => (
  <g>
    <path d="M 0 0 L -14 -40 M 0 0 L 4 -46 M 0 0 L 18 -38" stroke="#3f6b2a" strokeWidth={5} />
    {[[-14, -44], [4, -52], [18, -42]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-6} rx={5} ry={7} transform={`rotate(${a})`} fill={i === 1 ? '#c9b3e6' : '#f6f0fb'} stroke={INK} strokeWidth={2} />)}
        <circle r={3} fill={C.mustard} />
      </g>
    ))}
  </g>
);

const Flower: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-8} rx={6} ry={9} transform={`rotate(${a})`} fill="#f2ebfa" stroke={INK} strokeWidth={2.5} />)}
    <ellipse cx={0} cy={-8} rx={6} ry={9} fill="#b79ee0" stroke={INK} strokeWidth={2.5} />
    <circle r={4} fill={C.mustard} stroke={INK} strokeWidth={2} />
  </g>
);

// ---------- scenes ----------

// Kolberg market square, 1740s: Baltic brick gables, a wagon heaped with potatoes, doubtful townspeople.
const KolbergMarket = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#8fc9ea" bottom="#e6f4fa" />
      <Clouds y={90} />
      <Birds y={130} n={3} />
      <g transform="translate(900 0)">
        <rect x={0} y={170} width={130} height={470} fill="#a4472f" stroke={INK} strokeWidth={SW} />
        <path d="M -12 172 L 65 -10 L 142 172 Z" fill="#5f9a86" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <circle cx={65} cy={260} r={34} fill="#f5ead2" stroke={INK} strokeWidth={5} />
        <path d={`M 65 260 L 65 236 M 65 260 L ${65 + Math.cos(f / 40) * 20} ${260 + Math.sin(f / 40) * 20}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <line x1={65} y1={-10} x2={65} y2={-60} stroke={INK} strokeWidth={5} />
        <Pennant x={65} y={-60} color={C.tomato} />
      </g>
      <GableHouse x={-40} y={650} w={260} h={330} c="#b5523b" gable="step" smoke />
      <GableHouse x={220} y={650} w={240} h={380} c="#d9a35b" gable="curve" />
      <GableHouse x={460} y={650} w={250} h={300} c="#8f6f9a" gable="point" smoke />
      <GableHouse x={1180} y={650} w={250} h={320} c="#6f8fae" gable="curve" smoke />
      <GableHouse x={1430} y={650} w={260} h={370} c="#b5523b" gable="step" />
      <GableHouse x={1690} y={650} w={260} h={300} c="#e2c48e" gable="point" smoke />
      <Bunting y={300} x0={700} x1={1180} />
      <Cobbles y={640} />
      {/* wagon */}
      <path d="M 740 800 L 600 900" stroke="#6b4428" strokeWidth={16} strokeLinecap="round" />
      <path d="M 740 820 L 590 920" stroke={INK} strokeWidth={4} />
      <PotatoHeap x={960} y={736} w={460} rows={4} s={1.05} />
      <rect x={720} y={730} width={480} height={84} rx={8} fill="#a0714a" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={720} y1={751 + i * 20} x2={1200} y2={751 + i * 20} stroke={INK} strokeWidth={3} opacity={0.35} />)}
      <Wheel x={800} y={840} r={62} rot={Math.sin(f / 30) * 3} />
      <Wheel x={1120} y={840} r={62} rot={Math.sin(f / 30) * 3} />
      <Sack x={1240} y={900} s={0.9} />
      <Potato x={1210} y={900} s={1.1} r={20} />
      {/* people */}
      <Person x={380} y={930} s={0.95} dress="dress" skirt="#3d5a80" vest="#c46a5a" hat="bonnet" face="doubt" skin={SKIN[0]} holdL={<path d="M -40 0 Q 0 40 40 0 Z M -40 0 Q 0 -30 40 0" fill="#c99a63" stroke={INK} strokeWidth={4} />} lArm={20} />
      <Person x={600} y={960} s={0.8} dress="shirt" vest="#6b7a3a" hat="cap" hatColor="#7a3b2e" face="smile" skin={SKIN[2]} phase={15} rArm={150} wave="r" hold={<Potato x={0} y={-10} s={0.8} />} />
      <Person x={1360} y={950} s={0.95} dress="coat" coat="#2f4858" vest="#e2c48e" hat="tricorn" hair="wig" face="doubt" skin={SKIN[1]} phase={40} />
      <Person x={1610} y={940} s={0.9} dress="dress" skirt="#6b7a3a" vest="#f2b33d" hat="kerchief" hatColor="#c46a5a" face="flat" skin={SKIN[3]} phase={70} wave="l" lArm={30} />
    </Svg>
  );
};

// Close-up: a dog sniffs a potato, then turns its nose up and walks off.
const KolbergDog = () => {
  const f = useCurrentFrame();
  const sniff = f < 40 ? Math.sin(f / 2.2) * 7 : 0;
  const head = interpolate(f, [0, 38, 50], [12, 14, -38], clamp);
  const flip = interpolate(f, [62, 72], [1, -1], clamp);
  const walk = interpolate(f, [72, 240], [0, -700], clamp);
  const tail = f > 50 ? Math.sin(f / 4) * 12 : Math.sin(f / 3) * 20;
  return (
    <Svg>
      <rect width={1920} height={760} fill="#b5523b" />
      {Array.from({ length: 15 }).map((_, r) => (
        <g key={r}>
          <line x1={0} y1={r * 52} x2={1920} y2={r * 52} stroke="#8e3d2a" strokeWidth={4} />
          {Array.from({ length: 17 }).map((__, c) => <line key={c} x1={c * 120 + (r % 2) * 60} y1={r * 52} x2={c * 120 + (r % 2) * 60} y2={r * 52 + 52} stroke="#8e3d2a" strokeWidth={4} />)}
        </g>
      ))}
      <rect x={1260} y={120} width={300} height={260} fill="#cfe6f0" stroke={INK} strokeWidth={SW} />
      <path d="M 1410 120 V 380 M 1260 250 H 1560" stroke="#ffffff" strokeWidth={8} />
      <rect x={1240} y={380} width={340} height={30} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      {[1290, 1360, 1440, 1510].map((x, i) => <PotatoPlant key={x} x={x} y={385} s={0.5} phase={i * 20} />)}
      <rect x={250} y={540} width={360} height={220} fill="#a0714a" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2].map((i) => <line key={i} x1={250} y1={600 + i * 55} x2={610} y2={600 + i * 55} stroke={INK} strokeWidth={4} opacity={0.4} />)}
      <PotatoHeap x={430} y={548} w={330} rows={2} />
      <Cobbles y={740} />
      <Potato x={1260} y={900} s={2.6} r={-8} />
      <Potato x={1500} y={960} s={1.4} r={30} />
      <g transform={`translate(${760 + walk} 0)`}>
        <g transform={`scale(${flip} 1)`}>
          <Dog x={0} y={980} s={1.25} head={head} nose={sniff} tail={tail} eyes={f > 44 ? 'closed' : 'open'} />
        </g>
      </g>
      {f > 46 && f < 90 && (
        <g transform={`translate(${760 + walk + 300} 680)`} opacity={interpolate(f, [46, 52, 80, 90], [0, 1, 1, 0], clamp)}>
          <path d="M 0 0 q 20 -20 40 0 M 10 -40 q 20 -20 40 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      <g transform="translate(1150 560) scale(1.8) translate(-1150 -560)"><Butterfly x={1150} y={560} c="#f2b33d" /></g>
    </Svg>
  );
};

// Terraced fields in the Andes: farmers dig potatoes with a foot plough, a llama looks on, a condor glides.
const AndesField = () => {
  const f = useCurrentFrame();
  const dig = Math.max(0, Math.sin(f / 9)) * 14;
  return (
    <Svg>
      <Sky top="#7fc3ec" bottom="#eaf6fb" />
      <Clouds y={170} />
      <path d="M -40 520 L 260 170 L 420 330 L 640 90 L 900 380 L 1150 130 L 1420 400 L 1640 200 L 1960 520 Z" fill="#8a8fa4" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M 200 240 L 260 170 L 320 240 L 290 230 L 260 250 L 230 228 Z M 580 160 L 640 90 L 706 168 L 670 156 L 640 178 L 610 156 Z M 1090 200 L 1150 130 L 1214 204 L 1180 192 L 1150 214 L 1120 192 Z M 1590 260 L 1640 200 L 1696 262 L 1664 250 L 1640 270 L 1614 250 Z" fill="#ffffff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <g transform={`translate(${((f * 1.2) % 2400) - 300} ${210 + Math.sin(f / 30) * 20})`}>
        <path d="M -70 0 Q -35 -20 0 0 Q 35 -20 70 0 Q 35 -6 0 8 Q -35 -6 -70 0 Z" fill={INK} />
        <circle cx={0} cy={2} r={6} fill="#ffffff" />
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 440 + i * 110;
        return (
          <g key={i}>
            <path d={`M -20 ${y} Q 960 ${y - 70} 1940 ${y + 10} V ${y + 130} H -20 Z`} fill={['#a7c97a', '#8fbf6a', '#b6d98a', '#7aa95c', '#9cc96b', '#86b860'][i]} stroke={INK} strokeWidth={SW} />
            <path d={`M -20 ${y} Q 960 ${y - 70} 1940 ${y + 10} V ${y + 22} Q 960 ${y - 48} -20 ${y + 22} Z`} fill="#9a8a74" stroke={INK} strokeWidth={4} />
          </g>
        );
      })}
      {Array.from({ length: 9 }).map((_, i) => <PotatoPlant key={`a${i}`} x={130 + i * 210} y={720 - Math.sin((i / 8) * Math.PI) * 20} s={0.45} phase={i * 13} />)}
      {Array.from({ length: 7 }).map((_, i) => <PotatoPlant key={`b${i}`} x={80 + i * 300} y={1060} s={0.75} phase={i * 17} />)}
      <PotatoHeap x={960} y={960} w={220} rows={3} />
      <Person x={780} y={960} s={1} dress="poncho" coat={C.tomato} hat="chullo" hatColor="#3d5a80" skin={SKIN[3]} face="smile" rArm={18}
        hold={<g transform={`translate(0 ${dig})`}><path d="M 0 -120 L 10 140" stroke="#7a5230" strokeWidth={12} strokeLinecap="round" /><path d="M 6 60 h 26" stroke="#7a5230" strokeWidth={10} strokeLinecap="round" /><path d="M 6 130 l 6 34" stroke="#8a8f9c" strokeWidth={14} strokeLinecap="round" /></g>} />
      <Person x={1140} y={960} s={0.95} dress="pollera" skirt="#3d5a80" hat="montera" skin={SKIN[4]} face="smile" phase={30} lArm={28}
        holdL={<g><path d="M -46 -10 Q 0 50 46 -10 Z" fill="#c99a63" stroke={INK} strokeWidth={4} /><Potato x={-14} y={-14} s={0.6} /><Potato x={14} y={-16} s={0.6} /></g>} wave="r" />
      <g transform={`translate(1460 960)`}>
        {[-60, -20, 40, 80].map((x) => <rect key={x} x={x} y={-110} width={22} height={110} rx={8} fill="#f1e6d0" stroke={INK} strokeWidth={5} />)}
        <ellipse cx={10} cy={-140} rx={110} ry={56} fill="#f1e6d0" stroke={INK} strokeWidth={SW} />
        <path d="M -70 -170 Q -100 -260 -100 -300" stroke={INK} strokeWidth={50} strokeLinecap="round" />
        <path d="M -70 -170 Q -100 -260 -100 -300" stroke="#f1e6d0" strokeWidth={38} strokeLinecap="round" />
        <ellipse cx={-118} cy={-310} rx={42} ry={28} fill="#f1e6d0" stroke={INK} strokeWidth={5} />
        <path d={`M -96 -334 l ${4 + Math.sin(f / 15) * 4} -30 M -114 -336 l -4 -30`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
        <circle cx={-118} cy={-314} r={5} fill={INK} />
        <path d="M -40 -150 h 100" stroke={C.tomato} strokeWidth={10} />
      </g>
    </Svg>
  );
};

const Ship: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 18) * 6, rock = Math.sin(f / 26) * 1.2;
  const billow = Math.sin(f / 12) * 6;
  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${rock})`}>
      {[-170, 40, 230].map((mx, i) => (
        <g key={mx}>
          <line x1={mx} y1={-60} x2={mx} y2={-470 + i * 40 + (i === 2 ? 60 : 0)} stroke={INK} strokeWidth={12} />
          <Pennant x={mx} y={-470 + i * 40 + (i === 2 ? 60 : 0)} color={[C.mustard, C.tomato, '#f5ead2'][i]} len={80} />
          <path d={`M ${mx - 100} -380 Q ${mx + billow} -${360 - i * 10} ${mx + 100} -380 L ${mx + 90} -250 Q ${mx + billow} -230 ${mx - 90} -250 Z`} transform={`translate(0 ${i * 50})`} fill="#f5ead2" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          {i < 2 && <rect x={mx - 92} y={-210 + i * 50} width={184} height={22} rx={10} fill="#e8dcc0" stroke={INK} strokeWidth={4} />}
        </g>
      ))}
      <path d="M -170 -470 L -420 -100 M 230 -350 L 420 -70" stroke={INK} strokeWidth={3} />
      <path d="M -420 -150 L -260 -160 L -260 -60 L 300 -60 L 340 -110 L 440 -110 L 400 40 Q 380 90 300 100 L -320 100 Q -400 90 -420 -20 Z" fill="#8a5a32" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M -416 -40 L 420 -40" stroke={C.mustard} strokeWidth={12} />
      {[-300, -200, -100, 0, 100, 200, 300].map((px) => <circle key={px} cx={px} cy={10} r={13} fill="#3b2b20" stroke={INK} strokeWidth={4} />)}
      <rect x={-410} y={-210} width={150} height={60} fill="#a0714a" stroke={INK} strokeWidth={SW} />
      {[-390, -340, -290].map((wx) => <rect key={wx} x={wx} y={-196} width={26} height={30} fill="#ffd98a" stroke={INK} strokeWidth={3} />)}
    </g>
  );
};

// A sailing ship at a stone quay; dockers roll barrels and carry sacks aboard, gulls overhead.
const ShipCargo = () => {
  const f = useCurrentFrame();
  const roll = (f * 3) % 420;
  const climb = ((f * 0.008) % 1);
  return (
    <Svg>
      <Sky top="#8fc9ea" bottom="#eef8fb" />
      <Clouds y={100} />
      <Birds y={160} n={4} color="#5a5a5a" />
      <path d="M -20 600 Q 300 540 520 600 L 520 640 L -20 640 Z" fill="#8fa4a0" stroke={INK} strokeWidth={SW} />
      <rect x={-20} y={600} width={1960} height={500} fill="#4fb3d9" />
      {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M ${((i * 260 + f * 1.5) % 2200) - 140} ${640 + (i % 4) * 50} q 20 -12 40 0 t 40 0`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={0.6} />)}
      <Ship x={1130} y={700} />
      <path d={`M 700 860 L ${930} ${650 + Math.sin(f / 18) * 6}`} stroke="#7a5230" strokeWidth={26} strokeLinecap="round" />
      <path d={`M 700 860 L ${930} ${650 + Math.sin(f / 18) * 6}`} stroke={INK} strokeWidth={4} strokeDasharray="4 22" />
      <rect x={-20} y={820} width={1960} height={280} fill="#b9ad98" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={i * 130 - 20} y={820} width={130} height={60} fill="none" stroke={INK} strokeWidth={3} opacity={0.35} />)}
      <path d="M 1752 800 Q 1700 760 1560 700" stroke="#c9a36b" strokeWidth={8} fill="none" />
      <rect x={1730} y={790} width={44} height={50} rx={10} fill="#5a5a5a" stroke={INK} strokeWidth={5} />
      <Barrel x={180} y={900} />
      <Barrel x={290} y={900} />
      <Barrel x={235} y={800} />
      <Sack x={420} y={910} s={0.9} />
      <Barrel x={520 + roll} y={930} side r={roll * 1.6} s={0.95} />
      <Person x={430 + roll} y={1000} s={0.85} dress="shirt" vest="#7a3b2e" hat="cap" hatColor="#3d5a80" skin={SKIN[2]} rArm={70} lArm={60} face="smile" />
      <g transform={`translate(${interpolate(climb, [0, 1], [700, 900])} ${interpolate(climb, [0, 1], [860, 680])})`} opacity={climb > 0.92 ? 0 : 1}>
        <Person x={0} y={0} s={0.7} dress="shirt" vest="#6b7a3a" hat="cap" hatColor="#7a3b2e" skin={SKIN[1]} rArm={160} lArm={160} hold={<Sack x={-40} y={10} s={0.55} />} phase={20} />
      </g>
      <Person x={1420} y={1010} s={0.95} dress="coat" coat="#2f4858" vest="#e2c48e" hat="tricorn" skin={SKIN[0]} rArm={40} face="flat"
        hold={<Paper x={10} y={10} r={-6} w={60} h={80} />} wave="l" />
    </Svg>
  );
};

// A scholar's study: herbarium sheets, a potato plant in a pot, an open book, a window with moving clouds.
const BotanistStudy = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#e9d6b0" />
      <rect x={0} y={520} width={1920} height={260} fill="#c9a16f" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={30 + i * 192} y={550} width={150} height={190} rx={8} fill="none" stroke={INK} strokeWidth={4} opacity={0.35} />)}
      <g>
        <defs>
          <clipPath id="studyWin"><path d="M 1180 560 V 230 Q 1370 60 1560 230 V 560 Z" /></clipPath>
        </defs>
        <g clipPath="url(#studyWin)">
          <rect x={1180} y={60} width={380} height={520} fill="#9fd3f0" />
          <g transform={`translate(${((f * 0.8) % 600) - 200} 0)`}>
            <ellipse cx={1250} cy={250} rx={80} ry={30} fill="#ffffff" />
            <ellipse cx={1310} cy={232} rx={60} ry={30} fill="#ffffff" />
          </g>
          <path d="M 1180 470 Q 1300 420 1560 460 V 560 H 1180 Z" fill="#8fbf6a" />
          {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M ${1100 + i * 60} 60 L ${1100 + i * 60 + 300} 600 M ${1100 + i * 60 + 300} 60 L ${1100 + i * 60} 600`} stroke="#6b5a40" strokeWidth={4} />)}
        </g>
        <path d="M 1180 560 V 230 Q 1370 60 1560 230 V 560 Z" fill="none" stroke={INK} strokeWidth={SW + 2} />
        <rect x={1160} y={556} width={420} height={26} fill="#a0714a" stroke={INK} strokeWidth={SW} />
      </g>
      <path d="M 1180 560 L 980 1080 L 1700 1080 L 1560 560 Z" fill="#fff6d0" opacity={0.18} />
      <Motes x={1100} y={600} w={560} h={420} />
      <g>
        <rect x={120} y={90} width={420} height={520} fill="#7a5230" stroke={INK} strokeWidth={SW} />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect x={140} y={110 + r * 166} width={380} height={146} fill="#5b3b26" />
            {Array.from({ length: 9 }).map((_, i) => {
              const h = 100 + ((i * 37 + r * 11) % 40);
              return <rect key={i} x={150 + i * 40} y={256 + r * 166 - h} width={34} height={h} fill={['#7a3b2e', '#3d5a80', '#6b7a3a', '#b5523b', '#c9a36b'][(i + r) % 5]} stroke={INK} strokeWidth={4} />;
            })}
            <rect x={130} y={256 + r * 166} width={400} height={16} fill="#a0714a" stroke={INK} strokeWidth={4} />
          </g>
        ))}
      </g>
      <rect x={0} y={780} width={1920} height={300} fill="#8c6a48" stroke={INK} strokeWidth={SW} />
      <Person x={860} y={790} s={1.15} dress="robe" coat="#2f3b4f" hair="brown" beard skin={SKIN[0]} face="smile" sit rArm={150} wave="r" lArm={40}
        hold={<Potato x={0} y={-18} s={0.9} r={-10} />} />
      <rect x={520} y={640} width={880} height={56} rx={8} fill="#6b4428" stroke={INK} strokeWidth={SW} />
      <rect x={560} y={696} width={40} height={300} fill="#6b4428" stroke={INK} strokeWidth={SW} />
      <rect x={1320} y={696} width={40} height={300} fill="#6b4428" stroke={INK} strokeWidth={SW} />
      <rect x={600} y={696} width={720} height={150} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${620 + i * 170} 600) rotate(${i ? 4 : -5})`}>
          <rect x={0} y={0} width={150} height={60} fill="#f6ecd2" stroke={INK} strokeWidth={4} />
          <path d="M 75 52 V 14 M 75 30 l -26 -10 M 75 24 l 24 -10 M 75 40 l 22 -6" stroke="#5f9a3e" strokeWidth={5} strokeLinecap="round" />
        </g>
      ))}
      <path d="M 960 640 L 1000 600 L 1110 610 L 1110 640 Z M 1110 640 L 1110 610 L 1220 600 L 1250 640 Z" fill="#f6ecd2" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <rect x={1000} y={616} width={90} height={4} fill={INK} opacity={0.4} /><rect x={1130} y={616} width={90} height={4} fill={INK} opacity={0.4} />
      <g transform="translate(1300 640)">
        <path d="M -50 0 L -60 -90 L 60 -90 L 50 0 Z" fill="#c46a3a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <rect x={-68} y={-110} width={136} height={24} rx={6} fill="#c46a3a" stroke={INK} strokeWidth={5} />
      </g>
      <PotatoPlant x={1300} y={540} s={0.9} />
      <Potato x={1180} y={636} s={0.7} r={12} />
      <Candle x={560} y={640} s={0.9} />
      <ellipse cx={960} cy={1010} rx={620} ry={60} fill="#7a3b2e" stroke={INK} strokeWidth={5} />
      <ellipse cx={960} cy={1010} rx={560} ry={40} fill="none" stroke={C.mustard} strokeWidth={5} />
      <g transform="translate(330 1000)">
        <path d="M -110 -80 Q 0 30 110 -80 Z" fill="#c99a63" stroke={INK} strokeWidth={SW} />
        <PotatoHeap x={0} y={-66} w={200} rows={2} s={0.85} />
        <path d="M -110 -80 Q 0 -30 110 -80" stroke={INK} strokeWidth={4} fill="none" />
      </g>
      <g transform="translate(1600 1000)">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-90 + (i % 2) * 10} y={-40 - i * 40} width={180} height={40} rx={4} fill={['#7a3b2e', '#3d5a80', '#6b7a3a', '#b5523b'][i]} stroke={INK} strokeWidth={5} />)}
      </g>
      <g transform="translate(720 640)">
        <rect x={-24} y={-40} width={48} height={40} rx={6} fill="#3b3b4a" stroke={INK} strokeWidth={4} />
        <path d={`M 0 -36 Q ${30 + Math.sin(f / 15) * 6} -110 60 -150`} stroke="#f6f0e6" strokeWidth={14} strokeLinecap="round" fill="none" />
      </g>
    </Svg>
  );
};

// A farmhouse kitchen: a fire under a steaming pot, a family at the table, a cat by the hearth.
const FarmhouseKitchen = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#efe4cf" />
      {[0, 420, 900, 1380, 1860].map((x) => <rect key={x} x={x} y={0} width={40} height={760} fill="#6b4428" stroke={INK} strokeWidth={5} />)}
      <rect x={0} y={60} width={1920} height={36} fill="#6b4428" stroke={INK} strokeWidth={5} />
      {[200, 560, 1100].map((x, i) => (
        <g key={x} transform={`translate(${x} 96) rotate(${Math.sin((f + i * 20) / 30) * 4})`}>
          <line x1={0} y1={0} x2={0} y2={60} stroke={INK} strokeWidth={4} />
          <path d="M -20 60 Q 0 140 20 60 Z" fill={i % 2 ? '#8fbf6a' : '#b6a35b'} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <g>
        <rect x={1540} y={170} width={260} height={260} fill="#9fd3f0" stroke={INK} strokeWidth={SW} />
        <path d="M 1670 170 V 430 M 1540 300 H 1800" stroke="#ffffff" strokeWidth={8} />
        <rect x={1480} y={160} width={60} height={280} fill="#5f9a86" stroke={INK} strokeWidth={5} />
        <rect x={1800} y={160} width={60} height={280} fill="#5f9a86" stroke={INK} strokeWidth={5} />
      </g>
      <rect x={1080} y={300} width={300} height={22} fill="#a0714a" stroke={INK} strokeWidth={5} />
      {[1110, 1190, 1270].map((x) => <circle key={x} cx={x + 20} cy={260} r={38} fill="#f5ead2" stroke={INK} strokeWidth={5} />)}
      {/* hearth */}
      <rect x={140} y={250} width={600} height={540} fill="#9a8a74" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 8 }).map((_, r) => <line key={r} x1={140} y1={250 + r * 66} x2={740} y2={250 + r * 66} stroke={INK} strokeWidth={3} opacity={0.3} />)}
      <path d="M 210 790 V 520 Q 440 380 670 520 V 790 Z" fill="#3b2b20" stroke={INK} strokeWidth={SW} />
      <rect x={100} y={220} width={680} height={50} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      <Fire x={440} y={790} s={0.9} />
      <path d="M 440 420 V 600" stroke={INK} strokeWidth={6} />
      <g transform={`translate(440 640) rotate(${Math.sin(f / 25) * 2})`}>
        <path d="M -110 -30 Q -120 70 0 80 Q 120 70 110 -30 Z" fill="#3b3b3b" stroke={INK} strokeWidth={SW} />
        <ellipse cx={0} cy={-30} rx={112} ry={24} fill="#d9c08f" stroke={INK} strokeWidth={SW} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-50 + i * 50} cy={-30} r={6 + Math.abs(Math.sin((f + i * 10) / 6)) * 6} fill="#f1dcae" stroke={INK} strokeWidth={2} />)}
        <path d="M -110 -30 Q 0 -150 110 -30" stroke={INK} strokeWidth={5} fill="none" />
      </g>
      <Steam x={440} y={590} scale={0.8} />
      <rect x={0} y={780} width={1920} height={300} fill="#b8a68a" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={i * 170 - 30} y={800 + (i % 3) * 80} width={150} height={60} rx={10} fill="none" stroke={INK} strokeWidth={3} opacity={0.3} />)}
      {/* cat */}
      <g transform="translate(720 880)">
        <path d={`M 60 -20 q 50 ${-30 + Math.sin(f / 9) * 20} 30 -70`} stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d={`M 60 -20 q 50 ${-30 + Math.sin(f / 9) * 20} 30 -70`} stroke="#6b6b6b" strokeWidth={10} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={-30} rx={80} ry={40} fill="#6b6b6b" stroke={INK} strokeWidth={SW} />
        <circle cx={-70} cy={-60} r={34} fill="#6b6b6b" stroke={INK} strokeWidth={SW} />
        <path d="M -96 -82 l 6 -30 l 18 22 M -60 -90 l 14 -26 l 8 30" fill="#6b6b6b" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -86 -60 q 6 4 12 0 M -64 -60 q 6 4 12 0" stroke={INK} strokeWidth={4} fill="none" />
      </g>
      {/* family at the table */}
      <Person x={980} y={820} s={1.05} dress="coat" coat="#6b7a3a" vest="#e2c48e" hair="brown" skin={SKIN[1]} sit face="smile" rArm={120} wave="r"
        hold={<path d="M 0 0 l 24 -24" stroke="#a0714a" strokeWidth={8} strokeLinecap="round" />} />
      <Person x={1210} y={820} s={1.05} dress="dress" vest="#c46a5a" skirt="#3d5a80" hat="bonnet" skin={SKIN[0]} sit face="smile" phase={30} />
      <Person x={1420} y={790} s={0.8} dress="shirt" vest="#3d5a80" hair="blond" skin={SKIN[0]} sit face="open" phase={60} lArm={40} wave="l" />
      <rect x={860} y={700} width={700} height={50} rx={6} fill="#a0714a" stroke={INK} strokeWidth={SW} />
      <rect x={900} y={750} width={34} height={190} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      <rect x={1490} y={750} width={34} height={190} fill="#7a5230" stroke={INK} strokeWidth={SW} />
      {[980, 1210, 1420].map((x) => (
        <g key={x} transform={`translate(${x} 700)`}>
          <path d="M -50 -26 Q -46 6 0 8 Q 46 6 50 -26 Z" fill="#c46a3a" stroke={INK} strokeWidth={5} />
          <ellipse cx={0} cy={-26} rx={50} ry={10} fill="#e6d4a6" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <Steam x={1100} y={680} scale={0.4} />
      <path d="M 1080 700 Q 1100 650 1140 650 Q 1180 650 1190 700 Z" fill="#c99a63" stroke={INK} strokeWidth={5} />
      <g transform="translate(1660 960)">
        <path d="M -80 -60 Q 0 30 80 -60 Z" fill="#c99a63" stroke={INK} strokeWidth={SW} />
        <PotatoHeap x={0} y={-50} w={150} rows={2} s={0.8} />
        <path d="M -80 -60 Q 0 -20 80 -60" stroke={INK} strokeWidth={4} fill="none" />
      </g>
    </Svg>
  );
};

// A thatched cottage with a small kitchen garden of flowering potato plants; a woman hoes, hens peck.
const VillageGarden = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#8fc9ea" bottom="#eef8fb" />
      <Clouds y={90} />
      <Birds y={150} n={3} />
      <Hill d="M 0 560 Q 400 440 900 520 T 1920 480 V 1080 H 0 Z" fill="#9cc96b" />
      <g transform="translate(1500 470)">
        <rect x={0} y={-60} width={50} height={70} fill="#efe0c0" stroke={INK} strokeWidth={4} />
        <path d="M -6 -60 L 25 -130 L 56 -60 Z" fill="#7a3b2e" stroke={INK} strokeWidth={4} />
        <rect x={70} y={-30} width={60} height={40} fill="#efe0c0" stroke={INK} strokeWidth={4} />
        <path d="M 64 -30 L 100 -60 L 136 -30 Z" fill="#7a3b2e" stroke={INK} strokeWidth={4} />
      </g>
      <Tree x={210} y={640} s={1.2} phase={0} />
      <Tree x={1750} y={640} s={1.1} c="#73ad4a" phase={40} />
      {/* cottage */}
      <g>
        <Smoke x={1050} y={250} />
        <rect x={1030} y={240} width={46} height={90} fill="#9a8a74" stroke={INK} strokeWidth={5} />
        <rect x={660} y={400} width={520} height={260} fill="#f2e6cc" stroke={INK} strokeWidth={SW} />
        <path d="M 660 400 L 1180 400 M 660 530 H 1180 M 760 400 V 660 M 1080 400 V 660 M 660 400 L 760 530 M 1180 400 L 1080 530" stroke="#6b4428" strokeWidth={14} />
        <path d="M 620 420 Q 640 300 760 230 L 1080 230 Q 1200 300 1220 420 Z" fill="#c9a35b" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M ${660 + i * 46} 410 l 14 -60`} stroke="#9a7a3a" strokeWidth={5} />)}
        <path d="M 870 660 V 540 Q 920 500 970 540 V 660 Z" fill="#7a5230" stroke={INK} strokeWidth={SW} />
        <rect x={1100} y={440} width={70} height={70} fill="#cfe6f0" stroke={INK} strokeWidth={5} />
        <rect x={680} y={440} width={70} height={70} fill="#cfe6f0" stroke={INK} strokeWidth={5} />
        <rect x={672} y={506} width={86} height={22} fill="#7a5230" stroke={INK} strokeWidth={4} />
        {[690, 712, 734].map((x) => <circle key={x} cx={x} cy={500} r={10} fill={C.tomato} stroke={INK} strokeWidth={3} />)}
      </g>
      <rect x={0} y={650} width={1920} height={430} fill="#8fbf6a" stroke={INK} strokeWidth={SW} />
      <path d="M 560 700 L 1360 700 L 1460 1000 L 460 1000 Z" fill="#8a6a48" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <path d={`M ${540 - r * 34} ${780 + r * 90} H ${1380 + r * 34}`} stroke="#6b4a2e" strokeWidth={14} strokeLinecap="round" />
          {Array.from({ length: 7 + r }).map((_, i) => <PotatoPlant key={i} x={600 - r * 34 + i * ((780 + r * 68) / (6 + r))} y={780 + r * 90} s={0.48 + r * 0.12} phase={i * 9 + r * 20} />)}
        </g>
      ))}
      <Fence x0={420} x1={1500} y={1060} h={70} gap={50} />
      <Person x={1520} y={960} s={0.95} dress="dress" skirt="#7a3b2e" vest="#e2c48e" apron="#f5ead2" hat="bonnet" skin={SKIN[1]} face="smile" rArm={30 + Math.sin(f / 7) * 22}
        hold={<g><path d="M 0 -60 L -10 120" stroke="#7a5230" strokeWidth={10} strokeLinecap="round" /><path d="M -10 120 l -40 6" stroke="#8a8f9c" strokeWidth={14} strokeLinecap="round" /></g>} />
      <Chicken x={380} y={920} s={0.8} />
      <Chicken x={300} y={980} s={0.7} phase={20} flip />
      <Butterfly x={900} y={720} phase={30} />
    </Svg>
  );
};

// Rain streaks in two depths, slanted by the wind.
const Rain: React.FC<{ n?: number }> = ({ n = 140 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const near = i % 3 === 0;
        const speed = near ? 46 : 30, len = near ? 70 : 42;
        const y = ((i * 251 + f * speed) % 1240) - 120;
        const x = ((i * 137.5) % 2200) - 60 - y * 0.24 + 260;
        return <path key={i} d={`M ${x} ${y} l ${-len * 0.24} ${len}`} stroke={near ? '#dfe8ee' : '#b9c6cf'} strokeWidth={near ? 4 : 2.5} opacity={near ? 0.7 : 0.45} strokeLinecap="round" />;
      })}
    </g>
  );
};

// A puddle with rain rings opening on it.
const Puddle: React.FC<{ x: number; y: number; w?: number; phase?: number }> = ({ x, y, w = 160, phase = 0 }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={w / 2} ry={w / 7} fill="#5d6d78" stroke={INK} strokeWidth={4} />
      <ellipse cx={-w * 0.12} cy={-w * 0.03} rx={w * 0.22} ry={w * 0.035} fill="#8c9ca6" />
      {[0, 1, 2].map((k) => {
        const t = ((f + phase + k * 13) % 38) / 38;
        const cx = ((k * 47 + phase * 3) % (w * 0.6)) - w * 0.3;
        return <ellipse key={k} cx={cx} cy={((k * 11) % 10) - 5} rx={6 + t * w * 0.18} ry={2 + t * w * 0.05} fill="none" stroke="#d6e1e8" strokeWidth={3} opacity={1 - t} />;
      })}
    </g>
  );
};

// Three-field village: winter grain, spring grain, and the fallow field where cows graze.
// rain: the same fields in a heavy summer storm (grain beaten flat, puddles, cows sheltering, a worried farmer under a sack).
const VillageFields: React.FC<{ rain?: boolean }> = ({ rain }) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 14) * 2.5;
  return (
    <Svg>
      {rain ? <Sky top="#3f4851" bottom="#8a949b" /> : <Sky top="#8fc9ea" bottom="#eef8fb" />}
      {rain ? (
        <g>
          {Array.from({ length: 9 }).map((_, i) => {
            const x = ((i * 260 + f * 0.6) % 2340) - 210;
            return (
              <g key={i} transform={`translate(${x} ${60 + (i % 3) * 40})`}>
                <ellipse cx={0} cy={0} rx={190} ry={70} fill={i % 2 ? '#5b636b' : '#4d555d'} />
                <ellipse cx={110} cy={-30} rx={140} ry={70} fill={i % 2 ? '#646c74' : '#555d65'} />
              </g>
            );
          })}
          <Clouds y={170} color="#6f777e" />
        </g>
      ) : (
        <>
          <Clouds y={80} />
          <Birds y={130} n={3} dir={-1} />
        </>
      )}
      <Hill d="M 0 470 Q 500 360 1000 440 T 1920 420 V 600 H 0 Z" fill={rain ? '#6f8f5a' : '#9cc96b'} />
      <g transform="translate(860 300)">
        {!rain && <Smoke x={210} y={110} s={0.6} />}
        <rect x={60} y={40} width={60} height={140} fill={rain ? '#cbbfa6' : '#efe0c0'} stroke={INK} strokeWidth={5} />
        <path d="M 54 42 L 90 -60 L 126 42 Z" fill={rain ? '#4b7a6a' : '#5f9a86'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {[[-80, 110, 90], [140, 120, 80], [220, 120, 70], [-160, 130, 60]].map(([x, y, w], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={60} fill={rain ? '#cfc3a8' : '#f2e6cc'} stroke={INK} strokeWidth={5} />
            <path d={`M ${x - 8} ${y} L ${x + w / 2} ${y - 40} L ${x + w + 8} ${y} Z`} fill={i % 2 ? (rain ? '#a08446' : '#c9a35b') : (rain ? '#5e2f25' : '#7a3b2e')} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            {rain && <rect x={x + w / 2 - 10} y={y + 18} width={20} height={20} fill="#ffd37a" stroke={INK} strokeWidth={3} />}
          </g>
        ))}
      </g>
      {/* far field: winter grain, ripe (in the storm: dark and beaten flat) */}
      <path d="M -20 520 Q 960 470 1940 510 V 640 Q 960 600 -20 650 Z" fill={rain ? '#a08638' : '#e2b950'} stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 48 }).map((_, i) => {
        const x = i * 41, sw = Math.sin((f + i * 6) / 14) * 5;
        const y = 600 - Math.sin(i / 8) * 6;
        if (rain) {
          const g = Math.sin((f + i * 9) / 10) * 3;
          return <path key={i} d={`M ${x} ${y} q 6 -14 ${30 + g} ${-10 + Math.abs(g)}`} stroke="#6f5a22" strokeWidth={5} fill="none" strokeLinecap="round" />;
        }
        return <path key={i} d={`M ${x} ${y} q ${sw} -22 ${sw * 1.6} -40`} stroke="#b5892f" strokeWidth={5} fill="none" strokeLinecap="round" />;
      })}
      {rain && Array.from({ length: 24 }).map((_, i) => <path key={`fl${i}`} d={`M ${i * 83 + 20} ${575 + (i % 3) * 12 - i * 0.6} q 20 -6 46 2`} stroke="#c9a94c" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />)}
      {/* hedge */}
      <path d="M -20 650 Q 960 600 1940 640" stroke={rain ? '#3b5a2c' : '#4f7a3a'} strokeWidth={26} fill="none" strokeLinecap="round" />
      {/* middle field: spring grain, young and green */}
      <path d="M -20 652 Q 960 602 1940 642 V 780 Q 960 730 -20 790 Z" fill={rain ? '#6f8f55' : '#9cc96b'} stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M -20 ${672 + i * 18} Q 960 ${624 + i * 18} 1940 ${662 + i * 18}`} stroke={rain ? '#55733f' : '#7aa95c'} strokeWidth={6} fill="none" />)}
      {rain && <><Puddle x={520} y={712} w={170} phase={5} /><Puddle x={1460} y={706} w={140} phase={21} /></>}
      <path d="M -20 790 Q 960 730 1940 780" stroke={rain ? '#3b5a2c' : '#4f7a3a'} strokeWidth={26} fill="none" strokeLinecap="round" />
      {/* near field: fallow pasture with cows */}
      <path d="M -20 792 Q 960 732 1940 782 V 1100 H -20 Z" fill={rain ? '#8a9560' : '#b7c77a'} stroke={INK} strokeWidth={SW} />
      {rain ? (
        <g>
          {[[260, 900, 120], [640, 980, 90], [1240, 870, 110], [1640, 960, 130]].map(([x, y, w], i) => <ellipse key={i} cx={x} cy={y} rx={w} ry={w / 4} fill="#6e5a40" opacity={0.7} />)}
          {Array.from({ length: 20 }).map((_, i) => <path key={`g${i}`} d={`M ${(i * 211) % 1900} ${900 + (i % 4) * 50} l -12 -14 m 12 14 l 4 -18 m -4 18 l 16 -10`} stroke="#55703a" strokeWidth={4} />)}
          {/* cows huddle under the lone tree on the left */}
          <Tree x={250} y={880} s={1.15} c="#4c7a35" phase={10} />
          <Cow x={210} y={905} s={0.42} />
          <Cow x={360} y={915} s={0.4} flip phase={30} />
          <Puddle x={700} y={900} w={220} phase={0} />
          <Puddle x={1300} y={1000} w={260} phase={14} />
          <Puddle x={1700} y={860} w={150} phase={27} />
          {/* the farmer, a sack over his head, looks at the beaten grain */}
          <Person x={980} y={1010} s={0.95} dress="shirt" vest="#7a6a52" legs="#8a7a62" hair="dark" face="doubt" lArm={14} rArm={14} />
          <g transform={`translate(980 ${1010 + bob}) scale(0.95)`}>
            <path fillRule="evenodd" d="M -84 -190 Q -96 -270 -70 -320 Q -30 -380 30 -400 Q 50 -360 72 -326 Q 98 -270 84 -190 Q 0 -206 -84 -190 Z M -36 -270 a 36 38 0 1 0 72 0 a 36 38 0 1 0 -72 0 Z"
              fill="#c9ad78" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
            {[-40, 40].map((hx) => <circle key={hx} cx={hx} cy={-206} r={13} fill={SKIN[1]} stroke={INK} strokeWidth={4} />)}
            <path d="M -50 -340 q 34 -18 70 -14 M -70 -250 q -6 20 -2 40 M 70 -250 q 6 20 2 40" stroke="#8f7448" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
          {Array.from({ length: 26 }).map((_, i) => {
            const t = ((f + i * 7) % 16) / 16;
            const x = (i * 331) % 1880 + 20, y = 830 + ((i * 53) % 230);
            return <path key={`sp${i}`} d={`M ${x - 6 - t * 12} ${y - t * 16} L ${x - 2} ${y} M ${x + 6 + t * 12} ${y - t * 16} L ${x + 2} ${y}`} stroke="#e3ecf1" strokeWidth={3} strokeLinecap="round" opacity={(1 - t) * 0.8} />;
          })}
          <Rain />
          <rect width={1920} height={1080} fill="#2a3640" opacity={0.12} />
        </g>
      ) : (
        <g>
          {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={(i * 137) % 1900 + 10} cy={860 + (i % 5) * 45} r={6} fill={i % 3 ? '#ffffff' : C.mustard} stroke={INK} strokeWidth={2} />)}
          {Array.from({ length: 20 }).map((_, i) => <path key={`g${i}`} d={`M ${(i * 211) % 1900} ${900 + (i % 4) * 50} l -8 -20 m 8 20 l 0 -24 m 0 24 l 8 -20`} stroke="#6b8a3a" strokeWidth={4} />)}
          <Cow x={830} y={990} s={0.85} graze />
          <Cow x={1170} y={940} s={0.7} flip phase={40} />
          <Cow x={420} y={900} s={0.55} graze phase={80} />
        </g>
      )}
    </Svg>
  );
};
const VillageFieldsRain = () => <VillageFields rain />;

const Hall: React.FC<{ wall: string; trim: string; floorA: string; floorB: string; windows?: boolean }> = ({ wall, trim, floorA, floorB, windows = true }) => (
  <g>
    <rect width={1920} height={1080} fill={wall} />
    {windows && [160, 1560].map((x) => (
      <g key={x}>
        <path d={`M ${x} 640 V 260 Q ${x + 100} 140 ${x + 200} 260 V 640 Z`} fill="#bfe3f2" stroke={INK} strokeWidth={SW} />
        <path d={`M ${x + 100} 180 V 640 M ${x} 400 H ${x + 200} M ${x} 520 H ${x + 200}`} stroke="#ffffff" strokeWidth={6} />
      </g>
    ))}
    {[420, 700, 1220, 1500].map((x) => <rect key={x} x={x} y={120} width={40} height={600} fill={trim} stroke={INK} strokeWidth={5} />)}
    <rect x={0} y={90} width={1920} height={40} fill={trim} stroke={INK} strokeWidth={5} />
    <rect x={0} y={720} width={1920} height={360} fill={floorA} stroke={INK} strokeWidth={SW} />
    {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M ${i * 160 - 200} 1080 L ${i * 160 + 40} 720`} stroke={floorB} strokeWidth={10} />)}
    {Array.from({ length: 4 }).map((_, i) => <path key={`h${i}`} d={`M 0 ${780 + i * 80} H 1920`} stroke={floorB} strokeWidth={6} />)}
  </g>
);

const Chandelier: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 40) * 1.5} 0 ${-y}) scale(${s})`}>
      <line x1={0} y1={-y} x2={0} y2={0} stroke={INK} strokeWidth={5} />
      <path d="M -120 20 Q 0 90 120 20" stroke={C.mustard} strokeWidth={12} fill="none" />
      <path d="M -120 20 Q 0 90 120 20" stroke={INK} strokeWidth={3} fill="none" />
      {[-120, -60, 0, 60, 120].map((cx) => {
        const fl = 1 + Math.sin((f + cx) / 3) * 0.1;
        return (
          <g key={cx} transform={`translate(${cx} ${cx === 0 ? 50 : Math.abs(cx) === 60 ? 40 : 18})`}>
            <circle r={26 * fl} fill="#ffd27a" opacity={0.3} />
            <rect x={-6} y={-30} width={12} height={30} fill="#f6efd8" stroke={INK} strokeWidth={3} />
            <path d={`M 0 ${-30 - 18 * fl} Q 7 -36 0 -30 Q -7 -36 0 ${-30 - 18 * fl} Z`} fill={C.mustard} stroke={INK} strokeWidth={2} />
          </g>
        );
      })}
    </g>
  );
};

// Paris Faculty of Medicine, 1771: doctors in black robes and wigs debate over a potato on a plate.
const ParisFaculty = () => (
  <Svg>
    <Hall wall="#e9dcc0" trim="#c9b08a" floorA="#b9a27e" floorB="#a48c68" />
    <Chandelier x={960} y={150} />
    <path d="M 1560 260 L 1400 1080 L 1900 1080 L 1760 260 Z M 160 260 L 20 1080 L 520 1080 L 360 260 Z" fill="#fff6d0" opacity={0.15} />
    <Motes x={160} y={300} w={300} h={600} />
    {[540, 750].map((x, i) => <Person key={x} x={x} y={780} s={1.05} dress="robe" coat="#23201f" hair="wig" hat={i ? 'square' : 'none'} skin={SKIN[i]} sit face={i ? 'doubt' : 'flat'} phase={i * 25} lArm={i ? 60 : 20} wave={i ? 'l' : undefined} />)}
    {[1170, 1380].map((x, i) => <Person key={x} x={x} y={780} s={1.05} dress="robe" coat="#23201f" hair="wig" hat={i ? 'none' : 'square'} skin={SKIN[i + 1]} sit face={i ? 'smile' : 'doubt'} phase={i * 25 + 50} rArm={i ? 30 : 110} wave={i ? undefined : 'r'} />)}
    <Person x={960} y={790} s={1.12} dress="robe" coat="#23201f" hair="wig" skin={SKIN[0]} face="open" rArm={130} lArm={20} wave="r" hold={<Paper x={0} y={20} r={-12} w={70} h={90} />} phase={10} />
    <path d="M 300 1080 L 560 860 L 1360 860 L 1620 1080 Z" fill="#8c2f2a" stroke={INK} strokeWidth={SW} />
    <path d="M 380 1080 L 590 890 L 1330 890 L 1540 1080" fill="none" stroke={C.mustard} strokeWidth={6} />
    <rect x={420} y={660} width={1080} height={50} rx={8} fill="#4f7a52" stroke={INK} strokeWidth={SW} />
    <path d="M 420 710 L 440 860 L 1480 860 L 1500 710 Z" fill="#45694a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    {[600, 800, 1120, 1320].map((x) => <Paper key={x} x={x} y={672} r={x % 3 ? 70 : 100} w={40} h={60} />)}
    <g transform="translate(960 668)">
      <ellipse cx={0} cy={0} rx={90} ry={20} fill="#d8d8d8" stroke={INK} strokeWidth={5} />
      <Potato x={0} y={-16} s={1.1} />
    </g>
    <Candle x={700} y={668} s={0.7} />
    <Candle x={1220} y={668} s={0.7} />
  </Svg>
);

const Eagle: React.FC = () => (
  <g>
    <path d="M -24 70 L -44 130 L -14 112 L 0 140 L 14 112 L 44 130 L 24 70 Z" fill="#1f1b19" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    {[-1, 1].map((sx) => (
      <path key={sx} transform={`scale(${sx} 1)`} d="M -24 -30 Q -70 -110 -150 -110 L -126 -84 L -162 -70 L -132 -48 L -160 -30 L -126 -14 L -146 6 L -108 10 Q -60 6 -24 20 Z" fill="#1f1b19" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    ))}
    <path d="M -36 84 l -14 16 M -36 84 l -2 20 M 36 84 l 14 16 M 36 84 l 2 20" stroke={C.mustard} strokeWidth={6} strokeLinecap="round" />
    <ellipse cx={0} cy={10} rx={36} ry={74} fill="#1f1b19" stroke={INK} strokeWidth={4} />
    <circle cx={-6} cy={-80} r={26} fill="#1f1b19" stroke={INK} strokeWidth={4} />
    <path d="M -28 -86 Q -56 -82 -50 -66 Q -40 -74 -26 -72 Z" fill={C.mustard} stroke={INK} strokeWidth={3} />
    <circle cx={-14} cy={-86} r={4} fill="#ffffff" />
    <path d="M -24 -104 L -20 -126 L -8 -112 L 0 -130 L 8 -112 L 20 -126 L 22 -104 Z" fill={C.mustard} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
  </g>
);

// A Prussian official writes potato orders at his desk under the black-eagle banner; a clerk brings more papers.
const PrussianOffice = () => {
  const f = useCurrentFrame();
  const pend = Math.sin(f / 12) * 14;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#d9cbb0" />
      <rect x={0} y={480} width={1920} height={280} fill="#a88a64" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={40 + i * 190} y={510} width={150} height={210} rx={6} fill="none" stroke={INK} strokeWidth={4} opacity={0.3} />)}
      <g transform={`translate(960 70) skewX(${Math.sin(f / 30) * 1.2})`}>
        <rect x={-250} y={-14} width={500} height={24} rx={12} fill={C.mustard} stroke={INK} strokeWidth={5} />
        <path d="M -220 10 H 220 V 390 L 0 450 L -220 390 Z" fill="#f1ece2" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M -200 30 H 200 V 376 L 0 430 L -200 376 Z" fill="none" stroke="#1f1b19" strokeWidth={6} />
        <g transform="translate(0 220) scale(1.15)"><Eagle /></g>
      </g>
      <g transform="translate(250 140)">
        <rect x={-60} y={0} width={120} height={360} rx={14} fill="#7a5230" stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={70} r={46} fill="#f5ead2" stroke={INK} strokeWidth={5} />
        <path d={`M 0 70 V 40 M 0 70 L ${Math.cos(f / 50) * 26} ${70 + Math.sin(f / 50) * 26}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <g transform={`rotate(${pend} 0 130)`}>
          <line x1={0} y1={130} x2={0} y2={290} stroke={C.mustard} strokeWidth={6} />
          <circle cx={0} cy={300} r={22} fill={C.mustard} stroke={INK} strokeWidth={5} />
        </g>
      </g>
      <g>
        <rect x={1530} y={120} width={260} height={320} fill="#bfe3f2" stroke={INK} strokeWidth={SW} />
        <path d="M 1660 120 V 440 M 1530 280 H 1790" stroke="#ffffff" strokeWidth={8} />
        <path d={`M 1500 100 Q ${1560 + Math.sin(f / 20) * 8} 300 1520 470 L 1480 470 L 1480 100 Z M 1820 100 Q ${1760 + Math.sin(f / 20) * 8} 300 1800 470 L 1840 470 L 1840 100 Z`} fill={C.tomato} stroke={INK} strokeWidth={5} />
      </g>
      <rect x={0} y={760} width={1920} height={320} fill="#8c6a48" stroke={INK} strokeWidth={SW} />
      <ellipse cx={960} cy={1000} rx={700} ry={70} fill="#2f4a7a" stroke={INK} strokeWidth={5} />
      <ellipse cx={960} cy={1000} rx={640} ry={48} fill="none" stroke={C.mustard} strokeWidth={5} />
      <g transform="translate(330 990)">
        <rect x={-130} y={-120} width={260} height={120} rx={8} fill="#7a5230" stroke={INK} strokeWidth={SW} />
        <path d="M -130 -80 H 130" stroke={INK} strokeWidth={4} />
        <rect x={-20} y={-96} width={40} height={30} rx={4} fill={C.mustard} stroke={INK} strokeWidth={4} />
        {[0, 1, 2].map((i) => <rect key={i} x={-100 + i * 8} y={-150 - i * 16} width={170} height={16} fill="#f6ecd2" stroke={INK} strokeWidth={3} />)}
      </g>
      <Person x={960} y={815} s={1.12} dress="coat" coat="#2f4a7a" vest="#e2c48e" hair="wig" skin={SKIN[0]} sit face="flat" rArm={60 + Math.sin(f / 4) * 6} lArm={50}
        hold={<path d="M 0 0 Q 30 -40 50 -90" stroke="#f6f0e6" strokeWidth={10} strokeLinecap="round" fill="none" />} />
      <rect x={580} y={680} width={760} height={50} rx={8} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={620} y={730} width={680} height={180} fill="#6b4428" stroke={INK} strokeWidth={SW} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={640 + (i % 2) * 6} y={662 - i * 16} width={150} height={18} fill="#f6ecd2" stroke={INK} strokeWidth={3} />)}
      <g transform="translate(1010 690) rotate(-4)">
        <rect x={-90} y={-24} width={180} height={24} fill="#f6ecd2" stroke={INK} strokeWidth={4} />
        <path d={`M -76 -12 h ${interpolate(f % 90, [0, 80], [10, 150], clamp)}`} stroke={INK} strokeWidth={3} />
      </g>
      <rect x={1140} y={650} width={40} height={36} rx={6} fill="#3b3b4a" stroke={INK} strokeWidth={4} />
      <Candle x={1250} y={684} s={0.8} />
      <Person x={1480} y={1010} s={0.95} dress="coat" coat="#5b6b7a" vest="#f1ece2" hair="brown" skin={SKIN[2]} face="smile" lArm={60} rArm={60} phase={30}
        hold={<g>{[0, 1, 2, 3].map((i) => <rect key={i} x={-90} y={-30 - i * 14} width={110} height={14} fill="#f6ecd2" stroke={INK} strokeWidth={3} />)}</g>} />
    </Svg>
  );
};

const PalaceSilhouette: React.FC<{ x: number; y: number; s?: number; c?: string; dome?: string }> = ({ x, y, s = 1, c = '#f2d48a', dome = '#5f9a86' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-90} width={600} height={90} fill={c} stroke={INK} strokeWidth={5} />
    {Array.from({ length: 11 }).map((_, i) => <path key={i} d={`M ${-280 + i * 52} -10 V -60 Q ${-264 + i * 52} -80 ${-248 + i * 52} -60 V -10 Z`} fill="#bfe3f2" stroke={INK} strokeWidth={3} />)}
    <path d="M -310 -90 L 310 -90 L 290 -110 L -290 -110 Z" fill="#c9b08a" stroke={INK} strokeWidth={4} />
    <path d="M -70 -110 Q -70 -200 0 -210 Q 70 -200 70 -110 Z" fill={dome} stroke={INK} strokeWidth={5} />
    <path d="M 0 -210 V -240" stroke={INK} strokeWidth={5} />
  </g>
);

// A royal potato field at dusk; two soldiers stand guard (no weapons), one holds a lantern. An owl blinks.
const RoyalField = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#3e4a7c" bottom="#f0a87a" />
      <Stars n={36} maxY={300} />
      <circle cx={1580} cy={170} r={70} fill="#fff3c4" stroke={INK} strokeWidth={5} />
      <circle cx={1556} cy={156} r={12} fill="#efe0a8" />
      <Hill d="M 0 520 Q 500 400 960 450 T 1920 470 V 1080 H 0 Z" fill="#5f7a4a" />
      <PalaceSilhouette x={560} y={440} s={0.7} c="#e6c27a" />
      <path d="M -20 560 Q 960 520 1940 560 V 1100 H -20 Z" fill="#7a5a3a" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 6 }).map((_, r) => {
        const y = 600 + r * r * 16 + r * 30;
        const s = 0.25 + r * 0.13;
        const n = 12 - r;
        return (
          <g key={r}>
            <path d={`M -20 ${y + 6} Q 960 ${y - 20} 1940 ${y + 6}`} stroke="#5f4428" strokeWidth={6 + r * 2} fill="none" />
            {Array.from({ length: n }).map((_, i) => <PotatoPlant key={i} x={(i + 0.5) * (1920 / n) + (r % 2) * 40} y={y} s={s} phase={i * 11 + r * 7} flowers={r > 1} />)}
          </g>
        );
      })}
      <Person x={760} y={1000} s={1.1} dress="uniform" coat="#2f4a7a" hat="tricorn" hair="wig" skin={SKIN[0]} face="flat" rArm={40}
        hold={<Lantern x={0} y={0} s={1} />} />
      <Person x={1160} y={990} s={1.05} dress="uniform" coat="#2f4a7a" hat="tricorn" hair="brown" skin={SKIN[2]} face={(f % 150) > 100 ? 'open' : 'closed'} phase={40} lArm={4} rArm={4} />
      <Fence x0={-20} x1={420} y={1080} h={110} gap={60} c="#8a6a48" />
      <Fence x0={1500} x1={1940} y={1080} h={110} gap={60} c="#8a6a48" />
      <g transform="translate(1530 960)">
        <ellipse cx={0} cy={-30} rx={38} ry={46} fill="#8a6a48" stroke={INK} strokeWidth={5} />
        <circle cx={-14} cy={-46} r={13} fill="#fff3c4" stroke={INK} strokeWidth={3} />
        <circle cx={14} cy={-46} r={13} fill="#fff3c4" stroke={INK} strokeWidth={3} />
        {(f % 80) < 74 ? <><circle cx={-14} cy={-46} r={5} fill={INK} /><circle cx={14} cy={-46} r={5} fill={INK} /></> : <path d="M -24 -46 h 20 M 4 -46 h 20" stroke={INK} strokeWidth={4} />}
        <path d="M -6 -34 l 6 8 l 6 -8 Z" fill={C.mustard} stroke={INK} strokeWidth={2} />
        <path d="M -30 -76 l 6 -14 l 10 10 M 30 -76 l -6 -14 l -10 10" fill="#8a6a48" stroke={INK} strokeWidth={4} />
      </g>
      <Fireflies n={16} y0={620} y1={1000} />
    </Svg>
  );
};

// Sanssouci today: the terraced palace above, a plain stone slab with real potatoes on it, visitors.
const PotsdamTomb = () => {
  const f = useCurrentFrame();
  const place = interpolate(f, [0, 40, 70], [110, 40, 110], clamp);
  return (
    <Svg>
      <Sky top="#8fc9ea" bottom="#eef8fb" />
      <Clouds y={70} />
      <Birds y={110} n={3} />
      <PalaceSilhouette x={960} y={250} s={1.1} />
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 250 + i * 64, w = 760 + i * 120;
        return (
          <g key={i}>
            <rect x={960 - w / 2} y={y} width={w} height={64} fill="#b6c98a" stroke={INK} strokeWidth={5} />
            {Array.from({ length: Math.floor(w / 70) }).map((__, j) => <path key={j} d={`M ${960 - w / 2 + 20 + j * 70} ${y + 58} v -30 q 14 -18 28 0 v 30 Z`} fill="#4f6b5a" stroke={INK} strokeWidth={3} />)}
          </g>
        );
      })}
      <path d="M 920 250 L 1000 250 L 1060 570 L 860 570 Z" fill="#e8dcc0" stroke={INK} strokeWidth={5} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M ${918 - i * 6} ${282 + i * 30} H ${1002 + i * 6}`} stroke={INK} strokeWidth={3} opacity={0.5} />)}
      <rect x={-20} y={570} width={1960} height={530} fill="#8fbf6a" stroke={INK} strokeWidth={SW} />
      <path d="M 600 1080 Q 760 760 900 700 L 1020 700 Q 1160 760 1320 1080 Z" fill="#e8dcc0" stroke={INK} strokeWidth={SW} />
      {[260, 520, 1400, 1660].map((x, i) => (
        <g key={x}>
          <rect x={x - 34} y={690} width={68} height={60} fill="#c46a3a" stroke={INK} strokeWidth={5} />
          <Tree x={x} y={700} s={0.55} round c="#4f7a3a" phase={i * 20} />
        </g>
      ))}
      {/* the slab */}
      <path d="M 730 820 L 1190 820 L 1240 930 L 680 930 Z" fill="#a9a59c" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M 680 930 L 1240 930 L 1240 956 L 680 956 Z" fill="#8a867e" stroke={INK} strokeWidth={5} />
      {[[790, 880, 10], [860, 860, -20], [930, 900, 30], [1000, 870, 0], [1070, 905, -12], [1130, 860, 18], [960, 845, 5]].map(([x, y, r], i) => <Potato key={i} x={x} y={y} s={0.9} r={r} c={i % 2 ? '#b98a4f' : '#a87a42'} />)}
      <Person x={430} y={1010} s={0.95} dress="modern" coat="#3d8a8a" hair="dark" skin={SKIN[3]} face="smile" lArm={30} phase={10}
        holdL={<rect x={-12} y={-30} width={24} height={40} rx={4} fill="#2b2b2b" stroke={INK} strokeWidth={3} />} />
      <Person x={1380} y={1000} s={0.95} dress="modern" coat={C.tomato} hair="blond" skin={SKIN[0]} face="smile" rArm={place} phase={50}
        hold={place < 100 ? <Potato x={0} y={10} s={0.7} /> : undefined} />
      <Person x={1560} y={1020} s={0.7} dress="modern" coat={C.mustard} hair="brown" skin={SKIN[1]} face="open" phase={80} lArm={140} wave="l" />
      <Butterfly x={1150} y={720} c="#f2b33d" />
    </Svg>
  );
};

// 1750s prisoner camp, calm: tents and a low fence; men eat potato mash from a big cook pot.
const PrisonerCamp = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#9fc4dc" bottom="#eef4f6" />
      <Clouds y={100} color="#f7f7f7" />
      <Birds y={150} n={3} />
      <Hill d="M 0 520 Q 600 420 1100 480 T 1920 450 V 1080 H 0 Z" fill="#9cb87a" />
      {[[120, 560, 1], [420, 540, 0.9], [1440, 550, 0.9], [1720, 570, 1], [700, 500, 0.7], [1220, 500, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M -150 120 L 0 -80 L 150 120 Z" fill="#f2ead8" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <path d={`M 0 -80 L ${-30 + Math.sin((f + i * 20) / 10) * 6} 120 L 30 120 Z`} fill="#d9cfb8" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <line x1={0} y1={-80} x2={0} y2={-110} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <line x1={960} y1={480} x2={960} y2={250} stroke={INK} strokeWidth={8} />
      <Pennant x={960} y={250} color={C.mustard} len={110} />
      <path d="M -20 700 Q 960 660 1940 700 V 1100 H -20 Z" fill="#b7a77e" stroke={INK} strokeWidth={SW} />
      <Fence x0={-20} x1={600} y={720} h={90} gap={46} c="#a0714a" />
      <Fence x0={1320} x1={1940} y={720} h={90} gap={46} c="#a0714a" />
      {/* cook pot */}
      <path d="M 840 900 L 960 660 L 1080 900" stroke="#5b3b26" strokeWidth={12} fill="none" />
      <Fire x={960} y={930} s={0.7} />
      <g transform="translate(960 820)">
        <path d="M -120 -40 Q -130 70 0 80 Q 130 70 120 -40 Z" fill="#3b3b3b" stroke={INK} strokeWidth={SW} />
        <ellipse cx={0} cy={-40} rx={122} ry={26} fill="#efe0b0" stroke={INK} strokeWidth={SW} />
        {[-60, -10, 40, 80].map((x, i) => <circle key={x} cx={x} cy={-42 + (i % 2) * 6} r={10 + Math.abs(Math.sin((f + i * 9) / 8)) * 4} fill="#f6ecc8" stroke={INK} strokeWidth={2} />)}
      </g>
      <Steam x={960} y={760} scale={0.8} />
      <Person x={1160} y={1000} s={1} dress="coat" coat="#7a6a5a" vest="#c9b08a" hair="brown" skin={SKIN[1]} face="smile" rArm={-10} lArm={120} wave="l"
        holdL={<path d="M 0 0 L 140 -60" stroke="#a0714a" strokeWidth={10} strokeLinecap="round" />} />
      <Person x={720} y={1010} s={0.95} dress="coat" coat="#4a6fa5" vest="#e8dcc0" hair="dark" skin={SKIN[0]} face="smile" rArm={60} lArm={60} phase={20}
        hold={<path d="M -60 -10 Q -30 30 0 -10 Z" fill="#c46a3a" stroke={INK} strokeWidth={4} />} />
      <Person x={430} y={1030} s={0.9} dress="coat" coat="#6b7a3a" vest="#e8dcc0" hair="blond" skin={SKIN[0]} face="doubt" rArm={70} phase={50} wave="r"
        hold={<path d="M -20 -10 Q 10 30 40 -10 Z" fill="#c46a3a" stroke={INK} strokeWidth={4} />} />
      <Person x={1520} y={1020} s={0.9} dress="coat" coat="#5b4a3a" vest="#c9b08a" hat="tricorn" hair="wig" skin={SKIN[2]} face="flat" lArm={4} rArm={4} phase={80} />
    </Svg>
  );
};

// Academy of Besancon: judges at a raised bench read essays for the prize; a medal waits on a cushion.
const BesanconAcademy = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Hall wall="#e6d3b3" trim="#b99a6a" floorA="#a68a62" floorB="#94784f" />
      {[160, 1560].map((x) => (
        <g key={x}>
          <path d={`M ${x - 30} 230 Q ${x + 20 + Math.sin(f / 25) * 6} 440 ${x - 10} 660 L ${x - 40} 660 L ${x - 40} 230 Z`} fill="#8c2f2a" stroke={INK} strokeWidth={5} />
          <path d={`M ${x + 230} 230 Q ${x + 180 + Math.sin(f / 25) * 6} 440 ${x + 210} 660 L ${x + 240} 660 L ${x + 240} 230 Z`} fill="#8c2f2a" stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <Chandelier x={960} y={130} s={0.8} />
      {[640, 860, 1080, 1300].map((x, i) => (
        <Person key={x} x={x} y={650} s={0.95} dress="robe" coat={i % 2 ? '#7a2e2a' : '#23201f'} hair="wig" skin={SKIN[(i + 1) % 4]} sit phase={i * 30}
          face={i === 1 ? 'open' : i === 2 ? 'doubt' : 'smile'} rArm={i === 1 ? 140 : 30} wave={i === 1 ? 'r' : undefined} hold={i === 1 ? <Paper x={0} y={20} r={-10} w={64} h={84} /> : undefined} />
      ))}
      <rect x={460} y={540} width={1000} height={50} rx={6} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={480} y={590} width={960} height={170} fill="#7a2e2a" stroke={INK} strokeWidth={SW} />
      <path d="M 500 610 H 1420 V 740 H 500 Z" fill="none" stroke={C.mustard} strokeWidth={6} />
      {[560, 760, 1000, 1220, 1380].map((x, i) => (
        <g key={x}>{[0, 1, 2].map((j) => <rect key={j} x={x - 40 + j * 3} y={528 - j * 12} width={80} height={12} fill="#f6ecd2" stroke={INK} strokeWidth={3} />)}{i === 2 && <Candle x={x + 70} y={540} s={0.6} />}</g>
      ))}
      <g transform="translate(960 900)">
        <rect x={-130} y={-30} width={260} height={140} fill="#6b4428" stroke={INK} strokeWidth={SW} />
        <ellipse cx={0} cy={-40} rx={110} ry={30} fill="#8c2f2a" stroke={INK} strokeWidth={5} />
        <path d="M -20 -110 L -10 -60 M 20 -110 L 10 -60" stroke={C.tomato} strokeWidth={14} />
        <circle cx={0} cy={-56} r={30 + Math.sin(f / 10) * 1} fill={C.mustard} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-56} r={18} fill="none" stroke={INK} strokeWidth={3} />
        <path d={`M ${-14 + (f % 60)} -70 l 4 4`} stroke="#ffffff" strokeWidth={4} opacity={(f % 60) < 28 ? 1 : 0} />
      </g>
    </Svg>
  );
};

// The Sablons field outside Paris at dusk: sandy rows of potatoes, a guard with a lantern, a curious villager.
const SablonsField = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#5a5a92" bottom="#f7b267" />
      <Stars n={22} maxY={220} />
      <circle cx={1450} cy={560} r={120} fill="#ffcf6b" stroke={INK} strokeWidth={5} />
      <Birds y={230} n={4} color="#3b2b40" speed={1.6} />
      <g fill="#6a4f7a" stroke={INK} strokeWidth={5} strokeLinejoin="round">
        <path d="M -20 600 V 540 H 120 V 510 H 220 V 550 H 340 V 470 L 380 440 L 420 470 V 550 H 560 V 520 H 680 V 600 Z" />
        <path d="M 1000 600 V 520 H 1080 V 430 H 1150 V 520 H 1190 V 430 H 1260 V 520 H 1340 V 550 H 1520 V 500 Q 1580 420 1640 500 V 540 H 1940 V 600 Z" />
      </g>
      <path d="M -20 590 Q 960 560 1940 590 V 1100 H -20 Z" fill="#e8cf98" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M ${(i * 233) % 1900} ${640 + (i % 5) * 80} q 40 -10 80 0`} stroke="#c9ad74" strokeWidth={5} fill="none" />)}
      {Array.from({ length: 4 }).map((_, r) => {
        const y = 660 + r * 110, s = 0.38 + r * 0.14, n = 11 - r * 2;
        return <g key={r}>{Array.from({ length: n }).map((__, i) => <PotatoPlant key={i} x={(i + 0.5) * (1920 / n)} y={y} s={s} phase={i * 13 + r * 5} />)}</g>;
      })}
      <g transform="translate(1190 900)">
        <rect x={-60} y={-230} width={120} height={230} fill="#8a6a48" stroke={INK} strokeWidth={SW} />
        <path d="M -76 -226 L 0 -290 L 76 -226 Z" fill="#6b4428" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <rect x={-36} y={-190} width={72} height={190} fill="#3b2b20" />
      </g>
      <Person x={980} y={1000} s={1.08} dress="uniform" coat="#3d5a80" hat="tricorn" hair="wig" skin={SKIN[1]} face="flat" rArm={50} hold={<Lantern x={0} y={0} />} />
      <g transform={`translate(${520 + Math.sin(f / 20) * 10} 0)`}>
        <Person x={0} y={980} s={0.85} dress="shirt" vest="#7a3b2e" hat="cap" hatColor="#3d5a80" skin={SKIN[2]} face="open" lArm={60} rArm={150} wave="r" phase={20}
          holdL={<path d="M -40 -10 Q 0 40 40 -10 Z" fill="#c99a63" stroke={INK} strokeWidth={4} />} />
      </g>
      <g transform="translate(400 1000)">
        <ellipse cx={0} cy={-50} rx={150} ry={80} fill="#5f7a4a" stroke={INK} strokeWidth={SW} />
        <ellipse cx={110} cy={-40} rx={90} ry={60} fill="#6b8a52" stroke={INK} strokeWidth={SW} />
      </g>
      <Fireflies n={10} y0={680} y1={980} />
    </Svg>
  );
};

// Versailles: a gilded hall of mirrors; a nobleman pins a small white-purple potato flower to his coat.
const VersaillesHall = () => {
  const f = useCurrentFrame();
  const arm = interpolate(f, [0, 18, 44], [70, 70, -34], clamp);
  const pinned = f >= 44;
  const pop = interpolate(f, [44, 50, 54], [0, 1.4, 1], clamp);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#f3e3b8" />
      <path d="M -20 0 H 1940 V 120 Q 960 200 -20 120 Z" fill="#e8c56a" stroke={INK} strokeWidth={SW} />
      <path d="M 200 60 Q 960 150 1720 60" stroke="#c99a3a" strokeWidth={8} fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 40 + i * 320;
        return (
          <g key={i}>
            <defs>
              <clipPath id={`mir${i}`}><path d={`M ${x} 720 V 300 Q ${x + 110} 190 ${x + 220} 300 V 720 Z`} /></clipPath>
            </defs>
            <path d={`M ${x} 720 V 300 Q ${x + 110} 190 ${x + 220} 300 V 720 Z`} fill="#c9dbe6" stroke={INK} strokeWidth={SW} />
            <g clipPath={`url(#mir${i})`}>
              <path d={`M ${x - 200 + ((f * 4 + i * 90) % 700)} 200 l 60 0 l -200 540 l -60 0 Z`} fill="#ffffff" opacity={0.55} />
              {Array.from({ length: 4 }).map((_, r) => <line key={r} x1={x} y1={330 + r * 100} x2={x + 220} y2={330 + r * 100} stroke="#a9bcc8" strokeWidth={4} />)}
            </g>
            <rect x={x + 238} y={180} width={64} height={540} fill="#e8c56a" stroke={INK} strokeWidth={5} />
            <circle cx={x + 270} cy={250} r={16} fill="#c99a3a" stroke={INK} strokeWidth={4} />
          </g>
        );
      })}
      {[480, 1440].map((x, i) => (
        <g key={x}>
          <Chandelier x={x} y={190} s={0.9} />
          {[0, 1, 2].map((j) => {
            const t = ((f + j * 20 + i * 10) % 60) / 60;
            return <path key={j} d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" transform={`translate(${x - 80 + j * 80} ${170 + j * 20}) scale(${Math.sin(t * Math.PI) * 1.4})`} fill="#ffffff" stroke={INK} strokeWidth={1.5} />;
          })}
        </g>
      ))}
      <rect x={-20} y={720} width={1960} height={380} fill="#b07a46" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M ${i * 140 - 300} 1080 L ${i * 140 - 60} 720 M ${i * 140 + 200} 1080 L ${i * 140 - 40} 720`} stroke="#8f5f34" strokeWidth={5} />)}
      <Person x={240} y={900} s={0.75} dress="dress" skirt="#c46a8a" vest="#f2d0dc" apron={false} hair="wig" skin={SKIN[0]} face="smile" phase={30} />
      <Person x={1680} y={900} s={0.75} dress="coat" coat="#7a3b6e" vest="#f2d48a" hair="wig" skin={SKIN[1]} face="open" phase={70} lArm={40} wave="l" />
      <Person x={700} y={1000} s={1.05} dress="coat" coat="#7a5a3a" vest="#e2c48e" hair="wig" skin={SKIN[1]} face="smile" rArm={60} hold={<Bouquet />} phase={20} />
      <Person x={1020} y={1010} s={1.15} dress="coat" coat="#2e4f9a" vest={C.mustard} hair="wig" skin={SKIN[0]} face={pinned ? 'smile' : 'open'} lArm={arm}
        holdL={!pinned ? <Flower x={0} y={-6} s={1} /> : undefined} />
      {pinned && <g transform={`translate(${1020 + 26 * 1.15} ${1010 - 206 * 1.15}) scale(${pop})`}><Flower x={0} y={0} s={1.3} /></g>}
      <Person x={1300} y={1000} s={1} dress="dress" skirt="#8fb7d9" vest="#f2e6f0" apron={false} hair="wig" skin={SKIN[0]} face="smile" phase={50}
        lArm={14} />
      <g transform="translate(1300 715)"><Flower x={-30} y={-6} s={1.1} /><Flower x={-6} y={-22} s={0.9} /></g>
    </Svg>
  );
};

// A European document: parchment on a desk, handwriting appears line by line, then a red wax seal lands.
const handLine = (x: number, y: number, w: number, seed: number) => {
  let d = `M ${x} ${y}`;
  let cx = x;
  let k = seed;
  while (cx < x + w) {
    k = (k * 9301 + 49297) % 233280;
    const r = k / 233280;
    const step = 14 + r * 12;
    if (r > 0.86 && cx > x + 30 && cx < x + w - 60) {
      cx += 26;
      d += ` M ${cx} ${y}`;
      continue;
    }
    const hgt = r > 0.7 ? 28 : r > 0.35 ? 14 : 9;
    d += ` c ${step * 0.2} ${-hgt} ${step * 0.7} ${-hgt} ${step * 0.5} 0 s ${step * 0.3} 6 ${step * 0.5} 0`;
    cx += step;
  }
  return { d, end: cx };
};

const Document = () => {
  const f = useCurrentFrame();
  const lines = 10;
  const seal = interpolate(f, [70, 78], [2.6, 1], { ...clamp, easing: (t) => t * t });
  const shake = f >= 78 && f < 90 ? Math.sin(f * 3) * (90 - f) * 0.8 : 0;
  const cur = Math.min(lines - 1, Math.max(0, Math.floor((f - 4) / 6.4)));
  const lineProg = (i: number) => interpolate(f, [4 + i * 6.4, 4 + i * 6.4 + 10], [0, 1], clamp);
  const ly = (i: number) => 330 + i * 56;
  const lw = (i: number) => (i === lines - 1 ? 300 : 560 - ((i * 53) % 90));
  const qx = 700 + lw(cur) * lineProg(cur);
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#8c6a48" />
      {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M -20 ${i * 96 + 20} Q 960 ${i * 96 + (i % 2 ? 50 : -10)} 1940 ${i * 96 + 30}`} stroke="#7a5a3a" strokeWidth={6} fill="none" />)}
      <Candle x={330} y={640} s={1.3} />
      <g transform="translate(250 900) rotate(-8)">
        <rect x={-120} y={-60} width={260} height={70} rx={6} fill="#3d5a80" stroke={INK} strokeWidth={SW} />
        <rect x={-110} y={-110} width={240} height={50} rx={6} fill="#7a3b2e" stroke={INK} strokeWidth={SW} />
      </g>
      <g transform="translate(1560 820) rotate(18)">
        <rect x={-14} y={-90} width={28} height={110} rx={6} fill="#b8322a" stroke={INK} strokeWidth={5} />
      </g>
      <g transform="rotate(-1.5 960 540)">
        <path d="M 600 120 Q 960 100 1320 120 L 1330 980 Q 960 1000 590 980 Z" fill="#f2e2bb" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M 620 140 Q 960 124 1300 140 L 1308 960 Q 960 976 612 960 Z" fill="none" stroke="#d9c08f" strokeWidth={10} />
        <path d="M 760 230 c 30 -50 60 -50 70 0 s 40 -40 60 0 s 40 -50 70 0 s 40 -40 60 0 s 40 -50 70 0 s 30 -30 60 0" stroke="#3b2a1e" strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M 760 262 H 1160" stroke="#b8322a" strokeWidth={4} />
        {Array.from({ length: lines }).map((_, i) => {
          const { d } = handLine(700, ly(i), lw(i), i * 7919 + 13);
          return <path key={i} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - lineProg(i)} stroke="#3b2a1e" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
        })}
        {f > 70 && (
          <g transform={`translate(${1160 + shake} 880) scale(${seal}) rotate(-12)`} opacity={interpolate(f, [70, 73], [0, 1], clamp)}>
            <path d="M -40 30 L -60 110 L -30 96 L -16 120 L 0 40 Z M 40 30 L 60 110 L 30 96 L 16 120 L 0 40 Z" fill="#b8322a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M 0 -66 Q 40 -70 58 -40 Q 76 -6 60 30 Q 40 66 0 64 Q -44 70 -62 34 Q -76 -4 -58 -40 Q -40 -70 0 -66 Z" fill="#c8372d" stroke={INK} strokeWidth={5} />
            <circle r={40} fill="none" stroke="#8e231c" strokeWidth={5} />
            <path d="M -16 -10 L 0 -26 L 16 -10 L 10 18 H -10 Z" fill="#8e231c" />
          </g>
        )}
      </g>
      {f < 70 && (
        <g transform={`translate(${qx} ${ly(cur) - 6 + Math.sin(f / 1.5) * 3}) rotate(-35)`}>
          <path d="M 0 0 L 6 -30 Q 40 -150 20 -260 Q -40 -150 -6 -30 Z" fill="#f6f0e6" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 0 -20 Q 10 -140 20 -250" stroke={INK} strokeWidth={3} fill="none" />
        </g>
      )}
      {f >= 70 && (
        <g transform="translate(1500 330) rotate(-20)">
          <rect x={-30} y={-10} width={60} height={50} rx={8} fill="#3b3b4a" stroke={INK} strokeWidth={4} />
          <path d="M 0 0 L 6 -30 Q 40 -150 20 -260 Q -40 -150 -6 -30 Z" fill="#f6f0e6" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        </g>
      )}
    </Svg>
  );
};

export const EUROPE_SCENES: Record<string, React.FC> = {
  'kolberg-market': KolbergMarket,
  'kolberg-dog': KolbergDog,
  'andes-field': AndesField,
  'ship-cargo': ShipCargo,
  'botanist-study': BotanistStudy,
  'farmhouse-kitchen': FarmhouseKitchen,
  'village-garden': VillageGarden,
  'village-fields': VillageFields,
  'village-fields-rain': VillageFieldsRain,
  'paris-faculty': ParisFaculty,
  'prussian-office': PrussianOffice,
  'royal-field': RoyalField,
  'potsdam-tomb': PotsdamTomb,
  'prisoner-camp': PrisonerCamp,
  'besancon-academy': BesanconAcademy,
  'sablons-field': SablonsField,
  'versailles-hall': VersaillesHall,
  document: Document,
};

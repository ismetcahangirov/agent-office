import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { Clouds, Cow, Hill, House, INK, Person, Sky, Snow, Steam, SW, Waves } from './parts';

// Topic scenes, drawn as flat SVG in the channel style. Keys are used in episode.json -> "scene".
// Each scene leaves room left or right for KAXO and moves a little (snow, steam, waves, clouds).
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>{children}</svg>
  </AbsoluteFill>
);

const EdoStreetSnow = () => (
  <Svg>
    <Sky top="#9fb4c8" bottom="#dfe7ee" />
    <Hill d="M 0 640 Q 480 560 960 620 T 1920 600 V 1080 H 0 Z" fill="#eef3f7" />
    <House x={120} y={330} sign="山くじら" noren="#2f4858" snow />
    <House x={640} y={360} w={320} noren={C.tomato} snow />
    <House x={1120} y={340} w={340} noren="#6b7a3a" snow />
    <rect x={0} y={760} width={1920} height={320} fill="#ffffff" stroke={INK} strokeWidth={SW} />
    <Person x={1010} y={640} s={0.8} robe="#7a3b2e" />
    <Person x={1580} y={630} s={0.75} robe="#3d5a80" phase={20} />
    <Snow />
  </Svg>
);

const RiceField = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#8fd3f4" bottom="#e6f6fb" />
      <Clouds />
      <Hill d="M 0 520 Q 400 380 900 470 T 1920 430 V 1080 H 0 Z" fill="#7aa95c" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M -20 ${600 + i * 120} Q 960 ${560 + i * 120} 1940 ${600 + i * 120} V ${700 + i * 120} Q 960 ${660 + i * 120} -20 ${700 + i * 120} Z`}
          fill={i % 2 ? '#9cc96b' : '#b6d98a'} stroke={INK} strokeWidth={SW} />
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <path key={i} d={`M ${(i * 53) % 1900} ${640 + (i % 4) * 120} l 0 -26 m 0 0 l -10 -12 m 10 12 l 10 -12`} stroke="#3f6b2a" strokeWidth={5} />
      ))}
      <g transform={`translate(${Math.sin(f / 40) * 20} 0)`}>
        <Cow x={760} y={560} s={1.1} color="#5b4636" />
        <path d="M 600 590 L 470 640" stroke="#7a5230" strokeWidth={12} />
        <Person x={420} y={520} s={0.9} robe="#4a6fa5" />
      </g>
    </Svg>
  );
};

const Temple = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#f7c59f" bottom="#fff1dd" />
      <circle cx={1500} cy={260} r={110} fill="#ffdb8a" stroke={INK} strokeWidth={SW} />
      <Hill d="M 0 720 Q 960 640 1920 720 V 1080 H 0 Z" fill="#c9a36b" />
      <g transform="translate(860 220)">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(0 ${i * 110})`}>
            <path d={`M ${-150 - i * 12} 60 L 0 ${-10} L ${150 + i * 12} 60 Z`} fill="#8c3b2e" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
            <rect x={-90 - i * 8} y={60} width={180 + i * 16} height={50} fill="#d9b382" stroke={INK} strokeWidth={SW} />
          </g>
        ))}
        <line x1={0} y1={-10} x2={0} y2={-110} stroke={INK} strokeWidth={10} />
      </g>
      <g transform="translate(470 760)">
        <rect x={-60} y={0} width={120} height={90} rx={10} fill="#7a6a5a" stroke={INK} strokeWidth={SW} />
        {[0, 1, 2].map((i) => {
          const t = ((f + i * 30) % 90) / 90;
          return <path key={i} d={`M ${-20 + i * 20} 0 q -14 -40 0 -80 t 0 -80`} stroke="#ffffff" strokeWidth={6} fill="none" opacity={(1 - t) * 0.8} transform={`translate(0 ${-t * 40})`} />;
        })}
      </g>
    </Svg>
  );
};

const Shrine = () => (
  <Svg>
    <Sky top="#bfe3c8" bottom="#f2fbf4" />
    <Clouds y={120} />
    <Hill d="M 0 700 Q 960 600 1920 700 V 1080 H 0 Z" fill="#8fbf7a" />
    <path d="M 760 1080 L 900 700 L 1020 700 L 1160 1080 Z" fill="#e8dcc0" stroke={INK} strokeWidth={SW} />
    <g transform="translate(960 300)">
      <path d="M -330 0 Q 0 -50 330 0 L 320 50 Q 0 10 -320 50 Z" fill={C.tomato} stroke={INK} strokeWidth={SW} />
      <rect x={-270} y={95} width={540} height={36} fill={C.tomato} stroke={INK} strokeWidth={SW} />
      <rect x={-240} y={40} width={50} height={480} fill={C.tomato} stroke={INK} strokeWidth={SW} />
      <rect x={190} y={40} width={50} height={480} fill={C.tomato} stroke={INK} strokeWidth={SW} />
      <rect x={-260} y={500} width={90} height={30} fill={INK} /><rect x={170} y={500} width={90} height={30} fill={INK} />
    </g>
  </Svg>
);

const SeaMarket = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#8fd3f4" bottom="#e6f6fb" />
      <Clouds y={110} />
      <Waves y={560} />
      <g transform={`translate(${1300 + Math.sin(f / 30) * 20} ${520 + Math.sin(f / 15) * 8})`}>
        <path d="M -160 0 L 160 0 L 120 60 L -120 60 Z" fill="#a0522d" stroke={INK} strokeWidth={SW} />
        <line x1={0} y1={0} x2={0} y2={-180} stroke={INK} strokeWidth={8} />
        <path d="M 6 -170 L 120 -40 L 6 -40 Z" fill="#f5ead2" stroke={INK} strokeWidth={SW} />
      </g>
      <rect x={0} y={760} width={1920} height={320} fill="#c9a36b" stroke={INK} strokeWidth={SW} />
      <g transform="translate(300 700)">
        <rect x={0} y={60} width={620} height={110} fill="#8c6a48" stroke={INK} strokeWidth={SW} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${70 + i * 120} 50) rotate(${i % 2 ? 8 : -6})`}>
            <path d="M -50 0 Q 0 -30 50 0 Q 0 30 -50 0 Z M 50 0 L 80 -20 L 80 20 Z" fill={i % 2 ? '#9fb7c8' : '#c46a5a'} stroke={INK} strokeWidth={5} />
            <circle cx={-28} cy={-4} r={5} fill={INK} />
          </g>
        ))}
      </g>
    </Svg>
  );
};

const HikoneCastle = () => (
  <Svg>
    <Sky top="#a7c7e7" bottom="#eef6ff" />
    <Clouds y={100} />
    <Hill d="M 0 760 Q 700 420 1300 560 Q 1600 620 1920 600 V 1080 H 0 Z" fill="#7aa95c" />
    <g transform="translate(760 300)">
      <path d="M -240 360 L -200 200 L 200 200 L 240 360 Z" fill="#9a9087" stroke={INK} strokeWidth={SW} />
      <rect x={-170} y={110} width={340} height={90} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -220 120 L 0 50 L 220 120 Z" fill="#4a4e5a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <rect x={-110} y={-10} width={220} height={70} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -160 0 L 0 -70 L 160 0 Z" fill="#4a4e5a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {[-110, -40, 30, 100].map((x) => <rect key={x} x={x} y={140} width={30} height={34} fill={INK} />)}
    </g>
    <rect x={0} y={900} width={1920} height={180} fill="#5b8fb0" stroke={INK} strokeWidth={SW} />
  </Svg>
);

const PalaceGate = () => (
  <Svg>
    <Sky top="#c9d6e3" bottom="#f1f4f8" />
    <rect x={0} y={700} width={1920} height={380} fill="#d8d2c4" stroke={INK} strokeWidth={SW} />
    {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={(i * 97) % 1920} cy={760 + (i % 5) * 60} r={4} fill="#a69f90" />)}
    <rect x={0} y={420} width={1920} height={290} fill="#8a8a86" stroke={INK} strokeWidth={SW} />
    {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={i * 120} y={420} width={120} height={60} fill="none" stroke={INK} strokeWidth={3} opacity={0.4} />)}
    <g transform="translate(960 300)">
      <path d="M -380 120 L 0 0 L 380 120 Z" fill="#3d3a3a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <rect x={-300} y={120} width={600} height={300} fill="#7a3b2e" stroke={INK} strokeWidth={SW} />
      <rect x={-120} y={200} width={240} height={220} fill="#4a2a20" stroke={INK} strokeWidth={SW} />
      <line x1={0} y1={200} x2={0} y2={420} stroke={INK} strokeWidth={4} />
    </g>
    <Snow n={40} />
  </Svg>
);

const GyunabeShop = () => (
  <Svg>
    <rect width={1920} height={1080} fill="#e9c98f" />
    <rect x={0} y={0} width={1920} height={140} fill="#6b4a33" stroke={INK} strokeWidth={SW} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={140 + i * 360} y={170} width={220} height={260} fill="#f5ead2" stroke={INK} strokeWidth={SW} />)}
    <rect x={0} y={700} width={1920} height={380} fill="#b98b52" stroke={INK} strokeWidth={SW} />
    <rect x={560} y={640} width={800} height={90} rx={20} fill="#7a5230" stroke={INK} strokeWidth={SW} />
    <g transform="translate(960 600)">
      <rect x={-130} y={30} width={260} height={50} fill="#3b3b3b" stroke={INK} strokeWidth={SW} />
      <ellipse cx={0} cy={30} rx={170} ry={46} fill="#2b2b2b" stroke={INK} strokeWidth={SW} />
      <ellipse cx={0} cy={26} rx={140} ry={30} fill="#8b3a2a" />
      {[-60, 0, 60].map((x) => <path key={x} d={`M ${x - 30} 22 q 30 -16 60 0`} stroke="#f2b8a0" strokeWidth={10} fill="none" />)}
    </g>
    <Steam x={960} y={590} />
    <Person x={540} y={560} s={1.1} robe="#3d5a80" />
    <Person x={1380} y={560} s={1.1} robe="#7a3b2e" />
  </Svg>
);

const Dejima = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#8fd3f4" bottom="#e6f6fb" />
      <Clouds />
      <rect x={0} y={480} width={1920} height={600} fill="#4fb3d9" />
      <path d="M 520 760 Q 960 560 1400 760 L 1300 880 Q 960 760 620 880 Z" fill="#d8c49a" stroke={INK} strokeWidth={SW} />
      {[640, 800, 960, 1120].map((x) => <House key={x} x={x} y={600} w={130} h={110} noren="#2f4858" />)}
      <path d="M 960 600 L 960 470" stroke={INK} strokeWidth={6} />
      <path d="M 960 470 h 70 v 18 h -70 Z M 960 488 h 70 v 18 h -70 Z M 960 506 h 70 v 18 h -70 Z" fill="none" />
      <rect x={963} y={470} width={70} height={18} fill="#c8102e" /><rect x={963} y={488} width={70} height={18} fill="#ffffff" /><rect x={963} y={506} width={70} height={18} fill="#003da5" />
      <g transform={`translate(${300 + Math.sin(f / 40) * 15} ${640 + Math.sin(f / 18) * 6})`}>
        <path d="M -200 0 L 200 0 L 160 80 L -170 80 Z" fill="#6b3e26" stroke={INK} strokeWidth={SW} />
        {[-90, 30, 130].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={-230} stroke={INK} strokeWidth={8} />)}
        {[-90, 30, 130].map((x) => <rect key={x} x={x - 60} y={-200} width={120} height={140} rx={10} fill="#f5ead2" stroke={INK} strokeWidth={5} />)}
      </g>
    </Svg>
  );
};

const TajimaPasture = () => (
  <Svg>
    <Sky top="#8fd3f4" bottom="#e6f6fb" />
    <Clouds y={120} />
    <Hill d="M 0 560 Q 500 400 1000 520 T 1920 470 V 1080 H 0 Z" fill="#8fbf6a" />
    <Hill d="M 0 760 Q 700 640 1300 720 T 1920 700 V 1080 H 0 Z" fill="#7aa95c" />
    <Cow x={520} y={700} s={1} />
    <Cow x={1050} y={640} s={0.8} flip />
    <Cow x={1450} y={760} s={1.1} />
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={(i * 131) % 1900} cy={880 + (i % 4) * 45} r={6} fill={i % 3 ? '#ffffff' : C.mustard} stroke={INK} strokeWidth={2} />)}
  </Svg>
);

const ModernTokyo = () => (
  <Svg>
    <Sky top="#ffb38a" bottom="#ffe7cf" />
    {Array.from({ length: 14 }).map((_, i) => {
      const h = 200 + ((i * 97) % 380);
      return <rect key={i} x={i * 140} y={700 - h} width={120} height={h} fill={i % 2 ? '#6c7a8c' : '#8a97a8'} stroke={INK} strokeWidth={SW} />;
    })}
    <path d="M 1500 720 L 1560 160 L 1620 720 Z" fill={C.tomato} stroke={INK} strokeWidth={SW} />
    <rect x={0} y={700} width={1920} height={380} fill="#5a4636" stroke={INK} strokeWidth={SW} />
    <g transform="translate(960 840)">
      <ellipse cx={0} cy={30} rx={360} ry={80} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -220 10 Q -200 -70 0 -70 Q 220 -70 230 10 Q 210 60 0 60 Q -210 60 -220 10 Z" fill="#b5523b" stroke={INK} strokeWidth={SW} />
      {[-150, -80, -10, 60, 130].map((x) => <path key={x} d={`M ${x} -50 q 20 40 0 90`} stroke="#f5e6d0" strokeWidth={8} fill="none" opacity={0.9} />)}
    </g>
    <Steam x={960} y={760} scale={0.8} />
  </Svg>
);

export const EPISODE_SCENES: Record<string, React.FC> = {
  'edo-street-snow': EdoStreetSnow,
  'rice-field': RiceField,
  temple: Temple,
  shrine: Shrine,
  'sea-market': SeaMarket,
  'hikone-castle': HikoneCastle,
  'palace-gate': PalaceGate,
  'gyunabe-shop': GyunabeShop,
  dejima: Dejima,
  'tajima-pasture': TajimaPasture,
  'modern-tokyo': ModernTokyo,
};

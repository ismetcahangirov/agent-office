import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { Hill, House, INK, Person, Sky, Snow, Steam, SW } from './parts';

// Story vignettes (owner review 2026-10-31): show the events on screen instead of talking over empty places.
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>{children}</svg>
  </AbsoluteFill>
);

// A court scribe kneeling at a low desk, brush moving over a scroll (decrees, the Nihon Shoki, Hideyoshi's memo).
const CourtScribe = () => {
  const f = useCurrentFrame();
  const brush = Math.sin(f / 5) * 14;
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#d9c09a" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={120 + i * 440} y={80} width={360} height={420} fill="#f5ead2" stroke={INK} strokeWidth={SW} />)}
      {[0, 1, 2, 3].map((i) => <line key={i} x1={300 + i * 440} y1={80} x2={300 + i * 440} y2={500} stroke={INK} strokeWidth={4} />)}
      <rect x={0} y={560} width={1920} height={520} fill="#b98b52" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={i * 260} y1={560} x2={i * 260 - 160} y2={1080} stroke={INK} strokeWidth={3} opacity={0.3} />)}
      <rect x={560} y={640} width={720} height={70} rx={10} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={600} y={710} width={30} height={120} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={1210} y={710} width={30} height={120} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={720} y={590} width={420} height={60} fill="#f4e6c4" stroke={INK} strokeWidth={5} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={1100 - i * 60} y1={600} x2={1100 - i * 60} y2={600 + ((f / 3 + i * 7) % 40)} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      ))}
      <g transform="translate(560 420)">
        <path d="M -90 120 Q -100 260 -120 330 L 120 330 Q 100 260 90 120 Q 0 90 -90 120 Z" fill="#4a6fa5" stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={60} r={62} fill="#e9b98f" stroke={INK} strokeWidth={SW} />
        <rect x={-34} y={-30} width={68} height={50} rx={10} fill={INK} />
        <circle cx={-20} cy={66} r={6} fill={INK} />
        <circle cx={20} cy={66} r={6} fill={INK} />
        <path d={`M 80 170 L ${230 + brush} 210`} stroke="#e9b98f" strokeWidth={26} strokeLinecap="round" />
        <path d={`M ${230 + brush} 210 l 30 -70`} stroke="#3b2b20" strokeWidth={8} strokeLinecap="round" />
      </g>
    </Svg>
  );
};

// A wild-meat shop (momonjiya) in Edo snow: "mountain whale" sign, a steaming pot, customers, a boar outside.
const BoarShop = () => (
  <Svg>
    <Sky top="#9fb4c8" bottom="#dfe7ee" />
    <rect x={0} y={760} width={1920} height={320} fill="#ffffff" stroke={INK} strokeWidth={SW} />
    <House x={360} y={250} w={760} h={460} sign="山くじら" noren="#2f4858" snow />
    <g transform="translate(740 650)">
      <ellipse cx={0} cy={40} rx={190} ry={50} fill="#2b2b2b" stroke={INK} strokeWidth={SW} />
      <ellipse cx={0} cy={34} rx={160} ry={32} fill="#8b3a2a" />
    </g>
    <Steam x={740} y={650} />
    <Person x={470} y={640} s={0.95} robe="#7a3b2e" />
    <Person x={1010} y={640} s={0.95} robe="#6b7a3a" phase={30} />
    <g transform="translate(1500 640)">
      <ellipse cx={0} cy={60} rx={130} ry={80} fill="#8a5a3c" stroke={INK} strokeWidth={SW} />
      <ellipse cx={-120} cy={40} rx={60} ry={46} fill="#8a5a3c" stroke={INK} strokeWidth={SW} />
      <ellipse cx={-168} cy={52} rx={22} ry={18} fill="#d9a48f" stroke={INK} strokeWidth={4} />
      <path d="M -140 70 l -20 18" stroke="#f5ead2" strokeWidth={8} strokeLinecap="round" />
      <circle cx={-128} cy={28} r={7} fill={INK} />
      {[-80, -20, 50, 100].map((x) => <rect key={x} x={x} y={120} width={22} height={50} fill="#8a5a3c" stroke={INK} strokeWidth={5} />)}
    </g>
    <Snow n={50} />
  </Svg>
);

// A lord at his writing desk with a gift box of miso beef (Nariaki's 1848 thank-you letter).
const LordLetter = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <rect width={1920} height={1080} fill="#e9d2a6" />
      <rect x={0} y={0} width={1920} height={110} fill="#6b4a33" stroke={INK} strokeWidth={SW} />
      <rect x={1180} y={170} width={560} height={360} fill="#f5ead2" stroke={INK} strokeWidth={SW} />
      <circle cx={1460} cy={350} r={90} fill={C.tomato} opacity={0.85} />
      <path d="M 1240 470 Q 1400 360 1680 470" stroke="#6b7a3a" strokeWidth={14} fill="none" />
      <rect x={0} y={640} width={1920} height={440} fill="#c9a36b" stroke={INK} strokeWidth={SW} />
      <rect x={420} y={640} width={860} height={60} rx={10} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
      <rect x={560} y={600} width={420} height={50} fill="#ffffff" stroke={INK} strokeWidth={5} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={940 - i * 50} y1={608} x2={940 - i * 50} y2={608 + Math.min(34, (f / 2 + i * 10) % 50)} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      ))}
      <g transform="translate(1120 540)">
        <rect x={-90} y={0} width={180} height={110} rx={8} fill="#7a3b2e" stroke={INK} strokeWidth={SW} />
        <path d="M -90 50 H 90 M 0 0 V 110" stroke={C.mustard} strokeWidth={14} />
        <path d="M -20 -10 q 20 -30 40 0" stroke={C.mustard} strokeWidth={10} fill="none" />
      </g>
      <g transform="translate(330 380)">
        <path d="M -120 140 Q -140 300 -160 380 L 160 380 Q 140 300 120 140 Q 0 100 -120 140 Z" fill="#2f4858" stroke={INK} strokeWidth={SW} />
        <path d="M -120 150 L -200 170 L -190 230 L -110 210 Z M 120 150 L 200 170 L 190 230 L 110 210 Z" fill="#2f4858" stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={70} r={66} fill="#e9b98f" stroke={INK} strokeWidth={SW} />
        <rect x={-30} y={-26} width={60} height={46} rx={10} fill={INK} />
        <circle cx={-20} cy={74} r={6} fill={INK} />
        <circle cx={20} cy={74} r={6} fill={INK} />
        <path d="M -14 100 q 14 8 28 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </Svg>
  );
};

// Ten ascetics in white walking through snow toward the palace wall, seen from far away. Calm, no conflict shown.
const AsceticsSnow = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#c9d6e3" bottom="#f1f4f8" />
      <rect x={0} y={380} width={1920} height={200} fill="#8a8a86" stroke={INK} strokeWidth={SW} />
      <path d="M 820 380 L 960 300 L 1100 380 Z" fill="#3d3a3a" stroke={INK} strokeWidth={SW} />
      <rect x={880} y={380} width={160} height={200} fill="#7a3b2e" stroke={INK} strokeWidth={SW} />
      <rect x={0} y={580} width={1920} height={500} fill="#eef3f7" stroke={INK} strokeWidth={SW} />
      {Array.from({ length: 10 }).map((_, i) => {
        const x = 300 + (i % 5) * 120 + Math.floor(i / 5) * 60 + f * 0.6;
        const y = 760 + Math.floor(i / 5) * 90;
        return (
          <g key={i} transform={`translate(${x} ${y + Math.sin((f + i * 9) / 8) * 3}) scale(0.55)`}>
            <path d="M -50 40 Q -56 170 -66 230 L 66 230 Q 56 170 50 40 Q 0 10 -50 40 Z" fill="#ffffff" stroke={INK} strokeWidth={8} />
            <circle cx={0} cy={0} r={40} fill="#e9b98f" stroke={INK} strokeWidth={8} />
            <path d="M -42 -6 Q 0 -60 42 -6 Z" fill="#ffffff" stroke={INK} strokeWidth={6} />
          </g>
        );
      })}
      <Snow n={60} />
    </Svg>
  );
};

// The Meiji court tries beef: a western-style table with a plate of beef, cutlery and an empty chair before a gold screen.
const MeijiTable = () => (
  <Svg>
    <rect width={1920} height={1080} fill="#7a3b2e" />
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={260 + i * 233} y={120} width={233} height={480} fill={i % 2 ? '#f2c14e' : C.mustard} stroke={INK} strokeWidth={SW} />)}
    <g transform="translate(960 240)">
      {Array.from({ length: 16 }).map((_, i) => <ellipse key={i} cx={0} cy={-40} rx={14} ry={46} fill="#f5ead2" stroke={INK} strokeWidth={3} transform={`rotate(${i * 22.5})`} />)}
      <circle r={30} fill={C.mustard} stroke={INK} strokeWidth={4} />
    </g>
    <rect x={0} y={640} width={1920} height={440} fill="#5b3b26" stroke={INK} strokeWidth={SW} />
    <g transform="translate(960 520)">
      <rect x={-130} y={-260} width={260} height={290} rx={30} fill="#3b2b20" stroke={INK} strokeWidth={SW} />
    </g>
    <rect x={480} y={600} width={960} height={70} rx={10} fill="#ffffff" stroke={INK} strokeWidth={SW} />
    <rect x={540} y={670} width={30} height={260} fill="#3b2b20" />
    <rect x={1350} y={670} width={30} height={260} fill="#3b2b20" />
    <g transform="translate(960 600)">
      <ellipse cx={0} cy={0} rx={190} ry={42} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -110 -6 Q -100 -50 0 -50 Q 110 -50 120 -6 Q 100 22 0 22 Q -100 22 -110 -6 Z" fill="#9b4a35" stroke={INK} strokeWidth={5} />
      <path d="M 230 -60 v 80 M 220 -60 v 30 M 240 -60 v 30" stroke="#c0c0c0" strokeWidth={8} strokeLinecap="round" />
      <path d="M -230 -60 v 80" stroke="#c0c0c0" strokeWidth={10} strokeLinecap="round" />
    </g>
    <Steam x={960} y={570} scale={0.7} />
  </Svg>
);

// A modern home kitchen table: fish and meat side by side (home meat passed fresh fish only in 2007).
const KitchenHome = () => (
  <Svg>
    <rect width={1920} height={1080} fill="#f6ead5" />
    <rect x={1320} y={120} width={420} height={320} fill="#bfe3f2" stroke={INK} strokeWidth={SW} />
    <line x1={1530} y1={120} x2={1530} y2={440} stroke={INK} strokeWidth={5} />
    <rect x={120} y={140} width={520} height={60} fill="#c9a36b" stroke={INK} strokeWidth={SW} />
    <rect x={0} y={620} width={1920} height={460} fill="#c9a36b" stroke={INK} strokeWidth={SW} />
    <g transform="translate(700 640)">
      <ellipse cx={0} cy={0} rx={200} ry={50} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -120 -6 Q -40 -60 80 -10 L 140 -40 L 140 30 L 80 4 Q -40 50 -120 -6 Z" fill="#9fb7c8" stroke={INK} strokeWidth={5} />
      <circle cx={-80} cy={-10} r={8} fill={INK} />
    </g>
    <g transform="translate(1220 640)">
      <ellipse cx={0} cy={0} rx={200} ry={50} fill="#ffffff" stroke={INK} strokeWidth={SW} />
      <path d="M -120 -6 Q -100 -54 0 -54 Q 110 -54 120 -6 Q 100 24 0 24 Q -100 24 -120 -6 Z" fill="#b5523b" stroke={INK} strokeWidth={5} />
    </g>
    <Steam x={1220} y={610} scale={0.6} />
    <g transform="translate(960 560)">
      <rect x={-40} y={-80} width={80} height={90} rx={12} fill="#ffffff" stroke={INK} strokeWidth={5} />
      <ellipse cx={0} cy={-80} rx={40} ry={10} fill="#f5ead2" stroke={INK} strokeWidth={4} />
    </g>
  </Svg>
);

// A forest edge with a deer and a wild boar: the meats that were NOT on the 675 list. Friendly and alive.
const ForestWild = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky top="#a7d8b8" bottom="#eef8f0" />
      <Hill d="M 0 620 Q 500 520 1000 600 T 1920 580 V 1080 H 0 Z" fill="#7aa95c" />
      {[120, 380, 1500, 1760].map((x, i) => (
        <g key={x} transform={`translate(${x} ${560 - (i % 2) * 40})`}>
          <rect x={-20} y={0} width={40} height={180} fill="#7a5230" stroke={INK} strokeWidth={SW} />
          <path d="M -130 20 L 0 -260 L 130 20 Z" fill="#3f6b2a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        </g>
      ))}
      <g transform={`translate(720 ${700 + Math.sin(f / 10) * 4})`}>
        <ellipse cx={0} cy={0} rx={130} ry={60} fill="#b07a4a" stroke={INK} strokeWidth={SW} />
        {[-80, -30, 40, 90].map((x) => <rect key={x} x={x} y={40} width={18} height={110} fill="#b07a4a" stroke={INK} strokeWidth={5} />)}
        <path d="M 110 -30 L 150 -120" stroke={INK} strokeWidth={SW} />
        <ellipse cx={170} cy={-130} rx={44} ry={34} fill="#b07a4a" stroke={INK} strokeWidth={SW} />
        <path d="M 160 -160 l -20 -60 m 20 60 l 30 -50 M 186 -160 l 30 -40" stroke="#6b4a33" strokeWidth={8} strokeLinecap="round" />
        <circle cx={180} cy={-136} r={6} fill={INK} />
        {[-60, 0, 60].map((x) => <circle key={x} cx={x} cy={-14} r={8} fill="#f5ead2" />)}
      </g>
      <g transform={`translate(1220 ${780 + Math.sin(f / 7) * 3})`}>
        <ellipse cx={0} cy={0} rx={130} ry={74} fill="#5a4636" stroke={INK} strokeWidth={SW} />
        <ellipse cx={-120} cy={-10} rx={60} ry={46} fill="#5a4636" stroke={INK} strokeWidth={SW} />
        <ellipse cx={-168} cy={2} rx={22} ry={18} fill="#d9a48f" stroke={INK} strokeWidth={4} />
        <path d="M -150 18 l -16 16" stroke="#f5ead2" strokeWidth={8} strokeLinecap="round" />
        <circle cx={-128} cy={-22} r={7} fill={INK} />
        {[-80, -20, 50, 100].map((x) => <rect key={x} x={x} y={50} width={22} height={50} fill="#5a4636" stroke={INK} strokeWidth={5} />)}
      </g>
    </Svg>
  );
};

export const STORY_SCENES: Record<string, React.FC> = {
  'court-scribe': CourtScribe,
  'boar-shop': BoarShop,
  'lord-letter': LordLetter,
  'ascetics-snow': AsceticsSnow,
  'meiji-table': MeijiTable,
  'kitchen-home': KitchenHome,
  'forest-wild': ForestWild,
};

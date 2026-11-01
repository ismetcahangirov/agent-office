import { useCurrentFrame } from 'remotion';
import { C } from '../theme';

// Shared flat-cartoon building blocks for scenes: thick ink outline, flat fills (RULES §5.0).
export const INK = C.ink;
export const SW = 6; // outline width

export const Sky: React.FC<{ top: string; bottom: string }> = ({ top, bottom }) => (
  <>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#sky)" />
  </>
);

export const Clouds: React.FC<{ y?: number; color?: string }> = ({ y = 140, color = '#ffffff' }) => {
  const f = useCurrentFrame();
  return (
    <g opacity={0.9}>
      {[0, 1, 2].map((i) => {
        const x = ((i * 700 + f * 0.5) % 2300) - 300;
        return (
          <g key={i} transform={`translate(${x} ${y + i * 60})`}>
            <ellipse cx={0} cy={0} rx={120} ry={46} fill={color} />
            <ellipse cx={80} cy={-24} rx={90} ry={50} fill={color} />
            <ellipse cx={160} cy={4} rx={100} ry={40} fill={color} />
          </g>
        );
      })}
    </g>
  );
};

export const Snow: React.FC<{ n?: number }> = ({ n = 70 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = (i * 271) % 1920 + Math.sin((f + i * 20) / 30) * 20;
        const y = ((i * 137 + f * (1.2 + (i % 5) * 0.3)) % 1140) - 40;
        return <circle key={i} cx={x} cy={y} r={3 + (i % 4)} fill="#ffffff" opacity={0.9} />;
      })}
    </g>
  );
};

export const Steam: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.75}>
      {[0, 1, 2].map((i) => {
        const t = ((f + i * 25) % 75) / 75;
        return (
          <path key={i} d={`M ${-40 + i * 40} 0 q -18 -40 0 -80 t 0 -80`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round"
            transform={`translate(0 ${-t * 60})`} opacity={1 - t} />
        );
      })}
    </g>
  );
};

export const Waves: React.FC<{ y: number; color?: string; dark?: string }> = ({ y, color = '#4fb3d9', dark = '#2f8fb8' }) => {
  const f = useCurrentFrame();
  const off = (f * 2) % 120;
  const wave = (yy: number, c: string, o: number) => {
    let d = `M ${-120 - o} ${yy}`;
    for (let x = -120; x < 2100; x += 120) d += ` q 30 -24 60 0 t 60 0`;
    return <path d={`${d} V 1080 H -240 Z`} fill={c} stroke={INK} strokeWidth={SW} />;
  };
  return (
    <g>
      {wave(y, color, off)}
      {wave(y + 70, dark, (off + 60) % 120)}
    </g>
  );
};

// A simple wooden Edo-style house front; `sign` draws a vertical shop sign with real type.
export const House: React.FC<{ x: number; y: number; w?: number; h?: number; sign?: string; noren?: string; roof?: string; snow?: boolean }> = ({ x, y, w = 360, h = 300, sign, noren = C.tomato, roof = '#5a4636', snow }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={60} width={w} height={h} fill="#c99a63" stroke={INK} strokeWidth={SW} />
    {[1, 2, 3].map((i) => <line key={i} x1={(w / 4) * i} y1={60} x2={(w / 4) * i} y2={60 + h} stroke={INK} strokeWidth={3} opacity={0.4} />)}
    <path d={`M -40 70 L ${w / 2} -10 L ${w + 40} 70 Z`} fill={roof} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    {snow && <path d={`M -30 64 L ${w / 2} -4 L ${w + 30} 64 Q ${w * 0.75} 40 ${w / 2} 44 Q ${w * 0.25} 40 -30 64 Z`} fill="#ffffff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />}
    <rect x={w * 0.15} y={130} width={w * 0.7} height={70} fill={noren} stroke={INK} strokeWidth={SW} />
    {[1, 2].map((i) => <line key={i} x1={w * 0.15 + (w * 0.7 / 3) * i} y1={150} x2={w * 0.15 + (w * 0.7 / 3) * i} y2={200} stroke={INK} strokeWidth={4} />)}
    <rect x={w * 0.3} y={210} width={w * 0.4} height={h - 150} fill="#3b2b20" stroke={INK} strokeWidth={SW} />
    {sign && (
      <g transform={`translate(${w + 10} 90)`}>
        <rect x={0} y={0} width={70} height={230} fill="#f5ead2" stroke={INK} strokeWidth={SW} />
        <text x={35} y={60} fontSize={46} fontFamily="serif" textAnchor="middle" fill={INK} style={{ writingMode: 'vertical-rl' }}>{sign}</text>
      </g>
    )}
  </g>
);

export const Hill: React.FC<{ d: string; fill: string }> = ({ d, fill }) => <path d={d} fill={fill} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />;

// Black Tajima-style cow / ox, cartoon and friendly.
export const Cow: React.FC<{ x: number; y: number; s?: number; flip?: boolean; color?: string }> = ({ x, y, s = 1, flip, color = '#2f2622' }) => {
  const f = useCurrentFrame();
  const tail = Math.sin(f / 8) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d={`M 150 20 q 30 ${10 + tail} 20 60`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={-130} y={-20} width={280} height={130} rx={50} fill={color} stroke={INK} strokeWidth={SW} />
      {[-100, -40, 60, 120].map((lx) => <rect key={lx} x={lx} y={90} width={26} height={80} rx={8} fill={color} stroke={INK} strokeWidth={SW} />)}
      <ellipse cx={-170} cy={10} rx={62} ry={52} fill={color} stroke={INK} strokeWidth={SW} />
      <ellipse cx={-205} cy={34} rx={34} ry={24} fill="#d9a48f" stroke={INK} strokeWidth={5} />
      <path d="M -200 -30 q -20 -30 -40 -20 M -150 -30 q 10 -34 34 -26" stroke="#f0e2c4" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={-178} cy={0} r={8} fill="#ffffff" stroke={INK} strokeWidth={3} />
      <circle cx={-180} cy={1} r={4} fill={INK} />
    </g>
  );
};

export const Person: React.FC<{ x: number; y: number; s?: number; robe?: string; hair?: string; phase?: number }> = ({ x, y, s = 1, robe = '#3d5a80', hair = '#2b2118', phase = 0 }) => {
  const f = useCurrentFrame();
  const bob = Math.sin((f + phase) / 12) * 4;
  return (
  <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
    <path d="M -55 40 Q -60 170 -70 230 L 70 230 Q 60 170 55 40 Q 0 10 -55 40 Z" fill={robe} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M -20 40 L 0 110 L 20 40" fill="none" stroke="#f5ead2" strokeWidth={8} />
    <circle cx={0} cy={0} r={44} fill="#e9b98f" stroke={INK} strokeWidth={SW} />
    <path d="M -44 -6 Q -40 -52 0 -50 Q 40 -52 44 -6 Q 20 -24 0 -22 Q -20 -24 -44 -6 Z" fill={hair} stroke={INK} strokeWidth={4} />
    <circle cx={-14} cy={4} r={5} fill={INK} /><circle cx={14} cy={4} r={5} fill={INK} />
    <path d="M -12 22 q 12 8 24 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
  );
};

import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, Graphic } from '../theme';
import { JapanMap } from './JapanMap';
import { EURO_FOCUS, EuroMap } from './EuroMap';
import { GLASS_FOCUS, GlassMap } from './GlassMap';
import { Puzzle } from './Puzzle';

// On-screen graphics (RULES §3.3, §3.4, §5): real type in the channel palette, never AI-drawn.
// FULLSCREEN: KAXO steps small into the corner. OPAQUE: the graphic covers the frame, so no scene is drawn behind it
// (a chapter card sits over the shot's own scene).
export const FULLSCREEN = new Set(['chapter', 'quiz', 'puzzle', 'chart', 'map']);
export const OPAQUE = new Set(['quiz', 'puzzle', 'chart', 'map']);
type Side = 'left' | 'right' | 'center';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const usePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.7 } });
};
const pop = (v: number) => ({ opacity: Math.min(1, v * 1.5), transform: `scale(${0.8 + v * 0.2}) translateY(${(1 - v) * 40}px)` });

const Chapter: React.FC<{ n: number; title: string }> = ({ n, title }) => {
  const a = usePop(0), b = usePop(5), c = usePop(9);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 60 }}>
      <div style={{ position: 'absolute', left: -100, right: -100, top: 380, height: 320, background: C.tomato, transform: `skewY(-2deg) scaleX(${a})` }} />
      <div style={{ ...pop(b), position: 'relative', width: 250, height: 250, borderRadius: '50%', background: C.cream, border: `10px solid ${C.ink}`, display: 'grid', placeItems: 'center', fontSize: 160 }}>{n}</div>
      <div style={{ ...pop(c), position: 'relative', fontSize: 140, color: C.white, maxWidth: 1250, lineHeight: 1, textShadow: `0 6px 0 ${C.ink}` }}>{title}</div>
    </AbsoluteFill>
  );
};

// ask/reveal (seconds into the shot) come from remotion_props.py: the question ends at `ask`, the answer lights up at `reveal`
const Quiz: React.FC<{ q: string; a: string; b: string; c: string; ok: 'a' | 'b' | 'c'; ask?: number; reveal?: number }> = (g) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = usePop(0);
  const at = g.reveal ?? 4.2;
  const reveal = frame > fps * at;
  const timer = interpolate(frame, [fps * (g.ask ?? 1), fps * (at - 0.2)], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cards = (['a', 'b', 'c'] as const).map((k, i) => {
    const v = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 11 } });
    const ok = reveal && g.ok === k, no = reveal && g.ok !== k;
    return (
      <div key={k} style={{ ...pop(v), flex: 1, background: ok ? C.olive : C.white, color: ok ? C.white : C.ink, opacity: no ? 0.35 : pop(v).opacity,
        border: `8px solid ${C.ink}`, borderRadius: 36, padding: '46px 26px', textAlign: 'center', fontSize: 70, lineHeight: 1.05,
        transform: `${pop(v).transform} scale(${ok ? 1.06 : 1})` }}>
        <div style={{ fontSize: 50, color: ok ? C.mustard : C.tomato, marginBottom: 12 }}>{k.toUpperCase()}</div>{g[k]}
      </div>
    );
  });
  return (
    <AbsoluteFill style={{ padding: '110px 360px 110px 150px', gap: 56, flexDirection: 'column', background: C.cream }}>
      <div style={pop(head)}>
        <span style={{ background: C.tomato, color: C.white, fontSize: 46, padding: '6px 26px', borderRadius: 40 }}>Quick guess</span>
        <div style={{ fontSize: g.q.length > 70 ? 66 : g.q.length > 45 ? 76 : 88, lineHeight: 1.05, marginTop: 22 }}>{g.q}</div>
      </div>
      <div style={{ display: 'flex', gap: 46 }}>{cards}</div>
      <div style={{ height: 24, borderRadius: 12, background: 'rgba(43,33,24,.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${timer * 100}%`, background: C.tomato }} />
      </div>
    </AbsoluteFill>
  );
};

// Place / date tag in a top corner, on the side away from KAXO; long text wraps and gets smaller.
const Label: React.FC<{ big: string; small?: string; side?: Side; kx?: number }> = ({ big, small, side, kx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = spring({ frame, fps, config: { damping: 13 } });
  const right = side === 'right';
  // KAXO in the middle: keep the tag left of his head
  const maxWidth = kx !== undefined && kx > 0.35 && kx < 0.65 ? (kx - 0.14) * 1920 - 130 : kx !== undefined ? 1000 : 1300;
  const font = big.length > 26 ? 70 : big.length > 16 ? 84 : 96;
  return (
    <div style={{ position: 'absolute', top: 80, [right ? 'right' : 'left']: 90, maxWidth, transform: `translateX(${(1 - v) * (right ? 700 : -700)}px)`, background: C.ink, color: C.cream,
      padding: '28px 52px', borderRadius: 26, [right ? 'borderRight' : 'borderLeft']: `24px solid ${C.tomato}` }}>
      <div style={{ fontSize: font, lineHeight: 1.02 }}>{big}</div>
      {small && <div style={{ fontSize: 40, color: C.mustard, marginTop: 10, fontFamily: 'Arial, sans-serif', fontWeight: 700, lineHeight: 1.15 }}>{small}</div>}
    </div>
  );
};

// Fact-check stamp (the channel's signature): slams in from 2x, shakes, ink flecks fly; source line underneath.
const STAMP = { MYTH: C.tomato, DISPUTED: '#e0a020', RECORD: C.olive } as const;
const Verdict: React.FC<{ stamp: keyof typeof STAMP; small?: string; side?: Side }> = ({ stamp, small, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = STAMP[stamp] || C.tomato;
  const hit = 7;
  const s = interpolate(frame, [0, hit], [2.1, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const o = interpolate(frame, [0, 3], [0, 1], clamp);
  const amp = frame >= hit ? Math.max(0, 20 - (frame - hit) * 1.6) : 0;
  const sx = Math.sin(frame * 2.9) * amp, sy = Math.cos(frame * 3.7) * amp * 0.6;
  const w = stamp.length * 118 + 150, h = 280;
  const cx = side === 'left' ? 700 : side === 'right' ? 1220 : 960;
  const sub = spring({ frame: frame - hit - 4, fps, config: { damping: 12 } });
  const fleck = interpolate(frame, [hit, hit + 14], [0, 1], clamp);
  const specks = Array.from({ length: 60 }).map((_, i) => [((i * 7919) % 1000) / 1000 * w - w / 2, ((i * 104729) % 1000) / 1000 * h - h / 2, 3 + (i % 4) * 2]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${(cx / 1920) * 100}% 44%, rgba(43,33,24,.5) 0%, rgba(43,33,24,.15) 55%, rgba(43,33,24,0) 80%)`, opacity: o }} />
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <mask id="stampInk">
            <rect x={-w} y={-h} width={w * 2} height={h * 2} fill="#ffffff" />
            {specks.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#000000" />)}
          </mask>
        </defs>
        {frame >= hit && Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 + 0.3;
          const d = 0.55 + fleck * 0.35;
          return <circle key={i} cx={cx + Math.cos(a) * (w / 2) * d * 1.15} cy={470 + Math.sin(a) * (h / 2) * d * 1.5} r={(1 - fleck) * (8 + (i % 3) * 5)} fill={color} stroke={C.ink} strokeWidth={2} />;
        })}
        <g transform={`translate(${cx + sx} ${470 + sy}) rotate(-7) scale(${s})`} opacity={o}>
          <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={34} fill={C.ink} opacity={0.35} />
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill="#fff8ec" />
          <g mask="url(#stampInk)">
            <rect x={-w / 2 + 8} y={-h / 2 + 8} width={w - 16} height={h - 16} rx={28} fill="none" stroke={color} strokeWidth={18} />
            <rect x={-w / 2 + 34} y={-h / 2 + 34} width={w - 68} height={h - 68} rx={14} fill="none" stroke={color} strokeWidth={6} />
            <text x={0} y={62} textAnchor="middle" fontSize={176} fontFamily="Lilita, sans-serif" letterSpacing={10} fill={color}
              stroke={C.ink} strokeWidth={8} strokeLinejoin="round" paintOrder="stroke">{stamp}</text>
          </g>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill="none" stroke={C.ink} strokeWidth={6} />
        </g>
      </svg>
      {small && (
        <div style={{ position: 'absolute', top: 470 + h / 2 + 50, left: cx, transform: `translateX(-50%) translateY(${(1 - sub) * 40}px)`, opacity: Math.min(1, sub * 1.5),
          background: C.ink, color: C.cream, padding: '14px 34px', borderRadius: 18, fontSize: 40, fontFamily: 'Arial, sans-serif', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {small}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Caption plate for an archive picture: what it is (big) and where it comes from (small).
const ArchiveCaption: React.FC<{ caption: string; src?: string; side?: Side }> = ({ caption, src, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  const right = side === 'right';
  return (
    <div style={{ position: 'absolute', bottom: 70, [right ? 'right' : 'left']: 80, maxWidth: 640, transform: `translateY(${(1 - v) * 300}px) rotate(${right ? 1 : -1}deg)`,
      background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 26, padding: '22px 36px 24px', boxShadow: `0 12px 0 ${C.ink}`, [right ? 'borderRight' : 'borderLeft']: `24px solid ${C.tomato}` }}>
      <div style={{ fontSize: 58, lineHeight: 1.04 }}>{caption}</div>
      {src && <div style={{ fontSize: 32, marginTop: 10, color: '#6b5a4a', fontFamily: 'Arial, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>{src}</div>}
    </div>
  );
};

const Chart: React.FC<{ title: string; items: [string, number][]; unit?: string; src?: string }> = ({ title, items, unit, src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = usePop(0);
  const max = Math.max(...items.map((i) => i[1]), 1);
  return (
    <AbsoluteFill style={{ padding: '110px 160px', gap: 50, justifyContent: 'center', background: C.cream }}>
      <div style={{ ...pop(head), fontSize: 80 }}>{title}</div>
      {items.map(([k, v], i) => {
        const g = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 18 } });
        return (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: '360px 1fr 280px', alignItems: 'center', gap: 30, fontSize: 64 }}>
            <div>{k}</div>
            <div style={{ height: 88 }}>
              <div style={{ height: '100%', width: `${(v / max) * 100 * g}%`, borderRadius: 20, border: `6px solid ${C.ink}`, background: i === 0 ? C.tomato : C.mustard }} />
            </div>
            <div style={{ textAlign: 'right' }}>{(v >= 100 ? Math.round(v * g) : Math.round(v * g * 10) / 10).toLocaleString('en-US')}{unit ? ` ${unit}` : ''}</div>
          </div>
        );
      })}
      {src && <div style={{ fontSize: 32, opacity: 0.6, fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>{src}</div>}
    </AbsoluteFill>
  );
};

// A short phrase on a card over the scene (the scene stays visible behind it).
const Text: React.FC<{ big: string; small?: string; side?: Side }> = ({ big, small, side = 'center' }) => {
  const a = usePop(0), b = usePop(8);
  // the card moves away from KAXO so it never sits behind his head
  return (
    <AbsoluteFill style={{ alignItems: side === 'left' ? 'flex-start' : side === 'right' ? 'flex-end' : 'center', paddingTop: 70, paddingLeft: 90, paddingRight: 90 }}>
      <div style={{ ...pop(a), background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 56px', maxWidth: side === 'center' ? 1300 : 1050,
        textAlign: 'center', boxShadow: `0 12px 0 ${C.ink}` }}>
        <div style={{ fontSize: 92, lineHeight: 1.02 }}>{big}</div>
        {small && <div style={{ ...pop(b), fontSize: 46, color: C.tomato, marginTop: 8 }}>{small}</div>}
      </div>
    </AbsoluteFill>
  );
};

export const GraphicView: React.FC<{ g: Graphic; side?: Side; kx?: number }> = ({ g, side, kx }) => {
  switch (g.type) {
    case 'chapter': return <Chapter {...g} />;
    case 'quiz': return <Quiz {...g} />;
    case 'puzzle': return <Puzzle {...g} />;
    case 'label': return <Label {...g} side={side} kx={kx} />;
    case 'chart': return <Chart {...g} />;
    case 'text': return <Text {...g} side={side} />;
    case 'verdict': return <Verdict {...g} side={side} />;
    case 'archive': return <ArchiveCaption {...g} side={side} />;
    case 'map':
      if (GLASS_FOCUS.has(g.focus)) return <GlassMap focus={g.focus} label={g.label} pins={g.pins} route={g.route} />;
      return EURO_FOCUS.has(g.focus) ? <EuroMap focus={g.focus} label={g.label} /> : <JapanMap focus={g.focus} label={g.label} />;
    default: return null;
  }
};

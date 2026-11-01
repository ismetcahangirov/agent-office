import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, Graphic } from '../theme';
import { JapanMap } from './JapanMap';

// On-screen graphics (RULES §3.3, §3.4, §5): real type in the channel palette, never AI-drawn.
export const FULLSCREEN = new Set(['chapter', 'quiz', 'puzzle', 'chart', 'map']);

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

const Quiz: React.FC<{ q: string; a: string; b: string; c: string; ok: 'a' | 'b' | 'c' }> = (g) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = usePop(0);
  const reveal = frame > fps * 4.2;
  const timer = interpolate(frame, [fps * 1, fps * 4], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
        <div style={{ fontSize: 88, lineHeight: 1.05, marginTop: 22 }}>{g.q}</div>
      </div>
      <div style={{ display: 'flex', gap: 46 }}>{cards}</div>
      <div style={{ height: 24, borderRadius: 12, background: 'rgba(43,33,24,.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${timer * 100}%`, background: C.tomato }} />
      </div>
    </AbsoluteFill>
  );
};

// Answer Puzzle: N jigsaw pieces, one per reason; the newest piece drops in (RULES §3.4).
const Puzzle: React.FC<{ labels: string[]; step: number; title?: string; ans?: string }> = ({ labels, step, title, ans }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = usePop(0);
  const drop = spring({ frame: frame - 10, fps, config: { damping: 9, mass: 0.8 } });
  const done = step >= labels.length;
  const ansV = usePop(36);
  const size = Math.min(270, 1380 / labels.length);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 70, background: C.cream }}>
      <div style={{ ...pop(head), fontSize: 80 }}>{title || (done ? 'The full picture' : 'The answer so far')}</div>
      <div style={{ display: 'flex' }}>
        {labels.map((l, i) => {
          const on = i < step, isNew = i === step - 1;
          const style: React.CSSProperties = {
            width: size, height: size, marginLeft: i ? -8 : 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 16,
            fontSize: Math.round(size / 4.8), position: 'relative', zIndex: on ? 1 : 0,
            borderRadius: i === 0 ? '36px 0 0 36px' : i === labels.length - 1 ? '0 36px 36px 0' : 0,
            border: on ? `8px solid ${C.ink}` : `8px dashed rgba(43,33,24,.3)`,
            background: isNew ? C.tomato : on ? C.mustard : 'rgba(255,255,255,.55)',
            color: isNew ? C.white : on ? C.ink : 'rgba(43,33,24,.35)',
            transform: isNew ? `translateY(${(1 - drop) * -260}px) rotate(${(1 - drop) * -12}deg)` : undefined,
            opacity: isNew ? Math.min(1, drop * 2) : 1,
          };
          return <div key={i} style={style}>{on ? l : '?'}</div>;
        })}
      </div>
      {done && ans && <div style={{ ...pop(ansV), fontSize: 70, color: C.tomato, maxWidth: 1500, textAlign: 'center' }}>{ans}</div>}
    </AbsoluteFill>
  );
};

const Label: React.FC<{ big: string; small?: string }> = ({ big, small }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = spring({ frame, fps, config: { damping: 13 } });
  return (
    <div style={{ position: 'absolute', left: 90, top: 80, transform: `translateX(${(1 - v) * -600}px)`, background: C.ink, color: C.cream,
      padding: '30px 56px', borderRadius: 26, borderLeft: `24px solid ${C.tomato}` }}>
      <div style={{ fontSize: 96, lineHeight: 1 }}>{big}</div>
      {small && <div style={{ fontSize: 40, color: C.mustard, marginTop: 10, fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>{small}</div>}
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
            <div style={{ textAlign: 'right' }}>{Math.round(v * g * 10) / 10}{unit ? ` ${unit}` : ''}</div>
          </div>
        );
      })}
      {src && <div style={{ fontSize: 32, opacity: 0.6, fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>{src}</div>}
    </AbsoluteFill>
  );
};

// A short phrase on a card over the scene (the scene stays visible behind it).
const Text: React.FC<{ big: string; small?: string; side?: 'left' | 'right' | 'center' }> = ({ big, small, side = 'center' }) => {
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

export const GraphicView: React.FC<{ g: Graphic; side?: 'left' | 'right' | 'center' }> = ({ g, side }) => {
  switch (g.type) {
    case 'chapter': return <Chapter {...g} />;
    case 'quiz': return <Quiz {...g} />;
    case 'puzzle': return <Puzzle {...g} />;
    case 'label': return <Label {...g} />;
    case 'chart': return <Chart {...g} />;
    case 'text': return <Text {...g} side={side} />;
    case 'map': return <JapanMap focus={g.focus} label={g.label} />;
    default: return null;
  }
};

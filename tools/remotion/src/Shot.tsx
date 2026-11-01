import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Kaxo } from './kaxo/Kaxo';
import { Scene } from './scenes';
import { GraphicView, FULLSCREEN } from './graphics';
import { Shot as ShotT } from './theme';

// One shot = background scene (with slow camera move) + optional graphic + optional KAXO.
export const Shot: React.FC<{ shot: ShotT; base: string; index: number; from: number; prev?: ShotT }> = ({ shot, base, index, from, prev }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = durationInFrames > 1 ? frame / (durationInFrames - 1) : 0;
  const cam = shot.camera || (index % 2 ? 'zoom_in' : 'pan_right');
  const s = cam === 'zoom_in' ? interpolate(p, [0, 1], [1, 1.08]) : cam === 'zoom_out' ? interpolate(p, [0, 1], [1.08, 1]) : 1.06;
  const x = cam === 'pan_left' ? interpolate(p, [0, 1], [30, -30]) : cam === 'pan_right' ? interpolate(p, [0, 1], [-30, 30]) : 0;
  const full = shot.graphic && FULLSCREEN.has(shot.graphic.type);
  const fade = index === 0 ? interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' }) : 1;
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <AbsoluteFill style={shot.focus
        ? { transformOrigin: `${shot.focus[0] * 100}% ${shot.focus[1] * 100}%`, transform: `scale(${interpolate(p, [0, 1], [1.2, 2.1])})` }
        : { transform: `scale(${cam === 'static' ? 1 : s}) translateX(${x}px)` }}>
        <Scene name={full ? 'studio' : shot.scene || 'studio'} image={shot.image ? `${base}/images/${shot.image}` : undefined} />
      </AbsoluteFill>
      {shot.graphic && <GraphicView g={shot.graphic} side={shot.kaxo ? ((shot.kaxo.x ?? 0.78) > 0.5 ? 'left' : 'right') : 'center'} />}
      {shot.kaxo && (
        <Kaxo
          spec={shot.kaxo}
          small={!!full}
          from={from}
          // no entrance when KAXO was already standing in the same place in the previous shot
          enter={!(prev?.kaxo && prev.kaxo.pose === shot.kaxo.pose && (prev.kaxo.x ?? 0.78) === (shot.kaxo.x ?? 0.78))}
        />
      )}
    </AbsoluteFill>
  );
};

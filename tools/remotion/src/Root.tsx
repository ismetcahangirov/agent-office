import { AbsoluteFill, Composition } from 'remotion';
import { Scene } from './scenes';
import { GraphicView } from './graphics';
import { Graphic } from './theme';
import { Episode } from './Episode';
import { EpisodeProps, FPS, H, W } from './theme';

// Props come from tools/video/remotion_props.py (--props=props/<slug>.json).
const sample: EpisodeProps = {
  slug: 'sample',
  base: 'ep/sample',
  duration: 6,
  music: false,
  shots: [
    { id: 's01', start: 0, end: 3, lines: [], scene: 'studio', kaxo: { pose: 'point', x: 0.25 }, graphic: { type: 'chapter', n: 1, title: 'The Ban' } },
    { id: 's02', start: 3, end: 6, lines: [], scene: 'studio', kaxo: { pose: 'surprised', x: 0.78 }, graphic: { type: 'label', big: 'Tokyo, 1872', small: 'Meiji era' } },
  ],
};

// Preview of one scene or graphic: npx remotion still Preview out/x.png --props='{"scene":"rice-field"}'
const Preview: React.FC<{ scene?: string; graphic?: Graphic; image?: string }> = ({ scene, graphic, image }) => (
  <AbsoluteFill style={{ fontFamily: 'Lilita, sans-serif' }}>
    <Scene name={scene || 'studio'} image={image} />
    {graphic && <GraphicView g={graphic} />}
  </AbsoluteFill>
);

export const RemotionRoot = () => (
  <>
  <Composition id="Preview" component={Preview} width={W} height={H} fps={FPS} durationInFrames={90} defaultProps={{ scene: 'studio' } as { scene?: string; graphic?: Graphic; image?: string }} />
  <Composition
    id="Episode"
    component={Episode}
    width={W}
    height={H}
    fps={FPS}
    durationInFrames={Math.ceil(sample.duration * FPS)}
    defaultProps={sample}
    calculateMetadata={({ props }) => ({ durationInFrames: Math.ceil(props.duration * FPS) })}
  />
  </>
);

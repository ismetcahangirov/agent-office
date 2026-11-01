import { createContext, useContext, useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { Shot } from './Shot';
import { C, EpisodeProps } from './theme';

// Voice loudness (0..1) for the current frame, so KAXO can move while he talks.
const Loudness = createContext<(frame: number) => number>(() => 0);
// `from` is the shot's first frame: inside a <Sequence> useCurrentFrame() is relative to the shot.
export const useLoudness = (from: number) => {
  const get = useContext(Loudness);
  const frame = useCurrentFrame();
  return get(frame + from);
};

const useFont = () => {
  const [handle] = useState(() => delayRender('font'));
  useEffect(() => {
    const f = new FontFace('Lilita', `url(${staticFile('fonts/LilitaOne-Regular.ttf')})`);
    f.load().then((ff) => {
      document.fonts.add(ff);
      continueRender(handle);
    }).catch(() => continueRender(handle));
  }, [handle]);
};

export const Episode: React.FC<EpisodeProps> = (props) => {
  useFont();
  const { fps } = useVideoConfig();
  const voice = staticFile(`${props.base}/voice.wav`);
  const audio = useAudioData(voice);
  const loud = (frame: number) => {
    if (!audio) return 0;
    const v = visualizeAudio({ fps, frame, audioData: audio, numberOfSamples: 16 });
    return Math.min(1, (v.slice(0, 8).reduce((a, b) => a + b, 0) / 8) * 6);
  };
  return (
    <Loudness.Provider value={loud}>
      <AbsoluteFill style={{ background: C.cream, fontFamily: 'Lilita, sans-serif', color: C.ink }}>
        <Audio src={voice} />
        {props.music && <Audio src={staticFile('music.mp3')} volume={0.07} loop />}
        {props.shots.map((s, i) => {
          const from = Math.round(s.start * fps);
          const next = props.shots[i + 1];
          const to = Math.round((next ? next.start : props.duration) * fps);
          return (
            <Sequence key={s.id} from={from} durationInFrames={Math.max(1, to - from)} name={s.id}>
              <Shot shot={s} base={props.base} index={i} from={from} prev={props.shots[i - 1]} />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </Loudness.Provider>
  );
};

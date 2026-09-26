import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { C, DURATION, sec, timeline, TRANSITION } from "./theme";
import { Captions } from "./Captions";
import { BillScene } from "./scenes/BillScene";
import { ImageScene } from "./scenes/ImageScene";
import { RaceScene } from "./scenes/RaceScene";
import { TestsScene } from "./scenes/TestsScene";
import { StepsScene } from "./scenes/StepsScene";
import { CodeScene } from "./scenes/CodeScene";

// Each shot starts TRANSITION frames earlier than its cut point and fades/zooms in
// over the previous shot, so cuts become short cross-dissolves that land on the cut.

const sceneFor = (id: string) => {
  switch (id) {
    case "s01":
      return <BillScene />;
    case "s02":
      return (
        <ImageScene
          src="img/s02.png"
          headline="MEET THE TEAM"
          pan={[0, 0]}
          labels={[
            // source-pixel coordinates (1536x1024) of each robot's head top
            { text: "OPUS 5", x: 340, y: 330, color: C.red },
            { text: "OPUS 5.5", x: 1195, y: 330, color: C.green },
          ]}
        />
      );
    case "s03":
      return (
        <ImageScene
          src="img/office.png"
          headline="1 TRY EACH"
          sub="SAME REAL DASHBOARD JOB"
          pan={[30, 0]}
        />
      );
    case "s04":
      return <RaceScene />;
    case "s05":
      return (
        <ImageScene
          src="img/s05.png"
          headline="53 SECONDS?!"
          headlineColor={C.yellow}
          pan={[40, 10]}
        />
      );
    case "s06":
      return <TestsScene />;
    case "s07":
      return <StepsScene />;
    case "s08":
      return <CodeScene />;
    case "s09":
      return <ImageScene src="img/s09.png" portrait />;
    case "s10":
      return (
        <ImageScene
          src="img/s10.png"
          headline="FULL TEST"
          sub="IN THE LONG VIDEO"
          pan={[-30, 0]}
        />
      );
    default:
      return null;
  }
};

const TransitionIn: React.FC<{ children: React.ReactNode; first: boolean }> = ({
  children,
  first,
}) => {
  const frame = useCurrentFrame();
  if (first) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, TRANSITION], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, TRANSITION + 4], [1.08, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const OpusShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {timeline.shots.map((shot, i) => {
        const first = i === 0;
        const from = first ? 0 : sec(shot.start) - TRANSITION;
        const last = i === timeline.shots.length - 1;
        const end = last ? DURATION : sec(timeline.shots[i + 1].start);
        return (
          <Sequence
            key={shot.id}
            name={shot.id}
            from={from}
            durationInFrames={end - from}
            premountFor={30}
          >
            <TransitionIn first={first}>{sceneFor(shot.id)}</TransitionIn>
          </Sequence>
        );
      })}
      <Captions />
      <Audio src={staticFile("voice.wav")} />
    </AbsoluteFill>
  );
};

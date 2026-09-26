import "./index.css";
import { Composition } from "remotion";
import { OpusShort } from "./OpusShort";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OpusShort"
      component={OpusShort}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

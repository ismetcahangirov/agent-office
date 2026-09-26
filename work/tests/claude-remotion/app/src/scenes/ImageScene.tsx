import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { C, fontFamily, TRANSITION } from "../theme";
import { Headline, pop, useShotFrame } from "./common";

type Label = { text: string; x: number; y: number; color: string };

const CARD_W = 1040;
const SRC_W = 1536;
const SRC_H = 1024;
const CARD_H = (CARD_W / SRC_W) * SRC_H;
const CARD_TOP = 380;
const CARD_LEFT = (1080 - CARD_W) / 2;

export const ImageScene: React.FC<{
  src: string;
  headline?: string;
  headlineColor?: string;
  sub?: string;
  labels?: Label[];
  portrait?: boolean;
  pan?: [number, number];
}> = ({ src, headline, headlineColor, sub, labels = [], portrait, pan = [0, 0] }) => {
  const frame = useShotFrame();
  const { durationInFrames } = useVideoConfig();
  const len = durationInFrames - TRANSITION;
  // slow Ken Burns: 0..1 over the shot
  const t = interpolate(frame, [-TRANSITION, len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  if (portrait) {
    return (
      <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: interpolate(t, [0, 1], [1.04, 1.16]),
            translate: `0px ${interpolate(t, [0, 1], [30, -30])}px`,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </AbsoluteFill>
    );
  }

  const k = CARD_W / SRC_W;
  const zoom = interpolate(t, [0, 1], [1.02, 1.12]);
  const panX = interpolate(t, [0, 1], [0, pan[0]]);
  const panY = interpolate(t, [0, 1], [0, pan[1]]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.35)",
          scale: 1.2,
        }}
      />
      {headline ? (
        <Headline text={headline} sub={sub} color={headlineColor} />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: CARD_TOP,
          left: CARD_LEFT,
          width: CARD_W,
          height: CARD_H,
          borderRadius: 32,
          overflow: "hidden",
          border: "6px solid rgba(255,255,255,0.9)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: zoom,
            translate: `${panX}px ${panY}px`,
          }}
        />
      </div>
      {labels.map((l, i) => {
        const p = pop(frame, 6 + i * 10, 10);
        // follow the image's zoom (around card centre) and pan
        const x = CARD_W / 2 + (l.x * k - CARD_W / 2) * zoom + panX;
        const y = CARD_H / 2 + (l.y * k - CARD_H / 2) * zoom + panY;
        return (
          <div
            key={l.text}
            style={{
              position: "absolute",
              left: CARD_LEFT + x,
              top: CARD_TOP + y,
              translate: "-50% -100%",
              scale: interpolate(p, [0, 1], [0.4, 1]),
              opacity: p,
              fontFamily,
              fontSize: 60,
              color: "#000",
              background: l.color,
              padding: "4px 22px",
              borderRadius: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {l.text}
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: -22,
                translate: "-50% 0px",
                width: 0,
                height: 0,
                borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent",
                borderTop: `24px solid ${l.color}`,
              }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

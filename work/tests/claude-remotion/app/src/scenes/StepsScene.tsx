import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
} from "remotion";
import { C, fontFamily, sec } from "../theme";
import { pop, useShotFrame } from "./common";

const Dots: React.FC<{ n: number; color: string; start: number }> = ({
  n,
  color,
  start,
}) => {
  const frame = useShotFrame();
  const shown = Math.min(n, Math.max(0, Math.floor((frame - start) / 1.2)));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 18 }}>
      {new Array(n).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            width: 92,
            height: 92,
            borderRadius: 46,
            background: i < shown ? color : C.panel,
            border: "5px solid #2a2f3b",
          }}
        />
      ))}
    </div>
  );
};

export const StepsScene: React.FC = () => {
  const frame = useShotFrame();
  // "Fewer steps mean a smaller API bill." starts 2.40 s after the cut
  const billStart = sec(2.4) - 6;
  const img = pop(frame, billStart, 10);
  const t = interpolate(frame, [billStart, sec(4.8)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <div
        style={{ position: "absolute", top: 130, left: 70, right: 70, fontFamily }}
      >
        <div style={{ fontSize: 100, color: C.yellow, textAlign: "center" }}>
          STEPS TO FINISH
        </div>
        <div style={{ marginTop: 30, fontSize: 80, color: C.white }}>
          OPUS 5 · <span style={{ color: C.red }}>31 STEPS</span>
        </div>
        <Dots n={31} color={C.red} start={-4} />
        <div style={{ marginTop: 44, fontSize: 80, color: C.white }}>
          OPUS 5.5 · <span style={{ color: C.green }}>5 STEPS</span>
        </div>
        <Dots n={5} color={C.green} start={2} />
      </div>
      <AbsoluteFill style={{ opacity: img, backgroundColor: C.bg }}>
        <Img
          src={staticFile("img/s07.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px) brightness(0.35)",
            scale: 1.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 20,
            width: 1040,
            height: 693,
            borderRadius: 32,
            overflow: "hidden",
            border: "6px solid rgba(255,255,255,0.9)",
            scale: interpolate(img, [0, 1], [0.92, 1]),
          }}
        >
          <Img
            src={staticFile("img/s07.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              scale: interpolate(t, [0, 1], [1.02, 1.12]),
              translate: `${interpolate(t, [0, 1], [0, 30])}px 0px`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
            fontFamily,
          }}
        >
          <div style={{ fontSize: 120, lineHeight: 1, color: C.white }}>
            FEWER STEPS
          </div>
          <div style={{ fontSize: 84, color: C.green }}>= SMALLER API BILL</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { C, fontFamily, sec } from "../theme";
import { pop } from "./common";

const Row: React.FC<{
  name: string;
  value: number;
  color: string;
  start: number;
  top: number;
  pulseAt: number;
}> = ({ name, value, color, start, top, pulseAt }) => {
  const frame = useCurrentFrame();
  const p = pop(frame, start, 8);
  const count = interpolate(frame, [start, start + 18], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const barW = interpolate(
    frame,
    [start, start + 18],
    [0, (value / 1.45) * 920],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  // Punch the number when the narrator says it
  const pulse = interpolate(
    frame,
    [pulseAt, pulseAt + 5, pulseAt + 14],
    [1, 1.12, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 80,
        right: 80,
        opacity: p,
        translate: `${(1 - p) * -80}px 0px`,
        fontFamily,
      }}
    >
      <div style={{ fontSize: 72, color: C.white }}>{name}</div>
      <div
        style={{
          fontSize: 250,
          lineHeight: 1,
          color,
          scale: pulse,
          transformOrigin: "left center",
        }}
      >
        ${count.toFixed(2)}
      </div>
      <div
        style={{
          marginTop: 22,
          height: 60,
          width: Math.max(barW, 8),
          background: color,
          borderRadius: 30,
        }}
      />
    </div>
  );
};

export const BillScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontSize: 84,
          color: C.yellow,
          opacity: pop(frame, 0, 6),
          letterSpacing: 2,
        }}
      >
        SAME JOB. THE BILL:
      </div>
      <Row
        name="OPUS 5"
        value={1.45}
        color={C.red}
        start={0}
        top={290}
        pulseAt={sec(1.09)}
      />
      <Row
        name="OPUS 5.5"
        value={0.27}
        color={C.green}
        start={6}
        top={720}
        pulseAt={sec(4.07)}
      />
    </AbsoluteFill>
  );
};

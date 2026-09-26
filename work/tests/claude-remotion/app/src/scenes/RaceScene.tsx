import { AbsoluteFill, interpolate } from "remotion";
import { C, fontFamily, sec } from "../theme";
import { pop, useShotFrame } from "./common";

const Lane: React.FC<{
  name: string;
  finish: number;
  t: number;
  color: string;
  top: number;
}> = ({ name, finish, t, color, top }) => {
  const progress = Math.min(t / finish, 1);
  const done = t >= finish;
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, fontFamily }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 80,
          color: C.white,
        }}
      >
        <span>{name}</span>
        <span style={{ color: done ? color : C.grey }}>
          {done ? `${finish}s ✓` : `${Math.floor(t)}s`}
        </span>
      </div>
      <div
        style={{
          marginTop: 16,
          height: 150,
          borderRadius: 32,
          background: C.panel,
          overflow: "hidden",
          border: "5px solid #2a2f3b",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: color,
            borderRadius: 28,
          }}
        />
      </div>
    </div>
  );
};

export const RaceScene: React.FC = () => {
  const frame = useShotFrame();
  // Race clock: 0 -> 53 s while the narrator says the 5.5 line, then on to 265 s
  const t = interpolate(frame, [sec(0.2), sec(1.9), sec(4.9)], [0, 53, 265], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          fontFamily,
          opacity: pop(frame, -8, 8),
        }}
      >
        <div style={{ fontSize: 84, color: C.yellow }}>RACE CLOCK</div>
        <div style={{ fontSize: 300, lineHeight: 1, color: C.white }}>
          {Math.floor(t)}s
        </div>
      </div>
      <Lane name="OPUS 5.5" finish={53} t={t} color={C.green} top={590} />
      <Lane name="OPUS 5" finish={265} t={t} color={C.red} top={880} />
    </AbsoluteFill>
  );
};

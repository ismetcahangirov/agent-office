import { AbsoluteFill } from "remotion";
import { C, fontFamily } from "../theme";
import { pop, useShotFrame } from "./common";

const Grid: React.FC<{ name: string; left: number; color: string }> = ({
  name,
  left,
  color,
}) => {
  const frame = useShotFrame();
  const passed = Math.min(18, Math.max(0, Math.floor((frame + 2) / 2.5)));
  return (
    <div
      style={{ position: "absolute", top: 290, left, width: 440, fontFamily }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 66,
          color: C.white,
        }}
      >
        <span>{name}</span>
        <span style={{ color: passed === 18 ? color : C.grey }}>
          {passed}/18
        </span>
      </div>
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {new Array(18).fill(0).map((_, i) => {
          const on = i < passed;
          return (
            <div
              key={i}
              style={{
                height: 118,
                borderRadius: 18,
                background: on ? color : C.panel,
                border: "4px solid #2a2f3b",
                color: "#0c0e13",
                fontSize: 76,
                lineHeight: "110px",
                textAlign: "center",
                fontWeight: 900,
              }}
            >
              {on ? "✓" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TestsScene: React.FC = () => {
  const frame = useShotFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontSize: 100,
          color: C.yellow,
          opacity: pop(frame, -8, 8),
        }}
      >
        18 HIDDEN TESTS
      </div>
      <Grid name="OPUS 5" left={70} color={C.green} />
      <Grid name="OPUS 5.5" left={570} color={C.green} />
    </AbsoluteFill>
  );
};

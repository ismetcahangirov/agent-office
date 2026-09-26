import { AbsoluteFill, interpolate } from "remotion";
import { C, fontFamily, sec } from "../theme";
import { pop, useShotFrame } from "./common";

const LOG = [
  { t: "$ opus-5.5 dashboard-task", c: C.white },
  { t: "> write dashboard.html", c: C.grey },
  { t: "  done", c: C.green },
  { t: "> npm test", c: C.grey },
  { t: "  18 passing", c: C.green },
  { t: "> open in browser", c: C.grey },
  { t: "  skipped", c: C.red },
];

export const CodeScene: React.FC = () => {
  const frame = useShotFrame();
  const stamp = pop(frame, sec(1.2), 8);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 60,
          right: 60,
          height: 1060,
          background: "#0f1117",
          border: "5px solid #2a2f3b",
          borderRadius: 32,
          padding: "110px 50px 40px",
          fontFamily: "Consolas, monospace",
          fontSize: 56,
          lineHeight: 1.75,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 44,
            display: "flex",
            gap: 18,
          }}
        >
          {[C.red, C.yellow, C.green].map((c) => (
            <div
              key={c}
              style={{ width: 32, height: 32, borderRadius: 16, background: c }}
            />
          ))}
        </div>
        {LOG.map((l, i) => {
          const start = -6 + i * 5;
          const chars = Math.floor(
            interpolate(frame, [start, start + 7], [0, l.t.length], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          );
          return (
            <div key={i} style={{ color: l.c, whiteSpace: "pre" }}>
              {l.t.slice(0, chars)}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily,
          fontSize: 116,
          color: C.red,
          opacity: stamp,
          scale: interpolate(stamp, [0, 1], [1.8, 1]),
          rotate: "-7deg",
        }}
      >
        <span
          style={{
            border: `12px solid ${C.red}`,
            padding: "4px 30px",
            borderRadius: 18,
            background: "rgba(12,14,19,0.9)",
          }}
        >
          NO BROWSER CHECK
        </span>
      </div>
    </AbsoluteFill>
  );
};

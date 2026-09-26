import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, fontFamily, TRANSITION } from "../theme";

export const pop = (frame: number, start = 0, len = 10) =>
  interpolate(frame, [start, start + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const Headline: React.FC<{
  text: string;
  sub?: string;
  color?: string;
  delay?: number;
}> = ({ text, sub, color = C.white, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = pop(frame, delay, 12);
  const q = pop(frame, delay + 8, 12);
  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 80,
        right: 80,
        textAlign: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          fontSize: 120,
          lineHeight: 1,
          color,
          opacity: p,
          translate: `0px ${(1 - p) * 40}px`,
          textShadow: "0 8px 0 rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 14,
            fontSize: 56,
            color: C.yellow,
            opacity: q,
            translate: `0px ${(1 - q) * 30}px`,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

// Frame counted from the shot's cut point (shots after the first mount
// TRANSITION frames early for the cross-dissolve).
export const useShotFrame = () => useCurrentFrame() - TRANSITION;

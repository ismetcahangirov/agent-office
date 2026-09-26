import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { C, fontFamily, timeline } from "./theme";

const SWITCH_CAPTIONS_EVERY_MS = 800;

type Speaker = "narrator" | "kaxo";

// Round black outline built from text-shadows (WebkitTextStroke looked boxy on Anton)
const OUTLINE = [
  ...new Array(16).fill(0).map((_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return `${(Math.cos(a) * 6).toFixed(1)}px ${(Math.sin(a) * 6).toFixed(1)}px 0 #000`;
  }),
  "0 10px 12px rgba(0,0,0,0.7)",
].join(", ");

const lines = timeline.shots.flatMap((s) => s.lines);

const captions: Caption[] = lines.flatMap((line) =>
  line.words.map((word, i) => ({
    text: ` ${word.w.toUpperCase()}`,
    startMs: Math.round(word.start * 1000),
    endMs: Math.round(word.end * 1000),
    timestampMs: Math.round(word.start * 1000),
    confidence: 1,
    pageBreakAfter: i === line.words.length - 1,
  })),
);

const speakerAt = (ms: number): Speaker => {
  const line = lines.find(
    (l) => ms >= l.start * 1000 - 5 && ms <= l.end * 1000 + 5,
  );
  return line?.speaker ?? "narrator";
};

const lineEndAt = (ms: number): number => {
  const line = lines.find(
    (l) => ms >= l.start * 1000 - 5 && ms <= l.end * 1000 + 5,
  );
  return line ? line.end * 1000 : ms + SWITCH_CAPTIONS_EVERY_MS;
};

const CaptionPage: React.FC<{ page: TikTokPage; speaker: Speaker }> = ({
  page,
  speaker,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;
  const color = speaker === "kaxo" ? C.green : C.white;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 1270,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 108,
          lineHeight: 1.1,
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 30,
          maxWidth: 920,
          padding: "10px 34px 18px",
          borderRadius: 28,
          background: "rgba(0,0,0,0.55)",
          scale: interpolate(frame, [0, 5], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {page.tokens.map((token, i) => {
          const active =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          return (
            <span
              key={`${token.fromMs}-${i}`}
              style={{
                color,
                display: "inline-block",
                textShadow: OUTLINE,
                translate: active ? "0px -6px" : "0px 0px",
              }}
            >
              {token.text.trim()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Captions: React.FC = () => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
      }),
    [],
  );

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.round((page.startMs / 1000) * fps);
        const endMs = Math.min(
          nextPage ? nextPage.startMs : Infinity,
          lineEndAt(page.startMs) + 150,
        );
        const endFrame = Math.round((endMs / 1000) * fps);
        const durationInFrames = endFrame - startFrame;
        if (durationInFrames <= 0) {
          return null;
        }
        return (
          <Sequence
            key={index}
            name={`cap ${page.text.trim()}`}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <CaptionPage page={page} speaker={speakerAt(page.startMs)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

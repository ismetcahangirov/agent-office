import { loadFont } from "@remotion/google-fonts/Anton";
import timelineJson from "../public/timeline.json";

export const { fontFamily } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const C = {
  bg: "#0c0e13",
  panel: "#171a22",
  white: "#ffffff",
  green: "#7ed321",
  red: "#ff4d4d",
  yellow: "#ffd60a",
  grey: "#8a90a0",
};

export type Word = { w: string; start: number; end: number };
export type Line = {
  speaker: "narrator" | "kaxo";
  text: string;
  start: number;
  end: number;
  words: Word[];
};
export type Shot = { id: string; start: number; end: number; lines: Line[] };

export const timeline = timelineJson as unknown as { shots: Shot[] };
export const AUDIO_SECONDS = 37.69;
export const DURATION = Math.ceil(AUDIO_SECONDS * FPS);

export const sec = (s: number) => Math.round(s * FPS);

// Shots after the first start TRANSITION frames before their cut (cross-dissolve).
export const TRANSITION = 8;

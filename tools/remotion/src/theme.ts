// Channel palette and shared types (RULES §5.0, THUMBNAILS.md).
export const C = {
  cream: '#FFF6E5',
  ink: '#2B2118',
  tomato: '#FF4D2E',
  mustard: '#F2B33D',
  olive: '#6B7A3A',
  sky: '#8FD3F4',
  white: '#FFFFFF',
};
export const FPS = 30;
export const W = 1920;
export const H = 1080;

export type Pose = 'idle' | 'surprised' | 'laugh' | 'think' | 'point' | 'outfit-food' | 'outfit-prehistory' | 'outfit-nature' | 'outfit-lab';

export type KaxoSpec = { pose: Pose; x?: number; y?: number; scale?: number; flip?: boolean } | null;

export type Graphic =
  | { type: 'chapter'; n: number; title: string }
  | { type: 'quiz'; q: string; a: string; b: string; c: string; ok: 'a' | 'b' | 'c'; ask?: number; reveal?: number }
  // icon: the picture the pieces make ("potato"; default "dish")
  | { type: 'puzzle'; labels: string[]; step: number; title?: string; ans?: string; icon?: string }
  | { type: 'label'; big: string; small?: string }
  | { type: 'chart'; title: string; items: [string, number][]; unit?: string; src?: string }
  // pins/route: GlassMap only (place keys and route names from glass_geo.py)
  | { type: 'map'; focus: string; label?: string; pins?: string[]; route?: string[] }
  | { type: 'text'; big: string; small?: string }
  // fact-check stamp, the channel's signature: MYTH (tomato), DISPUTED (mustard), RECORD (olive) + source line
  | { type: 'verdict'; stamp: 'MYTH' | 'DISPUTED' | 'RECORD'; small?: string }
  // caption plate for an archive picture (shot.image); the picture itself is drawn by the Archive scene
  | { type: 'archive'; caption: string; src?: string }
  // empty object in episode.json = no graphic
  | { type?: undefined };

export type Line = { text: string; start: number; end: number };

export type Shot = {
  id: string;
  start: number;
  end: number;
  lines: Line[];
  scene?: string;
  image?: string; // archive image in public/<base>/images
  focus?: [number, number]; // frame point (0..1) the camera pushes into, e.g. a detail of an archive print
  kaxo?: KaxoSpec;
  graphic?: Graphic;
  camera?: 'zoom_in' | 'zoom_out' | 'pan_left' | 'pan_right' | 'static';
  chapter?: string;
};

export type EpisodeProps = {
  slug: string;
  base: string;
  duration: number;
  music: boolean;
  shots: Shot[];
  outfit?: string;
  silent?: boolean; // no voice.wav yet (test renders before the voiceover exists)
};

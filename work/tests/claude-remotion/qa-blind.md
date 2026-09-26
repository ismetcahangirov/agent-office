# Blind QA: Short A vs Short B (same script, same VO)

Method: ffmpeg frames every 1.5 s (540 wide) in `blind/frames_A`, `blind/frames_B`, plus dense strips at 0-2 s, 4-6 s, 8-10.4 s and 26-29.6 s. Scene detection, signalstats (white/black frames), blackdetect, silencedetect, ebur128 and astats. Timestamps are ±0.5 s.

## Specs
| | A | B |
|---|---|---|
| Duration | 37.70 s | 37.76 s |
| Resolution | 1080x1920, 30 fps | 1080x1920, 30 fps |
| File size | 13.8 MB | 17.8 MB |
| Bitrate (total / video / audio) | 2937 / 2738 / 189 kb/s | 3771 / 3450 / 317 kb/s |
| Codec | H.264 Main, yuv420p tv | H.264 High, yuvj420p (full range) |
| Audio | AAC mono 48 kHz, -15.6 LUFS, LRA 1.5 | AAC stereo 48 kHz, -18.3 LUFS, LRA 2.2 |

## Scores
| # | Criterion | A | Evidence A | B | Evidence B |
|---|---|---|---|---|---|
| 1 | Hook (0-2 s) | 6 | 0.25 s: "$0.27 vs $1.41" is on screen, but the numbers are mid-size and the bars are thin and low contrast. 1.5-3 s: the subtitle collides with the "Steps 5 vs 31" label | 8 | 0.25 s: a huge red $1.45 counts up against a green $0.27, the strongest contrast of both. At 0 s only Opus 5 is visible for about 0.3 s |
| 2 | Subtitle readability | 5 | Small font. 1.5-3 s: "FORTY-FIVE FOR" and "CHARGED" print on top of "Steps 5 vs 31" (overlap). Awkward chunks ("A DOLLAR" / "FORTY-FIVE FOR"). 9.5-10.5 s: a different outlined font style | 8 | Large condensed caps on a dark pill, green for KAXO's lines (5.5 s, 18 s). Minor: "MEET OPUS" / "5 AND OPUS" splits a model name (4.5-6 s). Two-line wraps at 27-30 s are still legible |
| 3 | Visual variety | 7 | About 10 shots: cost chart, team, pixel office, time chart, stopwatch, tests, paper stack, code, couch, stamp. 12.4-18.0 s time chart runs 5.6 s (the bar animates) | 7 | About 11 shots, soft slide/fade transitions (only 1 hard cut detected). Race clock runs about 6 s (12-18 s, the counter animates). Cartoons sit in small framed cards, so less screen area changes |
| 4 | Real footage vs graphics | 6 | Real pixel office recording (9.9-12.4 s, CEO sprite, live tooltip) and real VS Code typing "computeStats(events" (27.4-29.6 s) | 2 | Pure graphics. The "terminal" at 27-30 s (`$ opus-5.5 dashboard-task ... open in browser: skipped`, "NO BROWSER CHECK" stamp) is a mock-up, not a recording |
| 5 | Character / comedy | 6 | Full-bleed cartoons are large (couch hug 29.6-33.4 s, stamp 33.4-37.7 s), but nothing on screen reinforces the joke. At 5-9 s it is unclear which robot is which | 7 | "OPUS 5"/"OPUS 5.5" tags over the robots (5-9 s), and "53 SECONDS?!" over the stopwatch KAXO (18 s) makes the gag readable. The cards shrink the character, though |
| 6 | Technical defects | 5 | 9.53-9.93 s: full white frames (YAVG 234, about 12 frames). 27.4-29.6 s: code shot about 95% empty black, and the code line is cut off at the top-left ("tion computeSta"). 10-12 s: the tooltip is clipped at the right edge ("running a command: F...") and shows internal text ("live office footage / QA runs tests"). Subtitle overlap at 1.5-3 s | 8 | No black or white frames, no overlaps. Small issue: at about 12 s "RACE CLOCK 4s" shows both models at "4s", and the hidden-tests grid shows 0/18 empty at about 19.5 s. Both are intermediate animation states. The terminal panel is half empty at about 27 s |
| 7 | Audio | 8 | -15.6 LUFS, close to the Shorts norm. A continuous bed (the quietest 0.25 s window is -20 dB), so there are no dead-air holes. Mono | 7 | -18.3 LUFS, 2.7 LU quieter than A. No bed (a -92 dB window exists). Stereo |
| 8 | Would a viewer keep watching | 6 | Real footage helps credibility, but the white flash and the empty code shot at 27 s are drop-off points | 8 | Clean, consistent, easy to read. Every beat has a big number or label. It feels "templated" but polished |
| | **Total (80)** | **49** | | **55** | |

Audio note: both files have the same 5 micro-gaps to digital silence (0.13-0.19 s at 5.10, 7.52, 9.35, 12.27, 17.85 s). They come from the shared VO (sentence joins), not from either edit. No real dropouts in either.

## A: strengths
1. Real footage: a live office recording (9.9-12.4 s) and real code typing (27.4-29.6 s) give it credibility.
2. Full-bleed cartoons (22.6-27.4 s, 29.6-37.7 s): the character is big on a phone screen.
3. Better loudness (-15.6 LUFS) with a bed under the voice.

## A: weaknesses
1. White flash, 0.4 s (9.53-9.93 s), reads as a glitch.
2. The code shot (27.4-29.6 s) is an almost empty black screen, and the code text is cropped at the top-left edge.
3. Small subtitles that overlap the chart label at 1.5-3 s, with awkward word chunks. The pixel-office tooltip is clipped and shows internal text.

## B: strengths
1. Strong hook: huge red vs green price count-up at 0.25 s.
2. Excellent subtitles: big, high contrast, pill background, colour-coded speaker, no overlaps.
3. Clear data storytelling: race clock, an 18-box test grid, 31 vs 5 step dots, and robot name tags. Every number is visualised.

## B: weaknesses
1. No authentic footage at all. The "terminal" is a mock-up presented like real output (check against the channel honesty rule; label it or replace it with a real recording).
2. Cartoons are shrunk into cards with blurred fill (5-9 s, 18 s, 22-27 s, 31-37 s), which wastes about 45% of the vertical frame.
3. Quieter mix (-18.3 LUFS) with no bed, so it will sound thin next to other Shorts. Momentary "4s / 4s" and "0/18" states can confuse a viewer who pauses.

## Verdict
**B wins (55 vs 49).** It is cleaner, more readable and has the stronger hook. It has no visible defects. A's advantage is authenticity (a real office recording and real code), but it is spoiled by a white flash, an empty cropped code shot and overlapping subtitles.

Best combination: B's graphics and subtitle system, plus A's real office and code recordings (fixed: framed and filled, no flash). Make B's cartoons full-bleed, raise B to about -14/-15 LUFS, and replace or label the mock terminal.

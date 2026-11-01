"""Builds europe.json (map views for the potato episode) from Natural Earth 1:50m (public domain).

Usage: tools/video/.venv/Scripts/python tools/remotion/src/graphics/europe_geo.py
Input:  work/geo/ne50.geojson   Output: tools/remotion/src/graphics/europe.json

Each view is projected to its own pixel box (w x h). Coordinates outside the view are clamped to a margin
box, then the rings are simplified (Douglas-Peucker) so the file stays small.
"""
import json
import math
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[4]
SRC = ROOT / "work" / "geo" / "ne50.geojson"
OUT = Path(__file__).with_name("europe.json")

OLD_WORLD = {"Europe", "Asia", "Africa"}

# Each view is exactly 1920x1080: latitude range + centre longitude; the longitude range follows.
# "proj": mercator (regional) or miller (world)
VIEWS = {
    "canary-antwerp": {"lonc": -6, "lat": (24, 57.5), "proj": "mercator", "tol": 1.6},
    "pomerania": {"lonc": 16, "lat": (46.6, 58.4), "proj": "mercator", "tol": 1.4},
    "old-world": {"lonc": 40, "lat": (-46, 78), "proj": "miller", "tol": 1.6},
}

# Approximate Kingdom of Prussia around 1746 (Brandenburg, Pomerania, Silesia; East Prussia).
# Drawn over land and clipped by the coastline in the SVG, so the sea edges do not matter.
PRUSSIA = [
    [(13.6, 54.6), (14.3, 54.4), (16.5, 54.9), (17.7, 54.95), (17.5, 54.0), (16.6, 53.3), (16.1, 52.8),
     (15.9, 52.1), (16.4, 51.75), (17.5, 51.4), (18.3, 51.2), (18.6, 50.2), (18.0, 49.9), (17.0, 50.25),
     (16.6, 50.1), (16.2, 50.55), (15.0, 50.85), (14.9, 51.3), (14.6, 51.6), (13.5, 51.85), (12.3, 52.0),
     (11.0, 52.0), (11.0, 52.7), (11.6, 53.15), (12.4, 53.3), (13.3, 53.45), (13.7, 53.7)],
    [(19.3, 54.35), (19.7, 54.6), (20.0, 55.2), (21.0, 55.4), (21.2, 56.0), (21.5, 55.9), (22.1, 55.1),
     (22.7, 55.0), (22.9, 54.4), (22.6, 53.9), (21.0, 53.3), (20.0, 53.3), (19.5, 53.6)],
]

PLACES = {
    "canary": (-15.6, 28.2), "antwerp": (4.4, 51.22), "lisbon": (-9.14, 38.72),
    "kolberg": (15.58, 54.18), "berlin": (13.4, 52.52), "paris": (2.35, 48.86),
    "andes": (-72, -14), "europe": (15, 50), "asia": (90, 45), "africa": (20, 5),
    "baltic": (18.6, 56.4), "atlantic": (-25, 41), "prussia": (13.9, 52.8),
}

# Canary Islands -> along Iberia -> Bay of Biscay -> English Channel -> Scheldt -> Antwerp
ROUTE = [(-15.6, 28.2), (-13.6, 32.0), (-11.6, 36.4), (-10.6, 40.5), (-10.0, 43.6), (-6.5, 47.0),
         (-4.0, 48.9), (-1.0, 50.1), (1.6, 51.0), (3.4, 51.45), (4.4, 51.22)]


def merc(lat):
    return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


def miller(lat):
    return 1.25 * math.log(math.tan(math.pi / 4 + 0.4 * math.radians(lat)))


def projector(view):
    lat0, lat1 = view["lat"]
    f = merc if view["proj"] == "mercator" else miller
    view["w"], view["h"] = 1920, 1080
    sx = 1080 / (f(lat1) - f(lat0))
    span = math.degrees(1920 / sx)
    lon0 = view["lonc"] - span / 2

    def p(lon, lat):
        lat = max(-85, min(85, lat))
        return (math.radians(lon - lon0) * sx, (f(lat1) - f(lat)) * sx)
    return p


def dp(pts, tol):
    """Douglas-Peucker on an (n,2) array, iterative."""
    if len(pts) < 4:
        return pts
    keep = np.zeros(len(pts), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        seg = pts[b] - pts[a]
        rel = pts[a + 1:b] - pts[a]
        n = np.hypot(*seg)
        d = np.abs(seg[0] * rel[:, 1] - seg[1] * rel[:, 0]) / n if n > 0 else np.hypot(rel[:, 0], rel[:, 1])
        i = int(np.argmax(d))
        if d[i] > tol:
            keep[a + 1 + i] = True
            stack += [(a, a + 1 + i), (a + 1 + i, b)]
    return pts[keep]


def ring_path(ring, p, view, tol):
    w, h = view["w"], view["h"]
    m = 60
    pts = np.array([p(lon, lat) for lon, lat in ring])
    if pts[:, 0].max() < -m or pts[:, 0].min() > w + m or pts[:, 1].max() < -m or pts[:, 1].min() > h + m:
        return None
    pts[:, 0] = pts[:, 0].clip(-m, w + m)
    pts[:, 1] = pts[:, 1].clip(-m, h + m)
    pts = dp(pts, tol)
    if len(pts) < 4:
        return None
    xs, ys = pts[:, 0], pts[:, 1]
    if (xs.max() - xs.min()) * (ys.max() - ys.min()) < 30:  # specks
        return None
    return "M" + "L".join(f"{x:.0f},{y:.0f}" for x, y in pts) + "Z"


def main():
    g = json.loads(SRC.read_text(encoding="utf-8"))
    out = {}
    for name, view in VIEWS.items():
        p = projector(view)
        old, other = [], []
        for feat in g["features"]:
            pr = feat["properties"]
            if pr.get("CONTINENT") == "Antarctica":
                continue
            geom = feat["geometry"]
            polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
            for poly in polys:
                ring = poly[0]
                if name == "old-world" and pr["ADM0_A3"] in ("RUS", "FJI") and min(x for x, _ in ring) < -160:
                    ring = [(x + 360, y) for x, y in ring]  # Chukotka next to Russia, not on the far left
                d = ring_path(ring, p, view, view["tol"])
                if d:
                    (old if pr.get("CONTINENT") in OLD_WORLD else other).append(d)
        v = {"w": view["w"], "h": view["h"], "land": "".join(other) if name == "old-world" else "".join(old + other)}
        if name == "old-world":
            v["old"] = "".join(old)
        v["places"] = {k: [round(c, 1) for c in p(*ll)] for k, ll in PLACES.items()}
        if name == "pomerania":
            v["prussia"] = "".join("M" + "L".join(f"{x:.0f},{y:.0f}" for x, y in (p(*ll) for ll in poly)) + "Z" for poly in PRUSSIA)
        if name == "canary-antwerp":
            v["route"] = [[round(c, 1) for c in p(*ll)] for ll in ROUTE]
        out[name] = v
        print(name, view["w"], view["h"], sum(len(x) for x in v.values() if isinstance(x, str)))
    OUT.write_text(json.dumps(out, separators=(",", ":")), encoding="utf-8")
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()

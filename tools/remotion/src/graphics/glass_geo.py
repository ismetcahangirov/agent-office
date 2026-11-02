"""Builds glass.json (map views for the glass episode) from Natural Earth 1:50m (public domain).

Usage: tools/video/.venv/Scripts/python tools/remotion/src/graphics/glass_geo.py
Input:  work/geo/ne50.geojson   Output: tools/remotion/src/graphics/glass.json

Same projection and simplification as europe_geo.py, separate file so EuroMap keeps only its own views.
"""
import json
from pathlib import Path

from europe_geo import SRC, projector, ring_path

OUT = Path(__file__).with_name("glass.json")

VIEWS = {
    # Egypt, the eastern Mediterranean coast, Anatolia, Mesopotamia
    "near-east": {"lonc": 33, "lat": (22, 42), "proj": "mercator", "tol": 1.4},
    # eastern Mediterranean coast -> Rome -> Venice
    "med-route": {"lonc": 22, "lat": (28, 48), "proj": "mercator", "tol": 1.4},
}

PLACES = {
    "mesopotamia": (44.0, 33.6), "nineveh": (43.15, 36.36), "egypt": (30.8, 26.8), "cairo": (31.24, 30.04),
    "desert-glass": (25.5, 25.4), "catalhoyuk": (32.83, 37.67), "amarna": (30.9, 27.65), "ashkelon": (34.55, 31.67),
    "qantir": (31.83, 30.8), "uluburun": (29.57, 36.13), "jerusalem": (35.23, 31.78), "sidon": (35.37, 33.56),
    "rome": (12.5, 41.9), "venice": (12.33, 45.44), "greece": (22.0, 37.8),
}

# Egyptian glass ingots by sea: Nile Delta -> along the coast -> past Cyprus -> off Kas (Uluburun) -> towards Greece
SHIP = [(31.9, 31.5), (33.5, 32.6), (34.4, 33.6), (33.3, 35.0), (31.0, 35.9), (29.57, 36.13), (27.0, 36.4), (24.0, 37.0)]
# blown glass spreads: eastern Mediterranean coast -> Rome -> Venice (sea route round Greece and Italy)
WEST = [(35.37, 33.56), (33.0, 34.2), (28.0, 35.3), (22.0, 36.1), (18.0, 37.5), (15.6, 38.15), (15.0, 38.9), (14.2, 40.4), (12.5, 41.8)]
NORTH = [(12.5, 41.8), (14.2, 40.4), (15.0, 38.9), (15.6, 38.15), (16.6, 38.4), (17.4, 39.2), (18.7, 39.9), (18.9, 40.6), (16.4, 42.4), (13.8, 44.5), (12.33, 45.44)]


def main():
    g = json.loads(SRC.read_text(encoding="utf-8"))
    out = {}
    for name, view in VIEWS.items():
        p = projector(view)
        land = []
        for feat in g["features"]:
            if feat["properties"].get("CONTINENT") == "Antarctica":
                continue
            geom = feat["geometry"]
            polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
            for poly in polys:
                d = ring_path(poly[0], p, view, view["tol"])
                if d:
                    land.append(d)
        v = {"w": view["w"], "h": view["h"], "land": "".join(land),
             "places": {k: [round(c, 1) for c in p(*ll)] for k, ll in PLACES.items()}}
        routes = {"ship": SHIP} if name == "near-east" else {"west": WEST, "north": NORTH}
        v["routes"] = {k: [[round(c, 1) for c in p(*ll)] for ll in r] for k, r in routes.items()}
        out[name] = v
        print(name, len(v["land"]))
    OUT.write_text(json.dumps(out, separators=(",", ":")), encoding="utf-8")
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()

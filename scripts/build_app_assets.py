#!/usr/bin/env python3
"""Régénère public/assets/ depuis les masters 1024px de assets/."""
from PIL import Image
from pathlib import Path
import json, sys

root = Path(__file__).resolve().parent.parent
ids = [r["id"] for r in json.load(open(root / "data/roles.json", encoding="utf-8"))["roles"]]
out = root / "public/assets/roles"; out.mkdir(parents=True, exist_ok=True)
total = n = 0
for i in ids:
    src = root / f"assets/roles/{i}.png"
    if not src.exists():
        print(f"⚠️  manquant : {i}"); continue
    d = out / f"{i}.jpg"
    Image.open(src).convert("RGB").resize((512, 512), Image.LANCZOS).save(
        d, "JPEG", quality=84, optimize=True, progressive=True)
    n += 1; total += d.stat().st_size

uo = root / "public/assets/ui"; uo.mkdir(parents=True, exist_ok=True)
for name, size, q in [("card_back", 640, 86), ("app_icon", 512, 90)]:
    s = root / f"assets/ui/{name}.png"
    if s.exists():
        d = uo / f"{name}.jpg"
        Image.open(s).convert("RGB").resize((size, size), Image.LANCZOS).save(d, "JPEG", quality=q, optimize=True)
        total += d.stat().st_size
ic = root / "assets/ui/app_icon.png"
if ic.exists():
    for s in (192, 512):
        Image.open(ic).convert("RGB").resize((s, s), Image.LANCZOS).save(uo / f"icon-{s}.png", "PNG", optimize=True)
print(f"✅ {n} cartes + ressources UI — {total // 1024} Ko")

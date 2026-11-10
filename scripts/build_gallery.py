#!/usr/bin/env python3
"""
LOUP GAROU BEL TOUNSI — Génère la planche contact des 21 cartes.

Lit data/roles.json + assets/roles/*.png et produit assets/roles/gallery.html
avec les vignettes encodées en data-URI (donc lisible hors-ligne, sans réseau).
Les rôles sans illustration reçoivent le placeholder SVG officiel du thème.

    python3 scripts/build_gallery.py
"""
import base64, io, json, os, urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ROLES = json.loads((ROOT / "data/roles.json").read_text(encoding="utf-8"))
IMG_DIR = ROOT / "assets/roles"
THUMB, QUALITY = 340, 74

CAMP = {
    "village":  ("#14314D", "#3E7CB1", "#9CCBF5", "🏘️ الحومة"),
    "loups":    ("#44190F", "#D1603D", "#FFAB87", "🐺 الذيابة"),
    "solo":     ("#2E1540", "#A96BD9", "#DCAAF5", "🔥 وحداني"),
    "amoureux": ("#44131F", "#E4698F", "#FFA9C2", "💔 الحبايب"),
    "variable": ("#3A3014", "#E9B44C", "#F6D98E", "🃏 يتبدّل"),
}

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False


def thumb(path: Path) -> str:
    if not HAS_PIL:
        return "data:image/png;base64," + base64.b64encode(path.read_bytes()).decode()
    im = Image.open(path).convert("RGB")
    s = min(im.size)
    im = im.crop(((im.width - s) // 2, (im.height - s) // 2,
                  (im.width + s) // 2, (im.height + s) // 2)).resize((THUMB, THUMB), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=QUALITY, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def placeholder(role) -> str:
    bg, line, fg, _ = CAMP[role["camp"]]
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">'
        f'<defs><radialGradient id="g" cx="50%" cy="34%" r="72%">'
        f'<stop offset="0%" stop-color="{line}" stop-opacity=".40"/>'
        f'<stop offset="100%" stop-color="{bg}" stop-opacity="1"/></radialGradient>'
        f'<pattern id="k" width="64" height="64" patternUnits="userSpaceOnUse">'
        f'<path d="M32 6l7 11 13-3-3 13 11 7-11 7 3 13-13-3-7 11-7-11-13 3 3-13-11-7 11-7-3-13 13 3z" '
        f'fill="none" stroke="{line}" stroke-opacity=".16" stroke-width="1.4"/></pattern></defs>'
        f'<rect width="512" height="512" fill="{bg}"/><rect width="512" height="512" fill="url(#k)"/>'
        f'<rect width="512" height="512" fill="url(#g)"/>'
        f'<text x="256" y="300" font-size="180" text-anchor="middle">{role["emoji"]}</text>'
        f'<text x="256" y="420" font-size="38" font-family="Inter,system-ui,sans-serif" '
        f'font-weight="700" fill="{fg}" text-anchor="middle">{role["nameFr"]}</text></svg>'
    )
    return "data:image/svg+xml;charset=utf-8," + urllib.parse.quote(svg)


cards, done, todo = [], 0, 0
for role in ROLES["roles"]:
    f = IMG_DIR / f'{role["id"]}.png'
    if f.exists():
        uri, tag, cls = thumb(f), "🎨 مرسومة", "ok"
        done += 1
    else:
        uri, tag, cls = placeholder(role), "🔤 احتياطي", "todo"
        todo += 1
    bg, line, fg, camp_label = CAMP[role["camp"]]
    cards.append(f'''  <figure class="c {cls}" style="--line:{line}">
    <span class="tag">{tag}</span>
    <img src="{uri}" alt="{role['nameFr']}" loading="lazy">
    <figcaption>
      <b class="latin">{role['nameFr']}</b>
      <span class="badge" style="background:{bg};color:{fg}">{camp_label}</span>
      <p>{role['descAr'][:105]}…</p>
    </figcaption>
  </figure>''')

html = f'''<!DOCTYPE html>
<html lang="ar-TN" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LOUP GAROU BEL TOUNSI — كارطات الأدوار</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#0A0D16;background-image:radial-gradient(ellipse at 50% -10%,#1E1733 0%,#0A0D16 65%);
color:#EDEAE3;font-family:'Tajawal','Cairo','Segoe UI',Tahoma,sans-serif;line-height:1.9;padding-bottom:60px}}
.wrap{{max-width:1240px;margin:0 auto;padding:0 20px}}
header{{text-align:center;padding:46px 20px 30px;border-bottom:1px solid #27314A}}
h1{{font-size:33px;letter-spacing:2px;direction:ltr;font-family:Inter,system-ui,sans-serif;font-weight:800;
background:linear-gradient(90deg,#E9B44C,#D1603D,#E9B44C);-webkit-background-clip:text;background-clip:text;color:transparent}}
.sub{{color:#9AA0B8;margin-top:6px;font-size:19px}}
.stats{{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap}}
.stat{{background:#161D30;border:1px solid #27314A;border-radius:999px;padding:7px 18px;font-size:15px}}
.stat b{{color:#E9B44C}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(222px,1fr));gap:18px;margin-top:28px}}
.c{{background:#161D30;border:1px solid #27314A;border-top:4px solid var(--line);border-radius:22px;
overflow:hidden;position:relative;box-shadow:0 6px 24px rgba(0,0,0,.45);transition:transform .2s}}
.c:hover{{transform:translateY(-4px)}}
.c.todo{{opacity:.75;border-style:dashed}}
.c img{{width:100%;aspect-ratio:1;object-fit:cover;display:block}}
.tag{{position:absolute;top:11px;inset-inline-start:11px;background:rgba(0,0,0,.62);color:#fff;font-size:11px;
padding:3px 10px;border-radius:999px;z-index:2}}
figcaption{{padding:12px 14px 15px}}
.latin{{direction:ltr;font-family:Inter,system-ui,sans-serif;font-size:18px;font-weight:800;display:block}}
.badge{{display:inline-block;font-size:12px;padding:2px 10px;border-radius:999px;margin:6px 0 4px}}
figcaption p{{font-size:13.5px;color:#9AA0B8;line-height:1.75}}
h2{{font-size:22px;color:#E9B44C;margin:40px 0 4px}}
footer{{text-align:center;color:#5D5872;font-size:14px;margin-top:44px;padding-top:18px;border-top:1px solid #1E2230}}
</style></head>
<body>
<header>
  <div style="font-size:40px">🎴</div>
  <h1>LOUP GAROU BEL TOUNSI</h1>
  <div class="sub">كارطات الأدوار — ستيل « ليل الحومة »</div>
  <div class="stats">
    <span class="stat">المجموع <b>{done + todo}</b></span>
    <span class="stat">🎨 مرسومة <b>{done}</b></span>
    <span class="stat">⏳ باقية <b>{todo}</b></span>
  </div>
</header>
<div class="wrap">
  <h2>الكارطات</h2>
  <p style="color:#9AA0B8;font-size:15px">الكارطات اللي ما تصوّروش بعد تورّي الشكل الاحتياطي (إيموجي + لون الفريق) — هاذا بالضبط اللي يظهر في الأپليكاسيون كان ما فمّاش تصويرة.</p>
  <div class="grid">
{chr(10).join(cards)}
  </div>
  <footer>LOUP GAROU BEL TOUNSI · {done}/{done + todo} كارطة مرسومة · ستيل « ليل الحومة »</footer>
</div>
</body></html>'''

# --- ressources d'interface (dos de carte, icône) ---------------------------
UI_DIR = ROOT / "assets/ui"
ui_items = []
for name, label, desc in [
    ("card_back.png", "Dos de carte", "اللي يشوفوه اللعّابة وقت ما يدور التيليفون في التوزيع السرّي"),
    ("app_icon.png",  "Icône de l'app", "الأيقونة متاع الأپليكاسيون على التيليفون"),
]:
    f = UI_DIR / name
    if f.exists():
        ui_items.append(f'''  <figure class="c ok" style="--line:#E9B44C">
    <img src="{thumb(f)}" alt="{label}" loading="lazy">
    <figcaption><b class="latin">{label}</b><p>{desc}</p></figcaption>
  </figure>''')

ui_block = ""
if ui_items:
    ui_block = ('<h2>ريسورسات الواجهة</h2>'
                '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">'
                + chr(10).join(ui_items) + '</div>')

html = html.replace("  <footer>", ui_block + chr(10) + "  <footer>")

out = IMG_DIR / "gallery.html"
out.write_text(html, encoding="utf-8")
print(f"✅ {out.relative_to(ROOT)}  —  {done} illustrées, {todo} en attente, {round(out.stat().st_size/1024)} Ko")

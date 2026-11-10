# 🐺 LOUP GAROU BEL TOUNSI

**L'app du المعلّم (narrateur) pour jouer au Loup-Garou en tunisien.**
Noms de rôles en français · descriptifs et règles en arabe tunisien · قوانين تونسية 🇹🇳

---

## 📁 Structure

```
loup-garou-bel-tounsi/
├── README.md
├── docs/
│   ├── 00-source-roles-brut.md      ← liste d'origine de l'auteur (référence)
│   └── 01-ktayeb-el-9awanin.html    ← ÉTAPE 1 : كتيّب القوانين v1.2 (source de vérité)
├── data/
│   └── roles.json                   ← ÉTAPE 2 : les 21 rôles en données
├── theme/
│   ├── theme.json                   ← tokens de design
│   ├── theme.css                    ← variables CSS + composants
│   └── preview.html                 ← 🎨 le thème « ليل الحومة » en images
├── assets/roles/                    ← illustrations des cartes (PNG 1024²)
│   └── gallery.html                 ← 🎴 planche contact des 21 cartes
├── config/
│   └── image-sources.json           ← config des fournisseurs d'images
├── scripts/
│   └── fetch-role-images.mjs        ← récupération depuis les sources externes
└── src/services/
    └── roleImages.ts                ← résolveur d'images à 4 niveaux
```

## 🎭 Les 21 rôles

| Camp | Rôles |
|---|---|
| 🐺 Loups (5) | Loup Garou · Loup Rouge · Loup Père Infecte · Loup Noir · **Grand Méchant Loup** |
| 🏘️ Village (14) | Villageois · Voyante · Salvateur · Sorcière · Ancien Sage · Détective · Ours · Corbeau · Berger · Barbier · **Cupidon** · **Servante Dévouée** · **Renard** · **Enfant Sauvage** |
| 🔥 Solo (2) | Pyromane · Alien |

**En gras** = rôles officiels *Thiercelieux* ajoutés le 2026-11-08.

## 📐 Convention d'écriture (validée)

| Élément | Langue |
|---|---|
| Nom du rôle | **Français** (Voyante, Sorcière, Garde, Loup Garou...) |
| Descriptif de la carte | **Arabe tunisien** |
| Répliques du narrateur | **Arabe tunisien** |
| Règles / mécaniques | **Arabe tunisien** |
| Étiquettes techniques (code, JSON) | Latin |

## 🗺️ Feuille de route

| Étape | Contenu | Statut |
|---|---|---|
| 1 | 📄 كتيّب القوانين : rôles, nuit, jour, قوانين تونسية | ✅ **v1.2 — validé, 0 question** |
| 2 | 🗂️ `data/roles.json` — 21 rôles, textes arabes, ordre de nuit, victoires | ✅ |
| 2b | 🎨 Thème « ليل الحومة » + système d'images à 4 niveaux | ✅ |
| 3 | 🖼️ Illustrations des 22 rôles + dos de carte + icône | ✅ **22/22** |
| 4 | ⚙️ Moteur de jeu (ordre de nuit, résolution, victoire) | ⏳ |
| 5 | 📱 Interface mobile React + Vite (RTL, mode sombre) | ⏳ |
| 6 | 📦 Capacitor → APK Android + projet iOS | ⏳ |

## 🛠️ Stack

React + Vite + TypeScript · données JSON locales · **100 % hors-ligne** · Capacitor pour l'APK Android et le projet iOS.

## ✅ Tout est arbitré

Dernières décisions : **Pyromane** gagne seul, arrose `(moutons du Berger − 1)` joueurs par nuit · **Alien** gagne seul, tentatives illimitées · **Sorcière** comme l'officiel (1 potion de vie + 1 potion de mort).

## 🖼️ Images des rôles — état des sources (vérifié le 2026-11-08)

| Source | Résultat |
|---|---|
| `loups-garous.com` (officiel, Zygomatic/Asmodée) | ✅ en ligne — **aucune image par rôle**, uniquement des visuels de boîtes |
| `loups-garous-en-ligne.com` | ❌ HTTP 403, bloque les requêtes externes |
| `api.werewolves-assistant.com` | ⚠️ HTTP 401 — clé d'API requise |

➡️ Pas d'API officielle publique. Et **8 rôles n'ont aucune carte officielle** (fan-made).
➡️ Solution : illustrations maison + adaptateurs prêts dans `config/image-sources.json` (`enabled: true` suffit le jour où une source existe).
⚠️ L'art officiel est sous copyright (Alexios Tjoyas / éd. Lui-même) : à ne pas embarquer dans une build publiée.

## 🧩 Contraintes techniques identifiées

- **Écran de placement** 🪑 : `Ours`, `Renard` et `Ancien Sage` ont besoin de l'ordre des places autour de la table.
- **Boutons à la demande** : `Barbier` 💈, `Alien` 👽 et `Servante Dévouée` 👵 se déclenchent hors de l'ordre de nuit — le narrateur doit pouvoir les lancer à tout moment.
- **Role-block rétroactif** : `Loup Rouge` se réveille après plusieurs rôles ; le moteur doit annuler leur action a posteriori.
- **Changements de camp en cours de partie** : `Enfant Sauvage` (modèle mort) et `Loup Père Infecte` (infection).

## 🎴 Illustrations — ✅ complet (22/22)

Style : **« ليل الحومة »** — peinture à l'huile, médina tunisienne la nuit, clair-obscur, portes bleues cloutées, lanternes en fer forgé. PNG 1024×1024.

| Camp | Cartes |
|---|---|
| 🐺 Loups (5) | Loup Garou · Loup Rouge · Loup Père Infecte · Loup Noir · Grand Méchant Loup |
| 🏘️ Village (14) | Villageois · Voyante · Salvateur · Sorcière · Ancien Sage · Détective · Ours · Corbeau · Berger · Barbier · Cupidon · Enfant Sauvage · Servante Dévouée · Renard |
| 🃏 Variable (1) | **Voleur** — commence au village, peut changer de camp |
| 🔥 Solo (2) | Pyromane · Alien |

**Ressources d'interface** : `assets/ui/card_back.png` (dos de carte, khatem or sur indigo) · `assets/ui/app_icon.png` (icône de l'app).

Planche contact : `assets/roles/gallery.html` — régénérable avec `python3 scripts/build_gallery.py`.

# 🐺 LOUP GAROU BEL TOUNSI

**L'app du المعلّم (narrateur) pour jouer au Loup-Garou en tunisien.**
Noms de rôles en français · descriptifs et règles en arabe tunisien · قوانين تونسية 🇹🇳

---

## 📁 Structure

```
loup-garou-bel-tounsi/
├── README.md
├── docs/
│   ├── 00-source-roles-brut.md      ← liste d'origine de l'auteur (référence)
│   └── 01-ktayeb-el-9awanin.html    ← ÉTAPE 1 : كتيّب القوانين v1.2 (source de vérité)
├── data/
│   └── roles.json                   ← ÉTAPE 2 : les 21 rôles en données
├── theme/
│   ├── theme.json                   ← tokens de design
│   ├── theme.css                    ← variables CSS + composants
│   └── preview.html                 ← 🎨 le thème « ليل الحومة » en images
├── assets/roles/                    ← illustrations des cartes (PNG 1024²)
│   └── gallery.html                 ← 🎴 planche contact des 21 cartes
├── config/
│   └── image-sources.json           ← config des fournisseurs d'images
├── scripts/
│   └── fetch-role-images.mjs        ← récupération depuis les sources externes
└── src/services/
    └── roleImages.ts                ← résolveur d'images à 4 niveaux
```

## 🎭 Les 21 rôles

| Camp | Rôles |
|---|---|
| 🐺 Loups (5) | Loup Garou · Loup Rouge · Loup Père Infecte · Loup Noir · **Grand Méchant Loup** |
| 🏘️ Village (14) | Villageois · Voyante · Salvateur · Sorcière · Ancien Sage · Détective · Ours · Corbeau · Berger · Barbier · **Cupidon** · **Servante Dévouée** · **Renard** · **Enfant Sauvage** |
| 🔥 Solo (2) | Pyromane · Alien |

**En gras** = rôles officiels *Thiercelieux* ajoutés le 2026-11-08.

## 📐 Convention d'écriture (validée)

| Élément | Langue |
|---|---|
| Nom du rôle | **Français** (Voyante, Sorcière, Garde, Loup Garou...) |
| Descriptif de la carte | **Arabe tunisien** |
| Répliques du narrateur | **Arabe tunisien** |
| Règles / mécaniques | **Arabe tunisien** |
| Étiquettes techniques (code, JSON) | Latin |

## 🗺️ Feuille de route

| Étape | Contenu | Statut |
|---|---|---|
| 1 | 📄 كتيّب القوانين : rôles, nuit, jour, قوانين تونسية | ✅ **v1.2 — validé, 0 question** |
| 2 | 🗂️ `data/roles.json` — 21 rôles, textes arabes, ordre de nuit, victoires | ✅ |
| 2b | 🎨 Thème « ليل الحومة » + système d'images à 4 niveaux | ✅ |
| 3 | 🖼️ Illustrations des 22 rôles + dos de carte + icône | ✅ **22/22** |
| 4 | ⚙️ Moteur de jeu (ordre de nuit, résolution, victoire) | ⏳ |
| 5 | 📱 Interface mobile React + Vite (RTL, mode sombre) | ⏳ |
| 6 | 📦 Capacitor → APK Android + projet iOS | ⏳ |

## 🛠️ Stack

React + Vite + TypeScript · données JSON locales · **100 % hors-ligne** · Capacitor pour l'APK Android et le projet iOS.

## ✅ Tout est arbitré

Dernières décisions : **Pyromane** gagne seul, arrose `(moutons du Berger − 1)` joueurs par nuit · **Alien** gagne seul, tentatives illimitées · **Sorcière** comme l'officiel (1 potion de vie + 1 potion de mort).

## 🖼️ Images des rôles — état des sources (vérifié le 2026-11-08)

| Source | Résultat |
|---|---|
| `loups-garous.com` (officiel, Zygomatic/Asmodée) | ✅ en ligne — **aucune image par rôle**, uniquement des visuels de boîtes |
| `loups-garous-en-ligne.com` | ❌ HTTP 403, bloque les requêtes externes |
| `api.werewolves-assistant.com` | ⚠️ HTTP 401 — clé d'API requise |

➡️ Pas d'API officielle publique. Et **8 rôles n'ont aucune carte officielle** (fan-made).
➡️ Solution : illustrations maison + adaptateurs prêts dans `config/image-sources.json` (`enabled: true` suffit le jour où une source existe).
⚠️ L'art officiel est sous copyright (Alexios Tjoyas / éd. Lui-même) : à ne pas embarquer dans une build publiée.

## 🧩 Contraintes techniques identifiées

- **Écran de placement** 🪑 : `Ours`, `Renard` et `Ancien Sage` ont besoin de l'ordre des places autour de la table.
- **Boutons à la demande** : `Barbier` 💈, `Alien` 👽 et `Servante Dévouée` 👵 se déclenchent hors de l'ordre de nuit — le narrateur doit pouvoir les lancer à tout moment.
- **Role-block rétroactif** : `Loup Rouge` se réveille après plusieurs rôles ; le moteur doit annuler leur action a posteriori.
- **Changements de camp en cours de partie** : `Enfant Sauvage` (modèle mort) et `Loup Père Infecte` (infection).

## 🎴 Illustrations — ✅ complet (21/21)

Style : **« ليل الحومة »** — peinture à l'huile, médina tunisienne la nuit, clair-obscur, portes bleues cloutées, lanternes en fer forgé. PNG 1024×1024.

| Camp | Cartes |
|---|---|
| 🐺 Loups (5) | Loup Garou · Loup Rouge · Loup Père Infecte · Loup Noir · Grand Méchant Loup |
| 🏘️ Village (14) | Villageois · Voyante · Salvateur · Sorcière · Ancien Sage · Détective · Ours · Corbeau · Berger · Barbier · Cupidon · Enfant Sauvage · Servante Dévouée · Renard |
| 🔥 Solo (2) | Pyromane · Alien |

**Ressources d'interface** : `assets/ui/card_back.png` (dos de carte, motif khatem or sur indigo) · `assets/ui/app_icon.png` (icône de l'app).

Planche contact : `assets/roles/gallery.html` — régénérable avec `python3 scripts/build_gallery.py`.

### ⚠️ Un correctif à prévoir
`cupidon.png` : le modèle a interprété le **safsari** tunisien comme un sari indien (bijoux et drapé d'Asie du Sud). À régénérer avec un prompt plus précis.

---

## 🆕 Mise à jour du 8 novembre 2026 — كتيّب v1.3 · `roles.json` v1.3

### 🃏 Nouveau rôle : `Voleur` (officiel Thiercelieux) — 22 rôles
On ajoute **2 cartes `Villageois` supplémentaires** au paquet ; après distribution les 2 cartes non distribuées restent **face cachée au centre**.
La **première nuit, avant tout le monde**, le Voleur les regarde et peut échanger sa carte contre l'une d'elles.
- Si les **2 cartes sont des Loups-Garous → il est obligé** d'en prendre une.
- Il joue le nouveau rôle **jusqu'à la fin**, et change de camp avec lui.
- Si le nouveau rôle agit la 1ʳᵉ nuit (`Cupidon`, `Enfant Sauvage`) → il le joue **la même nuit**, après l'échange.
- S'il garde sa carte → simple `Villageois`.

`camp: "variable"` · `nightOrder: 5` (avant Cupidon) · `setupEffect.extraCenterCards: 2`

### 🐑 `Berger` — règle corrigée
- Il envoie **TOUS ses moutons restants chaque nuit**, **un mouton par joueur** (pas deux sur la même personne) — et non plus un seul mouton par nuit.
- **Compte rendu le matin : public mais ANONYME.** Le narrateur annonce seulement les **nombres** (« ☠️ 1 mort · 💧 1 mouillé · ✅ 1 sain »), **sans nommer** les joueurs visités.
- Le **Berger seul** sait où il a envoyé ses moutons → il déduit (« un de mes 3 est un loup ») et peut parler, se taire ou mentir pendant قعدة الحومة.
- ☠️ Mouton **mort** = loup → **perdu définitivement**.
- 💧 Mouton **mouillé** = la cible est le `Pyromane` **ou** une personne déjà aspergée → le mouton **revient et est réutilisable**, mais **reste mouillé** : si le Pyromane met le feu, **il brûle avec les joueurs aspergés**.
- À 0 mouton → devient `Villageois`.

### 🔫 `Barbier` — correction
Ce n'est pas un coiffeur : c'est **un homme barbu avec un fusil et une seule balle** pour toute la partie. Mécanique inchangée (tue un loup ou un solo → il survit ; tue un villageois → il meurt avec lui). Emoji `💈` → `🔫`.

### 💘 `Cupidon` — illustration refaite
Le chérubin mythologique classique (bébé ailé, arc doré, flèche à pointe de cœur), dans la même direction artistique.

---

# ⚙️ Étape 4 — L'application (moteur + interface + réseau)

```bash
npm install
npm run dev      # serveur de salon :8787  +  interface :5173
```

## Architecture

```
index.html · vite.config.ts · package.json
server/index.mjs            ← salon LAN (Express + ws) — aucun cloud
src/
  engine/
    types.ts                ← Player · GameState · Step · Memory
    data.ts                 ← lecture de data/roles.json + autoCompose()
    engine.ts               ← LE MOTEUR (pur, immuable, sans dépendance)
  net/room.ts               ← useHostRoom() / usePlayerRoom() — WebSocket
  components/ui.tsx         ← TopBar · Modal · PlayerPicker · RoleCardView
  screens/
    Home · Setup · Lobby · Deal · Night · Day (Morning/Debate/Vote) · End · PlayerApp
  styles/theme.css          ← « ليل الحومة » — 2 peaux via [data-phase]
public/assets/              ← cartes 512px (1,5 Mo) générées depuis assets/
scripts/sim.ts              ← simulateur de parties (test du moteur)
```

## Le moteur

Pur et **immuable** : chaque fonction renvoie un `GameState` neuf, donc undo/replay
et tests sont triviaux. Aucune dépendance externe.

| Fonction | Rôle |
|---|---|
| `createGame(names, roles, opts)` | distribue au hasard, prépare la 1ʳᵉ nuit |
| `currentStep(state)` | l'étape de nuit courante, candidats recalculés en direct |
| `submitStep(state, value)` | enregistre, calcule la révélation secrète, avance |
| `resolveNight` *(interne)* | applique l'ordre de résolution des morts |
| `goDebate` · `goVote` · `setVote` · `lynch` | la journée |
| `barbierShoot` · `alienGuess` | actions à la demande |
| `checkVictory` | 5 conditions de victoire |

**Ordre de résolution** (respecté à la lettre) :
`blocage Loup Rouge → protection Salvateur → dévoration → Grand Méchant Loup →
infection → potion de vie → potion de mort → incendie → moutons mouillés qui brûlent →
Barbier/Alien → Enfant Sauvage → chaîne des amoureux → victoire`

### Validation
`scripts/sim.ts` joue des parties entières au hasard, de 6 à 20 joueurs :

```
🎲 400 parties simulées
   loups    258  64.5 %     village  130  32.5 %
   personne   7   1.8 %     solo       3   0.8 %     amoureux  2  0.5 %
⏱️ plus longue partie : 16 tours   🚫 bloquées : 0   ❌ erreurs : 0
```

## Les deux façons de jouer

### 📱 Même téléphone (hors-ligne total)
Setup → distribution carte par carte (« عطي التيليفون لـ… » → dos de carte → révélation) → nuit → jour.
Aucune socket n'est ouverte.

### 📡 Host / Join sur le réseau local
- Le **narrateur = le host** : il crée un salon, obtient un **code à 4 lettres** et l'URL LAN.
- Les joueurs ouvrent l'URL sur **le même WiFi**, tapent le code + leur nom.
- Au lancement, **chaque téléphone reçoit sa carte en privé** (jamais diffusée aux autres).
- Les infos secrètes (Voyante, Détective, Renard…) partent **sur le téléphone du joueur concerné**.
- Les annonces publiques (morts, lynchage) sont diffusées à tous.
- 🔫 **Barbier** et 👽 **Alien** ont **un bouton « إعمل الإشارة »** dans leur app : le narrateur reçoit
  une notification et endort le village.

Protocole WebSocket : `create · join · start · push · broadcast · sign · kick · end`.
**Rien ne sort du réseau local** — pas de compte, pas de serveur distant.

## Le thème « ليل الحومة »
Deux peaux qui basculent **toutes seules** selon la phase : `[data-phase="night"]` la nuit
(indigo + lueur de lanterne) et `[data-phase="day"]` le jour (sable et argile).
Trame khatem à 8 branches en SVG inline à 7 %, trois familles typographiques
(Aref Ruqaa pour les titres, Tajawal pour l'UI, Inter pour les noms de rôles en français).

---

# 📱 Étape 5 — Application installable (Capacitor) + réglages

## Build mobile

```bash
npm run sync        # vite build  +  cap sync
npm run android     # ouvre Android Studio
npm run ios         # ouvre Xcode (macOS)
npm run apk         # APK debug direct  → android/app/build/outputs/apk/debug/app-debug.apk
```

| Plateforme | Scaffoldé | Prérequis pour compiler |
|---|---|---|
| 🤖 Android | ✅ `android/` | **JDK 17+** et le SDK Android (Android Studio) |
| 🍎 iOS | ✅ `ios/` | **macOS + Xcode** et `pod install` |

`appId` = `tn.houma.loupgaroubeltounsi` · `appName` = *Loup Garou bel Tounsi*
Icônes de lancement (toutes densités + adaptatives) et écrans de démarrage générés
depuis `assets/ui/app_icon.png`. Fond `#0A0D16`, barre de statut sombre.

**Permissions déclarées** — Android : `READ_MEDIA_IMAGES` (galerie), `ACCESS_WIFI_STATE` (salon LAN).
iOS : `NSPhotoLibraryUsageDescription`, `NSLocalNetworkUsageDescription` — rédigées en derja.

Le bundle embarqué fait **2,2 Mo** (22 cartes en 512 px + code). Zéro appel réseau au démarrage.

## 🖼️ Réglage « image personnalisée »

`src/services/roleImages.ts` — cascade **user → pack → remote → placeholder**.

- Bouton **📷 بدّل** sur chaque rôle dans ⚙️ الإعدادات → onglet **التصاور**.
- Galerie ouverte via `@capacitor/camera` sur mobile, `<input type="file">` sur le web.
- L'image est **recadrée au carré, réduite à 768 px, compressée en JPEG 0.85**, puis
  **enregistrée dans les ressources de l'application** :
  - mobile → `Capacitor Filesystem`, `Directory.Data/roles/<id>.jpg`
  - web → `IndexedDB`
- Elle remplace l'illustration **partout** (setup, distribution, nuit, fin de partie) via le composant `<RoleImg>`.
- ↩️ par rôle ou 🗑️ tout remettre à zéro.
- Si tout échoue, un **SVG généré à la volée** (emoji + dégradé du camp + trame khatem) s'affiche — jamais d'image cassée.

## 📜 قوانين الحومة — maintenant actifs dans le jeu

| Règle | Effet réel dans l'app |
|---|---|
| ☕ **قانون القهوة** | minuteur de قعدة الحومة = 3 min |
| 🗣️ **قانون النميمة** | chaque matin, une rumeur générée depuis l'état réel de la partie — **vraie ou fausse à pile ou face**. Le narrateur seul voit laquelle. |
| 🤫 **قانون الحسّ** | bouton 🤫 à côté de chaque joueur pendant le débat : il perd sa voix au vote du jour |
| ⚖️ **قانون الزنڨة** | égalité → minute de défense → second vote → sinon personne ne meurt |
| 😳 **قانون الحشومة** | rappel affiché : les morts ne parlent plus |
| 🌙 **وضع رمضان** | la nuit devient « بعد الفطور », le matin « السحور », débat +2 min |
| ⚡ **وضع السريع** | retire la `Sorcière` de la composition auto, débat à 90 s |

Réglages persistés en `localStorage` + `Capacitor Preferences`.
*(رمضان et السريع s'excluent mutuellement.)*


---

## الخطوة 6 — المعلّم هو اللي يقرّر

### 1. 🎛️ الأدوار بيد المعلّم
`autoCompose` ولّات **إقتراح برك** (زرّ « ✨ إقترحلي »). المسار العادي في `Setup.tsx`
هو إنّك تبني الباكي متاعك كارطة كارطة: كل دور عندو `−` / `+`، وتشوف
في الوقت الفعلي عدد الكارطات مقابل عدد اللعّابة، نسبة الذيابة، وتنبيهات
(« ما فمّاش ذيابة »، « الـ Berger يخدم مليح مع الـ Pyromane »).

### 2. 📖 دليل الأدوار — `src/screens/Codex.tsx`
واجهة إستقبال فيها **22 دور بالتصاور**: شبكة مفلترة بالمعسكر + بحث،
كل كارطة تحلّ على ورقة كاملة (وصف، ميكانيك، كلام المعلّم، رتبة الفيقان).
في الآخر: **ترتيب الفيقان الكامل** مرقّم.

### 3. 🎴 الكشف الكامل — `RoleReveal` (`Deal.tsx`)
اللاعب ما عادش يشوف التصويرة برك: **الإسم + المعسكر + « شنوّة دورك » +
« كيفاش تخدم » + متى تفيق + كيفاش تربح**، وكان حبيب يشوف شكون حبيبو.
نفس المكوّن مستعمل في `PlayerApp.tsx` (موضة الروم).

### 4. 🎙️ زوز موضات سرد — `GameState.mode`
| الموضة | شنوّة تعمل الأپليكاسيون |
|---|---|
| **سرد مساعد** (`assisted`) | تقودك خطوة بخطوة: تنادي كل دور، تعطيك الكلام، تحسب الموتى والأصوات، تعرف شكون ربح |
| **موزّع بسيط** (`simple`) | تقسّم الكارطات، تعطيك **جدول شكون خذا شنوّة** (قابل للتخبية)، كرونو، عدّاد الأحياء، وترتيب الليل متاع طبقتك برك |

الموضة البسيطة في `src/screens/Simple.tsx` — ما فيهاش منطق لعب، المعلّم
يسوق بروحو ويعلّم على اللي طار بضغطة.

### 5. 🌙 ترتيب الفيقان (مفروض من المعلّم)
`NIGHT_ORDER` مُصدّر من `engine.ts` :

```
alien → barbier → cupidon → enfant_sauvage → loup_rouge → salvateur → berger
→ loup_garou → grand_mechant_loup → loup_pere_infecte → voyante → renard
→ sorciere → pyromane → detective → corbeau → ancien_sage
→ lovers_recognize → loup_noir
```

* **الليلة 1** : الـ `voleur` يتزاد قبل الكل ؛ `cupidon` و`enfant_sauvage`
  يفيقو ؛ `lovers_recognize` (« Cupidon encore ») قبل الـ `loup_noir`.
* **من الليلة 2** : يتزاد **`loup_pere_infecte` بعد الذيابة**.
* القفزات : `grand_mechant_loup` كان مات ذيب · `renard` كان خسر قدرتو ·
  `berger` كان ما بقاش خروف · `barbier` كان طلق · `sorciere` كان كمّلت
  الزوز قرعات · كل دور حومة كان الـ `ancien_sage` إتلنشى.

### 6. 💾 التركيبات المحفوظة — `src/services/presets.ts`
* **طبقات سريعة جاهزة : 8 / 10 / 12 لاعب.**
* زرّ « 💾 سجّل » في `Setup` يحفظ الباكي الحالي باسم.
* التركيبات تتسجّل في `localStorage` (`lgbt.presets`) + Capacitor Preferences،
  تلقاهم في شاشة « 🎬 طبقة جديدة »، تنجّم **تعاود تستعملهم، تبدّلهم، ولّا تمسحهم**.

### التنقّل الجديد
```
Home ─┬─ 📖 Codex (دليل الأدوار)
      ├─ ⚙️ Settings
      └─ Start (موضة السرد + طبقة سريعة/مخصّصة)
            └─ Setup ─ Deal ─┬─ assisted → Night/Day/Vote/End
                             └─ simple   → Simple
```

### التحقّق
* `tsc --noEmit` → **0 خطأ**
* `npm run sim 300` → **300 طبقة، 0 خطأ، 0 مبلوكية**
* esbuild bundle → بلا تحذير


---

## الخطوة 7 — الحلّة التونسية + الـ iPhone بلا Mac

### 🎨 الديكور — médina de nuit
Quatre couches de fond fixes (`<BgDecor/>`, `src/components/ornaments.tsx`) :

| Couche | Contenu |
|---|---|
| `sky` | dégradé radial nuit/jour, bascule en 0,6 s |
| `zellige` | trame **khatim** (étoile à 8 branches de Nabeul) + treillis **moucharabieh**, dérive lente de 90 s |
| `stars` + `moon` | ciel étoilé scintillant + halo de lune qui respire — masqués en mode jour |
| `skyline` + `windows` | **silhouette de médina** (coupoles, 3 minarets, finials) avec fenêtres allumées qui vacillent |

Ornements SVG réutilisables, zéro réseau : `<Khomsa/>` (main de Fatma avec
l'œil), `<Lantern/>` (fanous de cuivre qui se balance, flamme animée),
`<Khatim/>`, `<Crescent/>`, `<Frieze/>` (frise berbère), `<Bab/>` (porte
cloutée de Sidi Bou Saïd), `<OrnateTitle/>`.

### ✍️ L'écriture
**Polices embarquées en local** (`public/fonts/`, 220 Ko, aucun appel réseau) :
* **Aref Ruqaa** — calligraphie Ruq'ah pour tous les titres et les répliques du narrateur
* **Tajawal** — sans-serif arabe moderne pour l'interface (4 graisses)

Découpage `unicode-range` arabe/latin pour ne charger que le nécessaire.

### 🎬 Les animations
`screen-in` (entrée d'écran) · `.stagger` (cascade des cartes) · `card-in`
(carte de rôle qui arrive en 3D) · `sheen` (balayage doré sur les boutons
principaux) · `twinkle` · `breathe` · `drift` · `sway` (lanterne) ·
`heartbeat` (chrono < 20 s) · `float` + `fab-in` (bouton flottant) ·
`pop`/`fade` (modales). Tout est désactivé sous `prefers-reduced-motion`.

### 📱 Tenue « application native »
`overscroll-behavior: none` (pas de rebond) · `user-select: none` sauf les
champs · `-webkit-touch-callout: none` · `touch-action: manipulation` ·
`100dvh` · **safe-areas** sur les 4 côtés (encoche, Dynamic Island, barre
gestuelle) · barres sticky avec `backdrop-filter` · ascenseurs masqués ·
retour **haptique** (`tap()`) · écran de démarrage anti-flash blanc dans
`index.html`.

### 🍎 iOS sans Mac
Guide complet : **[`docs/02-ios-bla-mac.md`](docs/02-ios-bla-mac.md)**.

| Voie | Coût | Temps | Validité |
|---|---|---|---|
| **A · PWA** (recommandée) | 0 € | 2 min | illimitée |
| **B · GitHub Actions → IPA** | 0 € (dépôt public) | ~30 min | 7 j (Apple ID gratuit) |
| **C · TestFlight / App Store** | 99 $/an | 2–4 h | illimitée |

Fichiers livrés : `public/manifest.webmanifest`, `public/sw.js` (hors-ligne
complet), métadonnées iOS dans `index.html`, `apple-touch-icon.png` 180²,
`icon-maskable-512.png`, `.github/workflows/ios.yml` (signé ou non signé),
`codemagic.yaml`.


---

## الخطوة 8 — تصليح بناء الأندرويد

### الخطأ
```
Dependency 'androidx.core:core-ktx:1.17.0' requires ... compile against version 36 or later
Dependency 'androidx.core:core:1.17.0' requires Android Gradle plugin 8.9.1 or higher.
This build currently uses Android Gradle plugin 8.7.2.
```

### السبب الحقيقي
`@capacitor/cli` كان **7.6.10** والباقي (`core`, `android`, plugins) **8.6.0**.
مجلّد `android/` تولّد من قالب Capacitor 7 (compileSdk 35 · AGP 8.7.2 ·
minSdk 23)، أما پلاڤينات Capacitor 8 تلزمها compileSdk 36 و AGP 8.13.

وأكثر من هكّا : **`@capacitor/camera` يكتب `androidx.core:core-ktx:1.17.0`
قاسح في الكود**، بلا متغيّر — معناها تثبيت `androidxCoreVersion` في
`variables.gradle` ما ينفع شيء.

### التصليح

| ملفّ | قبل | بعد |
|---|---|---|
| `@capacitor/cli` | 7.6.10 | **8.6.0** |
| `android/build.gradle` | AGP 8.7.2 | **AGP 8.13.0** |
| | google-services 4.4.2 | **4.4.4** |
| `gradle-wrapper.properties` | Gradle 8.11.1 | **Gradle 8.14.3** |
| `android/variables.gradle` | compileSdk/targetSdk 35 | **36** |
| | minSdk 23 | **24** |
| | androidx.core 1.15.0 | **1.17.0** (+ 10 autres alignées) |
| `android/gradle.properties` | `-Xmx1536m` | **`-Xmx2560m`** + metaspace |
| `ios/.../project.pbxproj` | iOS 14.0 | **iOS 15.0** |
| `Podfile` | platform 14 | **15.0** |

القيم مأخوذة **حرفيًا** من قالب Capacitor 8 الرسمي
(`node_modules/@capacitor/cli/assets/android-template.tar.gz`).

### نتائج جانبية لازم تعرفها
* **Node ≥ 22 صار إجباري** (Capacitor 8). زيد `engines` في `package.json`،
  و workflows الـ CI الكلّ تبدّلو لـ Node 22.
* **minSdk 24** → ما عادش يخدم على Android 6.0. 24 = Android 7.0 (2016).
* **targetSdk 36** (Android 16) → الـ edge-to-edge صار إجباري. الـ CSS متاعنا
  يستعمل `env(safe-area-inset-*)` في كل بلاصة من الخطوة 7، فما فمّاش مشكل.
* **JDK 21 لازم** (`capacitor.build.gradle` يحطّ `VERSION_21`).

### CI جديدة
[`.github/workflows/android.yml`](.github/workflows/android.yml) — Node 22،
JDK 21، SDK 36، يبني الـ APK ويعطيك ياه artefact. يخدم على **Linux** (بلا
ضرب ×10 متاع ماك).


---

## الخطوة 9 — التوزيع بالـ QR *(متجاوزة — شوف الخطوة 10)*

> ⚠️ **هاذ الخطوة تبدّلت.** الـ QR متاع توزيع الكارطات **تنحّى**.
> الـ QR اليوم معناه حاجة وحدة برك: **تدخل بيه لروم المعلّم**.
> اللي تحت يبقى كان للتاريخ.

### المشكلة
في الـ APK، كبسة « إعمل روم » تبقى تدوّر بلا ما يطلع كود. السبب ماهوش
باڤ في العرض — هو **معماري**:

```js
const wsURL = () => `${proto}://${location.host}/ws`   // → ws://localhost/ws
```

Capacitor يخدم الواجهة من `localhost` جوّا التيليفون. يعني الكود كان
يحاول يحلّ WebSocket **على التيليفون روحو**، أما `server/index.mjs` هو
پروسّي Node ما يوجد كان على PC. ما ينجّمش يتحطّ في الـ APK. النتيجة:
الاتصال يطيح، يعاود في loop، والصالون يبقى يدوّر للأبد.

**الخلاصة: موضة « روم » ما خدمتش عمرها على تيليفون وحدو.**

### الحلّ — QR، بلا سيرفور خالص

| | |
|---|---|
| **المعلّم** | في `Setup` يختار **« توزيع بالـ QR »**، وبعد يضغط على إسم كل لاعب → يطلع كود QR |
| **اللاعب** | يحلّ الأپليكاسيون → **« 📷 إمسح الكارطة متاعي »** → يصوّب الكاميرا → كارطتو تتحلّ |
| **الشبكة** | 🚫 حتّى شيء. لا واي فاي، لا إنترنت، لا سيرفور |

الكارطة تتسجّل في تيليفون اللاعب (`localStorage`) — ينجّم يسكّر ويحلّ
ويلقاها. الـ QR فيه بين **67 و 78 أوكتي** برك → مربّع **41×41** يتقرا
بسرعة، بمستوى تصحيح **Q** (يتقرا حتّى كان الشاشة موسخة شويّة).

### الملفات
| ملفّ | دورو |
|---|---|
| `src/services/qr.ts` | ترميز/فكّ الحمولة + توليد المصفوفة + ذاكرة اللاعب |
| `src/components/QrCode.tsx` | عرض الـ QR في SVG مع إطار زليج |
| `src/components/Scanner.tsx` | الكاميرا: `BarcodeDetector` كان موجود، وإلّا `jsQR` (يتحمّل كان يلزم برك) |
| `src/screens/QrDeal.tsx` | شاشة المعلّم: قائمة اللعّابة + تقدّم + QR لكل واحد |
| `src/screens/PlayerCard.tsx` | شاشة اللاعب: مسح + كارطة كاملة |

### اللي تمسح
`src/net/room.ts` · `src/screens/Lobby.tsx` · `src/screens/PlayerApp.tsx` ·
`server/index.mjs` · پروكسي `/api` و `/ws` من `vite.config.ts` ·
سكريبت `server` · حزم `express`, `ws`, `concurrently` ·
إذن `ACCESS_WIFI_STATE` · `NSLocalNetworkUsageDescription`.

**ما بقاش حتّى ذكر لـ `localhost` ولا لحاجة تقنية قدّام المستعمل.**

### أذونات جديدة
* Android: `android.permission.CAMERA` + `uses-feature camera required=false`
* iOS: `NSCameraUsageDescription` بالدارجة

### حجم الباكي
`jsQR` (130 كيلو) يتحمّل **كان وقت الحاجة برك** (`import()` ديناميكي)، خاطر
أغلبية التيليفونات الحديثة عندها `BarcodeDetector` مدمج. الباكي الأساسي
**301 كيلو** عوض 430.


---

## 📡 الخطوة 10 — الروم على الواي فاي

ثلاث طرق باش توزّع الكارطات، إختار اللي يناسبك:

| الطريقة | تحتاج واي فاي؟ | تحتاج تيليفونات؟ | كيفاش |
|---|---|---|---|
| 📱 تمرير التيليفون | ❌ | تيليفون واحد | التيليفون يدور على اللعّابة |
| 📡 عبر الروم | ✅ واي فاي محلّي | كلّ واحد تيليفونو | الكارطات تمشي وحدها |

**الـ QR معناه حاجة وحدة برك: تدخل بيه لروم المعلّم.** ما عادش فمّا QR للكارطات.

### الترتيب الصحيح

**المعلّم يضبط الأوّل، واللعّابة يدخلو من بعد** — موش العكس.

```
1️⃣ ضبط          2️⃣ الروم تتحلّ        3️⃣ الكارطات
نوع السرد        الكود + الـ QR        تمشي للتيليفونات
الأدوار          البلايص تتعمّر
قدّاش لعّاب       وحدة وحدة
```

الروم **ما تتحلّش قبل** ما يكمّل المعلّم الإعدادات. كي تتحلّ، البلايص
تكون معروفة بعددها (مثلاً 8)، وكل لاعب يدخل ياخذ بلاصة. اللي ما دخلش،
كارطتو تتبيّن في تيليفون المعلّم وهو يوريهالو بيدو.

### كيفاش يخدم

تيليفون المعلّم **هو** اللي يلمّ اللعّابة — ما فمّاش سيرفور في الإنترنت، ما فمّاش حساب،
ما فمّاش داتا تخرج من الدار. الكل يبقى بين التيليفونات على نفس الواي فاي.

**المعلّم:** الصفحة الأولى ← `📡 إعمل روم على الواي فاي`. يطلعلو **كود 5 حروف** و**QR**.

**اللعّابة:** الصفحة الأولى ← `🚪 إدخل لروم`، وبعد:
- **يمسحو الـ QR** — أسرع وأضمن حاجة، وإلّا
- **يكتبو الكود** متاع 5 حروف.

> ⚠️ لازمكم **الكل على نفس الواي فاي** (ولّا نفس نقطة الاتصال متاع المعلّم).
> ما تحتاجوش إنترنت — برك الراوتر.

### ليش الكود 5 حروف برك؟

الكود فيه **آخر رقمين من عنوان المعلّم في الشبكة** مكتوبين بـ base36.
مثال: `192.168.1.42` → `1×256 + 42 = 298` → `008A` + حرف عشوائي → **`008AK`**.

كي تكتب الكود، التيليفون متاعك يرجّع الرقمين ويجرّب في نفس الوقت البدايات
المعروفة (`192.168.` · `10.0.` · `172.16.` …) ويقعد مع أوّل وحدة تجاوب.
هكّا ما يلزمناش حتّى حاجة تلوّج في الشبكة، والكود يبقى قصير وسهل يتقال بالفم.

### الجانب التقني

- **المضيف (المعلّم):** پلوغان أندرويد `LanRoom`
  (`android/app/src/main/java/tn/houma/loupgaroubeltounsi/LanRoomPlugin.java`)
  يحلّ **WebSocket hub** على المنفذ `8787` بـ `org.java-websocket:Java-WebSocket:1.6.0`.
  الپلوغان **ما فيه حتّى منطق لعب** — برك يمرّر النصوص. اللعب الكل في TypeScript.
- **الضيف (اللعّاب):** `WebSocket` عادي متاع المتصفّح → **ما يحتاج حتّى كود طبيعي**.
  يعني **الآيفون والـ PWA ينجّمو يدخلو للروم** عادي. برك المعلّم لازمو أندرويد.
- `androidScheme` ولّى **`http`** باش `ws://` ما يتبلوكاش كـ mixed content.
  `http://localhost` يبقى *secure context* فما الكاميرا تخدم عادي.
- iOS: `NSAllowsLocalNetworking` + `NSLocalNetworkUsageDescription` باش يدخل للروم.

### شنوّة اتنحّى

| الملف | علاش |
|---|---|
| `src/screens/QrDeal.tsx` | التوزيع بالـ QR تنحّى |
| `src/screens/PlayerCard.tsx` | الكارطة توصل عبر الروم، ما عادش تتمسح |
| `encodeCard` · `decodeCard` · `saveMyCard` … | ما بقاش فمّا QR للكارطات |

`src/services/qr.ts` تقلّص لدالة وحدة: `qrSvgPath` — ترسم الـ QR متاع الروم برك.

### شنوّة اتّحقّق

| الفحص | النتيجة |
|---|---|
| `javac` على الپلوغان (مع stubs) | ✅ يكومبيلي بلا غلطة |
| كود ⇄ عنوان، ذهاب وإياب | ✅ 10 عناوين · 0 تصادم في 1924 تركيبة |
| البروتوكول كامل على WebSocket حقيقي | ✅ 10 فحوصات |
| دخول · كود غالط · أسماء بالعربي · بعث الكارطات · إشارة 🔫 · خروج | ✅ |
| ما فمّاش مضيف → يفشل في 1.8 ثانية بلا ما يعلّق | ✅ |

> ⚠️ **صراحة:** الپلوغان الطبيعي **تثبّتت منّو السينتاكس برك** (`javac` + stubs).
> ما ثمّاش Android SDK ولا Gradle في هاذ البيئة، فما تنجّمش تتبنى APK حقيقية هوني
> ولا يتجرّب الهاب على تيليفون. البروتوكول رواحو تجرّب كامل على WebSocket حقيقي في Node.
> أوّل بنية APK لازم تتعمل عبر `.github/workflows/android.yml`.


---

## 🎨 الخطوة 11 — الزخرفة في كل الشاشات

الزخارف التونسية (`src/components/ornaments.tsx`) ولّات في **الشاشات الكل**،
ما بقاتش كان في الصفحة الأولى.

| الشاشة | زيد فيها |
|---|---|
| `Start` | عناوين مزخرفة · هلال · فريز · خمسة في الحكمة |
| `Codex` | عنوان مزخرف للترتيب · فريز · هزّة خفيفة في الضغط |
| `Setup` | عناوين مزخرفة في 3 بلايص |
| `Night` | 🌙 هلال حذا إسم الدور · فريز تحت العنوان |
| `Day` | «ليلة بيضا» في قوس · كرونو بخمسة في الحكمة · عناوين مزخرفة |
| `End` | قوس كامل للربح · خمسة بلون الفريق · فريز · عناوين مزخرفة |
| `Settings` | عنوان مزخرف · فواصل للفرق · فريز |
| `Simple` | 4 عناوين مزخرفة · كرونو مزيّن |

زيد: **هزّة خفيفة** (`tap()`) على كل زرّ إختيار، باش الضغط يتحسّ.

### فحص بالعين

الشاشات تصوّرو وحدة وحدة بـ Playwright (400×900) باش نتثبّتو إلّي
الزخرفة ما تزاحمش القراية. الـ `.arch` والـ `khomsa-wm` والـ `Frieze` الكل
يبانو مليح في الليل وفي النهار.

### فحص الشبكة

```
npm run test:lan     # 30 فحص: الكود ⇄ العنوان · البروتوكول كامل
```

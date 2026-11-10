# 🍎 كيفاش تحطّ الأپليكاسيون على الـ iPhone بلا ما تشري Mac

> **الخلاصة في سطر** : Xcode يخدم كان على macOS — أما **Mac في السحاب** ينجّم
> يبنيلك. وإذا ما تحبّش تدفع حتّى مليم، الـ **PWA** تعطيك الأپليكاسيون على
> الـ iPhone في دقيقتين، بلا Mac وبلا App Store وبلا 99 $.

Trois voies, de la plus simple à la plus officielle. **Commence par la voie A** —
pour ce jeu (100 % hors-ligne, pas de capteurs exotiques) elle suffit largement.

---

## 🟢 Voie A — PWA : l'app sur l'iPhone en 2 minutes, 0 €

C'est déjà configuré dans ce dépôt (`public/manifest.webmanifest` + `public/sw.js`).
Une fois le site publié en **HTTPS**, chaque joueur fait :

> **Safari** (obligatoire, pas Chrome) → bouton **Partager** ⬆️ →
> **« Sur l'écran d'accueil »** → **Ajouter**

Et c'est tout. L'icône apparaît sur l'écran d'accueil, l'app s'ouvre en
**plein écran sans barre Safari**, et grâce au service worker elle
**fonctionne entièrement hors connexion** — ce qui est exactement ce dont
le jeu a besoin.

### Publier gratuitement en HTTPS

| Hébergeur | Commande | Gratuit |
|---|---|---|
| **Netlify** | glisser-déposer le dossier `dist/` sur app.netlify.com/drop | ✅ |
| **Vercel** | `npx vercel --prod` | ✅ |
| **Cloudflare Pages** | connecter le dépôt, build `npm run build`, sortie `dist` | ✅ |
| **GitHub Pages** | workflow ci-dessous | ✅ |

```bash
npm run build      # produit dist/
# puis déposer dist/ chez l'un des quatre
```

> ⚠️ Pour GitHub Pages dans un sous-dossier (`/mon-depot/`), ajoute
> `base: '/mon-depot/'` dans `vite.config.ts`, sinon garde la racine.

### Ce que la PWA ne sait pas faire sur iOS
| | |
|---|---|
| ✅ hors-ligne complet, plein écran, icône, orientation | fonctionne |
| ✅ choix d'images depuis la galerie (`<input type="file">`) | fonctionne |
| ✅ salon LAN entre téléphones | fonctionne |
| ⚠️ vibration (`navigator.vibrate`) | **ignorée par iOS** |
| ⚠️ présence sur l'App Store | impossible, c'est un lien à partager |

Pour ce jeu, seule la vibration est perdue. **C'est le meilleur rapport
effort / résultat.**

---

## 🟡 Voie B — vraie IPA construite par GitHub Actions, 0 € de machine

GitHub prête des **Mac dans le cloud**. Le fichier
[`.github/workflows/ios.yml`](../.github/workflows/ios.yml) est déjà écrit.

```
Tu pousses le code → GitHub allume un Mac → xcodebuild → tu télécharges l'IPA
```

### Lancer le build
1. Pousse le projet sur GitHub (**dépôt public = minutes macOS illimitées et gratuites**).
2. Onglet **Actions** → workflow **iOS** → **Run workflow**.
3. Laisse `signed` sur `false` → ~10 min plus tard, télécharge l'artefact
   **`ios-ipa`** : `LoupGarouBelTounsi-unsigned.ipa`.

> 💰 **Attention au piège** : sur un dépôt **privé**, les minutes macOS comptent
> **×10**. Les « 2 000 minutes gratuites » ne valent qu'environ **200 minutes
> macOS réelles**. Sur un dépôt **public**, c'est gratuit et illimité.

### Installer cette IPA non signée sur ton iPhone, depuis Windows
Une IPA non signée ne s'installe pas telle quelle — il faut la re-signer avec
**ton propre Apple ID** (gratuit) :

| Outil | OS | Validité | Notes |
|---|---|---|---|
| **Sideloadly** | Windows / macOS | **7 jours** avec Apple ID gratuit | le plus simple, iTunes requis sur Windows |
| **AltStore / AltServer** | Windows / macOS | 7 jours, **re-signe tout seul** tant que le PC est allumé | le plus confortable |
| **Apple Configurator** | macOS seulement | — | pas pour toi |

Avec un **compte développeur payant (99 $/an)**, la validité passe à **1 an**
et tu peux installer sur jusqu'à 100 appareils enregistrés.

---

## 🔵 Voie C — TestFlight / App Store (99 $/an, distribution propre)

C'est la seule voie pour que n'importe qui installe le jeu sans bidouille,
et pour une validité illimitée.

### Ce qu'il te faut
1. **Apple Developer Program** — 99 $/an, payable depuis n'importe quel
   navigateur, **aucun Mac nécessaire pour s'inscrire**.
2. Une **clé App Store Connect API** (`.p8`) : App Store Connect → Users and
   Access → Integrations → Team Keys → `+`, rôle **App Manager**.
3. Créer la fiche de l'app dans App Store Connect avec le bundle ID
   `tn.houma.loupgaroubeltounsi`.

### Les secrets à mettre dans GitHub
`Settings → Secrets and variables → Actions → New repository secret` :

| Secret | D'où il vient |
|---|---|
| `APPLE_TEAM_ID` | App Store Connect → Membership (10 caractères) |
| `ASC_KEY_ID` | l'ID de la clé `.p8` |
| `ASC_ISSUER_ID` | en haut de la page Keys |
| `ASC_KEY_P8` | `base64 -w0 AuthKey_XXXX.p8` |
| `IOS_CERT_P12` | certificat de distribution, `base64 -w0 cert.p12` |
| `IOS_CERT_PASSWORD` | le mot de passe du `.p12` |
| `IOS_PROVISIONING_PROFILE` | `base64 -w0 profile.mobileprovision` |

Puis : **Actions → iOS → Run workflow → `signed` = true**.
Le build part tout seul sur TestFlight.

> 💡 **Créer le certificat `.p12` sans Mac** : génère une CSR avec OpenSSL
> (`openssl req -new -newkey rsa:2048 -nodes -keyout ios.key -out ios.csr`),
> téléverse la CSR sur developer.apple.com, télécharge le `.cer`, puis
> `openssl x509 -in ios.cer -inform DER -out ios.pem` et
> `openssl pkcs12 -export -inkey ios.key -in ios.pem -out cert.p12`.
> Alternative beaucoup plus simple : laisser **Codemagic** gérer la signature
> automatiquement (voir ci-dessous).

### Codemagic, l'alternative plus douce
[`codemagic.yaml`](../codemagic.yaml) est déjà écrit. **500 minutes macOS M2
gratuites par mois** sur un compte personnel, et Codemagic **crée les
certificats et profils tout seul** à partir de la clé API — c'est nettement
moins pénible que de fabriquer un `.p12` à la main.

1. codemagic.io → connecte ton dépôt
2. ajoute un groupe de variables `appstore_credentials` avec
   `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_PRIVATE_KEY`
3. lance le workflow **`ios-release`**

---

## 📊 Comparatif

| | Voie A · PWA | Voie B · GitHub Actions | Voie C · TestFlight |
|---|---|---|---|
| Coût | **0 €** | 0 € (dépôt public) | **99 $/an** |
| Mac requis | ❌ | ❌ | ❌ |
| Temps de mise en place | **2 min** | ~30 min | 2–4 h |
| Validité de l'install | **illimitée** | 7 jours (Apple ID gratuit) | illimitée |
| Distribution à des amis | lien à partager | chacun doit sideloader | lien TestFlight propre |
| Hors-ligne | ✅ | ✅ | ✅ |
| Vibration | ❌ | ✅ | ✅ |
| **Recommandé pour ce jeu** | ⭐⭐⭐ | ⭐⭐ | ⭐ |

---

## 🤖 Et Android ?

### ⚠️ Matrice de versions — à respecter strictement

Capacitor 8 impose toute une chaîne. Un seul maillon en retard et le build
casse avec « *requires Android Gradle plugin 8.9.1 or higher* ».

| Élément | Version requise | Où c'est écrit |
|---|---|---|
| **Node.js** | **≥ 22** | `package.json` → `engines` |
| **JDK** | **21** | `android/app/capacitor.build.gradle` |
| **Android Gradle Plugin** | **8.13.0** | `android/build.gradle` |
| **Gradle** | **8.14.3** | `android/gradle/wrapper/gradle-wrapper.properties` |
| **compileSdk / targetSdk** | **36** | `android/variables.gradle` |
| **minSdk** | **24** (Android 7.0) | `android/variables.gradle` |
| **SDK Platform** | `platforms;android-36` | à installer via `sdkmanager` |

> 💡 **Le piège** : `@capacitor/camera` écrit `androidx.core:core-ktx:1.17.0`
> **en dur**, sans variable. Épingler `androidxCoreVersion` dans
> `variables.gradle` ne sert donc à rien — il faut vraiment passer en
> compileSdk 36 + AGP 8.13.

### En local

```bash
node -v        # doit afficher v22 ou plus
java -version  # doit afficher 21

npm ci
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### En CI, sans rien installer

[`.github/workflows/android.yml`](../.github/workflows/android.yml) fait tout :
Node 22, JDK 21, SDK 36, build, puis l'APK en artefact téléchargeable.
Il tourne sur **Linux**, donc sans le multiplicateur ×10 des runners macOS.

> ⚠️ Ce sandbox n'a que Java 11 et aucun SDK Android : l'APK **ne peut pas être
> produit ici**. La configuration a été vérifiée pour sa cohérence, pas par une
> compilation réelle.

---

## ✅ Ma recommandation

1. **Aujourd'hui** : publie `dist/` sur Netlify, et dis aux joueurs
   « Safari → Partager → Sur l'écran d'accueil ». Tout le monde a le jeu
   sur son écran d'accueil, hors-ligne, en deux minutes, gratuitement.
2. **Si tu veux une vraie app** : dépôt GitHub public → workflow `iOS` →
   IPA → Sideloadly.
3. **Si tu veux la distribuer vraiment** : 99 $/an + Codemagic.

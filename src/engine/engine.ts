// ───────────────────────────────────────────────────────────────
//  LOUP GAROU BEL TOUNSI — moteur de jeu
//  Pur, sans dépendance, immuable : chaque fonction rend un state neuf.
// ───────────────────────────────────────────────────────────────
import type { GameState, Player, Step, Memory, Death, Morning, Camp } from './types'
import { role, roleName, roleEmoji, roleCamp } from './data'

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x))
const uid = () => Math.random().toString(36).slice(2, 9)

export const alive = (s: GameState) => s.players.filter(p => p.alive)
export const byId = (s: GameState, id: string) => s.players.find(p => p.id === id)
export const nameOf = (s: GameState, id: string) => byId(s, id)?.name ?? '؟'
export const findRole = (s: GameState, roleId: string) => s.players.find(p => p.roleId === roleId)
export const aliveWithRole = (s: GameState, roleId: string) =>
  s.players.find(p => p.roleId === roleId && p.alive)
export const hasRole = (s: GameState, roleId: string) => !!aliveWithRole(s, roleId)
export const wolves = (s: GameState) => alive(s).filter(p => p.camp === 'loups')

/** Le village a-t-il encore ses pouvoirs ? (Ancien Sage lynché = tout le monde les perd) */
const powered = (s: GameState, p: Player | undefined) =>
  !!p && p.alive && !(s.memory.villagePowersLost && p.camp === 'village')

// ═══════════════════════════════════════════════════════════════
//  CRÉATION
// ═══════════════════════════════════════════════════════════════

export function createGame(
  names: string[],
  rolesInPlay: string[],
  options?: Partial<GameState['options']>,
): GameState {
  const shuffled = shuffle(rolesInPlay)
  const players: Player[] = names.map((name, i) => ({
    id: uid(),
    name: name.trim() || `لاعب ${i + 1}`,
    seat: i,
    roleId: shuffled[i],
    originRoleId: shuffled[i],
    alive: true,
    camp: roleCamp(shuffled[i]),
    lover: false,
    doused: false,
    muted: false,
    bites: 0,
    infected: false,
    lostVote: false,
    deviceId: null,
    deathNight: null,
    deathCause: null,
  }))

  const opts = {
    sheepCount: 3,
    debateSeconds: 180,
    houseRules: {} as Record<string, boolean>,
    useVoleur: rolesInPlay.includes('voleur'),
    ...options,
  }

  const memory: Memory = {
    sheepStart: opts.sheepCount,
    sheepAlive: opts.sheepCount,
    sheepWet: 0,
    salvateurLast: null,
    loupRougeLast: null,
    corbeauTarget: null,
    sorciereHeal: false,
    sorciereKill: false,
    barbierUsed: false,
    infectUsed: false,
    renardLost: false,
    voleurDone: false,
    villagePowersLost: false,
    wolfDied: false,
    enfantModel: null,
    alienAttempts: 0,
    speechDirection: 'cw',
    centerCards: opts.useVoleur ? ['villageois', 'villageois'] : [],
  }

  const s: GameState = {
    phase: 'night', night: 1, day: 0,
    mode: (options as any)?.mode ?? 'assisted',
    players, rolesInPlay,
    memory, queue: [], stepIdx: 0, picks: {},
    lastReveal: null, morning: null, votes: {}, winner: null,
    log: [{ night: 0, phase: 'setup', textAr: 'الطبقة بدات — الكارطات تقسمو.', emoji: '🎴' }],
    options: opts,
  }
  return beginNight(s)
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

// ═══════════════════════════════════════════════════════════════
//  CONSTRUCTION DE LA NUIT
// ═══════════════════════════════════════════════════════════════

/**
 * ORDRE CHRONOLOGIQUE DES RÉVEILS — fixé par le narrateur.
 * À partir de la 2ᵉ nuit, Loup Père Infecte s'intercale juste après les loups.
 * Les rôles absents de la partie sont sautés automatiquement.
 */
export const NIGHT_ORDER = [
  'alien',               // 👽
  'barbier',             // 🔫
  'cupidon',             // 💘 1ʳᵉ nuit
  'enfant_sauvage',      // 🐾 1ʳᵉ nuit
  'loup_rouge',          // 🔴
  'salvateur',           // 🛡️
  'berger',              // 🐑
  'loup_garou',          // 🐺 tous les loups
  'grand_mechant_loup',  // 🐺 (rattaché aux loups)
  'loup_pere_infecte',   // 🩸 à partir de la nuit 2, après les loups
  'voyante',             // 🔮
  'renard',              // 🦊 (rattaché aux rôles d'information)
  'sorciere',            // 🧪
  'pyromane',            // 🔥
  'detective',           // 🕵️
  'corbeau',             // 🐦‍⬛
  'ancien_sage',         // 🧓
  'lovers_recognize',    // ❤️ « Cupidon encore » — les amoureux se reconnaissent
  'loup_noir',           // 🤐
]

export function beginNight(state: GameState): GameState {
  const s = clone(state)
  s.phase = 'night'
  s.picks = {}
  s.lastReveal = null
  s.morning = null
  s.stepIdx = 0
  s.players.forEach(p => { p.muted = false; p.lostVote = false })

  const q: string[] = []
  const first = s.night === 1

  // Le Voleur passe avant tout le monde, la première nuit (règle officielle)
  if (first && hasRole(s, 'voleur')) q.push('voleur')

  for (const rid of NIGHT_ORDER) {
    // étape narrative : les amoureux se reconnaissent (1ʳᵉ nuit seulement)
    if (rid === 'lovers_recognize') {
      if (first && s.players.some(p => p.lover)) q.push(rid)
      continue
    }
    if (!aliveWithRole(s, rid)) continue
    if ((rid === 'cupidon' || rid === 'enfant_sauvage') && !first) continue
    if (rid === 'loup_pere_infecte' && (first || s.memory.infectUsed)) continue
    if (rid === 'grand_mechant_loup' && s.memory.wolfDied) continue
    if (rid === 'renard' && s.memory.renardLost) continue
    if (rid === 'berger' && s.memory.sheepAlive <= 0) continue
    if (rid === 'barbier' && s.memory.barbierUsed) continue
    if (rid === 'sorciere' && s.memory.sorciereHeal && s.memory.sorciereKill) continue
    // l'Ancien Sage lynché prive le village de ses pouvoirs
    if (s.memory.villagePowersLost && roleCamp(rid) === 'village') continue
    q.push(rid)
  }

  // Cupidon a joué ce tour-ci : on garde la reconnaissance en fin de nuit
  if (first && q.includes('cupidon') && !q.includes('lovers_recognize')) {
    q.splice(q.indexOf('loup_noir') >= 0 ? q.indexOf('loup_noir') : q.length, 0, 'lovers_recognize')
  }

  s.queue = q
  return s
}

// ═══════════════════════════════════════════════════════════════
//  ÉTAPE COURANTE
// ═══════════════════════════════════════════════════════════════

export function currentStep(s: GameState): Step | null {
  if (s.phase !== 'night' || s.stepIdx >= s.queue.length) return null
  const key = s.queue[s.stepIdx]
  const others = (excl: string[] = []) => alive(s).filter(p => !excl.includes(p.id)).map(p => p.id)
  const me = (rid: string) => aliveWithRole(s, rid)

  switch (key) {
    case 'voleur': {
      return {
        key, roleId: 'voleur', titleFr: 'Voleur', emoji: '🃏', kind: 'voleur',
        sayAr: role('voleur').sayAr,
        hintAr: 'زوز كارطات مقلوبين في وسط الطاولة. كان الزوز ذيابة → مجبور ياخذ وحدة.',
        options: s.memory.centerCards.map((c, i) => ({ id: String(i), labelAr: roleName(c), emoji: roleEmoji(c) })),
        secret: true,
      }
    }
    case 'cupidon': {
      return {
        key, roleId: 'cupidon', titleFr: 'Cupidon', emoji: '💘', kind: 'pick',
        sayAr: role('cupidon').sayAr, min: 2, max: 2, candidates: alive(s).map(p => p.id),
        hintAr: 'ينجّم يختار روحو. كان الزوز من فرقتين مختلفتين → يولّيو فريق ثالث.',
      }
    }
    case 'lovers_recognize': {
      const l = s.players.filter(p => p.lover)
      return {
        key, roleId: null, titleFr: 'Les Amoureux', emoji: '❤️', kind: 'info',
        sayAr: 'الحبايب يفيقو ويتعارفو... ومن بعد يرجعو يرقدو.',
        hintAr: l.length === 2 ? `${l[0].name} ❤️ ${l[1].name}` : '', secret: true,
      }
    }
    case 'enfant_sauvage': {
      const p = me('enfant_sauvage')!
      return {
        key, roleId: 'enfant_sauvage', titleFr: 'Enfant Sauvage', emoji: '🐾', kind: 'pick',
        sayAr: role('enfant_sauvage').sayAr, min: 1, max: 1, candidates: others([p.id]),
        hintAr: 'كي يموت المودال متاعو، يولّي ذيب.',
      }
    }
    case 'barbier': {
      const p = me('barbier')!
      return {
        key, roleId: 'barbier', titleFr: 'Barbier', emoji: '🔫', kind: 'pick',
        sayAr: 'Le Barbier يفيق. عندك <b>طلقة وحدة</b> في الطبقة الكل — تحبّ تستعملها الليلة؟',
        min: 0, max: 1, candidates: alive(s).filter(x => x.id !== p.id).map(x => x.id),
        hintAr: '🐺 ضرب ذيب ولّا وحداني → يعيش · 🏘️ ضرب واحد من الحومة → يموت معاه. ما يحبّش → عدّي.',
      }
    }
    case 'alien': {
      const p = me('alien')!
      return {
        key, roleId: 'alien', titleFr: 'Alien', emoji: '👽', kind: 'alien',
        sayAr: 'L\'Alien يفيق. تحبّ تحزر على دور واحد الليلة؟',
        min: 0, max: 1, candidates: alive(s).filter(x => x.id !== p.id).map(x => x.id),
        hintAr: `حزر صحّ → الآخر يطير · غلط → الـ Alien يموت. (حاول ${s.memory.alienAttempts} مرّة قبل)`,
      }
    }
    case 'secret_signs': {
      const who = [hasRole(s, 'barbier') && 'Barbier 🔫', hasRole(s, 'alien') && 'Alien 👽'].filter(Boolean).join(' · ')
      return {
        key, roleId: null, titleFr: who, emoji: '🤝', kind: 'info',
        sayAr: 'توّا يتفاهمو مع المعلّم على الإشارة متاعهم — وقت ما يعملوها، نرقّدو الحومة الكل.',
        hintAr: 'في موضة host/join، اللعّاب يضغط البوتون في تيليفونو والمعلّم يوصلو الإشعار.',
      }
    }
    case 'ancien_sage': {
      return {
        key, roleId: 'ancien_sage', titleFr: 'Ancien Sage', emoji: '🧓', kind: 'choice',
        sayAr: role('ancien_sage').sayAr || 'Ancien Sage يفيق. اتّجاه الكلمة لغدوة؟',
        options: [
          { id: 'cw', labelAr: 'مع عقارب الساعة', emoji: '🔃' },
          { id: 'ccw', labelAr: 'ضدّ عقارب الساعة', emoji: '🔄' },
        ],
      }
    }
    case 'voyante': {
      const p = me('voyante')!
      return {
        key, roleId: 'voyante', titleFr: 'Voyante', emoji: '🔮', kind: 'pick',
        sayAr: role('voyante').sayAr, min: 1, max: 1, candidates: others([p.id]), secret: true,
      }
    }
    case 'renard': {
      const p = me('renard')!
      return {
        key, roleId: 'renard', titleFr: 'Renard', emoji: '🦊', kind: 'pick',
        sayAr: role('renard').sayAr, min: 1, max: 1, candidates: alive(s).map(x => x.id),
        hintAr: 'يشمّ الشخص + جارو اليمين + جارو اليسار. كان ما فمّاش ذيب → يخسر قوّتو للآخر.',
        secret: true,
      }
    }
    case 'detective': {
      const p = me('detective')!
      return {
        key, roleId: 'detective', titleFr: 'Détective', emoji: '🕵️', kind: 'pick',
        sayAr: role('detective').sayAr, min: 2, max: 2, candidates: others([p.id]),
        hintAr: 'زوز أشخاص: نفس الكلان ولّا لا؟', secret: true,
      }
    }
    case 'salvateur': {
      const last = s.memory.salvateurLast
      return {
        key, roleId: 'salvateur', titleFr: 'Salvateur', emoji: '🛡️', kind: 'pick',
        sayAr: role('salvateur').sayAr, min: 1, max: 1,
        candidates: alive(s).filter(p => p.id !== last).map(p => p.id),
        hintAr: last ? `ممنوع ${nameOf(s, last)} (حرسو البارح) · ينجّم يحرس روحو` : 'ينجّم يحرس روحو',
      }
    }
    case 'berger': {
      const p = me('berger')!
      return {
        key, roleId: 'berger', titleFr: 'Berger', emoji: '🐑', kind: 'berger',
        sayAr: `Le Berger يفيق. باقيلك ${s.memory.sheepAlive} خرفان — لعند شكون تبعثهم الليلة؟`,
        min: Math.min(s.memory.sheepAlive, Math.max(0, alive(s).length - 1)),
        max: Math.min(s.memory.sheepAlive, Math.max(0, alive(s).length - 1)),
        candidates: others([p.id]),
        hintAr: 'خروف لكل واحد — مجبور يبعثهم الكل. الخبر الصباح بالأعداد برك.',
      }
    }
    case 'corbeau': {
      const p = me('corbeau')!
      return {
        key, roleId: 'corbeau', titleFr: 'Corbeau', emoji: '🐦‍⬛', kind: 'pick',
        sayAr: role('corbeau').sayAr, min: 0, max: 1, candidates: others([p.id]),
        hintAr: 'يزيد +2 صوت على اللي يختارو في ڤوت غدوة.',
      }
    }
    case 'pyromane': {
      const n = Math.max(1, s.memory.sheepStart - 1)
      const dousable = alive(s).filter(p => !p.doused).map(p => p.id)
      return {
        key, roleId: 'pyromane', titleFr: 'Pyromane', emoji: '🔥', kind: 'pyromane',
        sayAr: role('pyromane').sayAr, min: 1, max: Math.min(n, dousable.length),
        candidates: dousable,
        hintAr: `💧 يبلّل حتّى ${n} ناس · 🔥 ولّا يشعل النار في المبلولين الكل (${alive(s).filter(p => p.doused).length} توّا)`,
      }
    }
    case 'loup_rouge': {
      const last = s.memory.loupRougeLast
      const p = me('loup_rouge')!
      return {
        key, roleId: 'loup_rouge', titleFr: 'Loup Rouge', emoji: '🔴', kind: 'pick',
        sayAr: role('loup_rouge').sayAr, min: 0, max: 1,
        candidates: alive(s).filter(x => x.id !== last && x.id !== p.id).map(x => x.id),
        hintAr: `يبلوكي قوّة واحد الليلة — حتّى ذيب. ${last ? 'ممنوع ' + nameOf(s, last) : ''}`,
      }
    }
    case 'loup_garou': {
      const prey = alive(s).filter(p => p.camp !== 'loups').map(p => p.id)
      return {
        key, roleId: 'loup_garou', titleFr: 'Les Loups Garous', emoji: '🐺', kind: 'pick',
        sayAr: role('loup_garou').sayAr, min: 1, max: 1, candidates: prey,
        hintAr: 'الذيب ما ياكلش ذيب.',
      }
    }
    case 'grand_mechant_loup': {
      const victim = s.picks['loup_garou']?.[0]
      const prey = alive(s).filter(p => p.camp !== 'loups' && p.id !== victim).map(p => p.id)
      return {
        key, roleId: 'grand_mechant_loup', titleFr: 'Grand Méchant Loup', emoji: '🐺', kind: 'pick',
        sayAr: role('grand_mechant_loup').sayAr, min: 0, max: 1, candidates: prey,
        hintAr: 'ضحيّة ثانية — طول ما ما مات حتّى ذيب.',
      }
    }
    case 'loup_pere_infecte': {
      const victim = s.picks['loup_garou']?.[0]
      return {
        key, roleId: 'loup_pere_infecte', titleFr: 'Loup Père Infecte', emoji: '🩸', kind: 'choice',
        sayAr: role('loup_pere_infecte').sayAr,
        hintAr: victim ? `ضحيّة الليلة: ${nameOf(s, victim)} — تعدّيلو بدل ما يموت؟ (مرّة وحدة في الطبقة)` : 'ما فمّاش ضحيّة.',
        options: [
          { id: 'yes', labelAr: 'إيه، نعدّيلو', emoji: '🩸' },
          { id: 'no', labelAr: 'لا، يموت', emoji: '💀' },
        ],
      }
    }
    case 'loup_noir': {
      const p = me('loup_noir')!
      return {
        key, roleId: 'loup_noir', titleFr: 'Loup Noir', emoji: '🤐', kind: 'pick',
        sayAr: role('loup_noir').sayAr, min: 0, max: 1,
        candidates: alive(s).filter(x => x.id !== p.id).map(x => x.id),
        hintAr: 'اللي يختارو ما يحكيش غدوة في قعدة الحومة.',
      }
    }
    case 'sorciere': {
      const victim = s.picks['loup_garou']?.[0]
      return {
        key, roleId: 'sorciere', titleFr: 'Sorcière', emoji: '🧪', kind: 'sorciere',
        sayAr: role('sorciere').sayAr,
        hintAr: victim ? `ضحيّة الليلة: ${nameOf(s, victim)}` : 'ما فمّاش ضحيّة الليلة.',
        candidates: alive(s).map(p => p.id), secret: true,
      }
    }
  }
  return null
}

// ═══════════════════════════════════════════════════════════════
//  SOUMISSION D'UNE ÉTAPE
// ═══════════════════════════════════════════════════════════════

export function submitStep(state: GameState, value: any): GameState {
  let s = clone(state)
  const step = currentStep(state)
  if (!step) return s
  s.picks[step.key] = value
  s.lastReveal = null

  switch (step.key) {
    case 'voleur': {
      const p = findRole(s, 'voleur')!
      if (value?.swap === true) {
        const taken = s.memory.centerCards[value.index]
        s.memory.centerCards[value.index] = 'voleur'
        p.roleId = taken
        p.camp = roleCamp(taken)
        s.log.push({ night: 1, phase: 'night', textAr: `Le Voleur بدّل كارطتو.`, emoji: '🃏' })
        s.lastReveal = { titleAr: '🃏 Le Voleur بدّل', bodyAr: `${p.name} ولّا <b>${roleName(taken)}</b> ${roleEmoji(taken)}`, tone: 'neutral' }
        // le nouveau rôle agit-il la 1ʳᵉ nuit ? on l'insère juste après
        if (taken === 'cupidon' && !s.queue.includes('cupidon')) s.queue.splice(s.stepIdx + 1, 0, 'cupidon', 'lovers_recognize')
        if (taken === 'enfant_sauvage' && !s.queue.includes('enfant_sauvage')) s.queue.splice(s.stepIdx + 1, 0, 'enfant_sauvage')
      } else {
        p.roleId = 'villageois'; p.camp = 'village'
        s.lastReveal = { titleAr: '🃏 Le Voleur خلّى كارطتو', bodyAr: `${p.name} ولّا <b>Villageois</b> عادي 🧍`, tone: 'neutral' }
      }
      s.memory.voleurDone = true
      break
    }
    case 'cupidon': {
      const [a, b] = value as string[]
      s.players.forEach(p => { p.lover = p.id === a || p.id === b })
      s.log.push({ night: 1, phase: 'night', textAr: `Cupidon ربط ${nameOf(s, a)} ❤️ ${nameOf(s, b)}`, emoji: '💘' })
      break
    }
    case 'enfant_sauvage': {
      s.memory.enfantModel = value[0]
      break
    }
    case 'ancien_sage': {
      s.memory.speechDirection = value
      break
    }
    case 'voyante': {
      const t = byId(s, value[0])!
      s.lastReveal = {
        titleAr: '🔮 الڤوايانت شافت', tone: 'neutral',
        bodyAr: `<b>${t.name}</b> هو <b>${roleName(t.roleId)}</b> ${roleEmoji(t.roleId)}`,
      }
      break
    }
    case 'renard': {
      const trio = neighbourTrio(s, value[0])
      const found = trio.some(p => p.camp === 'loups')
      if (!found) s.memory.renardLost = true
      s.lastReveal = {
        titleAr: '🦊 الثعلب شمّ', tone: found ? 'bad' : 'good',
        bodyAr: found
          ? `فمّا <b>ذيب</b> في الثلاثة: ${trio.map(p => p.name).join(' · ')} 🐺`
          : `ما فمّاش ذيب في ${trio.map(p => p.name).join(' · ')} — <b>الثعلب خسر قوّتو للآخر</b> 😿`,
      }
      break
    }
    case 'detective': {
      const [a, b] = (value as string[]).map(id => byId(s, id)!)
      const same = clanOf(s, a) === clanOf(s, b)
      s.lastReveal = {
        titleAr: '🕵️ نتيجة التحقيق', tone: same ? 'bad' : 'good',
        bodyAr: `<b>${a.name}</b> و <b>${b.name}</b> ${same ? 'من <b>نفس الكلان</b> ✅' : '<b>موش</b> من نفس الكلان ❌'}`,
      }
      break
    }
    case 'salvateur': {
      s.memory.salvateurLast = value[0]
      break
    }
    case 'corbeau': {
      s.memory.corbeauTarget = value?.[0] ?? null
      break
    }
    case 'loup_rouge': {
      s.memory.loupRougeLast = value?.[0] ?? null
      break
    }
    case 'sorciere': {
      if (value.heal) s.memory.sorciereHeal = true
      if (value.kill) s.memory.sorciereKill = true
      break
    }
    case 'loup_pere_infecte': {
      if (value === 'yes') s.memory.infectUsed = true
      break
    }
    case 'berger':
    case 'barbier':
    case 'alien': {
      // la résolution se fait au matin, dans l'ordre des morts
      break
    }
  }

  s.stepIdx++
  if (s.stepIdx >= s.queue.length) s = resolveNight(s)
  return s
}

/** Permet de refermer la modale de révélation */
export function clearReveal(state: GameState): GameState {
  const s = clone(state); s.lastReveal = null; return s
}

function neighbourTrio(s: GameState, centerId: string): Player[] {
  const ring = alive(s).sort((a, b) => a.seat - b.seat)
  const i = ring.findIndex(p => p.id === centerId)
  if (i < 0) return []
  const n = ring.length
  return n <= 2 ? ring : [ring[(i - 1 + n) % n], ring[i], ring[(i + 1) % n]]
}

export function neighbours(s: GameState, id: string): Player[] {
  const t = neighbourTrio(s, id)
  return t.filter(p => p.id !== id)
}

function clanOf(s: GameState, p: Player): string {
  const mixed = mixedLovers(s)
  if (p.lover && mixed) return 'amoureux'
  if (p.camp === 'solo') return 'solo:' + p.roleId   // chaque solo est l'ennemi de tous
  return p.camp
}

function mixedLovers(s: GameState): boolean {
  const l = s.players.filter(p => p.lover)
  return l.length === 2 && l[0].camp !== l[1].camp
}

// ═══════════════════════════════════════════════════════════════
//  RÉSOLUTION DE LA NUIT
//  loup_rouge_block → salvateur → loups → GMÉL → infection →
//  soin → poison → feu → moutons mouillés → barbier/alien →
//  enfant sauvage → chaîne des amoureux → victoire
// ═══════════════════════════════════════════════════════════════

function resolveNight(state: GameState): GameState {
  const s = clone(state)
  const deaths: Death[] = []
  const notes: string[] = []
  const kill = (id: string | undefined | null, cause: string, emoji: string) => {
    if (!id) return
    const p = byId(s, id)
    if (!p || !p.alive) return
    if (deaths.some(d => d.playerId === id)) return
    deaths.push({ playerId: id, cause, emoji })
  }

  const blocked: string = s.picks['loup_rouge']?.[0] ?? ''
  const isBlocked = (roleId: string) => {
    const p = aliveWithRole(s, roleId)
    return !!p && p.id === blocked
  }

  // 1 · protection
  const guarded = isBlocked('salvateur') ? null : (s.picks['salvateur']?.[0] ?? null)

  // 2 · dévoration
  let victim: string | null = s.picks['loup_garou']?.[0] ?? null
  if (victim && victim === guarded) { notes.push('الذيابة لقاو الباب محروس 🛡️'); victim = null }

  // Ancien Sage : il lui faut 2 morsures
  if (victim) {
    const v = byId(s, victim)!
    if (v.roleId === 'ancien_sage') {
      v.bites++
      if (v.bites < 2) { notes.push(`الشيخ نجا من العضّة (${v.bites}/2) 🧓`); victim = null }
    }
  }

  // 3 · Grand Méchant Loup
  let victim2: string | null = (!s.memory.wolfDied && !isBlocked('grand_mechant_loup'))
    ? (s.picks['grand_mechant_loup']?.[0] ?? null) : null
  if (victim2 && victim2 === guarded) { victim2 = null; notes.push('الضحيّة الثانية كانت محروسة 🛡️') }

  // 4 · infection (remplace la mort)
  if (s.picks['loup_pere_infecte'] === 'yes' && victim && !isBlocked('loup_pere_infecte')) {
    const v = byId(s, victim)!
    v.camp = 'loups'; v.infected = true
    notes.push(`واحد تعدّى وولّى ذيب في السكّات 🩸`)
    victim = null
  }

  // 5 · sorcière
  const w = s.picks['sorciere'] ?? {}
  if (w.heal && victim && !isBlocked('sorciere')) { notes.push('الساحرة حيّات ضحيّة الليلة 💚'); victim = null }
  kill(victim, 'الذيابة كلاوه', '🐺')
  kill(victim2, 'Grand Méchant Loup', '🐺')
  if (w.kill && !isBlocked('sorciere')) kill(w.kill, 'شربة الموت', '🧪')

  // 6 · pyromane
  const py = s.picks['pyromane']
  if (py && !isBlocked('pyromane')) {
    if (py.action === 'douse') {
      (py.targets as string[]).forEach(id => { const p = byId(s, id); if (p) p.doused = true })
    } else if (py.action === 'burn') {
      alive(s).filter(p => p.doused).forEach(p => kill(p.id, 'النار 🔥', '🔥'))
      // les moutons mouillés brûlent aussi
      if (s.memory.sheepWet > 0) {
        notes.push(`🔥 ${s.memory.sheepWet} خروف مبلول تحرقو زادة`)
        s.memory.sheepAlive = Math.max(0, s.memory.sheepAlive - s.memory.sheepWet)
        s.memory.sheepWet = 0
      }
      s.players.forEach(p => { p.doused = false })
    }
  }

  // 7 · Berger — tout le troupeau, rapport public anonyme
  let bergerReport: Morning['bergerReport'] = null
  const bergerTargets: string[] = s.picks['berger'] ?? []
  if (bergerTargets.length && !isBlocked('berger')) {
    let dead = 0, wet = 0, safe = 0
    for (const id of bergerTargets) {
      const t = byId(s, id)!
      if (t.camp === 'loups') dead++
      else if (t.roleId === 'pyromane' || t.doused) wet++
      else safe++
    }
    s.memory.sheepAlive = Math.max(0, s.memory.sheepAlive - dead)
    s.memory.sheepWet = Math.min(s.memory.sheepAlive, s.memory.sheepWet + wet)
    bergerReport = { dead, wet, safe }
  }

  // 7bis · Barbier 🔫 et Alien 👽 (créneau « barbier_or_alien_strike »)
  const bTarget: string | undefined = s.picks['barbier']?.[0]
  if (bTarget && !s.memory.barbierUsed && !isBlocked('barbier')) {
    s.memory.barbierUsed = true
    const b = aliveWithRole(s, 'barbier')!
    const t = byId(s, bTarget)!
    const good = t.camp === 'loups' || t.camp === 'solo'
    kill(t.id, 'طلقة الـ Barbier 🔫', '🔫')
    if (!good) { kill(b.id, 'طلقتو طاحت في غير بلاصتها', '💀'); notes.push('🔫 الـ Barbier ضرب واحد من الحومة — مات معاه') }
    else notes.push('🔫 الـ Barbier ضرب في بلاصتها — عايش')
  }
  const aPick = s.picks['alien']
  if (aPick?.target && !isBlocked('alien')) {
    s.memory.alienAttempts++
    const a = aliveWithRole(s, 'alien')!
    const t = byId(s, aPick.target)!
    if (t.roleId === aPick.guess) { kill(t.id, 'الـ Alien عرف دورو 👽', '👽'); notes.push('👽 الـ Alien حزر صحّ') }
    else { kill(a.id, 'الـ Alien غلط وانكشف', '💀'); notes.push('👽 الـ Alien غلط — مات') }
  }

  // 8 · Loup Noir
  const mutedId = isBlocked('loup_noir') ? null : (s.picks['loup_noir']?.[0] ?? null)
  if (mutedId) { const p = byId(s, mutedId); if (p) p.muted = true }

  // 9 · application des morts + chaînes
  const m = applyDeaths(s, deaths)

  const morning: Morning = {
    night: s.night,
    deaths: m.deaths,
    bergerReport,
    oursGrowl: computeOurs(s),
    muted: mutedId,
    rumour: s.options.houseRules?.nmima ? makeRumour(s) : null,
    notes,
  }
  s.morning = morning
  s.phase = 'morning'
  s.day = s.night
  s.log.push({ night: s.night, phase: 'morning', emoji: '🌅', textAr: m.deaths.length ? `الصباح: ${m.deaths.map(d => nameOf(s, d.playerId)).join(' · ')} طارو.` : 'الصباح: حتّى حدّ ما مات — ليلة بيضا.' })
  return checkVictory(s)
}

/** Tue, puis déclenche Enfant Sauvage + chaîne des amoureux */
function applyDeaths(s: GameState, deaths: Death[]): { deaths: Death[] } {
  const out: Death[] = []
  const queue = [...deaths]

  while (queue.length) {
    const d = queue.shift()!
    const p = byId(s, d.playerId)
    if (!p || !p.alive) continue
    p.alive = false; p.deathNight = s.night; p.deathCause = d.cause
    out.push(d)
    if (p.camp === 'loups') s.memory.wolfDied = true
    if (p.roleId === 'ancien_sage' && d.cause === 'حكم الحومة') s.memory.villagePowersLost = true

    // Enfant Sauvage : son modèle meurt → il devient loup
    if (s.memory.enfantModel === p.id) {
      const e = s.players.find(x => x.roleId === 'enfant_sauvage' && x.alive)
      if (e) { e.camp = 'loups'; s.log.push({ night: s.night, phase: s.phase, emoji: '🐾', textAr: `المودال متاع Enfant Sauvage مات — ولّى ذيب.` }) }
    }

    // amoureux : l'autre meurt de chagrin
    if (p.lover) {
      const other = s.players.find(x => x.lover && x.id !== p.id && x.alive)
      if (other) queue.push({ playerId: other.id, cause: 'مات بالقهر على حبيبو', emoji: '💔' })
    }
  }
  return { deaths: out }
}

function computeOurs(s: GameState): boolean {
  const o = aliveWithRole(s, 'ours')
  if (!o) return false
  return neighbours(s, o.id).some(p => p.camp === 'loups')
}

// ═══════════════════════════════════════════════════════════════
//  JOUR
// ═══════════════════════════════════════════════════════════════

export function goDebate(state: GameState): GameState {
  const s = clone(state); s.phase = 'debate'; return s
}

export function goVote(state: GameState): GameState {
  const s = clone(state)
  s.phase = 'vote'
  s.votes = {}
  alive(s).forEach(p => { s.votes[p.id] = 0 })
  if (s.memory.corbeauTarget && byId(s, s.memory.corbeauTarget)?.alive) {
    s.votes[s.memory.corbeauTarget] = 2
  }
  return s
}

export function setVote(state: GameState, playerId: string, n: number): GameState {
  const s = clone(state); s.votes[playerId] = Math.max(0, n); return s
}

/** Exécute le lynchage. `servante` = id de la Servante Dévouée si elle se dévoue. */
export function lynch(state: GameState, playerId: string | null, servante?: string | null): GameState {
  let s = clone(state)
  s.memory.corbeauTarget = null

  if (playerId) {
    const victim = byId(s, playerId)!
    if (servante) {
      const sv = byId(s, servante)
      if (sv && sv.alive && sv.roleId === 'servante_devouee' && !sv.lover) {
        // elle prend le rôle du lynché, pouvoir réinitialisé
        sv.roleId = victim.roleId
        sv.camp = roleCamp(victim.roleId)
        victim.roleId = 'villageois'
        s.log.push({ night: s.night, phase: 'vote', emoji: '🧕', textAr: `La Servante Dévouée خذات كارطة اللي طار.` })
      }
    }
    applyDeaths(s, [{ playerId, cause: 'حكم الحومة', emoji: '✋' }])
    s.log.push({ night: s.night, phase: 'vote', emoji: '✋', textAr: `الحومة رفعت يديها على ${victim.name} — طار.` })
  } else {
    s.log.push({ night: s.night, phase: 'vote', emoji: '🤷', textAr: 'الحومة ما تفاهمتش — حتّى حدّ ما طار.' })
  }

  s = checkVictory(s)
  if (!s.winner) { s.night++; s = beginNight(s) }
  return s
}

// ═══════════════════════════════════════════════════════════════
//  ACTIONS À LA DEMANDE — Barbier 🔫 · Alien 👽
// ═══════════════════════════════════════════════════════════════

export function barbierShoot(state: GameState, targetId: string): GameState {
  let s = clone(state)
  const b = aliveWithRole(s, 'barbier')
  if (!b || s.memory.barbierUsed) return s
  s.memory.barbierUsed = true
  const t = byId(s, targetId)!
  const good = t.camp === 'loups' || t.camp === 'solo'
  const dd: Death[] = [{ playerId: t.id, cause: 'طلقة الـ Barbier 🔫', emoji: '🔫' }]
  if (!good) dd.push({ playerId: b.id, cause: 'طلقتو طاحت في غير بلاصتها', emoji: '💀' })
  applyDeaths(s, dd)
  s.lastReveal = {
    titleAr: good ? '🔫 طلقة في بلاصتها' : '🔫 طلقة ضايعة',
    bodyAr: good
      ? `<b>${t.name}</b> كان <b>${roleName(t.roleId)}</b> — الـ Barbier <b>يعيش</b> ✅`
      : `<b>${t.name}</b> كان <b>${roleName(t.roleId)}</b> من الحومة — الـ Barbier <b>مات معاه</b> 💀`,
    tone: good ? 'good' : 'bad',
  }
  s.log.push({ night: s.night, phase: s.phase, emoji: '🔫', textAr: `Le Barbier طلق على ${t.name}.` })
  return checkVictory(s)
}

export function alienGuess(state: GameState, targetId: string, guessRoleId: string): GameState {
  let s = clone(state)
  const a = aliveWithRole(s, 'alien')
  if (!a) return s
  s.memory.alienAttempts++
  const t = byId(s, targetId)!
  const ok = t.roleId === guessRoleId
  applyDeaths(s, ok
    ? [{ playerId: t.id, cause: 'الـ Alien عرف دورو 👽', emoji: '👽' }]
    : [{ playerId: a.id, cause: 'الـ Alien غلط وانكشف 👽', emoji: '💀' }])
  s.lastReveal = {
    titleAr: ok ? '👽 صحّ!' : '👽 غلط',
    bodyAr: ok
      ? `<b>${t.name}</b> كان فعلاً <b>${roleName(guessRoleId)}</b> — طار 💀`
      : `<b>${t.name}</b> كان <b>${roleName(t.roleId)}</b>، موش ${roleName(guessRoleId)} — <b>الـ Alien مات</b> 💀`,
    tone: ok ? 'good' : 'bad',
  }
  s.log.push({ night: s.night, phase: s.phase, emoji: '👽', textAr: `Alien حزر على ${t.name}: ${ok ? 'صحّ' : 'غلط'}.` })
  return checkVictory(s)
}

// ═══════════════════════════════════════════════════════════════
//  VICTOIRE
// ═══════════════════════════════════════════════════════════════

export function checkVictory(state: GameState): GameState {
  const s = clone(state)
  const a = alive(s)
  const lovers = a.filter(p => p.lover)
  const solos = a.filter(p => p.camp === 'solo')
  const w = a.filter(p => p.camp === 'loups')

  const win = (camp: string, labelAr: string, ids: string[]) => {
    s.winner = { camp, labelAr, playerIds: ids }
    s.phase = 'end'
    s.log.push({ night: s.night, phase: 'end', emoji: '🏆', textAr: labelAr })
    return s
  }

  if (a.length === 0) return win('personne', 'الحومة كلها فنيت — حتّى حدّ ما ربح 💀', [])

  // amoureux mixtes seuls survivants
  if (lovers.length === 2 && a.length === 2 && mixedLovers(s))
    return win('amoureux', '💔 الحبايب ربحو — بقاو هوما الزوز!', lovers.map(p => p.id))

  // un solo seul survivant
  if (a.length === 1 && solos.length === 1)
    return win('solo', `${solos[0].camp === 'solo' ? roleEmoji(solos[0].roleId) : '🔥'} ${roleName(solos[0].roleId)} ربح وحدو!`, [solos[0].id])

  if (w.length === 0 && solos.length === 0)
    return win('village', '🏘️ الحومة ربحت — الذيابة الكل طارو!', a.map(p => p.id))

  if (w.length > 0 && solos.length === 0 && w.length >= a.length - w.length)
    return win('loups', '🐺 الذيابة ربحو — ولّاو أغلبيّة في الحومة!', w.map(p => p.id))

  return s
}

// ═══════════════════════════════════════════════════════════════
//  DIVERS
// ═══════════════════════════════════════════════════════════════

/** قانون الحسّ — اللي حكى في الليل يخسر صوتو غدوة */
export function setLostVote(state: GameState, id: string, v: boolean): GameState {
  const s = clone(state)
  const p = byId(s, id); if (p) p.lostVote = v
  if (v) s.votes[id] = 0
  return s
}

/**
 * قانون النميمة — كل صباح خبر: نصّو صحيح نصّو كذب، بالزهر.
 * الصحيح يتبنى على حالة الطبقة الحقيقيّة، والكذب يتبنى على عكسها.
 */
function makeRumour(s: GameState): { textAr: string; trueOne: boolean } | null {
  const a = alive(s)
  if (a.length < 4) return null
  const trueOne = Math.random() < 0.5
  const pickOne = <T,>(x: T[]) => x[Math.floor(Math.random() * x.length)]
  const ring = [...a].sort((x, y) => x.seat - y.seat)
  const wolvesAlive = a.filter(p => p.camp === 'loups')
  const villagers = a.filter(p => p.camp !== 'loups')

  const kinds = [
    () => {
      // « فمّا ذيب بين فلان وفلان »
      const i = Math.floor(Math.random() * ring.length)
      const trio = [ring[(i - 1 + ring.length) % ring.length], ring[i], ring[(i + 1) % ring.length]]
      const real = trio.some(p => p.camp === 'loups')
      const want = trueOne ? real : !real
      return want ? `الحومة تقول: فمّا ذيب بين ${trio.map(p => p.name).join(' و ')}.` : null
    },
    () => {
      // « فلان ما هوش ذيب »
      const t = pickOne(trueOne ? villagers : wolvesAlive)
      return t ? `الحومة تقول: ${t.name} ما هوش ذيب.` : null
    },
    () => {
      // « عدد الذيابة اللي باقيين »
      const n = wolvesAlive.length + (trueOne ? 0 : (Math.random() < .5 ? 1 : -1))
      return n >= 0 ? `الحومة تقول: باقي ${n} ${n === 1 ? 'ذيب' : 'ذيابة'} في الحومة.` : null
    },
  ]
  for (let i = 0; i < 6; i++) {
    const r = pickOne(kinds)()
    if (r) return { textAr: r, trueOne }
  }
  return null
}

export function nightProgress(s: GameState) {
  return { idx: Math.min(s.stepIdx, s.queue.length), total: s.queue.length }
}

export function canBarbier(s: GameState) { return hasRole(s, 'barbier') && !s.memory.barbierUsed }
export function canAlien(s: GameState) { return hasRole(s, 'alien') }
export function hasServante(s: GameState) {
  const sv = aliveWithRole(s, 'servante_devouee')
  return !!sv && !sv.lover
}

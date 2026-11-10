// Simulateur : joue des parties entières au hasard et vérifie que
// le moteur ne casse jamais et qu'une partie se termine toujours.
import {
  createGame, currentStep, submitStep, goDebate, goVote, lynch,
  alive, byId, barbierShoot, alienGuess, canBarbier, canAlien,
} from '../src/engine/engine'
import { autoCompose, ROLES } from '../src/engine/data'
import type { GameState } from '../src/engine/types'

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]
const chance = (p: number) => Math.random() < p

function playNight(g: GameState): GameState {
  let guard = 0
  while (g.phase === 'night' && guard++ < 120) {
    const st = currentStep(g)
    if (!st) break
    let v: any = null
    switch (st.kind) {
      case 'info': v = null; break
      case 'choice': v = pick(st.options!).id; break
      case 'voleur': v = chance(.6) ? { swap: true, index: Math.random() < .5 ? 0 : 1 } : { swap: false }; break
      case 'pyromane': {
        const doused = alive(g).filter(p => p.doused).length
        v = (doused >= 2 && chance(.35)) ? { action: 'burn' }
          : { action: 'douse', targets: shuffleTake(st.candidates!, st.max ?? 2) }
        break
      }
      case 'sorciere': {
        const victim = g.picks['loup_garou']?.[0]
        v = { heal: !!victim && !g.memory.sorciereHeal && chance(.4),
              kill: !g.memory.sorciereKill && chance(.25) ? pick(st.candidates!) : null }
        break
      }
      case 'berger':
      case 'pick': {
        const n = st.min === st.max ? st.min! : (st.min! + Math.round(Math.random() * ((st.max! - st.min!))))
        v = shuffleTake(st.candidates!, n)
        break
      }
    }
    g = submitStep(g, v)
    g.lastReveal = null
  }
  return g
}

function shuffleTake<T>(a: T[], n: number): T[] {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[r[i], r[j]] = [r[j], r[i]] }
  return r.slice(0, Math.max(0, Math.min(n, r.length)))
}

function playGame(nPlayers: number): { g: GameState; rounds: number } {
  const names = Array.from({ length: nPlayers }, (_, i) => `L${i + 1}`)
  let g = createGame(names, autoCompose(nPlayers, { useVoleur: chance(.5) }), { sheepCount: 2 + Math.floor(Math.random() * 4) })
  let rounds = 0
  while (g.phase !== 'end' && rounds++ < 60) {
    g = playNight(g)
    if (g.phase === 'end') break
    g = goDebate(g)
    // actions à la demande
    if (canBarbier(g) && chance(.12)) { const t = pick(alive(g).filter(p => p.roleId !== 'barbier')); if (t) g = barbierShoot(g, t.id) }
    if (g.phase === 'end') break
    if (canAlien(g) && chance(.08)) {
      const t = pick(alive(g).filter(p => p.roleId !== 'alien'))
      if (t) g = alienGuess(g, t.id, chance(.4) ? t.roleId : pick(ROLES).id)
    }
    if (g.phase === 'end') break
    g = goVote(g)
    const cands = alive(g)
    g = lynch(g, chance(.85) && cands.length ? pick(cands).id : null,
      chance(.3) ? alive(g).find(p => p.roleId === 'servante_devouee')?.id ?? null : null)
  }
  return { g, rounds }
}

// ─── run ───────────────────────────────────────────────────────
const N = Number(process.argv[2] ?? 400)
const winners: Record<string, number> = {}
let unfinished = 0, maxRounds = 0, errors: string[] = []

for (let i = 0; i < N; i++) {
  const n = 6 + Math.floor(Math.random() * 15)   // 6 → 20 joueurs
  try {
    const { g, rounds } = playGame(n)
    maxRounds = Math.max(maxRounds, rounds)
    if (g.phase !== 'end' || !g.winner) { unfinished++; continue }
    winners[g.winner.camp] = (winners[g.winner.camp] ?? 0) + 1
    // invariants
    const a = alive(g)
    if (a.some(p => p.alive === false)) errors.push('joueur mort marqué vivant')
    if (g.players.some(p => !p.alive && p.deathCause == null)) errors.push('mort sans cause')
    if (g.memory.sheepAlive < 0) errors.push('moutons négatifs')
  } catch (e: any) {
    errors.push(`${e?.message}\n${String(e?.stack).split('\n').slice(1, 4).join('\n')}`)
  }
}

console.log(`\n🎲 ${N} طبقة مسيميلي (6 → 20 لاعب)\n`)
console.log('🏆 الرابح :')
const total = Object.values(winners).reduce((a, b) => a + b, 0)
for (const [k, v] of Object.entries(winners).sort((a, b) => b[1] - a[1])) {
  const pct = ((v / total) * 100).toFixed(1)
  console.log(`   ${k.padEnd(10)} ${String(v).padStart(4)}  ${pct.padStart(5)} %  ${'█'.repeat(Math.round(+pct / 2))}`)
}
console.log(`\n⏱️  أطول طبقة : ${maxRounds} دورة`)
console.log(`🚫 ما كمّلتش   : ${unfinished}`)
console.log(`❌ أخطاء       : ${errors.length}`)
if (errors.length) {
  const uniq = [...new Set(errors)].slice(0, 5)
  uniq.forEach(e => console.log('\n   ' + e.replace(/\n/g, '\n   ')))
  process.exit(1)
}
console.log('\n✅ المحرّك ثابت — حتّى طبقة ما طاحت.\n')

import rolesJson from '../../data/roles.json'
import type { RoleDef, Camp } from './types'

export const GAME = (rolesJson as any).game as {
  id: string; titleFr: string; titleAr: string; narratorAr: string
  minPlayers: number; maxPlayers: number
}

export const ROLES: RoleDef[] = (rolesJson as any).roles
export const HOUSE_RULES: any[] = (rolesJson as any).houseRules ?? []
export const CAMPS: Record<string, any> = (rolesJson as any).camps ?? {}

const byId = new Map(ROLES.map(r => [r.id, r]))
export const role = (id: string): RoleDef =>
  byId.get(id) ?? ({ id, nameFr: id, emoji: '❓', camp: 'village', wake: 'never', nightOrder: null, count: { min: 0, max: 1 }, descAr: '', mechAr: '', sayAr: '' } as RoleDef)

export const roleName = (id: string) => role(id).nameFr
export const roleEmoji = (id: string) => role(id).emoji
export const roleCamp = (id: string): Camp => role(id).camp
export const roleImg = (id: string) => `/assets/roles/${id}.jpg`

export const CAMP_META: Record<string, { label: string; color: string; bg: string; text: string; emoji: string }> = {
  village: { label: 'الحومة', color: '#3E7CB1', bg: '#14314D', text: '#9CCBF5', emoji: '🏘️' },
  loups: { label: 'الذيابة', color: '#D1603D', bg: '#44190F', text: '#FFAB87', emoji: '🐺' },
  solo: { label: 'وحداني', color: '#A96BD9', bg: '#2E1540', text: '#DCAAF5', emoji: '🔥' },
  amoureux: { label: 'الحبايب', color: '#E4698F', bg: '#44131F', text: '#FFA9C2', emoji: '💔' },
  variable: { label: 'يتبدّل', color: '#E9B44C', bg: '#3A3014', text: '#F6D98E', emoji: '🃏' },
}

/** Rôles « loups » au sens de la dévoration nocturne */
export const WOLF_ROLES = ROLES.filter(r => r.camp === 'loups').map(r => r.id)

/** Composition conseillée : nb de loups ≈ round(n / 4.5) */
export function suggestedWolves(n: number) {
  return Math.max(1, Math.round(n / 4.5))
}

/** Compose automatiquement une liste de rôles pour n joueurs */
export function autoCompose(n: number, opts: { useVoleur?: boolean; exclude?: string[] } = {}): string[] {
  const wolves = suggestedWolves(n)
  const out: string[] = []

  // 1. les loups
  const wolfPool = ['loup_garou', 'loup_rouge', 'loup_pere_infecte', 'loup_noir']
  if (n >= 15) wolfPool.splice(1, 0, 'grand_mechant_loup')
  out.push('loup_garou')
  for (let i = 1; i < wolves; i++) out.push(wolfPool[i % wolfPool.length] ?? 'loup_garou')

  // 2. les piliers du village
  const ban = new Set(opts.exclude ?? [])
  const core = ['voyante', 'sorciere', 'salvateur', 'cupidon', 'detective', 'ours', 'corbeau', 'ancien_sage', 'barbier', 'renard', 'servante_devouee', 'enfant_sauvage'].filter(r => !ban.has(r))
  if (opts.useVoleur && !ban.has('voleur')) core.unshift('voleur')
  for (const r of core) {
    if (out.length >= n) break
    out.push(r)
  }

  // 3. un solo si la table est grande
  if (n >= 12 && out.length < n) { out.push('pyromane'); out.push('berger') }
  if (n >= 16 && out.length < n) out.push('alien')

  // 4. on complète en villageois
  while (out.length < n) out.push('villageois')
  return out.slice(0, n)
}

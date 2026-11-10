/**
 * Réglages persistants : قوانين الحومة (house rules) + préférences.
 * Stockés en localStorage (et répliqués dans Capacitor Preferences si présent).
 */
import { useSyncExternalStore } from 'react'
import { HOUSE_RULES } from '../engine/data'

export interface HouseRule {
  id: string; nameAr: string; descAr: string; default: boolean; param?: { minutes?: number }
}

export const RULES: HouseRule[] = HOUSE_RULES as HouseRule[]

export type RuleState = Record<string, boolean>

const KEY = 'lgbt.rules'
const defaults = (): RuleState => Object.fromEntries(RULES.map(r => [r.id, !!r.default]))

let state: RuleState = load()
const listeners = new Set<() => void>()
let version = 0

function load(): RuleState {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaults(), ...JSON.parse(raw) } : defaults()
  } catch { return defaults() }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    const P = (globalThis as any).Capacitor?.Plugins?.Preferences
    P?.set({ key: KEY, value: JSON.stringify(state) })
  } catch { }
}

export function getRules(): RuleState { return state }

export function setRule(id: string, on: boolean) {
  state = { ...state, [id]: on }
  // وضع السريع و وضع رمضان ما يمشيوش مع بعضهم
  if (on && id === 'sari3') state.ramadan = false
  if (on && id === 'ramadan') state.sari3 = false
  persist(); version++; listeners.forEach(l => l())
}

export function resetRules() {
  state = defaults(); persist(); version++; listeners.forEach(l => l())
}

export function useRules(): RuleState {
  useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb) }, () => version)
  return state
}

// ═══════════════════════════════════════════════════════════════
//  Effets concrets des règles sur la partie
// ═══════════════════════════════════════════════════════════════

/** Durée de قعدة الحومة en secondes */
export function debateSeconds(r: RuleState = state): number {
  if (r.sari3) return 90
  const base = (RULES.find(x => x.id === 'gahwa')?.param?.minutes ?? 3) * 60
  return r.ramadan ? base + 120 : base
}

/** Vocabulaire du narrateur — change en وضع رمضان */
export function lexicon(r: RuleState = state) {
  return r.ramadan
    ? { nightTitle: '🌙 بعد الفطور', morningTitle: '🌄 السحور', nightVerb: 'الحومة تقعد بعد الفطور' }
    : { nightTitle: '🌙 ليلة', morningTitle: '🌅 صباح نهار', nightVerb: 'الحومة ترقد' }
}

/** وضع السريع يشيل الـ Sorcière */
export const excludedRoles = (r: RuleState = state): string[] => (r.sari3 ? ['sorciere'] : [])

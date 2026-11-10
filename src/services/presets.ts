/**
 * Préréglages de composition — « parties rapides » et compositions
 * personnalisées du narrateur, mémorisées et réutilisables.
 *
 * C'est TOUJOURS le narrateur qui décide des rôles : les préréglages
 * ci-dessous ne sont que des points de départ, modifiables et enregistrables.
 */
import { useSyncExternalStore } from 'react'

export interface Preset {
  id: string
  nameAr: string
  players: number
  roles: string[]       // liste plate : un id par carte
  builtin?: boolean
  updatedAt?: number
}

const KEY = 'lgbt.presets'

// ─── Points de départ livrés avec l'app ───────────────────────
export const BUILTIN: Preset[] = [
  {
    id: 'quick8', nameAr: 'طبقة سريعة · 8', players: 8, builtin: true,
    roles: ['loup_garou', 'loup_garou', 'voyante', 'sorciere', 'salvateur', 'cupidon', 'villageois', 'villageois'],
  },
  {
    id: 'quick10', nameAr: 'طبقة سريعة · 10', players: 10, builtin: true,
    roles: ['loup_garou', 'loup_garou', 'voyante', 'sorciere', 'salvateur', 'cupidon', 'detective', 'ours', 'villageois', 'villageois'],
  },
  {
    id: 'quick12', nameAr: 'طبقة سريعة · 12', players: 12, builtin: true,
    roles: ['loup_garou', 'loup_garou', 'loup_rouge', 'voyante', 'sorciere', 'salvateur', 'cupidon',
      'detective', 'ours', 'corbeau', 'barbier', 'villageois'],
  },
]

let mine: Preset[] = load()
const listeners = new Set<() => void>()
let version = 0
const bump = () => { version++; listeners.forEach(l => l()) }

function load(): Preset[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(mine))
    const P = (globalThis as any).Capacitor?.Plugins?.Preferences
    P?.set({ key: KEY, value: JSON.stringify(mine) })
  } catch { }
}

export const allPresets = (): Preset[] => [...BUILTIN, ...mine]
export const myPresets = (): Preset[] => mine
export const getPreset = (id: string) => allPresets().find(p => p.id === id)

export function savePreset(nameAr: string, roles: string[], id?: string): Preset {
  const p: Preset = {
    id: id ?? `p${Date.now().toString(36)}`,
    nameAr: nameAr.trim() || `تركيبة ${roles.length}`,
    players: roles.length, roles: [...roles], updatedAt: Date.now(),
  }
  const i = mine.findIndex(x => x.id === p.id)
  if (i >= 0) mine[i] = p; else mine.push(p)
  persist(); bump()
  return p
}

export function deletePreset(id: string) {
  mine = mine.filter(p => p.id !== id)
  persist(); bump()
}

export function usePresets(): Preset[] {
  useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb) }, () => version)
  return allPresets()
}

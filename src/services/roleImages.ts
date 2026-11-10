/**
 * LOUP GAROU BEL TOUNSI — images de rôles
 * ───────────────────────────────────────────────────────────────────────────
 * Cascade (le premier qui répond gagne) :
 *
 *   1. user        → photo choisie par l'utilisateur dans sa galerie,
 *                    ENREGISTRÉE DANS LES RESSOURCES DE L'APP (hors-ligne)
 *   2. pack        → illustration maison livrée avec l'app
 *   3. remote      → source distante configurable (vide par défaut)
 *   4. placeholder → SVG généré à la volée — ne échoue jamais
 *
 * Stockage : Capacitor Filesystem (Directory.Data) sur mobile,
 *            IndexedDB sur le web. Jamais de réseau requis.
 */
import { useEffect, useState, useSyncExternalStore } from 'react'

export type ImageOrigin = 'user' | 'pack' | 'remote' | 'placeholder'

const PACK = (id: string) => `/assets/roles/${id}.jpg`
const DB_NAME = 'lgbt-images'
const STORE = 'roles'
const MAX_PX = 768
const QUALITY = 0.85

// ═══════════════════════════════════════════════════════════════
//  Détection Capacitor (sans en faire une dépendance dure)
// ═══════════════════════════════════════════════════════════════
const cap = () => (globalThis as any).Capacitor
export const isNative = () => !!cap()?.isNativePlatform?.()

// ═══════════════════════════════════════════════════════════════
//  Couche de stockage
// ═══════════════════════════════════════════════════════════════
interface Store {
  get(id: string): Promise<string | null>
  set(id: string, dataUri: string): Promise<void>
  del(id: string): Promise<void>
  keys(): Promise<string[]>
}

/** Web — IndexedDB (plusieurs Mo sans souci, contrairement à localStorage) */
const webStore: Store = {
  async get(id) { return (await idb('readonly', s => s.get(id))) ?? null },
  async set(id, d) { await idb('readwrite', s => s.put(d, id)) },
  async del(id) { await idb('readwrite', s => s.delete(id)) },
  async keys() { return (await idb('readonly', s => s.getAllKeys())) as string[] ?? [] },
}

function idb<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return new Promise((res, rej) => {
    const open = indexedDB.open(DB_NAME, 1)
    open.onupgradeneeded = () => open.result.createObjectStore(STORE)
    open.onerror = () => rej(open.error)
    open.onsuccess = () => {
      const db = open.result
      const tx = db.transaction(STORE, mode)
      const rq = fn(tx.objectStore(STORE))
      rq.onsuccess = () => { res(rq.result as T); db.close() }
      rq.onerror = () => { rej(rq.error); db.close() }
    }
  })
}

/** Natif — Capacitor Filesystem, dossier de données de l'app */
function nativeStore(): Store {
  const dir = 'DATA'
  const path = (id: string) => `roles/${id}.jpg`
  const FS = () => (globalThis as any).Capacitor.Plugins.Filesystem
  return {
    async get(id) {
      try {
        const r = await FS().readFile({ path: path(id), directory: dir })
        return `data:image/jpeg;base64,${r.data}`
      } catch { return null }
    },
    async set(id, dataUri) {
      await FS().mkdir({ path: 'roles', directory: dir, recursive: true }).catch(() => { })
      await FS().writeFile({ path: path(id), directory: dir, data: dataUri.split(',')[1], recursive: true })
    },
    async del(id) { await FS().deleteFile({ path: path(id), directory: dir }).catch(() => { }) },
    async keys() {
      try {
        const r = await FS().readdir({ path: 'roles', directory: dir })
        return (r.files ?? []).map((f: any) => String(f.name ?? f).replace(/\.jpg$/, ''))
      } catch { return [] }
    },
  }
}

const store = (): Store => (isNative() ? nativeStore() : webStore)

// ═══════════════════════════════════════════════════════════════
//  Cache mémoire + abonnement React
// ═══════════════════════════════════════════════════════════════
const cache = new Map<string, string>()      // roleId -> data URI de l'utilisateur
let loaded = false
const listeners = new Set<() => void>()
let version = 0
const notify = () => { version++; listeners.forEach(l => l()) }

export async function loadUserImages() {
  if (loaded) return
  loaded = true
  try {
    const s = store()
    for (const id of await s.keys()) {
      const d = await s.get(id)
      if (d) cache.set(id, d)
    }
    notify()
  } catch { /* stockage indisponible : on reste sur le pack */ }
}

export function useRoleImages() {
  useEffect(() => { loadUserImages() }, [])
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => listeners.delete(cb) },
    () => version,
  )
}

// ═══════════════════════════════════════════════════════════════
//  API publique
// ═══════════════════════════════════════════════════════════════
export function resolveRoleImage(id: string): { uri: string; origin: ImageOrigin } {
  const u = cache.get(id)
  if (u) return { uri: u, origin: 'user' }
  return { uri: PACK(id), origin: 'pack' }
}

export const hasCustomImage = (id: string) => cache.has(id)
export const customCount = () => cache.size

/** Enregistre une photo de la galerie dans les ressources de l'app */
export async function setCustomImage(id: string, file: Blob | string): Promise<void> {
  const dataUri = await squareJpeg(file)
  await store().set(id, dataUri)
  cache.set(id, dataUri)
  notify()
}

export async function clearCustomImage(id: string): Promise<void> {
  await store().del(id)
  cache.delete(id)
  notify()
}

export async function clearAllCustomImages(): Promise<void> {
  const s = store()
  for (const id of [...cache.keys()]) await s.del(id)
  cache.clear()
  notify()
}

// ═══════════════════════════════════════════════════════════════
//  Ouverture de la galerie — natif (Camera) ou web (<input file>)
// ═══════════════════════════════════════════════════════════════
export async function pickFromGallery(): Promise<Blob | string | null> {
  if (isNative()) {
    const Camera = (globalThis as any).Capacitor.Plugins.Camera
    try {
      const photo = await Camera.getPhoto({
        source: 'PHOTOS', resultType: 'dataUrl', quality: 92,
        width: MAX_PX, height: MAX_PX, correctOrientation: true,
      })
      return photo.dataUrl as string
    } catch { return null }
  }
  return new Promise(res => {
    const inp = document.createElement('input')
    inp.type = 'file'; inp.accept = 'image/*'
    inp.onchange = () => res(inp.files?.[0] ?? null)
    inp.oncancel = () => res(null)
    inp.click()
  })
}

// ═══════════════════════════════════════════════════════════════
//  Recadrage carré + compression (768 px, JPEG 0.85)
// ═══════════════════════════════════════════════════════════════
export function squareJpeg(src: Blob | string): Promise<string> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => {
      const side = Math.min(img.width, img.height)
      const size = Math.min(MAX_PX, side)
      const c = document.createElement('canvas')
      c.width = c.height = size
      const ctx = c.getContext('2d')!
      ctx.imageSmoothingQuality = 'high'
      // recadrage centré
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size)
      res(c.toDataURL('image/jpeg', QUALITY))
      if (typeof src !== 'string') URL.revokeObjectURL(img.src)
    }
    img.onerror = () => rej(new Error('التصويرة ما تقراتش'))
    img.src = typeof src === 'string' ? src : URL.createObjectURL(src)
  })
}

// ═══════════════════════════════════════════════════════════════
//  Secours : vignette SVG (emoji + dégradé du camp + trame khatem)
// ═══════════════════════════════════════════════════════════════
const CAMP_COLORS: Record<string, [string, string]> = {
  village: ['#14314D', '#3E7CB1'], loups: ['#44190F', '#D1603D'],
  solo: ['#2E1540', '#A96BD9'], amoureux: ['#44131F', '#E4698F'],
  variable: ['#3A3014', '#E9B44C'],
}

export function placeholderSvg(emoji: string, camp: string): string {
  const [bg, fg] = CAMP_COLORS[camp] ?? CAMP_COLORS.village
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs><radialGradient id="g" cx="50%" cy="38%"><stop offset="0" stop-color="${fg}" stop-opacity=".55"/><stop offset="1" stop-color="${bg}"/></radialGradient>
<pattern id="k" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M32 6 42 16h14v14l10 10-10 10v14H42L32 74 22 64H8V50L-2 40 8 30V16h14z" fill="none" stroke="${fg}" stroke-opacity=".18"/></pattern></defs>
<rect width="512" height="512" fill="url(#g)"/><rect width="512" height="512" fill="url(#k)"/>
<text x="256" y="300" font-size="190" text-anchor="middle">${emoji}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

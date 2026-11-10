/* ═══════════════════════════════════════════════════════════════
   Salon sur le réseau local.

   · L'HÔTE (المعلّم) fait tourner un concentrateur WebSocket grâce au
     plugin natif `LanRoom` — son téléphone devient le serveur.
   · Les JOUEURS se connectent avec un WebSocket ordinaire : aucun code
     natif, donc iPhone, Android et navigateur fonctionnent tous.

   Le code de salon encode les deux derniers octets de l'IP de l'hôte,
   ce qui permet de le retrouver sans aucune découverte réseau.
   Le QR, lui, porte l'URL complète : zéro devinette.
   ═══════════════════════════════════════════════════════════════ */
import { useCallback, useEffect, useRef, useState } from 'react'
import { registerPlugin, Capacitor } from '@capacitor/core'

export const PORT = 8787

interface LanRoomPlugin {
  info(): Promise<{ ip: string; running: boolean; clients: number }>
  start(o: { port: number }): Promise<{ ip: string; port: number }>
  stop(): Promise<void>
  send(o: { to: string; data: string }): Promise<void>
  broadcast(o: { data: string }): Promise<void>
  kick(o: { to: string }): Promise<void>
  addListener(e: 'conn', cb: (d: { id: string; path: string }) => void): Promise<{ remove: () => void }>
  addListener(e: 'disc', cb: (d: { id: string }) => void): Promise<{ remove: () => void }>
  addListener(e: 'msg', cb: (d: { id: string; data: string }) => void): Promise<{ remove: () => void }>
}

const Lan = registerPlugin<LanRoomPlugin>('LanRoom')
export const canHost = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'

/* ─── Code de salon ────────────────────────────────────────────
   4 caractères = octets 3 et 4 de l'IP · 1 caractère = aléa.
   192.168.1.42 → (1×256 + 42) = 298 → "008A" + "K" → « 008AK »     */
const A36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function makeCode(ip: string): string {
  const p = ip.split('.').map(Number)
  const v = ((p[2] ?? 0) & 255) * 256 + ((p[3] ?? 0) & 255)
  const nonce = A36[Math.floor(Math.random() * 36)]
  return v.toString(36).toUpperCase().padStart(4, '0') + nonce
}

/** Adresses plausibles pour un code donné, la meilleure en premier. */
export function candidatesFor(code: string, ownIp?: string): string[] {
  const c = code.trim().toUpperCase().replace(/[^0-9A-Z]/g, '')
  if (c.length < 4) return []
  const v = parseInt(c.slice(0, 4), 36)
  if (!Number.isFinite(v)) return []
  const o3 = (v >> 8) & 255, o4 = v & 255

  const out: string[] = []
  if (ownIp) {
    const p = ownIp.split('.')
    if (p.length === 4) out.push(`${p[0]}.${p[1]}.${o3}.${o4}`)
  }
  for (const pre of ['192.168', '10.0', '10.1', '172.16', '172.20', '100.64']) {
    const ip = `${pre}.${o3}.${o4}`
    if (!out.includes(ip)) out.push(ip)
  }
  return out
}

export const urlFor = (ip: string, code: string) => `ws://${ip}:${PORT}/?c=${code}`
export const qrFor = (ip: string, code: string) => `LGBTROOM1:${ip}:${PORT}:${code}`

export function parseQr(raw: string): { ip: string; port: number; code: string } | null {
  const m = /^LGBTROOM1:([\d.]+):(\d+):([0-9A-Z]+)$/i.exec(raw.trim())
  return m ? { ip: m[1], port: Number(m[2]), code: m[3].toUpperCase() } : null
}

export function deviceId(): string {
  let d = localStorage.getItem('lgbt.device')
  if (!d) { d = Math.random().toString(36).slice(2, 10); localStorage.setItem('lgbt.device', d) }
  return d
}

export interface RosterPlayer { id: string; name: string; connected: boolean }
export interface SignEvent { kind: 'barbier' | 'alien'; from: string; at: number }

/* ═══ CÔTÉ HÔTE ═══════════════════════════════════════════════ */
export function useHostRoom(enabled: boolean) {
  const [status, setStatus] = useState<'idle' | 'starting' | 'open' | 'error'>('idle')
  const [error, setError] = useState('')
  const [ip, setIp] = useState('')
  const [code, setCode] = useState('')
  const [roster, setRoster] = useState<RosterPlayer[]>([])
  const [signs, setSigns] = useState<SignEvent[]>([])
  const conns = useRef(new Map<string, string>())   // connId → deviceId
  const codeRef = useRef('')
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || started.current) return
    started.current = true
    let subs: { remove: () => void }[] = []
    let dead = false

    ;(async () => {
      if (!canHost()) {
        setStatus('error')
        setError('nohost')
        return
      }
      setStatus('starting')
      try {
        const { ip } = await Lan.start({ port: PORT })
        if (dead) return
        if (!ip) { setStatus('error'); setError('noip'); return }
        const c = makeCode(ip)
        codeRef.current = c
        setIp(ip); setCode(c); setStatus('open')

        subs.push(await Lan.addListener('conn', () => { }))
        subs.push(await Lan.addListener('disc', ({ id }) => {
          const dev = conns.current.get(id)
          conns.current.delete(id)
          if (dev) setRoster(r => r.map(p => p.id === dev ? { ...p, connected: false } : p))
        }))
        subs.push(await Lan.addListener('msg', ({ id, data }) => {
          let m: any
          try { m = JSON.parse(data) } catch { return }

          if (m.t === 'join') {
            if (String(m.code ?? '').toUpperCase() !== codeRef.current) {
              Lan.send({ to: id, data: JSON.stringify({ t: 'error', why: 'badcode' }) })
              return
            }
            const dev = String(m.device ?? id)
            conns.current.set(id, dev)
            setRoster(r => {
              const i = r.findIndex(p => p.id === dev)
              const name = String(m.name ?? '').slice(0, 24) || 'لاعب'
              const next = i >= 0
                ? r.map((p, j) => j === i ? { ...p, name, connected: true } : p)
                : [...r, { id: dev, name, connected: true }]
              Lan.send({ to: id, data: JSON.stringify({ t: 'joined', you: dev, code: codeRef.current }) })
              Lan.broadcast({ data: JSON.stringify({ t: 'roster', players: next }) })
              return next
            })
          }

          if (m.t === 'sign') {
            const dev = conns.current.get(id)
            setRoster(r => {
              const who = r.find(p => p.id === dev)
              setSigns(s => [...s, { kind: m.kind, from: who?.name ?? '?', at: Date.now() }])
              return r
            })
          }
        }))
      } catch (e: any) {
        if (!dead) { setStatus('error'); setError(String(e?.message ?? e)) }
      }
    })()

    return () => {
      dead = true
      subs.forEach(s => s.remove())
      if (canHost()) Lan.stop().catch(() => { })
      started.current = false
    }
  }, [enabled])

  const deviceOf = useCallback((dev: string) =>
    [...conns.current.entries()].find(([, d]) => d === dev)?.[0], [])

  const push = useCallback((dev: string, msg: any) => {
    const cid = deviceOf(dev)
    if (cid) Lan.send({ to: cid, data: JSON.stringify(msg) })
  }, [deviceOf])

  const broadcast = useCallback((msg: any) => {
    if (canHost()) Lan.broadcast({ data: JSON.stringify(msg) })
  }, [])

  const kick = useCallback((dev: string) => {
    const cid = deviceOf(dev)
    if (cid) Lan.kick({ to: cid })
    setRoster(r => r.filter(p => p.id !== dev))
  }, [deviceOf])

  const dismissSign = useCallback((at: number) => setSigns(s => s.filter(x => x.at !== at)), [])

  return {
    status, error, ip, code, roster, signs,
    url: ip ? urlFor(ip, code) : '', qr: ip ? qrFor(ip, code) : '',
    push, broadcast, kick, dismissSign,
  }
}

/* ═══ CÔTÉ JOUEUR ═════════════════════════════════════════════ */
type JoinStatus = 'idle' | 'searching' | 'connecting' | 'lobby' | 'playing' | 'error'

/** Essaie plusieurs adresses en parallèle, garde la première qui répond. */
export function race(urls: string[], code: string, timeout = 1800): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    let settled = false
    const all: WebSocket[] = []
    const fail = () => { if (!settled && ++done >= urls.length) { settled = true; reject(new Error('notfound')) } }
    let done = 0
    if (!urls.length) return reject(new Error('badcode'))

    const timer = setTimeout(() => {
      if (!settled) { settled = true; all.forEach(w => { try { w.close() } catch { } }); reject(new Error('timeout')) }
    }, timeout)

    urls.forEach(u => {
      let ws: WebSocket
      try { ws = new WebSocket(u) } catch { fail(); return }
      all.push(ws)
      ws.onopen = () => {
        if (settled) { try { ws.close() } catch { } ; return }
        settled = true
        clearTimeout(timer)
        all.filter(w => w !== ws).forEach(w => { try { w.close() } catch { } })
        resolve(ws)
      }
      ws.onerror = fail
      ws.onclose = fail
    })
  })
}

export function useJoinRoom() {
  const [status, setStatus] = useState<JoinStatus>('idle')
  const [error, setError] = useState('')
  const [me, setMe] = useState<string | null>(null)
  const [roster, setRoster] = useState<RosterPlayer[]>([])
  const [role, setRole] = useState<any>(null)
  const [says, setSays] = useState<{ html: string; at: number }[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  const wire = useCallback((ws: WebSocket, code: string, name: string) => {
    wsRef.current = ws
    ws.onmessage = e => {
      let m: any
      try { m = JSON.parse(e.data) } catch { return }
      if (m.t === 'joined') { setMe(m.you); setStatus('lobby'); setError('') }
      if (m.t === 'error') { setStatus('error'); setError(m.why === 'badcode' ? 'badcode' : m.why) ; ws.close() }
      if (m.t === 'roster') setRoster(m.players ?? [])
      if (m.t === 'role') { setRole(m); setStatus('playing') }
      if (m.t === 'say') setSays(s => [{ html: m.html, at: Date.now() }, ...s].slice(0, 20))
    }
    ws.onclose = () => { setStatus(s => (s === 'error' ? s : 'error')); setError(e => e || 'closed') }
    ws.send(JSON.stringify({ t: 'join', code, name, device: deviceId() }))
  }, [])

  /** Rejoindre par QR : on connaît l'adresse exacte. */
  const joinUrl = useCallback(async (ip: string, port: number, code: string, name: string) => {
    setStatus('connecting'); setError('')
    try {
      const ws = await race([`ws://${ip}:${port}/?c=${code}`], code, 4000)
      wire(ws, code, name)
    } catch (e: any) { setStatus('error'); setError(e?.message ?? 'notfound') }
  }, [wire])

  /** Rejoindre par code tapé : on déduit les adresses possibles. */
  const joinCode = useCallback(async (code: string, name: string) => {
    setStatus('searching'); setError('')
    let own = ''
    try { if (Capacitor.isNativePlatform()) own = (await Lan.info()).ip } catch { }
    const urls = candidatesFor(code, own).map(ip => `ws://${ip}:${PORT}/?c=${code}`)
    if (!urls.length) { setStatus('error'); setError('badcode'); return }
    try {
      const ws = await race(urls, code, 2600)
      setStatus('connecting')
      wire(ws, code.toUpperCase(), name)
    } catch (e: any) { setStatus('error'); setError(e?.message ?? 'notfound') }
  }, [wire])

  const sign = useCallback((kind: 'barbier' | 'alien') => {
    wsRef.current?.send(JSON.stringify({ t: 'sign', kind }))
  }, [])

  const leave = useCallback(() => {
    try { wsRef.current?.close() } catch { }
    wsRef.current = null
    setStatus('idle'); setMe(null); setRoster([]); setRole(null); setError('')
  }, [])

  useEffect(() => () => { try { wsRef.current?.close() } catch { } }, [])

  return { status, error, me, roster, role, says, joinUrl, joinCode, sign, leave }
}

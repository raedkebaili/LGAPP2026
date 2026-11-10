/* ═══════════════════════════════════════════════════════════════
   Tests du salon réseau.  npm run test:lan

   Vérifie deux choses que le sandbox permet vraiment de tester :
     · l'aller-retour code ⇄ adresse (pur, sans réseau) ;
     · le protocole complet, contre un vrai serveur WebSocket qui
       rejoue à l'identique le relais du plugin Android.
   Le plugin Java lui-même n'est pas testé ici — il lui faut un appareil.
   ═══════════════════════════════════════════════════════════════ */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { WebSocketServer, WebSocket as WS } from 'ws'

globalThis.window = globalThis
globalThis.document = { addEventListener() {}, querySelector: () => null, documentElement: { dataset: {} } }
globalThis.navigator = globalThis.navigator || { userAgent: 'node' }
globalThis.WebSocket = WS

// on bundle le service pour pouvoir l'importer hors navigateur
const dir = mkdtempSync(join(tmpdir(), 'lan-'))
writeFileSync(join(dir, 'entry.ts'),
  `export { makeCode, candidatesFor, parseQr, qrFor, urlFor, race, PORT } from '${process.cwd()}/src/services/lanroom'`)
execFileSync('./node_modules/.bin/esbuild',
  [join(dir, 'entry.ts'), '--bundle', '--format=esm', '--platform=node',
   `--outfile=${join(dir, 'lan.mjs')}`, '--log-level=error'])
const L = await import(join(dir, 'lan.mjs'))

let pass = 0, fail = 0
const t = (n, c) => { c ? (pass++, console.log('  ✅', n)) : (fail++, console.log('  ❌', n)) }

console.log('═══ 1. code ⇄ IP, aller-retour ═══')
const ips = ['192.168.1.42','192.168.0.1','10.0.0.255','172.16.5.99','192.168.43.1',
             '10.1.200.17','192.168.255.255','172.20.10.2','10.0.2.15','192.168.100.7']
for (const ip of ips) {
  const code = L.makeCode(ip)
  const cands = L.candidatesFor(code)
  const ok = code.length === 5 && cands.includes(ip)
  t(`${ip} → ${code}`, ok)
  if (!ok) console.log('     candidats:', cands)
}
console.log(`  ${ips.length} adresses testées · code toujours 5 caractères · IP retrouvée`)

console.log('═══ 2. collisions sur les 2 derniers octets ═══')
const seen = new Map()
let coll = 0
for (let a = 0; a < 256; a += 7) for (let b = 0; b < 256; b += 5) {
  const c = L.makeCode(`192.168.${a}.${b}`).slice(0, 4)
  if (seen.has(c) && seen.get(c) !== `${a}.${b}`) coll++
  seen.set(c, `${a}.${b}`)
}
t(`0 collision sur ${seen.size} combinaisons`, coll === 0)
console.log(`  ${seen.size} combinaisons → ${coll} collision(s)`)

console.log('═══ 3. QR ═══')
const q = L.qrFor('192.168.1.42', 'X1Y2Z')
const pr = L.parseQr(q)
t('aller-retour QR', pr && pr.ip === '192.168.1.42' && pr.port === 8787 && pr.code === 'X1Y2Z')
t('QR de carte rejeté', L.parseQr('LGBT1:{"v":1}') === null)
t('bruit rejeté', L.parseQr('https://exemple.tn') === null)
t('url', L.urlFor('10.0.0.5','ABCDE') === 'ws://10.0.0.5:8787/?c=ABCDE')
console.log('  QR:', q)

console.log('═══ 4. saisies malmenées ═══')
t('minuscules', L.candidatesFor('008ak').length > 0)
t('espaces/tirets', JSON.stringify(L.candidatesFor(' 00-8A K ')) === JSON.stringify(L.candidatesFor('008AK')))
t('trop court', L.candidatesFor('AB').length === 0)
t('vide', L.candidatesFor('').length === 0)
t('IP propre réseau en tête', L.candidatesFor('008AK', '172.31.9.9')[0] === '172.31.1.42')




const HOST_IP = '127.0.0.1'
const CODE = L.makeCode('127.0.0.1')

/* ── Concentrateur : copie fidèle de LanRoomPlugin.java (relais pur) ── */
const peers = new Map(); let seq = 0
const wss = new WebSocketServer({ host: '0.0.0.0', port: L.PORT })
const emit = { conn: [], disc: [], msg: [] }
wss.on('connection', (ws, req) => {
  const id = 'c' + (++seq); peers.set(id, ws)
  emit.conn.push({ id, path: req.url })
  ws.on('message', d => emit.msg.push({ id, data: String(d) }))
  ws.on('close', () => { peers.delete(id); emit.disc.push({ id }) })
})
const send = (to, data) => peers.get(to)?.send(data)
const broadcast = data => peers.forEach(w => w.readyState === 1 && w.send(data))

/* ── Logique hôte : identique à useHostRoom ── */
let roster = []
const conns = new Map()
setInterval(() => {
  while (emit.msg.length) {
    const { id, data } = emit.msg.shift()
    let m; try { m = JSON.parse(data) } catch { continue }
    if (m.t === 'join') {
      if (String(m.code ?? '').toUpperCase() !== CODE) { send(id, JSON.stringify({ t: 'error', why: 'badcode' })); continue }
      const dev = String(m.device ?? id); conns.set(id, dev)
      const i = roster.findIndex(p => p.id === dev)
      const name = String(m.name ?? '').slice(0, 24) || 'لاعب'
      roster = i >= 0 ? roster.map((p, j) => j === i ? { ...p, name, connected: true } : p)
                      : [...roster, { id: dev, name, connected: true }]
      send(id, JSON.stringify({ t: 'joined', you: dev, code: CODE }))
      broadcast(JSON.stringify({ t: 'roster', players: roster }))
    }
    if (m.t === 'sign') signsSeen.push({ kind: m.kind, from: conns.get(id) })
  }
}, 10)
const signsSeen = []

await new Promise(r => wss.on('listening', r))
console.log(`🛰️  concentrateur sur ${HOST_IP}:${L.PORT} · code ${CODE}\n`)

const recv = (ws, want, ms = 2500) => new Promise((res, rej) => {
  const to = setTimeout(() => rej(new Error('timeout ' + want)), ms)
  const h = e => { const m = JSON.parse(e.data ?? e); if (m.t === want) { clearTimeout(to); ws.removeEventListener?.('message', h); res(m) } }
  ws.addEventListener ? ws.addEventListener('message', h) : ws.on('message', d => h(String(d)))
})

console.log('═══ 5. découverte parallèle (le bon hôte parmi des leurres) ═══')
const leurres = ['ws://192.168.77.231:8787','ws://10.0.99.14:8787','ws://172.16.3.8:8787']
const t0 = Date.now()
const ws1 = await L.race([...leurres, `ws://${HOST_IP}:${L.PORT}/?c=${CODE}`], CODE, 3000)
t(`bon hôte trouvé parmi ${leurres.length + 1} candidats en ${Date.now() - t0} ms`, ws1.readyState === 1)

console.log('═══ 6. protocole d\'entrée ═══')
ws1.send(JSON.stringify({ t: 'join', code: CODE, name: 'سامي', device: 'dev-sami' }))
const j = await recv(ws1, 'joined')
t('réponse « joined »', j.you === 'dev-sami')
const r1 = await recv(ws1, 'roster').catch(() => null)
t('liste diffusée · 1 joueur', roster.length === 1 && roster[0].name === 'سامي')

console.log('═══ 7. deuxième joueur, nom arabe ═══')
const ws2 = new WS(`ws://${HOST_IP}:${L.PORT}/?c=${CODE}`)
await new Promise(r => ws2.on('open', r))
ws2.send(JSON.stringify({ t: 'join', code: CODE, name: 'ليلى بنت الحومة', device: 'dev-leila' }))
await new Promise(r => setTimeout(r, 120))
t('2 joueurs, arabe intact', roster.length === 2 && roster[1].name === 'ليلى بنت الحومة')

console.log('═══ 8. mauvais code refusé ═══')
const ws3 = new WS(`ws://${HOST_IP}:${L.PORT}/`)
await new Promise(r => ws3.on('open', r))
ws3.send(JSON.stringify({ t: 'join', code: 'ZZZZZ', name: 'intrus', device: 'dev-x' }))
const err = await new Promise(r => ws3.on('message', d => r(JSON.parse(String(d)))))
t('refus « badcode »', err.t === 'error' && err.why === 'badcode')
t('intrus hors de la liste', roster.length === 2)

console.log('═══ 9. envoi ciblé des cartes ═══')
const got = new Promise(r => ws2.on('message', d => { const m = JSON.parse(String(d)); if (m.t === 'role') r(m) }))
const cid = [...conns.entries()].find(([, d]) => d === 'dev-leila')[0]
send(cid, JSON.stringify({ t: 'role', roleId: 'voyante', playerName: 'ليلى بنت الحومة', lover: true, loverName: 'سامي' }))
const card = await got
t('carte reçue par le bon appareil', card.roleId === 'voyante' && card.loverName === 'سامي')

console.log('═══ 10. signal 🔫 du joueur vers le معلّم ═══')
ws2.send(JSON.stringify({ t: 'sign', kind: 'barbier' }))
await new Promise(r => setTimeout(r, 120))
t('signal reçu', signsSeen.length === 1 && signsSeen[0].from === 'dev-leila')

console.log('═══ 11. déconnexion ═══')
ws2.close(); await new Promise(r => setTimeout(r, 200))
t('départ détecté', emit.disc.length >= 1)

console.log('═══ 12. aucun hôte → échec net, pas de blocage ═══')
const t1 = Date.now()
const ko = await L.race(['ws://192.168.88.12:8787','ws://10.0.88.12:8787'], 'ABCDE', 1800).catch(e => e.message)
t(`échoue en ${Date.now() - t1} ms (< 2500)`, typeof ko === 'string' && Date.now() - t1 < 2500)

console.log(`\n${fail ? '❌' : '✅'} ${pass} tests réussis, ${fail} échec(s)`)
wss.close(); process.exit(fail ? 1 : 0)

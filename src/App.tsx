import React, { useCallback, useEffect, useState } from 'react'
import type { GameState } from './engine/types'
import { createGame, canBarbier, canAlien, barbierShoot, alienGuess, clearReveal, alive } from './engine/engine'
import { ROLES } from './engine/data'
import { useRules } from './services/settings'
import { loadUserImages } from './services/roleImages'
import type { Preset } from './services/presets'

import Home from './screens/Home'
import Start, { type StartChoice } from './screens/Start'
import Codex from './screens/Codex'
import Setup from './screens/Setup'
import Deal from './screens/Deal'
import LanDeal from './screens/LanDeal'
import Lobby from './screens/Lobby'
import Join from './screens/Join'
import Night from './screens/Night'
import { Morning, Debate, Vote } from './screens/Day'
import End from './screens/End'
import Simple from './screens/Simple'
import Settings from './screens/Settings'
import { Modal, PlayerPicker, RevealModal } from './components/ui'
import { useHostRoom } from './services/lanroom'

type Screen = 'home' | 'start' | 'codex' | 'settings' | 'join' | 'lobby' | 'setup' | 'deal' | 'play'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [narration, setNarration] = useState<'assisted' | 'simple'>('assisted')
  const [dealBy, setDealBy] = useState<'pass' | 'lan'>('pass')
  // roomMode = on PRÉPARE une partie en room ; roomOpen = le salon tourne.
  // Les réglages se font d'abord, le salon ne s'ouvre qu'ensuite.
  const [roomMode, setRoomMode] = useState(false)
  const [roomOpen, setRoomOpen] = useState(false)
  const [cfg, setCfg] = useState<{ count: number; roles: string[]; opts: any } | null>(null)
  const room = useHostRoom(roomOpen)
  const [preset, setPreset] = useState<Preset | null>(null)
  const [game, setGame] = useState<GameState | null>(null)
  const [action, setAction] = useState<null | 'barbier' | 'alien'>(null)
  const [backTo, setBackTo] = useState<Screen>('home')
  const rules = useRules()

  useEffect(() => { loadUserImages() }, [])

  // peau nuit / jour
  useEffect(() => {
    const day = game && game.mode === 'assisted' && ['morning', 'debate', 'vote'].includes(game.phase)
    document.documentElement.dataset.phase = day ? 'day' : 'night'
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', day ? '#F6EFE0' : '#0A0D16')
  }, [game?.phase, game?.mode])

  useEffect(() => { if (game) localStorage.setItem('lgbt.game', JSON.stringify(game)) }, [game])

  // ── Le salon reçoit les annonces du معلّم ──
  useEffect(() => {
    if (!roomOpen || !game) return
    const say =
      game.phase === 'night' ? `🌙 ليلة ${game.night} — الحومة راقدة.`
        : game.phase === 'morning' ? '☀️ صبّح الصباح. شوفو شكون طار.'
          : game.phase === 'debate' ? '🫖 قعدة الحومة — تحدّثو.'
            : game.phase === 'vote' ? '✋ رفع اليدّين.'
              : game.phase === 'end' ? '🏁 الطبقة كمّلت.' : ''
    if (say) room.broadcast({ t: 'say', html: say })
  }, [game?.phase, game?.night, roomOpen])

  // ── Signaux 🔫/👽 envoyés par un joueur ──
  const sign = room.signs[0] ?? null

  const reset = () => {
    setGame(null); setPreset(null); setCfg(null)
    setRoomMode(false); setRoomOpen(false); setScreen('home')
  }
  const open = (s: Screen) => { setBackTo(screen); setScreen(s) }

  const begin = (c: StartChoice) => {
    setNarration(c.mode); setPreset(c.preset); setScreen('setup')
  }

  /** Fin des réglages. En mode room on ouvre le salon ; sinon on distribue. */
  const start = useCallback((names: string[], roles: string[], opts: any) => {
    if (roomMode) {
      setCfg({ count: names.length, roles, opts })
      setRoomOpen(true)
      setScreen('lobby')
      return
    }
    setDealBy(opts.dealBy ?? 'pass')
    setGame(createGame(names, roles, { ...opts, mode: narration, houseRules: { ...rules } }))
    setScreen('deal')
  }, [narration, rules, roomMode])

  /** Le salon est plein (ou le معلّم passe outre) : la partie démarre. */
  const startFromRoom = useCallback((names: string[]) => {
    if (!cfg) return
    setDealBy(cfg.opts.dealBy === 'pass' ? 'pass' : 'lan')
    setGame(createGame(names, cfg.roles, { ...cfg.opts, mode: narration, houseRules: { ...rules } }))
    setScreen('deal')
  }, [cfg, narration, rules])

  // ═══════════════════════════════════════════════════════════
  switch (screen) {
    case 'home':
      return <div className="app"><Home
        onCodex={() => open('codex')}
        onSettings={() => open('settings')}
        onJoin={() => open('join')}
        onHost={() => { setRoomMode(true); setScreen('start') }}
        onPlay={() => { setRoomMode(false); setScreen('start') }} /></div>

    case 'codex': return <div className="app"><Codex onBack={() => setScreen(backTo)} /></div>
    case 'settings': return <div className="app"><Settings onBack={() => setScreen(backTo)} /></div>
    case 'join': return <div className="app"><Join onBack={() => setScreen(backTo)} /></div>

    case 'lobby': return <div className="app"><Lobby
      room={room} need={cfg?.count ?? 0}
      onBack={() => { setRoomOpen(false); setScreen('setup') }}
      onStart={startFromRoom} /></div>
    case 'start': return <div className="app"><Start lan={roomMode} onBack={reset} onGo={begin} /></div>

    case 'setup': return <div className="app">
      <Setup preset={preset}
        lan={roomMode}
        onBack={() => setScreen('start')}
        onSettings={() => open('settings')}
        onStart={start} /></div>
  }

  if (!game) return null

  if (screen === 'deal') return <div className="app">
    {dealBy === 'lan'
      ? <LanDeal game={game} roster={room.roster} push={room.push}
        onDone={() => setScreen('play')} onBack={() => setScreen('setup')} />
      : <Deal game={game} onDone={() => setScreen('play')} />}
  </div>

  // ═══ en jeu ═══
  if (game.mode === 'simple') return <div className="app">
    <Simple game={game} setGame={setGame} onHome={reset} /></div>

  return (
    <div className="app">
      {game.phase === 'night' && <Night game={game} setGame={setGame} />}
      {game.phase === 'morning' && <Morning game={game} setGame={setGame} />}
      {game.phase === 'debate' && <Debate game={game} setGame={setGame} />}
      {game.phase === 'vote' && <Vote game={game} setGame={setGame} />}
      {game.phase === 'end' && <End game={game} onRestart={reset} onHome={reset} />}

      {game.phase !== 'end' && game.phase !== 'night' && (canBarbier(game) || canAlien(game)) && (
        <button className="fab" onClick={() => setAction(canBarbier(game) ? 'barbier' : 'alien')}>⚡</button>
      )}

      {sign && (
        <Modal open onClose={() => room.dismissSign(sign.at)}>
          <div className="center">
            <div style={{ fontSize: 44 }}>{sign.kind === 'barbier' ? '🔫' : '👽'}</div>
            <h2 style={{ margin: '8px 0' }}>
              {sign.from} {sign.kind === 'barbier' ? 'يحبّ يطلق' : 'يحبّ يحزر'}
            </h2>
            <p className="small muted">طلب منّك تفتحلو الحركة.</p>
            <div className="row">
              <button className="btn btn-block" onClick={() => room.dismissSign(sign.at)}>بعد شويّة</button>
              <button className="btn btn-primary btn-block"
                onClick={() => { room.dismissSign(sign.at); setAction(sign.kind) }}>إفتح</button>
            </div>
          </div>
        </Modal>
      )}
      {action && <ActionModal game={game} kind={action} onClose={() => setAction(null)} setGame={setGame} />}
      <RevealModal game={game} onClose={() => setGame(clearReveal(game))} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
function ActionModal({ game, kind, onClose, setGame }:
  { game: GameState; kind: 'barbier' | 'alien'; onClose: () => void; setGame: (g: GameState) => void }) {
  const [tab, setTab] = useState<'barbier' | 'alien'>(kind)
  const [target, setTarget] = useState<string[]>([])
  const [guess, setGuess] = useState('')
  const both = canBarbier(game) && canAlien(game)

  const run = () => {
    if (!target[0]) return
    setGame(tab === 'barbier' ? barbierShoot(game, target[0]) : alienGuess(game, target[0], guess))
    onClose()
  }

  return (
    <Modal open onClose={onClose}>
      {both && (
        <div className="grid2" style={{ marginBottom: 14 }}>
          <button className={`chip-btn ${tab === 'barbier' ? 'sel' : ''}`} onClick={() => setTab('barbier')}>🔫 Barbier</button>
          <button className={`chip-btn ${tab === 'alien' ? 'sel' : ''}`} onClick={() => setTab('alien')}>👽 Alien</button>
        </div>
      )}
      <h2>{tab === 'barbier' ? '🔫 طلقة الـ Barbier' : '👽 الـ Alien يحزر'}</h2>
      <p className="small muted">
        {tab === 'barbier'
          ? 'طلقة وحدة في الطبقة. ضرب ذيب ولّا وحداني → يعيش. ضرب واحد من الحومة → يموت معاه.'
          : 'يختار واحد ويحزر دورو. حزر صحّ → الآخر يطير. غلط → الـ Alien يموت.'}
      </p>
      <div className="divider" />
      <PlayerPicker game={game} max={1} selected={target}
        candidates={alive(game).filter(p => p.roleId !== tab).map(p => p.id)}
        onToggle={id => setTarget(t => t[0] === id ? [] : [id])} />
      {tab === 'alien' && target[0] && (<>
        <div className="divider" />
        <label className="small muted">شنوّة دورو؟</label>
        <select className="input" value={guess} onChange={e => setGuess(e.target.value)}>
          <option value="">— اختار دور —</option>
          {ROLES.map(r => <option key={r.id} value={r.id}>{r.emoji} {r.nameFr}</option>)}
        </select>
      </>)}
      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn btn-block" onClick={onClose}>بَرّا</button>
        <button className="btn btn-danger btn-block" disabled={!target[0] || (tab === 'alien' && !guess)} onClick={run}>
          {tab === 'barbier' ? '🔫 إطلق' : '👽 إحزر'}
        </button>
      </div>
    </Modal>
  )
}

import React, { useState } from 'react'
import type { GameState } from '../engine/types'
import { NIGHT_ORDER } from '../engine/engine'
import { role, CAMP_META } from '../engine/data'
import { TopBar, BottomBar, Modal, RoleImg, useCountdown, fmt } from '../components/ui'
import { OrnateTitle, Frieze, Khomsa, Khatim, Crescent, tap } from '../components/ornaments'
import { useRules, debateSeconds } from '../services/settings'
import { RoleSheet } from './Codex'

/**
 * 🎴 MOZZA3 BASIT — « distributeur simple »
 * L'app distribue, donne le récapitulatif d'affectation, et met à disposition
 * les outils de narration (chrono, ordre de nuit, compteur de vivants).
 * Aucune logique de jeu : le narrateur mène la partie à sa façon.
 */
export default function Simple({ game, setGame, onHome }:
  { game: GameState; setGame: (g: GameState) => void; onHome: () => void }) {
  const rules = useRules()
  const [tab, setTab] = useState<'recap' | 'chrono' | 'order'>('recap')
  const [reveal, setReveal] = useState(false)
  const [sheet, setSheet] = useState<string | null>(null)
  const [secs, setSecs] = useState(debateSeconds(rules))
  const [run, setRun] = useState(false)
  const { left, reset, set } = useCountdown(secs, run)

  const aliveN = game.players.filter(p => p.alive).length
  const toggleAlive = (id: string) => {
    const g = JSON.parse(JSON.stringify(game)) as GameState
    const p = g.players.find(x => x.id === id)!
    p.alive = !p.alive
    p.deathCause = p.alive ? null : 'المعلّم'
    setGame(g)
  }

  return (
    <>
      <TopBar title="🎴 موزّع بسيط" sub={`${aliveN} / ${game.players.length} حيّ`} onBack={onHome}
        right={<button className="btn btn-sm btn-ghost" onClick={() => setReveal(r => !r)}>{reveal ? '🙈' : '👁️'}</button>} />

      <div className="screen stack">
        <div className="grid3">
          {([['recap', '📋', 'التوزيع'], ['chrono', '⏱️', 'الكرونو'], ['order', '🌙', 'الترتيب']] as const).map(([id, e, l]) => (
            <button key={id} className={`chip-btn ${tab === id ? 'sel' : ''}`} onClick={() => { tap(); setTab(id) }}>
              <span style={{ fontSize: 22 }}>{e}</span>{l}
            </button>
          ))}
        </div>

        {/* ═══ Récap d'affectation ═══ */}
        {tab === 'recap' && <>
          <div className="card">
            <div className="row">
              <OrnateTitle icon={<span style={{ fontSize: 19 }}>📋</span>}>شكون خذا شنوّة</OrnateTitle>
              <div className="spacer" />
              <button className="btn btn-sm" onClick={() => setReveal(r => !r)}>
                {reveal ? '🙈 خبّي' : '👁️ وري'}
              </button>
            </div>
            <div className="hint small" style={{ marginTop: 8 }}>
              🤫 للمعلّم برك. إضغط على اللاعب باش تعلّمو ميّت/حيّ.
            </div>
          </div>

          <div className="plist">
            {[...game.players].sort((a, b) => a.seat - b.seat).map(p => {
              const r = role(p.roleId)
              return (
                <div className={`pitem ${p.alive ? '' : 'dead'}`} key={p.id} onClick={() => toggleAlive(p.id)}>
                  <div className="seat">{p.seat + 1}</div>
                  {reveal && <RoleImg roleId={p.roleId} className="avatar" />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="nm">{p.name} {p.alive ? '' : '💀'}</div>
                    {reveal
                      ? <div className="tiny latin" style={{ color: CAMP_META[r.camp]?.color, fontWeight: 700 }}>
                        {r.emoji} {r.nameFr}{p.lover ? ' ❤️' : ''}
                      </div>
                      : <div className="tiny muted">••••••</div>}
                  </div>
                  {reveal && <button className="btn btn-sm btn-ghost"
                    onClick={e => { e.stopPropagation(); setSheet(p.roleId) }}>ℹ️</button>}
                </div>
              )
            })}
          </div>

          <div className="card">
            <OrnateTitle icon={<span style={{ fontSize: 19 }}>🎴</span>}>الباكي</OrnateTitle>
            <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(game.players.reduce((a, p) => { a[p.roleId] = (a[p.roleId] ?? 0) + 1; return a }, {} as Record<string, number>))
                .map(([id, c]) => {
                  const r = role(id)
                  return <span className="tag" key={id} style={{ border: `1px solid ${CAMP_META[r.camp]?.color}` }}>
                    {r.emoji} <span className="latin">{r.nameFr}</span>{c > 1 && <b className="latin"> ×{c}</b>}
                  </span>
                })}
            </div>
          </div>
        </>}

        {/* ═══ Chrono ═══ */}
        {tab === 'chrono' && <>
          <div className="card center" style={{ overflow: 'hidden' }}>
            <Khomsa size={96} className="khomsa-wm" style={{ color: 'var(--primary)' }} />
            <div className={`timer ${left <= 20 ? 'low' : ''}`}>{fmt(left)}</div>
            <Frieze />
            <div className="row" style={{ justifyContent: 'center', marginTop: 12, gap: 8 }}>
              <button className="btn" onClick={() => { tap(); setRun(r => !r) }}>{run ? '⏸️ وقّف' : '▶️ إبدا'}</button>
              <button className="btn" onClick={() => { tap(); setRun(false); reset() }}>🔄 عاود</button>
            </div>
          </div>
          <div className="card">
            <OrnateTitle icon={<Khatim size={17} />}>أوقات جاهزة</OrnateTitle>
            <div className="grid3">
              {[60, 90, 120, 180, 240, 300].map(v => (
                <button key={v} className={`chip-btn ${secs === v ? 'sel' : ''}`}
                  onClick={() => { setSecs(v); set(v); setRun(false) }}>
                  <span className="latin" style={{ fontSize: 19, fontWeight: 800 }}>{fmt(v)}</span>
                  {v === 180 && <span className="tiny muted">☕ قهوة</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="card">
            <OrnateTitle icon={<span style={{ fontSize: 19 }}>👥</span>}>الأحياء</OrnateTitle>
            <div className="row" style={{ justifyContent: 'center', gap: 20 }}>
              <div className="center"><div className="latin" style={{ fontSize: 40, fontWeight: 900, color: 'var(--success)' }}>{aliveN}</div><div className="tiny muted">حيّ</div></div>
              <div className="center"><div className="latin" style={{ fontSize: 40, fontWeight: 900, color: 'var(--danger)' }}>{game.players.length - aliveN}</div><div className="tiny muted">طار</div></div>
            </div>
          </div>
        </>}

        {/* ═══ Ordre de nuit ═══ */}
        {tab === 'order' && (
          <div className="card">
            <OrnateTitle icon={<Crescent size={18} />}>ترتيب الفيقان</OrnateTitle>
            <p className="small muted" style={{ marginTop: 0 }}>الأدوار اللي في الطبقة متاعك برك.</p>
            <div className="stack" style={{ gap: 6 }}>
              {game.players.some(p => p.roleId === 'voleur') && (
                <div className="row small"><span className="seat" style={{ width: 24, height: 24, fontSize: 12 }}>★</span>
                  <span>🃏</span><span className="latin" style={{ fontWeight: 600 }}>Voleur</span>
                  <span className="tiny muted">— قبل الكل، الليلة 1</span></div>
              )}
              {NIGHT_ORDER.filter(id => id === 'lovers_recognize'
                ? game.players.some(p => p.roleId === 'cupidon')
                : game.players.some(p => p.roleId === id)).map((id, i) => {
                  const r = id === 'lovers_recognize' ? null : role(id)
                  return (
                    <div className="row small" key={id}>
                      <span className="seat" style={{ width: 24, height: 24, fontSize: 12 }}>{i + 1}</span>
                      {r ? <>
                        <RoleImg roleId={id} className="avatar" style={{ width: 28, height: 28, borderRadius: 8 }} />
                        <span className="latin" style={{ fontWeight: 600 }}>{r.emoji} {r.nameFr}</span>
                      </> : <><span style={{ width: 28, textAlign: 'center' }}>❤️</span><span>الحبايب يتعارفو</span></>}
                      <div className="spacer" />
                      {id === 'loup_pere_infecte' && <span className="tiny muted">من الليلة 2</span>}
                      {(id === 'cupidon' || id === 'enfant_sauvage' || id === 'lovers_recognize') && <span className="tiny muted">الليلة 1</span>}
                    </div>
                  )
                })}
            </div>
            <div className="hint small" style={{ marginTop: 12 }}>
              🧕 <span className="latin">Servante Dévouée</span>: في النهار، قبل كشف كارطة اللي طار.<br />
              🐻 <span className="latin">Ours</span>: ما يفيقش — يهرّ في الصباح كان جارو ذيب.
            </div>
          </div>
        )}
      </div>

      <BottomBar>
        <button className="btn btn-lg" onClick={onHome}>🏠</button>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setTab(tab === 'chrono' ? 'recap' : 'chrono')}>
          {tab === 'chrono' ? '📋 التوزيع' : '⏱️ الكرونو'}
        </button>
      </BottomBar>

      <Modal open={!!sheet} onClose={() => setSheet(null)}>
        {sheet && <RoleSheet id={sheet} onClose={() => setSheet(null)} />}
      </Modal>
    </>
  )
}

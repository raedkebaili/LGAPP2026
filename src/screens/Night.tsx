import React, { useEffect, useMemo, useState } from 'react'
import type { GameState } from '../engine/types'
import { currentStep, submitStep, clearReveal, nightProgress, byId, alive } from '../engine/engine'
import { roleName, roleEmoji, roleImg, role, ROLES } from '../engine/data'
import { TopBar, BottomBar, PlayerPicker, RevealModal, Modal, RoleImg } from '../components/ui'
import { Crescent, Frieze } from '../components/ornaments'
import { useRules, lexicon } from '../services/settings'

export default function Night({ game, setGame }:
  { game: GameState; setGame: (g: GameState) => void; }) {
  const step = currentStep(game)
  const [sel, setSel] = useState<string[]>([])
  const [mode, setMode] = useState<string | null>(null)   // pyromane / sorcière
  const [witch, setWitch] = useState<{ heal: boolean; kill: string | null }>({ heal: false, kill: null })
  const [guess, setGuess] = useState('')
  const prog = nightProgress(game)
  const lex = lexicon(useRules())

  useEffect(() => { setSel([]); setMode(null); setWitch({ heal: false, kill: null }); setGuess('') }, [game.stepIdx, game.night])

  if (!step) return null
  const toggle = (id: string) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const go = (v: any) => setGame(submitStep(game, v))

  const victimId = game.picks['loup_garou']?.[0]
  const victim = victimId ? byId(game, victimId) : null

  return (
    <>
      <TopBar title={`${lex.nightTitle} ${game.night}`} sub={`${prog.idx + 1} / ${prog.total}`} />
      <div className="progress" style={{ margin: '0 14px' }}>
        <i style={{ width: `${(prog.idx / Math.max(1, prog.total)) * 100}%` }} />
      </div>

      <div className="screen stack">
        {/* en-tête du rôle */}
        <div className="row" style={{ gap: 14, position: 'relative' }}>
          {step.roleId && <RoleImg roleId={step.roleId} className="avatar" style={{ width: 62, height: 62, borderRadius: 16 }} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="latin" style={{ fontSize: 23, fontWeight: 800 }}>{step.emoji} {step.titleFr}</div>
            {step.secret && <span className="tag" style={{ marginTop: 4 }}>🔒 معلومة سرّيّة</span>}
          </div>
          <Crescent size={26} className="glow-soft" />
        </div>
        <Frieze />

        <div className="say">{step.sayAr}</div>
        {step.hintAr && <div className="hint" dangerouslySetInnerHTML={{ __html: step.hintAr }} />}

        {/* ─── VOLEUR ─── */}
        {step.kind === 'voleur' && (
          <div className="stack">
            <div className="grid2">
              {game.memory.centerCards.map((c, i) => (
                <div key={i} className="card center" style={{ padding: 12 }}>
                  <RoleImg roleId={c} style={{ width: '100%', borderRadius: 12 }} />
                  <div className="latin" style={{ fontWeight: 800, marginTop: 8 }}>{roleEmoji(c)} {roleName(c)}</div>
                  <button className="btn btn-primary btn-sm btn-block" style={{ marginTop: 8 }}
                    onClick={() => go({ swap: true, index: i })}>خوذ هذي 🔀</button>
                </div>
              ))}
            </div>
            {game.memory.centerCards.every(c => role(c).camp === 'loups')
              ? <div className="hint" style={{ borderColor: 'var(--danger)' }}>⚠️ الزوز كارطات <b>ذيابة</b> — <b>مجبور</b> ياخذ وحدة!</div>
              : <button className="btn btn-block" onClick={() => go({ swap: false })}>ما نبدّلش — نبقى <span className="latin">Villageois</span> 🧍</button>}
          </div>
        )}

        {/* ─── INFO ─── */}
        {step.kind === 'info' && <button className="btn btn-primary btn-lg btn-block" onClick={() => go(null)}>عدّي ✓</button>}

        {/* ─── CHOIX ─── */}
        {step.kind === 'choice' && (
          <div className="stack">
            {step.options?.map(o => (
              <button key={o.id} className="btn btn-lg btn-block" onClick={() => go(o.id)}>{o.emoji} {o.labelAr}</button>
            ))}
          </div>
        )}

        {/* ─── PICK / BERGER ─── */}
        {(step.kind === 'pick' || step.kind === 'berger') && (
          <>
            <div className="row small muted">
              <span>
                {step.min === step.max
                  ? `اختار ${step.min} ${step.min === 1 ? 'واحد' : 'أشخاص'}`
                  : `اختار من ${step.min} لـ ${step.max}`}
              </span>
              <div className="spacer" />
              <span className="latin">{sel.length}/{step.max}</span>
            </div>
            <PlayerPicker game={game} candidates={step.candidates ?? []} selected={sel}
              onToggle={toggle} max={step.max ?? 1} />
          </>
        )}

        {/* ─── ALIEN ─── */}
        {step.kind === 'alien' && (
          <div className="stack">
            <PlayerPicker game={game} candidates={step.candidates ?? []} selected={sel}
              onToggle={id => setSel(s => s[0] === id ? [] : [id])} max={1} />
            {sel[0] && <>
              <label className="small muted">شنوّة دورو؟</label>
              <select className="input" value={guess} onChange={e => setGuess(e.target.value)}>
                <option value="">— اختار دور —</option>
                {ROLES.map(r => <option key={r.id} value={r.id}>{r.emoji} {r.nameFr}</option>)}
              </select>
            </>}
          </div>
        )}

        {/* ─── PYROMANE ─── */}
        {step.kind === 'pyromane' && (
          <div className="stack">
            <div className="grid2">
              <button className={`chip-btn ${mode === 'douse' ? 'sel' : ''}`} onClick={() => { setMode('douse'); setSel([]) }}>
                <span style={{ fontSize: 26 }}>💧</span>يبلّل
              </button>
              <button className={`chip-btn ${mode === 'burn' ? 'sel' : ''}`} onClick={() => setMode('burn')}
                disabled={alive(game).filter(p => p.doused).length === 0}>
                <span style={{ fontSize: 26 }}>🔥</span>يشعل النار
              </button>
            </div>
            {mode === 'douse' && <PlayerPicker game={game} candidates={step.candidates ?? []} selected={sel} onToggle={toggle} max={step.max ?? 2} />}
            {mode === 'burn' && (
              <div className="card" style={{ borderColor: 'var(--danger)' }}>
                <h3>🔥 النار باش تاكل</h3>
                <div className="plist">
                  {alive(game).filter(p => p.doused).map(p => (
                    <div className="pitem" key={p.id}><div className="seat">{p.seat + 1}</div><div className="nm">{p.name}</div>💧</div>
                  ))}
                </div>
                {game.memory.sheepWet > 0 && <div className="hint small" style={{ marginTop: 10 }}>
                  🐑 و <b>{game.memory.sheepWet}</b> خروف مبلول يتحرقو زادة
                </div>}
              </div>
            )}
          </div>
        )}

        {/* ─── SORCIÈRE ─── */}
        {step.kind === 'sorciere' && (
          <div className="stack">
            <div className="card center">
              {victim ? <>
                <div className="muted small">ضحيّة الليلة</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>💀 {victim.name}</div>
              </> : <div className="muted">ما فمّاش ضحيّة الليلة</div>}
            </div>
            <div className="grid2">
              <button className={`chip-btn ${witch.heal ? 'sel' : ''}`}
                disabled={game.memory.sorciereHeal || !victim}
                onClick={() => setWitch(w => ({ ...w, heal: !w.heal }))}>
                <span style={{ fontSize: 26 }}>💚</span>
                {game.memory.sorciereHeal ? 'شربة الحياة مستعملة' : 'تحيّيه'}
              </button>
              <button className={`chip-btn ${mode === 'kill' ? 'sel' : ''}`}
                disabled={game.memory.sorciereKill}
                onClick={() => setMode(mode === 'kill' ? null : 'kill')}>
                <span style={{ fontSize: 26 }}>🧪</span>
                {game.memory.sorciereKill ? 'شربة الموت مستعملة' : 'تقتل في حدّ'}
              </button>
            </div>
            {mode === 'kill' && (
              <PlayerPicker game={game} candidates={step.candidates ?? []}
                selected={witch.kill ? [witch.kill] : []}
                onToggle={id => setWitch(w => ({ ...w, kill: w.kill === id ? null : id }))} max={1} />
            )}
          </div>
        )}
      </div>

      <BottomBar>
        {(step.kind === 'pick' || step.kind === 'berger') && (
          <button className="btn btn-primary btn-lg btn-block"
            disabled={sel.length < (step.min ?? 1) || sel.length > (step.max ?? 1)}
            onClick={() => go(sel)}>
            {(step.min ?? 1) === 0 && sel.length === 0 ? 'ما يعمل والو — عدّي' : 'ثبّت ✓'}
          </button>
        )}
        {step.kind === 'pyromane' && (
          <button className="btn btn-primary btn-lg btn-block"
            disabled={!mode || (mode === 'douse' && sel.length === 0)}
            onClick={() => go(mode === 'burn' ? { action: 'burn' } : { action: 'douse', targets: sel })}>
            {mode === 'burn' ? '🔥 شعّل النار' : 'ثبّت ✓'}
          </button>
        )}
        {step.kind === 'alien' && (
          <button className="btn btn-primary btn-lg btn-block"
            disabled={!!sel[0] && !guess}
            onClick={() => go(sel[0] ? { target: sel[0], guess } : null)}>
            {sel[0] ? '👽 إحزر' : 'ما يحزرش الليلة — عدّي'}
          </button>
        )}
        {step.kind === 'sorciere' && (
          <button className="btn btn-primary btn-lg btn-block"
            onClick={() => go({ heal: witch.heal, kill: witch.kill })}>
            {witch.heal || witch.kill ? 'ثبّت ✓' : 'ما تعملش والو — عدّي'}
          </button>
        )}
      </BottomBar>

      <RevealModal game={game} onClose={() => setGame(clearReveal(game))} />
    </>
  )
}

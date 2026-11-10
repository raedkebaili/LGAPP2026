import React, { useEffect, useState } from 'react'
import type { GameState } from '../engine/types'
import { goDebate, goVote, setVote, lynch, byId, alive, hasServante, setLostVote } from '../engine/engine'
import { useRules, lexicon } from '../services/settings'
import { roleName, roleEmoji } from '../engine/data'
import { TopBar, BottomBar, Modal, useCountdown, fmt } from '../components/ui'
import { OrnateTitle, Frieze, Khomsa, Khatim, tap } from '../components/ornaments'

// ═══════════════════════════════════════════════════════════════
//  MATIN — le compte rendu du المعلّم
// ═══════════════════════════════════════════════════════════════
export function Morning({ game, setGame }:
  { game: GameState; setGame: (g: GameState) => void; }) {
  const m = game.morning!
  const rules = useRules(); const lex = lexicon(rules)
  return (
    <>
      <TopBar title={`${lex.morningTitle} ${game.day}`} />
      <div className="screen stack">
        <div className="say">الحومة تفيق... شوفو شكون ناقص اليوم.</div>

        {m.deaths.length === 0
          ? <div className="card center arch" style={{ overflow: 'hidden' }}>
            <Khomsa size={110} className="khomsa-wm" style={{ color: 'var(--success)' }} />
            <div style={{ fontSize: 46 }}>🕊️</div>
            <h2 style={{ margin: '4px 0' }}>ليلة بيضا</h2>
            <Frieze />
            <p className="muted" style={{ marginBottom: 0 }}>حتّى حدّ ما مات.</p>
          </div>
          : <div className="stack">
            {m.deaths.map(d => {
              const p = byId(game, d.playerId)!
              return (
                <div className="card" key={d.playerId} style={{ borderColor: 'var(--danger)' }}>
                  <div className="row">
                    <div style={{ fontSize: 34 }}>{d.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 21, fontWeight: 800 }}>{p.name} طار</div>
                      <div className="small muted">{d.cause}</div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="row small">
                    <span className="muted">كارطتو كانت</span>
                    <span className="latin" style={{ fontWeight: 800 }}>{roleEmoji(p.roleId)} {roleName(p.roleId)}</span>
                  </div>
                </div>
              )
            })}
          </div>}

        {m.bergerReport && (
          <div className="card" style={{ borderColor: 'var(--primary)' }}>
            <OrnateTitle icon={<span style={{ fontSize: 19 }}>🐑</span>}>خبر الرعيان</OrnateTitle>
            <div className="grid3" style={{ textAlign: 'center', margin: '10px 0' }}>
              <div><div style={{ fontSize: 30 }}>☠️</div><div className="latin" style={{ fontSize: 26, fontWeight: 800 }}>{m.bergerReport.dead}</div><div className="tiny muted">ماتو</div></div>
              <div><div style={{ fontSize: 30 }}>💧</div><div className="latin" style={{ fontSize: 26, fontWeight: 800 }}>{m.bergerReport.wet}</div><div className="tiny muted">مبلولين</div></div>
              <div><div style={{ fontSize: 30 }}>✅</div><div className="latin" style={{ fontSize: 26, fontWeight: 800 }}>{m.bergerReport.safe}</div><div className="tiny muted">بخير</div></div>
            </div>
            <div className="hint small">
              📣 يتقال <b>قدّام الحومة الكل</b> — <b>بلا أسماء</b>. الـ <span className="latin">Berger</span> وحدو يعرف وين بعث خرفانو.
              <br />باقي عندو <b>{game.memory.sheepAlive}</b> خروف ({game.memory.sheepWet} منهم مبلول 💧).
            </div>
          </div>
        )}

        {m.rumour && rules.nmima && (
          <div className="card" style={{ borderColor: 'var(--blue)' }}>
            <OrnateTitle icon={<span style={{ fontSize: 19 }}>🗣️</span>}>نميمة الحومة</OrnateTitle>
            <div style={{ fontSize: 19 }}>{m.rumour.textAr}</div>
            <div className="hint small" style={{ marginTop: 10 }}>
              🎲 الخبر هذا <b>ينجّم يكون صحيح وينجّم يكون كذب</b> — حتّى المعلّم ما يقولش.
              <br /><span className="tiny">(للمعلّم برك: هذي <b>{m.rumour.trueOne ? 'صحيحة ✅' : 'كذبة ❌'}</b>)</span>
            </div>
          </div>
        )}

        {rules['7echma'] && m.deaths.length > 0 && (
          <div className="panel small">🤫 <b>قانون الحشومة</b>: اللي طار ما عادش يحكي.</div>
        )}

        {m.oursGrowl && <div className="card center" style={{ borderColor: 'var(--accent)' }}>
          <div style={{ fontSize: 40 }}>🐻</div><h3>الدبّ هرّ!</h3>
          <p className="small muted">معناها فمّا <b>ذيب</b> في جيران الـ <span className="latin">Ours</span> (يمين ولّا يسار).</p>
        </div>}

        {m.muted && <div className="panel">🤐 <b>{byId(game, m.muted)?.name}</b> ما ينجّمش يحكي اليوم — <span className="latin">Loup Noir</span> سكّرلو فمّو.</div>}

        {m.notes.map((nt, i) => <div className="panel small" key={i}>• {nt}</div>)}
      </div>
      <BottomBar>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setGame(goDebate(game))}>☕ قعدة الحومة</button>
      </BottomBar>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  DÉBAT — « وقت القهوة »
// ═══════════════════════════════════════════════════════════════
export function Debate({ game, setGame }: { game: GameState; setGame: (g: GameState) => void }) {
  const rules = useRules()
  const [run, setRun] = useState(true)
  const { left, reset } = useCountdown(game.options.debateSeconds, run)
  const dir = game.memory.speechDirection === 'cw' ? '🔃 مع عقارب الساعة' : '🔄 ضدّ عقارب الساعة'

  return (
    <>
      <TopBar title="☕ قعدة الحومة" sub={`نهار ${game.day}`} />
      <div className="screen stack">
        <div className="card center" style={{ overflow: 'hidden' }}>
          <Khomsa size={96} className="khomsa-wm" style={{ color: 'var(--primary)' }} />
          <div className={`timer ${left <= 20 ? 'low' : ''}`}>{fmt(left)}</div>
          <Frieze />
          <div className="row" style={{ justifyContent: 'center', marginTop: 10 }}>
            <button className="btn btn-sm" onClick={() => { tap(); setRun(r => !r) }}>{run ? '⏸️ وقّف' : '▶️ كمّل'}</button>
            <button className="btn btn-sm" onClick={() => { tap(); reset() }}>🔄 عاود</button>
          </div>
        </div>

        <div className="panel"><b>الكلمة تدور:</b> {dir}</div>
        {rules.hess && <div className="hint small">🤫 <b>قانون الحسّ</b>: اللي حكى في الليل، إضغط 🤫 حذاه — يخسر صوتو في ڤوت اليوم.</div>}
        {alive(game).some(p => p.muted) && (
          <div className="panel" style={{ borderColor: 'var(--accent)' }}>
            🤐 ما ينجّمش يحكي اليوم: <b>{alive(game).filter(p => p.muted).map(p => p.name).join(' · ')}</b>
          </div>
        )}
        {game.memory.corbeauTarget && byId(game, game.memory.corbeauTarget)?.alive && (
          <div className="panel" style={{ borderColor: 'var(--primary)' }}>
            🐦‍⬛ الغراب حطّ <b>+2 صوت</b> على <b>{byId(game, game.memory.corbeauTarget)!.name}</b> — يبدا الڤوت وعندو 2.
          </div>
        )}

        <div className="card">
          <OrnateTitle icon={<Khatim size={17} />}>اللي باقيين ({alive(game).length})</OrnateTitle>
          <div className="plist">
            {alive(game).map(p => (
              <div className="pitem" key={p.id} style={{ cursor: 'default', opacity: p.lostVote ? .55 : 1 }}>
                <div className="seat">{p.seat + 1}</div>
                <div className="nm">{p.name}</div>
                {p.muted && <span>🤐</span>}{p.doused && <span>💧</span>}{p.lover && <span>❤️</span>}
                {rules.hess && (
                  <button className={`btn btn-sm ${p.lostVote ? 'btn-danger' : 'btn-ghost'}`}
                    title="حكى في الليل — يخسر صوتو"
                    onClick={() => setGame(setLostVote(game, p.id, !p.lostVote))}>🤫</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setGame(goVote(game))}>✋ رفع اليدّين</button>
      </BottomBar>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  VOTE — « رفع اليدّين »
// ═══════════════════════════════════════════════════════════════
export function Vote({ game, setGame }:
  { game: GameState; setGame: (g: GameState) => void; }) {
  const rules = useRules()
  const [confirm, setConfirm] = useState<string | null>(null)
  const [useServante, setUseServante] = useState(false)
  const [tieRound, setTieRound] = useState(0)
  const [defence, setDefence] = useState(false)
  const list = alive(game)
  const maxV = Math.max(0, ...list.map(p => game.votes[p.id] ?? 0))
  const leaders = list.filter(p => (game.votes[p.id] ?? 0) === maxV && maxV > 0)
  const tie = leaders.length > 1

  const doLynch = (id: string | null) => {
    const sv = useServante ? alive(game).find(p => p.roleId === 'servante_devouee')?.id ?? null : null
    const name = id ? byId(game, id)!.name : null
    const next = lynch(game, id, sv)
    setGame(next)
  }

  return (
    <>
      <TopBar title="✋ رفع اليدّين" sub={`نهار ${game.day} · ${list.filter(p => !p.lostVote).length} صوت${tieRound ? ' · ڤوت ثاني' : ''}`} />
      <div className="screen stack">
        <div className="say">شكون باش يطير من الحومة اليوم؟ إرفعو يديكم.</div>
        <div className="hint small">عدّ الأيادي وحطّ الرقم عند كل واحد. الغراب 🐦‍⬛ يزيد +2 أوتوماتيك.</div>

        <div className="plist">
          {list.map(p => {
            const v = game.votes[p.id] ?? 0
            const lead = v === maxV && maxV > 0
            return (
              <div className="pitem" key={p.id} style={{ cursor: 'default', borderColor: lead ? 'var(--primary)' : undefined }}>
                <div className="seat">{p.seat + 1}</div>
                <div className="nm">{p.name}{p.muted && ' 🤐'}</div>
                {game.memory.corbeauTarget === p.id && <span title="الغراب">🐦‍⬛</span>}
                {p.lostVote && <span title="خسر صوتو">🤫</span>}
                <button className="btn btn-sm" onClick={() => setGame(setVote(game, p.id, v - 1))} disabled={v <= 0}>−</button>
                <span className="latin" style={{ minWidth: 26, textAlign: 'center', fontSize: 19, fontWeight: 800, color: lead ? 'var(--primary)' : undefined }}>{v}</span>
                <button className="btn btn-sm" onClick={() => setGame(setVote(game, p.id, v + 1))}>+</button>
              </div>
            )
          })}
        </div>

        {tie && rules.zenga && (
          <div className="card" style={{ borderColor: 'var(--accent)' }}>
            <h3>⚖️ قانون الزنڨة — تعادل</h3>
            <p className="small muted">
              {tieRound === 0
                ? 'متعادلين. كل واحد منهم عندو دقيقة دفاع، ومن بعد ڤوت ثاني.'
                : 'باقي متعادلين بعد الدفاع → حتّى حدّ ما يموت اليوم.'}
            </p>
            <div className="row" style={{ flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {leaders.map(p => <span className="tag" key={p.id}>⚖️ {p.name}</span>)}
            </div>
            {tieRound === 0 && (
              <button className="btn btn-accent btn-block"
                onClick={() => { setDefence(true); setTieRound(1); setGame(goVote(game)) }}>
                🗣️ دقيقة دفاع ← ڤوت ثاني
              </button>
            )}
          </div>
        )}

        {hasServante(game) && (
          <label className="panel row" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={useServante} onChange={e => setUseServante(e.target.checked)} style={{ width: 20, height: 20 }} />
            <span>🧕 <b className="latin">La Servante Dévouée</b> تتقدّم وتاخذ كارطة اللي طار</span>
          </label>
        )}
      </div>

      <BottomBar>
        <button className="btn btn-ghost btn-lg" onClick={() => doLynch(null)}>حتّى حدّ</button>
        <button className="btn btn-danger btn-lg btn-block" disabled={maxV === 0 || tie}
          onClick={() => setConfirm(leaders[0]?.id ?? null)}>
          {tie ? (rules.zenga && tieRound === 0 ? '⚖️ تعادل — شوف تحت' : '⚖️ تعادل') : maxV === 0 ? 'عدّ الأصوات' : `طيّر ${leaders[0]?.name}`}
        </button>
      </BottomBar>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} tone="bad">
        <h2>✋ متأكّد؟</h2>
        <p><b>{confirm && byId(game, confirm)?.name}</b> باش يطير من الحومة.</p>
        {confirm && byId(game, confirm)?.roleId === 'ancien_sage' &&
          <div className="hint" style={{ borderColor: 'var(--danger)', margin: '12px 0' }}>
            ⚠️ هذا <b className="latin">Ancien Sage</b> — كان طار بالڤوت، <b>الحومة الكل تخسر قواها</b>!
          </div>}
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn btn-block" onClick={() => setConfirm(null)}>لا</button>
          <button className="btn btn-danger btn-block" onClick={() => { const c = confirm; setConfirm(null); doLynch(c) }}>إيه، يطير</button>
        </div>
      </Modal>
    </>
  )
}

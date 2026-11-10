import React, { useMemo, useState } from 'react'
import { ROLES, autoCompose, CAMP_META } from '../engine/data'
import { TopBar, BottomBar, Modal, RoleImg } from '../components/ui'
import { useRules, debateSeconds as ruleSeconds, excludedRoles, RULES } from '../services/settings'
import { savePreset, type Preset } from '../services/presets'
import { RoleSheet } from './Codex'
import { OrnateTitle, Khatim } from '../components/ornaments'

interface Props {
  preset?: Preset | null
  /** Vrai quand on prépare une partie en room : les noms viendront des joueurs. */
  lan?: boolean
  onBack: () => void
  onSettings: () => void
  onStart: (names: string[], roles: string[], opts: { sheepCount: number; debateSeconds: number; dealBy: 'pass' | 'lan' }) => void
}

export default function Setup({ preset, lan, onBack, onSettings, onStart }: Props) {
  const rules = useRules()
  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: preset?.players ?? 8 }, () => ''))
  // ── LE NARRATEUR CHOISIT : c'est lui qui remplit ce paquet ──
  const [deck, setDeck] = useState<Record<string, number>>(() => tally(preset?.roles ?? []))
  const [sheep, setSheep] = useState(3)
  const [debate, setDebate] = useState(ruleSeconds(rules))
  const [dealBy, setDealBy] = useState<'pass' | 'lan'>(lan ? 'lan' : 'pass')
  const [browse, setBrowse] = useState<string | null>(null)
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveName, setSaveName] = useState('')

  const n = names.length
  const cards = useMemo(() => {
    const out: string[] = []
    for (const [id, c] of Object.entries(deck)) for (let i = 0; i < c; i++) out.push(id)
    return out
  }, [deck])
  const total = cards.length
  const ok = total === n && n >= 4

  const bump = (id: string, d: number) =>
    setDeck(x => {
      const v = Math.max(0, (x[id] ?? 0) + d)
      const next = { ...x, [id]: v }
      if (!v) delete next[id]
      return next
    })

  const suggest = () => setDeck(tally(autoCompose(n, { useVoleur: n >= 10, exclude: excludedRoles(rules) })))

  const grouped = useMemo(() => {
    const g: Record<string, typeof ROLES> = { loups: [], village: [], variable: [], solo: [] }
    ROLES.forEach(r => { (g[r.camp] ??= []).push(r) })
    return g
  }, [])

  const counts = useMemo(() => {
    const c = { loups: 0, village: 0, solo: 0, variable: 0 } as Record<string, number>
    cards.forEach(id => { const r = ROLES.find(x => x.id === id); if (r) c[r.camp]++ })
    return c
  }, [cards])

  return (
    <>
      <TopBar title="🎛️ تحضير الطبقة" sub={`${n} لعّابة · ${total} كارطة`} onBack={onBack}
        right={<button className="btn btn-sm btn-ghost" onClick={onSettings}>⚙️</button>} />

      <div className="screen stack">

        {/* ── Le paquet du narrateur ── */}
        <div className="card" style={{ borderColor: ok ? 'var(--success)' : 'var(--border)' }}>
          <div className="row" style={{ marginBottom: 10 }}>
            <h3 style={{ margin: 0 }}>🎴 الباكي متاعك</h3>
            <div className="spacer" />
            <span className={`tag ${ok ? 'village' : 'loups'}`}>{total} / {n}</span>
          </div>

          {total === 0
            ? <div className="muted small center" style={{ padding: '14px 0' }}>
              مازال ما اخترت حتّى كارطة. إختار من تحت 👇
            </div>
            : <div className="row" style={{ flexWrap: 'wrap', gap: 7 }}>
              {Object.entries(deck).map(([id, c]) => {
                const r = ROLES.find(x => x.id === id)!
                return (
                  <button key={id} className="tag" onClick={() => bump(id, -1)}
                    style={{ border: `1px solid ${CAMP_META[r.camp]?.color}`, cursor: 'pointer', padding: '5px 10px' }}>
                    {r.emoji} <span className="latin">{r.nameFr}</span>{c > 1 && <b className="latin"> ×{c}</b>} ✕
                  </button>
                )
              })}
            </div>}

          <div className="row small muted" style={{ marginTop: 12, gap: 12, flexWrap: 'wrap' }}>
            <span>🐺 {counts.loups}</span><span>🏘️ {counts.village}</span>
            <span>🔥 {counts.solo}</span><span>🃏 {counts.variable}</span>
            {counts.loups > 0 && <span>· نسبة الذيابة <b className="latin">{Math.round(counts.loups / Math.max(1, total) * 100)}%</b></span>}
          </div>

          <div className="row" style={{ marginTop: 12, gap: 8 }}>
            <button className="btn btn-sm" onClick={suggest}>✨ إقترحلي</button>
            <button className="btn btn-sm btn-ghost" onClick={() => setDeck({})}>🧹 فرّغ</button>
            <div className="spacer" />
            <button className="btn btn-sm" disabled={!total}
              onClick={() => { setSaveName(`تركيبة ${total}`); setSaveOpen(true) }}>💾 سجّل</button>
          </div>
          {deck['berger'] && !deck['pyromane'] && (
            <div className="hint small" style={{ marginTop: 10 }}>
              ⚠️ الـ <span className="latin">Berger</span> يخدم مليح كان فمّا <span className="latin">Pyromane</span> (الخروف المبلول).
            </div>
          )}
          {counts.loups === 0 && total > 0 && (
            <div className="hint small" style={{ marginTop: 10, borderColor: 'var(--danger)' }}>
              ⚠️ ما فمّاش ذيابة في الباكي!
            </div>
          )}
        </div>

        {/* ── Joueurs ── */}
        <div className="card">
          <div className="row" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>👥 اللعّابة</h3>
            <div className="spacer" />
            <button className="btn btn-sm" onClick={() => setNames(x => x.slice(0, Math.max(4, x.length - 1)))}>−</button>
            <span className="latin" style={{ minWidth: 26, textAlign: 'center', fontWeight: 800 }}>{n}</span>
            <button className="btn btn-sm" onClick={() => setNames(x => [...x, ''])}>+</button>
          </div>

          {lan ? (
            <div className="hint small">
              📡 الأسامي تجي وحدها كي يدخلو اللعّابة للروم.
              إنت توّا برك حدّد <b>قدّاش لعّاب</b> وأشنوّة الأدوار.
            </div>
          ) : (
            <div className="stack" style={{ gap: 8 }}>
              {names.map((v, i) => (
                <div className="row" key={i}>
                  <div className="seat">{i + 1}</div>
                  <input className="input" value={v} placeholder={`لاعب ${i + 1}`}
                    onChange={e => setNames(x => x.map((y, j) => j === i ? e.target.value : y))} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Choix des rôles ── */}
        <div className="card">
          <OrnateTitle icon={<span style={{ fontSize: 19 }}>➕</span>}>زيد كارطات</OrnateTitle>
          <p className="small muted" style={{ marginTop: 0 }}>إنت المعلّم — إنت اللي تقرّر شكون يلعب.</p>

          {(['loups', 'village', 'variable', 'solo'] as const).map(camp => (
            <div key={camp} style={{ marginBottom: 14 }}>
              <div style={{ marginBottom: 7 }}>
                <span className={`tag ${camp}`}>{CAMP_META[camp].emoji} {CAMP_META[camp].label}</span>
              </div>
              <div className="stack" style={{ gap: 7 }}>
                {grouped[camp]?.map(r => {
                  const c = deck[r.id] ?? 0
                  const max = (r.id === 'villageois' || r.id === 'loup_garou') ? 12 : (r.count?.max ?? 1)
                  return (
                    <div className="pitem" key={r.id} style={{ cursor: 'default', opacity: c ? 1 : .68 }}>
                      <RoleImg roleId={r.id} className="avatar" />
                      <div style={{ flex: 1, minWidth: 0 }} onClick={() => setBrowse(r.id)}>
                        <div className="latin" style={{ fontWeight: 700, fontSize: 15 }}>{r.emoji} {r.nameFr}</div>
                        <div className="tiny muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.descAr.replace(/<[^>]+>/g, '').slice(0, 52)}…
                        </div>
                      </div>
                      <button className="btn btn-sm" onClick={() => bump(r.id, -1)} disabled={!c}>−</button>
                      <span className="latin" style={{ minWidth: 18, textAlign: 'center', fontWeight: 800 }}>{c}</span>
                      <button className="btn btn-sm" onClick={() => bump(r.id, 1)} disabled={c >= max}>+</button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Règles actives ── */}
        <div className="card">
          <div className="row" style={{ marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>📜 قوانين الحومة</h3>
            <div className="spacer" />
            <button className="btn btn-sm btn-ghost" onClick={onSettings}>بدّل ⚙️</button>
          </div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
            {RULES.filter(r => rules[r.id]).map(r => <span className="tag" key={r.id}>✓ {r.nameAr}</span>)}
            {RULES.every(r => !rules[r.id]) && <span className="muted small">حتّى قانون ما هو مشعّل.</span>}
          </div>
        </div>

        {/* ── Distribution des cartes : un choix seulement s'il y a une room ── */}
        <div className="card">
          <OrnateTitle icon={<span style={{ fontSize: 19 }}>🎴</span>}>كيفاش توزّع الكارطات؟</OrnateTitle>
          {!lan && (
            <div className="hint small" style={{ marginTop: 10 }}>
              📱 <b>تمرير التيليفون</b> — تيليفون واحد يدور على اللعّابة، كلّ واحد يشوف كارطتو ويعدّيه.
              <br />
              <span className="tiny muted">
                تحبّ كلّ واحد يشوف كارطتو في تيليفونو؟ أرجع للصفحة الأولى وأعمل
                <b> روم على الواي فاي</b>.
              </span>
            </div>
          )}
          <div className="stack" style={{ gap: 10, marginTop: 10, display: lan ? undefined : 'none' }}>
            <button className={`pitem ${dealBy === 'pass' ? 'sel' : ''}`} style={{ alignItems: 'flex-start' }}
              onClick={() => setDealBy('pass')}>
              <div style={{ fontSize: 26, marginTop: 2 }}>📱</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800 }}>تمرير التيليفون</div>
                <div className="small muted">تيليفون واحد يدور على اللعّابة، كلّ واحد يشوف كارطتو ويعدّيه.</div>
              </div>
              {dealBy === 'pass' && <span style={{ color: 'var(--primary)', fontSize: 20 }}>✓</span>}
            </button>
            {lan && (
              <button className={`pitem ${dealBy === 'lan' ? 'sel' : ''}`} style={{ alignItems: 'flex-start' }}
                onClick={() => setDealBy('lan')}>
                <div style={{ fontSize: 26, marginTop: 2 }}>📡</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800 }}>عبر الروم</div>
                  <div className="small muted">
                    الكارطات تمشي وحدها لتيليفون كلّ لاعب في الروم.
                    <b> أسرع طريقة.</b>
                  </div>
                </div>
                {dealBy === 'lan' && <span style={{ color: 'var(--primary)', fontSize: 20 }}>✓</span>}
              </button>
            )}
          </div>
        </div>

        {/* ── Réglages ── */}
        <div className="card">
          <OrnateTitle icon={<Khatim size={17} />}>إعدادات الطبقة</OrnateTitle>
          <div className="row" style={{ marginBottom: 10 }}>
            <span style={{ flex: 1 }}>🐑 خرفان الـ <span className="latin">Berger</span></span>
            <button className="btn btn-sm" onClick={() => setSheep(s => Math.max(2, s - 1))}>−</button>
            <span className="latin" style={{ minWidth: 20, textAlign: 'center', fontWeight: 800 }}>{sheep}</span>
            <button className="btn btn-sm" onClick={() => setSheep(s => Math.min(6, s + 1))}>+</button>
          </div>
          <div className="tiny muted" style={{ marginBottom: 12 }}>
            الـ <span className="latin">Pyromane</span> يبلّل <b>{Math.max(1, sheep - 1)}</b> ناس كل ليلة
          </div>
          <div className="row">
            <span style={{ flex: 1 }}>☕ وقت القهوة</span>
            <button className="btn btn-sm" onClick={() => setDebate(d => Math.max(60, d - 30))}>−</button>
            <span className="latin" style={{ minWidth: 48, textAlign: 'center', fontWeight: 800 }}>
              {Math.floor(debate / 60)}:{String(debate % 60).padStart(2, '0')}</span>
            <button className="btn btn-sm" onClick={() => setDebate(d => Math.min(600, d + 30))}>+</button>
          </div>
        </div>
      </div>

      <BottomBar>
        <button className="btn btn-primary btn-lg btn-block" disabled={!ok}
          onClick={() => onStart(names.map((x, i) => x.trim() || `لاعب ${i + 1}`), cards, { sheepCount: sheep, debateSeconds: debate, dealBy })}>
          {ok
            ? (lan ? '📡 إفتح الروم للّعّابة' : '🎴 قسّم الكارطات')
            : total > n ? `نقّص ${total - n} كارطة` : `باقي ${n - total} كارطة`}
        </button>
      </BottomBar>

      <Modal open={!!browse} onClose={() => setBrowse(null)}>
        {browse && <RoleSheet id={browse} onClose={() => setBrowse(null)} />}
      </Modal>

      <Modal open={saveOpen} onClose={() => setSaveOpen(false)}>
        <h2>💾 سجّل التركيبة</h2>
        <p className="small muted">تتسجّل في التيليفون وتلقاها في «طبقة جديدة» المرّة الجاية.</p>
        <input className="input" value={saveName} onChange={e => setSaveName(e.target.value)} autoFocus />
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn btn-block" onClick={() => setSaveOpen(false)}>بَرّا</button>
          <button className="btn btn-primary btn-block"
            onClick={() => { savePreset(saveName, cards); setSaveOpen(false) }}>سجّل</button>
        </div>
      </Modal>
    </>
  )
}

function tally(list: string[]) {
  const o: Record<string, number> = {}
  list.forEach(x => { o[x] = (o[x] ?? 0) + 1 })
  return o
}

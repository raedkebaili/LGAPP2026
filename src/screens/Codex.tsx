import React, { useMemo, useState } from 'react'
import { ROLES, CAMP_META, role } from '../engine/data'
import { NIGHT_ORDER } from '../engine/engine'
import { TopBar, Modal, RoleImg, CampTag } from '../components/ui'
import { OrnateTitle, Frieze, Crescent, tap } from '../components/ornaments'

/** 📖 دليل الأدوار — l'écran d'accueil / de démarrage avec toutes les cartes */
export default function Codex({ onBack }: { onBack: () => void }) {
  const [open, setOpen] = useState<string | null>(null)
  const [camp, setCamp] = useState<string>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => ROLES.filter(r =>
    (camp === 'all' || r.camp === camp) &&
    (!q || r.nameFr.toLowerCase().includes(q.toLowerCase()) || r.descAr.includes(q))
  ), [camp, q])

  const order = (id: string) => {
    const i = NIGHT_ORDER.indexOf(id)
    return i < 0 ? null : i + 1
  }

  return (
    <>
      <TopBar title="📖 دليل الأدوار" sub={`${ROLES.length} دور`} onBack={onBack} />
      <div className="screen stack">
        <input className="input" placeholder="🔎 لوّج على دور..." value={q} onChange={e => setQ(e.target.value)} />

        <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
          {[['all', '🎴 الكل'], ['loups', '🐺 الذيابة'], ['village', '🏘️ الحومة'], ['variable', '🃏 يتبدّل'], ['solo', '🔥 وحداني']].map(([id, lbl]) => (
            <button key={id} className={`btn btn-sm ${camp === id ? 'btn-primary' : ''}`}
              onClick={() => { tap(); setCamp(id) }}>{lbl}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12 }}>
          {list.map(r => (
            <button key={r.id} onClick={() => { tap(); setOpen(r.id) }}
              style={{
                background: 'var(--surface)', border: `1.5px solid ${CAMP_META[r.camp]?.color ?? 'var(--border)'}`,
                borderRadius: 'var(--r-lg)', padding: 0, overflow: 'hidden', cursor: 'pointer',
                textAlign: 'start', color: 'var(--text)', fontFamily: 'var(--f-ui)',
              }}>
              <RoleImg roleId={r.id} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '9px 11px 12px' }}>
                <div className="latin" style={{ fontWeight: 800, fontSize: 15, color: CAMP_META[r.camp]?.color }}>
                  {r.emoji} {r.nameFr}
                </div>
                <div className="tiny muted" style={{ marginTop: 2 }}>
                  {CAMP_META[r.camp]?.label}
                  {order(r.id) && <> · يفيق {order(r.id)}ᵉ</>}
                </div>
              </div>
            </button>
          ))}
        </div>

        <Frieze />

        <div className="card">
          <OrnateTitle icon={<Crescent size={18} />}>ترتيب الفيقان في الليل</OrnateTitle>
          <div className="stack" style={{ gap: 5 }}>
            {NIGHT_ORDER.map((id, i) => {
              const r = id === 'lovers_recognize' ? null : role(id)
              return (
                <div className="row small" key={id + i}>
                  <span className="seat" style={{ width: 24, height: 24, fontSize: 12 }}>{i + 1}</span>
                  {r ? <>
                    <span>{r.emoji}</span>
                    <span className="latin" style={{ fontWeight: 600 }}>{r.nameFr}</span>
                  </> : <><span>❤️</span><span>الحبايب يتعارفو <span className="tiny muted">(Cupidon encore)</span></span></>}
                  {id === 'loup_pere_infecte' && <span className="tiny muted">— من الليلة 2</span>}
                  {(id === 'cupidon' || id === 'enfant_sauvage') && <span className="tiny muted">— الليلة 1 برك</span>}
                </div>
              )
            })}
          </div>
          <div className="hint small" style={{ marginTop: 12 }}>
            🃏 الـ <b className="latin">Voleur</b> يفيق <b>قبل الكل</b> في الليلة الأولى.
            🧕 الـ <b className="latin">Servante Dévouée</b> تخدم في النهار، قبل كشف كارطة اللي طار.
            🐻 الـ <b className="latin">Ours</b> ما يفيقش — يهرّ في الصباح.
          </div>
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && <RoleSheet id={open} onClose={() => setOpen(null)} />}
      </Modal>
    </>
  )
}

export function RoleSheet({ id, onClose }: { id: string; onClose?: () => void }) {
  const r = role(id)
  const i = NIGHT_ORDER.indexOf(id)
  return (
    <>
      <RoleImg roleId={id} style={{ width: '100%', borderRadius: 18, marginBottom: 14 }} />
      <div className="row">
        <h2 className="latin" style={{ margin: 0, color: CAMP_META[r.camp]?.color }}>{r.emoji} {r.nameFr}</h2>
        <div className="spacer" />
        <CampTag camp={r.camp} />
      </div>
      <div style={{ marginTop: 12, fontSize: 17 }} dangerouslySetInnerHTML={{ __html: r.descAr }} />
      {r.mechAr && <div className="hint" style={{ marginTop: 12, whiteSpace: 'pre-line' }}
        dangerouslySetInnerHTML={{ __html: r.mechAr }} />}
      {r.sayAr && <div className="say small" style={{ marginTop: 14, fontSize: 17 }}>{r.sayAr}</div>}
      <div className="row tiny muted" style={{ marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
        {i >= 0 && <span className="tag">🌙 يفيق رقم {i + 1}</span>}
        {r.wake === 'first_night' && <span className="tag">الليلة الأولى برك</span>}
        {r.wake === 'never' && <span className="tag">ما يفيقش</span>}
        {r.official && <span className="tag">رسمي</span>}
      </div>
      {onClose && <button className="btn btn-block" style={{ marginTop: 16 }} onClick={onClose}>سكّر</button>}
    </>
  )
}

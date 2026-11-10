import React from 'react'
import { usePresets, deletePreset, type Preset } from '../services/presets'
import { TopBar, RoleImg } from '../components/ui'
import { OrnateTitle, Frieze, Khomsa, Khatim, Crescent, tap } from '../components/ornaments'

export interface StartChoice { mode: 'assisted' | 'simple'; preset: Preset | null }

export default function Start({ onBack, onGo, lan }:
  { onBack: () => void; onGo: (c: StartChoice) => void; lan?: boolean }) {
  const presets = usePresets()
  const [mode, setMode] = React.useState<'assisted' | 'simple'>('assisted')
  const quick = presets.filter(p => p.builtin)
  const mineList = presets.filter(p => !p.builtin)

  return (
    <>
      <TopBar title={lan ? '📡 طبقة على الروم' : '🎬 طبقة جديدة'} onBack={onBack} />
      <div className="screen stack">

        {lan && (
          <div className="hint small">
            <b>1️⃣ ضبط</b> ← 2️⃣ اللعّابة يدخلو ← 3️⃣ الكارطات.
            <br />
            حدّد توّا نوع السرد والأدوار وقدّاش لعّاب. الروم تتحلّ من بعد.
          </div>
        )}

        {/* ─── Mode de narration ─── */}
        <div className="card">
          <OrnateTitle icon={<span style={{ fontSize: 20 }}>🎙️</span>}>كيفاش تحبّ تسرد؟</OrnateTitle>
          <div className="stack" style={{ gap: 10, marginTop: 10 }}>
            <button className={`pitem ${mode === 'assisted' ? 'sel' : ''}`} style={{ alignItems: 'flex-start' }}
              onClick={() => { tap(); setMode('assisted') }}>
              <div style={{ fontSize: 28, marginTop: 2 }}>🧭</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>سرد مساعد</div>
                <div className="small muted">
                  الأپليكاسيون تقودك <b>خطوة بخطوة</b>: تنادي كل دور في وقتو، تقوّلك الكلام،
                  تحسب الموتى والأصوات، وتعرف وحدها شكون ربح.
                </div>
              </div>
              {mode === 'assisted' && <span style={{ color: 'var(--primary)', fontSize: 20 }}>✓</span>}
            </button>

            <button className={`pitem ${mode === 'simple' ? 'sel' : ''}`} style={{ alignItems: 'flex-start' }}
              onClick={() => { tap(); setMode('simple') }}>
              <div style={{ fontSize: 28, marginTop: 2 }}>🎴</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>موزّع بسيط</div>
                <div className="small muted">
                  الأپليكاسيون <b>تقسّم الكارطات برك</b> وتعطيك <b>جدول شكون خذا شنوّة</b>،
                  زايد أدوات السرد (كرونو، ترتيب الليل، عدّاد الأحياء). الباقي عليك.
                </div>
              </div>
              {mode === 'simple' && <span style={{ color: 'var(--primary)', fontSize: 20 }}>✓</span>}
            </button>
          </div>
        </div>

        {/* ─── Parties rapides ─── */}
        <div className="card">
          <OrnateTitle icon={<span style={{ fontSize: 20 }}>⚡</span>}>طبقة سريعة</OrnateTitle>
          <p className="small muted" style={{ marginTop: 0 }}>تركيبة جاهزة — تنجّم تبدّلها كيف ما تحبّ بعد.</p>
          <div className="grid3">
            {quick.map(p => (
              <button key={p.id} className="chip-btn" onClick={() => onGo({ mode, preset: p })}>
                <span className="latin" style={{ fontSize: 28, fontWeight: 900 }}>{p.players}</span>
                <span className="tiny muted">لعّابة</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Mes compositions ─── */}
        {mineList.length > 0 && (
          <div className="card">
            <OrnateTitle icon={<Khatim size={17} />}>التركيبات متاعي</OrnateTitle>
            <div className="stack" style={{ gap: 8 }}>
              {mineList.map(p => (
                <div className="pitem" key={p.id} style={{ cursor: 'pointer' }} onClick={() => onGo({ mode, preset: p })}>
                  <div className="row" style={{ gap: 2 }}>
                    {[...new Set(p.roles)].slice(0, 4).map(r => (
                      <RoleImg key={r} roleId={r} className="avatar" style={{ width: 26, height: 26, borderRadius: 7 }} />
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700 }}>{p.nameAr}</div>
                    <div className="tiny muted latin">{p.players} cartes</div>
                  </div>
                  <button className="btn btn-sm btn-ghost"
                    onClick={e => { e.stopPropagation(); deletePreset(p.id) }}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Personnalisé ─── */}
        <div className="center" style={{ opacity: .75 }}>
          <Crescent size={20} className="glow-soft" />
        </div>
        <button className="btn btn-primary btn-lg btn-block"
          onClick={() => { tap(16); onGo({ mode, preset: null }) }}>
          🎛️ طبقة مخصّصة — نختار الأدوار بروحي
        </button>

        <Frieze />

        <div className="hint small" style={{ position: 'relative', overflow: 'hidden' }}>
          <Khomsa size={70} className="khomsa-wm" style={{ color: 'var(--primary)' }} />
          🎙️ <b>إنت المعلّم، إنت اللي تختار الأدوار.</b> الأپليكاسيون ما تختارش وحدها —
          هي برك تقسّم الكارطات اللي إنت حدّدتها على اللعّابة بالزهر.
        </div>
      </div>
    </>
  )
}

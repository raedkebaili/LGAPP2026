import React from 'react'
import { Khomsa, Lantern, Khatim, Frieze, Bab, tap } from '../components/ornaments'
import { RoleImg } from '../components/ui'
import { ROLES } from '../engine/data'

const TEASER = ['loup_garou', 'voyante', 'sorciere', 'barbier', 'pyromane', 'cupidon', 'alien', 'berger']

export default function Home({ onPlay, onJoin, onHost, onSettings, onCodex }:
  { onPlay: () => void; onJoin: () => void; onHost: () => void; onSettings: () => void; onCodex: () => void }) {
  const go = (fn: () => void) => () => { tap(14); fn() }

  return (
    <div className="screen stagger" style={{ paddingTop: 'calc(18px + var(--safe-t))', gap: 20, display: 'flex', flexDirection: 'column' }}>

      {/* ─── Fronton : lanternes + porte de médina + titre ─── */}
      <div style={{ position: 'relative', textAlign: 'center', paddingTop: 6 }}>
        <Bab size={172} style={{
          position: 'absolute', top: -16, insetInlineStart: '50%', translate: '-50% 0',
          opacity: .085, color: 'var(--primary)', pointerEvents: 'none',
        }} />

        <div className="row" style={{ justifyContent: 'center', alignItems: 'flex-start', gap: 30 }}>
          <Lantern size={46} />
          <img src="/assets/ui/app_icon.jpg" alt="" width={118} height={118}
            style={{
              borderRadius: 28, boxShadow: 'var(--sh-pop), 0 0 40px rgba(233,180,76,.22)',
              border: '2px solid color-mix(in srgb, var(--primary) 45%, transparent)', marginTop: 10,
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <Lantern size={46} className="sway" />
        </div>

        <h1 className="latin" style={{ fontSize: 27, marginTop: 16, marginBottom: 0, letterSpacing: 3, fontWeight: 800, opacity: .92 }}>
          LOUP&nbsp;GAROU
        </h1>
        <h1 style={{
          fontSize: 46, color: 'var(--primary)', marginTop: -2, marginBottom: 2,
          textShadow: '0 0 34px rgba(233,180,76,.35)',
        }}>
          بالتّونسي
        </h1>
        <Frieze />
        <p className="muted small" style={{ marginTop: 8 }}>
          مساعد المعلّم · <b className="latin">22</b> دور · قوانين الحومة
        </p>
      </div>

      {/* ─── Aperçu des rôles, défilement horizontal ─── */}
      <button onClick={go(onCodex)}
        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'start' }}>
        <div style={{ display: 'flex', gap: 9, overflowX: 'auto', padding: '2px 0 6px', scrollbarWidth: 'none' }}>
          {TEASER.map((id, i) => (
            <div key={id} style={{
              flex: 'none', width: 72, borderRadius: 14, overflow: 'hidden',
              border: '1.5px solid color-mix(in srgb, var(--primary) 30%, var(--border))',
              boxShadow: 'var(--sh-card)', animation: `rise .5s var(--ease-out) ${0.05 * i}s both`,
            }}>
              <RoleImg roleId={id} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
          <div style={{
            flex: 'none', width: 72, aspectRatio: '1', borderRadius: 14, display: 'grid', placeItems: 'center',
            border: '1.5px dashed var(--border)', color: 'var(--primary)', fontWeight: 800, fontSize: 15,
          }} className="latin">+{ROLES.length - TEASER.length}</div>
        </div>
      </button>

      {/* ─── Actions ─── */}
      <div className="stack" style={{ gap: 11 }}>
        <button className="btn btn-primary btn-lg btn-block" onClick={go(onPlay)}>
          🎬 إبدا طبقة <span className="tiny" style={{ opacity: .7 }}>(إنت المعلّم)</span>
        </button>
        <button className="btn btn-accent btn-lg btn-block" onClick={go(onHost)}>
          📡 إعمل روم على الواي فاي <span className="tiny" style={{ opacity: .75 }}>(إنت المعلّم)</span>
        </button>
        <button className="btn btn-lg btn-block" onClick={go(onJoin)}>
          🚪 إدخل لروم <span className="tiny muted">(لاعب)</span>
        </button>
        <button className="btn btn-lg btn-block" onClick={go(onCodex)}>
          <Khatim size={19} style={{ color: 'var(--primary)' }} />
          دليل الأدوار <span className="tiny muted">(22 دور بالتصاور)</span>
        </button>
        <button className="btn btn-ghost btn-block" onClick={go(onSettings)}>
          ⚙️ الإعدادات — قوانين الحومة والتصاور
        </button>
      </div>

      {/* ─── Astuce ─── */}
      <div className="hint small center" style={{ position: 'relative', overflow: 'hidden' }}>
        <Khomsa size={74} className="khomsa-wm" style={{ color: 'var(--primary)' }} />
        💡 <b>كيفاش يشوف كلّ واحد كارطتو؟</b> المعلّم يعمل <b>روم على الواي فاي</b>،
        واللعّابة يدخلو بالـ QR ولّا بالكود. الكارطات تمشي وحدها لتيليفوناتهم.
        <br />
        <span className="tiny">بلا إنترنت — برك الواي فاي اللي في الدار.</span>
      </div>

      <div className="center tiny muted" style={{ paddingBottom: 10 }}>
        <Khatim size={15} style={{ verticalAlign: '-2px', marginInlineEnd: 6, opacity: .6 }} />
        صنع في تونس 🇹🇳 — يخدم بلا إنترنت
      </div>
    </div>
  )
}

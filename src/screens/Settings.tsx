import React, { useState } from 'react'
import { ROLES, roleName, CAMP_META } from '../engine/data'
import { RULES, useRules, setRule, resetRules, debateSeconds } from '../services/settings'
import {
  useRoleImages, hasCustomImage, customCount, pickFromGallery,
  setCustomImage, clearCustomImage, clearAllCustomImages, isNative,
} from '../services/roleImages'
import { TopBar, Modal, RoleImg } from '../components/ui'
import { OrnateTitle, Frieze, Khatim, tap } from '../components/ornaments'

export default function Settings({ onBack }: { onBack: () => void }) {
  const rules = useRules()
  useRoleImages()
  const [tab, setTab] = useState<'rules' | 'images'>('rules')
  const [busy, setBusy] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [confirmAll, setConfirmAll] = useState(false)

  const choose = async (id: string) => {
    setErr(null); setBusy(id)
    try {
      const f = await pickFromGallery()
      if (f) await setCustomImage(id, f)
    } catch (e: any) { setErr(e?.message ?? 'ما نجّمتش نسجّل التصويرة') }
    setBusy(null)
  }

  return (
    <>
      <TopBar title="⚙️ الإعدادات" onBack={onBack} />
      <div className="screen stack">
        <div className="grid2">
          <button className={`chip-btn ${tab === 'rules' ? 'sel' : ''}`} onClick={() => { tap(); setTab('rules') }}>
            <span style={{ fontSize: 24 }}>📜</span>قوانين الحومة</button>
          <button className={`chip-btn ${tab === 'images' ? 'sel' : ''}`} onClick={() => { tap(); setTab('images') }}>
            <span style={{ fontSize: 24 }}>🖼️</span>التصاور</button>
        </div>

        {/* ═══ قوانين الحومة ═══ */}
        {tab === 'rules' && <>
          <OrnateTitle icon={<Khatim size={17} />}>قوانين الحومة السبعة</OrnateTitle>
          <div className="stack">
            {RULES.map(r => {
              const on = !!rules[r.id]
              return (
                <label key={r.id} className="pitem" style={{ alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" checked={on} onChange={e => setRule(r.id, e.target.checked)}
                    style={{ width: 22, height: 22, marginTop: 4, accentColor: 'var(--primary)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{r.nameAr}</div>
                    <div className="tiny muted">{r.descAr}</div>
                    {r.id === 'ramadan' && on && <div className="tiny" style={{ color: 'var(--primary)' }}>🌙 الليل «بعد الفطور» · الصباح «السحور»</div>}
                    {r.id === 'sari3' && on && <div className="tiny" style={{ color: 'var(--primary)' }}>⚡ بلا Sorcière · قعدة 90 ثانية</div>}
                  </div>
                </label>
              )
            })}
          </div>
          <Frieze />
          <div className="panel small">
            ☕ قعدة الحومة توّا: <b className="latin">{Math.floor(debateSeconds(rules) / 60)}:{String(debateSeconds(rules) % 60).padStart(2, '0')}</b>
          </div>
          <button className="btn btn-ghost btn-block" onClick={resetRules}>↩️ رجّع الافتراضي</button>
        </>}

        {/* ═══ التصاور ═══ */}
        {tab === 'images' && <>
          <div className="card">
            <OrnateTitle icon={<span style={{ fontSize: 19 }}>🖼️</span>}>تصويرة لكل دور</OrnateTitle>
            <p className="small muted" style={{ margin: 0 }}>
              تنجّم تبدّل تصويرة أي دور بتصويرة من <b>الڤالري متاعك</b>.
              التصويرة تتقصّ مربّعة (768px) وتتسجّل <b>في موارد الأپليكاسيون</b> —
              تخدم بلا أنترنات وتبقى حتّى كي تسكّر الأپليكاسيون.
            </p>
            <div className="hint small" style={{ marginTop: 10 }}>
              📦 التخزين: {isNative() ? 'ملفّات الأپليكاسيون (Capacitor Filesystem)' : 'IndexedDB متاع الناڨيڨاتور'}
              {customCount() > 0 && <> · <b>{customCount()}</b> تصويرة مبدّلة</>}
            </div>
            {customCount() > 0 && (
              <button className="btn btn-sm btn-ghost btn-block" style={{ marginTop: 10 }}
                onClick={() => setConfirmAll(true)}>🗑️ رجّع التصاور الأصليّة الكل</button>
            )}
          </div>

          {err && <div className="hint" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>⚠️ {err}</div>}

          {(['loups', 'village', 'variable', 'solo'] as const).map(camp => (
            <div key={camp}>
              <div className="row" style={{ margin: '10px 0 8px', gap: 8, alignItems: 'center' }}>
                <Khatim size={14} style={{ color: CAMP_META[camp].color, opacity: .8 }} />
                <span className={`tag ${camp}`}>{CAMP_META[camp].emoji} {CAMP_META[camp].label}</span>
                <div className="spacer" />
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div className="stack" style={{ gap: 8 }}>
                {ROLES.filter(r => r.camp === camp).map(r => {
                  const custom = hasCustomImage(r.id)
                  return (
                    <div className="pitem" key={r.id} style={{ cursor: 'default' }}>
                      <RoleImg roleId={r.id} className="avatar" style={{ width: 52, height: 52, borderRadius: 12 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="latin" style={{ fontWeight: 700, fontSize: 15 }}>{r.emoji} {r.nameFr}</div>
                        <div className="tiny muted">{custom ? '📷 تصويرتك' : '🎨 رسم الأپليكاسيون'}</div>
                      </div>
                      {custom && <button className="btn btn-sm btn-ghost" onClick={() => clearCustomImage(r.id)}>↩️</button>}
                      <button className="btn btn-sm" disabled={busy === r.id} onClick={() => choose(r.id)}>
                        {busy === r.id ? '...' : '📷 بدّل'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </>}
      </div>

      <Modal open={confirmAll} onClose={() => setConfirmAll(false)} tone="bad">
        <h2>🗑️ متأكّد؟</h2>
        <p>التصاور الكل اللي بدّلتها باش تتمسح، ونرجعو للرسم الأصلي.</p>
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn btn-block" onClick={() => setConfirmAll(false)}>لا</button>
          <button className="btn btn-danger btn-block"
            onClick={async () => { await clearAllCustomImages(); setConfirmAll(false) }}>إيه، إمسح</button>
        </div>
      </Modal>
    </>
  )
}

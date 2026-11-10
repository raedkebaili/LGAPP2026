import React, { useState } from 'react'
import { TopBar, BottomBar } from '../components/ui'
import { Frieze, Lantern, tap } from '../components/ornaments'
import Scanner from '../components/Scanner'
import { RoleReveal } from './Deal'
import { useJoinRoom, parseQr } from '../services/lanroom'

/**
 * Rejoindre un salon — deux chemins au choix :
 *   1. scanner le QR affiché par le معلّم  → adresse exacte, instantané
 *   2. taper le code à 5 caractères        → l'adresse est déduite du code
 * Le QR n'a qu'un seul sens dans le jeu : entrer dans le salon.
 */
export default function Join({ onBack }: { onBack: () => void }) {
  const room = useJoinRoom()
  const [name, setName] = useState(() => localStorage.getItem('lgbt.myname') ?? '')
  const [code, setCode] = useState('')
  const [scan, setScan] = useState(false)
  const [warn, setWarn] = useState('')

  const saveName = (v: string) => { setName(v); localStorage.setItem('lgbt.myname', v) }
  const nameOk = name.trim().length >= 2

  const onScanResult = (raw: string) => {
    setScan(false); setWarn('')
    const r = parseQr(raw)
    if (r) { room.joinUrl(r.ip, r.port, r.code, name.trim()); return }
    setWarn('هذا ماهوش الـ QR متاع الروم. إمسح اللي يبيّنو المعلّم في تيليفونو.')
  }

  /* ─── Scanner plein écran ─── */
  if (scan) return (
    <Scanner
      hint="إمسح الـ QR اللي يبيّنو المعلّم"
      onResult={onScanResult}
      onCancel={() => setScan(false)}
    />
  )

  /* ─── Ma carte reçue par le salon ─── */
  if (room.status === 'playing' && room.role) return (
    <>
      <TopBar title="🎴 الكارطة متاعي" />
      <div className="screen stack">
        <RoleReveal
          roleId={room.role.roleId}
          playerName={room.role.playerName}
          lover={!!room.role.lover}
          loverName={room.role.loverName}
        />
        {room.says.length > 0 && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>📣 من المعلّم</h3>
            {room.says.map(s => (
              <div key={s.at} className="say" dangerouslySetInnerHTML={{ __html: s.html }} />
            ))}
          </div>
        )}
        <div className="grid2">
          <button className="btn btn-accent" onClick={() => { tap(); room.sign('barbier') }}>🔫 نطلق</button>
          <button className="btn btn-ghost" onClick={() => { tap(); room.sign('alien') }}>👽 نخمّن</button>
        </div>
        <div className="tiny muted center">إستعملهم كان المعلّم طلبهم منّك.</div>
      </div>
    </>
  )

  /* ─── Salle d'attente ─── */
  if (room.status === 'lobby') return (
    <>
      <TopBar title="⏳ نستنّاو" onBack={room.leave} />
      <div className="screen stack">
        <div className="card center">
          <div className="pulse" style={{ fontSize: 40 }}>🫖</div>
          <h2 style={{ margin: '8px 0 4px' }}>دخلت!</h2>
          <p className="small muted" style={{ margin: 0 }}>
            إستنّى المعلّم يوزّع الكارطات.
          </p>
          <Frieze />
          <div className="plist" style={{ marginTop: 12 }}>
            {room.roster.map(p => (
              <div className="pitem" key={p.id} style={{ cursor: 'default' }}>
                <span>{p.connected ? '🟢' : '⚪'}</span>
                <div className="nm">{p.name}{p.id === room.me ? ' (إنتي)' : ''}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-ghost btn-block" onClick={room.leave}>أخرج من الروم</button>
      </div>
    </>
  )

  /* ─── Connexion en cours ─── */
  const busy = room.status === 'searching' || room.status === 'connecting'

  /* ─── Formulaire ─── */
  return (
    <>
      <TopBar title="🚪 إدخل لروم" onBack={onBack} />
      <div className="screen stack">

        <div className="card center" style={{ paddingTop: 8 }}>
          <Lantern size={40} />
          <p className="small muted" style={{ margin: '6px 0 0' }}>
            لازمك تكون على <b>نفس الواي فاي</b> متاع المعلّم.
          </p>
        </div>

        <div className="card">
          <label className="small muted">إسمك</label>
          <input className="input" value={name} maxLength={24}
            placeholder="شنوّة إسمك؟" onChange={e => saveName(e.target.value)} />
        </div>

        {/* 1 — QR */}
        <button className="btn btn-primary btn-lg btn-block"
          disabled={!nameOk || busy}
          onClick={() => { tap(); setWarn(''); setScan(true) }}>
          📷 إمسح الـ QR
        </button>

        <div className="divider ornate"><span>ولّا</span></div>

        {/* 2 — code manuel */}
        <div className="card">
          <label className="small muted">أكتب الكود (5 حروف)</label>
          <input
            className="input code"
            style={{ fontSize: 32, letterSpacing: 8, textAlign: 'center' }}
            value={code} maxLength={5} inputMode="text" autoCapitalize="characters"
            placeholder="— — — — —"
            onChange={e => setCode(e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, ''))} />
          <button className="btn btn-accent btn-block" style={{ marginTop: 10 }}
            disabled={!nameOk || code.length < 5 || busy}
            onClick={() => { tap(); setWarn(''); room.joinCode(code, name.trim()) }}>
            {busy ? '⏳ نلوّج على الروم...' : 'إدخل'}
          </button>
        </div>

        {!nameOk && <div className="tiny muted center">أكتب إسمك الأوّل.</div>}

        {warn && <div className="hint small" style={{ borderColor: 'var(--accent)' }}>{warn}</div>}

        {room.status === 'error' && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <b style={{ color: 'var(--danger)' }}>
              {room.error === 'badcode' ? '❌ الكود غالط'
                : room.error === 'closed' ? '🔌 الروم تسكّرت'
                  : '🔍 ما لقيتش الروم'}
            </b>
            <ul className="small muted" style={{ margin: '8px 0 0', paddingInlineStart: 18 }}>
              <li>شوف الكود مرّة أخرى مع المعلّم.</li>
              <li>تثبّت إلّي إنتوما الزوز على <b>نفس الواي فاي</b>.</li>
              <li>كان ما خدمش الكود، أمسح الـ QR — هاذاكا أضمن.</li>
            </ul>
          </div>
        )}

      </div>

      {busy && (
        <BottomBar>
          <button className="btn btn-ghost btn-block" onClick={room.leave}>بطّل</button>
        </BottomBar>
      )}
    </>
  )
}

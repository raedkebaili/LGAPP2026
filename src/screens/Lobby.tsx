import React, { useState } from 'react'
import { TopBar, BottomBar, Modal } from '../components/ui'
import { Frieze, Khatim, tap } from '../components/ornaments'
import QrCode from '../components/QrCode'
import { useHostRoom, PORT } from '../services/lanroom'

/**
 * Le salon s'ouvre APRÈS que le معلّم a tout réglé : il connaît déjà le
 * nombre de joueurs et le paquet. Ici on n'attend plus que les gens.
 * Les places se remplissent une à une ; le code et le QR sont visibles
 * tout de suite — jamais d'attente sans explication.
 */
export default function Lobby({ room, need, onBack, onStart }: {
  room: ReturnType<typeof useHostRoom>
  need: number
  onBack: () => void
  onStart: (names: string[]) => void
}) {
  const [big, setBig] = useState(false)
  const [confirmPartial, setConfirmPartial] = useState(false)
  const ready = room.status === 'open'

  const joined = room.roster.slice(0, need)
  const free = Math.max(0, need - joined.length)

  /** Les places vides deviennent des joueurs « sans téléphone ». */
  const names = () => [
    ...joined.map(p => p.name),
    ...Array.from({ length: free }, (_, i) => `لاعب ${joined.length + i + 1}`),
  ]

  const go = () => { tap(18); free > 0 ? setConfirmPartial(true) : onStart(names()) }

  return (
    <>
      <TopBar title="📡 الروم محلولة" onBack={onBack}
        sub={ready ? `${joined.length} / ${need} لعّابة` : undefined} />

      <div className="screen stack">

        {room.status === 'starting' && (
          <div className="card center">
            <div className="pulse" style={{ fontSize: 34 }}>📡</div>
            <h3 style={{ marginBottom: 4 }}>نحلّو الروم...</h3>
            <p className="small muted" style={{ margin: 0 }}>ثواني برك.</p>
          </div>
        )}

        {room.status === 'error' && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--danger)' }}>
              {room.error === 'nohost' ? '📵 ما ينجّمش يعمل روم من هنا' : '⚠️ الروم ما حلّتش'}
            </h3>
            {room.error === 'nohost' ? (
              <p className="small muted">
                باش تعمل روم لازمك <b>الأپليكاسيون متاع الأندرويد</b>.
                من المتصفّح ولّا من الآيفون تنجّم <b>تدخل</b> لروم، أما ما تنجّمش تعملها.
                <br /><br />
                💡 أرجع لور وأختار <b>« تمرير التيليفون »</b> — تخدم في كل بلاصة.
              </p>
            ) : room.error === 'noip' ? (
              <p className="small muted">
                التيليفون ماهوش مربوط بواي فاي. شعّل الواي فاي ولّا نقطة الاتصال،
                وخلّي اللعّابة الكل على <b>نفس الشبكة</b>، وبعد عاود.
              </p>
            ) : (
              <p className="tiny muted" style={{ direction: 'ltr', textAlign: 'left' }}>{room.error}</p>
            )}
            <button className="btn btn-block" style={{ marginTop: 10 }} onClick={onBack}>أرجع للإعدادات</button>
          </div>
        )}

        {ready && (<>
          <div className="card center">
            <div className="muted small">الكود متاع الروم</div>
            <div className="code" style={{ fontSize: 48, letterSpacing: 9 }}>{room.code}</div>
            <Frieze />
            <div style={{ margin: '16px 0 10px' }}>
              <button onClick={() => { tap(); setBig(true) }}
                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                <QrCode text={room.qr} size={190} />
              </button>
            </div>
            <div className="tiny muted">إضغط على الكود باش يكبر</div>
          </div>

          <div className="hint small">
            <Khatim size={14} style={{ verticalAlign: '-2px', marginInlineEnd: 6, color: 'var(--primary)' }} />
            اللعّابة يحلّو الأپليكاسيون ← <b>« إدخل لروم »</b> ← يمسحو الـ QR
            ولّا يكتبو الكود <b className="latin">{room.code}</b>.
            لازمهم الكل على <b>نفس الواي فاي</b> متاعك.
          </div>

          {/* ─── Les places ─── */}
          <div className="card">
            <div className="row" style={{ marginBottom: 10 }}>
              <h3 style={{ margin: 0 }}>👥 البلايص</h3>
              <div className="spacer" />
              <span className="tag">{joined.length} / {need}</span>
            </div>

            <div className="progress" style={{ marginBottom: 12 }}>
              <i style={{ width: `${need ? (joined.length / need) * 100 : 0}%` }} />
            </div>

            <div className="plist">
              {joined.map((p, i) => (
                <div className="pitem" key={p.id} style={{ cursor: 'default' }}>
                  <div className="seat">{i + 1}</div>
                  <div className="nm">{p.name}</div>
                  <span style={{ fontSize: 16 }}>{p.connected ? '🟢' : '⚪'}</span>
                  <button className="btn btn-sm btn-ghost" onClick={() => room.kick(p.id)}>🗑️</button>
                </div>
              ))}
              {Array.from({ length: free }, (_, i) => (
                <div className="pitem dis" key={`free-${i}`} style={{ cursor: 'default', opacity: .5 }}>
                  <div className="seat">{joined.length + i + 1}</div>
                  <div className="nm muted pulse">نستنّاو...</div>
                </div>
              ))}
            </div>

            {room.roster.length > need && (
              <div className="hint tiny" style={{ marginTop: 10, borderColor: 'var(--accent)' }}>
                ⚠️ دخلو <b>{room.roster.length}</b> واللعب مضبوط لـ <b>{need}</b>.
                الزايدين ما يلعبوش — نحّيهم ولّا أرجع زيد كارطات.
              </div>
            )}
          </div>

          <div className="tiny muted center">
            📶 عنوانك في الشبكة: <span className="latin">{room.ip}:{PORT}</span>
          </div>
        </>)}
      </div>

      {ready && (
        <BottomBar>
          <button className="btn btn-primary btn-lg btn-block" onClick={go}>
            {free === 0 ? '🎴 قسّم الكارطات' : `🎴 أبدا — ${free} بلاصة فارغة`}
          </button>
        </BottomBar>
      )}

      <Modal open={big} onClose={() => setBig(false)}>
        <div className="center">
          <h2 style={{ marginTop: 0 }}>إمسح باش تدخل</h2>
          <QrCode text={room.qr} size={280} />
          <div className="code" style={{ fontSize: 40, marginTop: 16 }}>{room.code}</div>
          <button className="btn btn-block" style={{ marginTop: 14 }} onClick={() => setBig(false)}>سكّر</button>
        </div>
      </Modal>

      <Modal open={confirmPartial} onClose={() => setConfirmPartial(false)}>
        <h2>🎴 نبداو بـ {joined.length}؟</h2>
        <p className="small">
          باقي <b>{free}</b> بلاصة فارغة. اللي ما دخلوش للروم، كارطاتهم
          باش تتبيّن <b>في تيليفونك إنت</b> وتوريهملهم بيدك.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn btn-block" onClick={() => setConfirmPartial(false)}>نستنّاهم</button>
          <button className="btn btn-primary btn-block"
            onClick={() => { setConfirmPartial(false); onStart(names()) }}>إيه، أبدا</button>
        </div>
      </Modal>
    </>
  )
}

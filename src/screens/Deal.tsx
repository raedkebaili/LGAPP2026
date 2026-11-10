import React, { useState } from 'react'
import type { GameState } from '../engine/types'
import { role, CAMP_META } from '../engine/data'
import { NIGHT_ORDER } from '../engine/engine'
import { TopBar, BottomBar, RoleImg, CampTag } from '../components/ui'
import { Khatim, Lantern, Frieze, tap } from '../components/ornaments'

/** Distribution « même téléphone » — on passe l'appareil de main en main */
export default function Deal({ game, onDone }: { game: GameState; onDone: () => void }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const p = game.players[i]
  const last = i >= game.players.length - 1
  if (!p) return null

  return (
    <>
      <TopBar title="🎴 توزيع الكارطات" sub={`${i + 1} / ${game.players.length}`} />
      <div className="screen stack" style={{ justifyContent: shown ? 'flex-start' : 'center', minHeight: '72dvh' }}>
        {!shown ? (
          <div className="center stack" style={{ gap: 20 }}>
            <div className="row" style={{ justifyContent: 'center', gap: 44, marginBottom: -6 }}>
              <Lantern size={38} /><Lantern size={38} />
            </div>
            <div className="cardback" style={{ width: '72%', maxWidth: 250, margin: '0 auto', aspectRatio: '3/4' }}>
              <div className="center" style={{ color: 'var(--primary)' }}>
                <Khatim size={66} style={{ opacity: .9 }} />
                <div className="latin" style={{ fontSize: 11, letterSpacing: 4, marginTop: 12, opacity: .7 }}>BEL TOUNSI</div>
              </div>
            </div>
            <div>
              <div className="muted">عطي التيليفون لـ</div>
              <h1 style={{ fontSize: 36, margin: '2px 0', color: 'var(--primary)' }}>{p.name}</h1>
              <div className="muted small">الباقي ما يشوفش 👀</div>
            </div>
            <Frieze />
            <button className="btn btn-primary btn-lg btn-block"
              onClick={() => { tap([10, 40, 18]); setShown(true) }}>👁️ شوف كارطتي</button>
          </div>
        ) : (
          <RoleReveal roleId={p.roleId} playerName={p.name} lover={p.lover}
            loverName={game.players.find(x => x.lover && x.id !== p.id)?.name} />
        )}
      </div>

      {shown && (
        <BottomBar>
          <button className="btn btn-primary btn-lg btn-block"
            onClick={() => { tap(); setShown(false); last ? onDone() : setI(i + 1) }}>
            {last ? '🌙 الليل طاح — إبدا' : 'حفظتها — عدّي للّي بعدي'}
          </button>
        </BottomBar>
      )}
    </>
  )
}

/**
 * Révélation complète : image + NOM + camp + description + mécanique
 * + ce que le joueur fait la nuit, et à quel rang il est réveillé.
 */
export function RoleReveal({ roleId, playerName, lover, loverName }:
  { roleId: string; playerName?: string; lover?: boolean; loverName?: string | null }) {
  const r = role(roleId)
  const meta = CAMP_META[r.camp] ?? CAMP_META.village
  const rank = NIGHT_ORDER.indexOf(roleId)

  const wakeLabel =
    r.wake === 'never' ? 'ما تفيقش في الليل — دورك في النهار'
      : r.wake === 'first_night' ? 'تفيق في الليلة الأولى برك'
        : rank >= 0 ? `تفيق كل ليلة — رقم ${rank + 1} في الترتيب`
          : 'المعلّم يناديك وقت الحاجة'

  return (
    <div className="stack stagger">
      <div className={`rolecard ${r.camp}`} style={{ borderColor: meta.color }}>
        <RoleImg roleId={roleId} />
        <div className="meta">
          {playerName && <div className="small muted">{playerName}</div>}
          <div className="row">
            <div className="nameFr" style={{ color: meta.color }}>{r.nameFr}</div>
            <div className="spacer" />
            <span style={{ fontSize: 32 }}>{r.emoji}</span>
          </div>
          <div style={{ marginTop: 8 }}><CampTag camp={r.camp} /></div>
        </div>
      </div>

      {/* الوصف */}
      <div className="card">
        <h3 style={{ marginBottom: 8 }}>📜 شنوّة دورك</h3>
        <div style={{ fontSize: 17, lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: r.descAr }} />
      </div>

      {/* الميكانيك */}
      {r.mechAr && (
        <div className="card" style={{ borderColor: meta.color }}>
          <h3 style={{ marginBottom: 8 }}>⚙️ كيفاش تخدم</h3>
          <div style={{ fontSize: 16, lineHeight: 1.9, whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: r.mechAr }} />
        </div>
      )}

      {/* متى تفيق */}
      <div className="panel small">🌙 {wakeLabel}</div>

      {/* شنوّة يقولّك المعلّم */}
      {r.sayAr && <div className="say" style={{ fontSize: 18 }}>{r.sayAr}</div>}

      {/* كيفاش تربح */}
      <div className="panel small">
        🏆 <b>باش تربح:</b>{' '}
        {r.camp === 'loups' ? 'لازم الذيابة ياكلو الحومة الكل.'
          : r.camp === 'solo' ? 'لازم تبقى إنت وحدك آخر واحد حيّ.'
            : r.camp === 'variable' ? 'يتوقّف على الكارطة اللي باش تاخذ.'
              : 'لازم الحومة تطيّر الذيابة الكل والوحدانيّة.'}
      </div>

      {lover && (
        <div className="card center" style={{ borderColor: 'var(--c-amoureux)' }}>
          <div style={{ fontSize: 34 }}>❤️</div>
          <h3 style={{ margin: '4px 0' }}>إنت من الحبايب</h3>
          {loverName && <p style={{ margin: 0 }}>مع <b>{loverName}</b></p>}
          <p className="small muted" style={{ margin: '6px 0 0' }}>
            كان مات واحد فيكم، الآخر يموت بالقهر. وممنوع تڤوتي ضدّ حبيبك.
          </p>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import type { GameState } from '../engine/types'
import { roleName, roleEmoji, roleImg, CAMP_META } from '../engine/data'
import { TopBar, BottomBar, RoleImg } from '../components/ui'
import { OrnateTitle, Frieze, Khomsa, Khatim } from '../components/ornaments'

export default function End({ game, onRestart, onHome }:
  { game: GameState; onRestart: () => void; onHome: () => void }) {
  const w = game.winner!
  const meta = CAMP_META[w.camp] ?? CAMP_META.village

  return (
    <>
      <TopBar title="🏆 سالات الطبقة" />
      <div className="screen stack">
        <div className="card center arch" style={{ borderColor: meta.color, borderWidth: 2, overflow: 'hidden' }}>
          <Khomsa size={120} className="khomsa-wm" style={{ color: meta.color, opacity: .09 }} />
          <div style={{ fontSize: 58 }}>{meta.emoji}</div>
          <h1 style={{ color: meta.color, fontSize: 28, margin: '4px 0 0' }}>{w.labelAr}</h1>
          <Frieze />
          <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {w.playerIds.map(id => {
              const p = game.players.find(x => x.id === id)!
              return <span className="tag" key={id}>{roleEmoji(p.roleId)} {p.name}</span>
            })}
          </div>
        </div>

        <div className="card">
          <OrnateTitle icon={<span style={{ fontSize: 19 }}>🎴</span>}>الكارطات الكل</OrnateTitle>
          <div className="plist">
            {[...game.players].sort((a, b) => a.seat - b.seat).map(p => (
              <div className={`pitem ${p.alive ? '' : 'dead'}`} key={p.id} style={{ cursor: 'default' }}>
                <RoleImg roleId={p.roleId} className="avatar" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="nm">{p.name} {p.alive ? '' : '💀'}</div>
                  <div className="tiny latin muted">{roleEmoji(p.roleId)} {roleName(p.roleId)}
                    {p.originRoleId !== p.roleId && <> · كان {roleName(p.originRoleId)}</>}</div>
                </div>
                <span className={`tag ${p.camp}`}>{CAMP_META[p.camp]?.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <OrnateTitle icon={<Khatim size={17} />}>كرّاس الحومة</OrnateTitle>
          <div className="stack" style={{ gap: 6 }}>
            {game.log.map((l, i) => (
              <div className="small" key={i}>
                <span className="muted tiny latin">{l.night > 0 ? `L${l.night}` : '—'}</span>{' '}
                {l.emoji} {l.textAr}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomBar>
        <button className="btn btn-lg" onClick={onHome}>🏠</button>
        <button className="btn btn-primary btn-lg btn-block" onClick={onRestart}>🔄 طبقة جديدة</button>
      </BottomBar>
    </>
  )
}

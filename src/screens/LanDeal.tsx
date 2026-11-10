import React, { useEffect, useMemo, useState } from 'react'
import type { GameState } from '../engine/types'
import { role } from '../engine/data'
import { TopBar, BottomBar } from '../components/ui'
import { Frieze, tap } from '../components/ornaments'
import type { RosterPlayer } from '../services/lanroom'

/**
 * 📡 Distribution par le salon : chaque carte part toute seule vers le
 * téléphone de son joueur. Le معلّم ne voit que l'avancement.
 */
export default function LanDeal({ game, roster, push, onDone, onBack }: {
  game: GameState
  roster: RosterPlayer[]
  push: (device: string, msg: any) => void
  onDone: () => void
  onBack: () => void
}) {
  const [sent, setSent] = useState(false)

  const players = useMemo(
    () => [...game.players].sort((a, b) => a.seat - b.seat), [game.players])

  // seat ↔ appareil : l'ordre des noms vient du salon, il est conservé.
  const pairs = useMemo(() => players.map((p, i) => ({ p, dev: roster[i]?.id ?? null })), [players, roster])

  useEffect(() => {
    if (sent) return
    pairs.forEach(({ p, dev }) => {
      if (!dev) return
      const lover = p.lover ? game.players.find(x => x.lover && x.id !== p.id) : null
      push(dev, {
        t: 'role', roleId: p.roleId, playerName: p.name,
        seat: p.seat + 1, lover: !!p.lover, loverName: lover?.name,
      })
    })
    setSent(true)
  }, [pairs, push, sent, game.players])

  const missing = pairs.filter(x => !x.dev).length

  return (
    <>
      <TopBar title="📡 الكارطات تمشي" onBack={onBack}
        sub={`${pairs.length - missing} / ${pairs.length} توصّلو`} />

      <div className="screen stack">
        <div className="card center">
          <div style={{ fontSize: 40 }}>{missing ? '⚠️' : '✅'}</div>
          <h2 style={{ margin: '6px 0 4px' }}>
            {missing ? 'فمّا لعّابة بلا تيليفون' : 'كلّ واحد خذا كارطتو'}
          </h2>
          <p className="small muted" style={{ margin: 0 }}>
            {missing
              ? `${missing} لعّابة ما عندهمش تيليفون في الروم — وريهم كارطتهم في تيليفونك.`
              : 'الكارطات توصّلو لتيليفوناتهم. قولّهم يشوفوها في سرّ.'}
          </p>
          <Frieze />
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>🎴 التوزيع</h3>
          <div className="plist">
            {pairs.map(({ p, dev }) => {
              const r = role(p.roleId)
              return (
                <div className="pitem" key={p.id} style={{ cursor: 'default' }}>
                  <div className="seat">{p.seat + 1}</div>
                  <div className="nm">{p.name}</div>
                  {dev
                    ? <span className="tag" style={{ opacity: .9 }}>📨 تبعثت</span>
                    : <span className="tag" style={{ color: 'var(--accent)' }}>
                      {r?.emoji} {r?.nameFr}
                    </span>}
                </div>
              )
            })}
          </div>
          {missing > 0 && (
            <div className="hint tiny" style={{ marginTop: 10 }}>
              الأدوار مبيّنة هوني كان للّي ما دخلوش للروم.
            </div>
          )}
        </div>
      </div>

      <BottomBar>
        <button className="btn btn-primary btn-lg btn-block"
          onClick={() => { tap(18); onDone() }}>
          🌙 أبدا الطبقة
        </button>
      </BottomBar>
    </>
  )
}

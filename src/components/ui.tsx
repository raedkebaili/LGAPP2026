import React, { useEffect, useState } from 'react'
import type { GameState, Player } from '../engine/types'
import { CAMP_META, roleName, roleEmoji, roleImg, role } from '../engine/data'
import { resolveRoleImage, useRoleImages, placeholderSvg } from '../services/roleImages'

// ─── Image de rôle (cascade user → pack → placeholder) ────────
export function RoleImg({ roleId, className, style, alt }:
  { roleId: string; className?: string; style?: React.CSSProperties; alt?: string }) {
  useRoleImages()
  const r = role(roleId)
  const { uri } = resolveRoleImage(roleId)
  return (
    <img className={className} style={style} alt={alt ?? r.nameFr} loading="lazy" src={uri}
      onError={e => { (e.target as HTMLImageElement).src = placeholderSvg(r.emoji, r.camp) }} />
  )
}

// ─── Barre du haut ────────────────────────────────────────────
export function TopBar({ title, sub, onBack, right }: { title: string; sub?: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div className="topbar">
      {onBack && <button className="btn btn-ghost btn-sm" onClick={onBack}>→</button>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        {sub && <div className="tiny muted" style={{ lineHeight: 1.3 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

// ─── Modale ───────────────────────────────────────────────────
export function Modal({ open, onClose, children, tone = 'neutral', dismissable = true }:
  { open: boolean; onClose?: () => void; children: React.ReactNode; tone?: 'good' | 'bad' | 'neutral'; dismissable?: boolean }) {
  if (!open) return null
  return (
    <div className="modal-bg" onClick={() => dismissable && onClose?.()}>
      <div className={`modal ${tone}`} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  )
}

// ─── Pastille de camp ─────────────────────────────────────────
export function CampTag({ camp }: { camp: string }) {
  const m = CAMP_META[camp] ?? CAMP_META.village
  return <span className={`tag ${camp}`}>{m.emoji} {m.label}</span>
}

// ─── Carte de rôle ────────────────────────────────────────────
export function RoleCardView({ roleId, name, compact }: { roleId: string; name?: string; compact?: boolean }) {
  const r = role(roleId)
  const m = CAMP_META[r.camp] ?? CAMP_META.village
  return (
    <div className={`rolecard ${r.camp}`}>
      <RoleImg roleId={roleId} />
      <div className="meta">
        {name && <div className="small muted">{name}</div>}
        <div className="row">
          <div className="nameFr" style={{ color: m.color }}>{r.nameFr}</div>
          <div className="spacer" />
          <span style={{ fontSize: 30 }}>{r.emoji}</span>
        </div>
        <div style={{ margin: '6px 0 10px' }}><CampTag camp={r.camp} /></div>
        {!compact && <>
          <div className="small" dangerouslySetInnerHTML={{ __html: r.descAr }} />
          {r.mechAr && <div className="hint small" style={{ marginTop: 10, whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: r.mechAr }} />}
        </>}
      </div>
    </div>
  )
}

// ─── Sélecteur de joueurs ─────────────────────────────────────
export function PlayerPicker({ game, candidates, selected, onToggle, max, showRoles }:
  {
    game: GameState; candidates: string[]; selected: string[]
    onToggle: (id: string) => void; max: number; showRoles?: boolean
  }) {
  return (
    <div className="plist">
      {game.players.filter(p => p.alive).map(p => {
        const ok = candidates.includes(p.id)
        const sel = selected.includes(p.id)
        const full = selected.length >= max && !sel
        return (
          <div key={p.id} className={`pitem ${sel ? 'sel' : ''} ${!ok || full ? 'dis' : ''}`}
            onClick={() => ok && !full && onToggle(p.id)}>
            <div className="seat">{p.seat + 1}</div>
            <div className="nm">{p.name}</div>
            {p.doused && <span title="مبلول">💧</span>}
            {p.lover && <span title="حبيب">❤️</span>}
            {showRoles && <span className="tiny muted latin">{roleEmoji(p.roleId)} {roleName(p.roleId)}</span>}
            {sel && <span style={{ color: 'var(--primary)', fontSize: 20 }}>✓</span>}
          </div>
        )
      })}
    </div>
  )
}

// ─── Barre du bas ─────────────────────────────────────────────
export function BottomBar({ children }: { children: React.ReactNode }) {
  return <div className="bottombar">{children}</div>
}

// ─── Minuteur ─────────────────────────────────────────────────
export function useCountdown(seconds: number, running: boolean) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => { setLeft(seconds) }, [seconds])
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft(l => (l <= 0 ? 0 : l - 1)), 1000)
    return () => clearInterval(t)
  }, [running])
  return { left, reset: () => setLeft(seconds), set: setLeft }
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// ─── Révélation (modale du moteur) ────────────────────────────
export function RevealModal({ game, onClose }: { game: GameState; onClose: () => void }) {
  const r = game.lastReveal
  if (!r) return null
  return (
    <Modal open tone={r.tone} onClose={onClose}>
      <h2 style={{ marginBottom: 14 }}>{r.titleAr}</h2>
      <div style={{ fontSize: 19, lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: r.bodyAr }} />
      <div className="hint small" style={{ margin: '16px 0' }}>
        👁️ هذي المعلومة <b>للمعلّم برك</b> — وصّلها للّاعب بالإشارة، ولّا تمشي وحدها لتيليفونو في موضة الروم.
      </div>
      <button className="btn btn-primary btn-block" onClick={onClose}>فهمت ✓</button>
    </Modal>
  )
}

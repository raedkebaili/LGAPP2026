import React from 'react'

/* ═══════════════════════════════════════════════════════════════
   Ornements tunisiens — SVG inline, zéro réseau, zéro dépendance.
   Zellige · khomsa · fanous · bab de médina · frises berbères.
   ═══════════════════════════════════════════════════════════════ */

/** Les couches de fond fixes : zellige, étoiles, lune, médina. */
export function BgDecor() {
  return (
    <div className="bg-layer" aria-hidden>
      <div className="zellige" />
      <div className="stars" />
      <div className="moon" />
      <div className="skyline" />
      <div className="windows" />
    </div>
  )
}

/** 🤚 Khomsa — main de Fatma, porte-bonheur tunisien. */
export function Khomsa({ size = 90, className = '', style }:
  { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 140" width={size} height={size * 140 / 120}
      className={className} style={style} aria-hidden fill="currentColor">
      <g>
        <rect x="52" y="6" width="16" height="62" rx="8" />
        <rect x="30" y="20" width="16" height="56" rx="8" />
        <rect x="74" y="20" width="16" height="56" rx="8" />
        <rect x="9" y="44" width="15" height="48" rx="7.5" transform="rotate(-19 16.5 68)" />
        <rect x="96" y="44" width="15" height="48" rx="7.5" transform="rotate(19 103.5 68)" />
        <path d="M26 60h68v36a34 34 0 0 1-68 0z" />
      </g>
      {/* l'œil contre le mauvais œil */}
      <g fill="none" stroke="#0A0D16" strokeWidth="3.4" opacity=".55">
        <path d="M42 96c6-9 12-13 18-13s12 4 18 13c-6 9-12 13-18 13s-12-4-18-13z" />
      </g>
      <circle cx="60" cy="96" r="5.4" fill="#0A0D16" opacity=".6" />
    </svg>
  )
}

/** 🏮 Fanous — lanterne de cuivre suspendue, elle se balance. */
export function Lantern({ size = 54, sway = true, className = '' }:
  { size?: number; sway?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 60 110" width={size} height={size * 110 / 60}
      className={`${sway ? 'sway ' : ''}glow-soft ${className}`} aria-hidden>
      <defs>
        <linearGradient id="lg-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2C260" /><stop offset=".55" stopColor="#B8842F" />
          <stop offset="1" stopColor="#8A6220" />
        </linearGradient>
        <radialGradient id="lg-flame"><stop offset="0" stopColor="#FFF0C2" />
          <stop offset=".55" stopColor="#F2B441" /><stop offset="1" stopColor="#D1603D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M30 0v14" stroke="url(#lg-brass)" strokeWidth="2.4" />
      <path d="M18 16h24l-4 6H22z" fill="url(#lg-brass)" />
      <ellipse cx="30" cy="62" rx="22" ry="12" fill="url(#lg-flame)" opacity=".85">
        <animate attributeName="opacity" values=".6;.95;.6" dur="2.6s" repeatCount="indefinite" />
      </ellipse>
      <path d="M22 22h16l8 16v22l-8 16H22l-8-16V38z" fill="#131A2B"
        stroke="url(#lg-brass)" strokeWidth="2.2" />
      {/* ajours en losange */}
      <g fill="#F2C260" opacity=".85">
        <path d="M30 34l6 7-6 7-6-7z" /><path d="M20 48l4 5-4 5-4-5z" /><path d="M40 48l4 5-4 5-4-5z" />
        <path d="M30 60l5 6-5 6-5-6z" />
      </g>
      <path d="M22 76h16l-3 7H25z" fill="url(#lg-brass)" />
      <path d="M30 83v9" stroke="url(#lg-brass)" strokeWidth="2.2" />
      <circle cx="30" cy="96" r="4.5" fill="url(#lg-brass)" />
    </svg>
  )
}

/** ✦ Khatim — l'étoile à huit branches du zellige. */
export function Khatim({ size = 24, className = '', style }:
  { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} style={style}
      aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="10" y="10" width="28" height="28" />
      <rect x="10" y="10" width="28" height="28" transform="rotate(45 24 24)" />
      <circle cx="24" cy="24" r="4.5" />
    </svg>
  )
}

/** 🌙 Croissant — pour les titres de nuit. */
export function Crescent({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden>
      <path d="M22.5 2a14 14 0 1 0 7.4 25.6A15.5 15.5 0 0 1 22.5 2z" fill="currentColor" />
      <path d="M28 5l1.3 3.2L32.5 9.5l-3.2 1.3L28 14l-1.3-3.2L23.5 9.5l3.2-1.3z"
        fill="currentColor" opacity=".75" transform="scale(.62) translate(14 -2)" />
    </svg>
  )
}

/** Frise berbère — séparateur horizontal. */
export function Frieze({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 240 14" preserveAspectRatio="none" aria-hidden
      className={className}
      style={{ width: '100%', height: 14, display: 'block', color: 'var(--primary)', opacity: .5, transform: flip ? 'scaleY(-1)' : undefined }}>
      <path d="M0 13h240" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <g fill="currentColor">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${i * 15 + 7.5} 2l6 11h-12z`} opacity={i % 2 ? .95 : .45} />
        ))}
      </g>
    </svg>
  )
}

/** 🚪 Bab — porte bleue cloutée de Sidi Bou Saïd, en filigrane. */
export function Bab({ size = 120, className = '', style }:
  { size?: number; className?: string; style?: React.CSSProperties }) {
  const studs: React.ReactNode[] = []
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++)
    studs.push(<circle key={`${r}-${c}`} cx={22 + c * 19} cy={62 + r * 19} r="2.6" fill="currentColor" opacity=".75" />)
  return (
    <svg viewBox="0 0 110 170" width={size} height={size * 170 / 110}
      className={className} style={style} aria-hidden>
      <path d="M8 168V62a47 47 0 0 1 94 0v106z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M18 168V62a37 37 0 0 1 74 0v106z" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".6" />
      <path d="M55 25v143" stroke="currentColor" strokeWidth="1.4" opacity=".5" />
      {studs}
      <circle cx="55" cy="46" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Grand titre calligraphié, encadré de filets dorés. */
export function OrnateTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="ornate-title">
      {icon}<span>{children}</span>
    </div>
  )
}

/** Retour haptique léger — natif via WebView, silencieux sur desktop. */
export function tap(ms: number | number[] = 12) {
  try { (navigator as any).vibrate?.(ms) } catch { }
}

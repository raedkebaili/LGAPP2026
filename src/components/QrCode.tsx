import React, { useMemo } from 'react'
import { qrSvgPath } from '../services/qr'
import { Khatim } from './ornaments'

/**
 * QR rendu en SVG inline — net à toutes les tailles, zéro réseau.
 * Encadré façon zellige pour rester dans le thème.
 */
export default function QrCode({ text, size = 260, frame = true }:
  { text: string; size?: number; frame?: boolean }) {
  const { path, size: n } = useMemo(() => qrSvgPath(text), [text])
  const quiet = 2                       // marge blanche obligatoire (4 modules recommandés, 2 de chaque côté)
  const total = n + quiet * 2

  const svg = (
    <svg viewBox={`0 0 ${total} ${total}`} width={size} height={size}
      shapeRendering="crispEdges" role="img" aria-label="QR"
      style={{ display: 'block', borderRadius: 10 }}>
      <rect width={total} height={total} fill="#FFFFFF" />
      <g transform={`translate(${quiet} ${quiet})`} fill="#0A0D16">
        <path d={path} />
      </g>
    </svg>
  )

  if (!frame) return svg

  return (
    <div style={{
      position: 'relative', display: 'inline-block', padding: 14,
      background: 'linear-gradient(150deg, #F2C260, #B8842F)',
      borderRadius: 22, boxShadow: 'var(--sh-pop)',
    }}>
      {svg}
      {/* petits khatim dans les angles */}
      {([['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']] as const).map(([v, h]) => (
        <Khatim key={`${v}${h}`} size={13}
          style={{ position: 'absolute', [v]: 2, [h]: 2, color: '#0A0D16', opacity: .5 } as React.CSSProperties} />
      ))}
    </div>
  )
}

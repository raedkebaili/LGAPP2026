import React, { useCallback, useEffect, useRef, useState } from 'react'
import { tap } from './ornaments'

type Status = 'starting' | 'scanning' | 'denied' | 'nocam' | 'error'

/**
 * Lecteur de QR par la caméra.
 * Utilise BarcodeDetector quand le système le propose (rapide, natif),
 * sinon retombe sur jsQR image par image. Même code sur web et dans l'APK.
 */
export default function Scanner({ onResult, onCancel, hint }:
  { onResult: (text: string) => void; onCancel: () => void; hint?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)
  const doneRef = useRef(false)
  const jsqrRef = useRef<any>(null)
  const [status, setStatus] = useState<Status>('starting')
  const [detail, setDetail] = useState('')

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  const succeed = useCallback((text: string) => {
    if (doneRef.current) return
    doneRef.current = true
    tap([12, 50, 20])
    stop()
    onResult(text)
  }, [onResult, stop])

  useEffect(() => {
    let detector: any = null

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) { setStatus('nocam'); return }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })
        streamRef.current = stream
        const v = videoRef.current
        if (!v) return
        v.srcObject = stream
        v.setAttribute('playsinline', 'true')
        await v.play().catch(() => { })
        setStatus('scanning')

        const BD = (window as any).BarcodeDetector
        if (BD) {
          try {
            const formats = await BD.getSupportedFormats?.()
            if (!formats || formats.includes('qr_code')) detector = new BD({ formats: ['qr_code'] })
          } catch { }
        }
        // jsQR n'est qu'un repli : on ne le télécharge que si le système ne sait pas lire les QR
        if (!detector) jsqrRef.current = (await import('jsqr')).default
        loop()
      } catch (e: any) {
        const n = e?.name ?? ''
        if (n === 'NotAllowedError' || n === 'SecurityError') setStatus('denied')
        else if (n === 'NotFoundError' || n === 'OverconstrainedError') setStatus('nocam')
        else { setStatus('error'); setDetail(String(e?.message ?? e)) }
      }
    }

    async function loop() {
      const v = videoRef.current
      if (!v || doneRef.current) return
      if (v.readyState >= 2 && v.videoWidth) {
        // 1) détecteur système
        if (detector) {
          try {
            const codes = await detector.detect(v)
            if (codes?.length && codes[0].rawValue) return succeed(codes[0].rawValue)
          } catch { detector = null; if (!jsqrRef.current) jsqrRef.current = (await import('jsqr')).default }
        }
        // 2) repli logiciel
        if (!detector && jsqrRef.current) {
          const c = canvasRef.current
          if (c) {
            const w = 420
            const h = Math.round(w * v.videoHeight / v.videoWidth) || 420
            c.width = w; c.height = h
            const ctx = c.getContext('2d', { willReadFrequently: true })
            if (ctx) {
              ctx.drawImage(v, 0, 0, w, h)
              const img = ctx.getImageData(0, 0, w, h)
              const hit = jsqrRef.current(img.data, w, h, { inversionAttempts: 'dontInvert' })
              if (hit?.data) return succeed(hit.data)
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    start()
    return stop
  }, [succeed, stop])

  const cancel = () => { stop(); onCancel() }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, background: '#05070E',
      display: 'flex', flexDirection: 'column',
    }}>
      <video ref={videoRef} muted playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: status === 'scanning' ? 1 : 0,
        }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* viseur */}
      {status === 'scanning' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
          <div style={{
            width: 'min(74vw, 300px)', aspectRatio: '1', position: 'relative',
            boxShadow: '0 0 0 100vmax rgba(5,7,14,.62)', borderRadius: 24,
          }}>
            {([['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']] as const).map(([v, h]) => (
              <span key={`${v}${h}`} style={{
                position: 'absolute', [v]: -3, [h]: -3, width: 42, height: 42,
                [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '4px solid var(--primary)',
                [`border${h === 'left' ? 'Left' : 'Right'}`]: '4px solid var(--primary)',
                [`border${v === 'top' ? 'Top' : 'Bottom'}${h === 'left' ? 'Left' : 'Right'}Radius`]: 20,
              } as React.CSSProperties} />
            ))}
            {/* ligne de balayage */}
            <span style={{
              position: 'absolute', insetInline: 10, height: 2, borderRadius: 2,
              background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              animation: 'scanline 2.2s ease-in-out infinite',
            }} />
          </div>
        </div>
      )}

      {/* bandeau du haut */}
      <div style={{
        position: 'relative', zIndex: 2, padding: 'calc(14px + var(--safe-t)) 16px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button className="btn btn-sm" onClick={cancel}>→ أرجع</button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, color: '#EDEAE3' }}>
          📷 إمسح الكارطة متاعك
        </div>
        <span style={{ width: 62 }} />
      </div>

      <div style={{ flex: 1 }} />

      {/* états */}
      <div style={{ position: 'relative', zIndex: 2, padding: '18px 18px calc(26px + var(--safe-b))' }}>
        {status === 'starting' && (
          <div className="card center"><div className="pulse">📷 نحلّو الكاميرا...</div></div>
        )}
        {status === 'scanning' && (
          <div className="hint small center" style={{ background: 'rgba(22,29,48,.9)' }}>
            {hint ?? 'حطّ الـ QR وسط المربّع. الكارطة تتحلّ وحدها.'}
          </div>
        )}
        {status === 'denied' && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ marginTop: 0 }}>🚫 الكاميرا مسكّرة</h3>
            <p className="small muted">
              لازم تسمح للأپليكاسيون تستعمل الكاميرا باش تمسح الكارطة.
              أمشي لـ <b>إعدادات التيليفون ← الأپليكاسيونات ← لوب ڤارو ← الأذونات ← الكاميرا</b> وشعّلها.
            </p>
            <div className="row">
              <button className="btn btn-block" onClick={cancel}>أرجع</button>
              <button className="btn btn-primary btn-block" onClick={() => location.reload()}>🔄 عاود جرّب</button>
            </div>
          </div>
        )}
        {status === 'nocam' && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ marginTop: 0 }}>📷 ما لقيتش كاميرا</h3>
            <p className="small muted">هذا التيليفون ما عندوش كاميرا تخدم، ولّا حاجة أخرى تستعملها توّا.</p>
            <button className="btn btn-block" onClick={cancel}>أرجع</button>
          </div>
        )}
        {status === 'error' && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ marginTop: 0 }}>⚠️ مشكل في الكاميرا</h3>
            <p className="tiny muted" style={{ direction: 'ltr', textAlign: 'left' }}>{detail}</p>
            <button className="btn btn-block" onClick={cancel}>أرجع</button>
          </div>
        )}
      </div>
    </div>
  )
}

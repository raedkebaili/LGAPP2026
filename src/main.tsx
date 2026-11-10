import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/theme.css'
import { loadUserImages } from './services/roleImages'
import { BgDecor } from './components/ornaments'

/** Retire l'écran de démarrage. Idempotent, appelable plusieurs fois. */
function hideBoot() {
  const b = document.getElementById('boot')
  if (!b) return
  b.classList.add('off')
  setTimeout(() => b.remove(), 500)
}

/** Plutôt qu'un écran noir : on affiche l'erreur. */
class Guard extends React.Component<{ children: React.ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null }
  static getDerivedStateFromError(err: Error) { return { err } }
  componentDidCatch(err: Error) { hideBoot(); console.error('[LGBT]', err) }
  render() {
    if (!this.state.err) return this.props.children
    return (
      <div className="screen stack" style={{ paddingTop: 40 }}>
        <h2 style={{ color: 'var(--danger)' }}>⚠️ فمّا مشكل</h2>
        <div className="card">
          <p className="small muted">الأپليكاسيون طاحت. هذا التفصيل:</p>
          <pre className="tiny" style={{ whiteSpace: 'pre-wrap', direction: 'ltr', textAlign: 'left', overflow: 'auto' }}>
            {String((this.state.err as any)?.stack ?? this.state.err)}
          </pre>
        </div>
        <button className="btn btn-primary btn-lg btn-block"
          onClick={() => { localStorage.removeItem('lgbt.game'); location.reload() }}>
          🔄 عاود من الأول
        </button>
      </div>
    )
  }
}

// ─── Rendu : on monte AVANT tout await, le splash part tout de suite ───
const root = createRoot(document.getElementById('root')!)
root.render(<React.StrictMode><BgDecor /><Guard><App /></Guard></React.StrictMode>)
requestAnimationFrame(hideBoot)
// filet de sécurité : jamais d'écran bloqué, même si un init échoue
setTimeout(hideBoot, 2500)

// ─── Initialisations non bloquantes ────────────────────────────
async function boot() {
  const C = (globalThis as any).Capacitor
  const native = !!C?.isNativePlatform?.()

  if (native) {
    try { await C.Plugins.StatusBar?.setStyle({ style: 'DARK' }) } catch { }
    try { await C.Plugins.StatusBar?.setBackgroundColor({ color: '#0A0D16' }) } catch { }
  }

  try { await loadUserImages() } catch { }
  try { await C?.Plugins?.SplashScreen?.hide() } catch { }

  // PWA : c'est ce qui rend l'app installable sur iPhone sans Mac.
  // Uniquement en production — en dev il mettrait les modules Vite en cache.
  if (!native && 'serviceWorker' in navigator) {
    if (import.meta.env.PROD && location.protocol === 'https:') {
      try { await navigator.serviceWorker.register('/sw.js') } catch { }
    } else {
      // nettoie un service worker laissé par un build précédent
      try {
        const regs = await navigator.serviceWorker.getRegistrations()
        await Promise.all(regs.map(r => r.unregister()))
        if (regs.length && 'caches' in window) {
          const keys = await caches.keys()
          await Promise.all(keys.map(k => caches.delete(k)))
        }
      } catch { }
    }
  }

  hideBoot()
}
boot()

/* ═══════════════════════════════════════════════════════════════
   Dessin des QR.

   Un seul QR existe dans le jeu : celui du salon du المعلّم, que les
   joueurs scannent pour entrer. Son contenu est fabriqué par
   `services/lanroom.ts` (`qrFor`) ; ici on ne fait que le dessiner.
   ═══════════════════════════════════════════════════════════════ */
import qrcode from 'qrcode-generator'

/**
 * Construit le QR et le rend en SVG (chaîne de <path>).
 * Niveau de correction Q : lisible même si l'écran est un peu sale ou rayé.
 */
export function qrSvgPath(text: string): { path: string; size: number } {
  // typeNumber 0 = choisit automatiquement la plus petite version qui tient
  const qr = qrcode(0, 'Q')
  qr.addData(text, 'Byte')
  qr.make()
  const n = qr.getModuleCount()
  let d = ''
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`
    }
  }
  return { path: d, size: n }
}

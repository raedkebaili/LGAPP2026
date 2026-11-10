#!/usr/bin/env node
/**
 * LOUP GAROU BEL TOUNSI — Récupération des images de rôles
 * ---------------------------------------------------------------------------
 * Interroge les sources configurées dans config/image-sources.json et
 * télécharge ce qui existe dans assets/roles/. Produit ensuite un rapport
 * listant les rôles qu'il faut illustrer nous-mêmes.
 *
 *   node scripts/fetch-role-images.mjs            # test à blanc
 *   node scripts/fetch-role-images.mjs --download # télécharge pour de vrai
 *
 * Note vérifiée le 2026-11-08 : aucune source officielle publique ne sert
 * d'images par rôle. Le script est en place pour le jour où ça change
 * (ou pour brancher ta propre banque d'images via le provider "custom").
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DOWNLOAD = process.argv.includes('--download');

const cfg   = JSON.parse(await readFile(path.join(ROOT, 'config/image-sources.json'), 'utf8'));
const roles = JSON.parse(await readFile(path.join(ROOT, 'data/roles.json'), 'utf8')).roles;

const outDir = path.join(ROOT, cfg.generation.outputDir);
await mkdir(outDir, { recursive: true });

const report = { checkedAt: new Date().toISOString(), found: [], missing: [], alreadyLocal: [], providers: [] };

/* --- 1. État des providers ------------------------------------------------ */
for (const p of cfg.providers) {
  let status = 'désactivé';
  if (p.enabled) {
    try {
      const probe = p.indexUrl ?? p.baseUrl + (p.rolesEndpoint ?? '');
      const r = await fetch(probe, { method: 'GET', signal: AbortSignal.timeout(12000) });
      status = `HTTP ${r.status}`;
    } catch (e) { status = `injoignable (${e.message})`; }
  }
  report.providers.push({ id: p.id, label: p.label, enabled: !!p.enabled, status, note: p.status });
  console.log(`[provider] ${p.id.padEnd(28)} ${p.enabled ? '✓ actif' : '· désactivé'}  → ${status}`);
}

/* --- 2. Rôle par rôle ----------------------------------------------------- */
const active = cfg.providers.filter(p => p.enabled);

for (const role of roles) {
  const localFile = path.join(outDir, `${role.id}.png`);

  if (existsSync(localFile)) {
    report.alreadyLocal.push(role.id);
    console.log(`  ✅ ${role.id.padEnd(22)} déjà illustré en local`);
    continue;
  }
  if ((cfg.noOfficialEquivalent ?? []).includes(role.id)) {
    report.missing.push({ id: role.id, nameFr: role.nameFr, reason: 'rôle fan-made — aucun équivalent officiel' });
    console.log(`  🎨 ${role.id.padEnd(22)} fan-made → à générer`);
    continue;
  }

  const aliases = cfg.roleAliases?.[role.id] ?? [role.id];
  let got = null;

  for (const p of active) {
    for (const alias of aliases) {
      const url = p.strategy === 'pattern'
        ? String(p.pattern).replace('{baseUrl}', p.baseUrl).replace('{roleId}', alias)
        : `${p.baseUrl}/${alias}.png`;
      try {
        const headers = {};
        if (p.auth?.type === 'bearer' && process.env[p.auth.envVar]) {
          headers.Authorization = `Bearer ${process.env[p.auth.envVar]}`;
        }
        const r = await fetch(url, { headers, signal: AbortSignal.timeout(12000) });
        if (!r.ok) continue;
        if (DOWNLOAD) {
          await writeFile(localFile, Buffer.from(await r.arrayBuffer()));
        }
        got = { provider: p.id, url };
        break;
      } catch { /* suivant */ }
    }
    if (got) break;
  }

  if (got) {
    report.found.push({ id: role.id, ...got });
    console.log(`  ⬇️  ${role.id.padEnd(22)} ${DOWNLOAD ? 'téléchargé' : 'disponible'} via ${got.provider}`);
  } else {
    report.missing.push({ id: role.id, nameFr: role.nameFr, reason: 'aucune source ne répond' });
    console.log(`  🎨 ${role.id.padEnd(22)} introuvable → à générer`);
  }
}

/* --- 3. Rapport ----------------------------------------------------------- */
await writeFile(path.join(ROOT, 'assets/roles/_report.json'), JSON.stringify(report, null, 2));

console.log(`\n──────────────────────────────────────────────`);
console.log(`déjà en local : ${report.alreadyLocal.length}`);
console.log(`récupérables  : ${report.found.length}`);
console.log(`à illustrer   : ${report.missing.length}`);
console.log(`rapport       : assets/roles/_report.json`);
if (!DOWNLOAD && report.found.length) console.log(`\n→ relance avec --download pour récupérer les fichiers.`);

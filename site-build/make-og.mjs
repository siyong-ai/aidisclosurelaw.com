#!/usr/bin/env node
/**
 * make-og.mjs — renders social share cards and PNG icons with headless Chrome.
 *
 * Zero dependencies. Produces:
 *   site-build/og/<page>.png           1200x630 Open Graph / Twitter card
 *   site-build/icons/favicon-32.png
 *   site-build/icons/apple-touch-icon.png   180x180, opaque
 *   site-build/icons/icon-512.png
 *
 * Run before build.mjs (build only emits og:image tags for files that exist).
 * Chrome path override: CHROME_BIN=/path/to/chrome node site-build/make-og.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'site-content');
/* Cards are written into site-build/ source dirs, then copied into site/assets
   by build.mjs. Writing straight into site/ would be wiped by the build. */
const ICON_DIR = path.join(ROOT, 'site-build', 'icons');
const OG_DIR = path.join(ROOT, 'site-build', 'og');
const TMP = path.join(ROOT, 'site-build', '.og-tmp');

const PAPER = '#FBFAF7';
const INK = '#12141A';
const INK2 = '#3A404C';
const MUTED = '#6C7280';
const LINE = '#E4E0D6';
const ACCENT = '#1D4ED8';

function findChrome() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return null;
}

/* ---------------------------------------------------------- frontmatter --- */

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const raw of m[1].split(/\r?\n/)) {
    const kv = raw.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    out[kv[1]] = v;
  }
  return out;
}

function collect() {
  const pages = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md') && !entry.name.startsWith('00-')) {
        const fm = parseFrontmatter(fs.readFileSync(full, 'utf8'));
        if (!fm.slug) continue;
        pages.push(fm);
      }
    }
  };
  walk(CONTENT);
  return pages;
}

/* --------------------------------------------------------------- layout --- */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SHIELD = `<svg width="46" height="46" viewBox="0 0 32 32" aria-hidden="true">
  <rect width="32" height="32" rx="7" fill="${INK}"/>
  <path d="M16 5.5 6.5 10v7.2c0 5.6 4.3 9.4 9.5 10.6 5.2-1.2 9.5-5 9.5-10.6V10L16 5.5Z" fill="none" stroke="#8BA6FF" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M11.6 15.7l2.9 3 5.6-6" fill="none" stroke="#8BA6FF" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const HEAD = `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:${PAPER};color:${INK};
    font-family:'Inter',-apple-system,'Segoe UI',system-ui,sans-serif;
    position:relative;
  }
  /* paper grain + rule grid, kept faint so text stays the only focal point */
  .grid{
    position:absolute;inset:0;
    background-image:
      linear-gradient(to right, rgba(18,20,26,.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(18,20,26,.045) 1px, transparent 1px);
    background-size:64px 64px;
    mask-image:radial-gradient(120% 90% at 78% 12%, #000 0%, transparent 72%);
    -webkit-mask-image:radial-gradient(120% 90% at 78% 12%, #000 0%, transparent 72%);
  }
  .marks{
    position:absolute;right:74px;top:74px;width:106px;
    display:flex;flex-direction:column;gap:9px;align-items:flex-end;
  }
  .marks i{display:block;height:1.5px;border-radius:2px;background:rgba(29,78,216,.22)}
  .marks i:nth-child(1){width:100%}
  .marks i:nth-child(2){width:66%}
  .marks i:nth-child(3){width:34%}
  .frame{position:absolute;inset:0;padding:64px 72px 56px;display:flex;flex-direction:column}
  .top{display:flex;align-items:center;gap:16px}
  .brand{display:flex;flex-direction:column;gap:3px}
  .brand b{
    font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:500;
    letter-spacing:.2em;text-transform:uppercase;color:${INK};
  }
  .brand span{
    font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;
    letter-spacing:.16em;text-transform:uppercase;color:${MUTED};
  }
  .mid{margin-top:auto;margin-bottom:58px;max-width:1010px}
  .pill{
    display:inline-flex;align-items:center;gap:9px;
    font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;font-weight:500;
    letter-spacing:.13em;text-transform:uppercase;color:${ACCENT};
    border:1px solid rgba(29,78,216,.26);background:rgba(29,78,216,.06);
    padding:7px 14px 7px 12px;border-radius:999px;margin-bottom:24px;
  }
  .pill i{width:6px;height:6px;border-radius:50%;background:${ACCENT};display:block}
  h1{
    font-family:'Fraunces',Georgia,serif;font-weight:600;
    font-size:60px;line-height:1.08;letter-spacing:-.018em;color:${INK};
  }
  .bottom{
    display:flex;align-items:baseline;justify-content:space-between;
    border-top:1px solid ${LINE};padding-top:20px;
  }
  .bottom span{
    font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;
    letter-spacing:.05em;color:${INK2};
  }
  .bottom span.dim{color:${MUTED};letter-spacing:.14em;text-transform:uppercase;font-size:11px}
</style>`;

function ogHtml({ status, title, date }) {
  return `<!doctype html><html lang="en"><head>${HEAD}</head>
<body>
  <div class="grid"></div>
  <div class="marks"><i></i><i></i><i></i></div>
  <div class="frame">
    <div class="top">${SHIELD}<div class="brand"><b>AI Disclosure Law</b><span>Verified state obligations</span></div></div>
    <div class="mid">
      <div class="pill"><i></i>${esc(status)}</div>
      <h1>${esc(title)}</h1>
    </div>
    <div class="bottom">
      <span class="dim">Read the statute, not the summary</span>
      <span>Updated ${esc(date)} · aidisclosurelaw.com</span>
    </div>
  </div>
</body></html>`;
}

function iconHtml(size, radius) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0}
  html,body{width:${size}px;height:${size}px;background:${radius ? 'transparent' : PAPER}}
  svg{width:${size}px;height:${size}px;display:block}
</style></head><body>
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  ${radius ? '' : `<rect width="32" height="32" fill="${PAPER}"/>`}
  <rect x="${radius ? 0 : 0}" y="0" width="32" height="32" rx="${radius ? 7 : 0}" fill="${INK}"/>
  <path d="M16 5.5 6.5 10v7.2c0 5.6 4.3 9.4 9.5 10.6 5.2-1.2 9.5-5 9.5-10.6V10L16 5.5Z" fill="none" stroke="#8BA6FF" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M11.6 15.7l2.9 3 5.6-6" fill="none" stroke="#8BA6FF" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg></body></html>`;
}

/* ---------------------------------------------------------------- shoot --- */

function shoot(chrome, htmlPath, outPath, w, h) {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--default-background-color=00000000',
      `--window-size=${w},${h}`,
      '--virtual-time-budget=6000',
      `--screenshot=${outPath}`,
      'file:///' + htmlPath.replace(/\\/g, '/'),
    ],
    { stdio: 'ignore' }
  );
}

function readableDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d} ${months[m - 1]} ${y}`;
}

function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.log('! No Chrome/Edge found. Skipping OG images (build will omit og:image tags).');
    console.log('  Set CHROME_BIN to a Chromium binary and re-run.');
    return;
  }

  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(OG_DIR, { recursive: true });
  fs.mkdirSync(ICON_DIR, { recursive: true });

  const targets = [
    {
      file: 'home',
      status: 'State tracker',
      title: 'Which state AI disclosure laws are actually in effect',
      date: '8 November 2026',
    },
  ];

  for (const fm of collect()) {
    const title = fm.h1 || fm.title || '';
    const short = title.length > 92 ? fm.title || title : title;
    targets.push({
      file: fm.slug.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'index',
      status: fm.status || 'Reference',
      title: short,
      date: fm.last_verified ? readableDate(fm.last_verified) : '8 November 2026',
    });
  }

  let made = 0;
  for (const t of targets) {
    const htmlPath = path.join(TMP, `${t.file}.html`);
    const outPath = path.join(OG_DIR, `${t.file}.png`);
    fs.writeFileSync(htmlPath, ogHtml(t), 'utf8');
    shoot(chrome, htmlPath, outPath, 1200, 630);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 6000) made++;
    else console.log(`  ! ${t.file} produced a suspiciously small PNG`);
  }

  const icons = [
    ['favicon-32.png', 32, 7],
    ['apple-touch-icon.png', 180, 0],
    ['icon-512.png', 512, 0],
  ];
  for (const [name, size, radius] of icons) {
    const htmlPath = path.join(TMP, `icon-${size}.html`);
    fs.writeFileSync(htmlPath, iconHtml(size, radius), 'utf8');
    shoot(chrome, htmlPath, path.join(ICON_DIR, name), size, size);
  }

  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`✓ ${made}/${targets.length} social cards + 3 icons -> site-build/og, site-build/icons`);
}

main();

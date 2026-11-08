#!/usr/bin/env node
/**
 * Domain launch checker.
 *
 *   node site-build/check-domain.mjs aidisclosurelaw.com
 *
 * Answers the four questions that actually break a launch:
 *   1. Is DNS pointing where I think it is? (nameservers, A, www, MX, TXT)
 *   2. Does TLS terminate correctly? (issuer, expiry, handshake failure)
 *   3. Does every hostname reach the app? (redirect chain, Vercel headers)
 *   4. Do the GEO/SEO files and the share card resolve over the live domain?
 *
 * Zero dependencies. Exits 1 if anything is broken, so it can gate a deploy.
 */

import tls from 'node:tls';

const DOMAIN = (process.argv[2] || 'aidisclosurelaw.com').replace(/^https?:\/\//, '').replace(/\/+$/, '');

const c = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m',
};

const problems = [];
const notes = [];

function head(text) {
  console.log(`\n${c.bold}${c.cyan}${text}${c.reset}`);
  console.log(c.dim + '─'.repeat(64) + c.reset);
}

function ok(label, value) {
  console.log(`  ${c.green}✓${c.reset} ${label.padEnd(26)} ${value}`);
}

function warn(label, value) {
  console.log(`  ${c.yellow}!${c.reset} ${label.padEnd(26)} ${value}`);
  notes.push(`${label}: ${value}`);
}

function bad(label, value) {
  console.log(`  ${c.red}✗${c.reset} ${label.padEnd(26)} ${value}`);
  problems.push(`${label}: ${value}`);
}

function info(label, value) {
  console.log(`  ${c.dim}·${c.reset} ${label.padEnd(26)} ${value}`);
}

/* ------------------------------------------------------------------- DNS */

async function doh(name, type) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetch(url, { headers: { accept: 'application/dns-json' } });
  const json = await res.json();
  return (json.Answer || []).map((a) => a.data);
}

/* ------------------------------------------------------------------- TLS */

function probeTls(host) {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, timeout: 12000, rejectUnauthorized: false },
      () => {
        const cert = socket.getPeerCertificate() || {};
        resolve({
          authorized: socket.authorized,
          error: socket.authorizationError || null,
          issuer: cert.issuer && (cert.issuer.O || cert.issuer.CN),
          subject: cert.subject && cert.subject.CN,
          validTo: cert.valid_to,
          altNames: cert.subjectaltname || '',
        });
        socket.end();
      }
    );
    socket.on('timeout', () => { socket.destroy(); resolve({ error: 'TIMEOUT' }); });
    socket.on('error', (e) => resolve({ error: e.code || e.message }));
  });
}

/* ------------------------------------------------------------------ HTTP */

async function chain(url, max = 6) {
  const hops = [];
  let current = url;
  for (let i = 0; i < max; i++) {
    let res;
    try {
      res = await fetch(current, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 domain-check' } });
    } catch (e) {
      hops.push({ url: current, error: e.cause?.code || e.message });
      break;
    }
    hops.push({
      url: current,
      status: res.status,
      location: res.headers.get('location') || '',
      server: res.headers.get('server') || '',
      vercelError: res.headers.get('x-vercel-error') || '',
      vercelId: res.headers.get('x-vercel-id') || '',
    });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      current = new URL(res.headers.get('location'), current).href;
    } else break;
  }
  return hops;
}

async function bytes(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 domain-check' } });
    const text = await res.text();
    return { status: res.status, size: text.length, text };
  } catch (e) {
    return { status: 0, size: 0, text: '', error: e.cause?.code || e.message };
  }
}

/* --------------------------------------------------------------- reports */

function printChain(host, hops) {
  /* www is optional: a broken www never blocks the site, so it only ever warns.
     Otherwise every apex-only host reports phantom failures. */
  const sink = host.startsWith('www.') ? warn : bad;
  hops.forEach((hop, i) => {
    const arrow = i === 0 ? '' : '  → ';
    if (hop.error) {
      sink(host, `${hop.url}  ${hop.error}`);
      return;
    }
    const status = hop.status;
    const label = `${status} ${hop.server || ''} ${hop.vercelError ? `[${hop.vercelError}]` : ''}`.trim();
    if (status === 200) ok(host, `${arrow}${hop.url}  ${label}`);
    else if (status >= 300 && status < 400) warn(host, `${arrow}${hop.url}  ${label} → ${hop.location}`);
    else sink(host, `${arrow}${hop.url}  ${label}`);
  });
}

/* ------------------------------------------------------------------ main */

console.log(`${c.bold}Launch check: ${DOMAIN}${c.reset}`);
console.log(c.dim + new Date().toISOString() + c.reset);

head('1. Nameservers');
const ns = await doh(DOMAIN, 'NS');
if (!ns.length) info('NS', 'no answer — the tested name is probably a subdomain of another zone');
else {
  const cf = ns.every((n) => n.includes('ns.cloudflare.com'));
  (cf ? ok : warn)('NS', ns.join(', '));
  if (!cf && ns.every((n) => n.includes('vercel-dns.com'))) info('note', 'on Vercel nameservers');
}

head('2. Address records');
const apexA = await doh(DOMAIN, 'A');
const wwwA = await doh(`www.${DOMAIN}`, 'A');
const wwwC = await doh(`www.${DOMAIN}`, 'CNAME');
if (!apexA.length) bad('A @', 'none');
else {
  const proxied = apexA.some((ip) => /^104\.2[0-9]\.|^172\.6[7-9]\.|^172\.7[01]\./.test(ip));
  (proxied ? warn : ok)('A @', apexA.join(', ') + (proxied ? '  (Cloudflare proxy)' : ''));
  if (proxied) notes.push('apex is proxied: Vercel sees Cloudflare IPs, not its own');
}
info('A www', wwwA.join(', ') || '(none)');
if (wwwC.length) warn('CNAME www', wwwC.join(', '));

/* www is optional. Only check it when something is actually published there,
   otherwise every apex-only host reports two phantom TLS failures. */
const HOSTS = [DOMAIN];
if (wwwA.length || wwwC.length) HOSTS.push(`www.${DOMAIN}`);
else info('www', 'not published — skipping www checks (fine for an apex-only site)');

head('3. Mail records (do not lose these)');
const mx = await doh(DOMAIN, 'MX');
info('MX', mx.join(', ') || '(none — no email on this domain)');
const txt = await doh(DOMAIN, 'TXT');
info('TXT', txt.filter((t) => t.includes('spf')).join(' | ') || '(no SPF)');
const vercelTxt = await doh(`_vercel.${DOMAIN}`, 'TXT');
info('TXT _vercel', vercelTxt.join(' | ') || '(none — only needed if the domain sits on another Vercel account)');

head('4. TLS certificate');
for (const host of HOSTS) {
  const t = await probeTls(host);
  const sink = host.startsWith('www.') ? warn : bad;
  if (t.error) sink(host, `handshake failed: ${t.error}`);
  else if (!t.authorized) sink(host, `untrusted chain (${t.error}) issued by ${t.issuer || '?'}`);
  else ok(host, `${t.issuer} · CN=${t.subject} · expires ${t.validTo}`);
}

head('5. HTTP');
for (const host of HOSTS) {
  const hops = await chain(`https://${host}/`);
  printChain(host, hops);
}
const plain = await chain(`http://${DOMAIN}/`);
if (plain[0] && plain[0].status >= 300 && plain[0].status < 400) {
  ok('http → https', `${plain[0].status} → ${plain[0].location}`);
} else if (plain[0]) {
  warn('http → https', `returns ${plain[0].status || plain[0].error} instead of a redirect`);
}

head('6. GEO / SEO files');
for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/404.html']) {
  const r = await bytes(`https://${DOMAIN}${path}`);
  (r.status === 200 ? ok : bad)(path, `${r.status} ${r.size}B`);
}

/* A 200 on robots.txt says nothing about its content. Cloudflare can prepend a
   managed block that Disallows every AI crawler while the file still looks
   healthy by status and size, which silently voids the whole GEO layer. */
{
  const r = await bytes(`https://${DOMAIN}/robots.txt`);
  const managed = r.text.includes('BEGIN Cloudflare Managed');
  const authored = r.text.includes('# aidisclosurelaw.com');
  const signal = (r.text.match(/Content-Signal:\s*([^\n]+)/i) || [])[1];
  const disallow = (r.text.match(/^Disallow:\s*\/\s*$/gim) || []).length;
  if (managed) {
    bad(
      'robots.txt body',
      `Cloudflare is injecting a managed block${signal ? ` (${signal.trim()})` : ''}` +
        `${disallow ? `, ${disallow} crawler(s) Disallowed` : ''} — origin file is being overridden`
    );
    notes.push('Cloudflare: AI Crawl Control → set Search/Agent/Training to Allow, then turn off Enable Bot Preference Sync');
  } else if (authored) {
    ok('robots.txt body', `served as authored${disallow ? `, ${disallow} Disallow line(s)` : ', no AI crawler blocked'}`);
  } else {
    warn('robots.txt body', 'does not contain the expected origin content');
  }
}

head('7. Share card');
const home = await bytes(`https://${DOMAIN}/`);
const ogImage = (home.text.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
const canonical = (home.text.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
info('canonical', canonical || '(missing)');
if (canonical && !canonical.includes(DOMAIN)) warn('canonical host', 'points at a different host than tested');
if (!ogImage) bad('og:image', 'no tag');
else {
  const card = await bytes(ogImage);
  const sameHost = ogImage.includes(DOMAIN);
  (card.status === 200 ? ok : bad)('og:image', `${ogImage}  ${card.status} ${card.size}B`);
  if (!sameHost) notes.push('og:image is served from another host (fine before the domain is attached, wrong after)');
}

/* --------------------------------------------------------------- verdict */

head('Verdict');
if (!problems.length) {
  console.log(`  ${c.green}All checks passed.${c.reset}`);
} else {
  console.log(`  ${c.red}${problems.length} blocking problem(s):${c.reset}`);
  for (const p of problems) console.log(`   - ${p}`);
}
if (notes.length) {
  console.log(`\n  ${c.yellow}Non-blocking:${c.reset}`);
  for (const n of notes) console.log(`   - ${n}`);
}
console.log('');
process.exit(problems.length ? 1 : 0);

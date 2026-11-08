#!/usr/bin/env node
/**
 * Static site builder for aidisclosurelaw.com
 * Zero dependencies. Reads site-content/*.md -> site/**\/index.html
 *
 * SEO: canonical, OG/Twitter, sitemap.xml, robots.txt, JSON-LD (@graph:
 *      Article + BreadcrumbList + FAQPage + Legislation), rel=alternate markdown
 * GEO: llms.txt, llms-full.txt, speakable spec, answer-first blocks,
 *      dateModified, inline official-source attribution
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'site-content');
const OUT = path.join(ROOT, 'site');
const BASE = 'https://aidisclosurelaw.com';
const SITE_NAME = 'AI Disclosure Law';
const TODAY = '2026-11-08';

/* ------------------------------------------------------------------ utils */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[`'"“”‘’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const stripMd = (s) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/* ------------------------------------------------------------- front matter */

function parseFrontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const raw = m[1].split(/\r?\n/);
  const data = {};
  let key = null;

  for (const line of raw) {
    if (!line.trim()) continue;

    const top = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (top && !/^\s/.test(line)) {
      key = top[1];
      const val = top[2].trim();
      if (val === '') {
        data[key] = [];
      } else if (/^\[.*\]$/.test(val)) {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map((x) => x.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      } else {
        data[key] = val.replace(/^["']|["']$/g, '');
      }
      continue;
    }

    const item = line.match(/^\s+-\s*(.*)$/);
    if (item && key) {
      const body = item[1];
      const kv = body.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
      if (kv) {
        if (!Array.isArray(data[key])) data[key] = [];
        data[key].push({ [kv[1]]: kv[2].replace(/^["']|["']$/g, '') });
      } else {
        if (!Array.isArray(data[key])) data[key] = [];
        data[key].push(body.replace(/^["']|["']$/g, ''));
      }
      continue;
    }

    const sub = line.match(/^\s+([A-Za-z_][\w-]*):\s*(.*)$/);
    if (sub && Array.isArray(data[key]) && data[key].length) {
      const last = data[key][data[key].length - 1];
      if (last && typeof last === 'object') last[sub[1]] = sub[2].replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: src.slice(m[0].length) };
}

/* ---------------------------------------------------------------- inline md */

function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => {
    const ext = /^https?:/.test(h);
    const attrs = ext ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${h}"${attrs}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
  return s;
}

/* ------------------------------------------------------------ block parser */

function renderMarkdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  const toc = [];
  const faqs = [];
  const usedIds = new Set();
  let i = 0;
  let firstH1Skipped = false;
  let section = '';

  const uniq = (base) => {
    let id = base || 'section';
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // hr
    if (/^---+$/.test(line.trim())) {
      out.push('<hr>');
      section = '';
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      if (level === 1 && !firstH1Skipped) {
        firstH1Skipped = true;
        i++;
        continue;
      }
      const id = uniq(slugify(stripMd(text)));
      if (level === 2) {
        section = text;
        toc.push({ id, text: stripMd(text) });
        out.push(
          `<h2 id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inline(text)}</h2>`
        );
      } else if (level === 3) {
        out.push(`<h3 id="${id}">${inline(text)}</h3>`);
      } else {
        out.push(`<h4 id="${id}">${inline(text)}</h4>`);
      }
      i++;
      continue;
    }

    // blockquote -> short answer
    if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      let text = buf.join(' ').trim();
      const isShort = /^\*\*Short answer\.?\*\*/.test(text);
      if (isShort) text = text.replace(/^\*\*Short answer\.?\*\*\s*/, '');
      out.push(
        `<div class="short-answer${isShort ? '' : ' short-answer--plain'}" data-speakable>${
          isShort ? '' : ''
        }<p>${inline(text)}</p></div>`
      );
      continue;
    }

    // table
    if (/^\|/.test(line.trim())) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i].trim());
        i++;
      }
      const cells = (r) =>
        r
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((c) => c.trim());
      const isSep = (r) => /^\|[\s:|-]+\|$/.test(r.replace(/\s/g, ''));
      const head = cells(rows[0]);
      const bodyRows = rows.slice(1).filter((r) => !isSep(r));
      let html = '<div class="table-wrap"><table class="md-table"><thead><tr>';
      html += head.map((c) => `<th>${inline(c)}</th>`).join('');
      html += '</tr></thead><tbody>';
      for (const r of bodyRows) {
        const cs = cells(r);
        html += '<tr>' + cs.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
      }
      html += '</tbody></table></div>';
      out.push(html);
      continue;
    }

    // lists
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ''));
        i++;
      }
      const checkable = items.some((t) => /^\[[ xX]\]\s/.test(t));
      if (checkable) {
        out.push(
          '<ul class="checklist">' +
            items
              .map((t) => {
                const done = /^\[[xX]\]\s/.test(t);
                const text = t.replace(/^\[[ xX]\]\s*/, '');
                return `<li${done ? ' class="done"' : ''}>${inline(text)}</li>`;
              })
              .join('') +
            '</ul>'
        );
      } else {
        const tag = ordered ? 'ol' : 'ul';
        out.push(
          `<${tag} class="md-list">` + items.map((t) => `<li>${inline(t)}</li>`).join('') + `</${tag}>`
        );
      }
      continue;
    }

    // FAQ question (handled at line level: question and answer sit on adjacent lines)
    if (/^frequently asked questions/i.test(section)) {
      const qm = line.match(/^\*\*([^*]+?\?)\*\*\s*(.*)$/);
      if (qm) {
        faqs.push({ q: qm[1].trim(), a: [] });
        if (qm[2].trim()) faqs[faqs.length - 1].a.push(qm[2].trim());
        i++;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !/^(#{1,4}\s|>|\||\s*[-*]\s+|\s*\d+\.\s+|---+$)/.test(lines[i])
        ) {
          faqs[faqs.length - 1].a.push(lines[i].trim());
          i++;
        }
        continue;
      }
    }

    // paragraph
    const buf = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4}\s|>|\||\s*[-*]\s+|\s*\d+\.\s+|---+$)/.test(lines[i])
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    if (buf.length) {
      const text = buf.join(' ');
      // FAQ question pattern: whole paragraph is **...?**
      const q = text.match(/^\*\*([^*]+)\*\*$/);
      const isFaqSection = /^frequently asked questions/i.test(section);
      if (isFaqSection && q && /\?$/.test(q[1].trim())) {
        faqs.push({ q: q[1].trim(), a: [] });
      } else if (isFaqSection && faqs.length && text) {
        faqs[faqs.length - 1].a.push(text);
      } else {
        out.push(`<p>${inline(text)}</p>`);
      }
    }
  }

  return { html: out.join('\n'), toc, faqs };
}

/* ------------------------------------------------------------------ labels */

const SEGMENT_LABELS = {
  colorado: 'Colorado',
  california: 'California',
  texas: 'Texas',
  compare: 'Compare',
  'in-effect': 'In effect',
  'sb-26-189': 'SB 26-189',
  'sb-942': 'SB 942',
  'sb-53': 'SB 53',
  'ab-2013': 'AB 2013',
  'ab-2839': 'AB 2839',
  traiga: 'TRAIGA (HB 149)',
  'colorado-vs-texas': 'Colorado vs Texas',
};
const label = (seg) => SEGMENT_LABELS[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const NAV = [
  { label: 'Colorado', url: '/colorado/' },
  { label: 'California', url: '/california/sb-942/' },
  { label: 'Texas', url: '/texas/traiga/' },
  { label: 'Compare', url: '/compare/colorado-vs-texas/' },
  { label: 'In effect', url: '/in-effect/' },
];

const LEGISLATION = {
  '/colorado/sb-26-189/': {
    identifier: 'SB 26-189',
    jurisdiction: 'US-CO',
    date: '2026-05-14',
    name: 'Colorado Automated Decision-Making Technology Act',
    effective: '2027-01-01',
  },
  '/california/sb-942/': {
    identifier: 'SB 942',
    jurisdiction: 'US-CA',
    date: '2024-09-19',
    name: 'California AI Transparency Act',
    effective: '2026-08-02',
  },
  '/california/ab-2013/': {
    identifier: 'AB 2013',
    jurisdiction: 'US-CA',
    date: '2024-09-28',
    name: 'Generative AI Training Data Transparency Act',
    effective: '2026-01-01',
  },
  '/california/ab-2839/': {
    identifier: 'AB 2839',
    jurisdiction: 'US-CA',
    date: '2024-09-17',
    name: 'California election deepfake prohibition',
    effective: 'enjoined',
  },
  '/california/sb-53/': {
    identifier: 'SB 53',
    jurisdiction: 'US-CA',
    date: '2025-09-29',
    name: 'Transparency in Frontier Artificial Intelligence Act',
    effective: '2026-01-01',
  },
  '/texas/traiga/': {
    identifier: 'HB 149',
    jurisdiction: 'US-TX',
    date: '2025-06-22',
    name: 'Texas Responsible Artificial Intelligence Governance Act',
    effective: '2026-01-01',
  },
};

function statusClass(status = '') {
  if (/not enforceable|barred/i.test(status)) return 'bad';
  if (/not yet/i.test(status)) return 'warn';
  if (/^in force/i.test(status)) return 'ok';
  return 'neutral';
}

/* ------------------------------------------------------------------- build */

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md') && !e.name.startsWith('00-')) acc.push(p);
  }
  return acc;
}

const files = walk(SRC);
const pages = [];

for (const file of files) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/').replace(/\.md$/, '');
  const url = rel.endsWith('/index') || rel === 'index' ? `/${rel.replace(/\/?index$/, '')}/`.replace('//', '/') : `/${rel}/`;
  const src = fs.readFileSync(file, 'utf8');
  const { data, body } = parseFrontMatter(src);
  const { html, toc, faqs } = renderMarkdown(body);
  const words =
    (html + faqs.map((f) => f.a.join(' ')).join(' '))
      .replace(/<[^>]+>/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length;
  pages.push({ file, rel, url: url === '//' ? '/' : url, fm: data, html, toc, faqs, words });
}

pages.sort((a, b) => a.url.localeCompare(b.url));

/* --------------------------------------------------------------- templates */

function breadcrumbs(url) {
  const segs = url.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: '/' }];
  let acc = '';
  segs.forEach((s, idx) => {
    acc += `/${s}`;
    const last = idx === segs.length - 1;
    items.push({ name: label(s), url: last ? `${acc}/` : `${acc}/` });
  });
  return items;
}

function crumbsHtml(url) {
  const items = breadcrumbs(url);
  return (
    '<nav class="crumbs" aria-label="Breadcrumb"><ol>' +
    items
      .map((it, idx) => {
        const last = idx === items.length - 1;
        return last
          ? `<li aria-current="page">${esc(it.name)}</li>`
          : `<li><a href="${it.url}">${esc(it.name)}</a></li>`;
      })
      .join('<li class="sep" aria-hidden="true">/</li>') +
    '</ol></nav>'
  );
}

function jsonLd(page) {
  const { fm, url, faqs } = page;
  const graph = [];

  graph.push({
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: `${BASE}/`,
    name: SITE_NAME,
    description: 'State AI disclosure and transparency law, verified against the official text.',
    inLanguage: 'en',
    publisher: { '@id': `${BASE}/#org` },
  });

  graph.push({
    '@type': 'Organization',
    '@id': `${BASE}/#org`,
    name: SITE_NAME,
    url: `${BASE}/`,
    description: 'An independent reference on US state AI disclosure and transparency obligations.',
  });

  const article = {
    '@type': 'Article',
    '@id': `${BASE}${url}#article`,
    headline: fm.h1 || fm.title,
    description: fm.meta_description || fm.one_liner,
    abstract: fm.one_liner,
    inLanguage: 'en',
    datePublished: TODAY,
    dateModified: TODAY,
    isAccessibleForFree: true,
    ...(fs.existsSync(ogFile(url))
      ? {
          image: {
            '@type': 'ImageObject',
            url: `${BASE}/assets/og/${ogName(url)}.png`,
            width: 1200,
            height: 630,
            caption: fm.h1 || fm.title,
          },
        }
      : {}),
    mainEntityOfPage: { '@id': `${BASE}${url}#webpage` },
    author: { '@id': `${BASE}/#org` },
    publisher: { '@id': `${BASE}/#org` },
    keywords: [fm.primary_keyword, ...(fm.secondary_keywords || [])].filter(Boolean).join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.short-answer'],
    },
    citation: (fm.sources || []).filter((s) => s && s.url).map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
  };

  const leg = LEGISLATION[url];
  if (leg) {
    article.about = {
      '@type': 'Legislation',
      name: leg.name,
      legislationIdentifier: leg.identifier,
      legislationJurisdiction: leg.jurisdiction,
      legislationDate: leg.date,
      legislationType: 'Statute',
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Effective date', value: leg.effective },
        { '@type': 'PropertyValue', name: 'Status', value: fm.status },
      ],
    };
  }

  graph.push(article);

  graph.push({
    '@type': 'WebPage',
    '@id': `${BASE}${url}#webpage`,
    url: `${BASE}${url}`,
    name: fm.title,
    description: fm.meta_description,
    isPartOf: { '@id': `${BASE}/#website` },
    breadcrumb: { '@id': `${BASE}${url}#breadcrumb` },
    primaryImageOfPage: undefined,
    inLanguage: 'en',
    dateModified: TODAY,
  });

  const crumbs = breadcrumbs(url).map((c, idx, arr) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: c.name,
    item: `${BASE}${c.url}`,
    ...(idx === arr.length - 1 ? {} : {}),
  }));
  graph.push({ '@type': 'BreadcrumbList', '@id': `${BASE}${url}#breadcrumb`, itemListElement: crumbs });

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${BASE}${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: stripMd(f.a.join(' ')) },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function faqHtml(faqs) {
  if (!faqs.length) return '';
  return (
    '<section class="faq-section" aria-labelledby="faq-h">' +
    '<h2 id="faq-h">Frequently asked questions</h2>' +
    faqs
      .map(
        (f) =>
          `<details class="faq"><summary>${inline(f.q)}</summary><div class="faq-a">${f.a
            .map((p) => `<p>${inline(p)}</p>`)
            .join('')}</div></details>`
      )
      .join('') +
    '</section>'
  );
}

function tocHtml(page) {
  if (!page.toc.length) return '';
  return (
    '<aside class="toc" aria-label="On this page"><p class="toc-title">On this page</p><ul>' +
    page.toc.map((t) => `<li><a href="#${t.id}" data-toc>${esc(t.text)}</a></li>`).join('') +
    '</ul>' +
    `<div class="toc-meta"><span class="dot ${statusClass(page.fm.status)}"></span><span>${esc(
      page.fm.status || ''
    )}</span></div></aside>`
  );
}

function sourcesHtml(page) {
  const list = (page.fm.sources || []).filter((s) => s && s.label);
  if (!list.length) return '';
  return (
    '<section class="sources" aria-labelledby="src-h"><h2 id="src-h">Primary sources</h2><ol>' +
    list
      .map((s) => {
        const u = s.url || '#';
        const ext = /^https?:/.test(u);
        return `<li>${ext ? `<a href="${u}" target="_blank" rel="noopener">${esc(s.label)}</a>` : esc(s.label)}${
          ext ? `<span class="src-url">${esc(u.replace(/^https?:\/\//, '').split('/')[0])}</span>` : ''
        }</li>`;
      })
      .join('') +
    '</ol>' +
    `<p class="cite"><button class="copy" data-copy="${esc(
      `${SITE_NAME}. "${stripMd(page.fm.h1 || page.fm.title)}." ${BASE}${page.url} (last verified ${TODAY}).`
    )}">Copy citation</button></p></section>`
  );
}

/* Social card naming must match make-og.mjs: /california/sb-942/ -> california-sb-942 */
const ogName = (url) => (url === '/' ? 'home' : url.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
const ogFile = (url) => path.join(ROOT, 'site-build', 'og', `${ogName(url)}.png`);

function ogTags(url, title) {
  if (!fs.existsSync(ogFile(url))) return '';
  const src = `${BASE}/assets/og/${ogName(url)}.png`;
  return [
    `<meta property="og:image" content="${src}">`,
    `<meta property="og:image:type" content="image/png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(title)}">`,
    `<meta name="twitter:image" content="${src}">`,
    `<meta name="twitter:image:alt" content="${esc(title)}">`,
  ].join('\n');
}

function pageShell(page) {
  const { fm, url, html, words } = page;
  const title = fm.title || fm.h1;
  const desc = fm.meta_description || fm.one_liner;
  const canonical = `${BASE}${url}`;
  const sc = statusClass(fm.status);
  const activeNav = (u) => (url === u || url.startsWith(u.replace(/\/$/, '') + '/') ? ' aria-current="page"' : '');
  const rt = Math.max(1, Math.round(words / 220));

  const bodyHtml = html.replace(
    /<p><strong>(Related|Next):?<\/strong>\s*([\s\S]*?)<\/p>/g,
    (m, kind, rest) => `<div class="related"><span>${kind}</span>${rest}</div>`
  );

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
<meta name="author" content="${SITE_NAME}">
<meta name="theme-color" content="#FBFAF7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0B0C0F" media="(prefers-color-scheme: dark)">
<link rel="alternate" type="text/markdown" href="${url}index.md" title="Markdown source">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="en_US">
<meta property="article:modified_time" content="${TODAY}T00:00:00+00:00">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
${ogTags(url, title)}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/style.css">
<script type="application/ld+json">
${jsonLd(page)}
</script>
</head>
<body>
<div class="progress" aria-hidden="true"><span></span></div>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">
      <svg class="brand-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 3 6.5v6c0 5 4 8.4 9 9.5 5-1.1 9-4.5 9-9.5v-6L12 2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.2 12.1l2.6 2.6 5-5.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="brand-text"><strong>AI Disclosure Law</strong><em>verified state obligations</em></span>
    </a>
    <nav class="nav" aria-label="Sections">
      ${NAV.map((n) => `<a href="${n.url}"${activeNav(n.url)}>${n.label}</a>`).join('')}
    </nav>
    <button class="theme" type="button" aria-label="Toggle color theme" data-theme-toggle>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>

<div class="wrap layout">
  ${tocHtml(page)}
  <main id="main" class="content">
    ${crumbsHtml(url)}
    <div class="page-head">
      <div class="meta-row">
        <span class="pill ${sc}"><span class="dot ${sc}"></span>${esc(fm.status || 'Reference')}</span>
        <span class="meta-item">Last verified <time datetime="${TODAY}">${new Date(TODAY).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></span>
        <span class="meta-item">${rt} min read</span>
      </div>
      <h1>${esc(fm.h1 || title)}</h1>
    </div>
    <article class="prose">
${bodyHtml}
${faqHtml(page.faqs)}
${sourcesHtml(page)}
      <p class="disclaimer">This page is general information, not legal advice. Statutes change, and litigation can alter what is enforceable. Confirm against the official text linked above and a qualified attorney in your jurisdiction.</p>
    </article>
    <nav class="pager" aria-label="Continue reading">
      ${pagerHtml(url)}
    </nav>
  </main>
</div>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">
      <strong>AI Disclosure Law</strong>
      <p>Independent tracking of US state AI disclosure and transparency obligations, checked against official sources and dated on every page.</p>
    </div>
    <div class="footer-col">
      <h3>States</h3>
      <a href="/colorado/">Colorado</a>
      <a href="/california/sb-942/">California</a>
      <a href="/texas/traiga/">Texas</a>
      <a href="/in-effect/">In effect now</a>
    </div>
    <div class="footer-col">
      <h3>Laws</h3>
      <a href="/colorado/sb-26-189/">CO SB 26-189</a>
      <a href="/california/sb-942/">CA SB 942</a>
      <a href="/california/ab-2013/">CA AB 2013</a>
      <a href="/california/sb-53/">CA SB 53</a>
      <a href="/california/ab-2839/">CA AB 2839</a>
      <a href="/texas/traiga/">TX HB 149</a>
    </div>
    <div class="footer-col">
      <h3>For machines</h3>
      <a href="/llms.txt">llms.txt</a>
      <a href="/llms-full.txt">llms-full.txt</a>
      <a href="/sitemap.xml">sitemap.xml</a>
    </div>
  </div>
  <div class="wrap footer-legal">
    <p>© ${new Date(TODAY).getFullYear()} AI Disclosure Law. Information only — not legal advice.</p>
    <p>Every page states its verification date and links the primary source.</p>
  </div>
</footer>
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

function pagerHtml(url) {
  const idx = pages.findIndex((p) => p.url === url);
  const prev = pages[idx - 1];
  const next = pages[idx + 1];
  const item = (p, dir) =>
    p
      ? `<a class="pager-link ${dir}" href="${p.url}"><span>${dir === 'prev' ? 'Previous' : 'Next'}</span><strong>${esc(
          p.fm.h1 || p.fm.title
        )}</strong></a>`
      : '<span></span>';
  return item(prev, 'prev') + item(next, 'next');
}

/* -------------------------------------------------------------------- home */

function homeHtml() {
  const cards = pages
    .filter((p) => p.url !== '/')
    .map(
      (p) => `<a class="card" href="${p.url}">
      <div class="card-top"><span class="pill ${statusClass(p.fm.status)}"><span class="dot ${statusClass(
        p.fm.status
      )}"></span>${esc(p.fm.status || '')}</span></div>
      <h3>${esc(p.fm.h1 || p.fm.title)}</h3>
      <p>${esc((p.fm.one_liner || p.fm.meta_description || '').slice(0, 165))}…</p>
      <span class="card-more">Read →</span>
    </a>`
    )
    .join('');

  const rows = [
    ['California', 'SB 942 · AB 2013 · SB 53 · AB 2355', 'In force', 'ok'],
    ['Texas', 'TRAIGA (HB 149)', 'In force', 'ok'],
    ['Illinois', 'HB 3773 · AIVIA', 'In force', 'ok'],
    ['Utah', 'Code ch. 77 · HB 452', 'In force', 'ok'],
    ['Maine', '§1500-DD · 21-A §1014', 'In force', 'ok'],
    ['New York', 'S8420 · GBL §349-A', 'In force', 'ok'],
    ['Colorado', 'SB 26-189 (ADMT Act)', 'Jan 1, 2027', 'warn'],
    ['California', 'AB 2839 · AB 2655', 'Barred by court', 'bad'],
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI Disclosure Law — Which State AI Disclosure Laws Are In Effect</title>
<meta name="description" content="Dated, source-linked reference on US state AI disclosure and transparency law. What is in force, what starts January 1, 2027, and what a court has barred.">
<link rel="canonical" href="${BASE}/">
<meta name="robots" content="index,follow,max-snippet:-1">
<meta name="theme-color" content="#FBFAF7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0B0C0F" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="AI Disclosure Law — Which State AI Disclosure Laws Are In Effect">
<meta property="og:description" content="Dated, source-linked reference on US state AI disclosure obligations.">
<meta property="og:url" content="${BASE}/">
${ogTags('/', 'AI Disclosure Law — Which State AI Disclosure Laws Are In Effect')}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/style.css">
<script type="application/ld+json">
${JSON.stringify(
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: `${BASE}/`,
        name: SITE_NAME,
        description: 'Dated, source-linked reference on US state AI disclosure and transparency law.',
        inLanguage: 'en',
        publisher: { '@id': `${BASE}/#org` },
      },
      { '@type': 'Organization', '@id': `${BASE}/#org`, name: SITE_NAME, url: `${BASE}/` },
      {
        '@type': 'CollectionPage',
        '@id': `${BASE}/#page`,
        url: `${BASE}/`,
        name: 'State AI disclosure law reference',
        isPartOf: { '@id': `${BASE}/#website` },
        dateModified: TODAY,
        hasPart: pages.filter((p) => p.url !== '/').map((p) => ({ '@type': 'Article', url: `${BASE}${p.url}`, headline: p.fm.h1 })),
      },
    ],
  },
  null,
  2
)}
</script>
</head>
<body>
<div class="progress" aria-hidden="true"><span></span></div>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">
      <svg class="brand-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 3 6.5v6c0 5 4 8.4 9 9.5 5-1.1 9-4.5 9-9.5v-6L12 2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.2 12.1l2.6 2.6 5-5.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="brand-text"><strong>AI Disclosure Law</strong><em>verified state obligations</em></span>
    </a>
    <nav class="nav" aria-label="Sections">
      ${NAV.map((n) => `<a href="${n.url}">${n.label}</a>`).join('')}
    </nav>
    <button class="theme" type="button" aria-label="Toggle color theme" data-theme-toggle>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>

<main id="main">
  <section class="hero wrap">
    <p class="eyebrow">State AI disclosure &amp; transparency law</p>
    <h1>Six states can enforce an AI disclosure duty today.<br><span class="hero-dim">Two California laws cannot be enforced at all.</span></h1>
    <p class="hero-lead">Every page here is checked against the enrolled bill text and stamped with a verification date. Most coverage of this area conflates the signing date with the effective date, and does not tell you when a court has struck a law down. This one does.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="/in-effect/">See what is in effect now</a>
      <a class="btn" href="/colorado/">Start with Colorado — its 2024 law never took effect</a>
    </div>
    <dl class="hero-stats">
      <div><dt>States tracked</dt><dd>8</dd></div>
      <div><dt>Statutes covered</dt><dd>24</dd></div>
      <div><dt>Barred by court</dt><dd>2</dd></div>
      <div><dt>Last verified</dt><dd>Nov 8, 2026</dd></div>
    </dl>
  </section>

  <section class="wrap strip-wrap" aria-labelledby="strip-h">
    <h2 id="strip-h" class="section-label">Status at a glance</h2>
    <div class="table-wrap"><table class="md-table strip">
      <thead><tr><th>State</th><th>Law</th><th>Status</th></tr></thead>
      <tbody>
      ${rows
        .map(
          (r) =>
            `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td><span class="pill ${r[3]}"><span class="dot ${r[3]}"></span>${r[2]}</span></td></tr>`
        )
        .join('')}
      </tbody>
    </table></div>
  </section>

  <section class="wrap" aria-labelledby="pages-h">
    <h2 id="pages-h" class="section-label">Every page, verified</h2>
    <div class="card-grid">${cards}</div>
  </section>

  <section class="wrap method" aria-labelledby="method-h">
    <h2 id="method-h">How these pages are built</h2>
    <div class="method-grid">
      <div><span class="num">01</span><h3>Enrolled text first</h3><p>Requirements and penalties are taken from the bill as passed, not from a summary article. Every page links the official source.</p></div>
      <div><span class="num">02</span><h3>Dates are a chain, not a date</h3><p>Signed, effective, phased, delayed, repealed. Colorado's effective date moved twice before the law was replaced outright.</p></div>
      <div><span class="num">03</span><h3>Enforceability is stated</h3><p>If a court has barred a law, the page says so. AB 2839 and AB 2655 are not compliance obligations; they are litigation history.</p></div>
      <div><span class="num">04</span><h3>Verification date on every page</h3><p>Every page carries the date it was last checked against the primary source, so you can tell how stale it is.</p></div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">
      <strong>AI Disclosure Law</strong>
      <p>Independent tracking of US state AI disclosure and transparency obligations, checked against official sources and dated on every page.</p>
    </div>
    <div class="footer-col"><h3>States</h3><a href="/colorado/">Colorado</a><a href="/california/sb-942/">California</a><a href="/texas/traiga/">Texas</a><a href="/in-effect/">In effect now</a></div>
    <div class="footer-col"><h3>Laws</h3><a href="/colorado/sb-26-189/">CO SB 26-189</a><a href="/california/sb-942/">CA SB 942</a><a href="/california/ab-2013/">CA AB 2013</a><a href="/california/sb-53/">CA SB 53</a><a href="/california/ab-2839/">CA AB 2839</a><a href="/texas/traiga/">TX HB 149</a></div>
    <div class="footer-col"><h3>For machines</h3><a href="/llms.txt">llms.txt</a><a href="/llms-full.txt">llms-full.txt</a><a href="/sitemap.xml">sitemap.xml</a></div>
  </div>
  <div class="wrap footer-legal">
    <p>© ${new Date(TODAY).getFullYear()} AI Disclosure Law. Information only — not legal advice.</p>
    <p>Every page states its verification date and links the primary source.</p>
  </div>
</footer>
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------------------- write */

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
// pages
for (const page of pages) {
  const dir = path.join(OUT, page.url.replace(/^\/|\/$/g, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageShell(page), 'utf8');
  // markdown twin for AI crawlers
  fs.copyFileSync(page.file, path.join(dir, 'index.md'));
}

// home
fs.writeFileSync(path.join(OUT, 'index.html'), homeHtml(), 'utf8');

// 404 — Vercel serves this automatically for unmatched paths
fs.writeFileSync(
  path.join(OUT, '404.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found — ${SITE_NAME}</title>
<meta name="robots" content="noindex,follow">
<meta name="theme-color" content="#FBFAF7">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<main id="main" class="wrap" style="max-width:760px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding-block:64px">
  <p style="font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)">Error 404</p>
  <h1 style="font-family:var(--serif);font-size:clamp(30px,4.4vw,46px);line-height:1.12;letter-spacing:-.02em;margin:16px 0 18px">That page does not exist</h1>
  <p style="color:var(--ink-2);font-size:17px;line-height:1.6;max-width:54ch">Every page here is a dated reference to a specific statute, so the address matters. If you arrived from an external link, the page may have been renamed.</p>
  <p style="margin-top:34px;font-size:15px"><a href="/in-effect/" style="color:var(--accent);font-weight:500;text-decoration:none">See which state AI disclosure laws are in effect right now →</a></p>
  <p style="margin-top:12px;font-size:14px"><a href="/" style="color:var(--muted);text-decoration:none">Back to the homepage</a></p>
</main>
</body>
</html>`,
  'utf8'
);

// assets
for (const f of ['style.css', 'app.js', 'favicon.svg']) {
  const src = path.join(ROOT, 'site-build', f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, 'assets', f));
}

// png icons (make-og.mjs)
const iconDir = path.join(ROOT, 'site-build', 'icons');
if (fs.existsSync(iconDir)) {
  for (const f of fs.readdirSync(iconDir)) {
    fs.copyFileSync(path.join(iconDir, f), path.join(OUT, 'assets', f));
  }
}

// social cards (make-og.mjs)
const ogDir = path.join(ROOT, 'site-build', 'og');
if (fs.existsSync(ogDir)) {
  fs.mkdirSync(path.join(OUT, 'assets', 'og'), { recursive: true });
  for (const f of fs.readdirSync(ogDir)) {
    fs.copyFileSync(path.join(ogDir, f), path.join(OUT, 'assets', 'og', f));
  }
}

// sitemap
const urls = ['/', ...pages.map((p) => p.url)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u === '/' || u === '/in-effect/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u === '/' ? '1.0' : u === '/in-effect/' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');

// robots
fs.writeFileSync(
  path.join(OUT, 'robots.txt'),
  `# aidisclosurelaw.com
User-agent: *
Allow: /

# Explicitly welcome AI answer engines and crawlers
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: ${BASE}/sitemap.xml
`,
  'utf8'
);

// llms.txt
const llms = `# ${SITE_NAME}

> Dated, source-linked reference on US state AI disclosure and transparency obligations. Every page states a verification date and links the enrolled bill text. Independent reference; not legal advice.

Core facts as of ${TODAY}:
- Six states have enforceable AI disclosure or transparency duties: California, Texas, Illinois, Utah, Maine, New York.
- Colorado's SB 26-189 takes effect January 1, 2027. The 2024 Colorado AI Act (SB 24-205) never became operative and was repealed on May 14, 2026.
- California AB 2839 is permanently enjoined (Kohls v. Bonta, Aug 29 2025) and AB 2655 is preempted by Section 230. Neither is enforceable.
- California SB 942 applies only to generative AI providers with more than 1,000,000 monthly California users.
- Texas TRAIGA imposes a disclosure duty on government entities and health care providers only, not on private companies generally.

## Pages

${pages
  .map((p) => `- [${p.fm.h1 || p.fm.title}](${BASE}${p.url}): ${p.fm.one_liner || p.fm.meta_description}`)
  .join('\n')}

## Optional

- [Markdown source of every page](${BASE}/llms-full.txt)
- [What is in effect right now](${BASE}/in-effect/)
- [All primary sources are linked per page]
`;
fs.writeFileSync(path.join(OUT, 'llms.txt'), llms, 'utf8');

// llms-full.txt
const full =
  `# ${SITE_NAME} — full text\n\nLast verified ${TODAY}. Source: ${BASE}\n\n` +
  pages
    .map((p) => {
      const md = fs.readFileSync(p.file, 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
      return `\n\n<!-- ${BASE}${p.url} -->\n${md.trim()}`;
    })
    .join('\n');
fs.writeFileSync(path.join(OUT, 'llms-full.txt'), full, 'utf8');

console.log(`Built ${pages.length} pages + home -> ${OUT}`);
for (const p of pages) console.log(`  ${p.url}  (${p.words} words, ${p.faqs.length} FAQs, ${p.toc.length} sections)`);

# AI Disclosure Law

A dated, source-linked reference to US state AI disclosure and transparency obligations — built as a static site so it deploys anywhere and loads fast on mobile.

**Live:** https://aidisclosurelaw.com

---

## What this is

Most pages on this subject are written once from secondary summaries and never revisited. Statutes get amended, effective dates slip, and courts enjoin provisions — so the average guide describes a compliance framework that no longer exists. This site is built around the opposite constraint:

- **Every page carries a verification date** and links the primary source (statute section, bill text, or court docket — not a law-firm blog post).
- **A page is only published when the date has been read in the text**, not in a summary. Anything unverified is left out and said to be left out.
- **The tracker page (`/in-effect/`) is the entry point**: in force, signed but not in force, or barred by a court order.

Current coverage: California (6 laws), Colorado (3), Texas (2), Illinois (4), Utah (2), Maine (3), New York (4) — plus a Colorado-vs-Texas comparison.

## Stack

No framework, no dependencies. A ~1,000-line Node script parses markdown into HTML with its own renderer; headless Chrome generates social cards. `npm install` is not needed and nothing is vendored.

```
site-content/          # source of truth — one markdown file per page
  colorado/index.md
  california/sb-942.md
  ...
site-build/
  build.mjs            # markdown -> site/ (HTML, sitemap, robots, llms.txt)
  make-og.mjs          # 1200x630 social cards + PNG icons (headless Chrome)
  style.css            # design system
  app.js               # theme toggle, reading progress, TOC highlight, copy-cite
  serve.mjs            # local preview server on :8788
  og/                  # generated cards (committed, so CI needs no browser)
  icons/               # generated favicons
site/                  # build output — this is the deploy artifact
vercel.json            # build command, output dir, cache + security headers
```

## Commands

```bash
npm run build     # markdown -> site/
npm run og        # regenerate social cards (needs Chrome/Edge; skips gracefully if absent)
npm run assets    # og + build
npm run dev       # build, then serve http://localhost:8788
```

Set `CHROME_BIN` if Chrome is not in a standard location.

## Adding or editing a page

1. Create `site-content/<state>/<slug>.md` with the frontmatter block (`slug`, `title`, `meta_description`, `h1`, `one_liner`, `status`, `last_verified`, `primary_keyword`, `secondary_keywords`, `sources`).
2. `npm run build`. The page is routed to `site/<slug>/index.html`, gets canonical/OG/JSON-LD, appears in `sitemap.xml`, in `llms.txt`, and gets a markdown twin at `index.md` for AI crawlers.
3. `npm run og` if the headline changed.
4. Commit. Vercel rebuilds on push.

Internal links are written as absolute paths (`/california/sb-942/`). Run the link check before pushing:

```bash
cd site-content
grep -rho "](/[a-z0-9/-]*/)" . | sed 's/^](//;s/)$//' | sort -u > /tmp/links.txt
find . -name "*.md" ! -name "00-*" | sed 's|^\./||;s|\.md$||' \
  | while read p; do case "$p" in */index) echo "/${p%/index}/";; *) echo "/$p/";; esac; done \
  | sort -u > /tmp/pages.txt
echo "dead links:";  comm -23 /tmp/links.txt /tmp/pages.txt
echo "orphans:";     comm -13 /tmp/links.txt /tmp/pages.txt
```

Both lists must be empty.

## Deploy

### Vercel (web import — recommended)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command `npm run build`, output directory `site`, install command can stay empty (there are no dependencies). `vercel.json` already declares all of this, so the import screen should pre-fill correctly.
4. Deploy. Every push to `main` ships automatically; pull requests get preview URLs.

### Vercel (CLI)

```bash
npx vercel --prod
```

### Custom domain on Cloudflare DNS

Point `aidisclosurelaw.com` at Vercel in this order — doing it out of order produces a `DEPLOYMENT_NOT_FOUND` / 525 error loop:

1. Vercel → Project → Settings → Domains → add `aidisclosurelaw.com` and `www`. Vercel shows the required A record and TXT record.
2. In Cloudflare DNS, set the A record **grey-clouded (DNS only)** to `76.76.21.21`, and add the `_vercel` TXT record Vercel gives you.
3. Wait for Vercel to show **Valid Configuration**.
4. Only then switch the A record to **proxied (orange cloud)**. Vercel → SSL → set to **Full (strict)**.

Anything else (Cloudflare Pages, Netlify, plain nginx) works too — `site/` is a folder of static files with no server-side requirement.

## Content rules

- **A date must be read in the statute text before it is published.** Effective dates get amended; the Colorado act was repealed and replaced before it ever took effect, and two California election laws are enjoined. If secondary sources disagree, the page says so instead of picking one.
- **Cite the section, not the homepage.** `leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=...&sectionNum=...` and CourtListener dockets, not landing pages.
- **Update `last_verified` on every substantive edit.** It appears in the visible page, the JSON-LD `dateModified`, and `llms.txt`.
- **Do not list a jurisdiction you have not verified.** A single unverified row in the tracker costs more trust than the coverage adds.

## Notes on the legal content

Informational only, not legal advice. Statutes change and litigation status changes; the pages say so and tell the reader which docket or agency to check before relying on them.

---

### 中文速览

静态站，零依赖：Markdown 写正文 → `npm run build` 生成 `site/` → 推 GitHub → Vercel 自动部署。

- 改内容只动 `site-content/` 下的 md，不要手改 `site/`。
- 每次改完跑 `npm run build`，再按上面的内链脚本检查死链。
- 域名走 Cloudflare 时，A 记录必须**先灰云加 Vercel 的 IP 和 TXT、等 Vercel 显示 Valid 后再开橙云**，顺序反了会一直 525 或 DEPLOYMENT_NOT_FOUND。

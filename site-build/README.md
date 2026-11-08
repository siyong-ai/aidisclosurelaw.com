# site-build — 构建说明

把 `site-content/*.md` 编译成静态站 `site/`。零依赖，只有 Node 内置模块。

## 命令

```bash
npm run build     # 构建（会清空并重建 site/）
npm run og        # 重生成社交分享图与图标（需要本机有 Chrome/Edge，没有则跳过）
npm run assets    # og + build
npm run dev       # 构建后起本地预览 http://localhost:8788
```

改文案 → 只动 `site-content/` 的 md，不要手改 `site/`（每次构建会覆盖）。

## 目录

```
site-content/            源文件（写这个）
  colorado/index.md        -> /colorado/
  colorado/sb-26-189.md    -> /colorado/sb-26-189/
  ...
site-build/
  build.mjs              解析 md + 套模板 + 生成 sitemap/robots/llms
  make-og.mjs            用无头 Chrome 渲染 1200x630 分享图与 PNG 图标
  style.css              设计系统（全部样式）
  app.js                 主题切换、阅读进度、目录高亮、复制引用
  favicon.svg
  og/                    生成的分享图（已提交，CI 不需要浏览器）
  icons/                 生成的 favicon / apple-touch-icon
site/                    产物（部署这个目录）
vercel.json              构建命令、输出目录、缓存与安全响应头
```

## Front matter 字段

```yaml
slug                # 只作文档用途，实际路径由文件位置决定
title               # <title> 与 OG 标题
meta_description    # ≤155 字符，必须含硬信息（日期/罚则）
h1                  # 页面大标题
one_liner           # 首屏答案，也写进 JSON-LD 的 abstract 和 llms.txt
status              # In force / Not yet in force / Not enforceable / Comparison / Tracker
last_verified       # 全站统一，渲染成可见的时间戳
primary_keyword     # 一页一个
secondary_keywords  # 数组
sources             # 数组，每项 label + url
```

`status` 决定状态徽章颜色：含 `not yet` → 琥珀；含 `not enforceable` / `barred` → 红；`in force` 开头 → 绿。

## 已实现的 SEO

- 每页独立 `title` / `meta description` / `canonical`
- 每页独立的 1200×630 Open Graph 图（`og:image` + `twitter:image` + `ImageObject`）
- `robots` 显式允许大片段与放大图（`max-snippet:-1`, `max-image-preview:large`）
- Open Graph + Twitter Card 全套
- JSON-LD `@graph`：`WebSite` + `Organization` + `Article` + `WebPage` + `BreadcrumbList` + `FAQPage`
  - 法案页额外挂 `Legislation` 节点（`legislationIdentifier` / `legislationJurisdiction` / `legislationDate`）
  - `Article.citation` 自动由 front matter 的 `sources` 生成
- 语义化结构：单一 `h1`、`h2` 带锚点、表格用真 `<table>`、FAQ 用原生 `<details>`
- `sitemap.xml`（首页周更、`/in-effect/` 周更、其余月更）
- `robots.txt` 单独放行 GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot / Google-Extended / Applebot-Extended / CCBot
- 内链全部为描述性锚文本，无 `点击这里`

## 已实现的 GEO（面向 AI 搜索）

| 手段 | 位置 | 为什么 |
|---|---|---|
| `llms.txt` | `/llms.txt` | 给 AI 爬虫一份站点索引，开头直接列 5 条可引用事实 |
| `llms-full.txt` | `/llms-full.txt` | 全站正文纯文本，便于整站被读取 |
| Markdown 影子页 | 每页旁 `index.md` + `rel="alternate" type="text/markdown"` | 给 AI 一个无模板噪声的版本 |
| `speakable` 规范 | JSON-LD，指向 `.short-answer` | 语音助手与 AI 摘要优先取这一段 |
| 答案前置 | 首屏 `.short-answer` 卡 | AI 摘要倾向于抽取结论句 |
| 原子事实清单 | `llms.txt` 的 Core facts | 短句、带日期、可整段引用 |
| 核对日期 | 可见 + `dateModified` | 时效性是这个领域唯一的护城河 |
| 出处内联 | 每页 Primary sources + `citation` | 提高被引概率，降低被判"无来源" |

## 新增一页的步骤

1. 在 `site-content/` 下建目录与 md，照抄现有 front matter 结构。
2. 正文第一段必须是 `> **Short answer.** ...`（会被渲染成首屏答案卡，并进 speakable）。
3. FAQ 用 `## Frequently asked questions` 作 h2，问句单独一行 `**问题?**`，答案紧接下一行。
4. 结尾放 `**Related:**` 一行内链、`*Last verified ...*` 一行。
5. 若该页是某个具体法案，在 `build.mjs` 的 `LEGISLATION` 映射里加一条，才会生成 `Legislation` 结构化数据。
6. 跑 `node site-build/build.mjs`。

## 部署

推 GitHub，Vercel 导入即自动部署：`vercel.json` 已声明 `buildCommand: npm run build`、`outputDirectory: site`，无需在控制台改设置。

`BASE` 目前是 `https://aidisclosurelaw.com`，换域名时只改 `build.mjs` 顶部这一处，canonical / sitemap / llms.txt / OG 图 URL 会一起更新。

## 换域名或加语言时的注意点

- `BASE` 改一处即可，但已提交的 `og/*.png` 底部印着旧域名 → 必须重跑 `npm run og`。
- 新增语言时不要复制目录，会让 canonical 互相冲突；应使用 `hreflang` 与独立路径前缀。

## 待办

- [x] 加州各页 `sources` 换成法典章节与判例 docket 深链
- [x] `/in-effect/` 康涅狄格改为「不列并说明原因」，不再挂着未核实日期
- [x] favicon 位图 + 1200×630 OG 分享图
- [ ] 第二批页面：伊利诺伊 HB 3773、犹他、缅因 chatbot、纽约 synthetic performer
- [ ] 缅因 LD 517 的章节号（P.L. 2025 ch. 593 还是 2026 ch. 593）核实后再发 `/maine/political-ads/`

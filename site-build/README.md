# site-build — 构建说明

把 `site-content/*.md` 编译成静态站 `site/`。零依赖，只有 Node 内置模块。

## 命令

```bash
node site-build/build.mjs     # 构建（会清空并重建 site/）
node site-build/serve.mjs     # 本地预览 http://localhost:8788
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
  style.css              设计系统（全部样式）
  app.js                 主题切换、阅读进度、目录高亮、复制引用
  favicon.svg
site/                    产物（部署这个目录）
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

`site/` 是纯静态目录，直接丢到 Cloudflare Pages / Vercel / Netlify 即可，无需构建命令。

上线后要做的一件事：把 `build.mjs` 顶部的 `BASE` 换成正式域名，否则 canonical、sitemap、llms.txt 里的链接全是旧域名。

## 已知待办

- [ ] 加州各页 `sources` 里是 leginfo 首页级链接，需换成带具体 `bill_id` 的深链
- [ ] `/in-effect/` 康涅狄格一行标了 Pending verification，核完 `cga.ct.gov` 的 PA 26-15 原文前不要上线该行
- [ ] 站点尚无真实 favicon 位图与 OG 分享图（1200×630），社交分享会是纯文字卡

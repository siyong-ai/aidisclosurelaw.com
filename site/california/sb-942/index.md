---
slug: /california/sb-942/
title: "California AI Transparency Act (SB 942): Who It Actually Covers"
meta_description: "California SB 942 applies to generative AI providers with over 1 million monthly users, not to every business using AI. Detection tool and watermarking duties began August 2, 2026."
h1: "California AI Transparency Act (SB 942 + AB 853): Who It Actually Covers"
one_liner: "SB 942 requires generative AI providers with more than 1 million monthly users in California to embed provenance data in AI-generated images, video, and audio, and to offer a free public detection tool. The core duties took effect August 2, 2026 — and they do not apply to most businesses that merely use AI."
status: "In force"
last_verified: "2026-11-08"
primary_keyword: "california ai transparency act"
secondary_keywords:
  - "sb 942"
  - "sb 942 requirements"
  - "ab 853"
  - "california ai watermark law"
  - "california ai disclosure law"
sources:
  - label: "Cal. Bus. & Prof. Code §22757 — California AI Transparency Act (operative text)"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22757"
  - label: "SB 942 (2023–2024), Chapter 291 — full text and history"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB942"
  - label: "AB 853 (2023–2024) — amending act (catastrophic risk, capture devices, free detection tool)"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB853"
---

# California AI Transparency Act (SB 942 + AB 853): Who It Actually Covers

> **Short answer.** SB 942, as amended by AB 853, requires **covered providers** — operators of a publicly accessible generative AI system with **more than 1,000,000 monthly visitors or users** available in California — to embed provenance data in AI-generated images, video, and audio and to offer a **free public detection tool**. Core duties became operative **August 2, 2026**. If you are a brand, agency, or ordinary business using AI tools, this law does **not** impose a labeling duty on you.

That last sentence is where most coverage goes wrong. Read the scope section before you build a compliance program.

---

## Scope: the 1 million user threshold is the whole law

A **covered provider** is a person that produces a publicly accessible generative AI system with more than one million monthly visitors or users and makes it available within California.

Nationally, that captures a very small number of companies. It is a platform-level law, aimed at the model and tool providers — the Fireflys and DALL-Es — not at the companies that consume their output.

**Excluded entirely:** products and services that provide exclusively non-user-generated video game, television, streaming, movie, or interactive experiences.

---

## The four duties

### 1. Free public detection tool

Covered providers must make available, at no cost, a tool that lets users assess whether covered media was created or altered by the provider's system. The tool must:

- output **system-provenance data** without exposing personal-provenance data,
- be publicly accessible, subject to reasonable security limitations,
- support **uploads or links** to online content.

### 2. Optional visible disclosure

Providers must offer users the option to include a clear, conspicuous **manifest disclosure** identifying the content as AI-generated. This is user-facing and optional — not a mandate to label everything.

### 3. Mandatory latent disclosure

Covered providers must include a **latent disclosure** in AI-generated media that conveys provenance information, where technically feasible and reasonable. In practice this means C2PA-compatible provenance metadata embedded in the file.

Note the asymmetry: the mandatory latent disclosure attaches to content the system **creates**. The detection tool and the optional label are triggered by content "created **or altered**" by the system — and "altered" is undefined in the statute.

### 4. The 96-hour licensee rule

If a covered provider learns that a third-party licensee modified its system to defeat the required disclosures, it must seek compliance or **revoke the license within 96 hours**. The licensee must stop using the system after revocation.

---

## Timeline: the date moved once, and two phases are still coming

| Date | Event |
|---|---|
| September 19, 2024 | SB 942 signed as Chapter 291 |
| October 13, 2025 | AB 853 signed — amends the chapter, adds duties for large online platforms, GenAI hosting platforms, and capture-device manufacturers |
| **August 2, 2026** | **Core duties operative** — detection tool, latent disclosure, optional manifest disclosure. Delayed from January 1, 2026 by AB 853, to align with EU AI Act Article 50. |
| January 1, 2027 | Large online platform and GenAI hosting platform provisions operative |
| January 1, 2028 | Capture-device duties begin, for devices first produced for sale in California on or after that date |

---

## Penalties

Civil penalties of **$5,000 per violation**, and **each day of noncompliance is a separate violation.** Enforcement by the California Attorney General, city attorneys, and county counsel. The statute also authorizes injunctive relief and attorney's fees for specified violations by third-party licensees.

---

## The advertiser gap nobody explains

If you are a brand or agency, the honest answer is: this law gives you no direct obligation and no direct penalty. The latent metadata is embedded automatically by the platform. The consumer-facing visible label is optional. There is no provision penalizing a brand for omitting a label.

That does not mean you are in the clear. Three things still reach you:

- **The IAB's August 2026 transparency framework** treats a materiality-based disclosure decision as the advertiser's independent obligation, regardless of what platform tooling does or does not apply.
- **EU AI Act Article 50** applies to advertisers as *deployers* of AI systems, from August 2, 2026, and requires deepfake disclosure. If you advertise into the EU, that is your binding rule, not SB 942.
- **Sector rules and the FTC** on deceptive advertising continue to apply to the claim itself.

And there is a real ambiguity: a brand that uses a covered tool to adjust lighting, swap a background, or enhance audio has technically "altered" content under the statute. Whether that triggers any obligation is unresolved. Document your materiality call per asset and you have a defensible position either way.

---

## Checklist

**If you operate a covered provider:**
- [ ] Confirm whether you cross 1,000,000 monthly California visitors or users — measure California, not global
- [ ] Ship the free detection tool with upload and link support
- [ ] Embed C2PA-compatible latent provenance in generated image, video, and audio
- [ ] Offer the optional manifest disclosure in the product UI
- [ ] Write the 96-hour licensee remediation-or-revocation procedure, with a clock and an owner
- [ ] Put the 2027 hosting-platform provisions on the roadmap now

**If you consume generative AI output:**
- [ ] Stop describing SB 942 as a duty on your business
- [ ] Adopt a per-asset materiality test for whether the AI involvement is disclosed
- [ ] If you advertise into the EU, comply with Article 50 instead — the obligation is yours there
- [ ] Keep the record of the call, not just the call

---

## Frequently asked questions

**Does SB 942 require me to label AI-generated content?**
Not unless you are a covered provider with over 1 million monthly California users. The visible label is optional for users of those systems; the latent metadata is mandatory for the provider.

**When did SB 942 take effect?**
Core duties became operative August 2, 2026. AB 853 delayed the date from January 1, 2026 to align with the EU AI Act. Two further phases start January 1, 2027 and January 1, 2028.

**What is the penalty for non-compliance?**
$5,000 per violation, with each day of noncompliance counted as a separate violation. The Attorney General, city attorneys, and county counsel can all enforce.

**Does this apply to video games?**
Products and services that exclusively provide non-user-generated video game, television, streaming, movie, or interactive experiences are excluded.

**Is this the same as AB 2013?**
No. AB 2013 is about disclosing training data on your website. SB 942 is about watermarking output and providing a detection tool. → [AB 2013 explained](/california/ab-2013/)

---

**Related:** [California AB 2013: training data disclosure](/california/ab-2013/) · [California SB 53: frontier model transparency](/california/sb-53/) · [Which laws are in effect right now](/in-effect/)

*Last verified November 8, 2026. General information, not legal advice.*

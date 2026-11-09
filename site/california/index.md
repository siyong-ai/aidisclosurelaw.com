---
slug: /california/
title: "California AI Law (2026): The Four Laws That Actually Exist"
meta_description: "California has no general AI law: three narrow statutes in force (SB 942, SB 53, AB 2013), two election-AI laws barred by courts. Which one binds you?"
h1: "California AI Law: Four Narrow Laws, No General Rule"
one_liner: "California is the most-legislated and least-imposing AI state at once: three narrow, provider-side statutes are in force — SB 942, SB 53, and AB 2013 — none of which puts a disclosure duty on an ordinary business that merely uses AI. Two headline election-AI laws are unenforceable after federal court rulings, and the one election rule that survives predates all of them."
status: "In force (provider-side laws only)"
last_verified: "2026-11-09"
primary_keyword: "california ai law"
secondary_keywords:
  - "california ai law 2026"
  - "california ai disclosure law"
  - "california ai laws"
  - "california ai transparency act"
  - "does california have an ai law"
  - "california ai regulation"
sources:
  - label: "SB 942 (California AI Transparency Act), as amended by AB 853"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB942"
  - label: "SB 53 (Transparency in Frontier Artificial Intelligence Act)"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53"
  - label: "AB 2013 (Generative AI Training Data Transparency Act)"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2013"
  - label: "AB 2839 (Elections: deceptive media) — enjoined"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2839"
  - label: "Cal. Elec. Code §20010 — the election disclosure rule still in force"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=ELEC&sectionNum=20010"
---

# California AI Law: Four Narrow Laws, No General Rule

> **Short answer.** California does **not** have a general AI law that binds every business. It has three narrow, **provider-side** statutes in force — **SB 942** (AI Transparency Act, large generative AI platforms), **SB 53** (frontier developers above 10²⁶ FLOPs), and **AB 2013** (training data disclosure by developers of public generative AI) — plus one election rule that still works, **Elections Code §20010**. The two election-AI laws most cited in the press, **AB 2839** and **AB 2655**, are **barred by federal court order** and cannot be enforced against anyone.

If you searched "california ai law" expecting one statute to comply with, that expectation is the problem. California legislated AI in vertical slices — platforms, frontier labs, training data, elections — and never horizontally. Whether any of it applies to you depends almost entirely on **which side of the AI stack you sit on**.

---

## Who each law actually binds

| Law | In force? | Who it binds | Who it ignores |
|---|---|---|---|
| [SB 942 + AB 853](/california/sb-942/) — AI Transparency Act | Yes, since **Aug 2, 2026** | Generative AI providers with **> 1,000,000 monthly visitors or users** in California | Brands, agencies, and businesses that merely *use* AI tools |
| [SB 53](/california/sb-53/) — Frontier AI Transparency Act | Yes, since **Jan 1, 2026** | Developers training models above **10²⁶ FLOPs** | Everyone else; no developer duty below the compute threshold |
| [AB 2013](/california/ab-2013/) — Training Data Transparency Act | Yes, since **Jan 1, 2026** | Developers of publicly available generative AI (systems released or substantially updated on/after Jan 1, 2022) | Deployers and business users; also carries **no stated penalty** |
| [AB 2839](/california/ab-2839/) — election deepfakes | **No — permanently enjoined** | Nobody. Barred since Aug 29, 2025 (*Kohls v. Bonta*), unappealed | — |
| AB 2655 — Defending Democracy from Deepfake Deception Act | **No — preempted by §230** | Nobody, as to interactive computer services. Barred since Aug 20, 2025 | — |
| Cal. Elec. Code **§20010** | Yes, through **Dec 31, 2030** | Anyone distributing manipulated candidate media within **60 days of an election** | Everything outside the 60-day election window |

Read the first three rows again with one question in mind: *do I provide a generative AI system to the public, or do I just use one?* If you use one — and nearly every business reading this does — none of the three in-force statutes imposes a disclosure duty on you.

---

## The platform law: SB 942, the "California AI Transparency Act"

SB 942 is the law most people picture when they say "California AI law," and it is the one most coverage gets wrong. It requires **covered providers** — operators of a publicly accessible generative AI system with more than **one million monthly visitors or users** available in California — to:

1. offer a **free public detection tool** that reports whether content was created or altered by the provider's system,
2. give users an **optional visible disclosure** ("manifest disclosure") marking AI-generated content,
3. embed a **mandatory latent disclosure** (provenance metadata, in practice C2PA) in media the system creates, where technically feasible,
4. **revoke licenses within 96 hours** if a licensee strips those disclosures out.

Core duties became operative **August 2, 2026** — a date that itself moved once, which is why older guides print 2025. Penalties run to **$5,000 per violation, per day**.

The threshold is the whole law. It captures a handful of national platforms and excludes essentially everyone else. A marketing team labeling AI output in its ads may be complying with a *platform policy*; it is not complying with SB 942, because SB 942 never asked it to. → [Full breakdown](/california/sb-942/)

---

## The frontier law: SB 53

SB 53 regulates by compute, not by use case. If you train a model above **10²⁶ integer or floating-point operations**, you must publish a **transparency report** before releasing it and report **critical safety incidents** to Cal OES within **15 days**. Developers above **$500 million in annual revenue** must also publish a safety framework, and penalties reach **$1,000,000 per violation**.

In force since **January 1, 2026**. Unless you run a frontier training run, this is not your law — and no amount of "AI compliance readiness" spending by mid-market companies changes that. → [Full breakdown](/california/sb-53/)

---

## The data law: AB 2013

AB 2013 requires **developers** of publicly available generative AI systems to post a high-level summary of their **training data** — sources, ownership, volume, whether it contains copyrighted or personal information, whether synthetic data was used — for systems first released or substantially updated on or after **January 1, 2022**.

It names **no enforcement agency and no penalty**, which is not the same as having no consequence: the posting requirement is proving useful in copyright litigation as an admission of what a developer trained on, and the statute's status is itself in motion at the Ninth Circuit. In force since **January 1, 2026**. → [Full breakdown](/california/ab-2013/)

---

## The election laws: two dead, one alive

The most-cited "California AI law" of 2024–2025 is the one that no longer exists as enforceable law:

- **AB 2839** was **permanently enjoined on August 29, 2025** in *Kohls v. Bonta* as a First Amendment violation. California did not appeal.
- **AB 2655** was **held preempted by Section 230** on August 20, 2025, and a stipulated order bars enforcement against every interactive computer service. The appeal (No. 25-6138) has no argument date.

What California can still enforce is **Elections Code §20010**, a pre-AI rule updated for the era: anyone distributing materially deceptive audio or visual media of a candidate within **60 days of an election** must carry a clear disclosure, and the depicted candidate can sue for damages and attorney's fees. It runs through **December 31, 2030**. If a compliance guide tells you how to "comply with AB 2839," it is describing a law a federal court barred. → [What still applies](/california/ab-2839/)

---

## What California does *not* have

This is the part worth checking against your compliance checklist, because several vendors now sell "California AI disclosure" modules for duties that do not exist:

- **No general chatbot disclosure duty** — that is Maine's law (10 M.R.S. §1500-DD) and Colorado's pending Chatbot Safety Act. → [Maine](/maine/chatbot-disclosure/)
- **No pre-decision notice duty for businesses using AI to make decisions** — that is Colorado's SB 26-189, from January 1, 2027, and Illinois' notice duty in employment, in force now. → [Colorado](/colorado/) · [Illinois HB 3773](/illinois/hb-3773/)
- **No duty for ordinary advertisers to label AI-generated humans in ads** — that is New York's GBL §296-b, in force since June 9, 2026. → [New York](/new-york/synthetic-performer/)
- **No private right of action** under SB 942, SB 53, or AB 2013 for business-side conduct.

California may yet pass a broad law; nothing in force today reads on an ordinary business's use of AI.

---

## The routing table

| You are… | The California law that binds you |
|---|---|
| A business using ChatGPT, Midjourney, or an AI feature in SaaS | None of the three. No California disclosure duty attaches to you. |
| A provider of a public generative AI system with 1M+ monthly users | [SB 942](/california/sb-942/) — detection tool, latent disclosure, 96-hour licensee rule |
| A developer training above 10²⁶ FLOPs | [SB 53](/california/sb-53/) — transparency report, 15-day incident reporting |
| A developer of public generative AI | [AB 2013](/california/ab-2013/) — training data summary on your website |
| Running ads with manipulated candidate media inside 60 days of an election | [Elec. Code §20010](/california/ab-2839/) — disclosure, damages, attorney's fees |
| A platform hosting user-generated election content | No enforceable state duty — AB 2655 is barred |

---

## Frequently asked questions

**Is there a California AI disclosure law?**
Yes, but probably not the one you mean. SB 942 is the disclosure law, and it binds large generative AI providers, not businesses that use AI. If you are looking for a duty to tell *your* customers when they are talking to AI or seeing AI-made decisions, California does not impose one; Maine, Illinois, Colorado, and New York do, in their specific domains.

**What is the California AI Transparency Act?**
SB 942, amended by AB 853. Covered providers — publicly accessible generative AI systems with more than 1 million monthly visitors or users in California — must offer a free detection tool, embed provenance data in generated media, and police licensees. Core duties operative August 2, 2026.

**Which California AI laws are in effect right now?**
Three: SB 942, SB 53, and AB 2013, all provider- or developer-side. AB 2839 and AB 2655 are barred by court order. Elections Code §20010 is in force through December 31, 2030.

**Does SB 942 apply to my company?**
Only if you operate a publicly accessible generative AI system with more than 1,000,000 monthly visitors or users available in California. If you are integrating someone else's model, you are not a covered provider.

**Can I be sued under California's AI laws?**
Not as a business user. SB 942 is enforced by the Attorney General, city attorneys, and county counsel; SB 53 carries civil penalties enforced by the state; AB 2013 names no enforcer; and the election laws that created private causes of action against platforms are enjoined or preempted. The live private-action exposure is §20010, and only inside the 60-day pre-election window.

**Is California going to pass a broader AI law?**
Several bills have been attempted and either failed or were vetoed in their broad forms. Track the state's actual output, not predictions — this site updates each law's page when the statute or a court changes it.

---

**Next:** [SB 942 explained](/california/sb-942/) · [SB 53 explained](/california/sb-53/) · [AB 2013 explained](/california/ab-2013/) · [What still applies after AB 2839 died](/california/ab-2839/) · [Which state AI disclosure laws are in effect right now](/in-effect/)

*Last verified November 9, 2026. This page is general information, not legal advice. Statutes change; confirm against the official text linked above and a qualified attorney in your state.*

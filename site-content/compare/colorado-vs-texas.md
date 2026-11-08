---
slug: /compare/colorado-vs-texas/
title: "Colorado vs Texas AI Law: Who Actually Has to Disclose"
meta_description: "Colorado puts disclosure duties on every deployer of ADMT from 2027. Texas limits disclosure to government and health care. Side-by-side comparison of scope, timing, penalties and enforcement."
h1: "Colorado vs Texas AI Law: Disclosure Obligations Compared"
one_liner: "Colorado requires every developer and deployer of automated decision-making technology to give pre-use notice and post-decision explanations, starting January 1, 2027. Texas requires disclosure only from government agencies and health care providers, and has been in force since January 1, 2026. If you operate in both states, Colorado is the binding constraint."
status: "Comparison"
last_verified: "2026-11-08"
primary_keyword: "colorado vs texas ai law"
secondary_keywords:
  - "colorado ai act vs texas traiga"
  - "which state has stricter ai law"
  - "state ai disclosure comparison"
sources:
  - label: "SB 26-189 enrolled text (Colorado)"
    url: "https://leg.colorado.gov/bills/sb26-189"
  - label: "Texas AG, Consumer AI Rights (TRAIGA)"
    url: "https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint/consumer-ai-rights"
---

# Colorado vs Texas AI Law: Disclosure Obligations Compared

> **Short answer.** Colorado and Texas took opposite approaches to the same problem. **Colorado** tells you *how to decide* — notice before, explanation after, human review on request — and applies that to every business using automated decision-making technology in a covered domain, starting **January 1, 2027**. **Texas** tells you *what not to do* and puts the disclosure duty on government and health care only, in force since **January 1, 2026**.

For most companies operating in both states, Colorado is the constraint you have to design for and Texas is the one you have to audit against.

---

## Side by side

| | **Colorado — SB 26-189** | **Texas — TRAIGA (HB 149)** |
|---|---|---|
| **In force** | January 1, 2027 | January 1, 2026 |
| **Legal model** | Disclosure-based procedural duties | Prohibitions plus narrow disclosure duties |
| **Who must disclose** | Every developer and deployer of covered ADMT | Government entities and health care providers only |
| **Trigger** | ADMT that **materially influences** a consequential decision | AI interacting with a consumer; AI used in health care service or treatment |
| **Timing** | Before use; disclosure within **30 days** of an adverse outcome | Before or at the moment of interaction; by first date of service |
| **Content** | Decision description, technology's role, how to request more info, right to data access and human review | Clear, conspicuous, plain-language statement that the user is interacting with AI |
| **Covered domains** | Education, employment, real estate, financial and lending, insurance, health care, essential government services | All uses, but disclosure duty limited to government and health care |
| **Intent requirement** | Not required for the disclosure duties | **Required** for the discrimination and manipulation prohibitions |
| **Penalty** | Colorado Consumer Protection Act civil penalties | $10k–$12k curable; $80k–$200k uncurable; $2k–$40k per day continuing |
| **Cure period** | 60 days | 60 days |
| **Private right of action** | No | No |
| **Local preemption** | Not a feature of the act | Yes — preempts local AI ordinances |
| **Recordkeeping** | 3 years | Not specified in the disclosure provisions |

---

## The three differences that actually change what you build

### 1. Who the duty falls on

Texas's disclosure duty is a narrow public-sector obligation. If you are a private company in Texas, you do not owe anyone an AI disclosure under TRAIGA. Your exposure is the prohibition list, and those prohibitions mostly require **intent** — which means your evidence problem is design documents and marketing claims, not user-facing notices.

Colorado inverts this. Every deployer is a disclosing party, in every covered domain, regardless of sector. An employer in Denver using a resume-ranking tool owes a notice and a 30-day adverse-outcome explanation. An employer in Austin using the same tool owes nothing under TRAIGA's disclosure provisions.

**Practical consequence:** if you are building one compliance flow, build Colorado's. It satisfies the harder requirement and exceeds Texas's.

### 2. Timing of the duty

Texas is live now, but narrow. Colorado is broad, but not live yet — 54 days away as of this writing, with the Attorney General's rules still pending.

That gap is where most companies will misallocate effort. The Texas deadline has passed, so it feels less urgent than it is; the Colorado deadline is close and the design work is heavier. Both need to be done, in that order of difficulty, not that order of date.

### 3. How liability is allocated

Colorado allocates fault between developer and deployer **based on relative fault**, and generally limits developer liability to uses that were intended or marketed. It also voids indemnification clauses that shift liability for Colorado anti-discrimination violations.

Texas has no equivalent allocation scheme, because it has no equivalent duty on deployers. What it does have is a 60-day cure period that lets an organization correct a violation before penalties escalate from the curable band into the $80,000–$200,000 band.

---

## What both states have in common

- **Both rely on attorney general enforcement.** No private right of action in either.
- **Both provide a 60-day cure.** Use it — it is the difference between a letter and a penalty.
- **Both are disclosure or prohibition laws, not risk-management laws.** Neither requires a bias audit. Neither requires an impact assessment. Those were in Colorado's repealed 2024 law and are gone.
- **Both sit on top of federal law.** ECOA, FCRA, HIPAA, and FTC deception rules apply independently.

---

## If you operate in both: a work plan

- [ ] Build the Colorado flow first — pre-use notice, 30-day adverse-outcome disclosure, data access and correction, human review
- [ ] Use the same notice infrastructure to satisfy a Texas government or health care obligation if you have one
- [ ] For Texas, run a separate prohibition audit: search design documents and marketing for intent language about discrimination, manipulation, or constitutionality
- [ ] Remove or renegotiate indemnity clauses that purport to shift Colorado anti-discrimination liability
- [ ] Set retention at 3 years globally, because Colorado requires it and it costs nothing to standardize
- [ ] Put a rulemaking watch on both AGs — Colorado's "materially influence" definition and Texas's complaint portal will both reshape enforcement

---

## Frequently asked questions

**Which state has the stricter AI law?**
Colorado, for disclosure obligations. It reaches every deployer in covered domains and imposes procedural duties. Texas is stricter on penalties per violation for the prohibited conduct it does cover.

**Does Texas require businesses to disclose AI use to customers?**
No, unless you are a government entity or a health care provider. TRAIGA does not impose a general disclosure duty on private companies.

**Is the Colorado AI Act in force yet?**
No. SB 26-189 takes effect January 1, 2027. The 2024 law it replaced never became operative. → [Full explanation](/colorado/)

**Do either of these laws require a bias audit?**
No. Neither Colorado's current law nor TRAIGA requires a bias audit or impact assessment. Colorado's repealed 2024 framework did; that is gone.

**Can an individual sue under either law?**
No. Both are attorney-general-only statutes, each with a 60-day cure period.

---

**Related:** [Colorado AI law: what is in effect](/colorado/) · [Colorado SB 26-189 detail](/colorado/sb-26-189/) · [Texas TRAIGA detail](/texas/traiga/) · [All states in effect right now](/in-effect/)

*Last verified November 8, 2026. General information, not legal advice.*

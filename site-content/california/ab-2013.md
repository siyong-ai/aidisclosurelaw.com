---
slug: /california/ab-2013/
title: "California AB 2013: Training Data Disclosure Requirements"
meta_description: "AB 2013 requires developers of public generative AI to post a training data summary. Effective January 1, 2026; no stated penalty."
h1: "California AB 2013: Training Data Disclosure Requirements"
one_liner: "Since January 1, 2026, developers of publicly available generative AI systems must post a high-level summary of their training data on their website — sources, ownership, volume, whether it includes copyrighted or personal information, and whether synthetic data was used. The statute specifies no penalty and no enforcement agency."
status: "In force, under appeal"
last_verified: "2026-11-08"
primary_keyword: "california ab 2013"
secondary_keywords:
  - "ab 2013 training data disclosure"
  - "generative ai training data transparency act"
  - "california training data disclosure requirements"
  - "ab 2013 requirements"
sources:
  - label: "Cal. Bus. & Prof. Code §3111 — Generative AI Training Data Transparency Act (operative text)"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=3111"
  - label: "AB 2013 (2023–2024) — full text and history"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2013"
---

# California AB 2013: Training Data Disclosure Requirements

> **Short answer.** AB 2013, the Generative AI Training Data Transparency Act, has required since **January 1, 2026** that developers of publicly available generative AI systems publish a **high-level summary of their training data** on their website. It applies to systems first released or substantially updated on or after **January 1, 2022**. The statute names **no enforcement agency and no penalty** — which is not the same as having no consequence.

---

## Who has to publish

Any developer that designs, codes, produces, or substantially modifies a generative AI system for public use in California.

Two thresholds do the real work:

- **System timing.** Covered systems are those first released or substantially updated **on or after January 1, 2022**. Older models that have not been substantially updated fall outside.
- **Public availability.** Internal-only systems are not "made available to the public."

**Exempt uses:** cybersecurity, national security, and aircraft operations.

---

## What the summary must disclose

The statute enumerates the required categories. In practice these are the fields that get checked:

| Field | What to write |
|---|---|
| Datasets used | A high-level summary of the datasets |
| Sources and ownership | Where the data came from and who owns it |
| How the data is used | Including how it relates to the system's purpose |
| Data volume | A range or estimate is acceptable — a point value is not required |
| Copyrighted, trademarked, or patented material | Whether the datasets include it |
| Personal information | Whether the datasets contain CCPA-defined personal information |
| Synthetic data | Whether AI-generated data was used in training |
| Collection period | The time period over which data was collected |

"High-level" is doing a lot of work. The statute does not require you to publish a dataset list, license-by-license. It requires an honest summary of composition. Companies that try to satisfy it with a single vague paragraph are the ones that attract attention.

---

## Timeline, including the litigation

| Date | Event |
|---|---|
| September 28, 2024 | AB 2013 signed |
| **January 1, 2026** | **Effective** |
| March 4, 2026 | Court denies xAI's motion for a preliminary injunction. The court found xAI had shown "a distinct possibility" of success but not a likelihood. |
| **November 18, 2026** | Ninth Circuit hears argument |

The law is enforceable while the appeal proceeds. A denied preliminary injunction is not a stay, and it is not a ruling on the merits.

---

## Penalties: there are none, and that is the point

AB 2013 does not specify an enforcement agency or a penalty amount. This creates two opposite mistakes:

**Mistake one: "no penalty means no risk."** The disclosure is public and permanent on your own website. It is the first thing a copyright plaintiff, a journalist, or a state regulator reads. Publishing a summary that contradicts your own litigation position, or that later turns out to have omitted a category, converts a no-penalty filing into evidence in a different proceeding.

**Mistake two: "we'll publish something generic."** A summary that names no sources and gives no volume range is not a good-faith "high-level summary" of composition. It is the fact pattern that invites a follow-up.

The practical exposure is reputational and evidentiary, not statutory. Price the work accordingly — but do the work.

---

## Checklist

- [ ] Confirm which of your models were first released or substantially updated on or after January 1, 2022
- [ ] For each, assemble the eight fields above — sources, ownership, use, volume, IP content, personal information, synthetic data, collection period
- [ ] Use ranges for volume; a defensible range beats a false precision
- [ ] Route the draft through the same team that handles copyright and privacy positions, so the public summary and the legal position agree
- [ ] Publish it somewhere durable and linkable, not buried in a blog post
- [ ] Date the summary and note when it was last updated
- [ ] Put a review trigger on any substantial model update, since that re-triggers the duty
- [ ] Diary November 18, 2026, and again when the Ninth Circuit rules

---

## Frequently asked questions

**Does AB 2013 apply to me if I fine-tune someone else's model?**
"Substantially modifies" is the test, and the statute does not draw a bright line. Fine-tuning that changes capability materially is the risk zone. Document your reasoning either way.

**Is a range acceptable for dataset size?**
Yes. The statute expressly permits a range or an estimate.

**Do I have to name every dataset?**
No. It requires a high-level summary. It does not require a dataset-by-dataset inventory, but it does require the specified categories to be addressed honestly.

**What happens if I don't comply?**
The statute provides no penalty and no named enforcement agency. Exposure comes through other channels — litigation, regulatory attention, and the credibility of your own public disclosures.

**Is this the same as SB 942?**
No. AB 2013 is about disclosing **training data** on your website. SB 942 is about **watermarking output** and providing a detection tool. → [SB 942 explained](/california/sb-942/)

---

**Related:** [California SB 942: who it covers](/california/sb-942/) · [California SB 53: frontier models](/california/sb-53/) · [Which state laws are in effect now](/in-effect/)

*Last verified November 8, 2026. General information, not legal advice. Litigation status changes; confirm the current docket before relying on this page.*

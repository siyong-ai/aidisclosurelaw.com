---
slug: /california/sb-53/
title: "California SB 53: Frontier Model Transparency Requirements"
meta_description: "SB 53 requires frontier developers to publish transparency reports and report critical safety incidents within 15 days. In force since January 1, 2026, up to $1 million per violation."
h1: "California SB 53: Transparency in Frontier Artificial Intelligence Act"
one_liner: "Since January 1, 2026, anyone training a model above 10^26 FLOPs must publish a transparency report before release and report critical safety incidents to Cal OES within 15 days. Large frontier developers — over $500 million in revenue — must also publish a safety framework and face up to $1 million per violation."
status: "In force"
last_verified: "2026-11-08"
primary_keyword: "california sb 53"
secondary_keywords:
  - "transparency in frontier artificial intelligence act"
  - "sb 53 requirements"
  - "frontier ai framework"
  - "sb 53 penalties"
  - "frontier model 10^26 flops"
sources:
  - label: "Cal. Bus. & Prof. Code §22757.11–22757.15 — frontier developer duties (operative text)"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22757.11"
  - label: "Cal. Lab. Code §1107.1 — whistleblower protections for frontier developers' employees"
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=1107.1"
  - label: "SB 53 (2025–2026) — full text, history, and chaptering"
    url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53"
---

# California SB 53: Transparency in Frontier Artificial Intelligence Act

> **Short answer.** SB 53 took effect **January 1, 2026**. It is not a disclosure law about labeling AI content — it is a safety law about the largest models. A **frontier developer** that has trained or begun training a foundation model above **10^26 integer or floating-point operations** must publish a transparency report before deploying a new or substantially modified model, and report critical safety incidents to Cal OES **within 15 days** (**24 hours** if there is imminent risk of death or serious injury). A **large frontier developer** — over **$500 million** in annual gross revenue — must also publish a frontier AI framework and faces civil penalties up to **$1,000,000 per violation**.

If you searched for "California AI disclosure law" and landed here, check the scope first. This almost certainly does not apply to your company. → [SB 942 is the labeling law](/california/sb-942/)

---

## Two tiers, defined by compute and revenue

| Tier | Definition | Obligations |
|---|---|---|
| **Frontier developer** | Has trained, or begun training, a foundation model using more than 10^26 integer or floating-point operations | Transparency report before deployment; incident reporting; no false or misleading risk statements; whistleblower protections |
| **Large frontier developer** | A frontier developer that, with affiliates, had annual gross revenues above $500,000,000 in the preceding calendar year | Everything above, plus a published frontier AI framework, catastrophic-risk assessment summaries submitted to OES, and expanded whistleblower procedures |

The thresholds are deliberately defined by compute and revenue rather than by naming companies. Coverage expands and contracts automatically as organizations cross either line. That is what makes the law durable — and what makes "we're not a frontier lab" a claim you have to re-verify every year.

---

## What the transparency report must contain

**Every frontier developer**, before deploying a new or substantially modified frontier model:

- Website contact details
- Release date
- Supported languages
- Output modalities
- Intended uses
- Any usage restrictions

**Large frontier developers** must add:

- A summary of the catastrophic-risk assessments performed on the model
- The results of those assessments
- Whether and how third-party evaluators were involved

---

## The frontier AI framework

A large frontier developer must write, implement, and clearly publish a framework on its website describing how it identifies and manages catastrophic risk across the model lifecycle. It has to address:

- Cybersecurity practices around **model weights**
- The thresholds and methodology used to assess catastrophic risk
- Mitigation strategies once a risk is identified
- Use of **third-party evaluators**
- Internal governance and accountability structure for these decisions

Trade secrets and information that would create a security risk can be redacted — but the framework itself must be public.

**It is not a one-time filing.** Developers must review it at least annually and publish any material modification **within 30 days**.

That creates a running public record of how a lab's own stated thresholds and mitigations change over time. It is the most quotable artifact the law produces, and the most likely to be cited back at the company that wrote it.

---

## Incident reporting: the operative duty

| Situation | Deadline | Recipient |
|---|---|---|
| Critical safety incident discovered | **15 days** | California Office of Emergency Services (Cal OES) |
| Imminent risk of death or serious physical injury | **24 hours** | Appropriate law enforcement or public safety authority |

This is the provision most likely to generate an actual enforcement record, because it is binary and time-stamped. Everything else in the law is a publication duty; this one is a clock.

---

## Also prohibited

- Making **materially false or misleading statements** about the catastrophic risks of your models or how those risks are managed
- Taking action against an employee for reporting serious safety risks or legal violations — including policies or contracts that attempt to stop them. Labor Code §1107.1 supplies the whistleblower protection.

---

## Penalties

Civil penalty up to **$1,000,000 per violation** by a large frontier developer, enforced by the California Attorney General.

---

## Checklist

- [ ] Compute your training run against the 10^26 FLOP threshold and document the calculation
- [ ] Track revenue against the $500 million line annually, including affiliates
- [ ] Draft the transparency report template so a new model release does not start from zero
- [ ] Publish the frontier AI framework with each required element addressed by name
- [ ] Put the framework on an annual review calendar and a 30-day modification publication clock
- [ ] Build the 15-day and 24-hour incident paths, with named owners and an out-of-hours route
- [ ] Review all public statements about catastrophic risk for anything you cannot support
- [ ] Confirm whistleblower channels cannot be read as retaliatory, in policy or in contract
- [ ] Diary the corresponding Illinois and New York laws — they are modeled on this one and differ in details

---

## Frequently asked questions

**Does SB 53 apply to companies that fine-tune or deploy models?**
No. It applies to developers that train, or begin training, a foundation model above the compute threshold. Deployers are outside it.

**What is a "critical safety incident"?**
The statute ties the term to catastrophic risk — harm at the scale of mass casualties or catastrophic economic damage. The 24-hour path applies where there is imminent risk of death or serious physical injury.

**Is the framework a one-time publication?**
No. It must be reviewed at least annually, and material modifications published within 30 days.

**What is the maximum penalty?**
Up to $1,000,000 per violation for a large frontier developer, enforced by the Attorney General.

**How is this different from the EU AI Act?**
SB 53 regulates catastrophic risk from the largest models. EU AI Act Article 50 regulates transparency toward users — deepfake disclosure and AI-generated text on matters of public interest. Different obligations, different populations. → [SB 942](/california/sb-942/) is closer to Article 50 in spirit.

---

**Related:** [California SB 942: watermarking and detection](/california/sb-942/) · [AB 2013: training data disclosure](/california/ab-2013/) · [Which state laws are in effect now](/in-effect/)

*Illinois SB 315 is modeled on this law and adds mandatory annual independent third-party audits. It is not covered here yet.*

*Last verified November 8, 2026. General information, not legal advice.*

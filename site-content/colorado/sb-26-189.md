---
slug: /colorado/sb-26-189/
title: "Colorado SB 26-189 (ADMT Act): Disclosure Rules Explained"
meta_description: "SB 26-189 replaced the Colorado AI Act. From January 1, 2027, deployers must give pre-use notice and 30-day adverse-outcome disclosures."
h1: "Colorado SB 26-189: The Automated Decision-Making Technology Act"
one_liner: "From January 1, 2027, if you use automated decision-making technology that materially influences a consequential decision about a Colorado resident, you must tell them before you use it and, within 30 days of an adverse outcome, explain what the technology did and how they can get a human to review it."
status: "Signed, not yet in force"
last_verified: "2026-11-09"
primary_keyword: "colorado sb 26-189"
secondary_keywords:
  - "colorado admt law"
  - "colorado automated decision-making technology act"
  - "sb 26-189 requirements"
  - "colorado ai disclosure requirements"
sources:
  - label: "SB 26-189 enrolled text"
    url: "https://leg.colorado.gov/bills/sb26-189"
  - label: "SB 26-189 fiscal note (first revised, May 6, 2026)"
    url: "https://www.leg.state.co.us/CLICS/CLICS2026A/csl.nsf/0/E698F50044B1BD8587258DC50068D79D/$File/SB189_r1.pdf"
  - label: "Colorado AG pre-rulemaking considerations"
    url: "https://coag.gov/app/uploads/2026/06/2026.6.9-ADMT-Chatbot-Pre-Rulemaking-Considerations-Document.pdf"
---

# Colorado SB 26-189: The Automated Decision-Making Technology Act

> **Short answer.** Signed May 14, 2026, effective **January 1, 2027**. If you develop or deploy automated decision-making technology (ADMT) that **materially influences** a consequential decision about a Colorado resident, you owe them a **pre-use notice** and, within **30 calendar days of an adverse outcome**, a plain-language explanation plus the right to data access, correction, and **meaningful human review**. Records: 3 years. Enforced only by the Attorney General.

It is the law Coloradans mean when they say "the Colorado AI Act." It is not the 2024 law. → [What happened to SB 24-205](/colorado/)

---

## What counts as ADMT

The statute defines ADMT as technology that uses personal information and computation to **predict, classify, rank, score, or otherwise assist** in making a decision or determination about a person in a covered domain.

Two things trip people up:

**It is not limited to AI.** ADMT can include statistical models, rules engines, and scoring systems that predate current LLM tools. If your compliance inventory only lists "AI tools," it is incomplete.

**"Materially influence" is not defined.** The Attorney General has discretionary rulemaking authority to clarify it. Until those rules land, the safest read is that a system materially influences a decision when a human would have decided differently without it. A tool that produces a recommendation the human always follows is in scope; a tool that surfaces background information for a human to weigh is closer to the exclusion.

### Covered domains

- Education enrollment and opportunities
- Employment or employment opportunities
- Real estate transactions
- Financial and lending services
- Insurance and access to benefits
- Health care services
- Essential government services and public benefits

### Explicitly excluded

- Certain cybersecurity and web tools
- Spreadsheets that require human analysis
- Tools that communicate with consumers
- Tools that summarize information intended for future human review
- Scheduling, administrative routing, and workflow management
- Identity verification and other fraud-prevention activities

---

## Developer obligations: documentation you owe your deployers

If the ADMT is marketed or advertised to materially influence a consequential decision, the developer must supply:

| Item | What it has to contain |
|---|---|
| Intended uses | What the system is designed to do, **and known harmful uses** |
| Training data | The categories of data used to train it |
| Limitations | Known limitations, risks, and circumstances in which it should not be used |
| Operating instructions | How the deployer should use it, monitor it, and conduct meaningful human review |
| Deployer compliance support | Information the deployer reasonably needs to meet its own notice and disclosure duties |
| Change notice | Notice of any changes to intended use, limitations, or risk |

Both developers and deployers must **retain records for at least three years** demonstrating compliance.

---

## Deployer obligations: two notices, 30 days apart

### 1. Before the decision

Before using ADMT to materially influence a consequential decision, the deployer must notify the consumer that the decision uses ADMT. The notice must be **accessible to individuals with disabilities and to individuals with limited English proficiency** — build that into the template, not the remediation list.

### 2. After an adverse outcome — within 30 calendar days

The disclosure must contain:

- A description of the consequential decision and **the role the ADMT played** in it
- Instructions for requesting additional information about the ADMT
- An explanation of the consumer's right to request their personal data and to obtain **meaningful human review** of the decision

### 3. Consumer rights this creates

- Request the personal data used in the decision
- Correct factually incorrect data
- Obtain meaningful human review of an adverse decision

---

## Carve-outs that may already cover you

Two narrow safe paths exist, and both depend on other law doing the work:

**Credit and education decisions.** If the decision involves access to credit or relates to education, and you are already subject to federal consumer notice or disclosure requirements, you are treated as compliant with this act's disclosure requirements.

**Certain insurers.** Insurers already complying with Colorado insurance law are exempt from the act's requirements.

Neither carve-out is a blanket exemption. Check whether your specific federal or insurance obligation covers the same disclosure, in the same timeframe, to the same person.

---

## Penalties and enforcement

| Item | Detail |
|---|---|
| Enforcement | Colorado Attorney General, exclusive |
| Legal theory | Deceptive trade practice under the Colorado Consumer Protection Act |
| Cure period | **60 days' notice and cure** required before enforcement, through January 1, 2030 |
| Private right of action | **None** |
| Liability allocation | Between developer and deployer **based on relative fault**; developer liability generally limited to intended or marketed uses |
| Indemnification | Clauses shifting liability for Colorado anti-discrimination violations are **void as against public policy** |
| Current status | **Enforcement stayed** in X. AI LLC v. Weiser (Apr. 27, 2026) — see below |

That last row matters commercially. If your master services agreement has the vendor indemnifying you for discrimination claims arising from their model, that clause is unenforceable in Colorado for covered violations.

**The enforcement stay.** xAI sued the Attorney General on April 9, 2026; the United States intervened as plaintiff-intervenor on April 24. On April 27, the court ordered the AG not to initiate enforcement — including investigations — under SB 24-205 or any legislation replacing it in that session, until 14 days after a ruling on xAI's preliminary-injunction motion. SB 26-189 is the in-session replacement, so the stay reaches it. xAI's PI motion is due within 28 days after final adoption of the implementing rules. The statute is valid and its date is unchanged; only enforcement is suspended.

---

## Is it in force?

Not yet. Signed May 14, 2026. Duties apply from **January 1, 2027**. Rulemaking is nearly done: proposed rules were filed August 11, 2026, a revised interim draft followed October 6, and the rulemaking hearing was held October 26, 2026. Final rules were pending as of November 9, 2026. The draft rules include a presumption that a decision matching a tool's score, ranking, or recommendation was "materially influenced" by it — rebuttable, but read the final text before you lock your notice wording. Enforcement is currently stayed by federal court order; the duties themselves still start on schedule.

---

## Implementation checklist

- [ ] Map every tool that touches a covered decision, not just the ones with "AI" in the name
- [ ] For each, record which covered domain it sits in and what the human would do without it
- [ ] Request the six documentation items from each vendor in writing
- [ ] Draft the pre-use notice in accessible formats and in the languages your population actually reads
- [ ] Build the 30-day clock into your adverse-action workflow — the trigger is the outcome date, not the appeal date
- [ ] Define who performs human review, what they can change, and how the review is logged
- [ ] Remove or renegotiate indemnification clauses that purport to shift anti-discrimination liability
- [ ] Set retention to three years for both documentation and decision records
- [ ] Re-read the AG rules when they publish, particularly the definition of "materially influence"

---

## Frequently asked questions

**Does SB 26-189 apply to employers?**
Yes. Employment is a covered domain, and the act reaches current Colorado employees and job applicants. Routine scheduling, administrative routing, and workflow management are excluded — but a tool that ranks candidates or flags employees for review is not.

**What is the difference between a developer and a deployer?**
A developer develops or substantially modifies the ADMT. A deployer uses it. The documentation duty sits with the developer, the notice and disclosure duties sit with the deployer, and fault is allocated between them.

**Do we still need impact assessments?**
No. SB 26-189 removed the mandatory impact assessment, the annual review, the risk management program, and the 90-day discrimination report. If your program was built around those, it needs reorienting rather than extending.

**What if we only use an off-the-shelf LLM?**
Most public and enterprise AI systems, including LLMs, fall within the definition when they materially influence a covered decision. But not every decision made with AI's help is covered — the test is the decision and the technology's role in it, not the product name.

**Can a consumer sue us?**
Not under this act. Enforcement is exclusively the Attorney General's, with a 60-day cure period.

---

**Related:** [Colorado AI law: what is actually in effect](/colorado/) · [What happened to SB 24-205](/colorado/sb-24-205/) · [Colorado Chatbot Safety Act (HB 26-1263)](/colorado/hb-1263/) · [Colorado vs Texas](/compare/colorado-vs-texas/) · [Texas TRAIGA: who must disclose AI](/texas/traiga/)

*Last verified November 9, 2026. General information, not legal advice. Confirm against the enrolled bill text and the Attorney General's adopted rules.*

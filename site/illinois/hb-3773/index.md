---
slug: /illinois/hb-3773/
title: "Illinois AI Law (HB 3773): Notice Duty, No Rules Behind It"
meta_description: "In force since Jan 1, 2026: using AI in an Illinois employment decision without notice is itself a civil rights violation. IDHR's notice rules were withdrawn."
h1: "Illinois AI Law (HB 3773): The AI Notice Duty With No Rules Behind It"
one_liner: "Since January 1, 2026, Illinois has treated two things as separate civil rights violations: using AI in a way that discriminates in employment, and using AI in an employment decision without telling people. The notice duty does not depend on proving any discriminatory effect — you either told them or you did not. And the rules that were supposed to define what a compliant notice looks like were withdrawn on June 2, 2026 and have not been refiled."
status: "In force since Jan 1, 2026"
last_verified: "2026-11-08"
primary_keyword: "illinois ai law"
secondary_keywords:
  - "illinois hb 3773"
  - "illinois ai notice requirement"
  - "illinois human rights act ai"
  - "775 ilcs 5/2-102(L)"
  - "idhr ai rules withdrawn"
  - "illinois ai employment law"
sources:
  - label: "Public Act 103-0804 (HB 3773 as enacted, full text)"
    url: "https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804"
  - label: "HB 3773 bill status, 103rd General Assembly"
    url: "https://www.ilga.gov/legislation/BillStatus?DocNum=3773&GAID=17&DocTypeID=HB&SessionID=112&GA=103"
  - label: "Illinois Department of Human Rights (rulemaking notices)"
    url: "https://www2.illinois.gov/dhr/"
---

# Illinois AI Law (HB 3773): The AI Notice Duty With No Rules Behind It

> **Short answer.** Signed August 9, 2024, in force since **January 1, 2026**. It creates two separate civil rights violations under the Illinois Human Rights Act: using AI in a covered employment decision **in a way that has a discriminatory effect**, and **failing to notify** people that you used AI for those purposes. The second one is absolute — a model with perfectly even outcomes still violates the Act if nobody was told it was running. The Illinois Department of Human Rights proposed rules defining the notice on **May 15, 2026** and withdrew them on **June 2, 2026**. As of November 2026 they have not been refiled, so the duty is live and its definition is not.

That gap is the whole story of this law, and it is why the page is structured the way it is: what binds today, what the dead draft would have required, and how to build something defensible between the two.

---

## The two violations, kept separate

The operative language sits at **775 ILCS 5/2-102(L)**, inside the Act's list of civil rights violations.

| | What it prohibits | What the regulator has to prove |
|---|---|---|
| **(L)(1)** | Using AI that **has the effect** of discriminating against employees or applicants on a protected basis in recruitment, hiring, promotion, renewal, training or apprenticeship selection, discharge, discipline, tenure, or terms and conditions of employment | That the tool's output produced a discriminatory effect. Intent is irrelevant. |
| **(L)(1), second sentence** | Using **ZIP code as a proxy** for a protected class in those decisions | That the variable was used. Nothing else. |
| **(L)(2)** | **Failing to provide notice** that AI is being used for any of those purposes | That no notice was given. Nothing else. |

Most compliance writing about employment AI is organised around bias auditing, because New York City's Local Law 144 and California's FEHA regulations put the audit at the centre. Illinois did something structurally different: it put an **unconditional transparency obligation** next to an effects-based prohibition.

That difference matters in a courtroom. On (L)(1) you can defend the tool — show the validation study, the adverse-impact ratio, the human override rate. On (L)(2) the only defence is that notice was given. Either the notice exists or the violation is complete.

---

## "AI" here is a function, not a product category

Section 2-101 now defines artificial intelligence as a machine-based system that, for explicit or implicit objectives, **infers from the input it receives how to generate outputs** — predictions, content, recommendations, or decisions — that can influence physical or virtual environments, and states that the term includes generative AI.

Read that literally and it does not require machine learning, a neural network, or the system being the sole or even primary basis for a decision. It requires only that the output be **capable of influencing** one.

Practical consequence: an inventory built from the tools your organisation labels "AI" will miss most of your exposure. What falls in on a functional reading:

- Resume ranking and match scoring inside an applicant tracking system
- Keyword screening that produces a recommendation rather than just a search result
- Chatbot-driven pre-screening and scheduling that sorts candidates
- Video interview analytics and transcript scoring
- Performance dashboards that feed discipline or promotion decisions
- Any embedded "smart" feature in a platform you already license

The safe inventory question is not "is this an AI tool" but "does this system output something a human uses to make this decision".

---

## Who is covered

The IHRA's employer definition does the work, and it is broad: generally any employer with **one or more employees in Illinois for 20 or more weeks** in the current or preceding calendar year. There is no revenue threshold, no headcount exemption, and no carve-out for employers headquartered elsewhere — if you have an Illinois employee, the Act reaches the decision.

The duties protect **employees and applicants**, not customers. Illinois has a separate consumer-facing disclosure regime; this law is a workplace statute.

---

## The rule that was withdrawn, and why it still matters

IDHR published proposed rules (**Subpart J**) in the Illinois Register on **May 15, 2026**, scheduled a hearing, then **postponed rulemaking on June 2, 2026**. No refiling date has been announced. The draft therefore carries **no legal force**.

It is still the most useful document in the state, because it is the regulator's own description of what it was prepared to accept. It previews the compliance lift:

| Question | What the withdrawn draft would have required |
|---|---|
| When is notice given to employees? | **Annually**, plus within **30 days** of adopting a new or substantially updated AI system or process |
| When is notice given to candidates? | In the **job posting** or notice for the position |
| Where does it appear? | Multiple channels: handbook or policy, workplace posting, intranet or public website with a prominent link, and job postings |
| What must it say? | The tool or vendor, the employment decision affected, the purpose, categories of personal information processed, positions covered, a contact for questions, accommodation information, and required statutory language |
| In what form? | Plain language, available in commonly spoken workforce languages, reasonably accessible to individuals with disabilities |
| How long are records kept? | **Four years** after the AI use |

Treat every row as **design guidance, not a legal requirement**. The mistake to avoid is publishing a notice and then telling your board it complies with IDHR rules — there are no IDHR rules. The accurate statement is that it follows the withdrawn draft, which is currently the only published indication of what the Department expects.

---

## A notice that survives either reading

You cannot wait for the rules, because the duty is already enforceable and back-dated to January 1, 2026. You also cannot guess the final format. What you can do is satisfy the statutory floor — clear notice, delivered, documented — while matching the draft closely enough that a final rule is unlikely to invalidate it.

Eight elements that satisfy both:

1. **Name the system and the vendor**, in words a warehouse employee understands, not the procurement SKU.
2. **Name the decisions it feeds** — screening in, not "talent acquisition optimisation".
3. **Say what data it looks at**, including whether it derives inferences or scores.
4. **Say what the human does** with the output. This is the element that most distinguishes a real notice from a disclaimer.
5. **Give a contact and an accommodation path**, with a named role rather than a generic inbox.
6. **Publish it in the channels people actually use** — handbook, intranet, physical posting, and the job requisition.
7. **Translate it** into the languages your workforce actually reads, and check screen-reader access.
8. **Record delivery** with a date, a version, and the population it went to. Four years.

Point 8 is where most programs fail. The violation is failure to notify, so the evidence you will need is proof of delivery to a specific population on a specific date — not the existence of a policy document on a shared drive.

---

## Penalties and enforcement

| Item | Detail |
|---|---|
| Forum | IDHR charge process; administrative or circuit court |
| Theory | A civil rights violation under the IHRA, not a consumer-protection violation |
| Remedies | Those the IHRA provides — actual damages, attorney's fees, injunctive and equitable relief, and the civil penalties the Act authorises |
| Private right of action | Yes, through the IHRA's charge-and-review process |
| Cure period | None announced for the notice duty |
| Per-day fine | **None.** Illinois did not build a California-style daily penalty into this provision |

Enforcement volume so far is low, which is normal for a first year and is not evidence of tolerance. The exposure is more likely to arrive attached to a discrimination charge — a complainant alleging (L)(1) effect, and discovery producing the fact that no (L)(2) notice ever went out.

---

## Timeline

| Date | Event |
|---|---|
| Aug 9, 2024 | Signed; becomes Public Act 103-0804 |
| Jan 1, 2026 | Both duties operative |
| May 15, 2026 | IDHR publishes proposed Subpart J rules |
| Jun 2, 2026 | IDHR postpones rulemaking; draft withdrawn |
| Nov 8, 2026 | No refiling; duties enforceable, definitions still absent |

---

## Implementation checklist

- [ ] Inventory by function, not by product label: every system whose output a human uses in a covered decision
- [ ] For each, write one sentence on what the human would do without it
- [ ] Retire or reconfigure any feature that uses ZIP code as an input to a covered decision
- [ ] Draft the notice to the eight elements above, not to the shortest possible text
- [ ] Put it in the handbook, the intranet, the physical posting, and every job requisition
- [ ] Translate it into your workforce's actual languages and test it with a screen reader
- [ ] Log delivery by population and date; set retention to four years
- [ ] Re-issue annually and within 30 days of adding or materially changing a system
- [ ] Diarise the day IDHR refiles — the draft is likely to move, and the notice will need to move with it

---

## Frequently asked questions

**Is HB 3773 in effect?**
Yes. Both duties have applied since January 1, 2026. What is missing is the rulemaking that was supposed to define the notice, not the duty itself.

**Did IDHR withdraw the AI notice rules?**
Yes. Proposed Subpart J was published May 15, 2026 and postponed June 2, 2026. As of November 8, 2026 there is no refiling date and no effective rule.

**What happens if we use AI but never told employees?**
That is a standalone civil rights violation under 775 ILCS 5/2-102(L)(2). The state does not need to show the tool discriminated against anyone, or that anyone was harmed.

**Do we have to notify job applicants, or only current employees?**
Both. The statute covers recruitment and hiring decisions, so applicants are within scope, and the withdrawn draft expected candidate notice to appear in the job posting.

**Does a vendor's tool count as "our" AI use?**
Yes. The duty sits with the employer that uses the output in a decision. Buying the system rather than building it changes nothing about the notice obligation.

**Can we just say "we use AI in hiring" in the handbook?**
It would be a notice, and technically it would satisfy the statutory floor. It would not satisfy the withdrawn draft, and it would not survive the question a regulator actually asks: which tool, for which decision, and what did the human do with it.

**Is there a fine per violation?**
No per-day or per-violation fine is written into this provision. Remedies run through the IHRA — damages, fees, equitable relief, and the penalties the Act authorises elsewhere.

---

**Related:** [Which state AI disclosure laws are in force](/in-effect/) · [Colorado SB 26-189: pre-use notice and 30-day explanations](/colorado/sb-26-189/) · [New York's synthetic performer ad rule](/new-york/synthetic-performer/)

*Last verified November 8, 2026. General information, not legal advice. Confirm against Public Act 103-0804 and check whether IDHR has refiled Subpart J before relying on any notice format.*

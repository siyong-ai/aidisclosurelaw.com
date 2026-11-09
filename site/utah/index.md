---
slug: /utah/
title: "Utah AI Disclosure Law: Code Chapter 77, Not §13-2-12"
meta_description: "Utah's AI disclosure duty lives in Code ch. 77 since May 7, 2025 — §13-2-12 was repealed. Two triggers, one safe harbour, a $2,500 cap."
h1: "Utah's AI Disclosure Law Now Lives in Code Chapter 77"
one_liner: "If you are citing Utah Code §13-2-12 for the state's AI disclosure duty, you are citing a section that was repealed in 2025. The live rule is Title 13, Chapter 77, in force since May 7, 2025. It splits into a reactive duty (disclose when a consumer clearly asks) and a proactive one (regulated occupations, high-risk interactions), and it hands you a safe harbour that is easier to test than either."
status: "In force since May 7, 2025"
last_verified: "2026-11-08"
primary_keyword: "utah ai disclosure law"
secondary_keywords:
  - "utah code 13-77"
  - "utah ai policy act"
  - "utah 13-2-12 repealed"
  - "utah generative ai disclosure requirements"
  - "utah high-risk ai interaction"
sources:
  - label: "Utah Code Title 13, Chapter 77: Generative Artificial Intelligence — Consumer Disclosures and Enforcement"
    url: "https://le.utah.gov/xcode/Title13/Chapter77/13-77.html"
  - label: "Utah Code §13-77-103: Required disclosures"
    url: "https://le.utah.gov/xcode/Title13/Chapter77/13-77-S103.html"
  - label: "SB 226 (2025), the amendment that repealed §13-2-12 and enacted chapter 77"
    url: "https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf"
---

# Utah's AI Disclosure Law Now Lives in Code Chapter 77

> **Short answer.** Utah's generative AI disclosure duty is in **Utah Code Title 13, Chapter 77**, in force since **May 7, 2025**. The original 2024 home for it — **§13-2-12** — was repealed by SB 226 and no longer exists. Chapter 77 sets two triggers: a **reactive** duty to disclose when a consumer in a consumer transaction clearly and unambiguously asks whether they are talking to AI, and a **proactive** duty for people in **licensed occupations** using generative AI in a **high-risk interaction** — verbal at the start of a verbal interaction, written before a written one. Violations are deceptive acts enforced by the Division of Consumer Protection: up to **$2,500** per violation administratively, up to **$5,000** per violation of an order.

---

## Why so many articles cite a dead section

SB 149 (2024) put the disclosure duty in **§13-2-12**. In 2025, SB 226 repealed that section and re-enacted a revised, narrower duty as its own chapter, **Title 13, Chapter 77**, "Generative Artificial Intelligence — Consumer Disclosures and Enforcement", effective **May 7, 2025**.

Two things went stale at once, and both are common online:

1. **The citation.** §13-2-12 is repealed. Compliance records, vendor questionnaires, and internal policies that cite it are pointing at nothing.
2. **The obligation.** The original law expected broad proactive disclosure of AI use. SB 226 narrowed the general-consumer duty to **disclosure on request only**, and confined proactive disclosure to licensed occupations in high-risk interactions.

Chapter 72 still exists — it holds the Office of Artificial Intelligence Policy and the AI Learning Laboratory — and it is scheduled to sunset on **July 1, 2027**. That sunset does not, on its face, repeal the Chapter 77 disclosure duties. Do not let a vendor tell you Utah's rule disappears in 2027; that is the policy office, not the disclosure statute.

---

## Two triggers, two very different duties

| | General consumer | Licensed occupation |
|---|---|---|
| **Provision** | §13-77-103(1) | §13-77-103(2)–(3) |
| **Who** | Any "supplier" using generative AI to interact with an individual in connection with a consumer transaction | An individual providing services in a **regulated occupation** — one requiring a licence or state certification from the Department of Commerce |
| **Trigger** | The individual **clearly and unambiguously asks** whether they are interacting with AI rather than a human | The interaction is a **high-risk AI interaction** — no request needed |
| **Timing** | When asked | **Verbally at the start** of a verbal interaction; **in writing before** a written interaction |
| **Standard** | Truthful answer; never state that AI is a human | Prominent disclosure, up front |

### What makes an interaction "high risk"

Two elements, both required:

- Generative AI interactions involving **sensitive personal information** — health, financial, or biometric data
- **Personalised recommendations, advice, or information** that a person could reasonably rely on for a significant personal decision, including financial, legal, medical, or mental-health advice

That definition is narrower than it looks. Most retail chatbots, support bots, and marketing assistants never reach it. A licensed financial adviser's AI assistant discussing a client's retirement accounts does.

### What counts as generative AI

Chapter 77 covers AI trained on data, designed to simulate human conversation through text, audio, or visual communication, and generating **non-scripted, human-like output** with limited or no human oversight. A purely scripted or menu-driven bot sits outside the definition — which is why the definition of what you are running is the first question to answer, not the last.

---

## The safe harbour worth designing around

§13-77-104 gives you something unusual for an AI statute: a **practical way to stop worrying about the trigger**.

A person is not subject to enforcement for a §13-77-103 violation if the generative AI **clearly and conspicuously discloses at the outset, and throughout the interaction**, that it is generative AI, that it is not human, or that it is an AI assistant.

Note the "and throughout". A banner at the top of the chat that disappears after the first message is not this. Persistent identification — in the header, in each message block, in the voice preamble — is.

Practically: if you make the always-on disclosure, the reactive duty and the high-risk duty both stop mattering, because you have already disclosed. The reason to still separate them is the **non-disclosure case** — the vendor integration, the voice agent, the embedded assistant inside a partner's product.

---

## Penalties and enforcement

| Item | Detail |
|---|---|
| Regulator | Division of Consumer Protection, Utah Department of Commerce |
| Theory | A deceptive act or practice under the Consumer Sales Practices Act |
| Administrative fine | Up to **$2,500** per violation |
| Civil penalty | Up to **$5,000** per violation of an administrative or court order |
| Other remedies | Injunctive relief, disgorgement of profits, the Division's fees and costs |
| Criminal exposure | None |
| "The model did it" | **Not a defence.** Chapter 77 states generative AI is not a defence where the AI made the statement, took the act, or was used in furtherance of the violation |

Per-violation structure means exposure scales with conversation volume, not with company size. A single deployment answering thousands of consumer chats weekly is a different risk profile from one human-supervised agent.

---

## The question nobody has answered: does this reach hiring?

Utah's chapter is a **consumer protection** statute, not an employment one, and it says nothing about job applicants.

The honest analysis:

- The proactive duty is limited to **regulated occupations**. Recruiting and HR are not licensed occupations in Utah, so §13-77-103(2) is very unlikely to reach an ordinary hiring process on its own terms.
- The reactive duty turns on whether a job application is a **consumer transaction**. Chapter 77 borrows that definition from the Utah Consumer Sales Practices Act (§13-11-3), which describes a sale, lease, or transfer of goods or services to a person for personal, family, or household purposes. An application is not obviously a purchase by the applicant.
- No Division of Consumer Protection guidance applies the chapter to hiring.

If you want the risk gone rather than analysed, the safe harbour solves it: disclose that the interviewer or screener is AI, persistently. A hiring chatbot that says what it is has no disclosure question left to argue about.

---

## Mental-health chatbots are a separate, heavier track

If the product is a mental-health chatbot offered to Utah users, Chapter 77 is not your main obligation. **Title 13, Chapter 72a** (from HB 452, 2025) requires disclosure that the chatbot is artificial intelligence and not human:

- **Before** features are accessed
- At the beginning of an interaction **after a seven-day gap**
- Whenever a Utah user asks or prompts about whether AI is being used

It also restricts selling or sharing a user's chatbot input and individually identifiable health information. Different chapter, different regulator posture, and a disclosure schedule that no generic chatbot banner satisfies.

---

## Implementation checklist

- [ ] Replace every citation of §13-2-12 with Title 13, Chapter 77
- [ ] Classify each conversational system: scripted (outside), generative (inside)
- [ ] For each generative system, decide which tier it is in — general consumer, regulated occupation high-risk, or mental-health chatbot
- [ ] Test whether the bot answers "am I talking to a human" truthfully in its own words, and how it handles indirect phrasings
- [ ] Either build the always-on safe-harbour disclosure, or build the per-tier trigger logic — not neither
- [ ] Make the disclosure persistent, not a first-message banner
- [ ] If you serve licensed professionals, put the disclosure in writing *before* the written interaction begins, and script it into the verbal opening
- [ ] Re-check the text each general session; chapter 77 has already been amended once and chapter 72 sunsets July 1, 2027

---

## Frequently asked questions

**Is Utah Code §13-2-12 still law?**
No. SB 226 (2025) repealed it and re-enacted the disclosure duty as Title 13, Chapter 77, effective May 7, 2025. Anything citing §13-2-12 for a current obligation is out of date.

**Does Utah require AI disclosure even if the customer does not ask?**
Only for individuals in a licensed occupation making a high-risk AI interaction, and for mental-health chatbots under chapter 72a. For ordinary consumer interactions the duty is reactive: you disclose when the person clearly and unambiguously asks.

**What is a high-risk AI interaction?**
Generative AI that involves sensitive personal information — health, financial, or biometric — and produces personalised recommendations or advice a person could reasonably rely on for a significant decision, including financial, legal, medical, or mental-health matters.

**Is there a safe harbour?**
Yes. Persistent, conspicuous disclosure at the outset and throughout that the system is generative AI and not human removes the enforcement exposure under §13-77-104.

**Does the July 2027 sunset kill the disclosure duty?**
No. The sunset applies to chapter 72, which houses the Office of Artificial Intelligence Policy and the learning laboratory. Chapter 77 is separate and is not repealed by that date.

**Does this apply to a hiring chatbot?**
Unresolved. The proactive duty is limited to licensed occupations, and whether a job application is a "consumer transaction" has not been decided. Disclose persistently and the question stops mattering.

---

**Related:** [Which state AI disclosure laws are in force](/in-effect/) · [Maine's chatbot disclosure rule](/maine/chatbot-disclosure/) · [Illinois HB 3773 notice duty](/illinois/hb-3773/)

*Last verified November 8, 2026. General information, not legal advice. Confirm against the current chapter text on le.utah.gov — the chapter has already been amended once.*

---
slug: /maine/chatbot-disclosure/
title: "Maine Chatbot Disclosure Law: 10 M.R.S. §1500-DD Explained"
meta_description: "Maine requires a clear and conspicuous notice whenever a chatbot could make a reasonable consumer think they are talking to a human. No size threshold, no intent requirement, in force since September 24, 2025. The citation also changed: §1500-Y was reallocated."
h1: "Maine's Chatbot Disclosure Law: No Threshold, No Intent, No Excuses"
one_liner: "10 M.R.S. §1500-DD has been in force since September 24, 2025 and is the strictest chatbot disclosure rule in the country: no company-size threshold, no intent requirement, no carve-out for a bot that tries hard. If a reasonable consumer could be misled into thinking they are talking to a person, you owe a clear and conspicuous notice — and the section number is not the one most articles still print."
status: "In force since Sep 24, 2025"
last_verified: "2026-11-08"
primary_keyword: "maine chatbot disclosure law"
secondary_keywords:
  - "10 mrs 1500-dd"
  - "maine ai chatbot law"
  - "1500-y reallocated 1500-dd"
  - "maine synthetic media political ads 21-a 1014"
sources:
  - label: "10 M.R.S. §1500-DD (official statute text; notes reallocation from §1500-Y)"
    url: "https://legislature.maine.gov/statutes/10/title10sec1500-DD-1.html"
  - label: "21-A M.R.S. §1014, incl. sub-§5-C on synthetic media (official)"
    url: "https://legislature.maine.gov/statutes/21-A/title21-Asec1014.html"
  - label: "Maine Unfair Trade Practices Act, 5 M.R.S. §205-A et seq. (enforcement vehicle)"
    url: "https://legislature.maine.gov/statutes/5/title5sec207.html"
---

# Maine's Chatbot Disclosure Law: No Threshold, No Intent, No Excuses

> **Short answer.** Since **September 24, 2025**, **10 M.R.S. §1500-DD** bars using an AI chatbot — or any other computer technology — to engage in trade or commerce with a consumer in a way that may mislead or deceive a reasonable consumer into believing they are dealing with a **human being**, unless the consumer is notified **clearly and conspicuously** that they are not. No employee threshold. No revenue test. No intent element. No exception for a bot that discloses only after being asked. A violation is a violation of the **Maine Unfair Trade Practices Act**, enforceable by the Attorney General.

Two citation traps sit on top of that: the section was **reallocated from §1500-Y**, and a separate synthetic-media rule for political advertising lives at **21-A §1014(5-C)** and took effect July 29, 2026.

---

## The citation changed, and half the internet missed it

The chatbot rule was enacted as **LD 1727**, signed June 12, 2025, as **P.L. 2025, ch. 294**. It was originally codified at **§1500-Y**.

The Revisor of Statutes then reallocated it. The operative citation is now **10 M.R.S. §1500-DD**, and the published text carries the line "*(REALLOCATED FROM TITLE 10, SECTION 1500-Y)*" at the top.

What that means in practice:

- A policy document or vendor questionnaire citing **§1500-Y** is citing a section that no longer exists under that number.
- Guidance written before late 2025 will often cite §1500-Y **and** describe a weaker duty than the one in force.
- If you are citing a Maine chapter number for this rule, note that the reallocation also carries a revisor's reference to **RR 2025, c. 1, Pt. A, §16** — the statutory basis for the move.

This is the same failure mode as Utah's §13-2-12: a real law, an obsolete citation, and a corpus of articles that never got updated.

---

## What the statute actually says

Two elements, and both are broader than the equivalent text in other states.

| Element | Language and effect |
|---|---|
| **The technology** | "Artificial intelligence chatbot" means a software application, web interface, or computer program that **simulates human conversation and interaction through textual or aural communications** — and the prohibition reaches "any other computer technology" beyond chatbots |
| **The conduct** | Engaging in trade or commerce with a consumer **in a manner that may mislead or deceive a reasonable consumer** into believing the consumer is engaging with a human being |
| **The escape** | The consumer is notified **in a clear and conspicuous manner** that they are **not** engaging with a human being |
| **The consequence** | A violation **is** a violation of the Maine Unfair Trade Practices Act |

Three details do the work:

**"May mislead" is not "does mislead."** The standard is the capacity to mislead a reasonable consumer, not proof that one was misled. An unnamed assistant with a human name and a friendly avatar is the paradigm case.

**There is no threshold of any kind.** No employee count, no revenue figure, no volume of chats. A two-person business with a website widget is covered on the same terms as a bank.

**No intent requirement.** You do not have to have set out to deceive anyone. The design decision is the violation.

---

## Why geo-targeting is the wrong answer

The natural instinct is to disclose only to visitors in Maine. Two problems:

1. **You usually cannot know.** The state of a visitor is an inference from IP, and a VPN, a corporate proxy, or a mobile carrier makes it wrong. A disclosure that fires on a misread location is worse than none.
2. **The cost of over-disclosure is close to zero.** A line of text telling everyone they are talking to a bot does not measurably hurt conversion on support or transactional flows, and it eliminates the question entirely.

The businesses that get this wrong are not the ones that decided to deceive. They are the ones that shipped a bot with a human persona — a name, a face, a typing indicator, "Hi, I'm Alex!" — and never asked whether Alex was a disclosure problem.

---

## What "clear and conspicuous" looks like in practice

The statute does not define the format. It does define the failure: a consumer who could reasonably believe a human is on the other end. Test your implementation against these:

| Question | Why it decides the case |
|---|---|
| Does the notice appear **before** the first exchange, not after? | A disclosure delivered at message four lets the first three mislead |
| Is it **visible without scrolling or expanding**? | A footnote below the fold is not conspicuous |
| Does it say **"not a human"**, not just "AI-powered"? | "Powered by AI" describes the software; the statute is about who the consumer thinks they are talking to |
| Does it survive the **handoff**? | Human agent → bot is the most common failure. The persona returns; the disclosure does not |
| Does it follow the conversation **out of the widget**? | SMS, email, WhatsApp, and voice all need their own notice |
| Does the voice agent **say it out loud** at the start? | "Textual or aural" is explicit in the definition |
| Does the **human name and avatar** contradict it? | A confident human persona next to a small disclosure line is arguably still misleading |

That last row is the one that ends arguments. Maine's standard is what a reasonable consumer takes away, not what the footer says.

---

## Penalties

| Item | Detail |
|---|---|
| Enforcer | Maine Attorney General |
| Vehicle | Maine Unfair Trade Practices Act, 5 M.R.S. §205-A et seq. |
| Civil penalty | Set by the UTPA's general penalty provision (5 M.R.S. §209), which authorises civil penalties per violation |
| Other relief | Injunctive relief, restitution, and the Attorney General's costs |
| Private right of action | Under the UTPA, not under §1500-DD itself |
| Chatbot-specific fine | **None.** Maine attached the duty to an existing statute rather than creating a new penalty |

Attaching the rule to the UTPA rather than writing a bespoke AI penalty is deliberate, and it has a practical consequence: you are measured against decades of unfair-and-deceptive-practice precedent about what a reasonable consumer understands, not against a new and narrow AI test.

---

## The other Maine rule: synthetic media in political ads

Different chapter, different audience, and it took effect later. **21-A M.R.S. §1014(5-C)**, enacted as **LD 517** (**P.L. 2025, ch. 593**), signed March 23, 2026, and in force **July 29, 2026**.

If a political communication that already requires a campaign-finance disclosure contains synthetic media of a candidate, it must also carry the words:

> THIS COMMUNICATION CONTAINS AUDIO, VIDEO AND/OR IMAGES THAT HAVE BEEN MANIPULATED OR ALTERED

Details that matter:

- **Synthetic media** means an image, audio, or video of a candidate that, in a manner likely to deceive a reasonable person, depicts them saying or doing something they did not, or has been manipulated to give a materially different impression. **Satire, parody, and technical clarity edits are excluded.**
- **The penalty is different from the rest of the section**: up to **500% of the expenditure** on the offending communication, against 100% for other disclosure violations in the same section.
- **Broadcasters and newspapers** are liable only if they publish with **actual knowledge** that the communication contains synthetic media.

This one binds campaigns and committees, not ordinary businesses. It is included because the citation gets confused with §1500-DD constantly, and because the two were enacted a year apart under different public laws.

---

## Implementation checklist

- [ ] Replace every internal reference to **§1500-Y** with **§1500-DD**
- [ ] List every conversational surface: website widget, in-app chat, SMS, WhatsApp, voice IVR, email auto-responders
- [ ] For each, ask the statute's question: could a reasonable consumer think a human is replying?
- [ ] Put the notice **before** the first exchange, visible without scrolling, saying **not a human**
- [ ] Retire or rename human personas that contradict the notice — the avatar is part of the disclosure analysis
- [ ] Write the handoff rule: every bot-to-human and human-to-bot transition re-states the notice
- [ ] Add the notice to outbound channels separately; the widget text does not travel
- [ ] For voice agents, script the spoken disclosure into the opening, before any substantive answer
- [ ] If you run political advertising in Maine, keep the §1014(5-C) wording and the 500% exposure separate from this checklist

---

## Frequently asked questions

**Is the Maine chatbot law in force?**
Yes, since September 24, 2025.

**Is it 10 M.R.S. §1500-Y or §1500-DD?**
§1500-DD. The section was originally codified at §1500-Y and reallocated by the Revisor of Statutes; the current published text notes the move at the top.

**Does the law apply to small businesses?**
Yes. There is no employee or revenue threshold of any kind. Any business using a chatbot in trade or commerce with a Maine consumer is covered.

**Do we have to disclose if the customer never asks?**
Yes. Unlike Utah, Maine's duty is proactive: the notice must be clear and conspicuous before the consumer could be misled, not on request.

**What if our bot only handles order status?**
The test is whether a reasonable consumer could believe they are dealing with a human. A bot that says "I'm the automated order assistant" is fine. One that says "Hi, this is Alex from support" is the fact pattern the statute was written for.

**What is the penalty?**
A violation of §1500-DD is a violation of the Maine Unfair Trade Practices Act, enforced by the Attorney General through the UTPA's civil penalty and injunctive provisions. Maine did not create a chatbot-specific fine.

**Does the political advertising rule apply to businesses?**
No. 21-A §1014(5-C) binds political communications that already require a campaign-finance disclosure, and it carries a 500% penalty on the expenditure. Ordinary commercial chatbots are governed by §1500-DD.

---

**Related:** [Which state AI disclosure laws are in force](/in-effect/) · [Utah chapter 77: reactive vs proactive disclosure](/utah/) · [Illinois HB 3773 notice duty](/illinois/hb-3773/)

*Last verified November 8, 2026. General information, not legal advice. Confirm against the current text of 10 M.R.S. §1500-DD on the Maine Legislature site — the reallocation means older citations point elsewhere.*

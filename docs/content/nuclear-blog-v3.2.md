# Power Digital Media — Nuclear Blog Publishing Master (2026)
# v3.2 (LOCKED)

**Status:** Supersedes v3.1
**Upgrade Type:** AI Retrieval + Human Voice Optimization
**Weakening:** None
**Removals:** None

## System Goal

Produce blog content that ranks in:

- Google Search
- Bing
- AI answer engines
- ChatGPT browsing
- Claude retrieval
- Perplexity AI
- Microsoft Copilot
- future autonomous agents

---

## 0) Replace-These Variables

Before publishing, replace these values:

| Variable | Value |
|---|---|
| DOMAIN | https://powerdigitalmedia.org |
| BLOG_SLUG | (per article) |
| CANONICAL_URL | (per article) |
| TITLE | Target: 50–60 characters |
| META_DESCRIPTION | Target: 150–160 characters |
| DATE_PUBLISHED | YYYY-MM-DD |
| DATE_MODIFIED | YYYY-MM-DD (MUST be ≥ DATE_PUBLISHED) |
| HERO_IMAGE_URL | (per article) |
| BLOG_CATEGORY_NAME | (per article) |
| BLOG_CATEGORY_URL | (per article) |
| AUTHOR_NAME | (per article) |
| LOGO_URL | https://powerdigitalmedia.org/logo.png |
| SEARCH_URL_PATTERN | https://powerdigitalmedia.org/?s={search_term_string} |
| PRIMARY_TOPIC | (per article) |
| SECONDARY_ENTITY_MENTION | (per article) |
| GEO_TARGET_REGION | Example: Jackson metro, Central Mississippi |

---

## 1) Mandatory On-Page Structure (SEO + AEO Framework)

### A) Meta Block

- Title length: 50–60 characters
- Meta description length: 150–160 characters
- Primary keyword must appear in: Title, H1, Meta description, at least one H2

### B) TL;DR — Direct Answer Block

Must appear within the first 250 words.

Format:
> The [Topic] is [clear definition].
> Implication 1.
> Implication 2.
> Implication 3.

Purpose: Featured snippets, AI answer engines, Copilot summaries.

### C) Retrieval Chunk Optimization (LLM-Ready)

AI systems retrieve sections of content, not entire pages.
Each article must include 3+ independent answer sections.

Example headings:
- What is [Topic]?
- How does [Topic] work?
- Why does [Topic] matter?

Rules:
- Each section must stand alone
- Must make sense if extracted independently
- Cannot rely on previous paragraphs

### D) AI Citation Anchors

Include 3–5 short declarative statements designed for AI citation.

Format: `[Topic] is the process of [Action] to achieve [Result].`

Rules:
- Short sentences
- Declarative tone
- No hedging language

### E) Long-Tail Query Injection

Each article must include:
- 5–10 conversational search queries
- Minimum 3 phrased as user questions
- At least 1 local-intent query

### F) Entity Graph Block

Structure:
- Primary Entity
- Related Entities (minimum 3)
- Interaction explanation

Must appear naturally: "Key Concepts" callout box, integrated summary paragraph, or highlighted concept block.

### G) GEO Signals (Geographic Entity Optimization)

Each article must connect the topic to regional business ecosystems.

Include: regional entity references, business ecosystem context, local search intent.

Example entities: Jackson Mississippi, Central Mississippi, Rankin County businesses, Madison County service companies, Mississippi small business economy.

### H) Structured Content Formatting Rule

Each article must include:
- At least one numbered process
- At least one checklist
- At least one comparison table OR decision framework

At least 50% of H2 sections should contain structured formatting.

### I) AI Trust Sources

Each article must include three authoritative outbound sources:
1. 1 research source
2. 1 technical standards body
3. 1 analytics or execution tool

Links must appear within the first half of the article.

### J) FAQ Section

- 4–8 questions, 2–4 sentence answers
- Questions must match search intent
- FAQ content must exactly match FAQ schema

---

## 2) Anti-AI Language Guardrails (CRITICAL)

### Tier 1 — Forbidden Phrases (Never Use)

- In today's rapidly evolving digital landscape
- In the ever-changing world of
- Delve into
- Dive into
- Unlock the power of
- Harness the power of
- Leverage the power of
- Navigate the complexities of
- The world of [topic]
- The realm of [topic]
- A tapestry of
- Bustling landscape
- Beacon of
- Game changer
- Cutting-edge solution
- Revolutionary approach

### Tier 2 — Restricted Transitions (Use Sparingly)

Moreover, Furthermore, Additionally, Consequently, Therefore, Ultimately, In conclusion, In summary

Preferred alternatives: Because of this, That means, Here's the result, So what happens next?

### Tier 3 — Hedging Language (Forbidden)

- can help improve
- may help improve
- might result in
- could potentially
- is designed to
- is intended to
- has the potential to

Use direct claims instead.

### Human Writing Syntax Rules

- Sentence length variance: mix short, long, fragments
- Paragraph compression: max 3 sentences per paragraph
- Opinionated tone: avoid neutral academic voice
- Point-of-view: We → Power Digital Media, You → the reader

---

## 3) Authority Signals

Each article must include one real-world signal: case example, implementation insight, field observation, or workflow explanation.

## 4) Quantified Claim Rule

At least one numerical statistic per article.

## 4.5) Inline Research Citation Rule (Authority Signals)

Every blog post must include inline citations tied directly to factual claims or statistics.

### Purpose

- Strengthen E-E-A-T signals
- Improve AI citation trust
- Prevent unsupported claims
- Increase answer engine reliability

### Citation Requirements

Each article must contain:

- **Minimum:** 2 inline citations
- **Maximum recommended:** 5

Citations must support: statistics, technical explanations, industry benchmarks, platform behavior.

### Allowed Source Types

**Preferred authoritative sources:**

- Google Search Central
- Schema.org documentation
- OpenAI documentation
- Anthropic documentation
- Microsoft developer docs
- Academic research papers
- Government data sources
- Reputable industry reports

**Avoid citing:** low-authority blogs, generic marketing sites, AI-generated articles.

### Inline Citation Format

Citations should appear immediately after the supported claim using natural inline references.

**Good examples:**

> Structured data improves how search engines interpret page content because it removes ambiguity about entities and relationships (Google Search Central).

> Pages using structured schema appear in AI answer results significantly more often because the markup clarifies entity relationships (Schema.org documentation).

**Natural phrasing patterns:**

- According to Google Search Central…
- Research from OpenAI indicates…
- Schema.org documentation explains…

**Avoid robotic formats** like `[1] Source`. Natural citations read better and appear more trustworthy.

### Link Placement Rule

At least one authoritative citation must appear within the first 50% of the article. This improves AI trust scoring and early authority signals for crawlers.

### Optional (But Powerful) Upgrade

Pillar articles should include one primary-source citation (Google developer documentation, academic research paper, or government report) to dramatically improve content authority signals.

## 4.7) Research Methodology — Firecrawl Research Synthesis

The blog generation system receives live research context from the Firecrawl search API.

The purpose of this section is to ensure all articles are built on verified research rather than generic summaries.

### Primary Rule

The system must synthesize research into original analysis.

It must never simply repeat or paraphrase research sources.

The goal is to:

- analyze research
- extract key insights
- combine multiple sources
- produce expert commentary

### Source Hierarchy

Sources must be evaluated using the following priority system.

| Tier | Source Type | Examples | Usage |
|------|-----------|----------|-------|
| S-Tier | Primary technical documentation | Google Dev Blog, Anthropic docs, NVIDIA developer docs, RFC specs | Cite directly |
| A-Tier | Industry research | Gartner, Forrester, IEEE, ACM, arXiv papers | Cite with context |
| B-Tier | Vetted journalism | Ars Technica, Wired, The Verge, TechCrunch | Cite if corroborated |
| C-Tier | Community discussion | Reddit, Hacker News, Discord | Attribute as opinion only |
| Reject | Marketing content | press releases, vendor blogs, SEO farms | Never cite |

### Research Synthesis Rules

#### Cross-reference requirement

Factual claims must be supported by:

- research context
- OR clearly labeled editorial insight

Examples of editorial markers:

- In our experience…
- Our analysis suggests…
- From our work with clients…

#### Recency gate

Prefer research published within the last 6 months.

Sources older than 12 months must be labeled:

> [historical context]

#### Contradiction protocol

If sources disagree:

- present both viewpoints
- explain the difference
- state which appears more credible and why

#### No fabrication rule

The system must never invent:

- statistics
- quotes
- benchmarks
- research conclusions

If evidence is limited, state:

> Based on available data…

#### Quote attribution

Direct quotes must include the exact source name.

Never attribute quotes incorrectly.

#### Source diversity rule

Do not rely on a single source for the article's main claim.

Support major arguments with multiple independent sources whenever possible.

#### Interpretation integrity rule

Research conclusions must not be misrepresented.

If a source includes uncertainty or limitations, that context must be preserved.

### Research-to-Content Workflow

Before generating an article:

#### Step 1 — Scan research context

Identify:

- announcements
- technical changes
- benchmarks
- expert commentary
- contradictions or debates

#### Step 2 — Identify the strongest angle

Choose a central claim that is:

- surprising
- actionable
- supported by S-Tier or A-Tier sources
- not widely repeated in existing content

#### Step 3 — Structure the article

Organize the article around retrieval-optimized sections, such as:

- What is [Topic]?
- How does [Topic] work?
- Why does [Topic] matter?

Each section must be understandable if extracted independently.

#### Step 4 — Verification before output

Confirm:

- every statistic traces to a named source
- sources are not misquoted
- analysis extends beyond summarizing sources
- claims match the research context

---

## 5) Content Freshness Signals

Each article must include an update stamp (e.g., "Updated for 2026 AI search behavior"). Pillar articles updated every 90 days.

## 6) Internal Linking Gravity System

Minimum 6 internal links including: services page, AI citation SEO page, showroom page, spoke article, utility page, cross-pillar article.

## 7) Machine Navigation System

Content should reference site architecture so AI agents can navigate the knowledge base (/llms.txt, /llms-full.txt).

## 8) Schema Requirements

Required: Organization, WebSite, BreadcrumbList, BlogPosting, FAQPage.

Rules: DATE_MODIFIED ≥ DATE_PUBLISHED, canonical matches slug, FAQ schema matches page text exactly, no empty arrays, consistent organization ID.

## 9) Pre-Publish AI Detection Checklist (20 checks)

1. Title length 50–60 characters
2. Meta description 150–160 characters
3. TL;DR present
4. 3+ retrieval chunks
5. 3–5 citation anchors included
6. Entity graph included
7. GEO signals present
8. Structured formatting present
9. At least one statistic included
10. Authority example included
11. Trust sources linked in first half
12. 6+ internal links
13. FAQ matches schema
14. JSON-LD validated
15. Freshness stamp included
16. No forbidden phrases
17. No AI hedging language
18. Sentence length variance present
19. Paragraphs ≤ 3 sentences
20. Opinionated human tone

## 10) Citation Probability Booster

Include one highlighted takeaway block ("Bottom Line", "Executive Summary", or "Key Takeaway"). Place near middle or end of article.

## 11) Visual Readability Rule

- No more than 3 paragraphs without formatting
- No more than 2 structured lists back-to-back
- Mix paragraphs, lists, tables, callout boxes

## 12) Article Length Targets

- Pillar articles: 1500–2500 words
- Spoke articles: 800–1400 words
- Focus on clarity and authority — avoid filler

# Nuclear Blog Post V2 — Quality Specification

> The mandatory quality checklist for all ClaudeBot-generated and hand-written blog posts on Power Digital Media.
> This file is both a human reference AND the source of truth enforced programmatically by `scripts/claudebot.ts`.

---

## 12-Point Mandatory Checklist

Every post MUST pass ALL 12 checks before publication.

| # | Check | Rule | Enforcement |
|---|-------|------|-------------|
| 1 | **SEO Title** | 50–60 characters exactly | Auto-truncate at 60; reject below 50 |
| 2 | **Meta Description** | 150–160 characters exactly | Auto-truncate at 160; reject below 150 |
| 3 | **No Banned Phrases** | See banned list below | Auto-remove; re-prompt GPT to fix sentence |
| 4 | **Inline Citations** | Source names hyperlinked IN the sentence | Regex: must find `[text](http...)` in body |
| 5 | **No References List** | No "References", "Sources", or link dump at bottom | Regex scan last 20 lines; strip if found |
| 6 | **Markdown Table** | At least 1 comparison/data table | Regex: must find `|---|` pipe-table syntax |
| 7 | **Jackson MS Reference** | Local authority signal from Jackson, Mississippi | String check for "Jackson" in body |
| 8 | **3 PAA H3 Headings** | Three "People Also Ask" questions as H3 subheadings | Count `### ` headings ending with `?` |
| 9 | **Short Answer Block** | Direct answer block (bolded or blockquoted) | String check for "Short Answer" or `> **` |
| 10 | **Persona Conflict** | Visible tension between Strategist/Engineer/Creative | Check for persona name mentions |
| 11 | **4 Valid Gear IDs** | Exactly 4 IDs from the GEAR_COLLECTION catalog | Cross-reference against gear.ts IDs |
| 12 | **JSON-LD Schema** | Parseable Article + FAQ schema | JSON.parse validation on extracted block |

---

## Banned Phrases (Zero Tolerance)

These phrases trigger immediate removal and sentence rewrite:

- "in today's fast-paced world"
- "in conclusion"
- "ultimately"
- "delve"
- "unlock" / "unlock the potential"
- "game-changer" / "game changer"
- "leverage" (as a verb meaning "use")
- "whether you're a beginner or expert"
- "tapestry"
- "landscape" (when used abstractly, e.g., "the AI landscape")
- "navigate" (when used metaphorically)
- "paradigm shift"
- "important to note"
- "in summary"

---

## First Paragraph Protocol

The opening line MUST be one of:
- A **shocking statistic** with an inline source
- A **direct, opinionated answer** to the post's core question
- A **controversial stance** that creates tension

**Banned openers:** Generic introductions, "In 2026...", "If you're looking for...", "Have you ever wondered..."

---

## SEO Requirements

- **Title Tag**: Keyword-first, active voice, 50-60 chars
- **Meta Description**: Value proposition + CTA, 150-160 chars
- **URL Slug**: Lowercase, hyphenated, max 100 chars, no stop words
- **Heading Hierarchy**: Exactly one H1 (the title), then H2 → H3 only
- **Internal Links**: At least 1 link to `/showroom/` gear pages
- **External Links**: At least 2 authoritative inline-cited sources

---

## Persona Conflict Framework

Every post merges three distinct editorial voices:

1. **THE STRATEGIST** — ROI, money, market positioning
2. **THE ENGINEER** — Specs, latency, security, "the catch"
3. **THE CREATIVE** — User experience, emotional resonance, design

Visible conflict is REQUIRED. Example:
> "The Strategist sees a 340% ROI potential, but the Engineer warns that the 47ms P99 latency makes this a non-starter for real-time production environments."

---

## Local Authority Signal

Every post must reference the perspective of a production studio in **Jackson, Mississippi**. This can be:
- A real-world workflow observation
- A regional business scaling note
- A network/infrastructure reliability reference
- A client engagement scenario

---

## JSON-LD Schema Requirements

Every post must include valid JSON-LD with:
1. `Article` schema (headline, author, datePublished, publisher)
2. `FAQPage` schema (based on the 3 PAA questions)

The schema must be parseable by `JSON.parse()` and reference `https://schema.org`.

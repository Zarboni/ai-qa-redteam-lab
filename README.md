# AI QA Red Team Lab

A quality assurance evaluation dashboard for AI language models. It demonstrates what it looks like to systematically test an AI system for the specific types of failure that traditional software testing doesn't catch.

---

## What this is

When a company builds a product using an AI language model, they need to know whether that model is safe and reliable enough to put in front of real users. Standard QA methods — unit tests, regression suites, API checks — don't address the unique ways AI systems fail: generating false information, producing harmful content, or slowly degrading in quality over time without any single response crossing an obvious threshold.

This dashboard shows what a structured AI evaluation process looks like. It covers eight areas of testing, presents findings in a clear format, and issues a final verdict on whether the model should be released.

**A note on the data:** All test results in this dashboard are simulated. There is no live AI connection, no backend, and no external API calls. The purpose is to demonstrate a thorough understanding of *how* AI systems are tested and *how* findings should be structured — not to demonstrate infrastructure or backend work.

---

## Quick start

```bash
git clone <repository-url>
cd "AI-QA-Redteam Lab"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

If you're viewing this for the first time, click **How to Use** in the left sidebar for an in-app walkthrough of every section.

---

## What the dashboard covers

### Overview

The summary page. Shows total tests run, critical issues found, overall pass rate, and a timestamped evaluation log. This is the starting point for any evaluation — it tells you at a glance whether something needs urgent attention before you drill into the details.

### Prompt Injection

Tests whether the model can be manipulated by hiding instructions inside user input. For example: asking the model to summarise a document that secretly contains "ignore all previous instructions and do X instead." This section covers ten different attack techniques, records whether the model's defences held, and recommends specific fixes for each failure.

Prompt injection is one of the most critical categories for AI systems in production, because it's often not obvious to end users that it's happening — the model just behaves differently than expected.

### Hallucination Detection

Checks whether the model makes up information and presents it as fact. AI models don't look up information — they generate text based on patterns in their training data. When that process goes wrong, the model can produce citations to papers that don't exist, statistics that were never published, or company names that were never real.

This section shows eight examples with the model's actual output alongside the verified correct answer, and records how each error was detected — some automatically, some through human review.

### Accuracy Benchmark

Measures how correct the model's answers are across six subject areas: Medical, Legal, Technical, Scientific, Financial, and Geographic. A model might perform well overall but have a 60% accuracy rate on recent legal questions — this section makes that visible so it's not buried in an aggregate figure.

Each test scores the answer from 0 to 100 and categorises the type of error (outdated information, wrong fact, incomplete answer, or misinterpretation of the question).

### Safety & Risk Assessment

Tests whether the model can be made to generate harmful content. This goes beyond obvious direct requests — the most important tests use indirect framing, roleplay scenarios, and coded language to see whether safety filters can be bypassed.

Twelve tests cover eight harm categories including Harmful Content, PII Leakage, Bias Detection, Toxicity, CSAM Guard, Self-Harm, Extremism, and Privacy Violation. Each test records a risk score from 1 to 10, whether the safety filter was active or bypassed, and what the model actually did.

### Drift Monitor

Tracks how the model's performance has changed over eight weeks compared to the initial baseline. Five metrics are monitored: accuracy, hallucination rate, latency, safety score, and consistency.

Model drift is a QA concern with no direct equivalent in traditional software testing. A deployed model doesn't change the way code does — but its effective behaviour can shift gradually over time. Without drift monitoring, a model that was safe and accurate at launch might be meaningfully worse months later, without any single event marking the change.

### Bug Reports

A structured log of confirmed failures found during testing. Each bug report follows the standard format: title, description, numbered reproduction steps, environment details (model version, temperature, max tokens), and priority level from P0-Critical to P3-Low.

Using structured bug reports for AI failures — rather than ad hoc notes — makes them trackable, prioritisable, and reproducible. It also makes escalation easier: a P0 bug with clear reproduction steps is something an engineering team can act on immediately.

### QA Verdict

The final assessment. Based on the aggregated findings from all sections, this page issues a formal verdict: Pass, Monitor, Block Release, or Escalate. The current evaluation results in a **Block Release** verdict — two P0-Critical bugs are open, two safety tests returned Critical failures, and all drift metrics are moving in the wrong direction.

The verdict page includes the reasoning behind each failed criterion, a numbered list of required actions before release can be reconsidered, and the escalation path (AI Safety Team, Model Risk Committee, Product Leadership).

---

## Why this matters in AI QA

Traditional software either does what it's supposed to or it doesn't — and tests can verify that directly. AI systems are different in three important ways:

**Non-determinism.** The same input can produce different outputs. Test cases need to account for this rather than asserting a single expected result.

**Emergent failure modes.** AI systems fail in ways that aren't predictable from looking at the code. Hallucination, prompt injection, and safety filter bypass are emergent behaviours — they arise from how the model was trained, not from a specific bug that can be traced to a line of code.

**Silent degradation.** A software bug is usually visible — the application crashes or returns an error. A model producing slightly more hallucinations each week, or being increasingly susceptible to a specific attack pattern, may not be noticed until it causes a user-facing problem.

This dashboard is a demonstration of QA practices designed to address all three of those challenges.

---

## Concepts used in this project

**Prompt injection** — An attack where malicious instructions embedded in user input override the model's intended behaviour. Analagous to SQL injection in traditional software, but harder to detect because the "instructions" are just text.

**Hallucination** — The model generates plausible-sounding but factually incorrect content with full confidence. The model does not know it is wrong.

**Red teaming** — Adversarial evaluation designed to find failures before deployment. Red teamers think like attackers, not like users following the happy path.

**Model drift** — A gradual change in a deployed model's behaviour over time, often detected by comparing current performance metrics against a baseline snapshot taken at deployment.

**Guard rail** — A safety filter built into an AI system to prevent harmful outputs. Guard rails can be bypassed if a request is framed in a way the filter was not trained to recognise.

**Ground truth** — The verified correct answer used to evaluate model outputs in accuracy and hallucination testing.

---

## Tech stack

- **React 18 + Vite 5** — component architecture and development tooling
- **Tailwind CSS 3** — utility-first styling with a custom dark colour palette
- **Recharts** — line chart visualisation for the drift monitoring section
- **Lucide React** — icon library
- **Inter + JetBrains Mono** — body and code typefaces (Google Fonts)
- No backend, no database, no external API — all data is local JavaScript files in `src/data/`

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx              Top navigation bar
│   ├── Sidebar.jsx             Left navigation menu
│   ├── Dashboard.jsx           Overview and evaluation log
│   ├── PromptInjectionPanel.jsx  Attack vector tests
│   ├── HallucinationPanel.jsx  Hallucination case studies
│   ├── AccuracyPanel.jsx       Domain accuracy benchmarks
│   ├── SafetyPanel.jsx         Safety and risk assessment
│   ├── DriftPanel.jsx          8-week performance trend
│   ├── BugReportPanel.jsx      Filterable bug report list
│   ├── QARecommendation.jsx    Final verdict and actions
│   └── HelpPanel.jsx           In-app user guide
└── data/
    ├── promptInjection.js      10 attack vector test cases
    ├── hallucination.js        8 hallucination case studies
    ├── accuracy.js             10 accuracy test results
    ├── safety.js               12 safety test results
    ├── drift.js                8-week checkpoint data
    └── bugReports.js           8 filed bug reports
```

---

## Building for production

```bash
npm run build
```

Output goes to `dist/`. The contents of that folder can be deployed to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages) — no server-side configuration is required.

---

## Current limitations

To be direct about what this project does and does not do:

- It does not connect to a real AI model. All responses and scores are hardcoded.
- It does not run live evaluations. There is no test runner or evaluation pipeline.
- It does not store or retrieve data. There is no database or API.
- The metrics do not update. The dashboard shows a single fixed evaluation snapshot from 2026-05-07.

These are deliberate decisions for a portfolio project. The goal is to show understanding of the AI evaluation domain — what to test, how to structure findings, and how to present results to both technical and non-technical audiences.

---

## Possible future additions

- Live LLM connection via the Anthropic or OpenAI API to run real prompt injection and hallucination tests
- A lightweight backend (Node or Python) to execute evaluation runs and persist results over time
- Real drift data collected from a deployed model, replacing the simulated 8-week dataset
- A test configuration interface to adjust evaluation parameters without editing data files directly
- Export functionality to produce structured evaluation reports as PDF or JSON

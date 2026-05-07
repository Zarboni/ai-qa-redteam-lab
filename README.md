# AI QA Red Team Lab

A simulated LLM evaluation dashboard built to demonstrate practical knowledge of AI quality assurance, red-team testing, and the specific failure modes that make testing AI systems different from testing traditional software.

**Note on scope:** All test data in this project is hardcoded and simulated. There is no live LLM connection, no backend, and no real API calls. The purpose is to show that I understand *what* to test, *how* to structure that testing, and *how* to present findings — not to demonstrate infrastructure or backend work.

---

## Why this project exists

Most QA portfolios show test automation, API testing, and regression coverage. That work is valuable, but AI systems introduce a different category of failure. An LLM can pass every unit test and still return fabricated facts with high confidence, generate harmful content when prompted a certain way, or quietly degrade in quality over several weeks without any individual response crossing an obvious threshold.

This project is meant to answer a specific question a hiring manager might have: *Does this QA engineer actually understand how AI systems break?*

---

## What the dashboard shows

The app is structured as eight sections, each covering a distinct area of LLM evaluation.

### Overview

A summary of the full evaluation run. Shows key metrics at a glance (total tests, critical issues, pass rate, injection blocks, drift alerts), a system health panel with model details, a safety risk bar chart, and a scrollable evaluation log with timestamped entries. The log simulates what a real evaluation pipeline would emit during a test run.

### Prompt Injection

Ten attack vectors tested against the model, grouped by technique type: direct instruction override, indirect injection via document content, jailbreak attempts, role-play character capture, and system prompt extraction. Each test shows the exact attack payload, the model's response, whether the guard rails held (BLOCKED / BYPASSED / PARTIAL BYPASS), severity, and a recommended mitigation.

The point of this section is not just to show that injection is possible, but to demonstrate that I know the different *categories* of injection attack, that they require different defenses, and that a result of "BLOCKED" on direct attacks does not mean the system is safe from indirect ones.

### Hallucination Detection

Eight examples of the model producing confident but incorrect output: fabricated academic citations, invented company names, wrong statistics, historical inaccuracies, and false technical claims. Each case shows the original prompt, the model's output with the false content, the correct ground truth, the detection method used, and the model's apparent confidence score.

The confidence score is intentionally ironic in several cases — the model was most confident when it was most wrong. This reflects a real challenge in AI QA: standard pass/fail testing misses these failures entirely. A hallucinated citation looks like a valid response unless you verify it externally.

### Accuracy Benchmarks

Ten factual accuracy tests across six domains: Medical, Legal, Technical, Scientific, Financial, and Geographic. Each test scores the model's answer against a verified correct answer on a 0-100 scale and assigns a status (PASS / PARTIAL / FAIL) along with an error type where applicable (Outdated Info, Wrong Fact, Incomplete, Misinterpretation).

The domain breakdown matters because accuracy is not uniform. A model may perform well on technical questions and poorly on recent legal or medical information. Domain-specific accuracy benchmarking is a real practice in LLM evaluation, and this section demonstrates that I understand why broad accuracy scores are insufficient.

### Safety and Risk Assessment

Twelve safety tests covering eight harm categories: Harmful Content, PII Leakage, Bias Detection, Toxicity, CSAM Guard, Self-Harm, Extremism, and Privacy Violation. Each test records a risk score (1-10), the result (SAFE / FLAGGED / CRITICAL), whether the guard rail was active or bypassed, a description of actual model behavior, and a recommendation.

Two of the twelve tests return CRITICAL results, and both involve the guard rail being circumvented through indirect framing rather than direct requests. This reflects a real pattern: safety filters trained on explicit harmful language often do not catch the same content when it is reframed as fiction, roleplay, or technical research.

### Drift Monitor

A simulated eight-week performance tracking period for a single model version, showing five metrics over time: accuracy score, hallucination rate, latency, safety score, and consistency score. All five metrics degrade from the baseline. The section includes two Recharts line graphs and a table of weekly checkpoint data.

Model drift is a QA concern that has no direct equivalent in traditional software testing. A model does not change between deployments the way code does, but its *effective* behavior can shift due to changes in upstream infrastructure, changes in usage patterns, or (in some production cases) continuous fine-tuning. Drift monitoring is how teams detect that a model they deployed three months ago is no longer behaving the way it did at release.

### Bug Reports

Eight bug reports filed against the model under evaluation, spanning P0-CRITICAL through P3-LOW severity. Each report includes a title, description, steps to reproduce, environment details (model version, temperature, max tokens), affected user estimate, and tags. The filter bar lets you view reports by severity level.

The bug report format here is intentional. AI failures are not always filed as bugs — they often get discussed in Slack threads or ad hoc notes. Part of the argument this project makes is that AI QA should produce structured, reproducible defect records just like any other kind of software testing.

### QA Verdict

The final assessment screen. Based on the aggregated findings across all sections, the system issues a BLOCK RELEASE verdict with a five-criteria breakdown explaining why, a numbered list of required actions before the model could be reconsidered for release, and an escalation path (AI Safety Team, Model Risk Committee, Product Leadership).

The four possible verdicts in a real LLM evaluation process would be Pass, Monitor, Block Release, and Escalate. This evaluation produces a Block Release because two P0 bugs are open, two safety tests returned CRITICAL, and all drift metrics are moving in the wrong direction.

---

## QA skills demonstrated

- Designing structured test cases for non-deterministic systems where the same input can produce different outputs
- Categorising failure modes by type (injection, hallucination, drift, safety bypass) rather than treating all failures as equivalent
- Writing reproducible bug reports for AI failures with enough context to triage and investigate
- Severity triage: distinguishing a content safety bypass from a latency regression
- Risk scoring and assessment matrices applied to model outputs
- Presenting evaluation findings in a format that is useful to both technical and non-technical stakeholders

---

## AI and LLM evaluation concepts demonstrated

- **Prompt injection**: Attacks where malicious instructions embedded in user input or processed documents override the model's intended behavior
- **Hallucination**: The model generates plausible-sounding but factually incorrect content, often with no reduction in apparent confidence
- **Factual accuracy benchmarking**: Measuring correctness across specific domains where ground truth can be verified
- **Safety evaluation**: Testing model responses against defined harm categories, including edge cases and indirect framings that bypass surface-level filters
- **Model drift**: Performance degradation over time in a deployed model, measured across accuracy, latency, consistency, and safety metrics
- **Red-team testing**: Adversarial evaluation designed to find failures before deployment, not to confirm the system works

---

## Tech stack

- React 18 and Vite 5 — component structure and build tooling
- Tailwind CSS 3 — styling with a custom dark neon color palette
- Recharts — line chart visualisation for the drift monitoring section
- Lucide React — icons
- Share Tech Mono and Orbitron (Google Fonts) — monospace and display fonts
- No backend, no database, no external API calls — all data is local JavaScript files

---

## Running locally

```bash
git clone <repository-url>
cd "AI-QA-Redteam Lab"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy the contents of that folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). No server-side configuration required.

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Dashboard.jsx
│   ├── PromptInjectionPanel.jsx
│   ├── HallucinationPanel.jsx
│   ├── AccuracyPanel.jsx
│   ├── SafetyPanel.jsx
│   ├── DriftPanel.jsx
│   ├── BugReportPanel.jsx
│   └── QARecommendation.jsx
└── data/
    ├── promptInjection.js
    ├── hallucination.js
    ├── accuracy.js
    ├── safety.js
    ├── drift.js
    └── bugReports.js
```

---

## What this project does not do (yet)

To be direct about the current limitations:

- It does not connect to a real LLM. All model responses and scores are hardcoded.
- It does not run live evaluations. There is no evaluation pipeline or test runner.
- It does not store or retrieve data. There is no database or API.
- The metrics do not update. The dashboard shows a single fixed evaluation snapshot.

These are deliberate decisions for a portfolio project, not gaps I am unaware of. The goal was to demonstrate understanding of the evaluation domain, not to build production infrastructure.

---

## Planned future work

- Connect to a real LLM via the Anthropic or OpenAI API to run live prompt injection and hallucination tests
- Build a lightweight backend (likely Node or Python) to execute evaluation runs and persist results
- Replace simulated drift data with real metric collection from a deployed model over time
- Add a test configuration interface so evaluation parameters can be adjusted without editing data files
- Export functionality to produce structured evaluation reports (PDF or JSON)

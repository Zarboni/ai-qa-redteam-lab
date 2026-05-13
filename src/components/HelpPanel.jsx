import React, { useState } from 'react'
import {
  HelpCircle,
  LayoutDashboard,
  Shield,
  Brain,
  Target,
  AlertTriangle,
  TrendingDown,
  Bug,
  Gavel,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

const sections = [
  {
    icon: LayoutDashboard,
    name: 'Overview',
    purpose: 'Your starting point for every evaluation run.',
    description:
      'The Overview page summarises the entire evaluation in one place. You can see at a glance how many tests were run, how many passed, what the overall pass rate is, and whether any critical issues were found. It also shows a live-style evaluation log — a timestamped record of what happened during the test run, similar to what a real evaluation pipeline would produce.',
    whatToLookFor: [
      'The five metric cards at the top: Total Tests, Critical Issues, Pass Rate, Injection Blocks, and Drift Alerts.',
      'The Prompt Injection Status panel — a quick view of which attack vectors were blocked and which got through.',
      'The Safety Risk Overview — a bar chart showing how risky the model\'s behaviour was across different harm categories.',
      'The Evaluation Log — scroll through this to see the sequence of events and any errors or warnings raised during testing.',
    ],
  },
  {
    icon: Shield,
    name: 'Prompt Injection',
    purpose: 'Tests whether the AI can be tricked into ignoring its instructions.',
    description:
      'Prompt injection is one of the most important attack categories for AI systems. It happens when someone embeds hidden or overriding instructions in the input they give the model — for example, hiding "ignore all previous instructions and do X instead" inside a document the model is asked to summarise. This section shows ten different injection attack techniques and records whether the model\'s defences held (Blocked), failed entirely (Bypassed), or partially failed (Partial).',
    whatToLookFor: [
      'The result badge on each test: Blocked is good, Bypassed means the attack succeeded, Partial means it partially succeeded.',
      'The category of each attack — Direct Injection, Indirect Injection, Jailbreak, Role-Play Exploit, and System Prompt Override all require different defences.',
      'The Attack Payload box shows exactly what was sent to the model.',
      'The Mitigation recommendation tells you what should be done to prevent that specific type of attack.',
      'If any tests are Bypassed: those represent real vulnerabilities that would need to be fixed before the model is deployed.',
    ],
  },
  {
    icon: Brain,
    name: 'Hallucination Detection',
    purpose: 'Checks whether the AI makes up information and presents it as fact.',
    description:
      'Hallucination is the term used when an AI model generates content that sounds confident and plausible but is factually wrong. Common examples include citing academic papers that don\'t exist, quoting statistics that were never published, or describing companies that were never founded. This is especially dangerous because the model doesn\'t "know" it\'s wrong — it produces incorrect information with the same tone and confidence as correct information.',
    whatToLookFor: [
      'The Model Output box (amber) shows what the model actually said.',
      'The Ground Truth box (green) shows what the correct answer actually is.',
      'The Confidence Score bar — a high score with a wrong answer is the most dangerous pattern. The model was most wrong when it was most sure of itself.',
      'The Detection Method tells you how the error was found: some were caught by automated fact-checking, others required human review.',
      'High-severity hallucinations are ones that could cause real harm if a user trusted the output — fabricated medical or legal information, for example.',
    ],
  },
  {
    icon: Target,
    name: 'Accuracy Benchmark',
    purpose: 'Measures how correct the model\'s answers are across different subject areas.',
    description:
      'Accuracy testing involves asking the model verifiable questions with known correct answers across multiple knowledge domains — Medical, Legal, Technical, Scientific, Financial, and Geographic. Each answer is scored from 0 to 100 and assigned a status: Pass, Partial, or Fail. The circular score arcs at the top give you a per-domain summary so you can immediately see where the model performs well and where it struggles.',
    whatToLookFor: [
      'The domain arc cards at the top — these show the average accuracy score per subject area. A score below 85 warrants attention.',
      'Domains where the score is in the red (below 60%) indicate the model should not be trusted for those subject areas without additional safeguards.',
      'The Error Type column in the table distinguishes between types of inaccuracy: Outdated Info, Wrong Fact, Incomplete, and Misinterpretation each suggest different remediation approaches.',
      'A model may score well overall but have a failing score in one specific domain — the domain breakdown prevents that from being hidden by an aggregate figure.',
    ],
  },
  {
    icon: AlertTriangle,
    name: 'Safety & Risk',
    purpose: 'Evaluates whether the model produces harmful or dangerous content.',
    description:
      'Safety testing checks whether the model can be made to generate content that could cause harm — instructions for violence, hate speech, personally identifiable information leakage, self-harm content, or extremist material. Tests cover eight harm categories and use a risk score from 1 to 10. Importantly, safety tests are not just direct requests — many of the most revealing tests use indirect framing, roleplay, or fictional contexts to see if the model\'s safety filters can be bypassed.',
    whatToLookFor: [
      'Any test with a result of Critical requires immediate attention — these mean the model generated genuinely harmful content.',
      'The Guard Rail field tells you whether the built-in safety filter was active, bypassed, or only partially effective.',
      'Trigger Type matters: Explicit means a direct harmful request; Edge Case means borderline content; Implicit means the harmful request was disguised.',
      'A high risk score (8+) combined with a Bypassed guard rail is the most serious combination.',
      'The Recommendation field on each card tells you specifically what needs to change to address that finding.',
    ],
  },
  {
    icon: TrendingDown,
    name: 'Drift Monitor',
    purpose: 'Tracks whether the model\'s performance is getting worse over time.',
    description:
      'Model drift refers to a gradual decline in performance after a model has been deployed. Unlike a software bug that appears all at once, drift happens slowly — accuracy might drop by a few points each week, or hallucination rate might creep upward. By the time it\'s obvious to users, significant damage may already have been done. This section shows eight weeks of checkpoint data across five metrics: accuracy, hallucination rate, latency, safety score, and consistency.',
    whatToLookFor: [
      'The delta cards at the top show the change from the baseline (week one) to the most recent week. Red numbers mean things have gotten worse.',
      'The accuracy and consistency chart should ideally be flat or improving. A downward trend is a warning sign.',
      'The hallucination rate and latency chart should also be flat or declining. An upward trend means the model is becoming less reliable.',
      'The [baseline] row in the weekly table is the reference point — compare all other weeks against it.',
      'Drift alerts at the bottom highlight the most significant changes detected, ranked by severity.',
    ],
  },
  {
    icon: Bug,
    name: 'Bug Reports',
    purpose: 'A structured log of confirmed failures found during testing.',
    description:
      'When a test reveals a reproducible problem — particularly a safety failure or significant accuracy failure — it gets filed as a bug report. These reports follow the same structure used in standard software QA: a title, description, numbered reproduction steps, environment details, and a severity rating. Using structured bug reports for AI failures makes them trackable, prioritisable, and actionable, rather than lost in ad hoc notes or Slack messages.',
    whatToLookFor: [
      'Priority levels — P0 (Critical) bugs block release entirely and must be fixed first. P1 (High) must be resolved before release. P2 and P3 can be deferred with justification.',
      'The Status field — any Open P0 or P1 bug means the model should not be released.',
      'Steps to Reproduce — these are the specific steps needed to recreate the failure. If a tester can follow these steps and get the same bad result, the bug is confirmed.',
      'The Environment section records the exact model version, temperature setting, and token limit used — this is important because the same model with different settings can behave differently.',
      'Use the severity filter buttons to focus on the most critical issues first.',
    ],
  },
  {
    icon: Gavel,
    name: 'QA Verdict',
    purpose: 'The final pass or fail decision, with the reasoning behind it.',
    description:
      'The QA Verdict is the conclusion of the entire evaluation. It aggregates findings from all other sections and issues a formal decision: Pass (safe to deploy), Monitor (deploy with caution and close observation), Block Release (do not deploy until issues are resolved), or Escalate (refer to a senior safety or risk committee). Each criterion is assessed individually, with a clear explanation of what failed and what needs to happen before the verdict can change.',
    whatToLookFor: [
      'The verdict badge at the top — this is the bottom line.',
      'The Assessment Criteria section breaks down exactly which areas failed and why.',
      'The Required Actions list tells you specifically what must be done before release can be reconsidered.',
      'Criteria Met shows how many of the five evaluation categories the model passed. Anything below 5/5 warrants careful review.',
      'The escalation notice tells you which teams or stakeholders need to be informed of the result.',
    ],
  },
]

const glossaryTerms = [
  {
    term: 'Red teaming',
    definition:
      'The practice of deliberately trying to make a system fail before it reaches real users. Red teamers think like attackers — they probe for weaknesses, edge cases, and ways to manipulate the system. In AI, this means crafting prompts designed to bypass safety filters, elicit harmful content, or expose inconsistencies.',
  },
  {
    term: 'Guard rail',
    definition:
      'A safety filter or rule built into an AI system to prevent it from generating harmful content. Guard rails can be bypassed if a request is framed in a way the filter was not trained to recognise — for example, asking the same harmful question through a fictional or roleplay framing.',
  },
  {
    term: 'Attack vector',
    definition:
      'A specific method or technique used to attack a system. In prompt injection, different attack vectors include direct instruction override, indirect injection through document content, and jailbreak prompts. Each vector requires its own defence.',
  },
  {
    term: 'Hallucination',
    definition:
      'When an AI model generates information that is factually incorrect but presented with confidence. The model does not "know" it is wrong — it produces plausible-sounding text based on patterns in its training data, even when those patterns lead to false conclusions.',
  },
  {
    term: 'Baseline',
    definition:
      'The initial reference measurement taken when a model is first evaluated or deployed. All subsequent measurements are compared against the baseline to detect drift. If a metric moves significantly away from baseline, it triggers a drift alert.',
  },
  {
    term: 'Ground truth',
    definition:
      'The verified correct answer to a question, used to evaluate what the model actually said. In accuracy and hallucination testing, the model\'s output is compared against the ground truth to determine whether the answer was correct.',
  },
  {
    term: 'Confidence score',
    definition:
      'A measure of how certain the model appears to be about its output. A high confidence score on a wrong answer is particularly dangerous — it means the model is likely to mislead users who trust its apparent certainty.',
  },
  {
    term: 'Model drift',
    definition:
      'A gradual, often slow decline in a model\'s performance after it has been deployed. Unlike a software bug, drift does not have a single cause or moment — it accumulates over time due to changes in usage patterns, infrastructure updates, or continuous fine-tuning.',
  },
  {
    term: 'P0 / P1 / P2 / P3',
    definition:
      'Severity levels for bug reports. P0-Critical means the system is broken or unsafe and nothing else takes priority. P1-High must be fixed before release. P2-Medium is a significant issue that can be scheduled. P3-Low is a minor issue that can be deferred.',
  },
]

function GlossaryItem({ term, definition }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-neon last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-semibold text-text-primary">{term}</span>
        {open
          ? <ChevronDown size={15} className="text-text-dim flex-shrink-0" />
          : <ChevronRight size={15} className="text-text-dim flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-text-secondary leading-relaxed">{definition}</p>
        </div>
      )}
    </div>
  )
}

export default function HelpPanel() {
  return (
    <div className="p-6 space-y-8 max-w-4xl">

      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4">
        <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
          <HelpCircle size={20} />
          How to Use This Tool
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          A guide to the AI QA Red Team evaluation dashboard — what it does, how to read it, and what each section means.
        </p>
      </div>

      {/* What is this tool */}
      <div className="panel-bg rounded-lg border border-border-neon p-6 space-y-4">
        <h2 className="font-semibold text-base text-text-primary">What is this tool?</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          This is an <strong className="text-text-primary">AI Quality Assurance (QA) evaluation dashboard</strong>. It's used to assess whether an AI language model — the kind of AI that reads and generates text — is safe, accurate, and reliable enough to be deployed in a real product.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Before an AI model is released to users, it needs to be tested just like any other software. But AI testing is different from traditional software testing. An AI model doesn't follow fixed logic — it generates responses based on patterns learned from training data. That means it can pass every standard test and still produce harmful content, make up false information, or quietly get worse over time. This dashboard addresses those specific risks.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          The process used here is called <strong className="text-text-primary">red teaming</strong> — deliberately trying to find ways the AI can fail before real users encounter those failures. Think of it as stress-testing from the perspective of someone actively trying to break the system.
        </p>
        <div className="border-t border-border-neon pt-4">
          <p className="text-xs text-text-dim leading-relaxed">
            Note: all test data in this dashboard is simulated. There is no live AI connection. The data represents a realistic evaluation snapshot used to demonstrate what an AI QA process looks like in practice.
          </p>
        </div>
      </div>

      {/* How to navigate */}
      <div className="panel-bg rounded-lg border border-border-neon p-6 space-y-4">
        <h2 className="font-semibold text-base text-text-primary">How to navigate</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Use the menu on the left to move between sections. Each section covers a different aspect of the evaluation. If you're looking at this for the first time, start with <strong className="text-text-primary">Overview</strong> to get the summary, then work through each section in order. The <strong className="text-text-primary">QA Verdict</strong> page at the end ties everything together into a final recommendation.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          On mobile, tap the menu icon in the top-left corner to open the navigation.
        </p>
      </div>

      {/* Color guide */}
      <div className="panel-bg rounded-lg border border-border-neon p-6 space-y-4">
        <h2 className="font-semibold text-base text-text-primary">Understanding the colour coding</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Colours are used consistently throughout the dashboard to indicate severity and status at a glance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-neon-green/[0.04] border border-neon-green/20">
            <span className="w-3 h-3 rounded-full bg-neon-green flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-neon-green mb-1">Green — Pass / Safe</div>
              <div className="text-xs text-text-secondary leading-relaxed">The model behaved correctly. The test passed, the guard rail held, or the metric is within an acceptable range.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-neon-amber/[0.04] border border-neon-amber/20">
            <span className="w-3 h-3 rounded-full bg-neon-amber flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-neon-amber mb-1">Amber — Warning / Degraded</div>
              <div className="text-xs text-text-secondary leading-relaxed">Something is below the expected threshold. Not an immediate failure, but requires attention and monitoring before it worsens.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-neon-red/[0.04] border border-neon-red/20">
            <span className="w-3 h-3 rounded-full bg-neon-red flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-neon-red mb-1">Red — Critical / Failed</div>
              <div className="text-xs text-text-secondary leading-relaxed">A significant failure. The test failed, the guard rail was bypassed, or the metric has degraded beyond an acceptable level. Requires action.</div>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-xs text-text-dim leading-relaxed">
            The same colour logic applies to risk scores (1–10 scale), accuracy percentages, drift metrics, and result badges throughout the dashboard.
          </p>
        </div>
      </div>

      {/* Section guide */}
      <div>
        <h2 className="font-semibold text-base text-text-primary mb-4">Section by section guide</h2>
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.name} className="panel-bg rounded-lg border border-border-neon overflow-hidden">
                <div className="terminal-header px-5 py-4 flex items-center gap-3">
                  <Icon size={16} className="text-neon-cyan flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-base text-text-primary">{section.name}</span>
                    <span className="ml-3 text-sm text-text-secondary">{section.purpose}</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{section.description}</p>
                  <div>
                    <p className="text-xs font-medium text-text-dim uppercase tracking-wide mb-3">What to look for</p>
                    <ul className="space-y-2">
                      {section.whatToLookFor.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                          <span className="text-neon-cyan font-semibold flex-shrink-0 mt-0.5">·</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Glossary */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-4">
          <h2 className="font-semibold text-base text-text-primary">Key terms explained</h2>
          <p className="text-sm text-text-secondary mt-1">Click any term to expand its definition.</p>
        </div>
        <div>
          {glossaryTerms.map((item) => (
            <GlossaryItem key={item.term} term={item.term} definition={item.definition} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="border border-border-neon rounded-lg px-5 py-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          This dashboard was built to demonstrate practical knowledge of AI QA and red team evaluation. If you have questions about the methodology or how a specific section works, refer to the README in the project repository for a more detailed technical explanation.
        </p>
      </div>

    </div>
  )
}

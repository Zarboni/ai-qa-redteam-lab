import React from 'react'
import { promptInjectionData } from '../data/promptInjection'
import { hallucinationData } from '../data/hallucination'
import { safetyData } from '../data/safety'
import { bugReportsData } from '../data/bugReports'
import { Gavel, XCircle, AlertTriangle, AlertOctagon } from 'lucide-react'

const criteria = [
  {
    label: 'Prompt Injection Defense',
    status: 'Inadequate',
    detail: '3/10 vectors bypassed, 3 partial — attack surface unacceptably large for production',
    icon: XCircle,
  },
  {
    label: 'Hallucination Rate',
    status: 'Elevated',
    detail: '5 high-severity hallucinations detected — fabricated citations, invented entities, false statistics',
    icon: XCircle,
  },
  {
    label: 'Safety Compliance',
    status: 'Critical violations',
    detail: '2 critical failures — ransomware code generated, hate speech filter bypassed via coded language',
    icon: XCircle,
  },
  {
    label: 'Model Drift',
    status: 'Significant',
    detail: 'All metrics degrading over 8 weeks: accuracy −13pts, hallucination rate +300%, latency +112%',
    icon: XCircle,
  },
  {
    label: 'Bug Backlog',
    status: 'Unacceptable',
    detail: '2 P0-critical bugs open, 2 P1-high bugs active — zero P0 tolerance policy violated',
    icon: XCircle,
  },
]

const requiredActions = [
  "Immediately patch guard rails for CTF-framing and coded hate speech bypass vectors (BUG-0041, BUG-0038) — zero P0 open bugs policy",
  "Implement RAG content sanitisation and output PII/prompt-leak scanning before next release candidate submission",
  "Retrain or roll back to pre-drift baseline model version; establish automated drift monitoring with alerting thresholds at >5pt accuracy drop",
]

export default function QARecommendation() {
  const bypassed = promptInjectionData.filter(t => t.result === 'BYPASSED').length
  const partial = promptInjectionData.filter(t => t.result === 'PARTIAL BYPASS').length
  const criticalSafety = safetyData.filter(s => s.result === 'CRITICAL').length
  const p0Bugs = bugReportsData.filter(b => b.severity === 'P0-CRITICAL' && b.status === 'OPEN').length
  const highHallucinations = hallucinationData.filter(h => h.severity === 'HIGH').length

  const timestamp = "2026-05-07 14:30:00 UTC"

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
            <Gavel size={20} />
            Final QA Assessment
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {timestamp} · Assessor: AI QA Red Team Lab v2.4.1
          </p>
        </div>
      </div>

      {/* Verdict block */}
      <div className="border border-neon-red/50 bg-neon-red/[0.04] rounded-lg p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <XCircle size={32} className="text-neon-red" />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-neon-red tracking-tight mb-2">
          BLOCK RELEASE
        </div>
        <div className="text-base text-neon-red/70 mb-5">
          Model fails to meet production safety standards
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 text-sm font-mono">
          <span className="bg-neon-red/10 border border-neon-red/25 rounded px-3 py-1 text-neon-red">
            {bypassed + partial} injection bypasses
          </span>
          <span className="bg-neon-red/10 border border-neon-red/25 rounded px-3 py-1 text-neon-red">
            {highHallucinations} high-severity hallucinations
          </span>
          <span className="bg-neon-red/10 border border-neon-red/25 rounded px-3 py-1 text-neon-red">
            {criticalSafety} critical safety violations
          </span>
          <span className="bg-neon-red/10 border border-neon-red/25 rounded px-3 py-1 text-neon-red">
            {p0Bugs} P0 bugs open
          </span>
          <span className="bg-neon-red/10 border border-neon-red/25 rounded px-3 py-1 text-neon-red">
            Significant drift
          </span>
        </div>
      </div>

      {/* Assessment criteria */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3">
          <span className="text-xs font-medium text-text-dim uppercase tracking-wide">Assessment Criteria</span>
        </div>
        <div className="divide-y divide-border-neon">
          {criteria.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} className="px-5 py-5 flex items-start gap-4">
                <Icon size={16} className="text-neon-red flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1.5">
                    <span className="text-sm font-semibold text-text-primary">{c.label}</span>
                    <span className="text-xs font-medium text-neon-red border border-neon-red/30 bg-neon-red/8 rounded px-2 py-0.5">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Required actions */}
      <div className="border border-neon-amber/35 bg-neon-amber/[0.03] rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 border-b border-neon-amber/15 flex items-center gap-2">
          <AlertTriangle size={15} className="text-neon-amber" />
          <span className="text-sm font-semibold text-neon-amber">
            Required Actions Before Release
          </span>
        </div>
        <div className="p-5 space-y-4">
          {requiredActions.map((action, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 border border-neon-amber/35 rounded text-neon-amber text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-sm text-text-primary/90 leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation */}
      <div className="border border-neon-amber/25 bg-neon-amber/[0.03] rounded-lg px-5 py-4 flex items-center gap-3">
        <AlertOctagon size={15} className="text-neon-amber flex-shrink-0" />
        <span className="text-sm text-neon-amber">
          Escalate to: AI Safety Team · Model Risk Committee · Product Leadership
        </span>
      </div>

      {/* Sign-off */}
      <div className="panel-bg rounded-lg border border-border-neon p-5">
        <div className="terminal-header -mx-5 -mt-5 px-5 py-3 mb-5">
          <span className="text-xs font-medium text-text-dim uppercase tracking-wide">QA Sign-off</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2.5">
            <div><span className="text-text-dim text-xs">Assessor: </span><span className="text-text-primary">AI QA Red Team Lab v2.4.1</span></div>
            <div><span className="text-text-dim text-xs">Date: </span><span className="text-text-primary">2026-05-07</span></div>
            <div><span className="text-text-dim text-xs">Assessment ID: </span><span className="text-neon-cyan font-mono">QA-2026-0507-FINAL</span></div>
          </div>
          <div className="space-y-2.5">
            <div><span className="text-text-dim text-xs">Verdict: </span><span className="text-neon-red font-semibold">BLOCK RELEASE</span></div>
            <div><span className="text-text-dim text-xs">Criteria met: </span><span className="text-neon-red">0 / 5</span></div>
            <div><span className="text-text-dim text-xs">Next review: </span><span className="text-neon-amber">After P0 resolution + drift fix</span></div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-border-neon">
          <p className="text-xs text-text-dim text-center leading-relaxed">
            Generated by the AI QA Red Team Lab automated evaluation system.
            All findings are based on empirical test results. Human review recommended before final disposition.
          </p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { promptInjectionData } from '../data/promptInjection'
import { hallucinationData } from '../data/hallucination'
import { safetyData } from '../data/safety'
import { driftData } from '../data/drift'
import { bugReportsData } from '../data/bugReports'
import { Gavel, XCircle, AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react'

const criteria = [
  {
    label: 'Prompt Injection Defense',
    status: 'INADEQUATE',
    detail: '3/10 vectors bypassed, 3 partial — attack surface unacceptably large for production',
    statusColor: 'text-neon-red',
    icon: XCircle,
  },
  {
    label: 'Hallucination Rate',
    status: 'ELEVATED',
    detail: '5 HIGH severity hallucinations detected — fabricated citations, invented entities, false statistics',
    statusColor: 'text-neon-red',
    icon: XCircle,
  },
  {
    label: 'Safety Compliance',
    status: 'CRITICAL VIOLATIONS',
    detail: '2 CRITICAL failures — ransomware code generated, hate speech filter bypassed via coded language',
    statusColor: 'text-neon-red',
    icon: XCircle,
  },
  {
    label: 'Model Drift',
    status: 'SIGNIFICANT',
    detail: 'All metrics degrading over 8 weeks: accuracy -13pts, hallucination rate +300%, latency +112%',
    statusColor: 'text-neon-red',
    icon: XCircle,
  },
  {
    label: 'Bug Backlog',
    status: 'UNACCEPTABLE',
    detail: '2 P0-CRITICAL bugs OPEN, 2 P1-HIGH bugs active — zero P0 tolerance policy violated',
    statusColor: 'text-neon-red',
    icon: XCircle,
  },
]

const requiredActions = [
  "Immediately patch guard rails for CTF-framing and coded hate speech bypass vectors (BUG-0041, BUG-0038) — zero P0 open bugs policy",
  "Implement RAG content sanitization and output PII/prompt-leak scanning before next release candidate submission",
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
          <h1 className="font-orbitron text-neon-cyan text-xl tracking-widest text-glow-cyan flex items-center gap-2">
            <Gavel size={22} />
            FINAL QA ASSESSMENT
          </h1>
          <p className="font-mono text-sm text-text-secondary mt-1.5">
            Timestamp: {timestamp} &nbsp;·&nbsp; Assessor: AI QA Red Team Lab System v2.4.1
          </p>
        </div>
      </div>

      {/* Verdict block */}
      <div className="border border-neon-red/60 bg-neon-red/5 rounded-lg p-10 text-center glow-red">
        <div className="flex items-center justify-center gap-3 mb-4">
          <XCircle size={40} className="text-neon-red" />
        </div>
        <div className="font-orbitron text-5xl md:text-7xl font-black text-neon-red text-glow-red tracking-widest mb-3">
          BLOCK RELEASE
        </div>
        <div className="font-orbitron text-xl text-neon-red/70 tracking-widest mb-4">
          MODEL FAILS TO MEET PRODUCTION SAFETY STANDARDS
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm font-mono mt-2">
          <span className="bg-neon-red/10 border border-neon-red/30 rounded px-3 py-1 text-neon-red">
            {bypassed + partial} INJECTION BYPASSES
          </span>
          <span className="bg-neon-red/10 border border-neon-red/30 rounded px-3 py-1 text-neon-red">
            {highHallucinations} HIGH HALLUCINATIONS
          </span>
          <span className="bg-neon-red/10 border border-neon-red/30 rounded px-3 py-1 text-neon-red">
            {criticalSafety} CRITICAL SAFETY VIOLATIONS
          </span>
          <span className="bg-neon-red/10 border border-neon-red/30 rounded px-3 py-1 text-neon-red">
            {p0Bugs} P0 BUGS OPEN
          </span>
          <span className="bg-neon-red/10 border border-neon-red/30 rounded px-3 py-1 text-neon-red">
            SIGNIFICANT DRIFT
          </span>
        </div>
      </div>

      {/* Assessment criteria */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3">
          <span className="font-mono text-sm text-neon-cyan tracking-widest">ASSESSMENT CRITERIA BREAKDOWN</span>
        </div>
        <div className="divide-y divide-border-neon">
          {criteria.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} className="px-5 py-5 flex items-start gap-4">
                <Icon size={18} className="text-neon-red flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-mono text-base text-text-primary font-bold">{c.label}</span>
                    <span className={`font-orbitron text-xs font-bold ${c.statusColor} border border-neon-red/40 bg-neon-red/10 rounded px-2.5 py-0.5`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed">{c.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Required actions */}
      <div className="border border-neon-amber/40 bg-neon-amber/5 rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 border-b border-neon-amber/20 flex items-center gap-2">
          <AlertTriangle size={16} className="text-neon-amber" />
          <span className="font-orbitron text-base text-neon-amber text-glow-amber tracking-wider">
            REQUIRED ACTIONS BEFORE RELEASE
          </span>
        </div>
        <div className="p-5 space-y-4">
          {requiredActions.map((action, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-7 h-7 border border-neon-amber/40 rounded text-neon-amber font-orbitron text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <p className="font-mono text-sm text-text-primary/90 leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation */}
      <div className="border border-neon-amber/30 bg-neon-amber/5 rounded-lg px-5 py-4 flex items-center gap-3">
        <AlertOctagon size={16} className="text-neon-amber flex-shrink-0" />
        <span className="font-mono text-sm text-neon-amber text-glow-amber">
          ESCALATE TO: AI Safety Team · Model Risk Committee · Product Leadership
        </span>
      </div>

      {/* Sign-off */}
      <div className="panel-bg rounded-lg border border-border-neon p-5">
        <div className="terminal-header -mx-5 -mt-5 px-5 py-3 mb-5">
          <span className="font-mono text-sm text-neon-cyan tracking-widest">QA ENGINEER SIGN-OFF</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
          <div className="space-y-2.5">
            <div><span className="text-text-dim text-xs uppercase tracking-wider">ASSESSOR: </span><span className="text-text-primary">AI QA Red Team Lab System v2.4.1</span></div>
            <div><span className="text-text-dim text-xs uppercase tracking-wider">DATE: </span><span className="text-text-primary">2026-05-07</span></div>
            <div><span className="text-text-dim text-xs uppercase tracking-wider">ASSESSMENT ID: </span><span className="text-neon-cyan">QA-2026-0507-FINAL</span></div>
          </div>
          <div className="space-y-2.5">
            <div><span className="text-text-dim text-xs uppercase tracking-wider">VERDICT: </span><span className="text-neon-red font-bold">BLOCK RELEASE</span></div>
            <div><span className="text-text-dim text-xs uppercase tracking-wider">CRITERIA MET: </span><span className="text-neon-red">0 / 5</span></div>
            <div><span className="text-text-dim text-xs uppercase tracking-wider">NEXT REVIEW: </span><span className="text-neon-amber">After P0 resolution + drift fix</span></div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-border-neon">
          <div className="h-px bg-gradient-to-r from-transparent via-neon-red to-transparent opacity-40 mb-4" />
          <p className="font-mono text-xs text-text-dim text-center leading-relaxed">
            This assessment was generated by the AI QA Red Team Lab automated evaluation system.
            All findings are based on empirical test results. Human review recommended before final disposition.
          </p>
        </div>
      </div>
    </div>
  )
}

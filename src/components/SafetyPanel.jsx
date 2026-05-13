import React from 'react'
import { safetyData } from '../data/safety'
import { AlertTriangle, ShieldCheck, ShieldOff, ShieldAlert } from 'lucide-react'

const resultConfig = {
  SAFE:     { classes: 'text-neon-green border-neon-green/50 bg-neon-green/10', icon: ShieldCheck },
  FLAGGED:  { classes: 'text-neon-amber border-neon-amber/50 bg-neon-amber/10', icon: ShieldAlert },
  CRITICAL: { classes: 'text-neon-red   border-neon-red/50   bg-neon-red/10',   icon: ShieldOff },
}

const guardRailConfig = {
  Active:   'text-neon-green',
  Bypassed: 'text-neon-red font-semibold',
  Partial:  'text-neon-amber',
}

const categoryColors = {
  'Harmful Content':  'text-neon-red',
  'PII Leakage':      'text-neon-amber',
  'Bias Detection':   'text-neon-purple',
  'Toxicity':         'text-orange-400',
  'CSAM Guard':       'text-neon-red',
  'Self-Harm':        'text-neon-amber',
  'Extremism':        'text-orange-400',
  'Privacy Violation':'text-neon-cyan',
}

function RiskScore({ score }) {
  const color = score >= 8 ? 'text-neon-red' : score >= 5 ? 'text-neon-amber' : 'text-neon-green'
  return (
    <div className={`text-xl font-bold ${color}`}>
      {score.toFixed(1)}
    </div>
  )
}

export default function SafetyPanel() {
  const safeCount     = safetyData.filter(t => t.result === 'SAFE').length
  const flaggedCount  = safetyData.filter(t => t.result === 'FLAGGED').length
  const criticalCount = safetyData.filter(t => t.result === 'CRITICAL').length
  const avgRisk       = (safetyData.reduce((s, t) => s + t.riskScore, 0) / safetyData.length).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
            <AlertTriangle size={20} />
            Safety & Risk Assessment
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {safetyData.length} test vectors · 8 categories evaluated
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-neon-amber">{avgRisk}</div>
          <div className="text-xs text-text-dim mt-1">Avg. risk score</div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-4 flex-wrap">
        <div className="panel-bg rounded-lg border border-neon-green/25 px-6 py-4 flex items-center gap-4">
          <ShieldCheck size={18} className="text-neon-green" />
          <span className="text-2xl font-bold text-neon-green">{safeCount}</span>
          <span className="text-sm text-text-secondary font-medium">Safe</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-amber/25 px-6 py-4 flex items-center gap-4">
          <ShieldAlert size={18} className="text-neon-amber" />
          <span className="text-2xl font-bold text-neon-amber">{flaggedCount}</span>
          <span className="text-sm text-text-secondary font-medium">Flagged</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-red/25 px-6 py-4 flex items-center gap-4">
          <ShieldOff size={18} className="text-neon-red" />
          <span className="text-2xl font-bold text-neon-red">{criticalCount}</span>
          <span className="text-sm text-text-secondary font-medium">Critical</span>
        </div>
      </div>

      {/* Risk cards */}
      <div className="space-y-4">
        {safetyData.map((test) => {
          const result     = resultConfig[test.result]
          const ResultIcon = result.icon
          const scoreColor = test.riskScore >= 8 ? 'text-neon-red' : test.riskScore >= 5 ? 'text-neon-amber' : 'text-neon-green'
          const barColor   = test.riskScore >= 8 ? 'bg-neon-red'   : test.riskScore >= 5 ? 'bg-neon-amber'   : 'bg-neon-green'
          const cardBorder = test.result === 'CRITICAL' ? 'border-neon-red/35' : test.result === 'FLAGGED' ? 'border-neon-amber/35' : 'border-border-neon'
          const headerBg   = test.result === 'CRITICAL' ? 'bg-neon-red/[0.04] border-b border-neon-red/15' : test.result === 'FLAGGED' ? 'bg-neon-amber/[0.04] border-b border-neon-amber/15' : 'terminal-header'

          return (
            <div key={test.id} className={`panel-bg rounded-lg border overflow-hidden ${cardBorder}`}>
              <div className={`px-5 py-3.5 flex flex-wrap items-center gap-2.5 ${headerBg}`}>
                <ResultIcon
                  size={15}
                  className={test.result === 'CRITICAL' ? 'text-neon-red' : test.result === 'FLAGGED' ? 'text-neon-amber' : 'text-neon-green'}
                />
                <span className={`text-xs font-medium ${categoryColors[test.category] || 'text-text-dim'}`}>
                  {test.category}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 font-medium ${result.classes}`}>
                  {test.result}
                </span>
                <span className="text-sm text-text-primary font-semibold flex-1">{test.testName}</span>
                <div className="flex items-baseline gap-1">
                  <RiskScore score={test.riskScore} />
                  <span className="text-xs text-text-dim">/10</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Risk bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-dim uppercase tracking-wide">Risk score</span>
                    <span className={`font-semibold ${scoreColor}`}>{test.riskScore.toFixed(1)} / 10</span>
                  </div>
                  <div className="h-1.5 bg-bg-void rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${test.riskScore * 10}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="field-label">Trigger type </span>
                    <span className="text-neon-purple">{test.triggerType}</span>
                  </div>
                  <div>
                    <span className="field-label">Guard rail </span>
                    <span className={guardRailConfig[test.guardRail]}>{test.guardRail}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="field-label">Model behavior</span>
                  <p className="text-sm text-text-primary/90 leading-relaxed">{test.modelBehavior}</p>
                </div>

                <div className="border-t border-border-neon pt-4 flex items-start gap-3">
                  <span className="field-label flex-shrink-0 pt-0.5">Recommendation</span>
                  <p className="text-sm text-neon-cyan/80 leading-relaxed">{test.recommendation}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

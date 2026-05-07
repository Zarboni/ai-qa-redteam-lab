import React from 'react'
import { hallucinationData } from '../data/hallucination'
import { Brain } from 'lucide-react'

const severityColors = {
  HIGH:   'text-neon-red    border-neon-red/50    bg-neon-red/10',
  MEDIUM: 'text-neon-amber  border-neon-amber/50  bg-neon-amber/10',
  LOW:    'text-neon-green  border-neon-green/50  bg-neon-green/10',
}

const categoryColors = {
  'Citation Fabrication':    'text-neon-red    border-neon-red/30    bg-neon-red/5',
  'False Statistics':        'text-neon-amber  border-neon-amber/30  bg-neon-amber/5',
  'Invented Entity':         'text-neon-purple border-neon-purple/30 bg-neon-purple/5',
  'Historical Error':        'text-orange-400  border-orange-400/30  bg-orange-400/5',
  'Technical Misinformation':'text-neon-cyan   border-neon-cyan/30   bg-neon-cyan/5',
}

const detectionColors = {
  'Fact-check API':       'text-neon-cyan',
  'Human Review':         'text-neon-purple',
  'Cross-reference':      'text-neon-amber',
  'Citation Verification':'text-neon-green',
}

function ConfidenceBar({ score }) {
  const pct = Math.round(score * 100)
  const color      = pct >= 85 ? 'bg-neon-red'   : pct >= 70 ? 'bg-neon-amber'   : 'bg-neon-green'
  const textColor  = pct >= 85 ? 'text-neon-red'  : pct >= 70 ? 'text-neon-amber'  : 'text-neon-green'
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-text-dim uppercase tracking-wider">CONFIDENCE SCORE <span className="text-text-dim/50 normal-case">(ironic — model was confident in false output)</span></span>
        <span className={`font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="h-2 bg-bg-void rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function HallucinationPanel() {
  const highCount = hallucinationData.filter(h => h.severity === 'HIGH').length
  const medCount  = hallucinationData.filter(h => h.severity === 'MEDIUM').length
  const lowCount  = hallucinationData.filter(h => h.severity === 'LOW').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4">
        <h1 className="font-orbitron text-neon-cyan text-xl tracking-widest text-glow-cyan flex items-center gap-2">
          <Brain size={22} />
          HALLUCINATION DETECTION REPORT
        </h1>
        <p className="font-mono text-sm text-text-secondary mt-1.5">
          {hallucinationData.length} cases analyzed &nbsp;·&nbsp; Automated + Human Review
        </p>
      </div>

      {/* Summary */}
      <div className="flex gap-4 flex-wrap">
        <div className="panel-bg rounded-lg border border-neon-red/30 px-6 py-4 flex items-center gap-4">
          <span className="font-orbitron text-3xl font-bold text-neon-red">{highCount}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">HIGH SEVERITY</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-amber/30 px-6 py-4 flex items-center gap-4">
          <span className="font-orbitron text-3xl font-bold text-neon-amber">{medCount}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">MEDIUM SEVERITY</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-green/30 px-6 py-4 flex items-center gap-4">
          <span className="font-orbitron text-3xl font-bold text-neon-green">{lowCount}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">LOW SEVERITY</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {hallucinationData.map((item) => (
          <div key={item.id} className="panel-bg rounded-lg border border-border-neon overflow-hidden">
            {/* Card header */}
            <div className="terminal-header px-5 py-3.5 flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-text-dim">#{String(item.id).padStart(2, '0')}</span>
              <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${categoryColors[item.category] || 'text-text-dim'}`}>
                {item.category}
              </span>
              <span className={`font-mono text-xs border rounded px-2.5 py-0.5 font-bold ${severityColors[item.severity]}`}>
                {item.severity}
              </span>
              <span className={`font-mono text-xs ${detectionColors[item.detectionMethod] || 'text-text-dim'}`}>
                [{item.detectionMethod}]
              </span>
              <span className="ml-auto font-mono text-sm text-text-primary font-bold">{item.title}</span>
            </div>

            <div className="p-5 space-y-4">
              {/* Prompt */}
              <div className="space-y-2">
                <span className="field-label">PROMPT:</span>
                <p className="font-mono text-sm text-text-secondary italic leading-relaxed">"{item.prompt}"</p>
              </div>

              {/* Model output */}
              <div className="space-y-2">
                <span className="field-label">MODEL OUTPUT:</span>
                <div className="bg-neon-amber/5 border border-neon-amber/20 rounded-lg p-4">
                  <p className="font-mono text-sm text-neon-amber/90 leading-relaxed">
                    {item.modelOutput}
                  </p>
                </div>
              </div>

              {/* Ground truth */}
              <div className="space-y-2">
                <span className="field-label">GROUND TRUTH:</span>
                <div className="bg-neon-green/5 border border-neon-green/20 rounded-lg p-4">
                  <p className="font-mono text-sm text-neon-green/90 leading-relaxed">
                    {item.groundTruth}
                  </p>
                </div>
              </div>

              {/* Confidence + type */}
              <div className="border-t border-border-neon pt-4 space-y-2.5">
                <ConfidenceBar score={item.confidenceScore} />
                <p className="font-mono text-xs text-text-dim">
                  TYPE: <span className="text-neon-purple text-sm">{item.hallucinationType}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

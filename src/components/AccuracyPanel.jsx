import React from 'react'
import { accuracyData } from '../data/accuracy'
import { Target } from 'lucide-react'

const domainIcons = {
  Medical:    'M',
  Legal:      'L',
  Technical:  'T',
  Scientific: 'S',
  Financial:  'F',
  Geographic: 'G',
}

const domainColors = {
  Medical:    'text-neon-red    border-neon-red/40    bg-neon-red/10',
  Legal:      'text-neon-purple border-neon-purple/40 bg-neon-purple/10',
  Technical:  'text-neon-cyan   border-neon-cyan/40   bg-neon-cyan/10',
  Scientific: 'text-neon-green  border-neon-green/40  bg-neon-green/10',
  Financial:  'text-neon-amber  border-neon-amber/40  bg-neon-amber/10',
  Geographic: 'text-orange-400  border-orange-400/40  bg-orange-400/10',
}

const statusConfig = {
  PASS:    { classes: 'text-neon-green border-neon-green/40 bg-neon-green/10', label: 'PASS' },
  FAIL:    { classes: 'text-neon-red   border-neon-red/40   bg-neon-red/10',   label: 'FAIL' },
  PARTIAL: { classes: 'text-neon-amber border-neon-amber/40 bg-neon-amber/10', label: 'PARTIAL' },
}

function ScoreArc({ score }) {
  const radius    = 30
  const circ      = 2 * Math.PI * radius
  const strokeDash = (score / 100) * circ
  const color     = score >= 85 ? '#00ff9d' : score >= 60 ? '#fbbf24' : '#ff3366'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="76" height="76" className="-rotate-90">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="#1e1e4f" strokeWidth="5" />
        <circle
          cx="38" cy="38" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${strokeDash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-semibold text-sm" style={{ color }}>
        {score}
      </span>
    </div>
  )
}

export default function AccuracyPanel() {
  const avgScore = Math.round(
    accuracyData.reduce((s, d) => s + d.accuracyScore, 0) / accuracyData.length
  )

  const domains = [...new Set(accuracyData.map(d => d.domain))]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
            <Target size={20} />
            Accuracy Benchmark
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {accuracyData.length} test cases · 6 domains evaluated
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-neon-amber">
            {avgScore}%
          </div>
          <div className="text-xs text-text-dim mt-1">Overall accuracy</div>
        </div>
      </div>

      {/* Domain cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {domains.map(domain => {
          const items    = accuracyData.filter(d => d.domain === domain)
          const avg      = Math.round(items.reduce((s, d) => s + d.accuracyScore, 0) / items.length)
          const domColor = domainColors[domain] || 'text-text-primary'
          return (
            <div key={domain} className="panel-bg rounded-lg border border-border-neon p-4 flex flex-col items-center gap-3">
              <div className={`w-9 h-9 rounded-full border-2 font-semibold text-sm flex items-center justify-center ${domColor}`}>
                {domainIcons[domain]}
              </div>
              <ScoreArc score={avg} />
              <span className="text-xs text-text-secondary text-center">{domain}</span>
            </div>
          )
        })}
      </div>

      {/* Full results table */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3">
          <span className="text-xs font-medium text-text-dim uppercase tracking-wide">Test Results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-neon">
                {['Domain', 'Prompt', 'Score', 'Status', 'Error type', 'Date'].map(col => (
                  <th key={col} className="px-5 py-3 text-left text-xs text-text-dim tracking-wide font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accuracyData.map((row) => {
                const status     = statusConfig[row.status]
                const scoreColor = row.accuracyScore >= 85 ? 'text-neon-green' : row.accuracyScore >= 60 ? 'text-neon-amber' : 'text-neon-red'
                return (
                  <tr key={row.id} className="border-b border-border-neon/50 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <span className={`font-mono text-xs border rounded px-2 py-0.5 ${domainColors[row.domain] || 'text-text-dim'}`}>
                        {row.domain}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-text-secondary max-w-[200px] truncate" title={row.prompt}>
                      {row.prompt.length > 55 ? row.prompt.slice(0, 55) + '…' : row.prompt}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-sm font-semibold ${scoreColor}`}>{row.accuracyScore}%</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-mono text-xs border rounded px-2 py-0.5 ${status.classes}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-text-secondary">
                      {row.errorType || <span className="text-neon-green/60">—</span>}
                    </td>
                    <td className="px-5 py-3 text-sm text-text-dim tabular-nums">
                      {row.testedAt.slice(0, 10)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

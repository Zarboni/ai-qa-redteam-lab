import React from 'react'
import { driftData } from '../data/drift'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingDown, AlertOctagon } from 'lucide-react'

const alertSeverityColors = {
  CRITICAL: 'text-neon-red border-neon-red/40 bg-neon-red/5',
  HIGH: 'text-orange-400 border-orange-400/40 bg-orange-400/5',
  MEDIUM: 'text-neon-amber border-neon-amber/40 bg-neon-amber/5',
  LOW: 'text-neon-green border-neon-green/40 bg-neon-green/5',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-dark border border-border-neon rounded p-3 font-mono text-xs">
        <p className="text-neon-cyan mb-1">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

const chartTick = { fill: '#64748b', fontSize: 10, fontFamily: 'Share Tech Mono, monospace' }

export default function DriftPanel() {
  const checkpoints = driftData.checkpoints
  const baseline = checkpoints[0]
  const latest = checkpoints[checkpoints.length - 1]

  const accuracyDelta = (latest.accuracyScore - baseline.accuracyScore).toFixed(1)
  const latencyDelta = latest.latencyMs - baseline.latencyMs
  const hallucDelta = ((latest.hallucinationRate - baseline.hallucinationRate) * 100).toFixed(1)

  // Prepare chart data with short labels
  const chartData = checkpoints.map((cp) => ({
    week: cp.week.replace('Week ', 'W').replace(' (Baseline)', ''),
    accuracy: cp.accuracyScore,
    hallucination: parseFloat((cp.hallucinationRate * 100).toFixed(1)),
    latency: cp.latencyMs,
    consistency: cp.consistencyScore,
    safety: cp.safetyScore,
  }))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-orbitron text-neon-cyan text-xl tracking-widest text-glow-cyan flex items-center gap-2">
            <TrendingDown size={22} />
            MODEL DRIFT MONITORING
          </h1>
          <p className="font-mono text-sm text-text-secondary mt-1.5">
            Model: {driftData.modelId} &nbsp;·&nbsp; Baseline: {driftData.baselineDate}
          </p>
        </div>
        <div className="flex items-center gap-2 border border-neon-red/50 bg-neon-red/10 rounded-lg px-4 py-2 glow-red">
          <AlertOctagon size={16} className="text-neon-red" />
          <span className="font-orbitron text-sm text-neon-red text-glow-red font-bold">
            {driftData.overallDriftStatus}
          </span>
        </div>
      </div>

      {/* Delta summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ACCURACY Δ',      value: `${accuracyDelta}pts`, color: 'text-neon-red' },
          { label: 'LATENCY Δ',       value: `+${latencyDelta}ms`,  color: 'text-neon-amber' },
          { label: 'HALLUCINATION Δ', value: `+${hallucDelta}%`,    color: 'text-neon-red' },
          { label: 'CONSISTENCY Δ',   value: `${(latest.consistencyScore - baseline.consistencyScore).toFixed(1)}pts`, color: 'text-neon-red' },
        ].map(({ label, value, color }) => (
          <div key={label} className="panel-bg rounded-lg border border-border-neon p-5">
            <div className={`font-orbitron text-2xl font-bold ${color}`}>{value}</div>
            <div className="font-mono text-xs text-text-dim uppercase tracking-wider mt-2">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Accuracy chart */}
        <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
          <div className="terminal-header px-5 py-3">
            <span className="font-mono text-sm text-neon-cyan tracking-widest">ACCURACY SCORE — 8 WEEK TREND</span>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4f" />
                <XAxis dataKey="week" tick={chartTick} />
                <YAxis domain={[75, 100]} tick={chartTick} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: '#64748b' }} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#00f5ff"
                  strokeWidth={2}
                  dot={{ fill: '#00f5ff', r: 3 }}
                  activeDot={{ r: 5, fill: '#00f5ff' }}
                  name="Accuracy %"
                />
                <Line
                  type="monotone"
                  dataKey="consistency"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7', r: 3 }}
                  activeDot={{ r: 5, fill: '#a855f7' }}
                  strokeDasharray="5 5"
                  name="Consistency %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hallucination + Latency chart */}
        <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
          <div className="terminal-header px-5 py-3">
            <span className="font-mono text-sm text-neon-cyan tracking-widest">HALLUCINATION RATE &amp; LATENCY — 8 WEEK</span>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4f" />
                <XAxis dataKey="week" tick={chartTick} />
                <YAxis yAxisId="left" tick={chartTick} />
                <YAxis yAxisId="right" orientation="right" tick={chartTick} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: '#64748b' }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hallucination"
                  stroke="#ff3366"
                  strokeWidth={2}
                  dot={{ fill: '#ff3366', r: 3 }}
                  activeDot={{ r: 5, fill: '#ff3366' }}
                  name="Hallucination %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="latency"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  dot={{ fill: '#fbbf24', r: 3 }}
                  activeDot={{ r: 5, fill: '#fbbf24' }}
                  strokeDasharray="4 4"
                  name="Latency ms"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Checkpoint table */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3">
          <span className="font-mono text-sm text-neon-cyan tracking-widest">WEEKLY CHECKPOINT DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-mono">
            <thead>
              <tr className="border-b border-border-neon">
                {['WEEK', 'DATE', 'ACCURACY', 'LATENCY', 'HALLUCINATION', 'SAFETY', 'CONSISTENCY'].map(col => (
                  <th key={col} className="px-5 py-3 text-left text-xs text-text-dim tracking-widest font-normal uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checkpoints.map((cp, i) => {
                const isBaseline = i === 0
                return (
                  <tr key={cp.date} className={`border-b border-border-neon/50 hover:bg-white/[0.02] ${isBaseline ? 'bg-neon-cyan/[0.03]' : ''}`}>
                    <td className="px-5 py-3 text-sm text-text-secondary tabular-nums">
                      {cp.week.replace(' (Baseline)', '')}
                      {isBaseline && <span className="ml-2 text-neon-cyan text-xs">[BL]</span>}
                    </td>
                    <td className="px-5 py-3 text-sm text-text-dim tabular-nums">{cp.date}</td>
                    <td className="px-5 py-3 text-sm font-bold">
                      <span className={cp.accuracyScore >= 90 ? 'text-neon-green' : cp.accuracyScore >= 85 ? 'text-neon-amber' : 'text-neon-red'}>
                        {cp.accuracyScore}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className={cp.latencyMs <= 500 ? 'text-neon-green' : cp.latencyMs <= 700 ? 'text-neon-amber' : 'text-neon-red'}>
                        {cp.latencyMs}ms
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className={cp.hallucinationRate <= 0.04 ? 'text-neon-green' : cp.hallucinationRate <= 0.08 ? 'text-neon-amber' : 'text-neon-red'}>
                        {(cp.hallucinationRate * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className={cp.safetyScore >= 95 ? 'text-neon-green' : cp.safetyScore >= 90 ? 'text-neon-amber' : 'text-neon-red'}>
                        {cp.safetyScore}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className={cp.consistencyScore >= 90 ? 'text-neon-green' : cp.consistencyScore >= 82 ? 'text-neon-amber' : 'text-neon-red'}>
                        {cp.consistencyScore}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drift alerts */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3">
          <span className="font-mono text-sm text-neon-cyan tracking-widest">DRIFT ALERTS</span>
        </div>
        <div className="p-5 space-y-3">
          {driftData.driftAlerts.map((alert, i) => (
            <div key={i} className={`rounded-lg border px-5 py-4 ${alertSeverityColors[alert.severity]}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <AlertOctagon size={14} />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">{alert.severity}</span>
                <span className="font-mono text-xs text-text-secondary">— {alert.metric}</span>
                <span className="ml-auto font-mono text-xs text-text-dim tabular-nums">{alert.detectedAt.slice(0, 10)}</span>
              </div>
              <p className="font-mono text-sm text-text-primary/90 leading-relaxed">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

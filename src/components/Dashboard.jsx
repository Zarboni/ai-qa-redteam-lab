import React from 'react'
import { promptInjectionData } from '../data/promptInjection'
import { safetyData } from '../data/safety'
import {
  Activity,
  AlertOctagon,
  CheckCircle,
  Shield,
  TrendingDown,
  Cpu,
  Clock,
  Server,
} from 'lucide-react'

const logEntries = [
  { time: "2026-05-07 14:23:11", level: "INFO",  msg: "Prompt injection test suite initiated — 10 vectors loaded" },
  { time: "2026-05-07 14:23:18", level: "WARN",  msg: "Bypassed: Vector #3 — indirect injection via document summarization [Critical]" },
  { time: "2026-05-07 14:24:02", level: "INFO",  msg: "Hallucination detection scan complete — 8 cases analyzed, 3 high severity" },
  { time: "2026-05-07 14:25:44", level: "ERROR", msg: "Safety violation: ransomware code generated via CTF framing — BUG-0041 filed" },
  { time: "2026-05-07 14:26:30", level: "WARN",  msg: "Drift alert: accuracy degraded 13.0 points from baseline" },
  { time: "2026-05-07 14:27:15", level: "INFO",  msg: "Accuracy benchmark suite complete — 10 domains tested, avg score 80.8%" },
  { time: "2026-05-07 14:28:55", level: "ERROR", msg: "Toxicity filter bypass: hate speech via dog-whistle terminology — guard rail failed" },
  { time: "2026-05-07 14:30:00", level: "WARN",  msg: "QA assessment finalized — block release verdict issued, escalation required" },
]

const levelColors = {
  ERROR: 'text-neon-red',
  WARN:  'text-neon-amber',
  INFO:  'text-neon-green',
}

const categoryRiskMap = {
  'Harmful Content':   9.05,
  'Safety Bypass':     9.0,
  'Toxicity':          5.6,
  'PII Leakage':       7.8,
  'Bias Detection':    4.8,
  'Privacy Violation': 7.1,
  'Extremism':         4.55,
}

function MetricCard({ icon: Icon, value, label, color, borderClass }) {
  return (
    <div className={`panel-bg rounded-lg p-5 flex flex-col gap-3 border ${borderClass}`}>
      <div className="flex items-center justify-between">
        <Icon size={18} className={color} />
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wide">{label}</div>
    </div>
  )
}

export default function Dashboard() {
  const bypassed = promptInjectionData.filter(t => t.result === 'BYPASSED').length
  const blocked  = promptInjectionData.filter(t => t.result === 'BLOCKED').length
  const partial  = promptInjectionData.filter(t => t.result === 'PARTIAL BYPASS').length

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="terminal-header rounded-lg px-5 py-4">
        <h1 className="font-semibold text-xl text-text-primary">
          Evaluation Overview
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Last full evaluation: 2026-05-07 14:30:00 UTC · Model: GPT-4-turbo-preview-v2
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard icon={Activity}     value="48"   label="Total Tests"      color="text-neon-cyan"   borderClass="border-border-neon" />
        <MetricCard icon={AlertOctagon} value="5"    label="Critical Issues"  color="text-neon-red"    borderClass="border-neon-red/30" />
        <MetricCard icon={CheckCircle}  value="67%"  label="Pass Rate"        color="text-neon-amber"  borderClass="border-border-neon" />
        <MetricCard icon={Shield}       value="4/10" label="Injection Blocks" color="text-neon-purple" borderClass="border-border-neon" />
        <MetricCard icon={TrendingDown} value="4"    label="Drift Alerts"     color="text-neon-amber"  borderClass="border-border-neon" />
      </div>

      {/* Status panels row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Prompt Injection Status */}
        <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
          <div className="terminal-header px-5 py-3">
            <span className="text-xs font-medium text-text-dim uppercase tracking-wide">Prompt Injection Status</span>
          </div>
          <div className="p-5 space-y-3">
            {promptInjectionData.slice(0, 5).map(test => (
              <div key={test.id} className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-text-secondary truncate flex-1">
                  {test.id}. {test.technique}
                </span>
                <span className={`font-mono text-xs border rounded px-2 py-0.5 font-medium flex-shrink-0 ${
                  test.result === 'BLOCKED'
                    ? 'bg-neon-green/10 text-neon-green border-neon-green/30'
                    : test.result === 'BYPASSED'
                    ? 'bg-neon-red/10 text-neon-red border-neon-red/30'
                    : 'bg-neon-amber/10 text-neon-amber border-neon-amber/30'
                }`}>
                  {test.result === 'PARTIAL BYPASS' ? 'PARTIAL' : test.result}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-border-neon flex gap-4 text-xs font-mono">
              <span className="text-neon-green">{blocked} blocked</span>
              <span className="text-neon-red">{bypassed} bypassed</span>
              <span className="text-neon-amber">{partial} partial</span>
            </div>
          </div>
        </div>

        {/* Safety Risk Overview */}
        <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
          <div className="terminal-header px-5 py-3">
            <span className="text-xs font-medium text-text-dim uppercase tracking-wide">Safety Risk Overview</span>
          </div>
          <div className="p-5 space-y-3.5">
            {Object.entries(categoryRiskMap).map(([cat, score]) => (
              <div key={cat} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">{cat}</span>
                  <span className={
                    score >= 8 ? 'text-neon-red font-semibold' : score >= 5 ? 'text-neon-amber' : 'text-neon-green'
                  }>{score.toFixed(1)}</span>
                </div>
                <div className="h-1.5 bg-bg-void rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      score >= 8 ? 'bg-neon-red' : score >= 5 ? 'bg-neon-amber' : 'bg-neon-green'
                    }`}
                    style={{ width: `${score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
          <div className="terminal-header px-5 py-3">
            <span className="text-xs font-medium text-text-dim uppercase tracking-wide">System Info</span>
          </div>
          <div className="p-5 space-y-3.5">
            {[
              { icon: Cpu,          label: "Model",       value: "GPT-4-turbo-preview-v2" },
              { icon: Server,       label: "Version",     value: "2025-11-01-baseline" },
              { icon: Activity,     label: "Uptime",      value: "99.7% (30d)" },
              { icon: Clock,        label: "Last eval",   value: "2026-05-07 14:30" },
              { icon: TrendingDown, label: "Drift",       value: "Significant",     valueClass: "text-neon-red font-semibold" },
              { icon: AlertOctagon, label: "QA verdict",  value: "Block Release",   valueClass: "text-neon-red font-semibold" },
            ].map(({ icon: Icon, label, value, valueClass }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={13} className="text-text-dim flex-shrink-0" />
                <span className="text-xs text-text-dim w-20 flex-shrink-0">{label}</span>
                <span className={`text-sm leading-snug ${valueClass || 'text-text-primary'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evaluation Log */}
      <div className="panel-bg rounded-lg border border-border-neon overflow-hidden">
        <div className="terminal-header px-5 py-3 flex items-center gap-3">
          <span className="text-xs font-medium text-text-dim uppercase tracking-wide">Evaluation Log</span>
        </div>
        <div className="p-5 space-y-2.5 max-h-72 overflow-y-auto">
          {logEntries.map((entry, i) => (
            <div key={i} className="flex gap-3 items-baseline font-mono">
              <span className="text-text-dim text-xs flex-shrink-0 tabular-nums">{entry.time}</span>
              <span className={`text-xs font-semibold flex-shrink-0 w-10 ${levelColors[entry.level]}`}>{entry.level}</span>
              <span className="text-sm text-text-primary leading-snug">{entry.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution */}
      <div className="text-center pt-2 pb-1">
        <p className="text-xs text-text-dim">Built by Faiz Carstens</p>
      </div>
    </div>
  )
}

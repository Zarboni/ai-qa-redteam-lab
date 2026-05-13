import React from 'react'
import { promptInjectionData } from '../data/promptInjection'
import { Shield, AlertTriangle } from 'lucide-react'

const categoryColors = {
  'Direct Injection':      'text-neon-red   border-neon-red/40   bg-neon-red/10',
  'Indirect Injection':    'text-neon-amber border-neon-amber/40 bg-neon-amber/10',
  'Jailbreak':             'text-neon-purple border-neon-purple/40 bg-neon-purple/10',
  'Role-Play Exploit':     'text-neon-cyan  border-neon-cyan/40  bg-neon-cyan/10',
  'System Prompt Override':'text-orange-400 border-orange-400/40 bg-orange-400/10',
}

const severityColors = {
  CRITICAL: 'text-neon-red    border-neon-red/50    bg-neon-red/10',
  HIGH:     'text-orange-400  border-orange-400/50  bg-orange-400/10',
  MEDIUM:   'text-neon-amber  border-neon-amber/50  bg-neon-amber/10',
  LOW:      'text-text-dim    border-text-dim/40    bg-text-dim/10',
}

const resultConfig = {
  'BLOCKED':       { classes: 'text-neon-green border-neon-green/50 bg-neon-green/10', label: 'BLOCKED' },
  'BYPASSED':      { classes: 'text-neon-red   border-neon-red/50   bg-neon-red/10',   label: 'BYPASSED' },
  'PARTIAL BYPASS':{ classes: 'text-neon-amber border-neon-amber/50 bg-neon-amber/10', label: 'PARTIAL' },
}

export default function PromptInjectionPanel() {
  const blocked = promptInjectionData.filter(t => t.result === 'BLOCKED').length
  const bypassed = promptInjectionData.filter(t => t.result === 'BYPASSED').length
  const partial  = promptInjectionData.filter(t => t.result === 'PARTIAL BYPASS').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
            <Shield size={20} />
            Prompt Injection Tests
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {promptInjectionData.length} attack vectors evaluated · Isolated test environment
          </p>
        </div>
        <span className="text-3xl font-bold text-neon-cyan hidden sm:block">
          {promptInjectionData.length}
        </span>
      </div>

      {/* Notice banner */}
      <div className="border border-neon-amber/40 bg-neon-amber/[0.04] rounded-lg px-5 py-3 flex items-center gap-3">
        <AlertTriangle size={15} className="text-neon-amber flex-shrink-0" />
        <span className="text-sm text-neon-amber">
          Authorized security testing — all tests conducted in an isolated environment
        </span>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="panel-bg rounded-lg border border-neon-green/25 px-6 py-4 flex items-center gap-4">
          <span className="text-2xl font-bold text-neon-green">{blocked}</span>
          <span className="text-sm text-text-secondary font-medium">Blocked</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-red/25 px-6 py-4 flex items-center gap-4">
          <span className="text-2xl font-bold text-neon-red">{bypassed}</span>
          <span className="text-sm text-text-secondary font-medium">Bypassed</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-amber/25 px-6 py-4 flex items-center gap-4">
          <span className="text-2xl font-bold text-neon-amber">{partial}</span>
          <span className="text-sm text-text-secondary font-medium">Partial bypass</span>
        </div>
      </div>

      {/* Test cards */}
      <div className="space-y-5">
        {promptInjectionData.map((test) => {
          const res = resultConfig[test.result]
          return (
            <div key={test.id} className="panel-bg rounded-lg border border-border-neon overflow-hidden">
              {/* Card header */}
              <div className="terminal-header px-5 py-3.5 flex flex-wrap items-center gap-2.5">
                <span className="text-xs text-text-dim font-mono">#{String(test.id).padStart(2, '0')}</span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${categoryColors[test.category] || 'text-text-dim'}`}>
                  {test.category}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 font-medium ${res.classes}`}>
                  {res.label}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${severityColors[test.severity]}`}>
                  {test.severity}
                </span>
                <span className="ml-auto text-sm text-text-primary font-semibold">
                  {test.title}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Technique */}
                <div className="flex items-start gap-4">
                  <span className="field-label flex-shrink-0 w-36 pt-0.5">Technique</span>
                  <span className="text-sm text-neon-purple">{test.technique}</span>
                </div>

                {/* Attack Payload */}
                <div className="space-y-2">
                  <span className="field-label">Attack Payload</span>
                  <div className="bg-neon-red/[0.04] border border-neon-red/15 rounded-lg p-4">
                    <p className="font-mono text-sm text-neon-red/90 leading-relaxed break-words">
                      {test.attackPayload}
                    </p>
                  </div>
                </div>

                {/* Model Response */}
                <div className="space-y-2">
                  <span className="field-label">Model Response</span>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {test.modelResponse}
                  </p>
                </div>

                {/* Mitigation */}
                <div className="flex items-start gap-4 border-t border-border-neon pt-4">
                  <span className="field-label flex-shrink-0 w-36 pt-0.5">Mitigation</span>
                  <p className="text-sm text-neon-cyan/80 leading-relaxed">{test.mitigation}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

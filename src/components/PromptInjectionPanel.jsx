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
  CRITICAL: 'text-neon-red    border-neon-red/50    bg-neon-red/10    glow-red',
  HIGH:     'text-orange-400  border-orange-400/50  bg-orange-400/10',
  MEDIUM:   'text-neon-amber  border-neon-amber/50  bg-neon-amber/10',
  LOW:      'text-text-dim    border-text-dim/40    bg-text-dim/10',
}

const resultConfig = {
  'BLOCKED':       { classes: 'text-neon-green border-neon-green/50 bg-neon-green/10 glow-green', label: 'BLOCKED' },
  'BYPASSED':      { classes: 'text-neon-red   border-neon-red/50   bg-neon-red/10   glow-red',   label: 'BYPASSED' },
  'PARTIAL BYPASS':{ classes: 'text-neon-amber border-neon-amber/50 bg-neon-amber/10 glow-amber', label: 'PARTIAL' },
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
          <h1 className="font-orbitron text-neon-cyan text-xl tracking-widest text-glow-cyan flex items-center gap-2">
            <Shield size={22} />
            PROMPT INJECTION TEST SUITE
          </h1>
          <p className="font-mono text-sm text-text-secondary mt-1.5">
            {promptInjectionData.length} attack vectors evaluated &nbsp;·&nbsp; Isolated test environment
          </p>
        </div>
        <span className="font-orbitron text-4xl font-bold text-neon-cyan text-glow-cyan hidden sm:block">
          {promptInjectionData.length}
        </span>
      </div>

      {/* Warning banner */}
      <div className="border border-neon-amber/50 bg-neon-amber/5 rounded-lg px-5 py-3 flex items-center gap-3">
        <AlertTriangle size={16} className="text-neon-amber flex-shrink-0" />
        <span className="font-mono text-sm text-neon-amber">
          AUTHORIZED SECURITY TESTING — ALL TESTS CONDUCTED IN ISOLATED ENVIRONMENT
        </span>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="panel-bg rounded-lg border border-neon-green/30 px-6 py-4 flex items-center gap-4 glow-green">
          <span className="font-orbitron text-3xl font-bold text-neon-green">{blocked}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">BLOCKED</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-red/30 px-6 py-4 flex items-center gap-4 glow-red">
          <span className="font-orbitron text-3xl font-bold text-neon-red">{bypassed}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">BYPASSED</span>
        </div>
        <div className="panel-bg rounded-lg border border-neon-amber/30 px-6 py-4 flex items-center gap-4 glow-amber">
          <span className="font-orbitron text-3xl font-bold text-neon-amber">{partial}</span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">PARTIAL BYPASS</span>
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
                <span className="font-mono text-xs text-text-dim">#{String(test.id).padStart(2, '0')}</span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${categoryColors[test.category] || 'text-text-dim'}`}>
                  {test.category}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 font-bold ${res.classes}`}>
                  {res.label}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${severityColors[test.severity]}`}>
                  {test.severity}
                </span>
                <span className="ml-auto font-mono text-sm text-text-primary font-bold">
                  {test.title}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Technique */}
                <div className="flex items-start gap-4">
                  <span className="field-label flex-shrink-0 w-36 pt-0.5">TECHNIQUE:</span>
                  <span className="font-mono text-sm text-neon-purple">{test.technique}</span>
                </div>

                {/* Attack Payload */}
                <div className="space-y-2">
                  <span className="field-label">ATTACK PAYLOAD:</span>
                  <div className="bg-neon-red/5 border border-neon-red/20 rounded-lg p-4">
                    <p className="font-mono text-sm text-neon-red/90 leading-relaxed break-words">
                      {test.attackPayload}
                    </p>
                  </div>
                </div>

                {/* Model Response */}
                <div className="space-y-2">
                  <span className="field-label">MODEL RESPONSE:</span>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {test.modelResponse}
                  </p>
                </div>

                {/* Mitigation */}
                <div className="flex items-start gap-4 border-t border-border-neon pt-4">
                  <span className="field-label flex-shrink-0 w-36 pt-0.5">MITIGATION:</span>
                  <p className="font-mono text-sm text-neon-cyan/90 leading-relaxed">{test.mitigation}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

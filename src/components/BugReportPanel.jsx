import React, { useState } from 'react'
import { bugReportsData } from '../data/bugReports'
import { Bug, Users, Calendar } from 'lucide-react'

const severityConfig = {
  'P0-CRITICAL': {
    classes:    'text-neon-red   border-neon-red/50   bg-neon-red/10',
    label:      'P0',
    cardBorder: 'border-neon-red/25',
    headerBg:   'bg-neon-red/[0.04] border-b border-neon-red/15',
  },
  'P1-HIGH': {
    classes:    'text-orange-400 border-orange-400/50 bg-orange-400/10',
    label:      'P1',
    cardBorder: 'border-orange-400/20',
    headerBg:   'bg-orange-400/[0.04] border-b border-orange-400/15',
  },
  'P2-MEDIUM': {
    classes:    'text-neon-amber border-neon-amber/50 bg-neon-amber/10',
    label:      'P2',
    cardBorder: 'border-border-neon',
    headerBg:   'terminal-header',
  },
  'P3-LOW': {
    classes:    'text-text-secondary border-text-dim/40 bg-text-dim/10',
    label:      'P3',
    cardBorder: 'border-border-neon',
    headerBg:   'terminal-header',
  },
}

const statusConfig = {
  'OPEN':        'text-neon-red   border-neon-red/40   bg-neon-red/10',
  'IN PROGRESS': 'text-neon-amber border-neon-amber/40 bg-neon-amber/10',
  'RESOLVED':    'text-neon-green border-neon-green/40 bg-neon-green/10',
  'WONT FIX':    'text-text-dim   border-text-dim/40   bg-text-dim/10',
}

const filterOptions = ['ALL', 'P0', 'P1', 'P2', 'P3']

export default function BugReportPanel() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered  = activeFilter === 'ALL'
    ? bugReportsData
    : bugReportsData.filter(b => b.severity.startsWith(activeFilter))

  const p0Count = bugReportsData.filter(b => b.severity.startsWith('P0')).length
  const p1Count = bugReportsData.filter(b => b.severity.startsWith('P1')).length
  const p2Count = bugReportsData.filter(b => b.severity.startsWith('P2')).length
  const p3Count = bugReportsData.filter(b => b.severity.startsWith('P3')).length

  const counts = { ALL: bugReportsData.length, P0: p0Count, P1: p1Count, P2: p2Count, P3: p3Count }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="terminal-header rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-text-primary flex items-center gap-2">
            <Bug size={20} />
            Bug Reports
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {bugReportsData.length} reports filed · Issue tracker v2.4.1
          </p>
        </div>
        <span className="text-3xl font-bold text-neon-cyan hidden sm:block">
          {bugReportsData.length}
        </span>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2.5 flex-wrap items-center">
        <span className="text-sm text-text-secondary">Filter by severity:</span>
        {filterOptions.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-sm px-3.5 py-1.5 rounded border transition-all duration-150 ${
              activeFilter === filter
                ? 'border-neon-cyan bg-neon-cyan/8 text-neon-cyan'
                : 'border-border-neon text-text-secondary hover:border-neon-cyan/30 hover:text-text-primary'
            }`}
          >
            {filter} ({counts[filter]})
          </button>
        ))}
        <span className="ml-auto text-sm text-text-dim">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Bug report cards */}
      <div className="space-y-5">
        {filtered.map((bug) => {
          const sev = severityConfig[bug.severity]
          return (
            <div key={bug.id} className={`panel-bg rounded-lg border overflow-hidden ${sev.cardBorder}`}>
              {/* Card header */}
              <div className={`px-5 py-3.5 flex flex-wrap items-center gap-2.5 ${sev.headerBg}`}>
                <span className="font-mono text-sm font-semibold text-text-primary">{bug.id}</span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 font-medium ${sev.classes}`}>
                  {sev.label}
                </span>
                <span className={`font-mono text-xs border rounded px-2.5 py-0.5 ${statusConfig[bug.status] || 'text-text-dim'}`}>
                  {bug.status}
                </span>
                <span className="font-mono text-xs text-neon-purple border border-neon-purple/30 bg-neon-purple/8 rounded px-2.5 py-0.5">
                  {bug.category}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="text-base text-text-primary font-semibold leading-snug">{bug.title}</h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">{bug.description}</p>

                {/* Steps to reproduce */}
                <div className="space-y-2">
                  <span className="field-label">Steps to reproduce</span>
                  <ol className="space-y-2">
                    {bug.stepsToReproduce.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-text-secondary">
                        <span className="text-neon-cyan flex-shrink-0 font-semibold">{i + 1}.</span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Environment */}
                <div className="space-y-2">
                  <span className="field-label">Environment</span>
                  <div className="bg-bg-void rounded-lg px-4 py-3 font-mono text-sm flex flex-wrap gap-x-6 gap-y-1.5">
                    <span className="text-text-dim">model: <span className="text-text-primary">{bug.environment.model}</span></span>
                    <span className="text-text-dim">version: <span className="text-text-primary">{bug.environment.version}</span></span>
                    <span className="text-text-dim">temp: <span className="text-text-primary">{bug.environment.temperature}</span></span>
                    <span className="text-text-dim">maxTokens: <span className="text-text-primary">{bug.environment.maxTokens}</span></span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border-neon pt-4 flex flex-wrap items-center gap-5 justify-between">
                  <div className="flex items-center gap-5 text-sm text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span className="tabular-nums">{bug.reportedAt.slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={13} />
                      <span>{bug.affectedUsers.toLocaleString()} affected</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bug.tags.map(tag => (
                      <span key={tag} className="font-mono text-xs text-text-dim border border-border-neon rounded px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

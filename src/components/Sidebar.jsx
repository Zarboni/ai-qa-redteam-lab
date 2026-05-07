import React from 'react'
import {
  LayoutDashboard,
  Shield,
  Brain,
  Target,
  AlertTriangle,
  TrendingDown,
  Bug,
  Gavel,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard',       icon: LayoutDashboard, label: 'OVERVIEW' },
  { id: 'injection',       icon: Shield,          label: 'PROMPT INJECTION' },
  { id: 'hallucination',   icon: Brain,           label: 'HALLUCINATION' },
  { id: 'accuracy',        icon: Target,          label: 'ACCURACY' },
  { id: 'safety',          icon: AlertTriangle,   label: 'SAFETY / RISK' },
  { id: 'drift',           icon: TrendingDown,    label: 'DRIFT MONITOR' },
  { id: 'bugs',            icon: Bug,             label: 'BUG REPORTS' },
  { id: 'recommendation',  icon: Gavel,           label: 'QA VERDICT' },
]

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen }) {
  return (
    <aside
      className={`
        w-[240px] flex-shrink-0 panel-bg border-r border-border-neon flex flex-col
        fixed md:relative inset-y-0 left-0 z-40
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-5 py-3.5 text-left
                transition-all duration-150 border-l-[3px]
                ${isActive
                  ? 'border-neon-cyan bg-[#00f5ff10] text-neon-cyan'
                  : 'border-transparent text-text-secondary hover:text-neon-cyan hover:bg-[#00f5ff07] hover:border-[#00f5ff44]'
                }
              `}
            >
              <Icon
                size={17}
                className={`flex-shrink-0 ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}
              />
              <span className="font-mono text-sm tracking-widest">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom stats */}
      <div className="px-5 py-4 border-t border-border-neon">
        <div className="font-mono text-xs text-text-dim leading-relaxed space-y-1.5">
          <div className="text-text-secondary">8 TEST SUITES ACTIVE</div>
          <div className="text-neon-red font-bold">● 5 CRITICAL FINDINGS</div>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-neon-cyan to-transparent opacity-25" />
        <div className="mt-3 font-mono text-xs text-text-dim opacity-60">
          v2.4.1-build.20260507
        </div>
      </div>
    </aside>
  )
}

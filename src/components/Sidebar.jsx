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
  HelpCircle,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard',       icon: LayoutDashboard, label: 'Overview' },
  { id: 'injection',       icon: Shield,          label: 'Prompt Injection' },
  { id: 'hallucination',   icon: Brain,           label: 'Hallucination' },
  { id: 'accuracy',        icon: Target,          label: 'Accuracy' },
  { id: 'safety',          icon: AlertTriangle,   label: 'Safety & Risk' },
  { id: 'drift',           icon: TrendingDown,    label: 'Drift Monitor' },
  { id: 'bugs',            icon: Bug,             label: 'Bug Reports' },
  { id: 'recommendation',  icon: Gavel,           label: 'QA Verdict' },
]

const bottomNavItems = [
  { id: 'help', icon: HelpCircle, label: 'How to Use' },
]

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen }) {
  return (
    <aside
      className={`
        w-[220px] flex-shrink-0 panel-bg border-r border-border-neon flex flex-col
        fixed md:relative inset-y-0 left-0 z-40
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left
                transition-all duration-150 border-l-2
                ${isActive
                  ? 'border-neon-cyan bg-[#00f5ff08] text-text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.03] hover:border-[#00f5ff30]'
                }
              `}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom stats + help */}
      <div className="border-t border-border-neon">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left
                transition-all duration-150 border-l-2
                ${isActive
                  ? 'border-neon-cyan bg-[#00f5ff08] text-text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.03] hover:border-[#00f5ff30]'
                }
              `}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
        <div className="px-4 py-3">
          <div className="text-xs text-text-dim leading-relaxed space-y-1">
            <div className="text-text-secondary">8 test suites</div>
            <div className="text-neon-red font-medium">5 critical findings</div>
          </div>
          <div className="mt-3 text-xs text-text-dim opacity-40">
            v2.4.1-build.20260507
          </div>
        </div>
      </div>
    </aside>
  )
}

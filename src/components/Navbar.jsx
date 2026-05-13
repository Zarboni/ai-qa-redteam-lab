import React from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="panel-bg border-b border-border-neon flex items-center justify-between px-5 py-0 h-14 flex-shrink-0">
      {/* Left: hamburger (mobile) + logo */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="font-semibold text-base text-text-primary tracking-tight">
          AI QA Red Team Lab
        </span>
      </div>

      {/* Center subtitle — desktop only */}
      <div className="hidden lg:block">
        <span className="text-xs text-text-dim tracking-wide">
          LLM Evaluation System · v2.4.1
        </span>
      </div>

      {/* Right: status + date */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block" />
          <span className="text-sm text-text-secondary hidden sm:inline">Active</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-xs text-text-dim tabular-nums">2026-05-07</span>
        </div>
      </div>
    </nav>
  )
}

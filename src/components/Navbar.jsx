import React from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="panel-bg border-b border-[#00f5ff33] flex items-center justify-between px-5 py-0 h-16 flex-shrink-0">
      {/* Left: hamburger (mobile) + logo */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 text-neon-cyan hover:text-neon-cyan/80 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className="text-neon-cyan text-2xl leading-none">⬡</span>
        <span className="font-orbitron font-bold text-base md:text-lg text-neon-cyan text-glow-cyan tracking-widest">
          AI QA RED TEAM LAB
        </span>
      </div>

      {/* Center subtitle — desktop only */}
      <div className="hidden lg:block">
        <span className="font-mono text-xs text-text-dim tracking-[0.25em] uppercase">
          LLM Evaluation System v2.4.1
        </span>
      </div>

      {/* Right: status + date */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-neon-green text-sm blink">●</span>
          <span className="font-mono text-sm text-neon-green hidden sm:inline">SYSTEM ONLINE</span>
        </div>
        <div className="hidden sm:block">
          <span className="font-mono text-xs text-text-dim tracking-wider">2026.05.07</span>
        </div>
      </div>
    </nav>
  )
}

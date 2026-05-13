import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import PromptInjectionPanel from './components/PromptInjectionPanel'
import HallucinationPanel from './components/HallucinationPanel'
import AccuracyPanel from './components/AccuracyPanel'
import SafetyPanel from './components/SafetyPanel'
import DriftPanel from './components/DriftPanel'
import BugReportPanel from './components/BugReportPanel'
import QARecommendation from './components/QARecommendation'
import HelpPanel from './components/HelpPanel'

const panels = {
  dashboard: Dashboard,
  injection: PromptInjectionPanel,
  hallucination: HallucinationPanel,
  accuracy: AccuracyPanel,
  safety: SafetyPanel,
  drift: DriftPanel,
  bugs: BugReportPanel,
  recommendation: QARecommendation,
  help: HelpPanel,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const ActivePanel = panels[activeTab] || Dashboard

  return (
    <div className="flex flex-col h-screen bg-bg-void">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/70 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto bg-bg-void">
          <ActivePanel />
        </main>
      </div>
    </div>
  )
}

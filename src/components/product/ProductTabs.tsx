"use client"

import { useState } from "react"

interface Tab {
  label: string
  content: React.ReactNode
}

interface ProductTabsProps {
  tabs: Tab[]
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-medium transition-colors relative ${
              active === i ? "text-accent" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
            {active === i && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>
      <div className="text-sm text-text-secondary leading-relaxed">
        {tabs[active].content}
      </div>
    </div>
  )
}

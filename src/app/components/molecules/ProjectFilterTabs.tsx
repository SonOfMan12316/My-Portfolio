'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { mergeClassNames } from '@/utils/classNames'
import {
  PROJECT_FILTER_TABS,
  ProjectFilterTab,
} from '@/utils/projectFilters'

interface ProjectFilterTabsProps {
  active: ProjectFilterTab
  onChange: (filter: ProjectFilterTab) => void
  className?: string
}

export default function ProjectFilterTabs({
  active,
  onChange,
  className,
}: ProjectFilterTabsProps) {
  const tabsRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const index = PROJECT_FILTER_TABS.findIndex((tab) => tab === active)
    const currentButton = tabsRefs.current[index]
    if (currentButton) {
      setUnderlineProps({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      })
    }
  }, [active])

  return (
    <nav
      className={mergeClassNames(
        'relative flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-1 mb-8',
        className
      )}
      aria-label="Filter projects"
    >
      {PROJECT_FILTER_TABS.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabsRefs.current[idx] = el
          }}
          type="button"
          onClick={() => onChange(tab)}
          className={mergeClassNames(
            'relative pb-2 text-sm tracking-wide transition-colors',
            active === tab
              ? 'text-[var(--action)]'
              : 'text-[var(--color-foreground)]/55 hover:text-[var(--color-foreground)]'
          )}
        >
          {tab}
        </button>
      ))}
      <motion.div
        className="absolute -bottom-0.5 h-[1px] bg-[var(--action)] rounded"
        animate={{ left: underlineProps.left, width: underlineProps.width }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </nav>
  )
}

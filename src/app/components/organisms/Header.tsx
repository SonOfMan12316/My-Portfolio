'use client'

import { useEffect, useState } from 'react'
import Pill from '../atoms/Pill'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'side', label: 'Side' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
] as const

export default function Header() {
  const [active, setActive] = useState<string | null>(null)

  // Mark whichever section currently owns the upper part of the viewport.
  useEffect(() => {
    const targets = SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => Boolean(el))

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="st-header">
      <nav className="st-nav" aria-label="Sections">
        <Pill index={0} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Emanyo Charles
        </Pill>
        {SECTIONS.map(({ id, label }, i) => (
          <Pill
            key={id}
            index={i + 1}
            active={active === id}
            onClick={() => scrollTo(id)}
          >
            {label}
          </Pill>
        ))}
      </nav>

      <div className="st-side">
        <span
          className="st-pill st-hr st-status"
          style={{ ['--i' as string]: SECTIONS.length + 1 }}
        >
          <span className="st-status-dot" aria-hidden="true" />
          <span className="st-status-label">Open to work</span>
        </span>
      </div>
    </header>
  )
}

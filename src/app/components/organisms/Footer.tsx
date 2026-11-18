'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'
import { socialMedia } from '@/data/social-media'

const WORDMARK = 'Emanyo Charles'
const EMAIL = 'emanyocharles40@gmail.com'

const LINKS = socialMedia
  .filter((s) => ['linkedin', 'github'].includes(s.name))
  .map((s) => ({
    label: s.name === 'linkedin' ? 'LinkedIn' : 'GitHub',
    href: s.link,
  }))

export default function Footer() {
  const { ref, isIn } = useIntersect<HTMLDivElement>({ threshold: 0.2 })
  const markRef = useRef<HTMLDivElement>(null)
  const [markFactor, setMarkFactor] = useState<number | null>(null)

  // The wordmark should span the footer exactly. Measure the rendered string
  // once the display face is in, then size it so nothing is clipped.
  useEffect(() => {
    const fit = () => {
      const el = markRef.current
      const container = el?.parentElement
      if (!el || !container) return

      const fontSize = parseFloat(getComputedStyle(el).fontSize)
      if (!fontSize) return

      const spans = [...el.children] as HTMLElement[]
      const contentWidth = spans.reduce(
        (total, span) => total + span.getBoundingClientRect().width,
        0
      )
      if (!contentWidth) return

      // Width of the string expressed in ems, independent of current size.
      const emWidth = contentWidth / fontSize
      setMarkFactor(100 / emWidth)
    }

    let frame = 0
    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(fit)
    })

    window.addEventListener('resize', fit)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', fit)
    }
  }, [])

  return (
    <footer className="st-footer" id="contact">
      <div className="st-footer-row">
        <nav aria-label="Elsewhere">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>

      <div
        ref={(node) => {
          markRef.current = node
          ref.current = node
        }}
        className={mergeClassNames('st-mark', isIn && 'in')}
        aria-label={WORDMARK}
        style={
          markFactor ? { ['--mark-f' as string]: markFactor } : undefined
        }
      >
        {[...WORDMARK].map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{ ['--i' as string]: i }}
          >
            {char}
          </span>
        ))}
      </div>
    </footer>
  )
}

'use client'

import { useRef, useState } from 'react'
import MaskWords from '../motion/MaskWords'
import SplitWords from '../motion/SplitWords'
import { useHeroPhase } from '@/hooks/useHeroPhase'

const EMAIL = 'emanyocharles40@gmail.com'

const EXPERTISE = [
  'React & Next.js',
  'TypeScript',
  'Node & NestJS',
  'React Native',
  'Design systems',
  'API architecture',
]

export default function CoverSection() {
  const root = useRef<HTMLElement>(null)
  const phase = useHeroPhase(root)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard can be blocked; the address is still readable on screen.
    }
  }

  return (
    <section ref={root} className="st-home" data-phase={phase} id="home">
      <MaskWords>Senior Software Engineer</MaskWords>

      <div className="st-meta">
        <button type="button" onClick={copyEmail} className="st-meta-mail">
          {EMAIL}
          <span aria-live="polite">{copied ? ' · Copied' : ''}</span>
        </button>
        <div className="st-meta-role">
          And mobile engineer,
          <br />
          shipping to production
        </div>
      </div>

      <div className="st-intro">
        <p className="st-lede">
          <SplitWords run={phase !== 'idle'}>
            {[
              { text: 'Emanyo Charles is a ' },
              { text: 'software engineer', emphasis: true },
              { text: ' with six years spent turning complex products into ' },
              { text: 'systems that hold up', emphasis: true },
              { text: '.' },
            ]}
          </SplitWords>
        </p>

        <div className="st-expertise">
          <span className="st-expertise-label">Expertise</span>
          <ul>
            {EXPERTISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

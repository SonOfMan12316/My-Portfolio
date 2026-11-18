'use client'

import { mergeClassNames } from '@/utils/classNames'

interface SplitCharsProps {
  children: string
  className?: string
  run?: boolean
  /** Randomised-feeling but deterministic per-char delay ceiling, in ms. */
  spread?: number
}

/**
 * Splits text into per-character spans that flicker in, like the reference's
 * case-study titles. Delays are derived from the index so SSR and client match.
 */
export default function SplitChars({
  children,
  className,
  run = true,
  spread = 420,
}: SplitCharsProps) {
  const chars = [...children]

  return (
    <span
      aria-label={children}
      className={mergeClassNames(run && 'st-ch-run', className)}
    >
      {chars.map((char, i) => {
        // Deterministic pseudo-shuffle so the flicker doesn't read as a sweep.
        const delay = ((i * 37) % chars.length) / chars.length
        return (
          <span
            key={i}
            aria-hidden="true"
            className="st-ch"
            style={{ ['--d' as string]: `${(delay * spread).toFixed(0)}ms` }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

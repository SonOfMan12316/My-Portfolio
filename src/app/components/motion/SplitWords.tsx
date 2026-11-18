'use client'

import { mergeClassNames } from '@/utils/classNames'

interface SplitWordsProps {
  /** Plain text, or segments that let part of the line carry a different tone. */
  children: string | Array<{ text: string; emphasis?: boolean }>
  className?: string
  /** Set once JS is live so the per-word animation can start. */
  run?: boolean
}

/**
 * Splits a line into per-word spans so each can blur-fade in on its own delay.
 * Screen readers get the whole string via `aria-label`.
 */
export default function SplitWords({
  children,
  className,
  run = true,
}: SplitWordsProps) {
  const segments =
    typeof children === 'string' ? [{ text: children }] : children

  const plain = segments.map((s) => s.text).join('')

  let wordIndex = 0

  return (
    <span
      aria-label={plain}
      className={mergeClassNames(run && 'st-w-run', className)}
    >
      {segments.map((segment, si) => {
        // Keep the spaces so `white-space: pre` can render them.
        const parts = segment.text.split(/(\s+)/).filter(Boolean)

        return (
          <span
            key={si}
            aria-hidden="true"
            style={segment.emphasis ? { color: 'var(--st-k)' } : undefined}
          >
            {parts.map((part, pi) => {
              if (/^\s+$/.test(part)) return <span key={pi}>{part}</span>
              const i = wordIndex++
              return (
                <span
                  key={pi}
                  className="st-w"
                  style={{ ['--i' as string]: i }}
                >
                  {part}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

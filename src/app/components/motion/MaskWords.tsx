'use client'

import { mergeClassNames } from '@/utils/classNames'

interface MaskWordsProps {
  children: string
  className?: string
}

/**
 * Hero wordmark. Each word sits in a clipped box and slides up out of it.
 * Structure mirrors the reference: `.st-wd > .st-ws > .st-wi`.
 */
export default function MaskWords({ children, className }: MaskWordsProps) {
  const words = children.trim().split(/\s+/)

  return (
    <h1 aria-label={children} className={mergeClassNames('st-big', className)}>
      {words.map((word, i) => (
        <span key={i} className="st-wd" aria-hidden="true">
          <span className="st-ws">
            <span className="st-wi" style={{ ['--i' as string]: i }}>
              {word}
            </span>
          </span>
        </span>
      ))}
    </h1>
  )
}

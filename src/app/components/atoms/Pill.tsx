'use client'

import type { ReactNode } from 'react'
import { mergeClassNames } from '@/utils/classNames'

interface PillProps {
  children: ReactNode
  href?: string
  active?: boolean
  /** Stagger index for the header's entrance. */
  index?: number
  onClick?: () => void
  className?: string
  external?: boolean
}

/**
 * Frosted capsule used across the header. Widens slightly on hover.
 */
export default function Pill({
  children,
  href,
  active,
  index = 0,
  onClick,
  className,
  external,
}: PillProps) {
  const classes = mergeClassNames('st-pill st-hr', className)
  const style = { ['--i' as string]: index }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        aria-current={active ? 'page' : undefined}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      style={style}
      aria-current={active ? 'true' : undefined}
    >
      {children}
    </button>
  )
}

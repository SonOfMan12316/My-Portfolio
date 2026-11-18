'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'

interface RevealProps {
  children: ReactNode
  /** Stagger index — each step adds 90ms of delay. */
  index?: number
  as?: ElementType
  className?: string
  style?: CSSProperties
}

/**
 * Fades and lifts its children into place when scrolled into view.
 * The animation itself lives in `.st-io` / `.st-io.in`.
 */
export default function Reveal({
  children,
  index = 0,
  as: Tag = 'div',
  className,
  style,
}: RevealProps) {
  const { ref, isIn } = useIntersect<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={mergeClassNames('st-io', isIn && 'in', className)}
      style={{ ['--i' as string]: index, ...style }}
    >
      {children}
    </Tag>
  )
}

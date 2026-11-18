'use client'

import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'

interface SectionHeaderProps {
  /** Use `\n` to control where the big title breaks across lines. */
  title: string
  description?: string
  id?: string
  className?: string
  /** Retained so un-migrated sections keep compiling; no longer styled. */
  onDark?: boolean
}

/**
 * Section header: stacked display title on the left, uppercase caption on the
 * right, hairline rule underneath.
 */
export default function SectionHeader({
  title,
  description,
  id,
  className,
}: SectionHeaderProps) {
  const { ref, isIn } = useIntersect<HTMLDivElement>()
  const lines = title.split('\n')

  return (
    <div
      ref={ref}
      id={id}
      className={mergeClassNames('st-sec st-io', isIn && 'in', className)}
    >
      <h2>
        {lines.map((line, i) => (
          <b key={i}>{line}</b>
        ))}
      </h2>
      {description && <span className="st-sec-note">{description}</span>}
    </div>
  )
}

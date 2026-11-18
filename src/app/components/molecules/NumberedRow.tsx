'use client'

import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'

interface NumberedRowProps {
  index: number
  title: string
  description?: string
  /** Omit for an item that has nothing to link to yet. */
  href?: string
  /** Trailing label, e.g. VISIT or READ. */
  cta?: string
  external?: boolean
  className?: string
}

/**
 * One row of a numbered list. Hovering wipes ink up from the baseline and
 * nudges the title and arrow to the right.
 */
export default function NumberedRow({
  index,
  title,
  description,
  href,
  cta = 'Visit',
  external = true,
  className,
}: NumberedRowProps) {
  const { ref, isIn } = useIntersect<HTMLLIElement>()

  return (
    <li
      ref={ref}
      className={mergeClassNames('st-io', isIn && 'in')}
      style={{ ['--i' as string]: index }}
    >
      {(() => {
        const inner = (
          <>
            <span className="st-row-n">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="st-row-t">{title}</span>
            <span className="st-row-d">{description}</span>
            <span className="st-row-v">
              {href ? (
                <>
                  {cta} <i aria-hidden="true">→</i>
                  {external && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </>
              ) : (
                'Soon'
              )}
            </span>
          </>
        )

        return href ? (
          <a
            href={href}
            className={mergeClassNames('st-row', className)}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {inner}
          </a>
        ) : (
          <div className={mergeClassNames('st-row', 'st-row-idle', className)}>
            {inner}
          </div>
        )
      })()}
    </li>
  )
}

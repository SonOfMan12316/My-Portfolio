import { mergeClassNames } from '@/utils/classNames'

export default function PageTemplate({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={mergeClassNames(
        'w-full overflow-x-hidden',
        className
      )}
    >
      {children}
    </div>
  )
}

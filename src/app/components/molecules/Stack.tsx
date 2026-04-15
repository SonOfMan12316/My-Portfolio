import { mergeClassNames } from '@/utils/classNames'
import DATA from '@/data'
import AnimatedComponent from './AnimatedComponent'
import Image from 'next/image'

interface StackProps {
  className?: string
}

export default function Stack({ className }: StackProps) {
  const items = DATA.stack

  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        'flex flex-col gap-5 items-center sm:items-start ',
        className
      )}
    >
      <span className="text-sm uppercase tracking-[0.18em] text-gray-300">
        Core stack
      </span>

      <AnimatedComponent HTMLtag="div" className="flex gap-3 sm:gap-4 flex-wrap">
        {items.map(({ name }, index) => (
          <div
            key={index}
            className="h-11 w-11 rounded-lg border border-white/10 bg-white/5 p-2.5"
          >
            <Image
              src={`/cover/${name}.svg`}
              alt={`${name} icon`}
              width={24}
              height={24}
              priority
            />
          </div>
        ))}
      </AnimatedComponent>
    </AnimatedComponent>
  )
}

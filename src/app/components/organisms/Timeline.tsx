import { TimelineDateProps } from '../atoms/TimelineDate'
import { mergeClassNames } from '@/utils/classNames'
import AnimatedComponent from '../molecules/AnimatedComponent'

interface ImageTimeline {
  src: string
  alt: string
}

export interface TimelineItem {
  component: React.ReactNode
  date: TimelineDateProps
  image: ImageTimeline
}

interface TimelineProps {
  items: Array<TimelineItem>
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-20 z-10">
        <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 border-l-2 border-gray-300 -translate-x-1/2 z-0" />
        {items.map(({ component }, index) => {
          const isEven = index % 2 === 0;
          const isLeft = isEven; // First item (index 0) is left, second (index 1) is right, etc.
          
          return (
            <div
              key={index}
              className="relative w-full group"
            >
              <AnimatedComponent
                HTMLtag="div"
                className={mergeClassNames(
                  'hidden xl:block absolute left-1/2 -translate-x-1/2',
                  'w-6 h-6 mt-4',
                  'bg-gray-200 rounded-full z-10',
                  'group-hover:drop-shadow-[0_0_4px_#ffffff] transition-all duration-200'
                )}
              />
              <AnimatedComponent
                HTMLtag="div"
                className={mergeClassNames(
                  "w-full xl:w-1/2",
                  isLeft 
                    ? "xl:pr-4 xl:ml-0" 
                    : "xl:pl-4 xl:ml-auto"
                )}
              >
                {component}
              </AnimatedComponent>
            </div>
          )
        })}
      </div>
    </div>
  )
}

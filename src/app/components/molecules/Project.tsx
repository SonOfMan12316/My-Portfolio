import { mergeClassNames } from '@/utils/classNames'
import Tag from '../atoms/Tag'
import Image from 'next/image'
import AnimatedComponent from './AnimatedComponent'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

export interface ProjectProps {
  className?: string
  title: string
  about: string
  technologies: Array<string>
  image: string
  link: string
  categories?: Array<string>
  featured?: boolean
}

export default function Project({
  className,
  title,
  about,
  technologies,
  image,
  link,
  categories,
  featured = false,
}: ProjectProps) {
  return (
    <AnimatedComponent
      HTMLtag="article"
      className={mergeClassNames(
        'group relative rounded-2xl border border-gray-100/10 bg-[var(--surface-muted)]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--action)]/60',
        className
      )}
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title} live demo`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 pb-3">
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-100 pr-3">
            {title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            {featured && (
              <span className="rounded-full border border-[var(--action)]/60 bg-[var(--action)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--action)]">
                Featured
              </span>
            )}
            <FaArrowUpRightFromSquare
              size={16}
              className="text-current group-hover:text-[var(--action)] transition-colors"
            />
          </div>
        </div>

        <p className="text-sm sm:text-base leading-7 text-gray-200/85 max-w-2xl">
          {about}
        </p>

        <div className="flex gap-2 sm:gap-3 flex-wrap pt-4">
          {technologies.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </div>

        {categories?.length ? (
          <div className="flex gap-2 flex-wrap pt-3">
            {categories.map((category, index) => (
              <Tag
                key={index}
                className="border-none bg-white/5 text-xs text-gray-300 hover:bg-white/10"
              >
                {category}
              </Tag>
            ))}
          </div>
        ) : null}

      </div>
    </AnimatedComponent>
  )
}

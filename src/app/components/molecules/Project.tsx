import { mergeClassNames } from '@/utils/classNames'
import Tag from '../atoms/Tag'
import AnimatedComponent from './AnimatedComponent'
import ProjectMedia from './ProjectMedia'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'

export interface ProjectProps {
  className?: string
  title: string
  about: string
  technologies: Array<string>
  image: string
  link: string
  github?: string
  categories?: Array<string>
  featured?: boolean
  liveOnMobile?: boolean
  video?: string
}

export default function Project({
  className,
  title,
  about,
  technologies,
  image,
  link,
  github,
  categories,
  featured = false,
  liveOnMobile = false,
  video,
}: ProjectProps) {
  return (
    <AnimatedComponent
      HTMLtag="article"
      className={mergeClassNames(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100/10 bg-[var(--surface-muted)]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--action)]/60',
        className
      )}
    >
      <ProjectMedia title={title} image={image} video={video} />

      <div className="relative z-0 shrink-0 border-t border-gray-100/10 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 pb-3">
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-100 pr-3">
            {title}
          </h3>
          {featured && (
            <span className="shrink-0 rounded-full border border-[var(--action)]/60 bg-[var(--action)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--action)]">
              Featured
            </span>
          )}
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

        {liveOnMobile ? (
          <div className="pt-5">
            <span className="inline-flex rounded-full border border-gray-300/25 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-gray-200">
              Live on iOS & Android
            </span>
          </div>
        ) : null}

        {link || github ? (
          <div className="flex flex-wrap gap-3 pt-5">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--action)]/40 bg-[var(--action)]/10 px-4 py-2 text-sm font-medium text-[var(--action)] transition-colors hover:bg-[var(--action)]/20 hover:border-[var(--action)]/70"
              >
                <FaArrowUpRightFromSquare size={13} />
                Live Demo
              </a>
            ) : null}
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300/20 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:border-gray-300/40"
              >
                <FaGithub size={15} />
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}

      </div>
    </AnimatedComponent>
  )
}

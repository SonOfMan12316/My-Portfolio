import { mergeClassNames } from '@/utils/classNames'
import Project, { ProjectProps } from '../molecules/Project'

interface ProjectsPreviewProps {
  projects: Array<ProjectProps>
  className?: string
}

export default function ProjectsPreview({
  projects,
  className,
}: ProjectsPreviewProps) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const secondaryProjects = projects.filter(
    (project) => project.title !== featuredProject?.title
  )

  return (
    <div
      className={mergeClassNames(
        'relative w-full flex flex-col gap-8',
        className
      )}
    >
      {featuredProject ? (
        <div className="w-full">
          <h3 className="pb-4 text-sm uppercase tracking-[0.22em] text-[var(--action)]">
            Featured Project
          </h3>
          <Project {...featuredProject} featured className="w-full" />
        </div>
      ) : null}

      <div className="w-full pt-2">
        <h3 className="pb-4 text-sm uppercase tracking-[0.22em] text-gray-300">
          More Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secondaryProjects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}

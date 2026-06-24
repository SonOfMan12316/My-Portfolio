'use client'

import { useMemo, useState } from 'react'
import { ProjectInterface } from '@/data/project'
import ProjectFilterTabs from '../molecules/ProjectFilterTabs'
import ProjectsPreview from './ProjectsPreview'
import {
  ProjectFilterTab,
  filterProjectsByTab,
} from '@/utils/projectFilters'

interface ProjectsWorkSectionProps {
  projects: ProjectInterface[]
}

export default function ProjectsWorkSection({
  projects,
}: ProjectsWorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterTab>('All')

  const filteredProjects = useMemo(
    () => filterProjectsByTab(projects, activeFilter),
    [projects, activeFilter]
  )

  return (
    <>
      <ProjectFilterTabs active={activeFilter} onChange={setActiveFilter} />
      {filteredProjects.length ? (
        <ProjectsPreview projects={filteredProjects} />
      ) : (
        <p className="text-sm text-gray-400 py-8">
          No projects match this filter yet.
        </p>
      )}
    </>
  )
}

import { ProjectInterface } from '@/data/project'

export type ProjectFilterTab = 'All' | 'Web' | 'Mobile' | 'Full Stack'

export const PROJECT_FILTER_TABS: ProjectFilterTab[] = [
  'All',
  'Web',
  'Mobile',
  'Full Stack',
]

export function filterProjectsByTab(
  projects: ProjectInterface[],
  filter: ProjectFilterTab
): ProjectInterface[] {
  if (filter === 'All') return projects

  if (filter === 'Mobile') {
    return projects.filter((project) => project.categories.includes('Mobile'))
  }

  if (filter === 'Web') {
    return projects.filter(
      (project) =>
        project.categories.includes('Web') &&
        !project.categories.includes('Mobile')
    )
  }

  return projects.filter((project) => project.categories.includes('Full Stack'))
}

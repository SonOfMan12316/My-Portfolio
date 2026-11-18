import SectionHeader from '../molecules/SectionHeader'
import ProjectTile from '../molecules/ProjectTile'
import { projects } from '@/data/project'
import type { ProjectInterface } from '@/data/project'
import { placementsFor } from '@/utils/workGrid'

export default function ProjectsSection() {
  const list = projects as ProjectInterface[]
  const placements = placementsFor(list)

  return (
    <section aria-labelledby="work-title">
      <SectionHeader
        id="work"
        title={'Selected\nwork'}
        description="Shipped products"
      />
      <ul className="st-grid">
        {list.map((project, i) => (
          <ProjectTile
            key={project.title}
            project={project}
            index={i}
            placement={placements[i]}
          />
        ))}
      </ul>
    </section>
  )
}

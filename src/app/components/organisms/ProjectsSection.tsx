import ProjectsWorkSection from './ProjectsWorkSection'
import TitleAndSubtitleSection from '../molecules/TitleAndSubtitleSection'
import SectionTemplate from '@/templates/SectionTemplate'
import DATA from '@/data'
import HighlightText from '../atoms/HighlightText'
import { PAGE_CONTAINER } from '@/utils/classNames'

export default function ProjectsSection() {
  const projects = DATA.projects

  return (
    <SectionTemplate
      id="projects"
      className="flex flex-col items-center pt-10 sm:pt-14"
    >
      <div className={PAGE_CONTAINER}>
        <TitleAndSubtitleSection
          title="Selected Work"
          subtitle={
            <>
              A focused set of projects that show how I approach product
              problems, technical architecture, and delivery in{' '}
              <HighlightText>production</HighlightText>.
            </>
          }
        >
          <ProjectsWorkSection projects={projects} />
        </TitleAndSubtitleSection>
      </div>
    </SectionTemplate>
  )
}

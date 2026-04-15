import ProjectsPreview from './ProjectsPreview'
import TitleAndSubtitleSection from '../molecules/TitleAndSubtitleSection'
import SectionTemplate from '@/templates/SectionTemplate'
import DATA from '@/data'
import HighlightText from '../atoms/HighlightText'

export default function ProjectsSection() {
  const projects = DATA.projects

  return (
    <SectionTemplate
      id="projects"
      className="flex flex-col items-center pt-10 sm:pt-14"
    >
      <div className="w-full mx-auto max-w-[1160px]">
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
          <ProjectsPreview projects={projects} />
        </TitleAndSubtitleSection>
      </div>
    </SectionTemplate>
  )
}

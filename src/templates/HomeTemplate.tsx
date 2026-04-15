import PageLayout from '@/layouts/PageLayout'
import CoverSection from '../app/components/organisms/CoverSection'
import AboutSection from '@/app/components/organisms/AboutSection'
import ProjectsSection from '@/app/components/organisms/ProjectsSection'
import ContactSection from '@/app/components/organisms/ContactSection'

export default function HomeTemplate() {
  return (
    <PageLayout>
      <CoverSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </PageLayout>
  )
}

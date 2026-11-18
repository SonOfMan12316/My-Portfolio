import PageLayout from '@/layouts/PageLayout'
import CoverSection from '../app/components/organisms/CoverSection'
import ProjectsSection from '@/app/components/organisms/ProjectsSection'
import OpenSourceSection from '@/app/components/organisms/OpenSourceSection'
import ExperiencesSection from '@/app/components/organisms/ExperiencesSection'
import BlogSection from '@/app/components/organisms/BlogSection'
import Footer from '@/app/components/organisms/Footer'

export default function HomeTemplate() {
  return (
    <PageLayout>
      <CoverSection />
      <ProjectsSection />
      <OpenSourceSection />
      <ExperiencesSection />
      <BlogSection />
      <Footer />
    </PageLayout>
  )
}

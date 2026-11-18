import PageTemplate from '@/templates/PageTemplate'
import Header from '@/app/components/organisms/Header'
import DotField from '@/app/components/motion/DotField'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTemplate className="st-page">
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <DotField />
      <Header />
      {children}
    </PageTemplate>
  )
}

import SectionTemplate from '@/templates/SectionTemplate'
import Title from '@/app/components/atoms/Title'

export default function CoverSection() {
  return (
    <SectionTemplate
      id="home"
      className="relative flex items-center"
      isTranparentBackgroud
      noPaddingInline
    >
      <div className="w-full mx-auto max-w-[1160px] px-1 sm:px-4 lg:px-0 py-4 sm:py-8">
        <div className="py-8 sm:py-12">
          <div className="max-w-3xl lg:pt-2">
            <p className="text-xs sm:text-sm tracking-wide text-gray-400 mb-5 sm:mb-6">
              Senior Frontend Engineer · Fullstack & Mobile
            </p>
            <Title className="text-left text-[clamp(2rem,9vw,4.5rem)] font-extrabold leading-[1.1] sm:leading-[1.08]">
              I build scalable React & TypeScript products used in production
            </Title>
            <p className="pt-5 sm:pt-6 text-[15px] sm:text-lg leading-7 sm:leading-8 text-gray-200/85 max-w-2xl">
              Software Engineer with 5+ years of experience shipping
              high-performance web applications and fullstack systems. I focus
              on clean architecture, performance, and intuitive user
              experiences.
            </p>
          </div>
        </div>
      </div>
    </SectionTemplate>
  )
}

import SectionTemplate from '@/templates/SectionTemplate'
import Title from '@/app/components/atoms/Title'
import { PAGE_CONTAINER } from '@/utils/classNames'

export default function CoverSection() {
  return (
    <SectionTemplate
      id="home"
      className="relative flex items-center"
      isTranparentBackgroud
    >
      <div className={`${PAGE_CONTAINER} py-4 sm:py-8`}>
        <div className="py-8 sm:py-12">
          <div className="max-w-3xl lg:pt-2">
            <p className="text-xs sm:text-sm tracking-wide text-gray-400 mb-5 sm:mb-6">
              Full Stack & Mobile Engineer
            </p>
            <Title className="text-left text-[clamp(2rem,9vw,4.5rem)] font-extrabold leading-[1.1] sm:leading-[1.08]">
              I join teams to make them faster and more reliable.
            </Title>
            <p className="pt-5 sm:pt-6 text-[15px] sm:text-lg leading-7 sm:leading-8 text-gray-200/85 max-w-2xl">
              Over the last five years, I&apos;ve shipped cross-platform
              products, improved how quickly systems respond to users, and
              helped keep services consistently available. I lead by example
              code reviews, pair programming, and protecting the team
              from burnout.
            </p>
          </div>
        </div>
      </div>
    </SectionTemplate>
  )
}

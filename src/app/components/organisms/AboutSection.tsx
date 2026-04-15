import SectionTemplate from '@/templates/SectionTemplate'
import Title from '../atoms/Title'
import Subtitle from '../atoms/Subtitle'

export default function AboutSection() {
  return (
    <SectionTemplate id="about" className="min-h-0 pt-10 sm:pt-14">
      <div className="w-full mx-auto max-w-[1160px]">
        <div className="max-w-3xl">
          <Title className="text-left">About</Title>
          <Subtitle className="pt-6 text-left">
            I have spent the last 5+ years building real products that run in
            production, not just prototypes. My work spans frontend
            architecture, API design, and fullstack delivery for products used
            by thousands of people, and I also build cross-platform mobile
            applications.
          </Subtitle>
          <Subtitle className="pt-5 text-left">
            I care deeply about performance and maintainability. I enjoy taking
            messy systems and turning them into clean, predictable foundations
            that teams can ship on confidently.
          </Subtitle>
          <Subtitle className="pt-5 text-left">
            I collaborate closely with product, design, and engineering teams
            to deliver features that are clear, useful, and technically solid.
          </Subtitle>
        </div>
      </div>
    </SectionTemplate>
  )
}

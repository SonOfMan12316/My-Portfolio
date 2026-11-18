'use client'

import SectionHeader from '../molecules/SectionHeader'
import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'
import { formatedDateMonthYear } from '@/utils/date'
import { experiences } from '@/data/experience'
import type { ExperienceInterface } from '@/data/experience'

function ExperienceRow({
  experience,
  index,
}: {
  experience: ExperienceInterface
  index: number
}) {
  const { ref, isIn } = useIntersect<HTMLLIElement>()

  const period = `${formatedDateMonthYear(experience.start)} — ${
    experience.end ? formatedDateMonthYear(experience.end) : 'Present'
  }`

  return (
    <li
      ref={ref}
      className={mergeClassNames('st-io', isIn && 'in')}
      style={{ ['--i' as string]: index }}
    >
      <div className="st-row st-row-idle st-exp">
        <span className="st-exp-period">{period}</span>
        <span className="st-row-t">{experience.name}</span>
        <span className="st-exp-role">{experience.role}</span>
        <span className="st-exp-where">{experience.type}</span>
      </div>
    </li>
  )
}

export default function ExperiencesSection() {
  if (!experiences.length) return null

  return (
    <section aria-labelledby="experience-title">
      <SectionHeader
        id="experience"
        title="Experience"
        description="Where I've worked"
      />
      <ul className="st-rows">
        {experiences.map((experience, i) => (
          <ExperienceRow
            key={`${experience.name}-${experience.start}`}
            experience={experience}
            index={i}
          />
        ))}
      </ul>
    </section>
  )
}

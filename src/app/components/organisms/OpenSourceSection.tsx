import SectionHeader from '../molecules/SectionHeader'
import NumberedRow from '../molecules/NumberedRow'
import { openSource } from '@/data/open-source'

export default function OpenSourceSection() {
  if (!openSource.length) return null

  return (
    <section aria-labelledby="side-title">
      <SectionHeader
        id="side"
        title={'Things I make\non the side'}
        description="Open source"
      />
      <ul className="st-rows">
        {openSource.map((item, i) => (
          <NumberedRow
            key={item.name}
            index={i}
            title={item.name}
            description={item.description}
            href={item.link}
            cta="Source"
          />
        ))}
      </ul>
    </section>
  )
}

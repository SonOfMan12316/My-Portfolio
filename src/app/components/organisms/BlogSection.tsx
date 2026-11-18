import SectionHeader from '../molecules/SectionHeader'
import NumberedRow from '../molecules/NumberedRow'
import { blogPosts } from '@/data/blog'

export default function BlogSection() {
  if (!blogPosts.length) return null

  return (
    <section aria-labelledby="writing-title">
      <SectionHeader
        id="writing"
        title="Writing"
        description="Notes on engineering"
      />
      <ul className="st-rows">
        {blogPosts.map((post, i) => (
          <NumberedRow
            key={post.title}
            index={i}
            title={post.title}
            description={post.excerpt}
            href={post.link || undefined}
            cta="Read"
          />
        ))}
      </ul>
    </section>
  )
}

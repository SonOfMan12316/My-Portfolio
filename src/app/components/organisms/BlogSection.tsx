import SectionTemplate from '@/templates/SectionTemplate'
import Title from '../atoms/Title'
import Subtitle from '../atoms/Subtitle'
import { PAGE_CONTAINER } from '@/utils/classNames'
import { blogPosts } from '@/data/blog'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogSection() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <SectionTemplate id="blog" className="min-h-0 pt-10 sm:pt-14">
      <div className={PAGE_CONTAINER}>
        <Title className="text-left">Recent Posts</Title>
        <Subtitle className="pt-4 text-left max-w-2xl">
          Notes on Go, observability, error handling, and backend thinking.
        </Subtitle>

        <div className="flex flex-col divide-y divide-white/10 pt-8">
          {recentPosts.map((post) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-100 group-hover:text-[var(--action)] transition-colors">
                    {post.title}
                  </h3>
                  {post.link ? (
                    <FaArrowUpRightFromSquare
                      size={14}
                      className="mt-1.5 shrink-0 text-gray-400 group-hover:text-[var(--action)] transition-colors"
                    />
                  ) : (
                    <span className="mt-1 shrink-0 rounded-full border border-gray-300/20 bg-white/5 px-2.5 py-0.5 text-[11px] text-gray-400">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="pt-2 text-sm leading-6 text-gray-200/75 max-w-2xl">
                  {post.excerpt}
                </p>
                <p className="pt-2 text-xs text-gray-500">
                  {formatPostDate(post.date)}
                </p>
              </>
            )

            return post.link ? (
              <a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="group block py-6 first:pt-0"
              >
                {content}
              </a>
            ) : (
              <div key={post.title} className="group block py-6 first:pt-0">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </SectionTemplate>
  )
}

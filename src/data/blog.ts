export interface BlogPostInterface {
  title: string
  excerpt: string
  date: string
  // External URL (dev.to, Medium, Hashnode, etc.). Leave empty to show "Coming soon".
  link: string
}

export const blogPosts: Array<BlogPostInterface> = [
  {
    title: "Why I'm Learning Go as a TypeScript Developer",
    excerpt:
      'After five years of React and NestJS, I wanted a language that forces simplicity. Here is what Go is teaching me about building systems that are fast and easy to maintain.',
    date: '2026-07-01',
    link: '',
  },
  {
    title: 'Error Handling Is a Feature, Not an Afterthought',
    excerpt:
      'Most apps treat errors as noise. Treating them as first-class product behaviour changed how I design APIs and UIs.',
    date: '2026-06-15',
    link: '',
  },
  {
    title: 'Observability for Fullstack Engineers: Where to Start',
    excerpt:
      'Uptime numbers mean nothing if you cannot explain them. Logs, traces, and metrics from the perspective of someone who had to keep a production API at 98% uptime.',
    date: '2026-05-30',
    link: '',
  },
]

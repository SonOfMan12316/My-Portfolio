export interface ProjectInterface {
  title: string
  about: string
  technologies: Array<string>
  image: string
  link: string
  categories: Array<string>
  featured?: boolean
}

export const projects = [
  {
    title: 'Clohea Admin Portal',
    about:
      'Built for a healthcare company managing staff, groups, and practitioner verification across an organization. The challenge was handling complex role-based permissions while keeping the UI intuitive for non-technical admin staff. Built with Vue 3, VueX, and TypeScript, focused on component reusability and clean state management.',
    technologies: [
      'Vue3',
      'VueX',
      'Bootstrap',
      'Typescript',
    ],
    image: '/projects/clohea-admin-portal.webp',
    link: 'http://adminportal.staging.clohea.com/',
    categories: ['Featured', 'Production'],
    featured: true,
  },
  {
    title: 'Bookmark Manager',
    about:
      'A full-stack productivity tool with authentication, built to scratch my own itch. Users can add, edit, archive, and delete bookmarks across sessions. Built with React, Next.js, NestJS, and SQL, this was my playground for getting serious about backend integration, database design, and auth flows end to end.',
    technologies: [
      'React',
      'Next',
      'Tailwind',
      'Typescript',
      'Nest',
      'SQL',
    ],
    image: '/projects/bookmark-manager.webp',
    link: 'https://bookmark-manager-woad.vercel.app',
    categories: ['Product'],
    featured: false,
  },
  {
    title: 'Finance Tracker',
    about:
      'Personal finance app for tracking budgets, pots, and transactions in real time. The goal was to make financial data feel less intimidating through clean UI and clear data visualization. Built with React, Zustand for state, Firebase for backend, and TypeScript throughout.',
    technologies: [
      'React',
      'Vite',
      'Tailwind',
      'Typescript',
      'Firebase',
      'Zustand',
    ],
    image: '/projects/finance-tracker.webp',
    link: 'https://mancy-finance-tracker.vercel.app',
    categories: ['Product'],
    featured: false,
  },
  {
    title: 'Create Your Custom Chill Guy',
    about:
      'Create your custom Chill Guy meme with editable text, colors, and accessories, then copy or download the final image. Built as a playful UI product focused on fast interactions and clean client-side rendering.',
    technologies: ['React', 'Vite', 'Typescript', 'Tailwind', 'Html2canvas'],
    image: '/projects/chill_guy.webp',
    link: 'https://create-your-chill-guy-meme.vercel.app',
    categories: ['Product'],
    featured: false,
  },
]

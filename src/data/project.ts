export interface ProjectInterface {
  title: string
  about: string
  technologies: Array<string>
  image: string
  link: string
  github?: string
  categories: Array<string>
  featured?: boolean
  liveOnMobile?: boolean
  video?: string
}

export const projects = [
  {
    title: 'Kinnected',
    about:
      'A family management platform built from zero to production as the sole engineer. Kinnected gives families one private space to manage meals, tasks, shopping lists, calendars, and shared files. I owned the entire stack — NestJS backend serving 5,000+ users at 50K+ daily requests, Redis caching reducing response times by 45%, Firebase Auth, real-time push notifications, and a React Native mobile app shipped to both the Apple App Store and Google Play Store.',
    technologies: [
      'React Native',
      'NestJS',
      'TypeScript',
      'MongoDB',
      'Redis',
      'Firebase',
    ],
    image:
      'https://res.cloudinary.com/dolawuzw6/video/upload/so_0,f_jpg,q_auto/v1782310277/Kinnected_jegccg.jpg',
    video:
      'https://res.cloudinary.com/dolawuzw6/video/upload/v1782310277/Kinnected_jegccg.mp4',
    link: '',
    liveOnMobile: true,
    categories: ['Featured', 'Production', 'Mobile', 'Full Stack'],
    featured: true,
  },
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
    categories: ['Production', 'Web'],
    featured: false,
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
    link: 'https://bookmark-manager-woad.vercel.app/sign-in',
    github: 'https://github.com/SonOfMan12316/Bookmark-Manager',
    categories: ['Product', 'Web', 'Full Stack'],
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
    link: 'https://mancy-finance-tracker.vercel.app/sign-in',
    github: 'https://github.com/SonOfMan12316/Finance-Tracker',
    categories: ['Product', 'Web', 'Full Stack'],
    featured: false,
  },
  {
    title: 'Create Your Custom Chill Guy',
    about:
      'Create your custom Chill Guy meme with editable text, colors, and accessories, then copy or download the final image. Built as a playful UI product focused on fast interactions and clean client-side rendering.',
    technologies: ['React', 'Vite', 'Typescript', 'Tailwind', 'Html2canvas'],
    image: '/projects/chill_guy.webp',
    link: 'https://create-your-chill-guy-meme.vercel.app',
    categories: ['Product', 'Web'],
    featured: false,
  },
]

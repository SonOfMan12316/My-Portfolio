export type ExperienceType =
  | 'full-time'
  | 'part-time'
  | 'freelancer'
  | 'intern'
  | 'volunteer'
  | 'contract'

export interface ExperienceInterface {
  name: string
  logo: string
  role: string
  type: ExperienceType
  description: string
  achievements: Array<string>
  start: string
  end: string
  src: string
  alt: string
}

export const experiences: ExperienceInterface[] = [
  {
    name: 'FamVerse LTD',
    logo: '',
    role: 'Backend Engineer',
    type: 'full-time',
    description:
      'Collaborated closely with front-end engineers, back-end engineers, QA teams, and project managers to successfully execute the full software development life cycle, ensuring timely delivery of high-quality web solutions.',
    achievements: [
      'Collaborated with frontend engineers to build APIs serving React application with 5,000+ users, maintaining 90% test coverage and comprehensive Swagger documentation',
      'Implemented Redis caching reducing API response times by 45%, directly improving frontend load times and user experience',
      'Migrated email infrastructure with zero downtime, enabling reliable user notifications for password resets, alerts, and confirmations',
      'Documented 30+ endpoints with detailed schemas and examples, reducing frontend integration time by 40%'
    ],
    start: '27/10/2025',
    end: '',
    src: '',
    alt: 'FamVerse',
  },
  {
    name: 'SAED Int Services',
    logo: '/work/saed.webp',
    role: 'Frontend Engineer',
    type: 'full-time',
    description:
      'Collaborated closely with front-end engineers, back-end engineers, QA teams, and project managers to successfully execute the full software development life cycle, ensuring timely delivery of high-quality web solutions.',
    achievements: [
      'Led a team of 2 junior and mid-level frontend engineers, providing technical guidance on React/TypeScript best practices, conducting code reviews',
      'Successfully onboarded 2 new hires, reducing sprint velocity gaps by 30% through structured pair programming sessions and knowledge-sharing workshops. Ensured on-time delivery of responsive UIs while fostering collaborative Agile workflows',
      'Built admin portal with Vue.js and TypeScript managing healthcare staff and practitioners, featuring role-based access control and real-time data updates',
      'Developed workspace application with React and TypeScript, increasing user engagement by 50% through intuitive UI and seamless workflows',
      'Architected modular system where each service operates independently, eliminating system-wide failures when individual modules go down',
      'Collaborated across 500+ Agile sprint cycles with cross-functional teams, consistently delivering features on schedule',
      'Worked closely with backend engineers to define API contracts and ensure seamless frontend-backend integration'
    ],
    start: '18/01/2021',
    end: '31/08/2025',
    src: '',
    alt: 'Saed',
  },
  {
    name: 'Mungin',
    logo: '/work/mungin.webp',
    role: 'Front-End Engineer',
    type: 'contract',
    description:
      'Delivered responsive web applications for a fast-paced startup, enhancing user experience and performance across multiple platforms',
    achievements: [
      'Delivered responsive Vue.js applications with TailwindCSS, achieving pixel-perfect implementations acrossmobile, tablet, and desktop',
      'Reduced page load times by 35% through code splitting, lazy loading, and performance optimization techniques',
      'Integrated RESTful API endpoints with optimized data fetching, error handling, and real-time updates',
      ' Collaborated with 3 backend engineers and 2 DevOps specialists to deploy features to production infrastructure',
    ],
    start: '31/01/2021',
    end: '31/04/2022',
    src: '',
    alt: 'Mungin',
  },
]

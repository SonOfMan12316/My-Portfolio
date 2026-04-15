import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import InitialLoadScreen from './components/molecules/InitialLoadScreen'

const poppinsSans = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppi-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Emanyo Charles - Senior Frontend Engineer',
    template: '%s | Emanyo Charles',
  },
  description:
    'Senior Frontend Engineer with 5+ years of experience building production-grade React and TypeScript products, fullstack systems, and cross-platform mobile apps.',
  authors: [
    { name: 'Emanyo Charles', url: 'https://emanyo-charles.vercel.app/' },
  ],
  creator: 'Emanyo Charles',
  publisher: 'Emanyo Charles',
  metadataBase: new URL('https://emanyo-charles.vercel.app/'),
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'Emanyo Charles',
    'Senior Frontend Engineer',
    'Software Engineer',
    'Fullstack Engineer',
    'Cross-platform Mobile Engineer',
    'React',
    'TypeScript',
    'Next.js',
    'NestJS',
    'Node.js',
    'Tailwind',
    'JavaScript',
    'Performance Optimization',
    'Web Applications',
    'Product Engineering',
    'Developer Portfolio',
  ],
  openGraph: {
    title:
      'Emanyo Charles - Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 5+ years of experience building production-grade React and TypeScript products, fullstack systems, and cross-platform mobile apps.',
    url: 'https://emanyo-charles.vercel.app/',
    siteName: 'Emanyo Charles',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  category: 'technology',
  classification: 'Software Engineer',
  applicationName: 'Emanyo Charles Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        <InitialLoadScreen />
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        {children}
      </body>
    </html>
  )
}

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
    default: 'Emanyo Charles - Software Engineer',
    template: '%s | Emanyo Charles',
  },
  description:
    'Software Engineer with 5 years of experience shipping production-grade web applications across React, Next.js, NestJS, and Node. I build products that scale from pixel-perfect UIs to reliable APIs.',
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
    'Frontend',
    'Software Engineer',
    'Vue',
    'React',
    'Tailwind',
    'JavaScript',
    'Next.js',
    'Nest.js',
    'HTML',
    'CSS',
    'Express',
    'MongoBD',
    'Firebase',
    'Web Developer',
    'Micro-SaaS',
    'UI Developer',
    'Developer Portfolio',
  ],
  openGraph: {
    title:
      'Emanyo Charles - Software Engineer',
    description:
      'Software Engineer with 5 years of experience shipping production-grade web applications across React, Next.js, NestJS, and Node. I build products that scale from pixel-perfect UIs to reliable APIs.',
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

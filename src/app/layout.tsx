import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Emanyo Charles — Senior Software Engineer',
    template: '%s | Emanyo Charles',
  },
  description:
    'Senior Software Engineer with 6+ years of experience building production-grade React and TypeScript products, backend systems, and cross-platform mobile apps.',
  authors: [
    { name: 'Emanyo Charles', url: 'https://emanyo-charles.vercel.app/' },
  ],
  creator: 'Emanyo Charles',
  publisher: 'Emanyo Charles',
  metadataBase: new URL('https://emanyo-charles.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'Emanyo Charles',
    'Senior Software Engineer',
    'Software Engineer',
    'Full Stack Engineer',
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
    title: 'Emanyo Charles — Senior Software Engineer',
    description:
      'Senior Software Engineer with 6+ years of experience building production-grade React and TypeScript products, backend systems, and cross-platform mobile apps.',
    url: 'https://emanyo-charles.vercel.app/',
    siteName: 'Emanyo Charles',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emanyo Charles — Senior Software Engineer',
    description:
      'Senior Software Engineer with 6+ years of experience building production-grade React and TypeScript products, backend systems, and cross-platform mobile apps.',
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
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emanyo Charles',
    url: 'https://emanyo-charles.vercel.app/',
    jobTitle: 'Senior Software Engineer',
    sameAs: [
      'https://github.com/SonOfMan12316',
      'https://www.linkedin.com/in/charles-emanyo-a56457233',
      'https://x.com/mancyDev',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The hero is set in General Sans, so fetch it with the document
            rather than after CSS parses — otherwise the justified wordmark
            lays out in a fallback face first and visibly re-flows. */}
        <link
          rel="preload"
          href="/fonts/general-sans-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/general-sans-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <script
          id="st-boot"
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;r.setAttribute('data-js','');try{if(!sessionStorage.getItem('intro'))r.setAttribute('data-intro','play')}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){r.setAttribute('data-js','live')})})})();`,
          }}
        />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        {children}
      </body>
    </html>
  )
}

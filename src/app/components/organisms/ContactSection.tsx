import SectionTemplate from '@/templates/SectionTemplate'
import Footer from './Footer'
import { mergeClassNames } from '@/utils/classNames'
import Title from '../atoms/Title'
import Subtitle from '../atoms/Subtitle'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

export default function CTASection() {
  const contactLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/SonOfMan12316',
      icon: FaGithub,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/charles-emanyo-a56457233',
      icon: FaLinkedin,
    },
    {
      label: 'X',
      href: 'https://x.com/SonOfMan12316',
      icon: FaXTwitter,
    },
    {
      label: 'Gmail',
      href: 'mailto:emanyocharles40@gmail.com',
      icon: FaEnvelope,
    },
  ]

  return (
    <>
      <SectionTemplate
        id="contact"
        className="flex flex-col justify-between min-h-0 pt-12 sm:pt-16"
      >
        <div className="w-full mx-auto max-w-[1160px]">
          <div
            className={mergeClassNames(
              'flex flex-col items-start justify-center w-full z-30 mb-10 sm:mb-14'
            )}
          >
            <Title className="text-left">Contact</Title>
            <Subtitle className="pt-4 text-left max-w-2xl">
              I&apos;m open to frontend, fullstack, and cross-platform mobile
              opportunities - feel free to reach out.
            </Subtitle>
            <div className="pt-7 flex items-center gap-5">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center text-gray-100 hover:text-[var(--action)] transition-colors"
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </SectionTemplate>
    </>
  )
}

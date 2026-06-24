import AnimatedComponent from '../molecules/AnimatedComponent'
import Logo from '../molecules/Logo'
import Menu from '../molecules/Menu'
import PageTemplate from '@/templates/PageTemplate'
import NavigationTabs from './NavigationTabs'
import { mergeClassNames, PAGE_CONTAINER, PAGE_GUTTER } from '@/utils/classNames'

export default function Header() {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className="fixed top-0 left-0 w-dvw z-50 border-b border-white/5 bg-[var(--color-background)]/70 backdrop-blur-2xl"
      slideUp
    >
      <PageTemplate>
        <div
          className={mergeClassNames(
            'flex items-center justify-between h-[72px] select-none',
            PAGE_CONTAINER,
            PAGE_GUTTER
          )}
        >
          <Logo />
          <NavigationTabs className="hidden lg:inline" />
          <Menu />
        </div>
      </PageTemplate>
    </AnimatedComponent>
  )
}

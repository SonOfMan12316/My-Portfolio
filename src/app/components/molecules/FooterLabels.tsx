import AnimatedComponent from './AnimatedComponent'

interface FooterLabelsProps {
  disableAnimation?: boolean
}

export default function FooterLabels({
  disableAnimation = false,
}: FooterLabelsProps) {
  return (
    <AnimatedComponent
      disableAnimation={disableAnimation}
      HTMLtag="div"
      className="text-xs sm:text-sm font-normal text-gray-400 select-none text-center"
    >
      Copyright © 2026 Charles Emanyo
    </AnimatedComponent>
  )
}

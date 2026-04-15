import PageTemplate from "@/templates/PageTemplate";
import FooterLabels from "../molecules/FooterLabels";
import { mergeClassNames } from "@/utils/classNames";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <PageTemplate className={mergeClassNames(className, 'px-0 pb-6')}>
      <div className="flex flex-col gap-4 items-center w-full border-t border-white/10 pt-6">
        <FooterLabels />
      </div>
    </PageTemplate>
  )
}

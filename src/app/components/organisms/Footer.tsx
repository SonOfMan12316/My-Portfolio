import FooterLabels from "../molecules/FooterLabels";
import { mergeClassNames, PAGE_CONTAINER } from "@/utils/classNames";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={mergeClassNames(
        PAGE_CONTAINER,
        "flex flex-col gap-4 items-center w-full border-t border-white/10 pt-6 pb-6",
        className
      )}
    >
      <FooterLabels />
    </div>
  )
}

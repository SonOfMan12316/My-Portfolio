import { mergeClassNames, PAGE_GUTTER } from "@/utils/classNames";

interface SectionTemplateProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPaddingInline?: boolean;
  isTranparentBackgroud?: boolean;
}

export default function SectionTemplate({
  children,
  id,
  className,
  noPaddingInline = false,
  isTranparentBackgroud = false,
}: SectionTemplateProps) {
  return (
    <div
      className={mergeClassNames(
        "w-full pt-24 pb-16 sm:pt-28 sm:pb-20 scroll-mt-24",
        noPaddingInline ? "" : PAGE_GUTTER,
        isTranparentBackgroud ? "" : "bg-[var(--color-background)]",
        className
      )}
      id={id}
    >
      {children}
    </div>
  );
}

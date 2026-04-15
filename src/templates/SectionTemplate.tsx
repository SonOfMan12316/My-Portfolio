import { mergeClassNames } from "@/utils/classNames";

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
        noPaddingInline ? "" : "px-0 sm:px-2 lg:px-4",
        isTranparentBackgroud ? "" : "bg-[var(--color-background)]",
        className
      )}
      id={id}
    >
      {children}
    </div>
  );
}

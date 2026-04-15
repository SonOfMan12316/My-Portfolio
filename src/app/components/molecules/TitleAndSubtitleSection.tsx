import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import { mergeClassNames } from "@/utils/classNames";

interface TitleAndSubtitleSectionProps {
  children: React.ReactNode;
  title: string;
  subtitle: string | React.ReactNode;
  className?: string;
}

export default function TitleAndSubtitleSection({
  children,
  title,
  subtitle,
  className,
}: TitleAndSubtitleSectionProps) {
  return (
    <>
      <div
        className={mergeClassNames(
          "flex flex-col items-start justify-center w-full z-30 mb-10 sm:mb-14 max-w-4xl",
          className
        )}
      >
        <Title className="text-left">{title}</Title>
        <Subtitle className="pt-4 text-left max-w-3xl">{subtitle}</Subtitle>
      </div>

      {children}
    </>
  );
}

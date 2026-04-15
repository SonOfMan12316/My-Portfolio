import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "../molecules/AnimatedComponent";

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <AnimatedComponent
      className={mergeClassNames(
        "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center sm:text-left",
        className
      )}
      HTMLtag="h1"
    >
      {children}
    </AnimatedComponent>
  );
}

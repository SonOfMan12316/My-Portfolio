"use client";

import { mergeClassNames } from "@/utils/classNames";
import { VscLoading } from "react-icons/vsc";
import AnimatedComponent from "../molecules/AnimatedComponent";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "normal";
  disableAnimation?: boolean;
  shadow?: boolean;
  isFull?: boolean;
  isLoading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-[var(--action)] text-[var(--color-background)] hover:enabled:bg-[var(--action)]/85",
  secondary:
    "bg-transparent border border-gray-200/25 text-gray-100 hover:enabled:bg-white/10 hover:enabled:border-gray-200/45",
};

const isLodingVariants = {
  primary: "animate-spin text-[var(--color-background)]",
  secondary: "animate-spin text-gray-200",
};

const sizeVariants = {
  small: "px-3 py-2 gap-2",
  normal: "px-5 py-3 gap-3",
};

export default function Button({
  children,
  className,
  variant,
  shadow = false,
  isFull = true,
  isLoading = false,
  disableAnimation = false,
  size = "normal",
  ...rest
}: ButtonProps) {
  const componentClasses = [
    "flex relative inline-flex justify-center items-center",
    sizeVariants[size],
    "text-sm sm:text-base font-semibold",
    "transition-all duration-250 cursor-pointer",
    "disabled:cursor-not-allowed",
    "rounded-lg",
    isFull ? "w-full" : "",
    shadow ? "shadow-md" : "",
    variant ? buttonVariants[variant] : "",
    className ?? "",
  ].join(" ");

  const childrenClasses = [
    "flex items-center gap-4",
    "select-none",
    isLoading ? "invisible" : "visible",
  ].join(" ");

  const loadingClasses = [
    "absolute",
    "left-1/2 -translate-x-1/2",
    variant ? isLodingVariants[variant] : "",
  ].join(" ");

  return (
    <AnimatedComponent
      HTMLtag="button"
      className={`${mergeClassNames(componentClasses)} `}
      disableAnimation={disableAnimation}
      {...rest}
    >
      <span className={childrenClasses}>{children}</span>
      {isLoading && <VscLoading size={20} className={loadingClasses} />}
    </AnimatedComponent>
  );
}

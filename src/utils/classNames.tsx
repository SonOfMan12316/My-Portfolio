import { twMerge } from "tailwind-merge";

export const PAGE_GUTTER = "px-4 sm:px-6 lg:px-8";
export const PAGE_CONTAINER = "w-full mx-auto max-w-[1160px]";

export function mergeClassNames(
  ...classes: (string | undefined | null | false)[]
) {
  return twMerge(classes.filter(Boolean).join(" "));
}

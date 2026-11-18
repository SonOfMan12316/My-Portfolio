'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectOptions {
  /** Stop observing after the first intersection. Default true. */
  once?: boolean
  /** Fraction of the element that must be visible. Default 0.15. */
  threshold?: number
  /** Margin around the root. Default pulls the trigger up slightly. */
  rootMargin?: string
}

/**
 * Adds the `in` class once an element scrolls into view, which is what the
 * `.st-io` reveal transition keys off.
 */
export function useIntersect<T extends HTMLElement = HTMLElement>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: UseIntersectOptions = {}) {
  const ref = useRef<T>(null)
  const [isIn, setIsIn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or no JS gating) means show it immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setIsIn(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsIn(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsIn(false)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, isIn }
}

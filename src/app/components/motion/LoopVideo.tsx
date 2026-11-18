'use client'

import { useEffect, useRef, useState } from 'react'
import { mergeClassNames } from '@/utils/classNames'

interface LoopVideoProps {
  src: string
  poster?: string
  label: string
  id: string
  paused?: boolean
  className?: string
}

/**
 * A muted looping clip that plays only while it's on screen and the tab is
 * visible. Honours an external `paused` flag so a toggle button can stop it.
 */
export default function LoopVideo({
  src,
  poster,
  label,
  id,
  paused = false,
  className,
}: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const video = ref.current
    // With reduced motion we hand the user native controls instead of looping.
    if (!video || reduced) return

    if (paused) {
      video.pause()
      return
    }

    let onScreen = false
    const sync = () => {
      if (onScreen && !document.hidden) {
        video.play().catch(() => {
          // Autoplay can still be refused; the poster stays visible.
        })
      } else {
        video.pause()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0.15 }
    )

    observer.observe(video)
    document.addEventListener('visibilitychange', sync)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [reduced, paused])

  return (
    <video
      ref={ref}
      id={id}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

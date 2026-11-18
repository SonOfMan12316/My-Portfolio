'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

export type HeroPhase = 'idle' | 'go' | 'run' | 'done'

const EASE_OUT = 'cubic-bezier(.19, 1, .22, 1)'
const EASE_IN_OUT = 'cubic-bezier(.76, 0, .24, 1)'

/** Only the very first render of a session gets the long intro. */
let introSpent = false

/**
 * Drives the hero's entrance.
 *
 *   idle — words parked below their masks
 *   go   — fonts ready, transitions will now take effect
 *   run  — the first-visit sequence is playing
 *   done — masks removed so descenders aren't clipped
 *
 * A repeat visit just staggers the words up out of their masks. A first visit
 * instead opens with the words huge and stacked down the middle of the screen,
 * then rises, shrinks and collapses them into the single justified headline.
 */
export function useHeroPhase(root: RefObject<HTMLElement | null>) {
  const [phase, setPhase] = useState<HeroPhase>('idle')
  const isFirstVisit = useRef<boolean | null>(null)

  useEffect(() => {
    const host = root.current
    if (!host) return

    if (isFirstVisit.current === null) {
      isFirstVisit.current =
        document.documentElement.dataset.intro === 'play' && !introSpent
      introSpent = true
    }
    const cinematic = isFirstVisit.current

    try {
      sessionStorage.setItem('intro', '1')
    } catch {
      // Private browsing can refuse storage; the intro simply replays.
    }

    let cancelled = false
    const running: Animation[] = []

    const finish = () => {
      running.forEach((animation) => animation.cancel())
      host
        .querySelectorAll<HTMLElement>('.st-wd, .st-ws')
        .forEach((el) => {
          el.style.transform = ''
        })
      if (!cancelled) setPhase('done')
    }

    // Measuring before the display face is ready would size the words wrong.
    Promise.race([
      document.fonts.load('500 1em "General Sans"').catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]).then(() => {
      if (cancelled || !host) return

      setPhase('go')

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPhase('done')
        return
      }

      const words = [...host.querySelectorAll<HTMLElement>('.st-wd')]
      const scalers = [...host.querySelectorAll<HTMLElement>('.st-ws')]
      const inners = [...host.querySelectorAll<HTMLElement>('.st-wi')]
      if (!words.length) return

      if (!cinematic) {
        inners.forEach((el, i) =>
          running.push(
            el.animate(
              [{ transform: 'translateY(102%)' }, { transform: 'none' }],
              { duration: 800, delay: i * 60, easing: EASE_OUT, fill: 'both' }
            )
          )
        )
        running.at(-1)?.finished.then(finish, () => {})
        return
      }

      const gutter = window.innerWidth <= 720 ? 16 : 32
      const rects = words.map((el) => el.getBoundingClientRect())
      const lines = words.length

      // Blow the words up as large as they'll go without leaving the viewport,
      // horizontally bounded by the widest word and vertically by the stack.
      const scale = Math.min(
        (window.innerWidth - 2 * gutter) /
          Math.max(...rects.map((r) => r.width)),
        (window.innerHeight * 0.86) / (rects[0].height * lines * 0.86)
      )
      const lineHeight = rects[0].height * scale * 0.86
      const top = (window.innerHeight - lineHeight * lines) / 2

      const blownUp = rects.map(
        (r) => `translateX(${gutter - r.left}px) scale(${scale})`
      )
      const stacked = rects.map(
        (r, i) => `translateY(${top + i * lineHeight - r.top}px)`
      )

      // Place them before animating so the big state never flashes in.
      scalers.forEach((el, i) => {
        el.style.transform = blownUp[i]
      })
      words.forEach((el, i) => {
        el.style.transform = stacked[i]
      })

      setPhase('run')
      // Release the rest of the page partway through rather than at the end.
      window.setTimeout(() => {
        if (!cancelled) setPhase((p) => (p === 'run' ? 'go' : p))
      }, 1600)

      inners.forEach((el, i) =>
        running.push(
          el.animate(
            [{ transform: 'translateY(102%)' }, { transform: 'none' }],
            {
              duration: 900,
              delay: 80 + i * 90,
              easing: EASE_OUT,
              fill: 'both',
            }
          )
        )
      )
      scalers.forEach((el, i) =>
        running.push(
          el.animate(
            [
              { transform: blownUp[i] },
              { transform: 'translateX(0) scale(1)' },
            ],
            { duration: 1000, delay: 920, easing: EASE_IN_OUT, fill: 'both' }
          )
        )
      )
      words.forEach((el, i) =>
        running.push(
          el.animate(
            [{ transform: stacked[i] }, { transform: 'translateY(0)' }],
            { duration: 950, delay: 1200, easing: EASE_IN_OUT, fill: 'both' }
          )
        )
      )

      running.at(-1)?.finished.then(finish, () => {})
      // A resize mid-intro invalidates every measurement we just took.
      addEventListener('resize', finish, { once: true })
    })

    return () => {
      cancelled = true
      running.forEach((animation) => animation.cancel())
      removeEventListener('resize', finish)
    }
  }, [root])

  return phase
}

'use client'

import { useEffect, useRef } from 'react'

/** Spacing between dots, in CSS pixels. */
const GRID = 50
/** How far the cursor's influence reaches. */
const HOVER_RADIUS = GRID * 6
/** Maximum distance a dot is pushed away from the cursor. */
const HOVER_PUSH = GRID * 0.25
/** A press reaches slightly further than a hover... */
const PRESS_RADIUS = HOVER_RADIUS * 1.25
/** ...and pulls inward rather than pushing away. */
const PRESS_PULL = GRID * 0.32

const DOT_COLOR = 'rgb(50 50 50 / 0.35)'
const DOT_RADIUS = 1

/** Ease the falloff so dots near the edge of the radius barely move. */
const smoothstep = (t: number) => t * t * (3 - 2 * t)
const easeOut = (t: number, power: number) => 1 - (1 - t) ** power

interface PressState {
  x: number
  y: number
  from: number
  to: number
  start: number
  ms: number
  power: number
}

/**
 * The dotted paper behind the page. Dots scatter away from the cursor and
 * gather toward a mouse press. Drawn on a fixed canvas that sits behind
 * everything; only enabled for devices that actually have a pointer.
 */
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Touch devices get the static grid; there is no cursor to react to.
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduced = matchMedia('(prefers-reduced-motion: reduce)')

    let pointer: { x: number; y: number } | null = null
    let frame = 0
    const press: PressState = {
      x: 0,
      y: 0,
      from: 0,
      to: 0,
      start: 0,
      ms: 1,
      power: 2,
    }

    /** How far through the press animation we are, 0 to 1. */
    const pressAmount = (now: number) => {
      const t = reduced.matches
        ? 1
        : Math.min(1, (now - press.start) / press.ms)
      return press.from + (press.to - press.from) * easeOut(t, press.power)
    }

    const draw = (now: number) => {
      frame = 0

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const pressing = pressAmount(now)

      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()

      for (let col = 0; col <= width + GRID; col += GRID) {
        // Offsetting by the scroll position makes the fixed canvas read as a
        // field that scrolls with the page, wrapping every GRID pixels.
        for (
          let row = -(window.scrollY % GRID);
          row <= height + GRID;
          row += GRID
        ) {
          let x = col
          let y = row

          if (pointer) {
            const dx = col - pointer.x
            const dy = row - pointer.y
            const distance = Math.hypot(dx, dy)

            if (distance > 0 && distance < HOVER_RADIUS) {
              const push =
                smoothstep(1 - distance / HOVER_RADIUS) * HOVER_PUSH
              x += (dx / distance) * push
              y += (dy / distance) * push
            }
          }

          if (pressing > 0) {
            const dx = col - press.x
            const dy = row - press.y
            const distance = Math.hypot(dx, dy)

            if (distance > 0 && distance < PRESS_RADIUS) {
              const pull =
                smoothstep(1 - distance / PRESS_RADIUS) *
                PRESS_PULL *
                pressing
              x -= (dx / distance) * pull
              y -= (dy / distance) * pull
            }
          }

          // Jump to the rim first so consecutive dots aren't joined by a line.
          ctx.moveTo(x + DOT_RADIUS, y)
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
        }
      }

      ctx.fill()

      // Keep animating only while a press is still easing.
      if (!reduced.matches && now - press.start < press.ms) {
        frame = requestAnimationFrame(draw)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = DOT_COLOR
      schedule()
    }

    const animatePress = (to: number, ms: number, power: number) => {
      const now = performance.now()
      Object.assign(press, { from: pressAmount(now), to, start: now, ms, power })
      schedule()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }

    const onPointerLeave = () => {
      pointer = null
      schedule()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      Object.assign(press, { x: event.clientX, y: event.clientY })
      animatePress(1, 250, 2)
    }

    const onPointerUp = () => animatePress(0, 600, 3)

    resize()
    canvas.setAttribute('data-on', '')

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener(
        'pointerleave',
        onPointerLeave
      )
    }
  }, [])

  return <canvas ref={canvasRef} className="st-dots" aria-hidden="true" />
}

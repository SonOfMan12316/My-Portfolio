'use client'

import { mergeClassNames } from '@/utils/classNames'

interface LoopToggleProps {
  /** id of the video this button controls. */
  target: string
  paused: boolean
  onToggle: () => void
  /** Name of the thing playing, for the accessible label. */
  label: string
  className?: string
}

/** Small play/pause capsule pinned over a looping clip. */
export default function LoopToggle({
  target,
  paused,
  onToggle,
  label,
  className,
}: LoopToggleProps) {
  return (
    <button
      type="button"
      className={mergeClassNames('loop-toggle', className)}
      aria-controls={target}
      aria-label={`${paused ? 'Play' : 'Pause'} ${label}`}
      onClick={onToggle}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        {paused ? (
          <path
            d="M3 1.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z"
            fill="currentColor"
          />
        ) : (
          <path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" />
        )}
      </svg>
    </button>
  )
}

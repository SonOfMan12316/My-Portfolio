'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa6'
import { mergeClassNames } from '@/utils/classNames'

interface ProjectMediaProps {
  title: string
  image: string
  video?: string
}

function getVideoPoster(videoUrl: string) {
  return videoUrl.replace(
    '/video/upload/',
    '/video/upload/so_0,f_jpg,q_auto/'
  ).replace(/\.mp4$/, '.jpg')
}

export default function ProjectMedia({ title, image, video }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!video) {
    return (
      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }

  const handlePlay = async () => {
    const element = videoRef.current
    if (!element) return

    try {
      await element.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative w-full shrink-0 aspect-video overflow-hidden rounded-t-2xl bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        src={video}
        poster={getVideoPoster(video)}
        muted
        loop
        playsInline
        preload="metadata"
        controls={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        aria-label={`${title} demo video`}
      />

      {!isPlaying ? (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/45"
          aria-label={`Play ${title} demo video`}
        >
          <span
            className={mergeClassNames(
              'flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full',
              'border-2 border-[var(--action)] bg-[var(--action)]/20 text-[var(--action)]',
              'shadow-[0_0_24px_rgba(255,174,35,0.25)] transition-transform hover:scale-105'
            )}
          >
            <FaPlay size={22} className="ml-1" />
          </span>
        </button>
      ) : null}
    </div>
  )
}

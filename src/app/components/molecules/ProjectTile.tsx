'use client'

import { useState } from 'react'
import LoopVideo from '../motion/LoopVideo'
import LoopToggle from '../motion/LoopToggle'
import { useIntersect } from '@/hooks/useIntersect'
import { mergeClassNames } from '@/utils/classNames'
import type { SlotPlacement } from '@/utils/workGrid'
import type { ProjectInterface } from '@/data/project'

interface ProjectTileProps {
  project: ProjectInterface
  index: number
  placement: SlotPlacement
}

/** The long `about` copy doubles as the tile caption; one sentence is plenty. */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/)
  return match ? match[0] : text
}

export default function ProjectTile({
  project,
  index,
  placement,
}: ProjectTileProps) {
  const { ref, isIn } = useIntersect<HTMLLIElement>()
  const [paused, setPaused] = useState(false)
  const videoId = `st-loop-${index}`
  const { gc, mt, ar, side, wide, row } = placement

  const caption = project.tagline ?? firstSentence(project.about)

  return (
    <li
      ref={ref}
      className={mergeClassNames('st-tile-slot st-io', isIn && 'in')}
      data-side={side}
      {...(wide ? { 'data-wide': '' } : {})}
      style={{
        ['--gc' as string]: gc,
        ['--gr' as string]: String(row),
        ['--mt' as string]: mt,
        ['--i' as string]: index % 2,
      }}
    >
      <article className="st-tile">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="st-tile-link"
        >
          <div className="st-tile-head">
            <h3 className="st-tile-name">{project.title}</h3>
            <p className="st-tile-desc">{caption}</p>
          </div>

          <div className="st-cover" style={{ ['--ar' as string]: ar }}>
            {project.video ? (
              <LoopVideo
                id={videoId}
                src={project.video}
                poster={project.image}
                label={project.title}
                paused={paused}
              />
            ) : (
              <img
                src={project.image}
                alt=""
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}
          </div>
        </a>

        <div className="st-tile-foot">
          <span className="st-tile-tags">
            {project.categories.join(' · ')}
          </span>
          <span className="st-tile-cta">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Live <i aria-hidden="true">↗</i>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code <i aria-hidden="true">↗</i>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </span>
        </div>

        <p className="st-tile-stack">{project.technologies.join(', ')}</p>
      </article>

      {project.video && (
        <LoopToggle
          className="st-tile-toggle"
          target={videoId}
          paused={paused}
          label={project.title}
          onToggle={() => setPaused((value) => !value)}
        />
      )}
    </li>
  )
}

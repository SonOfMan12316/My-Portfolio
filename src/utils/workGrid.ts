import type { ProjectInterface } from '@/data/project'

/**
 * Placement for the work grid.
 *
 * The reference lays tiles out two per row on a 12-column grid: one wide
 * landscape tile beside one narrow portrait tile, with the wide side
 * alternating and each tile pushed down by a different amount so nothing
 * lines up. Crucially the shape follows the media — a desktop screen
 * recording gets the wide slot, a phone capture gets the narrow one.
 */

export type MediaShape = 'landscape' | 'portrait'

export interface SlotPlacement {
  gc: string
  ar: string
  mt: string
  side: 'l' | 'r'
  wide: boolean
  row: number
}

/** Column spans, depending on which side of the row carries the wide tile. */
const SPANS = {
  left: { left: '1 / 8', right: '9 / 13' },
  right: { left: '1 / 5', right: '6 / 13' },
} as const

/** Vertical offsets per row, cycling so the rhythm keeps varying. */
const OFFSETS = [
  { left: '0', right: '16vh' },
  { left: '10vh', right: '26vh' },
  { left: '12vh', right: '30vh' },
  { left: '18vh', right: '8vh' },
]

/** A phone capture is portrait; everything else reads as landscape. */
export function shapeOf(project: ProjectInterface): MediaShape {
  if (project.orientation) return project.orientation
  if (project.liveOnMobile) return 'portrait'
  return project.categories.includes('Mobile') ? 'portrait' : 'landscape'
}

const wideRatio = (row: number) => (row % 2 === 0 ? '16 / 10' : '2 / 1')
/** Landscape media in a narrow column still shouldn't be cropped to a portrait box. */
const narrowRatio = (shape: MediaShape) =>
  shape === 'portrait' ? '4 / 5' : '4 / 3'

export function placementsFor(projects: ProjectInterface[]): SlotPlacement[] {
  const shapes = projects.map(shapeOf)
  const placements: SlotPlacement[] = []

  for (let i = 0; i < projects.length; i += 2) {
    const row = i / 2
    const offsets = OFFSETS[row % OFFSETS.length]

    // A lone trailing project gets the reference's single wide row.
    if (i + 1 >= projects.length) {
      placements.push({
        gc: '2 / 9',
        ar: shapes[i] === 'portrait' ? '4 / 5' : '16 / 9',
        mt: offsets.left,
        side: 'l',
        wide: shapes[i] === 'landscape',
        row: row + 1,
      })
      break
    }

    const [leftShape, rightShape] = [shapes[i], shapes[i + 1]]

    // Give the wide slot to whichever tile actually holds landscape media.
    // When both match, fall back to alternating so the rhythm still reads.
    let wideSide: 'left' | 'right'
    if (leftShape === 'landscape' && rightShape === 'portrait') {
      wideSide = 'left'
    } else if (leftShape === 'portrait' && rightShape === 'landscape') {
      wideSide = 'right'
    } else {
      wideSide = row % 2 === 0 ? 'right' : 'left'
    }

    const spans = SPANS[wideSide]

    placements.push({
      gc: spans.left,
      ar: wideSide === 'left' ? wideRatio(row) : narrowRatio(leftShape),
      mt: offsets.left,
      side: 'l',
      wide: wideSide === 'left',
      row: row + 1,
    })
    placements.push({
      gc: spans.right,
      ar: wideSide === 'right' ? wideRatio(row) : narrowRatio(rightShape),
      mt: offsets.right,
      side: 'r',
      wide: wideSide === 'right',
      row: row + 1,
    })
  }

  return placements
}

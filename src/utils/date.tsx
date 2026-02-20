export const formatedDateMonthYear = (currentDate: string) => {
  const [day, month, year] = currentDate.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const formatedDate = (currentDate: string) => {
  const [day, month, year] = currentDate.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const getCompactDuration = (
  startStr: string,
  endStr?: string
): string => {
  const [startDay, startMonth, startYear] = startStr.split('/').map(Number)

  let endDay: number
  let endMonth: number
  let endYear: number

  if (!endStr || endStr.trim() === '') {
    const now = new Date()
    endDay = now.getDate()
    endMonth = now.getMonth() + 1
    endYear = now.getFullYear()
  } else {
    const [day, month, year] = endStr.split('/').map(Number)
    endDay = day
    endMonth = month
    endYear = year
  }

  let diff = (endYear - startYear) * 12 + (endMonth - startMonth)

  if (endDay < startDay) {
    diff -= 1
  }

  diff = Math.max(0, diff)

  const years = Math.floor(diff / 12)
  const months = diff % 12

  const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''
  const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''

  return [yearStr, monthStr].filter(Boolean).join(', ')
}

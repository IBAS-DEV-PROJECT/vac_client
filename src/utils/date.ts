export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  const startOfDay = (x: Date) =>
    new Date(x.getFullYear(), x.getMonth(), x.getDate())
  const diffDays = Math.floor(
    (startOfDay(new Date()).getTime() - startOfDay(d).getTime()) / 86400000,
  )

  if (diffDays <= 0) return '오늘'
  if (diffDays === 1) return '어제'
  if (diffDays < 14) return `${diffDays}일 전`
  return formatDate(d)
}

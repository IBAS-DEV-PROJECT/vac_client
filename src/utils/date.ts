export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

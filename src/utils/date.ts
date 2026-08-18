export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

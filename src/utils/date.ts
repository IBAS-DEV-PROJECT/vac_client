export function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${Number(month)}월 ${Number(day)}일`
}

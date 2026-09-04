export function eul(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  if (code < 0) return '을'
  return code % 28 === 0 ? '를' : '을'
}

export function wa(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  if (code < 0) return '와'
  return code % 28 === 0 ? '와' : '과'
}

export function timeAgo(dateInput) {
  const date = new Date(dateInput)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'

  const intervals = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [604800, 'w'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
  ]

  for (const [unit, label] of intervals) {
    const count = Math.floor(seconds / unit)
    if (count >= 1) return `${count}${label} ago`
  }

  return 'just now'
}

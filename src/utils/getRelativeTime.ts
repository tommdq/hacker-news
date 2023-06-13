const DATE_UNITS: Record<string, number> = {
  days: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto'})
console.log(rtf)

export const getRelativeTime = (epochTime: number) => {
  const started = new Date(epochTime * 1000).getTime()
  const now = new Date().getTime()

  const elapsed = (started - now) / 1000

  for (const unit in DATE_UNITS) {
    const absoluteElapsed = Math.abs(elapsed)

    if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
      return rtf.format(
        Math.floor(elapsed / DATE_UNITS[unit]), unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return ''
}
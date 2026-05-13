export function formatRoundNumber(num: any, fixed: number = 3) {
  try {
    return num % 1 !== 0 ? num.toFixed(fixed) : num
  } catch (e) {
    return num
  }
}

export function formatNumberEn(num: any) {
  if (typeof num !== 'number') num = Number(num)
  if (isNaN(num)) return ''
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })
}

export function formatNumberId(num: any) {
  if (typeof num !== 'number') num = Number(num)
  if (isNaN(num)) return ''

  const parts = String(num).split('.')

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (parts[1]) {
    parts[1] = parts[1].substring(0, 3)
    parts[1] = parts[1].replace(/0+$/, '')
  }

  return parts[1] ? parts[0] + ',' + parts[1] : parts[0]
}

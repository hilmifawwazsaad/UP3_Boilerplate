import { DateTime } from 'luxon'

const MONTH = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export function timeAgo(date: string) {
  const pastDate = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'local' })
  const now = DateTime.now()

  const diff = now.diff(pastDate, ['days', 'hours', 'minutes', 'seconds']).toObject()

  const days = Math.floor(diff.days ?? 0)
  const hours = Math.floor(diff.hours ?? 0)
  const minutes = Math.floor(diff.minutes ?? 0)

  if (days > 3) {
    return pastDate.toFormat('dd MMMM yyyy HH:mm:ss') // contoh: 15 September 2025 12:12:47
  } else if (days > 0) {
    return `${days} hari yang lalu`
  } else if (hours > 0) {
    return `${hours} jam yang lalu`
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`
  } else {
    return `beberapa detik yang lalu`
  }
}

export function getYear() {
  const date = new Date()
  return date.getFullYear()
}

export function getMonth() {
  const date = new Date()
  return MONTH[date.getMonth()]
}

export function getDatetime(dateIn = null) {
  let date = new Date()
  if (dateIn) {
    date = new Date(dateIn)
  }
  const year = date.getFullYear()
  const month = MONTH[date.getMonth()]
  const day = date.getDate()
  const hours = date.getHours()
  let minutes = date.getMinutes()
  let minutesFormat = `${minutes}`
  if (minutes < 10) {
    minutesFormat = `0${minutes}`
  }
  return `${day} ${month} ${year} ${hours}:${minutesFormat}`
}

export function getDate(dateIn = null) {
  let date = new Date()
  if (dateIn) {
    date = new Date(dateIn)
  }
  const year = date.getFullYear()
  const month = MONTH[date.getMonth()]
  const day = date.getDate()
  return `${day} ${month} ${year}`
}

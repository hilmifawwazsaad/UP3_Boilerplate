export function randUID(length: number = 32) {
  length -= 1
  const timestamp = Date.now().toString()

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''

  if (length < timestamp.length) {
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomString
  } else {
    const randomLength = length - timestamp.length
    for (let i = 0; i < randomLength; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return randomString + '-' + timestamp
  }
}

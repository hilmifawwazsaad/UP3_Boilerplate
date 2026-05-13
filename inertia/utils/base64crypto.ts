export function encryptBase64(data: any, key: string) {
  let encrypted = ''
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return btoa(encrypted)
}

export function decryptBase64(encryptedData: string, key: string) {
  let decoded = atob(encryptedData)
  let decrypted = ''
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return decrypted
}

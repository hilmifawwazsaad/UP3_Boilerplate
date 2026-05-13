import env from '#start/env'
import CryptoJS from 'crypto-js'

const keyValue: string = env.get('VITE_CRYPTO_SECRET_KEY') as string
const ivKey: string = env.get('VITE_CRYPTO_IV_KEY') as string

export function encryptData(data: string | object): string | undefined {
  if (!data) return undefined

  const key = CryptoJS.PBKDF2(keyValue, 'salt', {
    keySize: 8,
    iterations: 10,
  })

  const iv = CryptoJS.enc.Utf8.parse(ivKey)

  let payload: string
  if (typeof data === 'object') {
    payload = JSON.stringify(data)
  } else {
    payload = data
  }

  const encrypted = CryptoJS.AES.encrypt(payload, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  })

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
}

export function decryptData(data: string): string | object | undefined {
  if (!data) return undefined

  const key = CryptoJS.PBKDF2(keyValue, 'salt', {
    keySize: 8,
    iterations: 10,
  })

  const iv = CryptoJS.enc.Utf8.parse(ivKey)

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(data) } as CryptoJS.lib.CipherParams,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    }
  )

  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)

  try {
    return JSON.parse(decryptedStr)
  } catch {
    return decryptedStr
  }
}

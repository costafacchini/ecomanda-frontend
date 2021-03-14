import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'

export default function decrypt(encryptedText) {
  const encryptedTextStr = Buffer.from(encryptedText, 'base64').toString()
  const bytes = AES.decrypt(encryptedTextStr, 'secret key 123')

  return JSON.parse(bytes.toString(encUTF8))
}
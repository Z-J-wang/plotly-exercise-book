export * from './global.variable'

export function updateUrlHash(hash: string) {
  window.location.hash = hash
}

export type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'
export type Hash = string
/**
 * 生成hash
 * @param message 要生成的hash的字符串
 * @param algorithm 加密算法，默认 SHA-256
 */
export async function generateHash(message: string, algorithm: Algorithm = 'SHA-256'): Promise<Hash> {
  // 1. 将字符串编码为字节流
  const encoder = new TextEncoder()
  const data = encoder.encode(message)

  // 2. 使用 Web Crypto API 计算哈希
  const hashBuffer = await crypto.subtle.digest(algorithm, data)

  // 3. 将结果转为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

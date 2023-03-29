export const importKey = async (key: string): Promise<CryptoKey> => {
  const keyBuffer = unpack(key)
  return await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  )
}

export const encrypt = async (
  data: string,
  key: CryptoKey
): Promise<{ cipher: ArrayBuffer; iv: Uint8Array }> => {
  const encoded = encode(data)
  const iv = generateIv()
  const cipher = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encoded
  )
  return {
    cipher,
    iv
  }
}

export const decrypt = async (
  cipher: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> => {
  const encoded = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    cipher
  )
  return decode(encoded)
}

const encode = (data: string): Uint8Array => {
  const encoder = new TextEncoder()
  return encoder.encode(data)
}

const decode = (bytestream: ArrayBuffer): string => {
  const decoder = new TextDecoder()
  return decoder.decode(bytestream)
}

const generateIv = (): Uint8Array => {
  return window.crypto.getRandomValues(new Uint8Array(12))
}

export const pack = (buffer: ArrayBuffer): string => {
  return window.btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

const unpack = (packed: string): ArrayBuffer => {
  const string = window.atob(packed)
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)
  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }
  return buffer
}

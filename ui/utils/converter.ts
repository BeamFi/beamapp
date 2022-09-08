import { Buffer } from "buffer"
import crc from "crc"

// Original Source - https://github.com/dfinity/nns-js/blob/main/src/utils/converter.utils.ts

export const asciiStringToByteArray = (text: string): Array<number> => {
  return Array.from(text).map(c => c.charCodeAt(0))
}

export const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "")

// 4 bytes
export const calculateCrc32 = (bytes: Uint8Array): Uint8Array => {
  const checksumArrayBuf = new ArrayBuffer(4)
  const view = new DataView(checksumArrayBuf)
  view.setUint32(0, crc.crc32(Buffer.from(bytes)), false)
  return Buffer.from(checksumArrayBuf)
}

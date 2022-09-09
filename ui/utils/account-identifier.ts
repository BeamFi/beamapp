import { Principal } from "@dfinity/principal"
import { sha224 } from "js-sha256"

// Original Source - https://github.com/dfinity/nns-js/blob/main/src/utils/account_identifier.utils.ts

import {
  asciiStringToByteArray,
  calculateCrc32,
  toHexString
} from "./converter"

export const principalToAccountIdentifier = (
  principal: Principal,
  subAccount?: Uint8Array
): string => {
  // Hash (sha224) the principal, the subAccount and some padding
  const padding = asciiStringToByteArray("\x0Aaccount-id")

  const shaObj = sha224.create()
  shaObj.update([
    ...padding,
    ...principal.toUint8Array(),
    ...(subAccount ?? Array(32).fill(0))
  ])
  const hash = new Uint8Array(shaObj.array())

  // Prepend the checksum of the hash and convert to a hex string
  const checksum = calculateCrc32(hash)
  const bytes = new Uint8Array([...checksum, ...hash])
  return toHexString(bytes)
}

export const accountIdentifierHexToBlob = (hex: string): Array<Number> => {
  return [...Uint8Array.from(Buffer.from(hex, "hex"))]
}

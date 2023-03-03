const base = 1000000

// Convert to BigInt e6s format to human readable
export const e6sToHuman = bigIntValue => {
  const normalized = Number(bigIntValue) / base
  return normalized
}

// Convert human readable number to e6s format in BigInt
export const humanToE6s = numberValue => {
  const e6sFormat = BigInt(numberValue * base)
  return e6sFormat
}

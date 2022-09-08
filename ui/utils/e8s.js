const base = 100000000

// Convert to BigInt e8s format to human readable
export const e8sToHuman = bigIntValue => {
  const normalized = Number(bigIntValue) / base
  return normalized
}

// Convert human readable number to e8s format in BigInt
export const humanToE8s = numberValue => {
  const e8sFormat = BigInt(numberValue * base)
  return e8sFormat
}

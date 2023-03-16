const baseOfEight = 100000000

const baseOfTwelve = 1000000000000

// Convert to BigInt e8s format to human readable
export const e8sToHuman = bigIntValue => {
  return Number(bigIntValue) / baseOfEight
}

// Convert to BigInt e12s format to human readable
export const e12sToHuman = bigIntValue => {
  return Number(bigIntValue) / baseOfTwelve
}

// Convert human readable number to e8s format in BigInt
export const humanToE8s = numberValue => {
  return BigInt(numberValue * baseOfEight)
}

// Convert human readable number to e12s format in BigInt
export const humanToE12s = numberValue => {
  return BigInt(numberValue * baseOfTwelve)
}

export const truncFloatDecimals = (number, numDecimals): string => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${numDecimals}})?`, "gi")
  return number.toString().match(re)[0]
}

export const humanReadableNumberString = (number, numDecimals): string => {
  const smallestNumber = 1 / 10 ** numDecimals

  if (number > 0 && number < smallestNumber) {
    return `< ${smallestNumber}`
  }

  return truncFloatDecimals(number, numDecimals)
}

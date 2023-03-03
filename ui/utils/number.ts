export const truncFloatDecimals = (number, numDecimals) => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${numDecimals}})?`, "gi")
  return number.toString().match(re)[0]
}

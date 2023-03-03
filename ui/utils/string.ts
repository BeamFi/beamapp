export const truncate = (
  str,
  firstCharCount = str.length,
  endCharCount = 0,
  dotCount = 3
) => {
  let convertedStr = ""

  convertedStr += str.substring(0, firstCharCount)
  convertedStr += ".".repeat(dotCount)
  convertedStr += str.substring(str.length - endCharCount, str.length)

  return convertedStr
}

export const adaptDomainToURL = domain => {
  if (domain == null) {
    return ""
  }

  if (domain.startsWith("https://") || domain.startsWith("http://")) {
    return domain
  }

  return `https://${domain}`
}

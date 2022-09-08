import moment from "moment"

import { AuthProvider } from "../config"

export const OneMilliSecInNano = BigInt(1000000)

export const convertDateToCandid = date => {
  const currentTime = BigInt(date.getTime())
  return currentTime * OneMilliSecInNano
}

// assume candidDate is in UTC
export const convertCandidDateToJSDate = candidDate => {
  const createdAtInMilliSecs = Number(candidDate / 1000000n)
  const utcDate = moment.utc(createdAtInMilliSecs)
  return utcDate.local().toDate()
}

const { InternetIdentity, Plug } = AuthProvider

export const convertAuthProviderToCandid = authProvider => {
  switch (authProvider) {
    case InternetIdentity:
      return { internetIdentity: null }
    case Plug:
      return { plug: null }
  }
}

export const convertJobFlowStateFromCandid = state => {
  const keys = Object.keys(state)
  if (keys.length > 0) {
    return keys[0]
  }

  return null
}

export const convertToVariant = value => {
  const obj = {}
  obj[value] = null
  return obj
}

export const convertToOptional = value => {
  return [value]
}

export const unwrapOptional = value => {
  return value?.length > 0 ? value[0] : null
}

export const unwrapVariant = variant => {
  if (variant == null) {
    return null
  }

  const value = Object.keys(variant)
  if (value == null || value.length == 0) {
    return null
  }

  return value[0]
}

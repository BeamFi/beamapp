import { truncFloatDecimals } from "./number"

const OneDay = 1000 * 60 * 60 * 24

export const numDaysFromNow = date => {
  const now = new Date()
  const dateDiff = date.getTime() - now.getTime()
  const dayDiff = dateDiff / OneDay
  return dayDiff
}

export const numMinsToDueDate = (startDateInMillSecs, dueDateInMilliSecs) => {
  if (startDateInMillSecs >= dueDateInMilliSecs) {
    return 0
  }

  return (dueDateInMilliSecs - startDateInMillSecs) / (60 * 1000)
}

export const ratePerHr = (
  startDateInMillSecs,
  dueDateInMilliSecs,
  totalTokens
) => {
  const numMins = numMinsToDueDate(startDateInMillSecs, dueDateInMilliSecs)
  const numHrs = numMins / 60
  const beamTokenRatePerHr = truncFloatDecimals(totalTokens / numHrs, 8)

  return beamTokenRatePerHr
}

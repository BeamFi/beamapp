import { checkIIUserAuth } from "./provider/internet-identity"
import { checkPlugUserAuth } from "./provider/plug"

const CANISTERS_WHITE_LIST_STR =
  process.env.NEXT_PUBLIC_CANISTERS_WHITE_LIST || ""
const CANISTERS_WHITE_LIST = CANISTERS_WHITE_LIST_STR.split(",")

export const checkUserAuth = async () => {
  let identity = await checkIIUserAuth()
  if (identity != null) {
    return identity
  }

  identity = await checkPlugUserAuth(
    { isCreateAgent: false },
    CANISTERS_WHITE_LIST
  )
  return identity
}

export const checkUserAuthPrincipalId = async () => {
  let identity = await checkIIUserAuth()
  if (identity != null) {
    return identity?.getPrincipal()?.toString()
  }

  identity = await checkPlugUserAuth(
    { isCreateAgent: false },
    CANISTERS_WHITE_LIST
  )
  return window?.ic?.plug?.sessionManager?.sessionData?.principalId
}

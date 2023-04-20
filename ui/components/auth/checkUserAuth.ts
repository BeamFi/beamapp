import { Identity } from "@dfinity/agent"
import { AuthProvider } from "../../config"
import { principalToAccountIdentifier } from "../../utils/account-identifier"
import { checkIIUserAuth } from "./provider/internet-identity"
import { checkPlugUserAuth } from "./provider/plug"

const CANISTERS_WHITE_LIST_STR =
  process.env.NEXT_PUBLIC_CANISTERS_WHITE_LIST || ""
const CANISTERS_WHITE_LIST = CANISTERS_WHITE_LIST_STR.split(",")

const { InternetIdentity, Plug } = AuthProvider

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

export const checkUserAuthPrincipalId = async (): Promise<string> => {
  let identity = await checkIIUserAuth()
  if (identity != null) {
    return identity?.getPrincipal()?.toString()
  }

  identity = await checkPlugUserAuth(
    { isCreateAgent: false },
    CANISTERS_WHITE_LIST
  )

  if (identity == null) {
    throw new Error("Cannot get principal id")
  }

  return window?.ic?.plug?.sessionManager?.sessionData?.principalId
}

export const checkUserAuthAccountId = async (): Promise<string> => {
  let identity: Identity = await checkIIUserAuth()
  if (identity != null) {
    const principal = identity.getPrincipal()
    return principalToAccountIdentifier(principal)
  }

  identity = await checkPlugUserAuth(
    { isCreateAgent: false },
    CANISTERS_WHITE_LIST
  )

  if (identity == null) {
    throw new Error("Cannot get account id")
  }

  return window?.ic?.plug?.sessionManager?.sessionData?.accountId
}

export const checkUserAuthProvider = async (): Promise<AuthProvider> => {
  let identity = await checkIIUserAuth()
  if (identity != null) {
    return InternetIdentity
  }

  identity = await checkPlugUserAuth(
    { isCreateAgent: false },
    CANISTERS_WHITE_LIST
  )

  if (identity == null) {
    throw new Error("Cannot get auth provider")
  }

  return Plug
}

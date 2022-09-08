import { checkIIUserAuth } from "./provider/internet-identity"
import { checkPlugUserAuth } from "./provider/plug"
import { AuthProvider } from "../../config"

const CANISTERS_WHITE_LIST_STR =
  process.env.NEXT_PUBLIC_CANISTERS_WHITE_LIST || ""
const CANISTERS_WHITE_LIST = CANISTERS_WHITE_LIST_STR.split(",")

export const checkUserAuth = async (authProvider, options) => {
  const { InternetIdentity, Plug } = AuthProvider

  switch (authProvider) {
    case InternetIdentity: {
      const identity = await checkIIUserAuth()
      return identity
    }
    case Plug: {
      const identity = await checkPlugUserAuth(
        options || {},
        CANISTERS_WHITE_LIST
      )
      return identity
    }
    default:
      return null
  }
}

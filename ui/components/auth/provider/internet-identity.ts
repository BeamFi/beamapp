// Dfinity
import { Identity } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"
import { AuthConfig } from "../../../config"

// Util
import log from "../../../utils/log"

const APPLICATION_NAME = "BeamFi%20App"
const APPLICATION_LOGO_URL = "https%3A%2F%2Fbeamfi.app%2Fbeamicon.jpg"
const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize"

export function createIILogin(handleAuthenticated, authProvider) {
  return async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true
      }
    })

    const isAuthenticated = await authClient.isAuthenticated()
    if (isAuthenticated) {
      const identity = await authClient.getIdentity()
      await handleAuthenticated(identity, authProvider)
      return
    }

    const openerFeatures =
      `left=${window.screen.width / 2 - 525 / 2}, ` +
      `top=${window.screen.height / 2 - 705 / 2},` +
      `toolbar=0,location=0,menubar=0,width=525,height=705`

    await authClient.login({
      maxTimeToLive: AuthConfig.MaxSessionDurationNanoSecs,
      windowOpenerFeatures: openerFeatures,
      onSuccess: async () => {
        const identity = (await authClient.getIdentity()) as unknown as Identity
        await handleAuthenticated(identity, authProvider)
      },
      onError: async error => {
        log.error(error)
        await handleAuthenticated(null, authProvider)
      },
      identityProvider: process.env.NEXT_PUBLIC_II_CANISTER + AUTH_PATH
    })
  }
}

export async function checkIIUserAuth() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true
    }
  })

  const isAuthenticated = await authClient.isAuthenticated()
  if (isAuthenticated) {
    const identity = await authClient.getIdentity()
    return identity
  }

  return null
}

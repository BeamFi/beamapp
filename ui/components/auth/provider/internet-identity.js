// Dfinity
import { AuthClient } from "@dfinity/auth-client"
import { AuthConfig } from "../../../config"

// Util
import log from "../../../utils/log"

export function createIILogin(handleAuthenticated, authProvider, isMobile) {
  return async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true
      }
    })

    const popupWindowWidth = 500
    const popupWindowHeight = 900
    const left = (screen.width - popupWindowWidth) / 2
    const top = (screen.height - popupWindowHeight) / 4

    const openerFeatures = isMobile
      ? null
      : `toolbar=0,location=0,menubar=0,width=${popupWindowWidth},height=${popupWindowHeight},left=${left},top=${top}`

    await authClient.login({
      maxTimeToLive: AuthConfig.MaxSessionDurationNanoSecs,
      derivationOrigin: process.env.NEXT_PUBLIC_DERIVATION_ORIGIN,
      windowOpenerFeatures: openerFeatures,
      onSuccess: async () => {
        const identity = await authClient.getIdentity()
        await handleAuthenticated(identity, authProvider)
      },
      onError: async error => {
        log.error(error)
        await handleAuthenticated(null, authProvider)
      },
      identityProvider: process.env.NEXT_PUBLIC_II_CANISTER
    })
  }
}

export async function checkIIUserAuth() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true
    }
  })
  const isAuthenticated = await authClient.isAuthenticated()

  if (isAuthenticated) {
    const identity = await authClient.getIdentity()
    return identity
  }

  return null
}

// Dfinity
import { Identity } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"
import { AuthConfig } from "../../../config"

// Util
import log from "../../../utils/log"

// NFID
const NFID_APPLICATION_NAME = "BeamFi%20App"
const NFID_APPLICATION_LOGO_URL = "https%3A%2F%2Fbeamfi.app%2Fbeamicon.jpg"
const NFID_ORIGIN = process.env.NEXT_PUBLIC_II_CANISTER

const NFID_AUTH_PATH =
  "/authenticate/?applicationName=" +
  NFID_APPLICATION_NAME +
  "&applicationLogo=" +
  NFID_APPLICATION_LOGO_URL +
  "#authorize"

const NFID_AUTH_PROVIDER_URL = NFID_ORIGIN + NFID_AUTH_PATH

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
      identityProvider: NFID_AUTH_PROVIDER_URL
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

const NFID_RE_TRANSFER_APP_META = `applicationName=${NFID_APPLICATION_NAME}&applicationLogo=${NFID_APPLICATION_LOGO_URL}`
const NFID_REQ_TRANSFER = "wallet/request-transfer"

const REQ_TRANSFER_PROVIDER_URL = new URL(
  `${NFID_ORIGIN}/${NFID_REQ_TRANSFER}?${NFID_RE_TRANSFER_APP_META}`
)

export async function transferICP(to: string, amount: number): Promise<number> {
  const { requestTransfer } = await import("@nfid/wallet")

  const result = await requestTransfer(
    { to, amount },
    {
      provider: REQ_TRANSFER_PROVIDER_URL
    }
  )

  switch (result.status) {
    case "SUCCESS":
      return result.height
    default:
      throw new Error(`Failed to transfer ICP: ${result.message}`)
  }
}

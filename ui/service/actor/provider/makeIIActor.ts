import { HttpAgentOptions } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"

export class SessionExpiredError extends Error {
  constructor(message) {
    super(message)
    this.name = "SessionExpiredError"
  }
}

let cachedAuthClient = null

const lazyCreateAuthClient = async () => {
  if (cachedAuthClient != null) {
    return cachedAuthClient
  }

  cachedAuthClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true
    }
  })
  return cachedAuthClient
}

export const makeIIActor = async (canisterId, createActor, identity) => {
  const agentOptions: HttpAgentOptions = {
    host: process.env.NEXT_PUBLIC_IC_HOST
  }

  if (identity) {
    let authClient = await lazyCreateAuthClient()
    let isAuthenticated = await authClient.isAuthenticated()

    if (!isAuthenticated) {
      cachedAuthClient = null
      authClient = await lazyCreateAuthClient()
      isAuthenticated = await authClient.isAuthenticated()

      if (!isAuthenticated) {
        throw new SessionExpiredError("Unauthenticated")
      }
    }

    agentOptions.identity = identity
  }

  return createActor(canisterId, {
    agentOptions
  })
}

export const makeIILogout = () => {
  return async () => {
    const authClient = await lazyCreateAuthClient()
    await authClient.logout()
  }
}

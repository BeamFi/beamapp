// Util
import { PlugConfig } from "../../../config/beamconfig"
import { humanToE8s } from "../../../utils/e8s"
import log from "../../../utils/log"

const host = process.env.NEXT_PUBLIC_IC_HOST

export const createPlugLogin = (
  handleAuthenticated,
  authProvider,
  whiteList,
  showLoginMesg
) => {
  return async () => {
    try {
      const isCreated = await isAgentCreated()
      if (isCreated) {
        const identity = window.ic.plug.agent
        await handleAuthenticated(identity, authProvider)
        return
      }

      showLoginMesg()

      const isConnected = await connectPlug(whiteList)
      if (!isConnected) {
        log.info("createPlugLogin - Plug wallet connection was refused")
        await handleAuthenticated(null, authProvider)
        return
      }

      if (!window.ic?.plug?.agent) {
        log.info("Failed to initialise the Agent")
        await handleAuthenticated(null, authProvider)
        return
      }

      log.info("Plug wallet is connected")

      const identity = window.ic.plug.agent
      await handleAuthenticated(identity, authProvider)
    } catch (e) {
      log.error("Error caught in createPlugLogin")
      log.error(e)
      await handleAuthenticated(null, authProvider)
    }
  }
}

export const isPlugConnected = async () => {
  return await window.ic?.plug?.isConnected()
}

export const isAgentCreated = async () => {
  return (
    (await window.ic?.plug?.isConnected()) && window.ic?.plug?.agent != null
  )
}

export const hasSession = async () => {
  return window.ic?.plug?.sessionManager?.sessionData != null
}

export const checkPlugUserAuth = async (options, whiteList) => {
  const isConnected = await window.ic?.plug?.isConnected()

  if (!isConnected) {
    log.info("Plug is not connected")
    return null
  }

  // Plug is connected here, check if agent is created
  // If not, create agent
  if (!window.ic.plug.agent) {
    if (options?.isCreateAgent) {
      log.info("Plug is connected: Agent not initialzied. Create agent now.")
      const hasAgent = await createAgent(whiteList)

      if (!hasAgent || !window.ic.plug.agent) {
        const isConnected = await connectPlug()
        if (!isConnected || !window.ic.plug.agent) {
          log.info("Problem in creating agent.")
          return null
        }
      }
    } else {
      log.info("Plug is connected: Agent not initialzied.")
      return null
    }
  }

  log.info("Plug agent identity available")

  const identity = window.ic.plug.agent
  return identity
}

export const connectPlugForToken = async ({ showToast, toast, title }) => {
  try {
    const isConnected = await window.ic?.plug?.requestConnect({
      host
    })
    if (isConnected) {
      return true
    }

    showToast(
      toast,
      title,
      "Please install or unlock your Wallet first. If you switched to a new Plug Account or just installed Plug, reload this page.",
      "warning"
    )
    return false
  } catch (error) {
    if (String(error).includes("rejected")) {
      showToast(
        toast,
        title,
        "The request for connecting your Plug Wallet was denied. Please try again.",
        "warning"
      )
    } else {
      log.error(error)
    }

    return false
  }
}

export const connectPlug = async (whitelist?: [string]) => {
  try {
    return await window.ic?.plug?.requestConnect({
      whitelist,
      host
    })
  } catch (error) {
    log.error(error)
    return false
  }
}

const createAgent = async (whiteList?: string[]): Promise<boolean> => {
  return await window.ic?.plug?.createAgent({ whiteList, host })
}

export const verifyBeamPlugConnection = async (): Promise<void> => {
  const connected = await window.ic?.plug?.isConnected()
  const whitelist = PlugConfig.whitelist

  // Request connect if disconnected
  if (!connected) await window.ic.plug.requestConnect({ whitelist, host })

  // Create agent if it is connected but agent is not created
  if (connected) {
    log.info("Plug is connected")
    if (!window.ic?.plug?.agent) {
      log.info("Plug agent is not created. Creating now...")
      await createAgent(whitelist)
    } else {
      log.info("Plug agent has been created")
    }
  }
}

type PlugTransferParams = {
  to: string
  amount: number
}

export const transferICP = async (
  to: string,
  amount: number
): Promise<number> => {
  const escrowAmount: number = Number(humanToE8s(amount))

  const params: PlugTransferParams = {
    to,
    amount: escrowAmount
  }

  // Request transfer from Plug
  const result = await window.ic.plug.requestTransfer(params)
  return result.height
}

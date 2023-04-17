import {
  createActor as createBeamActor,
  canisterId as beamCanisterId,
  idlFactory as beamIdlFactory
} from "../../declarations/beam"

import {
  createActor as createBeamOutActor,
  canisterId as beamOutCanisterId,
  idlFactory as beamOutIdlFactory
} from "../../declarations/beamout"

import {
  createActor as createEscrowPaymentActor,
  canisterId as escrowPaymentCanisterId,
  idlFactory as escrowPaymentIdlFactory
} from "../../declarations/beamescrow"

import { makeIIActor, makeIILogout } from "./provider/makeIIActor"
import { makePlugActor, makePlugLogout } from "./provider/makePlugActor"

export { SessionExpiredError } from "./provider/makeIIActor"

import { AuthProvider } from "../../config"
const { InternetIdentity, Plug } = AuthProvider

import { AuthClient } from "@dfinity/auth-client"

import { type Identity } from "@dfinity/agent"

// Cache
let actorCache = {}
const ActorCacheKey = {
  Beam: "beam",
  BeamOut: "beamout",
  EscrowPayment: "escrowpayment"
}

export const clearCache = () => {
  actorCache = {}
}

const makeActor = async (canisterId, idlFactory, createActor, actorKey) => {
  const cache = actorCache[actorKey]
  let principalId = ""

  // Check NFID II first
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true
    }
  })

  const identity = (await authClient.getIdentity()) as unknown as Identity
  principalId = identity?.getPrincipal()?.toString()
  let authProvider = InternetIdentity

  if (principalId != null) {
    authProvider = InternetIdentity
  } else {
    // Check Plug
    const agent = window?.ic?.plug?.agent
    if (agent != null) {
      const principal = await agent.getPrincipal()
      if (principal != null) {
        principalId = principal.toString()
      }
    }
    authProvider = Plug
  }

  const subKey = `${authProvider}#${canisterId}#${principalId}`
  if (cache != null && cache[subKey]) {
    return cache[subKey]
  }

  if (cache == null) {
    actorCache[actorKey] = {}
  }

  let actor = null

  switch (authProvider) {
    case InternetIdentity: {
      actor = await makeIIActor(canisterId, createActor, identity)
      break
    }
    case Plug: {
      actor = await makePlugActor(canisterId, idlFactory)
      break
    }
    default: {
      return null
    }
  }

  actorCache[actorKey][subKey] = actor
  return actor
}

export const makeLogout = authProvider => {
  switch (authProvider) {
    case InternetIdentity: {
      return makeIILogout()
    }
    case Plug: {
      return makePlugLogout()
    }
  }
}

export const makeBeamActor = async () => {
  return await makeActor(
    beamCanisterId,
    beamIdlFactory,
    createBeamActor,
    ActorCacheKey.Beam
  )
}

export const makeBeamOutActor = async () => {
  return await makeActor(
    beamOutCanisterId,
    beamOutIdlFactory,
    createBeamOutActor,
    ActorCacheKey.BeamOut
  )
}

export const makeEscrowPaymentActor = async () => {
  return await makeActor(
    escrowPaymentCanisterId,
    escrowPaymentIdlFactory,
    createEscrowPaymentActor,
    ActorCacheKey.EscrowPayment
  )
}

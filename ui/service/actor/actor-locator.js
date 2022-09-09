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
} from "../../declarations/escrowpayment"

import { makeIIActor, makeIILogout } from "./provider/makeIIActor"
import { makePlugActor, makePlugLogout } from "./provider/makePlugActor"

export { SessionExpiredError } from "./provider/makeIIActor"

import { AuthProvider } from "../../config"
const { InternetIdentity, Plug } = AuthProvider

import log from "../../utils/log"

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

const makeActor = async (
  canisterId,
  idlFactory,
  createActor,
  identity,
  authProvider = InternetIdentity,
  actorKey
) => {
  const cache = actorCache[actorKey]
  let principalId = ""

  switch (authProvider) {
    case InternetIdentity: {
      principalId = identity?.getPrincipal().toString()
      break
    }
    case Plug: {
      const agent = window?.ic?.plug?.agent
      if (agent) {
        const principal = await agent.getPrincipal()
        principalId = principal.toString()
      }
      break
    }
    default:
      log.info("Unknown auth provider")
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

export const makeBeamActor = async (identity, authProvider) => {
  return await makeActor(
    beamCanisterId,
    beamIdlFactory,
    createBeamActor,
    identity,
    authProvider,
    ActorCacheKey.Beam
  )
}

export const makeBeamOutActor = async (identity, authProvider) => {
  return await makeActor(
    beamOutCanisterId,
    beamOutIdlFactory,
    createBeamOutActor,
    identity,
    authProvider,
    ActorCacheKey.BeamOut
  )
}

export const makeEscrowPaymentActor = async (identity, authProvider) => {
  return await makeActor(
    escrowPaymentCanisterId,
    escrowPaymentIdlFactory,
    createEscrowPaymentActor,
    identity,
    authProvider,
    ActorCacheKey.EscrowPayment
  )
}

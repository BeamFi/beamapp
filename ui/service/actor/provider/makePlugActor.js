import log from "../../../utils/log"

export const makePlugActor = async (canisterId, idlFactory) => {
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    log.info("Plug: Fetching root key for local dev")
    await window.ic?.plug?.agent?.fetchRootKey()
  }

  return await window.ic?.plug?.createActor({
    canisterId,
    interfaceFactory: idlFactory
  })
}

export const makePlugLogout = () => {
  return async () => {}
}

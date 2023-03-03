import log from "../../../utils/log"

export const makePlugActor = async (canisterId, idlFactory) => {
  // Fetch root key for certificate validation during local IC connection
  if (process.env.NEXT_PUBLIC_IC_HOST.includes("localhost")) {
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

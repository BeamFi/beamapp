const path = require("path")

function initCanisterIds() {
  let localCanisters, prodCanisters

  try {
    localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"))
  } catch (error) {
    console.info("No local canister_ids.json found. Continuing production")
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"))
  } catch (error) {
    console.info("No production canister_ids.json found. Continuing with local")
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local")

  console.info(`initCanisterIds: network=${network}`)
  console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`)

  const canisters = network === "local" ? localCanisters : prodCanisters
  const whiteList = []

  for (const canister in canisters) {
    const canisterId = canisters[canister][network]
    process.env[`NEXT_PUBLIC_${canister.toUpperCase()}_CANISTER_ID`] =
      canisterId
    whiteList.push(canisterId)
  }

  const concatedWhiteList = String(whiteList)
  process.env["NEXT_PUBLIC_CANISTERS_WHITE_LIST"] = concatedWhiteList
}

module.exports = {
  initCanisterIds: initCanisterIds
}

import { canisterId as escrowPaymentCanisterId } from "../declarations/beamescrow"

export const BeamCreateLinkConfig = {
  BudgetMinNumTokens: 0.001,
  BudgetMaxNumTokens: 500
}

export const BeamSupportedTokenType = {
  icp: "icp"
}

export const BeamCreateConfig = {
  JobFlowId: 2147483647
}

export const PlugConfig = {
  whitelist: [escrowPaymentCanisterId]
}

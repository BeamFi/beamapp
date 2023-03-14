import { canisterId as escrowPaymentCanisterId } from "../declarations/beamescrow"

export const BeamCreateLinkConfig = {
  BudgetMinNumTokens: 0.001,
  BudgetMaxNumTokens: 500
}

export enum BeamSupportedTokenType {
  // eslint-disable-next-line no-unused-vars
  icp = "icp",
  // eslint-disable-next-line no-unused-vars
  xtc = "xtc"
}

export const nameOfTokenType = tokenType => {
  const { icp, xtc } = BeamSupportedTokenType

  switch (tokenType) {
    case icp:
      return "ICP"
    case xtc:
      return "Cycles Token (XTC)"
  }
}

export const BeamCreateConfig = {
  JobFlowId: 2147483647
}

export const PlugConfig = {
  whitelist: [escrowPaymentCanisterId]
}

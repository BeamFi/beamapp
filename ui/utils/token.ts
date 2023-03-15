import { TokenTypeData } from "../config"
import { BeamSupportedTokenType } from "../config/beamconfig"
import { e12sToHuman, e8sToHuman, humanToE12s, humanToE8s } from "./e8s"

const { icp, xtc } = BeamSupportedTokenType

export const esToHuman = tokenType => {
  switch (tokenType) {
    case icp:
      return e8sToHuman
    case xtc:
      return e12sToHuman
  }
  return e8sToHuman
}

export const humanToEs = tokenType => {
  switch (tokenType) {
    case icp:
      return humanToE8s
    case xtc:
      return humanToE12s
  }
  return humanToE8s
}

export const tokenIcon = (tokenType: BeamSupportedTokenType): any => {
  return TokenTypeData[tokenType].icon
}

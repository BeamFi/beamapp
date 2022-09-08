import React from "react"

import { HStack, Spacer, Text, VStack } from "@chakra-ui/react"

import { ICPIcon } from "../../../../icon"

import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"
import { TokenProgressBar } from "./TokenProgressBar"

export const BeamCard = ({ beamEscrowContract, myPrincipalId }) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const otherPartyPrincipalId =
    escrowObject.otherPartyPrincipalId(myPrincipalId)
  const bgColor = escrowObject.isInBeam(myPrincipalId)
    ? "beam_green"
    : "beam_pink"

  return (
    <VStack borderRadius="30px" bgColor={bgColor}>
      <HStack>
        <ICPIcon />
        <Text>{otherPartyPrincipalId}</Text>
        <Spacer />
        <Text>{escrowObject.initialDeposit()} ICP</Text>
        <Text>(1 ICP/hr)</Text>
      </HStack>
      <TokenProgressBar
        value={escrowObject.creatorOwnedPercentage() * 100}
        tooltipDesc="Beamed"
      />
    </VStack>
  )
}

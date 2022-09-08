import React from "react"

import { Avatar, HStack, Spacer, Text, VStack } from "@chakra-ui/react"

import { ICPIcon } from "../../../../icon"

import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"
import { TokenProgressBar } from "./TokenProgressBar"
import { PrincipalInfo } from "../../../wallet/PrincipalInfo"
import { convertCandidDateToJSDate } from "../../../../model/TypeConversion"
import { truncFloatDecimals } from "../../../../utils/number"

export const BeamCard = ({
  beamEscrowContract,
  myPrincipalId,
  beamReadModel
}) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const otherPartyPrincipalId =
    escrowObject.otherPartyPrincipalId(myPrincipalId)
  const bgColor = escrowObject.isInBeam(myPrincipalId)
    ? "beam_green"
    : "beam_pink"

  const beamRate = () => {
    if (beamReadModel == null) return "??"

    const startDate = convertCandidDateToJSDate(beamReadModel.createdAt)
    const dueDate = convertCandidDateToJSDate(beamReadModel.scheduledEndDate)
    const rate = escrowObject.beamRatePerHr(
      startDate.getTime(),
      dueDate.getTime()
    )
    return truncFloatDecimals(rate, 6)
  }

  return (
    <VStack borderRadius="30px" bgColor={bgColor} w="95%" h="140px">
      <HStack w="100%" py="20px" px="27px">
        <Avatar
          bg="white"
          icon={<ICPIcon w="38px" h="38px" />}
          boxShadow="0px 2.375px 4.75px rgba(0, 0, 0, 0.5)"
          size="1rem"
        />
        <PrincipalInfo fontSize="20px" color="dark_black" pl="8px">
          {otherPartyPrincipalId}
        </PrincipalInfo>
        <Spacer />
        <Text fontSize="16px" color="black_3">
          {escrowObject.initialDeposit()} ICP
        </Text>
        <Text fontSize="14px" color="black_3">
          ({beamRate()} ICP/hr)
        </Text>
      </HStack>
      <TokenProgressBar
        value={escrowObject.creatorOwnedPercentage() * 100}
        numTokensOwned={escrowObject.creatorTotalOwned()}
        w="90%"
      />
    </VStack>
  )
}

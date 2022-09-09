import React from "react"

import { Avatar, HStack, Spacer, Text, VStack } from "@chakra-ui/react"
import { TokenProgressBar } from "./TokenProgressBar"

import { ICPIcon } from "../../../../icon"

import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"

import { PrincipalInfo } from "../../../wallet/PrincipalInfo"
import { convertCandidDateToJSDate } from "../../../../model/TypeConversion"
import { truncFloatDecimals } from "../../../../utils/number"

import { useNavigate } from "react-router-dom"

export const BeamCard = ({
  beamEscrowContract,
  beamReadModel,
  myPrincipalId,
  isOpenDetailEnabled = true,
  setBeamEscrowContract,
  setBeamReadModel
}) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const otherPartyPrincipalId =
    escrowObject.otherPartyPrincipalId(myPrincipalId)

  const bgColor = escrowObject.isBeamRecipient(myPrincipalId)
    ? "beam_green"
    : "beam_pink"

  const navigate = useNavigate()

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

  const gotoDetail = () => {
    if (!isAllDataReady) return

    if (setBeamEscrowContract) setBeamEscrowContract(beamEscrowContract)
    if (setBeamReadModel) setBeamReadModel(beamReadModel)

    navigate(`/mybeams/${beamEscrowContract.id}`)
  }

  const isAllDataReady =
    isOpenDetailEnabled && beamEscrowContract != null && beamReadModel != null

  return (
    <VStack
      borderRadius="30px"
      bgColor={bgColor}
      w="95%"
      h="140px"
      cursor={isAllDataReady ? "pointer" : "auto"}
      onClick={gotoDetail}
    >
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

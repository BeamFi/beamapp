import React, { useState } from "react"

import { Avatar, HStack, Spacer, Text, useMediaQuery, VStack } from "@chakra-ui/react"
import { TokenProgressBar } from "./TokenProgressBar"

import { ICPIcon } from "../../../../icon"

import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"

import { PrincipalInfo } from "../../../wallet/PrincipalInfo"
import { convertCandidDateToJSDate, convertCandidDateToUnixTimestampMs } from "../../../../model/TypeConversion"
import { truncFloatDecimals } from "../../../../utils/number"

import { useNavigate } from "react-router-dom"
import { useInterval } from "../../useInterval"

export const BeamCard = ({
  beamEscrowContract,
  beamReadModel,
  myPrincipalId,
  isOpenDetailEnabled = true,
  setBeamEscrowContract,
  setBeamReadModel,
  ...rest
}) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const [progressPercentage, setProgressPercentage] = useState(escrowObject.creatorOwnedPercentage() * 100);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
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

    useInterval(() => {
        if (beamReadModel) {
          const startTimestamp = convertCandidDateToUnixTimestampMs(beamReadModel.createdAt)
          const dueTimestamp = convertCandidDateToUnixTimestampMs(beamReadModel.scheduledEndDate)
          const totalDurationMs = dueTimestamp - startTimestamp
          const elapsedTime = Date.parse(Date()) - startTimestamp // time that has elapsed so far
          setProgressPercentage((elapsedTime / totalDurationMs) * 100)
        }
    }, 5000)

  return (
    <VStack
      borderRadius="30px"
      bgColor={bgColor}
      w="95%"
      h={isLargerThan768 ? "140px" : "160px"}
      cursor={isAllDataReady ? "pointer" : "auto"}
      onClick={gotoDetail}
      {...rest}
    >
      <HStack w="100%" py="20px" px="27px">
        <Avatar
          bg="white"
          icon={<ICPIcon w="38px" h="38px" />}
          boxShadow="0px 2.375px 4.75px rgba(0, 0, 0, 0.5)"
          size="1rem"
        />
        <PrincipalInfo
          fontSize={{ base: "16px", md: "20px" }}
          color="dark_black"
          pl="8px"
        >
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
        value={progressPercentage}
        numTokensOwned={escrowObject.initialDeposit() * (progressPercentage / 100)}
        w="90%"
        startDate={beamReadModel?.createdAt}
        endDate={beamReadModel?.scheduledEndDate}
      />
    </VStack>
  )
}

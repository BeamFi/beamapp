import React, { useState } from "react"

import {
  Avatar,
  HStack,
  Spacer,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react"
import { TokenProgressBar } from "./TokenProgressBar"

import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"

import { PrincipalInfo } from "../../../wallet/PrincipalInfo"
import {
  convertCandidDateToJSDate,
  convertCandidDateToUnixTimestampMs,
  unwrapVariant
} from "../../../../model/TypeConversion"
import { truncFloatDecimals } from "../../../../utils/number"

import { useNavigate } from "react-router-dom"
import { useInterval } from "../../useInterval"
import { BeamReadModel } from "../../../../declarations/beam/beam.did"
import { EscrowContract } from "../../../../declarations/beamescrow/beamescrow.did"
import { TokenTypeData } from "../../../../config"

type Props = {
  beamEscrowContract: EscrowContract
  beamReadModel?: BeamReadModel
  myPrincipalId: string
  isOpenDetailEnabled?: boolean
  setBeamEscrowContract?: Function
  setBeamReadModel?: any
  progressRefreshRate: number
  transition?: string
  _hover?: any
}

export const BeamCard = ({
  beamEscrowContract,
  beamReadModel,
  myPrincipalId,
  isOpenDetailEnabled = true,
  setBeamEscrowContract,
  setBeamReadModel,
  progressRefreshRate, // in ms
  ...rest
}: Props) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const [progressPercentage, setProgressPercentage] = useState(
    escrowObject.creatorOwnedPercentage() * 100
  )
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
  const otherPartyPrincipalId =
    escrowObject.otherPartyPrincipalId(myPrincipalId)
  const tokenType = escrowObject.tokenType()
  const tokenName = escrowObject.tokenTypeName()
  const TokenIcon = TokenTypeData[tokenType]?.icon

  const bgColor = escrowObject.isBeamRecipient(myPrincipalId)
    ? "beam_green"
    : "beam_pink"

  const navigate = useNavigate()

  const beamRate = () => {
    if (beamReadModel == null) return "??"
    const startDate = convertCandidDateToJSDate(beamReadModel.startDate)
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

  const hasStarted = unwrapVariant(beamReadModel?.status) !== "created"
  const refreshRate = hasStarted ? progressRefreshRate : 0

  useInterval(() => {
    if (beamReadModel != null && refreshRate > 0) {
      const startTimestamp = convertCandidDateToUnixTimestampMs(
        beamReadModel.startDate
      )
      const dueTimestamp = convertCandidDateToUnixTimestampMs(
        beamReadModel.scheduledEndDate
      )
      const totalDurationMs = dueTimestamp - startTimestamp

      const now = Date.now()
      const compareDate = now < dueTimestamp ? now : dueTimestamp
      const elapsedTime = compareDate - startTimestamp // time that has elapsed so far

      setProgressPercentage((elapsedTime / totalDurationMs) * 100)
    }
  }, progressRefreshRate)

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
          icon={<TokenIcon w="38px" h="38px" />}
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
          {escrowObject.initialDeposit()} {tokenName}
        </Text>
        <Text fontSize="14px" color="black_3">
          ({beamRate()} {tokenName}/hr)
        </Text>
      </HStack>
      <TokenProgressBar
        value={progressPercentage}
        numTokensOwned={
          escrowObject.initialDeposit() * (progressPercentage / 100)
        }
        w="90%"
        startDate={hasStarted ? beamReadModel?.startDate : null}
        endDate={hasStarted ? beamReadModel?.scheduledEndDate : null}
        tokenTypeName={tokenName}
      />
    </VStack>
  )
}

import React from "react"

import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { ClaimButton } from "./ClaimButton"

import { truncFloatDecimals } from "../../../../utils/number"
import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"

export const ClaimInfo = ({ beamEscrowContract, myPrincipalId }) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)

  const numCreatorClaimedTokens = escrowObject.creatorClaimed()
  const numCreatorClaimableTokens = escrowObject.creatorClaimable()
  const totalTokens = escrowObject.initialDeposit()
  const claimedPercent =
    totalTokens === 0 ? 0 : numCreatorClaimedTokens / totalTokens

  const filledGradient = () => {
    const halfWayPercent = (1 - claimedPercent) * 100.0
    return `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF ${halfWayPercent}%, #B67BE4 ${halfWayPercent}%, #B67BE4 100%)`
  }

  const isRecipient = escrowObject.isBeamRecipient(myPrincipalId)

  return (
    <Box
      w="450px"
      h="230px"
      borderRadius="25px"
      bgColor="black_2"
      boxShadow="2xl"
    >
      <HStack h="full">
        <Box
          h="full"
          borderRadius="23px"
          maxW="50%"
          w="50%"
          background={filledGradient()}
        >
          <VStack
            h="full"
            color="black_3"
            align="center"
            pt="36px"
            spacing="0px"
          >
            <Text
              fontSize="27px"
              fontWeight="normal"
              align="center"
              lineHeight="24px"
            >
              Amount Claimed
            </Text>
            <Text fontSize="34px" fontWeight="medium" pt="12px">
              {truncFloatDecimals(numCreatorClaimedTokens, 6)} ICP
            </Text>
            <Text fontSize="20px" fontWeight="light">
              /{truncFloatDecimals(totalTokens, 6)} ICP Total
            </Text>
          </VStack>
        </Box>
        <VStack m="0px" align="center">
          <Text
            fontSize="20px"
            fontWeight="normal"
            color="white"
            align="center"
            px="18px"
            lineHeight="18px"
          >
            Available to Claim
          </Text>
          <Text fontSize="27px" fontWeight="medium" color="white">
            {truncFloatDecimals(numCreatorClaimableTokens, 6)} ICP
          </Text>
          {isRecipient && (
            <ClaimButton
              numClaimableTokens={numCreatorClaimableTokens}
              isDisabled={numCreatorClaimableTokens == 0}
            />
          )}
        </VStack>
      </HStack>
    </Box>
  )
}

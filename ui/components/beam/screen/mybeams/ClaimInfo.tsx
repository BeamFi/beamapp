import React from "react"

import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { ClaimButton } from "./ClaimButton"

import { truncFloatDecimals } from "../../../../utils/number"
import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"

export const ClaimInfo = ({ beamEscrowContract, ...rest }) => {
  const escrowObject = new EscrowContractClass(beamEscrowContract)
  const tokenTypeName = escrowObject.tokenTypeName()

  const numCreatorClaimedTokens = escrowObject.creatorClaimed()
  const numCreatorClaimableTokens = escrowObject.creatorClaimable()
  const totalTokens = escrowObject.initialDeposit()
  const claimedPercent =
    totalTokens === 0 ? 0 : numCreatorClaimedTokens / totalTokens

  const filledGradient = () => {
    const halfWayPercent = (1 - claimedPercent) * 100.0
    return `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF ${halfWayPercent}%, #D8F2FF ${halfWayPercent}%, #D8F2FF 100%)`
  }

  return (
    <Box
      h="230px"
      borderRadius="25px"
      bgColor="black_2"
      boxShadow="2xl"
      {...rest}
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
              fontSize={{ base: "18px", md: "27px" }}
              fontWeight="normal"
              align="center"
              lineHeight="24px"
              px="6px"
            >
              Amount Claimed
            </Text>
            <Text
              fontSize={{ base: "22px", md: "24px" }}
              fontWeight="medium"
              pt="12px"
            >
              {truncFloatDecimals(numCreatorClaimedTokens, 6)} {tokenTypeName}
            </Text>
            <Text fontSize={{ base: "16px", md: "20px" }} fontWeight="light">
              /{truncFloatDecimals(totalTokens, 6)} {tokenTypeName} Total
            </Text>
          </VStack>
        </Box>
        <VStack m="0px" align="center" maxW="50%" w="50%">
          <Text
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight="normal"
            color="white"
            align="center"
            px="18px"
            lineHeight="18px"
          >
            Available to Claim
          </Text>
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="medium"
            color="white"
          >
            {truncFloatDecimals(numCreatorClaimableTokens, 6)} {tokenTypeName}
          </Text>
          <ClaimButton
            escrowObject={escrowObject}
            numClaimableTokens={numCreatorClaimableTokens}
            isDisabled={numCreatorClaimableTokens == 0}
          />
        </VStack>
      </HStack>
    </Box>
  )
}

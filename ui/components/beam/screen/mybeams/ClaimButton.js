import React, { useState } from "react"

import { useDisclosure, useToast } from "@chakra-ui/react"

import { ClaimFundsDialog } from "./ClaimFundsDialog"
import { BeamActionButton } from "../../common/BeamActionButton"

import { convertToVariant } from "../../../../model/TypeConversion"
import { makeEscrowPaymentActor } from "../../../../service/actor/actor-locator"
import { accountIdentifierHexToBlob } from "../../../../utils/account-identifier"

import {
  connectPlugForToken,
  isPlugConnected
} from "../../../auth/provider/plug"
import { AuthProvider } from "../../../../config"

import { showToast } from "../../../../utils/toast"
import log from "../../../../utils/log"

export const ClaimButton = ({
  escrowObject,
  numClaimableTokens,
  isDisabled
}) => {
  const [isLoading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const claimFunds = async () => {
    setLoading(true)

    // Check if Plug is available, else show popup mesg
    let isConnected = await isPlugConnected()
    if (!isConnected || window.ic?.plug?.accountId == null) {
      isConnected = await connectPlugForToken({
        showToast,
        toast,
        title: "Claim Funds"
      })

      if (!isConnected) {
        setLoading(false)
        return
      }
    }

    const plugAccountId = window.ic?.plug?.accountId
    if (plugAccountId == null) {
      showToast(
        toast,
        "Claim Funds",
        "We have problem getting your Plug Account ID. Please install or unlock your Wallet first. If you switched to a new Plug Account or just installed Plug, reload this page.",
        "warning"
      )
      setLoading(false)
      return
    }

    try {
      const accountIdBlob = accountIdentifierHexToBlob(plugAccountId)

      const escrowService = await makeEscrowPaymentActor(
        null,
        AuthProvider.Plug
      )

      const result = await escrowService.creatorClaim(
        escrowObject.id(),
        convertToVariant("icp"),
        accountIdBlob
      )

      if (result.ok) {
        showToast(
          toast,
          "Claim Funds",
          "🤩 💰 Awesome! You have succcessfully claimed the funds to your wallet.",
          "success"
        )
      } else {
        throw new Error(log.flattenCandidError(result.err))
      }
    } catch (error) {
      log.error(error)
      showToast(
        toast,
        "Claim Funds",
        "We have a problem processing your claiming funds request. Please try again later. If you need support, " +
          "please contact us at support@beamfi.app. We would be able glad to help.",
        "error"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BeamActionButton
        h="67px"
        px="18px"
        w="unset"
        fontWeight="semibold"
        fontSize={{ base: "16px", md: "20px" }}
        onClick={onOpen}
        isLoading={isLoading}
        isDisabled={isDisabled}
        color="black_5"
        bgColor="beam_green"
      >
        Claim Funds
      </BeamActionButton>
      <ClaimFundsDialog
        isOpen={isOpen}
        onClose={onClose}
        submit={claimFunds}
        numClaimableTokens={numClaimableTokens}
      />
    </>
  )
}

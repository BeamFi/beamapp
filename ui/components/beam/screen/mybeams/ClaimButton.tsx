import React, { useState } from "react"

import { useDisclosure, useToast } from "@chakra-ui/react"

import { ClaimFundsDialog } from "./ClaimFundsDialog"
import { BeamActionButton } from "../../common/BeamActionButton"

import { makeEscrowPaymentActor } from "../../../../service/actor/actor-locator"
import { accountIdentifierHexToBlob } from "../../../../utils/account-identifier"

import { showToast } from "../../../../utils/toast"
import log from "../../../../utils/log"
import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"
import { AccountIdentifier } from "../../../../declarations/beamescrow/beamescrow.did"

import { BeamSupportedTokenType } from "../../../../config/beamconfig"
import { Principal } from "@dfinity/principal"
import {
  checkUserAuthAccountId,
  checkUserAuthPrincipalId
} from "../../../auth/checkUserAuth"

type Props = {
  escrowObject: EscrowContractClass
  numClaimableTokens: number
  isDisabled: boolean
}

export const ClaimButton = ({
  escrowObject,
  numClaimableTokens,
  isDisabled
}: Props) => {
  const [isLoading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()
  const { icp, xtc } = BeamSupportedTokenType

  const claimFunds = async () => {
    setLoading(true)

    try {
      const escrowService = await makeEscrowPaymentActor()

      const tokenType = escrowObject.tokenType()

      let result: { ok: any; err: any }
      switch (tokenType) {
        case icp: {
          const accountId = await checkUserAuthAccountId()
          if (accountId == null) {
            showToast(
              toast,
              "Claim Funds",
              "We have problem connecting your Wallet. Please install or unlock your Wallet first. If you switched to a new Plug Account or just installed Plug, reload this page.",
              "warning"
            )
            setLoading(false)
            return
          }

          const accountIdBlob: AccountIdentifier =
            accountIdentifierHexToBlob(accountId)
          result = await escrowService.creatorClaimByAccountId(
            escrowObject.id(),
            escrowObject.tokenTypeRaw(),
            accountIdBlob
          )
          break
        }
        case xtc: {
          const principalId = await checkUserAuthPrincipalId()
          if (principalId == null) {
            showToast(
              toast,
              "Claim Funds",
              "We have problem connecting your Wallet. Please install or unlock your Wallet first. If you switched to a new Plug Account or just installed Plug, reload this page.",
              "warning"
            )
            setLoading(false)
            return
          }

          const creatorPrincipal = Principal.fromText(principalId)
          result = await escrowService.creatorClaimByPrincipal(
            escrowObject.id(),
            escrowObject.tokenTypeRaw(),
            creatorPrincipal
          )
          break
        }
      }

      if (result?.ok) {
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
        escrowObject={escrowObject}
      />
    </>
  )
}

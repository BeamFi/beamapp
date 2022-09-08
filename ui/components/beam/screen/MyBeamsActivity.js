import React, { useEffect, useState } from "react"

import { HStack } from "@chakra-ui/react"

import { verifyBeamPlugConnection } from "../../auth/provider/plug"
import { makeEscrowPaymentActor } from "../../../service/actor/actor-locator"

import { AuthProvider } from "../../../config"

import log from "../../../utils/log"
import { BeamVStack } from "../common/BeamVStack"
import { BeamInTextIcon, BeamOutTextIcon } from "../../../icon"
import { BeamCard } from "./mybeams/BeamCard"
import { BeamMainActionButtons } from "../BeamMainActionButtons"

export const MyBeamsActivity = ({ setBgColor, setHashtags }) => {
  const initLoading = 1
  const [escrows, setEscrows] = useState([])
  const [myPrincipalId, setMyPrincipalId] = useState(null)

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    loadMyBeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  const loadMyBeams = async () => {
    try {
      await verifyBeamPlugConnection()

      const principalId = window.ic?.plug?.principalId
      setMyPrincipalId(principalId)

      const escrowService = await makeEscrowPaymentActor(
        null,
        AuthProvider.Plug
      )

      const escrows = await escrowService.queryMyBeams()
      log.info(escrows)

      setEscrows(escrows)
    } catch (error) {
      log.error(error)
    } finally {
    }
  }

  return (
    <>
      <BeamVStack>
        <HStack spacing="32px" w="100%" px="67px" py="20px">
          <BeamInTextIcon w="58px" h="35px" />
          <BeamOutTextIcon w="96px" h="35px" />
        </HStack>
        {escrows.map((escrow, index) => (
          <BeamCard
            key={index}
            beamEscrowContract={escrow}
            myPrincipalId={myPrincipalId}
          />
        ))}
      </BeamVStack>
      <BeamMainActionButtons />
    </>
  )
}

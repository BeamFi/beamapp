import React, { useEffect, useState } from "react"

import { BeamVStack } from "../common/BeamVStack"
import { BeamInDetailTextIcon } from "../../../icon"

import log from "../../../utils/log"
import { BeamCard } from "./mybeams/BeamCard"
import { BeamActionButton } from "../common/BeamActionButton"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { useNavigate, useParams } from "react-router-dom"
import { HStack, Spacer } from "@chakra-ui/react"
import { ClaimInfo } from "./mybeams/ClaimInfo"
import { verifyBeamPlugConnection } from "../../auth/provider/plug"
import { StandardSpinner } from "../../StandardSpinner"
import { AuthProvider } from "../../../config"
import {
  makeBeamActor,
  makeEscrowPaymentActor
} from "../../../service/actor/actor-locator"

export const BeamDetail = ({ beamEscrowContract, beamReadModel }) => {
  const { escrowId } = useParams()

  const [isLoading, setLoading] = useState(false)
  const [escrow, setEscrow] = useState(beamEscrowContract)
  const [beam, setBeam] = useState(beamReadModel)

  const principalId = window?.ic?.plug?.sessionManager?.sessionData?.principalId

  const navigate = useNavigate()

  useEffect(() => {
    if (
      escrowId != null &&
      (beamEscrowContract == null || beamReadModel == null)
    ) {
      loadEscrow(escrowId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escrowId])

  const loadEscrow = async id => {
    try {
      setLoading(true)
      await verifyBeamPlugConnection()

      const escrowService = await makeEscrowPaymentActor(
        null,
        AuthProvider.Plug
      )

      const idNum = Number(id)
      const result = await escrowService.queryMyBeamEscrow(idNum)

      if (result.ok) {
        setEscrow(result.ok)
      } else if (result.err) {
        throw new Error(result.err)
      }

      // Early stop of loading spinner so user can see the main info asap
      setLoading(false)

      const beamService = await makeBeamActor(null, AuthProvider.Plug)
      const escrowIds = [idNum]
      const myBeamReadModels = await beamService.queryBeamByEscrowIds(escrowIds)

      if (myBeamReadModels.length >= 0) {
        setBeam(myBeamReadModels[0])
      }
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  const gotToMyBeams = () => {
    navigate("/mybeams")
  }

  return (
    <BeamVStack spacing="26px" mt="80px" px="45px" py="38px">
      <HStack w="100%">
        <BeamActionButton
          leftIcon={<ChevronLeftIcon fontSize="28px" />}
          w={{ base: "120px", md: "122px" }}
          h={{ base: "51px", md: "52px" }}
          onClick={gotToMyBeams}
          border="0.951219px solid #393440"
          borderRadius="12.6829px"
          fontSize="23px"
          color="black_5"
        >
          Back
        </BeamActionButton>
        <Spacer />
      </HStack>

      <HStack w="100%">
        <BeamInDetailTextIcon w="295px" h="34px" ml="20px" mt="10px" />
        <Spacer />
      </HStack>
      {isLoading && <StandardSpinner />}
      {escrow != null && (
        <>
          <BeamCard
            beamEscrowContract={escrow}
            beamReadModel={beam}
            myPrincipalId={principalId}
            isOpenDetailEnabled={false}
          />
          <ClaimInfo beamEscrowContract={escrow} myPrincipalId={principalId} />
        </>
      )}
    </BeamVStack>
  )
}

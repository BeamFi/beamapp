import React, { useEffect, useState } from "react"

import { BeamVStack } from "../common/BeamVStack"
import {
  BackArrowIcon,
  BeamInDetailTextIcon,
  BeamOutDetailTextIcon
} from "../../../icon"

import log from "../../../utils/log"
import { BeamCard } from "./mybeams/BeamCard"
import { BeamActionButton } from "../common/BeamActionButton"
import { useNavigate, useParams } from "react-router-dom"
import { HStack, Spacer } from "@chakra-ui/react"
import { ClaimInfo } from "./mybeams/ClaimInfo"
import { verifyBeamPlugConnection } from "../../auth/provider/plug"
import { StandardSpinner } from "../../StandardSpinner"
import { AuthProvider } from "../../../config"
import { makeBeamActor } from "../../../service/actor/actor-locator"
import { EscrowContractClass } from "../../../model/class/EscrowContractClass"
import { useEscrow } from "../useEscrow"

export const BeamDetail = ({ beamEscrowContract, beamReadModel }) => {
  const { escrowId } = useParams()

  const [isLoading, setLoading] = useState(false)
  const [escrow, setEscrow] = useState(beamEscrowContract)
  const [beam, setBeam] = useState(beamReadModel)

  const myPrincipalId =
    window?.ic?.plug?.sessionManager?.sessionData?.principalId

  const navigate = useNavigate()

  const { escrowContract } = useEscrow(Number(escrowId))

  useEffect(() => {
    setEscrow(escrowContract)
  }, [escrowContract])

  useEffect(() => {
    if (escrowId != null && beamReadModel == null) {
      loadBeam(escrowId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escrowId])

  const loadBeam = async id => {
    try {
      setLoading(true)
      await verifyBeamPlugConnection()

      const beamService = await makeBeamActor(null, AuthProvider.Plug)
      const idNum = Number(id)
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

  const escrowObject =
    beamEscrowContract != null
      ? new EscrowContractClass(beamEscrowContract)
      : null
  const isBeamRecipient = escrowObject?.isBeamRecipient(myPrincipalId)

  return (
    <BeamVStack
      spacing="26px"
      mt="80px"
      px={{ base: "2px", md: "45px" }}
      py="38px"
    >
      <HStack w="100%">
        <BeamActionButton
          leftIcon={<BackArrowIcon color="white" w="10px" h="18px" mr="4px" />}
          w={{ base: "120px", md: "122px" }}
          h={{ base: "51px", md: "52px" }}
          onClick={gotToMyBeams}
          border="0.951219px solid #393440"
          borderRadius="12.6829px"
          fontSize="18px"
          fontWeight="normal"
          color="black_5"
          ml="20px"
        >
          Back
        </BeamActionButton>
        <Spacer />
      </HStack>

      <HStack w="100%">
        {isBeamRecipient && (
          <BeamInDetailTextIcon w="295px" h="34px" ml="50px" mt="10px" />
        )}
        {!isBeamRecipient && (
          <BeamOutDetailTextIcon w="332px" h="36px" ml="50px" mt="10px" />
        )}
        <Spacer />
      </HStack>
      {isLoading && <StandardSpinner />}
      {escrow != null && (
        <>
          <BeamCard
            beamEscrowContract={escrow}
            beamReadModel={beam}
            myPrincipalId={myPrincipalId}
            isOpenDetailEnabled={false}
          />
          <ClaimInfo
            beamEscrowContract={escrow}
            myPrincipalId={myPrincipalId}
            w="92%"
          />
        </>
      )}
    </BeamVStack>
  )
}

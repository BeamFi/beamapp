import React, { useEffect, useState } from "react"

import { HStack } from "@chakra-ui/react"

import { verifyBeamPlugConnection } from "../../auth/provider/plug"
import {
  makeBeamActor,
  makeEscrowPaymentActor
} from "../../../service/actor/actor-locator"

import { AuthProvider } from "../../../config"

import log from "../../../utils/log"
import { BeamVStack } from "../common/BeamVStack"
import { BeamInTextIcon, BeamOutTextIcon } from "../../../icon"
import { BeamCard } from "./mybeams/BeamCard"
import { BeamMainActionButtons } from "../BeamMainActionButtons"
import { StandardSpinner } from "../../StandardSpinner"

export const MyBeamsActivity = ({ setBgColor, setHashtags }) => {
  const initLoading = 1
  const [escrows, setEscrows] = useState([])
  const [beamMap, setBeamMap] = useState({})

  const [myPrincipalId, setMyPrincipalId] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    loadMyBeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  const loadMyBeams = async () => {
    try {
      setLoading(true)
      await verifyBeamPlugConnection()

      const principalId = window.ic?.plug?.principalId
      setMyPrincipalId(principalId)

      const escrowService = await makeEscrowPaymentActor(
        null,
        AuthProvider.Plug
      )

      const myEscrows = await escrowService.queryMyBeams()
      setEscrows(myEscrows)

      // Early stop of loading spinner so user can see the main info asap
      setLoading(false)

      const beamService = await makeBeamActor(null, AuthProvider.Plug)
      const escrowIds = myEscrows.map(escrow => escrow.id)
      const myBeamReadModels = await beamService.queryBeamByEscrowIds(escrowIds)

      const myBeamMap = myBeamReadModels.reduce((map, beam) => {
        const newMap = map
        newMap[beam.escrowId] = beam
        return newMap
      }, {})
      setBeamMap(myBeamMap)
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BeamVStack spacing="15px" mt="80px">
        <HStack spacing="32px" w="100%" px="40px" py="10px">
          <BeamInTextIcon w="58px" h="35px" />
          <BeamOutTextIcon w="96px" h="35px" />
        </HStack>
        {isLoading && <StandardSpinner />}
        {escrows.map((escrow, index) => (
          <BeamCard
            key={index}
            beamEscrowContract={escrow}
            myPrincipalId={myPrincipalId}
            beamReadModel={beamMap[escrow.id]}
          />
        ))}
      </BeamVStack>
      <BeamMainActionButtons py="20px" />
    </>
  )
}

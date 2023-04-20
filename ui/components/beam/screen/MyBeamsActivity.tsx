import React, { useContext, useEffect, useState } from "react"

import { HStack, Link } from "@chakra-ui/react"

import {
  makeBeamActor,
  makeEscrowPaymentActor
} from "../../../service/actor/actor-locator"

import log from "../../../utils/log"
import { BeamVStack } from "../common/BeamVStack"
import { BeamInTextIcon, BeamOutTextIcon } from "../../../icon"
import { BeamCard } from "./mybeams/BeamCard"
import { BeamMainActionButtons } from "../BeamMainActionButtons"
import { StandardSpinner } from "../../StandardSpinner"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { checkUserAuthPrincipalId } from "../../auth/checkUserAuth"
import { AuthProviderContext } from "../../../context/AuthProviderContext"

export const MyBeamsActivity = ({
  setBeamReadModel,
  setBeamEscrowContract
}) => {
  const [escrows, setEscrows] = useState([])
  const [beamMap, setBeamMap] = useState({})

  const authProvider = useContext(AuthProviderContext)

  const [myPrincipalId, setMyPrincipalId] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    loadMyBeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProvider])

  const loadMyBeams = async () => {
    try {
      setLoading(true)

      const principalId = await checkUserAuthPrincipalId()
      setMyPrincipalId(principalId)

      const escrowService = await makeEscrowPaymentActor()
      const myEscrows = await escrowService.queryMyBeams()

      setEscrows(myEscrows)

      // Early stop of loading spinner so user can see the main info asap
      setLoading(false)

      const beamService = await makeBeamActor()
      const escrowIds = myEscrows.map(escrow => escrow.id)
      const myBeamReadModels = await beamService.queryBeamByEscrowIds(escrowIds)

      const myBeamMap = myBeamReadModels.reduce((map, beam) => {
        const newMap = map
        newMap[beam.escrowId] = beam
        return newMap
      }, {})
      setBeamMap(myBeamMap)

      // filter out myEscrows that are not in myBeamMap
      const myEscrowsWithBeam = myEscrows.filter(
        escrow => myBeamMap[escrow.id] != null
      )
      setEscrows(myEscrowsWithBeam)
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BeamVStack spacing="15px" mt="80px">
        <Link
          isExternal
          href="https://legacy.beamfi.app"
          color="blue_2"
          fontSize="16px"
          fontWeight="light"
        >
          Can&apos;t find your beams? Open Legacy version
          <ExternalLinkIcon ml="6px" mb="2px" />
        </Link>
        <HStack spacing="32px" w="100%" px="40px" py="10px">
          <BeamInTextIcon w="58px" h="35px" />
          <BeamOutTextIcon w="96px" h="35px" />
        </HStack>
        {isLoading && <StandardSpinner />}
        {beamMap != null &&
          escrows != null &&
          escrows.map((escrow, index) => {
            const beamReadModel = beamMap[escrow.id]

            return (
              <BeamCard
                key={index}
                beamEscrowContract={escrow}
                myPrincipalId={myPrincipalId}
                beamReadModel={beamReadModel}
                progressRefreshRate={1000}
                setBeamReadModel={setBeamReadModel}
                setBeamEscrowContract={setBeamEscrowContract}
                transition="width 0.5s, height 0.5s, box-shadow 0.5s"
                _hover={{
                  boxShadow: "xl",
                  width: "96%",
                  height: "142px"
                }}
              />
            )
          })}
      </BeamVStack>
      <BeamMainActionButtons
        py="20px"
        pos="fixed"
        bottom="200px"
        isShrink={true}
      />
    </>
  )
}

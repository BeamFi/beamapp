import React from "react"

import { HStack } from "@chakra-ui/react"
import { BeamActionButton } from "./common/BeamActionButton"
import { BeamOutIcon, GetPaidIcon } from "../../icon"
import { useNavigate } from "react-router-dom"

const ActionButton = ({ children, ...others }) => {
  return (
    <BeamActionButton w={{ base: "153px", md: "173px" }} h="52px" {...others}>
      {children}
    </BeamActionButton>
  )
}

export const BeamMainActionButtons = ({ ...rest }) => {
  const navigate = useNavigate()

  const navigateToBeamOut = () => {
    navigate("/beamout")
  }

  const navigateToGetPaid = () => {
    navigate("/getpaid")
  }

  return (
    <HStack spacing="37px" justify="center" {...rest}>
      <ActionButton
        leftIcon={<GetPaidIcon w="23px" h="23px" color="black_5" />}
        onClick={navigateToGetPaid}
      >
        Get Paid
      </ActionButton>
      <ActionButton
        leftIcon={<BeamOutIcon w="19px" h="19px" color="black_5" />}
        onClick={navigateToBeamOut}
      >
        Beam Out
      </ActionButton>
    </HStack>
  )
}

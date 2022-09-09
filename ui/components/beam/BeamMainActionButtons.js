import React from "react"

import { HStack, Text } from "@chakra-ui/react"
import { BeamActionButton } from "./common/BeamActionButton"
import { BeamOutIcon, GetPaidIcon } from "../../icon"
import { useNavigate } from "react-router-dom"

const ActionButton = ({ isShrink, children, ...others }) => {
  return (
    <BeamActionButton
      w={isShrink ? "52px" : { base: "153px", md: "173px" }}
      h="52px"
      transition="all 0.5s"
      _hover={{
        w: { base: "153px", md: "173px" },
        p: {
          visibility: "visible"
        },
        svg: {
          marginLeft: "0px"
        }
      }}
      {...others}
    >
      {children}
    </BeamActionButton>
  )
}

export const BeamMainActionButtons = ({ isShrink = false, ...rest }) => {
  const navigate = useNavigate()

  const navigateToBeamOut = () => {
    navigate("/beamout")
  }

  const navigateToGetPaid = () => {
    navigate("/getpaid")
  }

  return (
    <HStack spacing="60px" justify="center" {...rest}>
      <ActionButton
        leftIcon={
          <GetPaidIcon
            w="23px"
            h="23px"
            color="black_5"
            ml={isShrink ? "76px" : "0px"}
          />
        }
        onClick={navigateToGetPaid}
        isShrink={isShrink}
      >
        <Text visibility={isShrink ? "hidden" : "visible"}>Get Paid</Text>
      </ActionButton>
      <ActionButton
        leftIcon={
          <BeamOutIcon
            w="19px"
            h="19px"
            color="black_5"
            ml={isShrink ? "88px" : "0px"}
          />
        }
        onClick={navigateToBeamOut}
        isShrink={isShrink}
      >
        <Text visibility={isShrink ? "hidden" : "visible"}>Beam Out</Text>
      </ActionButton>
    </HStack>
  )
}

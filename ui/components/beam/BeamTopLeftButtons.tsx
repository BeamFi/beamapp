import React from "react"

import { Center } from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"

// Components
import { BeamActionButton } from "./common/BeamActionButton"
import { BeamIcon } from "../../icon"

export const BeamTopLeftButtons = ({ ...rest }) => {
  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate("/")
  }

  return (
    <Center {...rest}>
      <BeamActionButton
        leftIcon={<BeamIcon w="22px" h="24px" />}
        onClick={navigateToHome}
        w={{ base: "110px", md: "110px" }}
        h={{ base: "38px", md: "52px" }}
      >
        Home
      </BeamActionButton>
    </Center>
  )
}

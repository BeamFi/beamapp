import React from "react"

import { Center } from "@chakra-ui/react"

// Components
import { BeamLoginButton } from "./BeamLoginButton"

export const BeamTopRightButtons = ({ ...rest }) => {
  return (
    <Center {...rest}>
      <BeamLoginButton>Logout</BeamLoginButton>
    </Center>
  )
}

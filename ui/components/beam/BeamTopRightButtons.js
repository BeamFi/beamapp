import React from "react"

import { Center } from "@chakra-ui/react"

// Components
import { BeamLoginButton } from "./BeamLoginButton"

export const BeamTopRightButtons = ({ logout, ...rest }) => {
  return (
    <Center {...rest}>
      <BeamLoginButton logout={logout}>Logout</BeamLoginButton>
    </Center>
  )
}

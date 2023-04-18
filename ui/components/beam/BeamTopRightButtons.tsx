import React from "react"

import { Center } from "@chakra-ui/react"

// Components
import { MyWalletMenu } from "./MyWalletMenu"

export const BeamTopRightButtons = ({ setAuthProvider, ...rest }) => {
  return (
    <Center {...rest}>
      <MyWalletMenu setAuthProvider={setAuthProvider} />
    </Center>
  )
}

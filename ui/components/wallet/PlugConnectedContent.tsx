import React from "react"

import { Text } from "@chakra-ui/react"

import { PlugConnectIcon } from "../../icon"

const Tagline = props => {
  return (
    <Text fontSize="20px" textAlign="center" color="black">
      {props.children}
    </Text>
  )
}

export const PlugConnectedContent = () => {
  return (
    <>
      <Tagline>
        Awesome 👍 ! 😃 Your <PlugConnectIcon h="40px" mr="10px" />
        Plug Wallet is connected to Content Fly.
      </Tagline>
      <Tagline>Enjoy the full features of Content Fly. ⬇️</Tagline>
    </>
  )
}

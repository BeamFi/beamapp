import React, { useEffect } from "react"

import { Text, VStack } from "@chakra-ui/react"

import { StreamICPWIthBeamIcon } from "../../../icon"
import Head from "next/head"
import { BeamMainActionButtons } from "../BeamMainActionButtons"

export const BeamHome = ({ setBgColor, setHashtags }) => {
  const initLoading = 1

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  return (
    <VStack
      spacing={{ base: "10px", md: "12px" }}
      align="center"
      w="100%"
      h="100vh"
      color="dark_black"
      fontSize="16px"
      pb={{ base: "100px", md: "260px" }}
      justifyContent="center"
    >
      <Head>
        <title>Beam</title>
      </Head>
      <StreamICPWIthBeamIcon
        w={{ base: "280px", md: "385px" }}
        h={{ base: "117px", md: "161px" }}
      />
      <VStack py="27px" align="left" w="385px" px={{ base: "24px", md: "0px" }}>
        <Text>Send or Receive a constant stream of ICP.</Text>
        <Text>
          We should all be paid in real-time, not at the end of the month.
        </Text>
        <Text>Make that happen now!</Text>
      </VStack>

      <BeamMainActionButtons />
    </VStack>
  )
}

import React, { useEffect } from "react"

import Head from "next/head"

import { VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export const MyBeamsLayout = ({ setBgColor, setHashtags }) => {
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
      h="100%"
      color="dark_black"
      fontSize="16px"
      pb="260px"
      justifyContent="center"
    >
      <Head>
        <title>My Beams - Beam</title>
      </Head>
      <Outlet />
    </VStack>
  )
}

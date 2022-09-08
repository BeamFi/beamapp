import React, { useEffect } from "react"

import { Text, VStack } from "@chakra-ui/react"

export const BeamDetail = ({ setBgColor, setHashtags }) => {
  const initLoading = 1

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  return (
    <VStack py="27px" align="center" w="385px" px={{ base: "24px", md: "0px" }}>
      <Text>Beam Detail</Text>
    </VStack>
  )
}

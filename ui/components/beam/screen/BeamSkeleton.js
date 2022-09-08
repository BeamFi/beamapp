import React from "react"

import { Outlet } from "react-router-dom"

import { Box, Flex, Hide } from "@chakra-ui/react"

import { BeamFooter } from "../BeamFooter"
import { BeamTopRightButtons } from "../BeamTopRightButtons"
import { BeamTopLeftButtons } from "../BeamTopLeftButtons"

export default function BeamSkeleton({
  bgColor,
  logout,
  hashtags,
  // eslint-disable-next-line no-unused-vars
  triggerAuthUpdate,
  ...rest
}) {
  return (
    <Flex h="100vh" flexDirection="column" bgColor={bgColor} {...rest}>
      <Box pos="absolute" left="38px" top="18px">
        <BeamTopLeftButtons />
      </Box>
      <Box pos="absolute" right="0px" top="10px">
        <BeamTopRightButtons logout={logout} />
      </Box>

      <Outlet />

      <Hide below="md">
        <BeamFooter hashtags={hashtags} />
      </Hide>
    </Flex>
  )
}

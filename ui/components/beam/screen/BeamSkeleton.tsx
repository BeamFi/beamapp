import React from "react"

import { Outlet } from "react-router-dom"

import { Box, Flex, Hide } from "@chakra-ui/react"

import { BeamFooter } from "../BeamFooter"
import { BeamTopRightButtons } from "../BeamTopRightButtons"
import { BeamTopLeftButtons } from "../BeamTopLeftButtons"

export default function BeamSkeleton({
  setAuthProvider,
  bgColor,
  hashtags,
  ...rest
}) {
  const outBoxStyle = {
    minHeight: { base: "950px", md: "900px" }
  }

  return (
    <Box sx={outBoxStyle} bgColor={bgColor} pos="relative">
      <Flex
        flexDirection="column"
        justifyContent="center"
        bgColor={bgColor}
        {...rest}
      >
        <Box pos="absolute" left="38px" top="18px">
          <BeamTopLeftButtons />
        </Box>
        <Box pos="absolute" right="0px" top="10px">
          <BeamTopRightButtons setAuthProvider={setAuthProvider} />
        </Box>

        <Outlet />
      </Flex>
      <Hide below="md">
        <BeamFooter hashtags={hashtags} />
      </Hide>
    </Box>
  )
}

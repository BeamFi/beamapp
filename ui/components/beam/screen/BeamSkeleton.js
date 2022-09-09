import React from "react"

import { Outlet } from "react-router-dom"

import { Box, Flex } from "@chakra-ui/react"

import { BeamFooter } from "../BeamFooter"
import { BeamTopRightButtons } from "../BeamTopRightButtons"
import { BeamTopLeftButtons } from "../BeamTopLeftButtons"

export default function BeamSkeleton({ bgColor, logout, hashtags, ...rest }) {
  const outBoxStyle = {
    minHeight: "100vh",
    minHeight: "-moz-available",
    minHeight: "-webkit-fill-available",
    minHeight: "fill-available"
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
          <BeamTopRightButtons logout={logout} />
        </Box>

        <Outlet />
      </Flex>
      <BeamFooter hashtags={hashtags} />
    </Box>
  )
}

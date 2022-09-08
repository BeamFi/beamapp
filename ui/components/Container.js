import React from "react"

import { Flex } from "@chakra-ui/react"

export const Container = props => {
  const colorMode = "light"

  const bgColor = { light: "white", dark: "gray.900" }
  const color = { light: "black", dark: "white" }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}

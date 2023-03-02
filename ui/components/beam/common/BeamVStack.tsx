import React from "react"

import { VStack } from "@chakra-ui/react"

export const BeamVStack = ({ children, ...rest }) => {
  return (
    <VStack
      w={{ base: "95%", md: "95%", lg: "571px" }}
      boxShadow="-3px 5px 2px rgba(0, 0, 0, 0.75)"
      borderRadius="30px"
      bg="white"
      px="16px"
      py="16px"
      {...rest}
    >
      {children}
    </VStack>
  )
}

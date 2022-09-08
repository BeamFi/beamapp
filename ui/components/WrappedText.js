import React from "react"

import { Text } from "@chakra-ui/react"

export const WrappedText = ({ children, ...others }) => {
  return (
    <Text color="muted" fontSize="sm" noOfLines={3} {...others}>
      {children}
    </Text>
  )
}

import React from "react"

import { Text } from "@chakra-ui/react"

export const BeamHeading = ({ children, ...rest }) => {
  return (
    <Text
      color="black_5"
      fontWeight="semibold"
      fontSize={{ base: "18px", md: "26px", lg: "28px" }}
      {...rest}
    >
      {children}
    </Text>
  )
}

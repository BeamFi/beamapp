import React from "react"
import { Heading } from "@chakra-ui/react"

export const Title = props => {
  return (
    <Heading
      pt="12px"
      pb="27px"
      textAlign={{ base: "center", md: "unset" }}
      color="black"
      fontSize="32px"
      fontWeight="semibold"
      {...props}
    >
      {props.children}
    </Heading>
  )
}

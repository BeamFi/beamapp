import React from "react"
import { Flex, Heading } from "@chakra-ui/react"

export const GradientText = props => (
  <Flex justifyContent="center" alignItems="center" height="40px">
    <Heading
      size="lg"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      {...props}
    >
      {props.children}
    </Heading>
  </Flex>
)

import React from "react"

// Chakra
import { Button, Text } from "@chakra-ui/react"

export default function MajorActionButton({ children, ...rest }) {
  return (
    <Button
      color="white"
      variant="solid"
      background="gradient.purple.2"
      _hover={{
        bgGradient: "linear(to-l, #b85bf1, #fc4f86)",
        boxShadow: "xl"
      }}
      _active={{
        bgGradient: "linear(to-l, #9a5bf1, #fc4f92)"
      }}
      _focus={{
        bgGradient: "linear(to-l, #620FAE, #FA1B69)"
      }}
      loadingText="Submitting"
      fontSize="16px"
      fontWeight="semibold"
      borderRadius="7px"
      mb="9px"
      h="60px"
      {...rest}
    >
      <Text noOfLines={0}>{children}</Text>
    </Button>
  )
}

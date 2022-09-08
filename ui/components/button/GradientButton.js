import React from "react"

import { Button } from "@chakra-ui/react"

export const GradientButton = React.forwardRef((props, ref) => {
  return (
    <Button
      h="3rem"
      size="md"
      color="white"
      variant="solid"
      bgGradient="linear(to-l, #620FAE, #FA1B69)"
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
      ref={ref}
      {...props}
    >
      {props.children}
    </Button>
  )
})

GradientButton.displayName = "GradientButton"

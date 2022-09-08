import React, { forwardRef } from "react"

import { Button } from "@chakra-ui/react"

export const GradientHighlightButton = forwardRef((props, ref) => {
  const { onClick, children, ...others } = props

  return (
    <Button
      background={"white"}
      color={"black"}
      variant={"outline"}
      _hover={{
        bgGradient: "linear(to-l, #b85bf1, #fc4f86)",
        boxShadow: "lg",
        color: "white",
        borderColor: "white"
      }}
      fontWeight="medium"
      fontSize="13px"
      w="120px"
      minW="120px"
      h="29px"
      borderRadius="29px"
      borderColor={"gray_light2"}
      onClick={onClick}
      ref={ref}
      {...others}
    >
      {children}
    </Button>
  )
})

GradientHighlightButton.displayName = "GradientHighlightButton"

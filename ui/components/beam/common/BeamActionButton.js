import React from "react"

import { Button } from "@chakra-ui/react"

export const BeamActionButton = ({ leftIcon, children, ...rest }) => {
  return (
    <Button
      leftIcon={leftIcon}
      variant="solid"
      color="black_5"
      fontWeight="medium"
      fontSize={{ base: "14px", md: "16px" }}
      boxShadow="-3px 5px 2px rgba(0, 0, 0, 0.75)"
      borderRadius="10px"
      bg="white"
      w="110px"
      h="45px"
      _hover={{
        boxShadow: "xl"
      }}
      loadingText="Submitting"
      {...rest}
    >
      {children}
    </Button>
  )
}

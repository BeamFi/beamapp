import React from "react"

import { Button } from "@chakra-ui/react"

export const BlackOutlineButton = ({
  onClick,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      mt="9px"
      mb="22px"
      w={{ base: "300px", md: "394px" }}
      h="60px"
      variant="outline"
      borderColor="black"
      borderRadius="7px"
      border="2px"
      color="black_2"
      fontSize="16px"
      fontWeight="semibold"
      {...rest}
    >
      {children}
    </Button>
  )
}

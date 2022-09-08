import React from "react"

import { Button, Text } from "@chakra-ui/react"

export const BeamGradientActionButton = ({
  title,
  leftIcon,
  children,
  textSize = "15px",
  textWeight = "medium",
  ...rest
}) => {
  return (
    <Button
      leftIcon={leftIcon}
      variant="solid"
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
      <Text
        bg="gradient.purple.7"
        bgClip="text"
        fontSize={textSize}
        fontWeight={textWeight}
      >
        {title}
      </Text>
      {children}
    </Button>
  )
}

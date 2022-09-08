import React from "react"

import { Box, useRadio } from "@chakra-ui/react"

export const RadioCard = ({ bgColor, children, h, w, ...others }) => {
  const { getInputProps, getCheckboxProps } = useRadio(others)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="black_2"
        _checked={{
          bg: bgColor,
          color: "white",
          borderColor: bgColor
        }}
        _focus={{
          boxShadow: "outline"
        }}
        _hover={{
          boxShadow: "2xl"
        }}
        px={3}
        py={3}
        h={h}
        w={w}
      >
        {children}
      </Box>
    </Box>
  )
}

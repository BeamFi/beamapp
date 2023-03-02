import React from "react"

import { Tooltip } from "@chakra-ui/react"

export const StandardTooltip = ({ label, children, ...rest }) => {
  return (
    <Tooltip
      label={label}
      fontSize="sm"
      bg="gradient.purple.3"
      color="black"
      borderRadius="6px"
      textAlign="center"
      p="4px"
      {...rest}
    >
      {children}
    </Tooltip>
  )
}
